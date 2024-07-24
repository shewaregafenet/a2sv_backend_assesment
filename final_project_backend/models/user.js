 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { model } = require('../database/sequelize');


const User = sequelize.define('user', {
     firstName: {
        type:DataTypes.STRING,
     },
        lastName: {
            type:DataTypes.STRING,
        },
        email: {
            type:DataTypes.STRING,
        },
        password :{
            type:DataTypes.STRING,
        }
    },


)
module.exports = User


















