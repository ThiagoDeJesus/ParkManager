import { Prisma } from "@prisma/client";

import prisma from "@src/prisma";

interface IVehicle {
  marca: string;
  modelo: string;
  cor: string;
  placa: string;
  tipo: "carro" | "moto";
}

class VehicleService {
  async createVehicle({ marca, modelo, cor, placa, tipo }: IVehicle) {
    const vehicle = this.validateVehicle({ marca, modelo, cor, placa, tipo });

    try {
      return await prisma.veiculo.create({
        data: { ...vehicle },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Esse veículo já está cadastrado");
        }
      }
      throw error;
    }
  }
  validateVehicle({ marca, modelo, cor, placa, tipo }: IVehicle) {
    if (marca.length < 0) {
      throw new Error("O preenchimento da marca do veículo é obrigatório");
    }

    if (modelo.length < 0) {
      throw new Error("O preenchimento do modelo do veículo é obrigatório");
    }

    if (cor.length < 0) {
      throw new Error("O preenchimento da cor do veículo é obrigatório");
    }

    if (placa.length < 0) {
      throw new Error("O preenchimento da placa do veículo é obrigatório");
    }

    if (!["carro", "moto"].includes(tipo)) {
      throw new Error("O veículo precisa ser do tipo carro ou moto");
    }

    const vehicle = {
      marca,
      modelo,
      cor,
      placa,
      tipo,
    };

    return vehicle;
  }
}

export { VehicleService, IVehicle };
