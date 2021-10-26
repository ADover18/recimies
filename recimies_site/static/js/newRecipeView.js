// Main Elements
const mainForm = document.querySelector(".form-container");
const innerForm = document.querySelector('[method="post"]');
const saveButton = document.querySelector("#submit-button");

//Ingredients Elements
const ingredientForm = document.querySelectorAll('[class^="ingredient-form"]');
const totalIngredientsForms = document.querySelector(
  "#id_ingredients-TOTAL_FORMS"
);
const hiddenIngredientsForms = document.querySelectorAll(
  '[id$="FORMS"][name^="ingredients"]'
);
let ingredientsFormCount = ingredientForm.length - 1;

//Directions Elements
let directionForm = document.querySelectorAll('[class^="direction-form"]')
const totalDirectionForms = document.querySelector("#id_direction-TOTAL_FORMS");
const hiddenDirectionForms = document.querySelectorAll(
  '[id$="FORMS"][name^="direction"]'
);
let directionFormCount = directionForm.length - 1;

// Numbering form elements
const numberFormElements = () =>{
  let directionForm = document.querySelectorAll('[class^="direction-form"]');
  directionForm.forEach(
    (form, formNum) =>
      (form.querySelector(".number-step").textContent = `${
        formNum +1
      }. `)
  );
}

//Enables Ingredients Add button
mainForm.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-ingredient-form")){
    event.preventDefault();
    const newIngredientForm = ingredientForm[0].cloneNode(true);
    const formRegex = RegExp(`ingredients-(\\d){1}-`, "g");
    ingredientsFormCount++;
    newIngredientForm.innerHTML = newIngredientForm.innerHTML.replace(
      formRegex,
      `ingredients-${ingredientsFormCount}-`
    );
    innerForm.insertBefore(newIngredientForm, hiddenDirectionForms[0]);
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
  }
})


//Enables Ingredients Delete button
mainForm.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-ingredient-form") && ingredientsFormCount > 0) {
    event.preventDefault();
    event.target.parentElement.remove();
    ingredientsFormCount--;
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
  }
});

//Moves Ingredients Hidden form and first ingredient form into active crispy form element
hiddenIngredientsForms.forEach((form) => innerForm.appendChild(form));
innerForm.appendChild(ingredientForm[0]);


//Moves Direction Hidden form and first direction form into active crispy form element
hiddenDirectionForms.forEach((form) => innerForm.appendChild(form));
innerForm.appendChild(directionForm[0]);

//Enables Direction Add button
mainForm.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-direction-form") || event.target.parentElement.classList.contains("add-direction-form")) {
    event.preventDefault();
    console.log(directionForm);
    const newDirectionForm = directionForm[0].cloneNode(true);
    const formRegex = RegExp(`direction-(\\d){1}-`, "g");
    directionFormCount++;
    newDirectionForm.innerHTML = newDirectionForm.innerHTML.replace(
      formRegex,
      `direction-${directionFormCount}-`
    );
    innerForm.insertBefore(newDirectionForm, saveButton);
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
    const labelDiv = newDirectionForm.querySelector("[id^=div_id]");
    labelDiv.removeChild(labelDiv.querySelector(".requiredField"));
    numberFormElements();
    totalDirectionForms.setAttribute("value", `${directionFormCount + 1}`);
  }
})

//Enables Direction Delete button
mainForm.addEventListener("click", function (event) {
  // const mainDirField = event.target.previousElementSibling.firstChild.nextElementSibling
  if (event.target.classList.contains     ("delete-direction-form") && directionFormCount > 0 && event.target.parentElement.previousElementSibling !== hiddenDirectionForms[3]) {
    event.preventDefault();
    console.log(event.target.previousElementSibling.firstChild.nextElementSibling);
    event.target.parentElement.remove();
    directionFormCount--;
    totalDirectionForms.setAttribute("value", `${directionFormCount + 1}`);
    numberFormElements();
  }
});
// $(event.target.previousElementSibling.firstChild.nextElementSibling).attr("id") !== "id_direction-0-direction"
// Inserts Save button to end of form
innerForm.appendChild(saveButton);
