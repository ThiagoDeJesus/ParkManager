import { Request, Response } from "express";

import { VehicleService, IVehicle } from "@services/VehicleService";

class VehicleController {
  async create(request: Request, response: Response) {
    const { marca, modelo, cor, placa, tipo }: IVehicle = request.body;

    const vehicleService = new VehicleService();

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
}

export { VehicleController };
