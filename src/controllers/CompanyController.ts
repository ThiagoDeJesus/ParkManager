import { Request, Response } from "express";

import companyService, { ICompany } from "@services/CompanyService";

class CompanyController {
  async create(request: Request, response: Response) {
    const {
      nome,
      cnpj,
      telefone,
      quantidade_vagas_carro,
      quantidade_vagas_moto,
      endereco,
    }: ICompany = request.body;

    try {
      const empresa = await companyService.create({
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

  async getOne(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    try {
      const empresa = await companyService.getById(id);

      return response.json({ empresa });
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const empresas = await companyService.getAll();

      return response.json({ empresas });
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    const company: Partial<ICompany> = request.body;

    try {
      const companyResponse = await companyService.update(id, company);

      return response.status(200).json({ empresa: companyResponse });
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
      const empresa = await companyService.deleteById(id);

      return response.json({ empresa });
    } catch (err: any) {
      console.log(err);
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CompanyController };
