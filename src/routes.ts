import { Router } from "express";
import { CompanyController } from "./controllers/CompanyController";

const router = Router();

router.post("/empresas/create", new CompanyController().createCompany);

export { router };
