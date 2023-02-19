import * as matchesRepository from '../repository/matchesRepository';

const getAll = async () => {
  const response = await matchesRepository.findAll();

  return { httpStatusCode: 200, response };
};

const getByQuery = async (q:string) => {
  const bool = JSON.parse(q);

  const response = await matchesRepository.findByQuery(bool);

  return { httpStatusCode: 200, response };
};

const createMatch = async (
  homeTeamId:number,
  awayTeamId:number,
  homeTeamGoals:number,
  awayTeamGoals: number,
) => {
  const response = await matchesRepository
    .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

  return { httpStatusCode: 201, response };
};

const updateMatch = async (id:number, homeTeamGoals:number, awayTeamGoals:number) => {
  const response = await matchesRepository.updateMatch(id, homeTeamGoals, awayTeamGoals);

  if (!response) return { httpStatusCode: 400, response: 'Failed' };

  return { httpStatusCode: 200, response: '' };
};

const finishMatch = async (id:number) => {
  const response = await matchesRepository.finishMatch(id);

  if (!response) return { httpStatusCode: 400, response: 'Failed' };

  return { httpStatusCode: 200, response: 'Finished' };
};

export { getAll, getByQuery, createMatch, updateMatch, finishMatch };
