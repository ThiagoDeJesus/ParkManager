-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "quantidade_vagas_moto" INTEGER NOT NULL,
    "quantidade_vagas_carro" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" VARCHAR(5) NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "complemento" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaga" (
    "id" SERIAL NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "tipo" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" SERIAL NOT NULL,
    "marca" VARCHAR(20) NOT NULL,
    "modelo" VARCHAR(20) NOT NULL,
    "cor" VARCHAR(20) NOT NULL,
    "placa" VARCHAR(7) NOT NULL,
    "tipo" VARCHAR(5) NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historico_Veiculo" (
    "id" SERIAL NOT NULL,
    "vagaId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,

    CONSTRAINT "Historico_Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_empresaId_key" ON "Endereco"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "Historico_Veiculo_vagaId_key" ON "Historico_Veiculo"("vagaId");

-- CreateIndex
CREATE UNIQUE INDEX "Historico_Veiculo_veiculoId_key" ON "Historico_Veiculo"("veiculoId");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaga" ADD CONSTRAINT "Vaga_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historico_Veiculo" ADD CONSTRAINT "Historico_Veiculo_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historico_Veiculo" ADD CONSTRAINT "Historico_Veiculo_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
