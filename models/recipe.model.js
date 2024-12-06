const mongoose = require("mongoose")
const { type } = require("os")

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    recipeImageURL: {
        type: String,
        required: true
    },
    ingredients: [
        {type: String, required: true}
    ],
    instructions: [
        {type: String, required: true}
    ]
})

const Recipe = mongoose.model("recipe", recipeSchema)

module.exports = Recipe