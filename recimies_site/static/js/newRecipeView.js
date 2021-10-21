// document.addEventListener('DOMContentLoaded', function(){ 

// })

// Main Elements
const deleteBoxes = document.querySelectorAll('[id$="-DELETE"]')
const deleteLabels = document.querySelectorAll('[for$="-DELETE"]')
const mainForm = document.querySelector('#recipe-form')
//Ingredients Elements
const ingredientForm = document.querySelectorAll('[class^="ingredient-form"]')
const addIngredientButton = document.querySelectorAll('[id^="add-ingredient"]')[0]
const totalIngredientsForms = document.querySelector('#id_ingredients-TOTAL_FORMS')
let ingredientsFormCount = ingredientForm.length - 1;

//Directions Elements
const directionForm = document.querySelectorAll('[class^="direction-form"]')
const addDirectionButton = document.querySelectorAll('[id^="add-direction"]')[0]
const totalDirectionForms = document.querySelector('#id_direction-TOTAL_FORMS')
let directionFormCount = directionForm.length - 1;

//Hide Django delete label and checkbox
deleteBoxes.forEach(ele => ele.classList.add("hidden"))
deleteLabels.forEach(ele => ele.classList.add("hidden"))

//Enables Ingredients Add button
addIngredientButton.addEventListener("click", function(event){
  event.preventDefault()
  const newIngredientForm = ingredientForm[0].cloneNode(true)
  const formRegex = RegExp(`ingredients-(\\d){1}-`, 'g');
  ingredientsFormCount++;
  newIngredientForm.innerHTML = newIngredientForm.innerHTML.replace(formRegex, `ingredients-${ingredientsFormCount}-`)
  mainForm.insertBefore(newIngredientForm, addIngredientButton);
  totalIngredientsForms.setAttribute('value', `${ingredientsFormCount + 1}`);
});
//Enables Ingredients Delete button
mainForm.addEventListener("click", function(event){
  if (event.target.classList.contains('delete-ingredient-form')){
    event.preventDefault();
    event.target.parentElement.remove();
    ingredientsFormCount--;
    totalIngredientsForms.setAttribute('value', `${ingredientsFormCount + 1}`);
  }
})

//Enables Direction Add button
addDirectionButton.addEventListener("click", function(event){
  event.preventDefault()
  const newDirectionForm = directionForm[0].cloneNode(true)
  const formRegex = RegExp(`direction-(\\d){1}-`, 'g');
  directionFormCount++;
  newDirectionForm.innerHTML = newDirectionForm.innerHTML.replace(formRegex, `direction-${directionFormCount}-`)
  mainForm.insertBefore(newDirectionForm, addDirectionButton);
  totalDirectionForms.setAttribute('value', `${directionFormCount + 1}`);
});
//Enables Direction Delete button
mainForm.addEventListener("click", function(event){
  if (event.target.classList.contains('delete-direction-form')){
    event.preventDefault();
    event.target.parentElement.remove();
    directionFormCount--;
    totalDirectionForms.setAttribute('value', `${directionFormCount + 1}`);
  }
})
