import { Request, Response } from "express";

import parkService from "@src/services/ParkService";
import { IVehicle } from "@src/services/VehicleService";

interface IEnterRequestBody {
  vehicle: IVehicle;
  cnpj: string;
}

interface ILeaveRequestBody {
  plate: string;
}

class ParkController {
  async enter(request: Request, response: Response) {
    const { vehicle, cnpj }: IEnterRequestBody = request.body;

    try {
      const historico = await parkService.enterVehicle(vehicle, cnpj);

      return response.json({ historico });
    } catch (err: any) {
      return response.status(404).json({ error: err.message });
    }
  }

  async leave(request: Request, response: Response) {
    const { plate }: ILeaveRequestBody = request.body;

    try {
      const historico = await parkService.leaveVehicle(plate);

      return response.json({ historico });
    } catch (err: any) {
      return response.status(404).json({ error: err.message });
    }
  }
}

export { ParkController };
