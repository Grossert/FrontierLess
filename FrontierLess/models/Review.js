const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const Project = require('./Project');
const User = require('./User');

const Review = db.define('Review', {
    grade: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

Review.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Review.belongsTo(Project, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Review);
Project.hasMany(Review, { as: 'Reviews' });

module.exports = Review;
