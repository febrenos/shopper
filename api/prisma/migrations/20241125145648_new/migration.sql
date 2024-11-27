/*
  Warnings:

  - You are about to drop the column `estado` on the `Veiculo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "estado",
ADD COLUMN     "estado_atual_veiculo" TEXT;
