-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "device_type" TEXT NOT NULL,
    "notification_token" TEXT NOT NULL,
    "userId" INTEGER,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
