import { Request, Response } from 'express';
import leaderBoardService from '../service/leaderBoardService';

const getAll = async (_req: Request, res:Response) => {
  try {
    const { httpStatusCode, response } = await leaderBoardService.getAll();

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getHome = async (_req: Request, res:Response) => {
  try {
    const { httpStatusCode, response } = await leaderBoardService.getHome();

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAway = async (_req: Request, res:Response) => {
  try {
    const { httpStatusCode, response } = await leaderBoardService.getAway();

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { getAll, getHome, getAway };
