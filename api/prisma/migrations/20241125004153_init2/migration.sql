/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Motorista" (
    "id" SERIAL NOT NULL,
    "id_veiculo" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "quilometragem_minima_aceita" INTEGER NOT NULL,
    "avaliacao" INTEGER NOT NULL,

    CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" SERIAL NOT NULL,
    "tipo_veiculo" TEXT NOT NULL,
    "cor_veiculo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" TIMESTAMP(3) NOT NULL,
    "placa" TEXT NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motorista" ADD CONSTRAINT "Motorista_id_veiculo_fkey" FOREIGN KEY ("id_veiculo") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
