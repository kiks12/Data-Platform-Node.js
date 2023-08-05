/*
  Warnings:

  - Added the required column `userUserId` to the `LabelingTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabelingTask" ADD COLUMN     "userUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LabelingTask" ADD CONSTRAINT "LabelingTask_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
