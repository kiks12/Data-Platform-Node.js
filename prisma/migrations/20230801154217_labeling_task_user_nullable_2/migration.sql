-- DropForeignKey
ALTER TABLE "LabelingTask" DROP CONSTRAINT "LabelingTask_userUserId_fkey";

-- AlterTable
ALTER TABLE "LabelingTask" ALTER COLUMN "userUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "LabelingTask" ADD CONSTRAINT "LabelingTask_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
