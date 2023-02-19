import * as express from 'express';
import LeaderBoardRouter from './routes/leaderboard.routes';
import LoginRouter from './routes/login.routes';
import MatchesRouter from './routes/matches.routes';
import TeamsRouter from './routes/teams.routes';

// import { myMockToken } from './tests/mocks/fakeData';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    // this.app.post('/login', (req, res) => {
    //   res.status(200).json(myMockToken);
    // });
  }

  private routes(): void {
    this.app.use('/login', LoginRouter);
    this.app.use('/teams', TeamsRouter);
    this.app.use('/matches', MatchesRouter);
    this.app.use('/leaderboard', LeaderBoardRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
