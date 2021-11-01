import { Request, Response } from "express";

import { CompanyService } from "@services/CompanyService";

class CompanyController {
  async createCompany(request: Request, response: Response) {
    const {
      nome,
      cnpj,
      telefone,
      quantidade_vagas_carro,
      quantidade_vagas_moto,
      endereco,
    } = request.body;

    const companyService = new CompanyService();

    try {
      const empresa = await companyService.createCompany({
        nome,
        cnpj,
        telefone,
        quantidade_vagas_carro,
        quantidade_vagas_moto,
        endereco,
      });

      return response.json({ empresa });
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CompanyController };
