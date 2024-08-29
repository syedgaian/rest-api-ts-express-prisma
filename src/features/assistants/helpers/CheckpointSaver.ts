import {
    BaseCheckpointSaver,
    Checkpoint,
    CheckpointMetadata,
    CheckpointTuple,
} from "@langchain/langgraph";
import { RunnableConfig } from "@langchain/core/runnables";
import CustomSerializer from "./custom-serializer";
import { prisma } from "../../../client";
import { PendingWrite, SerializerProtocol, CheckpointPendingWrite } from "@langchain/langgraph-checkpoint";

function _generateKey(
    threadId: string,
    checkpointNamespace: string,
    checkpointId: string
) {
    return JSON.stringify([threadId, checkpointNamespace, checkpointId]);
}

export class CheckpointSaver extends BaseCheckpointSaver {

    writes: Record<string, CheckpointPendingWrite[]> = {};

    constructor() {
        // @ts-ignore
        super(CustomSerializer);
    }

    async putWrites(config: RunnableConfig, writes: PendingWrite[], taskId: string): Promise<void> {

        const { thread_id, checkpoint_id } = config.configurable || {};
        if (!thread_id || !checkpoint_id) {
            throw new Error(
                `Failed to put writes. The passed RunnableConfig is missing a required "thread_id" or "checkpoint_id" field in its "configurable" property.`
            );
        }

        try {
            const pendingWrites = writes.map(([channel, value]) => ({
                taskId,
                channel,
                value: CustomSerializer.stringify(value),
                thread_id,
                checkpoint_id,
            }));

            // TODO : need to figure out storage of pending writes 

        } catch (error) {
            console.error("Error saving writes", error);
            throw error;
        }
    }

    async getTuple(config: RunnableConfig): Promise<CheckpointTuple | undefined> {

        const thread_id = config.configurable?.thread_id;
        const checkpoint_ns = config.configurable?.checkpoint_ns ?? "";
        let checkpoint_id = config.configurable?.checkpoint_id;

        if (!thread_id) {
            console.error("Missing thread_id in config.");
            return undefined;
        }

        try {
            if (checkpoint_id) {
                const checkpoint = await prisma.checkpoint.findFirst({
                    where: {
                        thread_id,
                        checkpoint_id,
                    },
                    include: {
                        parent: true,
                    },
                });

                // If checkpoint is found, parse it and prepare the CheckpointTuple
                if (checkpoint) {
                    const writes =
                        this.writes[_generateKey(thread_id, checkpoint_ns, checkpoint_id)] ?? [];
                    const pendingWrites: CheckpointPendingWrite[] = await Promise.all(
                        writes.map(async ([taskId, channel, value]) => {
                            return [
                                taskId,
                                channel,
                                await CustomSerializer.parse(value as Buffer),
                            ];
                        })
                    );

                    const checkpointTuple: CheckpointTuple = {
                        config,
                        checkpoint: (await CustomSerializer.parse(
                            checkpoint.checkpoint
                        )) as Checkpoint,
                        metadata: (await CustomSerializer.parse(
                            checkpoint.metadata
                        )) as CheckpointMetadata,
                        pendingWrites,
                    };

                    // Handle parent checkpoint configuration
                    if (checkpoint.parent) {
                        checkpointTuple.parentConfig = {
                            configurable: {
                                thread_id,
                                checkpoint_ns,
                                checkpoint_id: checkpoint.parent.checkpoint_id,
                            },
                        };
                    }

                    return checkpointTuple;
                }
            } else {
                const checkpoints = await prisma.checkpoint.findMany({
                    where: {
                        thread_id,
                    },
                    orderBy: {
                        checkpoint_id: "desc",
                    },
                    take: 1,
                    include: {
                        parent: true,
                    },
                });

                // If any checkpoints exist, use the most recent one
                if (checkpoints.length > 0) {
                    const checkpoint = checkpoints[0];
                    checkpoint_id = checkpoint.checkpoint_id;

                    const writes =
                        this.writes[_generateKey(thread_id, checkpoint_ns, checkpoint_id)] ?? [];
                    const pendingWrites: CheckpointPendingWrite[] = await Promise.all(
                        writes.map(async ([taskId, channel, value]) => {
                            return [
                                taskId,
                                channel,
                                await CustomSerializer.parse(value as Buffer),
                            ];
                        })
                    );

                    const checkpointTuple: CheckpointTuple = {
                        config: {
                            configurable: {
                                thread_id,
                                checkpoint_id,
                                checkpoint_ns,
                            },
                        },
                        checkpoint: (await CustomSerializer.parse(
                            checkpoint.checkpoint
                        )) as Checkpoint,
                        metadata: (await CustomSerializer.parse(
                            checkpoint.metadata
                        )) as CheckpointMetadata,
                        pendingWrites,
                    };

                    if (checkpoint.parent) {
                        checkpointTuple.parentConfig = {
                            configurable: {
                                thread_id,
                                checkpoint_ns,
                                checkpoint_id: checkpoint.parent.checkpoint_id,
                            },
                        };
                    }

                    return checkpointTuple;
                }
            }
        } catch (error) {
            console.error("Error retrieving checkpoint", error);
            throw error;
        }

        // Return undefined if no checkpoints are found
        return undefined;
    }


    async *list(
        config: RunnableConfig,
        options?: { limit?: number; before?: RunnableConfig }
    ): AsyncGenerator<CheckpointTuple, void, unknown> {

        const { thread_id } = config.configurable || {};
        if (!thread_id) throw new Error("Thread ID is required.");

        const beforeCheckpointId = options?.before?.configurable?.checkpoint_id;
        let { limit } = options || {};

        try {
            const checkpoints = await prisma.checkpoint.findMany({
                where: {
                    thread_id,
                    ...(beforeCheckpointId && {
                        checkpoint_id: {
                            lt: beforeCheckpointId,
                        },
                    }),
                },
                orderBy: {
                    checkpoint_id: "desc",
                },
                ...(limit && { take: limit }),
                include: {
                    parent: true,
                },
            });

            for (const checkpoint of checkpoints) {
                yield {
                    config: {
                        configurable: {
                            thread_id: checkpoint.thread_id,
                            checkpoint_id: checkpoint.checkpoint_id,
                        },
                    },
                    checkpoint: (await CustomSerializer.parse(checkpoint.checkpoint)) as Checkpoint,
                    metadata: (await CustomSerializer.parse(checkpoint.metadata)) as CheckpointMetadata,
                    parentConfig: checkpoint.parent
                        ? {
                            configurable: {
                                thread_id: checkpoint.thread_id,
                                checkpoint_id: checkpoint.parent.checkpoint_id,
                            },
                        }
                        : undefined,
                };
            }
        } catch (error) {
            console.error("Error listing checkpoints", error);
            throw error;
        }
    }

    async put(
        config: RunnableConfig,
        checkpoint: Checkpoint,
        metadata: CheckpointMetadata
    ): Promise<RunnableConfig> {

        const { thread_id, checkpoint_ns } = config.configurable || {};

        if (!thread_id || !checkpoint_ns) {
            throw new Error(
                `Failed to put checkpoint. The passed RunnableConfig is missing a required "thread_id" or "checkpoint_ns" field in its "configurable" property.`
            );
        }

        try {
            await prisma.checkpoint.upsert({
                where: {
                    thread_id_checkpoint_id: {
                        thread_id,
                        checkpoint_id: checkpoint.id,
                    },
                },
                create: {
                    thread_id,
                    checkpoint_ns,
                    checkpoint_id: checkpoint.id,
                    parent_id: config.configurable?.checkpoint_id,
                    checkpoint: CustomSerializer.stringify(checkpoint),
                    metadata: CustomSerializer.stringify(metadata),
                },
                update: {
                    checkpoint: CustomSerializer.stringify(checkpoint),
                    metadata: CustomSerializer.stringify(metadata),
                },
            });

            return {
                configurable: {
                    thread_id,
                    checkpoint_ns,
                    checkpoint_id: checkpoint.id,
                },
            };
        } catch (error) {
            console.error("Error saving checkpoint", error);
            throw error;
        }
    }
}
