const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const UserFollowUser = require('./UserFollowUser')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

User.belongsToMany(User, {
    as: 'Followers', 
    through: UserFollowUser, 
    foreignKey: 'followedId',
    otherKey: 'followerId'
});

User.belongsToMany(User, {
    as: 'Following', 
    through: UserFollowUser, 
    foreignKey: 'followerId',
    otherKey: 'followedId'
});


module.exports = User;
