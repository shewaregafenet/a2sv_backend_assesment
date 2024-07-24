const express = require('express');
const recipe = require('../../models/recipe');
const recipe = require('../../models/recipe');
const sequelize  = require('../../database/sequelize');



const getRecipe= async (req, res) => {
    const { id } = req.params;
    try {

        const profile = await recipe.findOne({ where: { id: id } });

        if (!profile) {
            return res.status(404).json({ message: "recipe not found" });
        }


        return res.status(200).json({ profile });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}


const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { Title, instruction, prepTime, } = req.body;

    try {
        const recipe = await recipe.findOne({ where: { id: id } });
        if (!recipe) {
            return res.status(404).json({ message: "User not found" });
        }
        
      recipe.Title =  Title;
      recipe.instruction = instruction;
      recipe.prepTime = prepTime;

        const updateRecipe = {
           Title,
           instruction,
           prepTime
          
        }


        await recipe.save();
        return res.status(200).json({ message: "recipe updated successfully", updatedUser });

    }
    catch (error) {
        return res.status(500).json({ error: error });
    }

}
 const deletRecipe = async(req , res) =>{

    const {id} = req.params;
    try{
        const recipe = await  recipe.findOne({where :{id :id}});
        if (!recipe){
            return res.status(404).json({message :"recipe not found"})
        }
        await recipe.destroy({
            where:{id :id}
        })

        
    }
    catch (error){
        return res.status(400).json({error :""})
    }
}
    

 


  


module.exports = { getRecipe, updateRecipe ,deletRecipe };