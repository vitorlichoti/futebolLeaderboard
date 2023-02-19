import { Router } from 'express';
import LeaderBoardController from '../controller/leaderBoardController';

const LeaderBoardRouter = Router();

LeaderBoardRouter.get('/', LeaderBoardController.getAll);

LeaderBoardRouter.get('/home', LeaderBoardController.getHome);

LeaderBoardRouter.get('/away', LeaderBoardController.getAway);

export default LeaderBoardRouter;
