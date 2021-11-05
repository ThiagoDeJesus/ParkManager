/*
  Warnings:

  - Added the required column `empresaId` to the `HistoricoVeiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricoVeiculo" ADD COLUMN     "empresaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "HistoricoVeiculo" ADD CONSTRAINT "HistoricoVeiculo_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
