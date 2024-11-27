/*
  Warnings:

  - The primary key for the `Passageiro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `rota_google_api` to the `HistoricoViagens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HistoricoViagens" DROP CONSTRAINT "HistoricoViagens_id_passageiro_fkey";

-- AlterTable
ALTER TABLE "HistoricoViagens" ADD COLUMN     "rota_google_api" JSONB NOT NULL,
ALTER COLUMN "id_passageiro" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Passageiro" DROP CONSTRAINT "Passageiro_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Passageiro_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Passageiro_id_seq";

-- AddForeignKey
ALTER TABLE "HistoricoViagens" ADD CONSTRAINT "HistoricoViagens_id_passageiro_fkey" FOREIGN KEY ("id_passageiro") REFERENCES "Passageiro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
