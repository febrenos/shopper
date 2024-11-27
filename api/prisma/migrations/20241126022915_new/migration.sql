-- CreateEnum
CREATE TYPE "StatusTravel" AS ENUM ('PENDING', 'CONFIRMED');

-- AlterTable
ALTER TABLE "HistoricoViagens" ADD COLUMN     "status_viagem" "StatusTravel" NOT NULL DEFAULT 'PENDING';
