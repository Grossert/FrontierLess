const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const User = require("./User");
const UserFollowProject = require("./UserFollowProject");

const Project = db.define("Project", {
  destination: {
    type: DataTypes.STRING,
    required: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["progredindo", "hiato", "finalizado", "abandonado"],
    allowNull: false,
    defaultValue: "progredindo",
  },
  exchangeType: {
    type: DataTypes.ENUM,
    values: ["idioma", "escola", "faculdade", "pós-graduação", "pesquisa"],
    allowNull: true,
  },
});

Project.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
User.hasMany(Project, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

User.belongsToMany(Project, { as: 'FollowedProjects', through: UserFollowProject, foreignKey: 'userId' });
Project.belongsToMany(User, { as: 'Followers', through: UserFollowProject, foreignKey: 'projectId' });

module.exports = Project;
