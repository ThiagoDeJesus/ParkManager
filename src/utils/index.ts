import { Request, Response } from "express";
import { parse } from "js2xmlparser";

export function decideJsonOrXml(
  request: Request,
  response: Response,
  dataObject: Object
) {
  const dataName = Object.keys(dataObject)[0];
  const data = Object.values(dataObject)[0];

  if (request?.query?.xml === "true") {
    const dataXml = parse(dataName, data);

    response.set("Content-Type", "text/xml");
    return response.send(dataXml);
  }
  if (dataName === "error") {
    return response.json({ error: data });
  }
  return response.json(data);
}
