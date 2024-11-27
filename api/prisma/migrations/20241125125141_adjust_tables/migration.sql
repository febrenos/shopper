/*
  Warnings:

  - The primary key for the `Motorista` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Veiculo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Motorista" DROP CONSTRAINT "Motorista_id_veiculo_fkey";

-- AlterTable
ALTER TABLE "Motorista" DROP CONSTRAINT "Motorista_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_veiculo" SET DATA TYPE TEXT,
ADD CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Motorista_id_seq";

-- AlterTable
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Veiculo_id_seq";

-- CreateTable
CREATE TABLE "HistoricoViagens" (
    "id" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoricoViagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motorista" ADD CONSTRAINT "Motorista_id_veiculo_fkey" FOREIGN KEY ("id_veiculo") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
