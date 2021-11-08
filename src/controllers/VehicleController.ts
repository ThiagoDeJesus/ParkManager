import { Request, Response } from "express";

import vehicleService, { IVehicle } from "@services/VehicleService";
import { decideJsonOrXml } from "@src/utils";

class VehicleController {
  async create(request: Request, response: Response) {
    const { marca, modelo, cor, placa, tipo }: IVehicle = request.body;

    try {
      const vehicle = await vehicleService.createVehicle({
        marca,
        modelo,
        cor,
        placa,
        tipo,
      });

      return decideJsonOrXml(request, response, { veiculo: vehicle });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async getOne(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    try {
      const vehicle = await vehicleService.getById(id);

      return decideJsonOrXml(request, response, { vehicle });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const vehicles = await vehicleService.getAll();

      return decideJsonOrXml(request, response, { veiculos: vehicles });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async update(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    const vehicle: IVehicle = request.body;

    try {
      const vehicleResponse = await vehicleService.update(id, vehicle);

      return decideJsonOrXml(request, response, { veiculo: vehicle });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async delete(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    try {
      const vehicle = await vehicleService.deleteById(id);

      return decideJsonOrXml(request, response, { veiculo: vehicle });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }
}

export { VehicleController };
