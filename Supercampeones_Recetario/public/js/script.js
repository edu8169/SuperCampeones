let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

let addStepsBtn = document.getElementById('addStepsBtn');
let stepList = document.querySelector('.stepList');
let stepDiv = document.querySelectorAll('.stepDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});

addStepsBtn.addEventListener('click', function(){
  let newSteps = stepDiv.cloneNode(true);
  let input = newSteps.getElementsByTagName('input')[0];
  input.value = '';
  stepList.appendChild(newSteps);
});

