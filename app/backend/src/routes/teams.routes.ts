import { Router } from 'express';
import * as teamsController from '../controller/teamsController';

const TeamsRouter = Router();

TeamsRouter.get('/', teamsController.getAll);

TeamsRouter.get('/:id', teamsController.getById);

export default TeamsRouter;
