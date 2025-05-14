const { DataTypes } = require('sequelize');
const db = require('../db/connection');
const User = require('../models/User')
const Project = require('../models/Project')

const UserFollowProject = db.define('UserFollowProject', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = UserFollowProject;