import { Router } from 'express';
import validateInputs from '../middlewares/loginMiddleware';
import { LoginController, ValidateController } from '../controller/loginController';

const LoginRouter = Router();

LoginRouter.get('/validate', ValidateController);

LoginRouter.post('/', validateInputs, LoginController);

export default LoginRouter;
