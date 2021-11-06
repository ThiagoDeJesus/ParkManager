import { Router } from "express";
import { CompanyController } from "@controllers/CompanyController";
import { VehicleController } from "@controllers/VehicleController";
import { ParkController } from "@controllers/ParkController";

const companyController = new CompanyController();

const router = Router();

router.post("/empresas/create", companyController.create);
router.get("/empresas/:id", companyController.getOne);
router.get("/empresas", companyController.getAll);
router.patch("/empresas/update/:id", companyController.update);
router.delete("/empresas/delete/:id", companyController.delete);

router.post("/veiculos/create", new VehicleController().create);

router.post("/estacionamento/enter", new ParkController().enter);
router.post("/estacionamento/leave", new ParkController().leave);

export { router };
