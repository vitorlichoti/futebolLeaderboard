import Match from '../database/models/Match';

const getHomePoints = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.homeTeamId === team).map((e) => {
    let sum = 0;
    if (e.homeTeamGoals > e.awayTeamGoals) sum += 3;
    if (e.homeTeamGoals < e.awayTeamGoals) sum += 0;
    if (e.homeTeamGoals === e.awayTeamGoals) sum += 1;
    return sum;
  }).reduce((sum, crr) => sum + crr, 0);

  return result;
};

const getHomeGames = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.homeTeamId === team);

  return result.length;
};

const getHomeGoalsFavor = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.homeTeamId === team)
    .reduce((sum, curr) => sum + curr.homeTeamGoals, 0);

  return result;
};

const getHomeGoalsOwn = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.homeTeamId === team)
    .reduce((sum, curr) => sum + curr.awayTeamGoals, 0);

  return result;
};

const getHomeVictories = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.homeTeamId === team).map((e) => {
    let sum = 0;
    if (e.homeTeamGoals > e.awayTeamGoals) sum += 1;
    return sum;
  }).reduce((sum, curr) => sum + curr, 0);

  return result;
};

const getHomeDraws = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.homeTeamId === team).map((e) => {
    let sum = 0;
    if (e.homeTeamGoals === e.awayTeamGoals) sum += 1;
    return sum;
  }).reduce((sum, curr) => sum + curr, 0);

  return result;
};

const getHomeLosses = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.homeTeamId === team).map((e) => {
    let sum = 0;
    if (e.homeTeamGoals < e.awayTeamGoals) sum += 1;
    return sum;
  }).reduce((ttl, curr) => ttl + curr, 0);

  return result;
};

const getHomeEfficiency = (points:number, games:number) => {
  const result = (points / (games * 3)) * 100;

  return Number(result.toFixed(2));
};

const getHomeResults = (teamId:number, name:string, matches:Match[]) => {
  // chama o metodo de getHomePoints e totalGames
  const totalPoints = getHomePoints(teamId, matches);
  const totalGames = getHomeGames(teamId, matches);
  // chama o metodo de getHomeVictories, getHomeDraws, getHomeLosses
  const totalVictories = getHomeVictories(teamId, matches);
  const totalDraws = getHomeDraws(teamId, matches);
  const totalLosses = getHomeLosses(teamId, matches);
  // chama o metodo de getHomeGoalsFavor, getHomeGoalsOwn, getGoalsBalance
  const goalsFavor = getHomeGoalsFavor(teamId, matches);
  const goalsOwn = getHomeGoalsOwn(teamId, matches);
  // chama o metodo de getAcuracy
  const efficiency = getHomeEfficiency(totalPoints, totalGames);
  return { name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency };
};

export default getHomeResults;
