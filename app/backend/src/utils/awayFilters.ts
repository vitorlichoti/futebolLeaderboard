import Match from '../database/models/Match';

export const getAwayPoints = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.awayTeamId === team).map((e) => {
    let sum = 0;
    if (e.homeTeamGoals < e.awayTeamGoals) sum += 3;
    if (e.homeTeamGoals > e.awayTeamGoals) sum += 0;
    if (e.homeTeamGoals === e.awayTeamGoals) sum += 1;
    return sum;
  }).reduce((sum, crr) => sum + crr, 0);

  return result;
};

export const getAwayGames = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.awayTeamId === team);

  return result.length;
};

export const getAwayGoalsFavor = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.awayTeamId === team)
    .reduce((sum, curr) => sum + curr.awayTeamGoals, 0);

  return result;
};

export const getAwayGoalsOwn = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.awayTeamId === team)
    .reduce((sum, curr) => sum + curr.homeTeamGoals, 0);

  return result;
};

export const getAwayVictories = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.awayTeamId === team).map((e) => {
    let sum = 0;
    if (e.awayTeamGoals > e.homeTeamGoals) sum += 1;
    return sum;
  }).reduce((sum, curr) => sum + curr, 0);

  return result;
};

export const getAwayDraws = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.awayTeamId === team).map((e) => {
    let sum = 0;
    if (e.awayTeamGoals === e.homeTeamGoals) sum += 1;
    return sum;
  }).reduce((sum, curr) => sum + curr, 0);

  return result;
};

export const getAwayLosses = (team:number, matches:Match[]) => {
  const result = matches.filter((e) => e.awayTeamId === team).map((e) => {
    let sum = 0;
    if (e.awayTeamGoals < e.homeTeamGoals) sum += 1;
    return sum;
  }).reduce((ttl, curr) => ttl + curr, 0);

  return result;
};

export const getAwayEfficiency = (points:number, games:number) => {
  const result = (points / (games * 3)) * 100;

  return Number(result.toFixed(2));
};

const getAwayResults = (teamId:number, name:string, matches:Match[]) => {
  // chama o metodo de getAwayPoints e totalGames
  const totalPoints = getAwayPoints(teamId, matches);
  const totalGames = getAwayGames(teamId, matches);
  // chama o metodo de getAwayVictories, getAwayDraws, getAwayLosses
  const totalVictories = getAwayVictories(teamId, matches);
  const totalDraws = getAwayDraws(teamId, matches);
  const totalLosses = getAwayLosses(teamId, matches);
  // chama o metodo de getAwayGoalsFavor, getAwayGoalsOwn, getGoalsBalance
  const goalsFavor = getAwayGoalsFavor(teamId, matches);
  const goalsOwn = getAwayGoalsOwn(teamId, matches);
  // chama o metodo de getAcuracy
  const efficiency = getAwayEfficiency(totalPoints, totalGames);
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

export default getAwayResults;
