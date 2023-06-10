-- DropForeignKey
ALTER TABLE "AvailabilitySlot" DROP CONSTRAINT "AvailabilitySlot_availabilityId_fkey";

-- DropIndex
DROP INDEX "AvailabilitySlot_availabilityId_key";

-- AlterTable
ALTER TABLE "AvailabilitySlot" ALTER COLUMN "availabilityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AvailabilitySlot" ADD CONSTRAINT "AvailabilitySlot_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE SET NULL ON UPDATE CASCADE;
