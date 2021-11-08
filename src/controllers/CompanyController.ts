import { Request, Response } from "express";

import companyService, { ICompany } from "@services/CompanyService";
import { decideJsonOrXml } from "@src/utils";

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

      return decideJsonOrXml(request, response, { empresa });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async getOne(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    try {
      const empresa = await companyService.getById(id);

      return decideJsonOrXml(request, response, { empresa });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const empresas = await companyService.getAll();

      return decideJsonOrXml(request, response, { empresas });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
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

      return decideJsonOrXml(request, response, { empresa: companyResponse });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }

  async delete(request: Request, response: Response) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ error: "Id precisa ser um inteiro" });
    }

    try {
      const empresa = await companyService.deleteById(id);

      return decideJsonOrXml(request, response, { empresa });
    } catch (err: any) {
      response.status(400);
      return decideJsonOrXml(request, response, { error: err.message });
    }
  }
}

export { CompanyController };
