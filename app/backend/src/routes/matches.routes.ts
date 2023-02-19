import { Router } from 'express';
import matchValidations from '../middlewares/matchValidations';
import matchesController from '../controller/matchesController';

const MatchesRouter = Router();

MatchesRouter.get('/', matchesController.getByQuery);

MatchesRouter.post(
  '/',
  matchValidations.token,
  matchValidations.equalTeams,
  matchValidations.teamExist,
  matchesController.createMatch,
);

MatchesRouter.patch('/:id', matchesController.updateMatch);

MatchesRouter.patch('/:id/finish', matchesController.finishMatch);

export default MatchesRouter;
