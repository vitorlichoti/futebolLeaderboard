import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import LoginService from '../service/loginService';

interface Payload {
  id:number;
  role:string;
  iat:number;
}

const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { httpStatusCode, response } = await LoginService(email, password);

    return res.status(httpStatusCode).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const ValidateController = async (req: Request, res: Response) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json('Unauthorized');

  const { role } = decode(token) as Payload;

  return res.status(200).json({ role });
};

export { LoginController, ValidateController };

// class LoginController {
//   private readonly _service: LoginService;

//   constructor(service: LoginService) {
//     this._service = service;
//   }

//   public async getUser(req: Request, res: Response): Promisse<Response | void> {
//     const { username, password } = req.body;

//     try {
//       const { httpStatusCode, response } = await this._service(username, password);

//       return res.status(httpStatusCode).json({ response });
//     } catch (error) {
//       res.status(400).json(error);
//     }
//   }
// }

// export default LoginController;
