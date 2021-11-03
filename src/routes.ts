import { Router } from "express";
import { CompanyController } from "@controllers/CompanyController";
import { VehicleController } from "@controllers/VehicleController";
import { ParkController } from "@controllers/ParkController";

const router = Router();

router.post("/empresas/create", new CompanyController().createCompany);

router.post("/veiculos/create", new VehicleController().create);

router.post("/estacionamento/enter", new ParkController().enter);
router.post("/estacionamento/leave", new ParkController().leave);

export { router };
