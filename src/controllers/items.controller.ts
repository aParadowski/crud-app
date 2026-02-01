import { Request, Response } from "express";
import * as service from '../services/items.service';
import { validateId } from "../utils/idValidator";

export const getAll = async (_: Request, res: Response) => {
  res.json(await service.getAll());
}

export const getById = async (req: Request, res: Response) => {

  try {
    const id = validateId(req.params.id);
    const item = await service.getById(id);
    res.status(200).json(item);
  } catch {
     res.status(400).json({"msg":"No item found"});
  }
}

export const create = async (req: Request, res: Response) => {
  res.status(201).json(await service.create(req.body));
}

export const update = async (req: Request, res: Response) => {
  const id = validateId(req.params.id)
  // could also do +req.params.id to coerce a number but I like how explicit this code is
  res.json(await service.update(id, req.body))
}

export const remove = async (req: Request, res: Response) => {
  const id = validateId(req.params.id);
  await service.remove(id);
  res.status(204).send();
}

export const importCsv  = async (req: Request, res: Response) => {
  const count = await service.importFromCsv(req.body.filePath);
  res.json({ imported: count});
}

