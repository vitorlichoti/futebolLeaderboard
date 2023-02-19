import * as bcrypt from 'bcryptjs';

const bcryptCompare = async (password: string, hash:string): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash);

  return result;
};

export default bcryptCompare;
