const express = require('express')
const app = express()

const {initializeDatabase} = require("./db/db.connect")
const Recipe = require("./models/recipes.models")

app.use(express.json())

initializeDatabase()

//q 3,4,5   create recipes.

async function createRecipe (newRecipe){
    try{
        const recipes = new Recipe(newRecipe)
        const savedRecipe = await recipes.save()
        return savedRecipe
    }catch(error){
        console.log(error)
    }
}

app.post("/recipes", async (req,res)=>{
    try{
        const recipes = await createRecipe(req.body)
        res.status(201).json({message: "New recipe created.",recipes: recipes})
    }catch(error){
        res.status(500).json({error: "Failed to create new recipe."})
    }
})

//q6 find all recipes from database

async function findAllRecipes() {
    try {
        const recipes = await Recipe.find()
        return recipes
    } catch (error) {
        console.log(error)
    }
}

app.get("/recipes", async (req,res)=>{
    try {
        const recipes = await findAllRecipes()
        if(recipes.length !=0){
            res.json(recipes)
        }else{
            res.status(404).json({error: "No recipes found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to find recipes."})
    }
})

//q7 recipe's details by its title

async function findRecipeByTitle(recipeTitle) {
    try {
        const recipes = await Recipe.findOne({title: recipeTitle})
        return recipes
    } catch (error) {
        console.log(error)
    }
}

app.get("/recipes/:recipeTitle", async (req,res)=>{
    try {
        const recipes = await findRecipeByTitle(req.params.recipeTitle)
        if(recipes.length !=0 ){
            res.json(recipes)
        }else{
            res.status(404).json({error: "No recipes found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to find recipes."})
    }
})

//q8 details of all the recipes by an author.

async function findRecipeByAuthor(authorName) {
    try {
        const recipes = await Recipe.find({author: authorName})
        return recipes 
    } catch (error) {
        console.log(error)
    }
}

app.get("/recipes/author/:authorName", async (req,res)=>{
    try {
        const recipes = await findRecipeByAuthor(req.params.authorName)
        if(recipes.length != 0){
            res.json(recipes)
        }else{
            res.status(404).json({error: "No recipes found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to find recipes."})
    }
})

//q9 recipes that are of "Easy" difficulty level

async function findRecipesByDifficultyLevel(difficultyLevel) {
    try {
        const recipes = await Recipe.find({difficulty: difficultyLevel})
        return recipes
    } catch (error) {
        console.log(error)
    }
}

app.get("/recipes/difficulty/:difficultyLevel", async (req,res)=>{
    try {
        const recipes = await findRecipesByDifficultyLevel(req.params.difficultyLevel)
        if(recipes.length !=0){
            res.json(recipes)
        }else{
            res.status(404).json({error: "No recipes found."}) 
        }
    } catch (error) {
        res.status(500).json({error: "Failed to find recipes."})
    }
})

//q10  update difficulty level with id

async function updateRecipeById(recipeId, dataToUpdate) {
    try {
        const recipes = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate,{new:true})
        return recipes
    } catch (error) {
        console.log(error)
    }
}

app.post("/recipes/:recipeId", async (req,res)=>{
    try {
       const recipes = await  updateRecipeById(req.params.recipeId , req.body)
       if(recipes.length != 0){
        res.status(200).json({message: "Recipe is updated successfully.",recipe: recipes})
       } else{
        res.status(404).json({error: "No recipes found."}) 
       }
    } catch (error) {
        res.status(500).json({error: "Failed to find recipes."})
    }
})

//q11 update prep time and cook time by title

async function updateRecipeByTitle(recipeTitle, dataToUpdate) {
    try {
        const recipes = await Recipe.findOneAndUpdate({title: recipeTitle}, dataToUpdate, {new: true})
        return recipes
    } catch (error) {
        console.log(error)
    }
}

app.post("/recipes/title/:recipeTitle", async (req,res)=>{
    try {
        const recipes = await updateRecipeByTitle(req.params.recipeTitle, req.body)
        if(recipes.length != 0){
            res.status(200).json({message: "Recipe is updated successfully", recipe: recipes})
        }else{
            res.status(404).json({error: "No recipes found."}) 
        }
    } catch (error) {
        res.status(500).json({error: "Failed to find recipes."})
    }
})

//q12 delete recipe by id

async function deleteRecipeById(recipeId) {
    try {
        const recipes = await Recipe.findByIdAndDelete(recipeId)
        return recipes
    } catch (error) {
       console.log(recipes) 
    }
}

app.delete("/recipes/:recipeId", async (req,res)=>{
    try {
        const recipes = await deleteRecipeById(req.params.recipeId)
        if(recipes){
            res.status(200).json({message: "Recipe is deleted successfully.", recipe: recipes})
        }else{
            res.status(404).json({error: "No recipes found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to find recipes."})
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("Server is running on port",PORT)
})

module.exports = app;