import { Request, Response } from 'express';
import * as teamsService from '../service/teamsService';

const getAll = async (_req: Request, res: Response) => {
  try {
    const { httpStatusCode, response } = await teamsService.getAll();

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { httpStatusCode, response } = await teamsService.getById(Number(id));

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { getAll, getById };
