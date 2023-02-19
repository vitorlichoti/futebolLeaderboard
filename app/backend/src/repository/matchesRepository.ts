import Team from '../database/models/Team';
import Match from '../database/models/Match';

const findAll = async () => {
  const matches = await Match.findAll(
    {
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    },
  );

  return matches;
};

const findByQuery = async (q:boolean) => {
  const matches = await Match.findAll({
    attributes: { exclude: ['home_team_id', 'away_team_id'] },
    where: {
      inProgress: q,
    },
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return matches;
};

const create = async (
  homeTeamId:number,
  awayTeamId:number,
  homeTeamGoals:number,
  awayTeamGoals: number,
) => {
  const createdMatch = await Match.create(
    {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    },
    { fields: ['homeTeamId', 'awayTeamId', 'homeTeamGoals', 'awayTeamGoals', 'inProgress'] },
  );

  return createdMatch;
};

const updateMatch = async (id:number, homeTeamGoals:number, awayTeamGoals:number) => {
  const updated = await Match.update({ homeTeamGoals, awayTeamGoals }, {
    where: { id },
  });

  return updated;
};

const finishMatch = async (id:number) => {
  const finished = await Match.update({ inProgress: false }, {
    where: { id },
  });

  return finished;
};

export { findAll, findByQuery, create, updateMatch, finishMatch };
