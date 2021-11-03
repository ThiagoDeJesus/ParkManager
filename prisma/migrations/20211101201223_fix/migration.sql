-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_vagaId_fkey";

-- AlterTable
ALTER TABLE "Veiculo" ALTER COLUMN "vagaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE SET NULL ON UPDATE CASCADE;
