import Team from '../database/models/Team';

interface IResult {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

const getGeneralResults = (teams:Team[], resultHome:IResult[], resultAway:IResult[]) => {
  const result = teams.map((e, i) => ({
    name: e.teamName,
    totalPoints: resultHome[i].totalPoints + resultAway[i].totalPoints,
    totalGames: resultHome[i].totalGames + resultAway[i].totalGames,
    totalVictories: resultHome[i].totalVictories + resultAway[i].totalVictories,
    totalDraws: resultHome[i].totalDraws + resultAway[i].totalDraws,
    totalLosses: resultHome[i].totalLosses + resultAway[i].totalLosses,
    goalsFavor: resultHome[i].goalsFavor + resultAway[i].goalsFavor,
    goalsOwn: resultHome[i].goalsOwn + resultAway[i].goalsOwn,
    goalsBalance: resultHome[i].goalsBalance + resultAway[i].goalsBalance,
    efficiency: Number((((resultHome[i].totalPoints + resultAway[i].totalPoints)
      / ((resultHome[i].totalGames + resultAway[i].totalGames) * 3)) * 100).toFixed(2)),
  }));

  return result;
};

export default getGeneralResults;
