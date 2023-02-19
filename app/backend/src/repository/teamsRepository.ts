import Team from '../database/models/Team';

const findAll = async () => {
  const teams = await Team.findAll();

  return teams;
};

const findById = async (id: number) => {
  const team = await Team.findOne({ where: { id } });

  return team;
};

export { findAll, findById };
