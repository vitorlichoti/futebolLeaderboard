import tokenGenerator from '../utils/tokenGenerator';
import User from '../database/models/User';
import bcryptCompare from '../utils/bcryptCompare';

export default async function LoginService(email:string, password:string) {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) return { httpStatusCode: 401, response: { message: 'Incorrect email or password' } };

  const resultCompare = await bcryptCompare(password, user.dataValues.password);

  if (!resultCompare) {
    return { httpStatusCode: 401, response: { message: 'Incorrect email or password' } };
  }

  const token = tokenGenerator(user);

  return { httpStatusCode: 200, response: { token } };
}

// export default class LoginService {
//   private _model: IUser;
//   constructor(userModel: IUser) {
//     this._model = userModel;
//   }

//   public async getEmailPassword(email: string, password: string): Promisse<[IUser] | void> {
//     const userExists = await this._model.findOne({
//       where: {
//         [Op.and]: [{ email }, { password }],
//       },
//     });

//     if (!userExists) return { httpStatusCode: 404, response: 'User not exists' };

//     return { httpStatusCode: 200, response: userExists };
//   }
// }
