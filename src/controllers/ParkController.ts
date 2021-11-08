import { Request, Response } from "express";

import parkService from "@src/services/ParkService";
import { IVehicle } from "@src/services/VehicleService";
import { decideJsonOrXml } from "@src/utils";

interface IEnterRequestBody {
  vehicle: IVehicle;
  cnpj: string;
}

interface ILeaveRequestBody {
  vehicle: IVehicle;
}

class ParkController {
  async enter(request: Request, response: Response) {
    const { vehicle, cnpj }: IEnterRequestBody = request.body;

    try {
      const historico = await parkService.enterVehicle(vehicle, cnpj);

      return decideJsonOrXml(request, response, { historico });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async leave(request: Request, response: Response) {
    const { vehicle }: ILeaveRequestBody = request.body;

    try {
      const historico = await parkService.leaveVehicle(vehicle.placa);

      return decideJsonOrXml(request, response, { historico });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }
}

export { ParkController };
