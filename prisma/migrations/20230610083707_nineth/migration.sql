/*
  Warnings:

  - You are about to drop the column `availibilityId` on the `AvailabilitySlot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[availabilityId]` on the table `AvailabilitySlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availabilityId` to the `AvailabilitySlot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AvailabilitySlot" DROP CONSTRAINT "AvailabilitySlot_availibilityId_fkey";

-- DropIndex
DROP INDEX "AvailabilitySlot_availibilityId_key";

-- AlterTable
ALTER TABLE "AvailabilitySlot" DROP COLUMN "availibilityId",
ADD COLUMN     "availabilityId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilitySlot_availabilityId_key" ON "AvailabilitySlot"("availabilityId");

-- AddForeignKey
ALTER TABLE "AvailabilitySlot" ADD CONSTRAINT "AvailabilitySlot_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
