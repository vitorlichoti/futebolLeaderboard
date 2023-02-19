module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      home_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
        // Informa a tabela da referência da associação
          model: 'teams',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
        // Informa a tabela da referência da associação
          model: 'teams',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  },
};