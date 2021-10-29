import prisma from "../prisma";
import { onlyNumbers } from "../utils/format";
import { validateCNPJ } from "../utils/validation";

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
  async createCompany({
    nome,
    cnpj,
    telefone,
    quantidade_vagas_carro,
    quantidade_vagas_moto,
    endereco,
  }: ICompany) {
    if (!nome) {
      // To Do Error
      throw new Error("Nome inválido");
    }

    if (!cnpj || !validateCNPJ(cnpj)) {
      // To Do Error
      throw new Error("Cnpj inválido");
    }

    if (!telefone || telefone.length < 12) {
      // To Do Error
      throw new Error("Telefone inválido");
    }

    // To Do Validate Address
    // Temp
    if (
      !endereco.cep ||
      !endereco.rua ||
      !endereco.numero ||
      !endereco.cidade ||
      !endereco.estado
    ) {
      // To Do Error
      throw new Error("Endereço inválido");
    }

    const empresa = {
      nome: nome.trim(),
      cnpj: onlyNumbers(cnpj),
      telefone: onlyNumbers(telefone),
      quantidade_vagas_carro,
      quantidade_vagas_moto,
    };

    const enderecoParsed = {
      cep: onlyNumbers(endereco.cep),
      rua: endereco.rua.trim(),
      numero: endereco.numero.trim(),
      bairro: endereco.bairro.trim(),
      cidade: endereco.cidade.trim(),
      estado: endereco.estado.trim(),
      complemento: endereco.complemento || null,
    };

    return await prisma.empresa.create({
      data: {
        ...empresa,
        Endereco: {
          create: enderecoParsed,
        },
      },
    });
  }
}

export { CompanyService };
