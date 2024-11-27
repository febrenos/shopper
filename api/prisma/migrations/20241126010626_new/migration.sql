/*
  Warnings:

  - Added the required column `id_motorista` to the `HistoricoViagens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_passageiro` to the `HistoricoViagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricoViagens" ADD COLUMN     "id_motorista" INTEGER NOT NULL,
ADD COLUMN     "id_passageiro" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Passageiro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),

    CONSTRAINT "Passageiro_pkey" PRIMARY KEY ("id")
);
