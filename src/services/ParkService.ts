import {
  Empresa as IPrismaEmpresa,
  Prisma,
  Veiculo as IPrismaVeiculo,
} from "@prisma/client";

import prisma from "@src/prisma";

import { IVehicle, VehicleService } from "@services/VehicleService";
import { CompanyService } from "./CompanyService";

const companyService = new CompanyService();
const vehicleService = new VehicleService();

class ParkService {
  async enterVehicle(vehicle: IVehicle, cnpj: string) {
    const empresa = await companyService.getByCnpj(cnpj);

    const vaga = await this.getVaga(empresa, vehicle.tipo);

    const veiculo = await vehicleService.getVehicleByPlate(vehicle.placa);

    const isParked = await this.checkIfIsParked(veiculo);
    if (isParked) {
      throw new Error("O veículo já está estacionado");
    }

    return await prisma.historicoVeiculo.create({
      data: {
        empresaId: vaga!.empresaId,
        vagaId: vaga!.id,
        veiculoId: veiculo!.id,
      },
    });
  }

  async leaveVehicle(vehiclePlate: string) {
    const veiculo = await vehicleService.getVehicleByPlate(vehiclePlate);

    const isParked = await this.checkIfIsParked(veiculo);
    if (!isParked) {
      throw new Error("Este veículo não consta estacionado no sistema");
    }

    const leaveDate = new Date();

    await prisma.historicoVeiculo.updateMany({
      where: {
        veiculoId: veiculo.id,
        saida: null,
      },
      data: {
        saida: leaveDate,
      },
    });

    return await prisma.historicoVeiculo.findFirst({
      where: {
        veiculoId: veiculo.id,
        saida: leaveDate,
      },
      include: {
        veiculo: {
          select: {
            placa: true,
            tipo: true,
          },
        },
        vaga: {
          select: {
            empresa: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });
  }

  async checkIfIsParked(veiculo: IPrismaVeiculo) {
    const parkedVehicle = await prisma.historicoVeiculo.findMany({
      where: {
        saida: null,
        veiculoId: veiculo.id,
      },
    });
    if (!parkedVehicle[0]) {
      return false;
    }

    return true;
  }

  async getVaga(company: IPrismaEmpresa, tipo: "carro" | "moto") {
    const vaga = await prisma.vaga.findFirst({
      where: {
        empresaId: company.id,
        tipo,
        HistoricoVeiculo: {
          none: {
            saida: null,
          },
        },
      },
    });
    if (!vaga) {
      throw new Error("Não há vagas disponíveis");
    }
    return vaga;
  }
}

export { ParkService };
