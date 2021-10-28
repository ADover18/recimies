// Main Elements
let mainForm = document.querySelector(".form-container");
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

//Keep ingredients form elements inline if there are errors
ingredientForm.forEach((form) => {
  if (form.querySelectorAll(".invalid-feedback").length > 0) {
    const formEl = [...form.children];
    formEl.forEach((formField) => {
      if (formField.querySelectorAll(".invalid-feedback").length < 1) {
        formField.style.marginBottom = "40px";
      }
    });
  }
});

// Numbering direction form elements
const numberFormElements = () => {
  let directionForm = document.querySelectorAll('[class^="direction-form"]');
  directionForm.forEach(
    (form, formNum) =>
      (form.querySelector(".number-step").textContent = `${formNum + 1}. `)
  );
};

///Number the form attribute values
const numAttrValues = function (formList, fieldType) {
  formList.forEach((form, formNum) => {
    //Inputs values must be saved to an array as they are wiped when setting the innerHTML
    let valueArr = [];
    console.log(valueArr);
    //Drop downs index must also be saved
      const inputFieldIndex = form.querySelector("select").selectedIndex;
    
    form.querySelectorAll("input").forEach((field) => {
      valueArr.push(field.value);
    });
    let formRegex = RegExp(`${fieldType}-(\\d){1}-`, "g");
    form.innerHTML = form.innerHTML.replace(
      formRegex,
      `${fieldType}-${formNum}-`
    );
    form.querySelectorAll("input").forEach((field, i) => {
      field.value = valueArr[i];
    });
      form.querySelector("select").selectedIndex = inputFieldIndex;
  });
};

const numDirAttrValues = function(){
  directionForm = document.querySelectorAll(".direction-form")
  directionForm.forEach((form, formNum) => {
    //Inputs values must be saved to an array as they are wiped when setting the innerHTML
    const value = form.querySelector("textarea").value;
    const formRegex = RegExp(`direction-(\\d){1}-`, "g");
    form.innerHTML = form.innerHTML.replace(
      formRegex,
      `direction-${formNum}-`
    );
      form.querySelector("textarea").value = value;
  });
}


//Remove Ingredients delete button (used when there is only once instance of the ingredients form)
const removeIngDelBtn = function () {
  document.querySelector(".ing-bin").style.display = "none";
  document.querySelector(".delete-ingredient-form").style.cursor = "auto";
};

//Enables Ingredients Add button
mainForm.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-ingredient-form")) {
    event.preventDefault();
    const newIngredientForm = ingredientForm[0].cloneNode(true);
    ingredientsFormCount++;
    newIngredientForm.querySelectorAll("input").forEach((input) => {
      input.value = "";
      input.style.borderColor = "#CED4DA";
    });
    newIngredientForm
      .querySelectorAll(".invalid-feedback")
      .forEach((errorMsg) => errorMsg.remove());
    newIngredientForm
      .querySelectorAll(".form-group")
      .forEach((column) => (column.style.alignSelf = "flex-start"));
    innerForm.insertBefore(
      newIngredientForm,
      event.target.parentElement.nextSibling
    );
    let ingredientForms = document.querySelectorAll(".ingredient-form");
    numAttrValues(ingredientForms, "ingredients");
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
    document
      .querySelectorAll(".ing-bin")
      .forEach((btn) => (btn.style.display = "block"));
    document
      .querySelectorAll(".delete-ingredient-form")
      .forEach((btnContainer) => (btnContainer.style.cursor = "pointer"));
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
    console.log(ingredientsFormCount);
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
    let ingredientForms = document.querySelectorAll(".ingredient-form");
    numAttrValues(ingredientForms, "ingredients");
    totalIngredientsForms.setAttribute("value", `${ingredientsFormCount + 1}`);
    if (ingredientsFormCount <= 1) {
      removeIngDelBtn();
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
    newDirectionForm
      .querySelectorAll("textarea")
      .forEach((input) => (input.value = ""));
    directionFormCount++;
    innerForm.insertBefore(
      newDirectionForm,
      event.target.parentElement.nextSibling
    );
    numberFormElements();
    let directionForms = document.querySelectorAll(".direction-form");
    numDirAttrValues()
    totalDirectionForms.setAttribute("value", `${directionFormCount + 1}`);
    document
      .querySelectorAll(".dir-bin")
      .forEach((btn) => (btn.style.display = "block"));
    document
      .querySelectorAll(".delete-direction-form")
      .forEach((btnContainer) => (btnContainer.style.cursor = "pointer"));
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
    let directionForms = document.querySelectorAll(".direction-form");
    numDirAttrValues()
    if (directionFormCount === 0) {
      document.querySelector(".dir-bin").style.display = "none";
      document.querySelector(".delete-direction-form").style.cursor = "auto";
    }
  }
});

// Inserts Save button to end of form
innerForm.appendChild(saveButton);

//Ensures extra empty fields are removed when save button is pressed
//TO COMPLETE- check if  total ingredients form stuff
console.log(ingredientForm);
console.log(ingredientForm[0].querySelectorAll("input"));
saveButton.addEventListener("click", function () {
  let ingredientForms = document.querySelectorAll(".ingredient-form");

  ingredientForms.forEach((form) => {
    const formInputs = form.querySelectorAll("input");
    ingredientsFormCount = ingredientForms.length - 1;
    if (
      formInputs[0].value === "" &&
      formInputs[1].value === "" &&
      ingredientsFormCount > 0 &&
      form.querySelectorAll('[id^="id_ingredients-0"]').length === 0
    ) {
      innerForm.removeChild(form);
      totalIngredientsForms.setAttribute(
        "value",
        `${ingredientsFormCount + 1}`
      );
      removeIngDelBtn();
    }
  });
  ingredientForms = body.querySelectorAll(".ingredient-form");
  numAttrValues(ingredientForms, "ingredients");
  mainForm = document.querySelector(".form-container");
});

while (mainForm.children.length > 1) {
  mainForm.removeChild(mainForm.lastChild);
}

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
