import { Router } from "express";
import { CompanyController } from "@controllers/CompanyController";
import { VehicleController } from "./controllers/VehicleController";

const router = Router();

router.post("/empresas/create", new CompanyController().createCompany);

router.post("/veiculos/create", new VehicleController().create);

export { router };
