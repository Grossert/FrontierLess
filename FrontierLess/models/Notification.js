const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const User = require("./User");
const Project = require("./Project");

const Notification = db.define(
  "Notification",
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Notification.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(Notification, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Notification.belongsTo(Project, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Project.hasMany(Notification, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = Notification;
