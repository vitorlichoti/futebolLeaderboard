import { Request, Response } from 'express';
import * as matchesService from '../service/matchesService';

const getByQuery = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  try {
    if (typeof inProgress !== 'string' || !inProgress) {
      const { httpStatusCode, response } = await matchesService.getAll();
      return res.status(httpStatusCode).json(response);
    }

    const { httpStatusCode, response } = await matchesService.getByQuery(inProgress);

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createMatch = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  try {
    const { httpStatusCode, response } = await matchesService
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateMatch = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;

  try {
    const { httpStatusCode, response } = await matchesService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { httpStatusCode, response } = await matchesService.finishMatch(Number(id));

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { getByQuery, createMatch, updateMatch, finishMatch };
