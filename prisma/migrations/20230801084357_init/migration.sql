-- CreateEnum
CREATE TYPE "LabelingTaskStatus" AS ENUM ('PENDING', 'DONE');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "LabelingTask" (
    "labelingTaskId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Status" "LabelingTaskStatus" NOT NULL,

    CONSTRAINT "LabelingTask_pkey" PRIMARY KEY ("labelingTaskId")
);

-- CreateTable
CREATE TABLE "LabelingImage" (
    "imageId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "labelingTaskLabelingTaskId" INTEGER,

    CONSTRAINT "LabelingImage_pkey" PRIMARY KEY ("imageId")
);

-- AddForeignKey
ALTER TABLE "LabelingImage" ADD CONSTRAINT "LabelingImage_labelingTaskLabelingTaskId_fkey" FOREIGN KEY ("labelingTaskLabelingTaskId") REFERENCES "LabelingTask"("labelingTaskId") ON DELETE SET NULL ON UPDATE CASCADE;
