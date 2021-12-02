const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes 
*/
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/tipos/:id', recipeController.exploreTiposById);
router.get('/recipes', recipeController.exploreRecipes);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.get('/login', recipeController.login);
router.get('/edit-recipe',recipeController.updateRecipe);
//router.delete('/recipe/:id',recipeController.deleteRecipe)
 
module.exports = router;