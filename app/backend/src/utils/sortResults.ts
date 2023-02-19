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

const getSortedResult = (result:IResult[]) => {
  const sorted = result.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    } if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    } if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    } if (a.goalsFavor !== b.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    return a.goalsBalance - b.goalsBalance;
  });
  return sorted;
};

export default getSortedResult;
