/*
  Warnings:

  - A unique constraint covering the columns `[id,id_veiculo]` on the table `Motorista` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Motorista_id_id_veiculo_key" ON "Motorista"("id", "id_veiculo");