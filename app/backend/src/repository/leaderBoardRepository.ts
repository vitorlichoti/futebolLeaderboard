import Match from '../database/models/Match';
import Team from '../database/models/Team';

const getTeams = async () => Team.findAll({ raw: true });

const getMacthes = async () => Match.findAll({
  raw: true,
  attributes: { exclude: ['id', 'home_team_id', 'away_team_id', 'inProgress'] },
  where: {
    inProgress: false,
  },
});

export default { getMacthes, getTeams };
