const mongoose = require("mongoose")
const {initialiseDatabase} = require("./db/db.connect")
const Recipe = require("./models/recipe.model")
const express = require("express")
const cors = require("cors")

const port = 8000

const app = express()

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

initialiseDatabase()

app.listen(port, () => {
    console.log("Server is up and running on", port)
})

app.get("/", async (req, res) => {
    res.send("Hello!")
})


app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find()
        recipes.length > 0 ? 
        res.send(recipes): res.status(404).json("Recipes not found.")
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

app.post("/recipes", async (req, res) => {
    try {
        const newRecipe =  new Recipe(req.body)
        const savedRecipe = await newRecipe.save()
        res.status(201).json({message: "Recipe added successfully", recipe: savedRecipe})
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed to Add Recipe.")
    }
})

app.delete("/recipes/deleteRecipe/:recipeId", async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId)
        res.status(201).json("Recipe deleted successfully.")
    } catch (error) {
        res.status(500).json("Recipe delete operation failed.")
    }
})