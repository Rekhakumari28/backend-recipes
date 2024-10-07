const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    difficulty:  {
        type: String,
        required: true,
        enum: ["Easy", "Intermediate", "Difficult"]
    },
    prepTime: {
        type: Number,
        require: true,
    },
    cookTime: {
        type: Number,
        require: true,
    },
    ingredients:[{
        type: String,
        required: true
    }],
    instructions:[{
        type: String,
        required: true
    }],
    imageUrl: {
        type: String,
        required: true
    }

},{ timestamps: true })

const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe