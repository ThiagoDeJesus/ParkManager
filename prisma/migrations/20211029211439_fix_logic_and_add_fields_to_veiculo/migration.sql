/*
  Warnings:

  - You are about to drop the column `veiculoId` on the `Historico_Veiculo` table. All the data in the column will be lost.
  - Added the required column `historico_VeiculoId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saida` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Historico_Veiculo" DROP CONSTRAINT "Historico_Veiculo_veiculoId_fkey";

-- DropIndex
DROP INDEX "Historico_Veiculo_veiculoId_key";

-- AlterTable
ALTER TABLE "Historico_Veiculo" DROP COLUMN "veiculoId";

-- AlterTable
ALTER TABLE "Veiculo" ADD COLUMN     "entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "historico_VeiculoId" INTEGER NOT NULL,
ADD COLUMN     "saida" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_historico_VeiculoId_fkey" FOREIGN KEY ("historico_VeiculoId") REFERENCES "Historico_Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
