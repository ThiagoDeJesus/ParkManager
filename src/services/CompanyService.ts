import { Prisma } from "@prisma/client";

import prisma from "@src/prisma";

import addressService from "@services/AddressService";
import parkService from "@services/ParkService";

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

class CompanyService {
  async create(company: ICompany) {
    const empresa = this.validate(company);

    const enderecoParsed = await addressService.validateAddress(
      company.endereco
    );
    const vagas = parkService.createVagas(
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

  async getById(id: number) {
    try {
      const empresa = await prisma.empresa.findUnique({
        where: {
          id: id,
        },
        include: {
          Endereco: true,
        },
      });

      if (!empresa) {
        throw new Error("Empresa não encontrada");
      }

      return empresa;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2001") {
          throw new Error("Essa empresa não está cadastrada");
        }
      }
      throw error;
    }
  }

  async getByCnpj(cnpj: string) {
    const empresa = await prisma.empresa.findUnique({
      where: {
        cnpj: onlyNumbers(cnpj),
      },
    });
    if (!empresa) {
      throw new Error("Empresa não encontrada");
    }
    return empresa;
  }

  async getAll() {
    return await prisma.empresa.findMany({
      include: {
        Endereco: true,
      },
    });
  }

  async update(id: number, company: Partial<ICompany>) {
    const address = company.endereco;
    delete company.endereco;

    try {
      return await prisma.empresa.update({
        where: {
          id: id,
        },
        data: {
          ...company,
          Endereco: {
            update: address,
          },
        },
        include: {
          Endereco: true,
        },
      });
    } catch (error) {
      // console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Empresa não encontrada");
        }
      }
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      await prisma.historicoVeiculo.deleteMany({
        where: {
          empresaId: id,
        },
      });

      await prisma.vaga.deleteMany({
        where: {
          empresaId: id,
        },
      });

      const empresa = await prisma.empresa.delete({
        where: {
          id: id,
        },
        include: {
          Endereco: true,
        },
      });

      await prisma.endereco.delete({
        where: {
          id: empresa.enderecoId,
        },
      });

      return empresa;
    } catch (err) {
      throw new Error("Empresa não encontrada");
    }
  }

  private format(company: ICompany) {
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

  validate(company: ICompany) {
    const empresa = this.format(company);

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
}

export default new CompanyService();
export { ICompany };
