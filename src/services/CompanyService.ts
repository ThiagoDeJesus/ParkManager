import { Prisma } from "@prisma/client";

import prisma from "@src/prisma";

import { AddressService } from "@services/AddressService";

import { onlyNumbers } from "@utils/format";
import { validateCNPJ } from "@utils/validation";

interface IAddress {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
}

interface ICompany {
  nome: string;
  cnpj: string;
  telefone: string;
  quantidade_vagas_carro: number;
  quantidade_vagas_moto: number;
  endereco: IAddress;
}

interface IVaga {
  tipo: "carro" | "moto";
}

class CompanyService {
  async createCompany(company: ICompany) {
    const empresa = this.validateCompany(company);

    const addressService = new AddressService();
    const enderecoParsed = await addressService.validateAddress(
      company.endereco
    );
    const vagas = this.createVagas(
      empresa.quantidade_vagas_carro,
      empresa.quantidade_vagas_moto
    );

    try {
      return await prisma.empresa.create({
        data: {
          ...empresa,
          Endereco: {
            create: enderecoParsed,
          },
          Vaga: {
            create: vagas,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Essa empresa já está cadastrada");
        }
      }
      throw error;
    }
  }

  private formatCompany(company: ICompany) {
    if (!company.nome) {
      // To Do Error
      throw new Error("Nome está vazio");
    }

    if (!company.cnpj) {
      // To Do Error
      throw new Error("CNPJ está vazio");
    }

    if (!company.telefone) {
      // To Do Error
      throw new Error("Telefone está vazio");
    }

    return {
      nome: company.nome.trim(),
      cnpj: onlyNumbers(company.cnpj),
      telefone: onlyNumbers(company.telefone),
      quantidade_vagas_carro: Number(company.quantidade_vagas_carro),
      quantidade_vagas_moto: Number(company.quantidade_vagas_moto),
    };
  }

  validateCompany(company: ICompany) {
    const empresa = this.formatCompany(company);

    if (!empresa.nome) {
      throw new Error("Nome inválido");
    }

    if (!empresa.cnpj || !validateCNPJ(empresa.cnpj)) {
      throw new Error("CNPJ inválido");
    }

    if (!empresa.telefone || empresa.telefone.length < 12) {
      throw new Error("Telefone inválido");
    }

    if (
      isNaN(empresa.quantidade_vagas_moto) ||
      isNaN(empresa.quantidade_vagas_carro)
    ) {
      throw new Error("Número de vagas está no formato incorreto");
    }

    return empresa;
  }

  private createVagas(
    quantidade_vagas_carro: number,
    quantidade_vagas_moto: number
  ) {
    const vagas: IVaga[] = [];

    vagas.length = quantidade_vagas_carro + quantidade_vagas_moto;

    vagas.fill({ tipo: "carro" }, 0, quantidade_vagas_carro);

    vagas.fill({ tipo: "moto" }, quantidade_vagas_carro);

    return vagas;
  }
}

export { CompanyService };
