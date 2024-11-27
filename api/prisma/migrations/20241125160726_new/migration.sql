/*
  Warnings:

  - The primary key for the `HistoricoViagens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `HistoricoViagens` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `id` on table `Veiculo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HistoricoViagens" DROP CONSTRAINT "HistoricoViagens_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "HistoricoViagens_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE motorista_id_seq;
ALTER TABLE "Motorista" ALTER COLUMN "id" SET DEFAULT nextval('motorista_id_seq');
ALTER SEQUENCE motorista_id_seq OWNED BY "Motorista"."id";

-- AlterTable
CREATE SEQUENCE veiculo_id_seq;
ALTER TABLE "Veiculo" ALTER COLUMN "id" SET NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('veiculo_id_seq'),
ADD CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE veiculo_id_seq OWNED BY "Veiculo"."id";
