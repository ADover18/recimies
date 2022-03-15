// Main Elements
let formElementsContainer = document.querySelector(".form-container");
const crispyForm = document.querySelector('[method="post"]');
const saveButton = document.querySelector("#submit-button");

const hiddenIngFormId = document.querySelector('[id$="id"]').cloneNode(true);
const hiddenDirFormId = document
  .querySelector('[id^="id_direction"][id$="id"]')
  .cloneNode(true);

const hiddenIngFormDel = document
  .querySelector('[id$="DELETE"]')
  .parentElement.cloneNode(true);
const hiddenDirFormDel = document
  .querySelector('[id^="div_id_direction"][id$="DELETE"]')
  .parentElement.cloneNode(true);

console.log(hiddenIngFormDel, hiddenDirFormDel);

const createBlankForm = function (formtype) {
  const form = document.querySelector(`.${formtype}`).cloneNode(true);
  const formInputs = form.querySelectorAll("input, textarea");
  [...formInputs].forEach((input) => {
    input.value = "";
    input.textContent = "";
  });
  return form;
};

const initialIdVal = {
  ingredients: hiddenIngFormId.value,
  direction: hiddenDirFormId.value,
};

const addFormElToCrispyForm = () =>
  [...formElementsContainer.children]
    .slice(2)
    .forEach((formEl) => crispyForm.appendChild(formEl));

const numberDirectionSteps = function () {
  document.querySelectorAll(".direction__number-step").forEach((step) => {
    let directionIdLabel =
      step.parentElement.previousElementSibling.previousElementSibling.id;
    const stepNum =
      parseInt(
        directionIdLabel.substring(
          directionIdLabel.indexOf("-") + 1,
          directionIdLabel.lastIndexOf("-")
        )
      ) + 1;
    step.innerText = `${stepNum}. `;
  });
};

const updateTotalForms = function (formType) {
  document.querySelector(`#id_${formType}-TOTAL_FORMS`).value =
    document.querySelectorAll(`.${formType}`).length;
};

const removeDelLabels = function (formType) {
  document
    .querySelectorAll(`[id^="div_id_${formType}"][id$="DELETE"]`)
    .forEach((delField, index) => {
      if (delField.querySelector("label"))
        delField.removeChild(delField.querySelector("label"));
    });
};

const styleDelFields = function (formType) {
  document
    .querySelectorAll(`[id^="div_id_${formType}"][id$="DELETE"]`)
    .forEach((delField) => {
      delField.parentElement.classList.remove("form-group");
      delField.parentElement.classList.add("del-field");
    });
};

const numberFormElements = function (formType) {
  //Number Hidden Ids
  document
    .querySelectorAll(`[id^="id_${formType}"][id$="id"]`)
    .forEach((hiddenId, index) => {
      hiddenId.name = `${formType}-${index}-id`;
      hiddenId.id = `id_${hiddenId.name}`;
    });
  //Number Delete Fields
  // FINISH FIXING !!!!!!!!!!!!!!!!!!!!!!!!!!!
  document
    .querySelectorAll(`[id^="div_id_${formType}"][id$="DELETE"]`)
    .forEach((delField, index) => {
      delField.id = `div_id_${formType}-${index}-DELETE`;
    });
  document
    .querySelectorAll(`[type="checkbox"][id^="id_${formType}"][id$="DELETE"]`)
    .forEach((delField, index) => {
      delField.id = `id_${formType}-${index}-DELETE`;
      delField.name = `${formType}-${index}-DELETE`;
    });
  document.querySelectorAll(`.${formType}-delete`).forEach((delBtn, index) => {
    delBtn.setAttribute("for", `id_${formType}-${index}-DELETE`);
  });

  //Number Input Fields
  let fieldsToNumber = [formType];
  if (formType === "ingredients")
    fieldsToNumber = ["ingredient", "quantity", "unit"];

  fieldsToNumber.forEach((field) => {
    document
      .querySelectorAll(`[for^="id_${formType}"][for$="${field}"]`)
      .forEach((input, index) => {
        input.setAttribute("for", `id_${formType}-${index}-${field}`);
      });
    document
      .querySelectorAll(`[id^="div_id_${formType}"][id$="${field}"]`)
      .forEach((input, index) => {
        input.id = `div_id_${formType}-${index}-${field}`;
      });
    document
      .querySelectorAll(`[id^="id_${formType}"][id$="${field}"]`)
      .forEach((input, index) => {
        input.name = `${formType}-${index}-${field}`;
        input.id = `id_${input.name}`;
      });
  });
};

const removeBlankFields = () => {
  document.querySelectorAll("input").forEach((input) => {
    if (!input.value && input.id.substring(0, 14) === "id_ingredients") {
      crispyForm.removeChild(
        input.parentElement.parentElement.parentElement.parentElement
      );
    }
  });
};
// const removeFinalFields = () => {
//   const finalFormField = [...document.querySelectorAll(".ingredient-form")].pop();
//   crispyForm.removeChild(
//     finalFormField.previousElementSibling.previousElementSibling
//   );
//   crispyForm.removeChild(finalFormField.previousElementSibling);
//   crispyForm.removeChild(finalFormField);
// };

console.log();
const showOrHideDeleteBtn = function (formType) {
  document.querySelectorAll(`.${formType}`).length > 1
    ? document
        .querySelectorAll(`.${formType}`)
        .forEach(
          (form) => (form.querySelector(".bin-btn").style.display = "block")
        )
    : (document
        .querySelector(`.${formType}`)
        .querySelector(".bin-btn").style.display = "none");
};

const setFieldIdValues = function (formType) {
  if (initialIdVal[formType]) {
    document
      .querySelectorAll(`[id^="id_${formType}"][id$="id"]`)
      .forEach((idEl, index) => (idEl.value = +initialIdVal[formType] + index));
  }
};

crispyForm.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-form")) {
    event.preventDefault();
    const newHiddenForm = event.target.parentElement.classList.contains(
      "ingredients"
    )
      ? hiddenIngFormId.cloneNode(true)
      : hiddenDirFormId.cloneNode(true);
    const newDeleteForm = event.target.parentElement.classList.contains(
      "ingredients"
    )
      ? hiddenIngFormDel.cloneNode(true)
      : hiddenDirFormDel.cloneNode(true);

    const newBlankForm = event.target.parentElement.classList.contains(
      "ingredients"
    )
      ? createBlankForm("ingredients")
      : createBlankForm("direction");
    event.target.parentElement.parentElement.insertBefore(
      newHiddenForm,
      event.target.parentElement.nextSibling
    );
    event.target.parentElement.parentElement.insertBefore(
      newDeleteForm,
      newHiddenForm.nextSibling
    );
    event.target.parentElement.parentElement.insertBefore(
      newBlankForm,
      newDeleteForm.nextSibling
    );
    const formType = event.target.parentElement.classList[0];
    removeDelLabels(formType);
    numberFormElements(formType);
    updateTotalForms(formType);
    numberDirectionSteps();
    showOrHideDeleteBtn(formType);
    setFieldIdValues(formType);
    styleDelFields(formType);
  }
});

//Enables Ingredients Delete button
crispyForm.addEventListener("click", function (event) {
  const formType = event.target.parentElement.classList[0];
  if (
    event.target.classList.contains("delete-form") &&
    document.querySelectorAll(`.${formType}`).length > 1
  ) {
    event.target.parentElement.style.display = "none";
    // event.target.parentElement.previousSibling.remove();
    // event.target.parentElement.remove();
    // removeDelLabels(formType);
    // numberFormElements(formType);
    // updateTotalForms(formType);
    numberDirectionSteps();
    showOrHideDeleteBtn(formType);
    // setFieldIdValues(formType);
  }
  if (
    event.target.classList.contains("delete-form") &&
    document.querySelectorAll(`.${formType}`).length === 1
  )
    event.preventDefault();
});

saveButton.addEventListener("click", function () {
  removeBlankFields();
});

const init = function () {
  addFormElToCrispyForm();
  ["ingredients", "direction"].forEach((formType) => {
    removeDelLabels(formType);
    numberFormElements(formType);
    updateTotalForms(formType);
    showOrHideDeleteBtn(formType);
    styleDelFields(formType);
  });
  numberDirectionSteps("ingredients");
};

init();