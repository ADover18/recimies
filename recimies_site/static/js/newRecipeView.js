

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
let directionForm = document.querySelectorAll('[class^="direction-form"]');
const totalDirectionForms = document.querySelector("#id_direction-TOTAL_FORMS");
const hiddenDirectionForms = document.querySelectorAll(
  '[id$="FORMS"][name^="direction"]'
);
let directionFormCount = directionForm.length - 1;
const firstDirFormInlineEl = directionForm[0].querySelectorAll("p, svg");

// Numbering form elements
const numberFormElements = () => {
  let directionForm = document.querySelectorAll('[class^="direction-form"]');
  directionForm.forEach(
    (form, formNum) =>
      (form.querySelector(".number-step").textContent = `${formNum + 1}. `)
  );
};

//Enables Ingredients Add button
mainForm.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-ingredient-form")) {
    event.preventDefault();
    const newIngredientForm = ingredientForm[0].cloneNode(true);
    const formRegex = RegExp(`ingredients-(\\d){1}-`, "g");
    ingredientsFormCount++;
    newIngredientForm.innerHTML = newIngredientForm.innerHTML.replace(
      formRegex,
      `ingredients-${ingredientsFormCount}-`
    );
    innerForm.insertBefore(
      newIngredientForm,
      event.target.parentElement.nextSibling
    );
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
    document.querySelectorAll(".ing-bin").forEach(btn =>btn.style.display = "block");
    document.querySelectorAll(".delete-ingredient-form").forEach(btnContainer =>btnContainer.style.cursor =
      "pointer");
  }
});

//Enables Ingredients Delete button
mainForm.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("delete-ingredient-form") &&
    ingredientsFormCount > 0
  ) {
    event.preventDefault();
    event.target.parentElement.remove();
    ingredientsFormCount--;
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
    if (ingredientsFormCount === 0) {
      document.querySelector(".ing-bin").style.display = "none";
      document.querySelector(".delete-ingredient-form").style.cursor = "auto";
    }
  }
});

//Moves Ingredients Hidden form and first ingredient form into active crispy form element
hiddenIngredientsForms.forEach((form) => innerForm.appendChild(form));
innerForm.appendChild(ingredientForm[0]);

//Moves Direction Hidden form and first direction form into active crispy form element. Moves direction form label out of the first form row.
hiddenDirectionForms.forEach((form) => innerForm.appendChild(form));
innerForm.appendChild(directionForm[0]);
innerForm.insertBefore(
  directionForm[0].querySelector("label"),
  directionForm[0]
);

//Enables Direction Add button
mainForm.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("add-direction-form") ||
    event.target.parentElement.classList.contains("add-direction-form")
  ) {
    event.preventDefault();
    const newDirectionForm = directionForm[0].cloneNode(true);
    const formRegex = RegExp(`direction-(\\d){1}-`, "g");
    directionFormCount++;
    newDirectionForm.innerHTML = newDirectionForm.innerHTML.replace(
      formRegex,
      `direction-${directionFormCount}-`
    );
    innerForm.insertBefore(newDirectionForm, event.target.parentElement.nextSibling);
    numberFormElements();
    totalDirectionForms.setAttribute("value", `${directionFormCount + 1}`);
    document.querySelectorAll(".dir-bin").forEach(btn =>btn.style.display = "block");
    document.querySelectorAll(".delete-direction-form").forEach(btnContainer =>btnContainer.style.cursor =
      "pointer");
  }
});

//Enables Direction Delete button
mainForm.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("delete-direction-form") &&
    directionFormCount > 0 &&
    event.target.parentElement.previousElementSibling !==
      hiddenDirectionForms[3]
  ) {
    event.preventDefault();
    event.target.parentElement.remove();
    directionFormCount--;
    totalDirectionForms.setAttribute("value", `${directionFormCount + 1}`);
    numberFormElements();
    if (directionFormCount === 0) {
      document.querySelector(".dir-bin").style.display = "none";
      document.querySelector(".delete-direction-form").style.cursor = "auto";
    }
  }
});

// Inserts Save button to end of form
innerForm.appendChild(saveButton);

//textarea increases as more text is typed
// document.querySelectorAll("textarea").forEach(textArea=>textArea.addEventListener("input", function(){
//   const text = textArea.value
//   const lines = 1 + (text.match(/\n/g) || []).length;
//   let height = (text.length/80 + 1) * 40
//   if (textArea.value.slice(-2)==='/n') height+=40
//   textArea.style.height = `${height}px`
//   console.log(text);
  // let lht = parseInt(textArea.lineHeight, 10);
  // let lines = textArea.scrollHeight / lht;
  // console.log(lines);
// }))

// $("textarea").each(function () {
//   this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
// }).on("input", function () {
//   this.style.height = "auto";
//   this.style.height = (this.scrollHeight) + "px";
// });

