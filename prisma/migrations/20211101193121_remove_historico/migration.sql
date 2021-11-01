/*
  Warnings:

  - You are about to drop the column `historico_VeiculoId` on the `Veiculo` table. All the data in the column will be lost.
  - You are about to drop the `Historico_Veiculo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vagaId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Historico_Veiculo" DROP CONSTRAINT "Historico_Veiculo_vagaId_fkey";

-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_historico_VeiculoId_fkey";

-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "historico_VeiculoId",
ADD COLUMN     "vagaId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Historico_Veiculo";

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
