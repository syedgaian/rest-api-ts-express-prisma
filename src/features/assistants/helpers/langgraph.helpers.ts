import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { SystemMessage } from "@langchain/core/messages";
import { StructuredTool } from "@langchain/core/tools";
import { ChatOpenAI, ChatOpenAICallOptions, ChatOpenAIFields, ClientOptions, LegacyOpenAIInput } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { type RunnableConfig, Runnable } from "@langchain/core/runnables";
import { ZodObjectAny } from "@langchain/core/dist/types/zod";
import { AgentRunnableSequence } from "langchain/dist/agents/agent";
import { BaseCheckpointSaver, MemorySaver } from "@langchain/langgraph";

export class LangGraphHelper {

    public static createOpenAILlm<ChatOpenAICallOptions>(fields: ChatOpenAIFields, configurations?: ClientOptions) {
        return new ChatOpenAI(fields, configurations)
    }

    public static createReactAssistant(llm: ChatOpenAI, tools: Array<StructuredTool>, instructions: string,) {
        return createReactAgent({
            llm,
            tools,
            messageModifier: new SystemMessage(instructions)
        })
    }

    public static createReactAssistantWithMemory(llm: ChatOpenAI, tools: Array<StructuredTool>, instructions: string, memory: any) {
        return createReactAgent({
            llm,
            tools,
            messageModifier: new SystemMessage(instructions),
            checkpointSaver: memory,
        })
    }

    // public static async createOpenAIAssistantWithFunctions(llm: any, tools: StructuredTool<ZodObjectAny>[]) {
    //     await createOpenAIFunctionsAgent({
    //         llm,
    //         tools,
    //         prompt,
    //     });
    // }

    // public static executeAgent(agent: AgentRunnableSequence, tools: Array<BaseTool>,) {
    //     return new AgentExecutor({
    //         agent: agent(tools),
    //         tools: tools,

    //     })
    // }
}