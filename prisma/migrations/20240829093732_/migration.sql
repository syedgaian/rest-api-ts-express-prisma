-- CreateTable
CREATE TABLE "Checkpoint" (
    "thread_id" TEXT NOT NULL,
    "checkpoint_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "checkpoint" BYTEA NOT NULL,
    "metadata" BYTEA NOT NULL,
    "threadId" TEXT,

    CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("thread_id","checkpoint_id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkpoint_checkpoint_id_key" ON "Checkpoint"("checkpoint_id");

-- AddForeignKey
ALTER TABLE "Checkpoint" ADD CONSTRAINT "Checkpoint_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Checkpoint"("checkpoint_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkpoint" ADD CONSTRAINT "Checkpoint_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
