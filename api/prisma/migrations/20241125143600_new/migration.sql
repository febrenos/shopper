/*
  Warnings:

  - You are about to drop the column `avaliacao` on the `Motorista` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placa]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Motorista" DROP COLUMN "avaliacao",
ADD COLUMN     "custo_por_km" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "descricao_avaliacao" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nota_avaliacao" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");
