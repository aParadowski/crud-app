/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Item` table. All the data in the column will be lost.
  - Added the required column `city` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone1` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone2` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionDate` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_customerId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Customer";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subscriptionDate" DATETIME NOT NULL,
    "website" TEXT NOT NULL
);
INSERT INTO "new_Item" ("id") SELECT "id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_customerId_key" ON "Item"("customerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
