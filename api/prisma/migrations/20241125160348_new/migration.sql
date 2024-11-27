/*
  Warnings:

  - The primary key for the `Motorista` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_veiculo` column on the `Motorista` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Veiculo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Veiculo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `Motorista` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Motorista" DROP CONSTRAINT "Motorista_id_veiculo_fkey";

-- DropIndex
DROP INDEX "Motorista_id_id_veiculo_key";

-- AlterTable
ALTER TABLE "Motorista" DROP CONSTRAINT "Motorista_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
DROP COLUMN "id_veiculo",
ADD COLUMN     "id_veiculo" INTEGER,
ADD CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER;
