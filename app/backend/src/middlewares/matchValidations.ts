import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Op } from 'sequelize';

import Team from '../database/models/Team';

const secret = process.env.JWT_SECRET || 'jwt_secret';

interface Payload {
  id:number;
  role:string;
  iat:number;
}

const token = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  try {
    if (!authHeader || authHeader === null) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    verify(authHeader, secret) as Payload;

    next();
  } catch (_error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const equalTeams = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

const teamExist = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  const searchResult = await Team.findAll({
    where: {
      [Op.or]: [{ id: homeTeamId }, { id: awayTeamId }],
    },
  });

  if (searchResult.length !== 2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default { token, equalTeams, teamExist };
