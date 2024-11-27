-- AddForeignKey
ALTER TABLE "HistoricoViagens" ADD CONSTRAINT "HistoricoViagens_id_motorista_fkey" FOREIGN KEY ("id_motorista") REFERENCES "Motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoViagens" ADD CONSTRAINT "HistoricoViagens_id_passageiro_fkey" FOREIGN KEY ("id_passageiro") REFERENCES "Passageiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
