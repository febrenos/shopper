/*
  Warnings:

  - You are about to drop the column `data_fim` on the `HistoricoViagens` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `HistoricoViagens` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `HistoricoViagens` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `HistoricoViagens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HistoricoViagens" DROP COLUMN "data_fim",
DROP COLUMN "distance",
DROP COLUMN "duration",
DROP COLUMN "value",
ADD COLUMN     "distancia" DOUBLE PRECISION,
ADD COLUMN     "duracao" TEXT,
ADD COLUMN     "valor" DOUBLE PRECISION,
ALTER COLUMN "status_viagem" SET DEFAULT 'CONFIRMED';
