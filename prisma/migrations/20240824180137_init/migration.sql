-- CreateTable
CREATE TABLE "Assistant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metadataId" TEXT,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistantMetadata" (
    "id" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "languages" TEXT[],
    "capabilities" TEXT[],
    "maxTokens" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "topP" DOUBLE PRECISION NOT NULL,
    "frequencyPenalty" DOUBLE PRECISION NOT NULL,
    "presencePenalty" DOUBLE PRECISION NOT NULL,
    "agentType" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "apiKey" TEXT,
    "trainingDataCutoff" TIMESTAMP(3),
    "deployedAt" TIMESTAMP(3),
    "lastActiveAt" TIMESTAMP(3),

    CONSTRAINT "AssistantMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssistantMetadata_assistantId_key" ON "AssistantMetadata"("assistantId");

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "AssistantMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
