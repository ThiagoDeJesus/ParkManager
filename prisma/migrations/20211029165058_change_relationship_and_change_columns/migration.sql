/*
  Warnings:

  - You are about to drop the column `empresaId` on the `Endereco` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enderecoId]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enderecoId` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_empresaId_fkey";

-- DropIndex
DROP INDEX "Endereco_empresaId_key";

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "enderecoId" INTEGER NOT NULL,
ALTER COLUMN "telefone" SET DATA TYPE VARCHAR(12);

-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "empresaId",
ADD COLUMN     "bairro" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_enderecoId_key" ON "Empresa"("enderecoId");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
