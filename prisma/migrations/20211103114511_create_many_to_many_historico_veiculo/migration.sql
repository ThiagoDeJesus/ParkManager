/*
  Warnings:

  - You are about to drop the column `created_at` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `entrada` on the `Veiculo` table. All the data in the column will be lost.
  - You are about to drop the column `saida` on the `Veiculo` table. All the data in the column will be lost.
  - You are about to drop the column `vagaId` on the `Veiculo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_vagaId_fkey";

-- AlterTable
ALTER TABLE "Vaga" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "entrada",
DROP COLUMN "saida",
DROP COLUMN "vagaId";

-- CreateTable
CREATE TABLE "HistoricoVeiculo" (
    "id" SERIAL NOT NULL,
    "vagaId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saida" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoricoVeiculo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoricoVeiculo" ADD CONSTRAINT "HistoricoVeiculo_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoVeiculo" ADD CONSTRAINT "HistoricoVeiculo_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
