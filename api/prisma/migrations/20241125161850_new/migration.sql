/*
  Warnings:

  - A unique constraint covering the columns `[id,id_veiculo]` on the table `Motorista` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id_veiculo` on table `Motorista` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Motorista" ALTER COLUMN "id_veiculo" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_id_id_veiculo_key" ON "Motorista"("id", "id_veiculo");

-- AddForeignKey
ALTER TABLE "Motorista" ADD CONSTRAINT "Motorista_id_veiculo_fkey" FOREIGN KEY ("id_veiculo") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
