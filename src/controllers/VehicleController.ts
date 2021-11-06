import { Request, Response } from "express";

import vehicleService, { IVehicle } from "@services/VehicleService";

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

      return response.json(vehicle);
    } catch (err: any) {
      return response.status(404).json({ error: err.message });
    }
  }

  async getOne(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    try {
      const vehicle = await vehicleService.getById(id);

      return response.json({ vehicle });
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const vehicles = await vehicleService.getAll();

      return response.json({ veiculos: vehicles });
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
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

      return response.status(200).json({ empresa: vehicleResponse });
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  async delete(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    try {
      const vehicle = await vehicleService.deleteById(id);

      return response.json({ veiculo: vehicle });
    } catch (err: any) {
      console.log(err);
      return response.status(400).json({ error: err.message });
    }
  }
}

export { VehicleController };
