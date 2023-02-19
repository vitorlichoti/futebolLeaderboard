import * as teamsRepository from '../repository/teamsRepository';

const getAll = async () => {
  const response = await teamsRepository.findAll();

  if (!response) return { httpStatusCode: 404, response: 'Not found' };

  return { httpStatusCode: 200, response };
};

const getById = async (id:number) => {
  const response = await teamsRepository.findById(id);

  if (!response) return { httpStatusCode: 404, response: 'Not found' };

  return { httpStatusCode: 200, response };
};

export { getAll, getById };
