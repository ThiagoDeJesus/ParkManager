import axios from "axios";
import { onlyNumbers } from "@utils/format";

interface IAddress {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
}

interface IViaCep {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

class AddressService {
  private formatAddress(address: IAddress) {
    if (!address.cep) {
      throw new Error("É necessário cadastrar o cep");
    }

    if (!address.rua) {
      throw new Error("É necessário cadastrar a rua");
    }

    if (!address.numero) {
      throw new Error("É necessário cadastrar o número");
    }

    if (!address.bairro) {
      throw new Error("É necessário cadastrar o bairro");
    }

    if (!address.cidade) {
      throw new Error("É necessário cadastrar a cidade");
    }

    if (!address.estado) {
      throw new Error("É necessário cadastrar a estado");
    }

    return {
      cep: onlyNumbers(address.cep),
      rua: address.rua.trim(),
      numero: address.numero.trim(),
      bairro: address.bairro.trim(),
      cidade: address.cidade.trim(),
      estado: address.estado.trim(),
      complemento: address.complemento?.trim() || null,
    };
  }

  async validateAddress(address: IAddress) {
    const endereco = this.formatAddress(address);

    const response = await axios.get(
      `https://viacep.com.br/ws/${address.cep}/json/`
    );

    if (response.status !== 200 || response.data?.erro === true) {
      throw new Error("Cep inválido");
    }

    const data: IViaCep = response.data;

    endereco.bairro = data.bairro || endereco.bairro;
    endereco.rua = data.logradouro || endereco.rua;
    endereco.cidade = data.localidade;
    endereco.estado = data.uf;

    return endereco;
  }
}

export default new AddressService();
