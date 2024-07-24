const {DataTypes} = require("sequelize")

const sequelize = require("../database/sequelize")
const ingridient = require("./ingridient")

const recipe = sequelize.define("recipe",
    {

Title: {
    type : DataTypes.STRING,
},
Instrustion: {
    type : DataTypes.STRING,
},
prepTime :{
    type:DataTypes.STRING,
}


})
recipe.hasMany(ingridient ,{as :"ingeridient "})
module.exports = recipe