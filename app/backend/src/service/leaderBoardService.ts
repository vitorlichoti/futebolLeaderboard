import leaderBoardRepository from '../repository/leaderBoardRepository';
import getSortedResult from '../utils/sortResults';
import getAwayResults from '../utils/awayFilters';
import getHomeResults from '../utils/homeFilters';
import getGeneralResults from '../utils/geralLeaderboard';

const getHome = async () => {
  const matches = await leaderBoardRepository.getMacthes();

  const teams = await leaderBoardRepository.getTeams();

  const resultHome = teams.map((e) => getHomeResults(e.id, e.teamName, matches));

  const sortedResult = getSortedResult(resultHome);

  return { httpStatusCode: 200, response: sortedResult };
};

const getAway = async () => {
  const matches = await leaderBoardRepository.getMacthes();

  const teams = await leaderBoardRepository.getTeams();

  const resultAway = teams.map((e) => getAwayResults(e.id, e.teamName, matches));

  const sortedResult = getSortedResult(resultAway);

  return { httpStatusCode: 200, response: sortedResult };
};

const getAll = async () => {
  const matches = await leaderBoardRepository.getMacthes();
  const teams = await leaderBoardRepository.getTeams();

  const resultHome = teams.map((e) => getHomeResults(e.id, e.teamName, matches));
  const resultAway = teams.map((e) => getAwayResults(e.id, e.teamName, matches));

  const resultGeral = getGeneralResults(teams, resultHome, resultAway);

  const sortedResult = getSortedResult(resultGeral);

  return { httpStatusCode: 200, response: sortedResult };
};

export default { getAll, getHome, getAway };
