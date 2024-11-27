/*
  Warnings:

  - You are about to drop the column `age` on the `Motorista` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Motorista" DROP COLUMN "age",
ADD COLUMN     "data_nascimento" TIMESTAMP(3);
