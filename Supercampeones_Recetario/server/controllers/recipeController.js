require('../models/database');
const Tipo = require('../models/Tipo');
const Recipe = require('../models/Recipe');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const tipos = await Tipo.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const carne = await Recipe.find({ 'tipo': 'Carne' }).limit(limitNumber);
    const mariscos = await Recipe.find({ 'tipo': 'Mariscos' }).limit(limitNumber);
    const saludable = await Recipe.find({ 'tipo': 'Saludable' }).limit(limitNumber);
    const vegetariano = await Recipe.find({ 'tipo': 'Vegetariano' }).limit(limitNumber);

    const food = { latest, carne, mariscos, saludable,vegetariano };

    res.render('index', { title: 'Supercampeones | Inicio', tipos, food } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error" });
  }
}


exports.exploreTipos = async(req, res) => {
  try {
    const limitNumber = 20;
    const tipos = await Tipo.find({}).limit(limitNumber);
    res.render('tipos', { title: 'Supercampeones | Tipos', tipos } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error" });
  }
} 

exports.exploreTiposById = async(req, res) => { 
  try {
    let tipoId = req.params.id;
  
    const limitNumber = 20;
    const tipoById = await Recipe.find({ 'tipo': tipoId }).limit(limitNumber);
    res.render('tipos', { title: 'Supercampeones | Tipos', tipoById } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error" });
  }
} 
 
/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Supercampeones | Receta', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error" });
  }
} 

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreRecipes = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('recipes', { title: 'Supercampeones | Últimas', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error " });
  }
} 

/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Supercampeones | Crear Receta', infoErrorsObj, infoSubmitObj  } );
}


exports.login = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('login', { title: 'Supercampeones | Login', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      nombre: req.body.nombre,
      duracion: req.body.duracion,
      steps: req.body.steps,
      ingredients: req.body.ingredients,
      tipo: req.body.tipo,
      imagen: req.body.imagen
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Receta agregada correctamente.')
    res.redirect('/submit-recipe');
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}

exports.updateRecipe = async(req,res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('edit-recipe', { title: 'Supercampeones | Editar Recetas', infoErrorsObj, infoSubmitObj  } );
}

/*exports.deleteRecipe = async(req,res) => {
  let recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);
   try {
      await Recipe.deleteOne({ name: recipe.name });
      //const infoSubmitObj = req.flash('infoSubmit');
      res.render('recipes', { title: 'Supercampeones | Recetas',infoSubmitObj  } );
  } catch (error) {
     console.log(error);
   }
  
}*/

// Delete Recipe
async function deleteRecipe(){
   try {
     await Recipe.deleteOne({ _id: '61a880e019db56efebcb7162' });   
    } catch (error) {
     console.log(error);
   }
 }
 deleteRecipe();



// Update Recipe
/*async function updateRecipe(){
   try {
     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
     res.n; // Number of documents matched
     res.nModified; // Number of documents modified
   } catch (error) {
     console.log(error);
  }
 }*/
// updateRecipe();