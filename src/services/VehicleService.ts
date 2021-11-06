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

  async getById(id: number) {
    try {
      const veiculo = await prisma.veiculo.findUnique({
        where: {
          id: id,
        },
      });

      if (!veiculo) {
        throw new Error("Veiculo não encontrado");
      }

      return veiculo;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2001") {
          throw new Error("Esse Veículo não está cadastrado");
        }
      }
      throw error;
    }
  }

  async getVehicleByPlate(plate: string) {
    const veiculo = await prisma.veiculo.findUnique({
      where: {
        placa: plate,
      },
    });
    if (!veiculo) {
      throw new Error("Este veículo não está cadastrado");
    }
    return veiculo;
  }

  async getAll() {
    return await prisma.veiculo.findMany({});
  }

  async update(id: number, vehicle: IVehicle) {
    try {
      return await prisma.veiculo.update({
        where: {
          id: id,
        },
        data: vehicle,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Veículo não encontrado");
        }
      }
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      await prisma.historicoVeiculo.deleteMany({
        where: {
          veiculoId: id,
        },
      });

      const vehicle = await prisma.veiculo.delete({
        where: {
          id: id,
        },
      });

      return vehicle;
    } catch (err) {
      throw new Error("Veículo não encontrado");
    }
  }

  validateVehicle({ marca, modelo, cor, placa, tipo }: IVehicle) {
    if (!marca || marca.length < 0) {
      throw new Error("O preenchimento da marca do veículo é obrigatório");
    }

    if (!modelo || modelo.length < 0) {
      throw new Error("O preenchimento do modelo do veículo é obrigatório");
    }

    if (!cor || cor.length < 0) {
      throw new Error("O preenchimento da cor do veículo é obrigatório");
    }

    if (!placa || placa.length < 0) {
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

export default new VehicleService();
export { IVehicle };
