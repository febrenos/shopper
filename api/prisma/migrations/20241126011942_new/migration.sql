-- DropForeignKey
ALTER TABLE "HistoricoViagens" DROP CONSTRAINT "HistoricoViagens_id_motorista_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoViagens" DROP CONSTRAINT "HistoricoViagens_id_passageiro_fkey";

-- AlterTable
ALTER TABLE "HistoricoViagens" ALTER COLUMN "id_motorista" DROP NOT NULL,
ALTER COLUMN "id_passageiro" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HistoricoViagens" ADD CONSTRAINT "HistoricoViagens_id_motorista_fkey" FOREIGN KEY ("id_motorista") REFERENCES "Motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoViagens" ADD CONSTRAINT "HistoricoViagens_id_passageiro_fkey" FOREIGN KEY ("id_passageiro") REFERENCES "Passageiro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
