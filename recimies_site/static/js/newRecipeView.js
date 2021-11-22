
// Main Elements
let formElementsContainer = document.querySelector('.form-container');
const crispyForm = document.querySelector('[method="post"]');
const saveButton = document.querySelector('#submit-button');

const hiddenIngFormId = document.querySelector('[id$="id"]').cloneNode(true);
const hiddenDirFormId = document
  .querySelector('[id^="id_direction"][id$="id"]')
  .cloneNode(true);
const blankIngForm = document.querySelector('.ingredients').cloneNode(true);
const blankDirForm = document.querySelector('.direction').cloneNode(true);

const addFormElToCrispyForm = () =>
  [...formElementsContainer.children]
    .slice(1)
    .forEach(formEl => crispyForm.appendChild(formEl));

const numberDirectionSteps = function () {
  document.querySelectorAll('.number-step').forEach(step => {
    let directionIdLabel = step.parentElement.previousElementSibling.id;
    // console.log(directionIdLabel);
    const stepNum =
      parseInt(
        directionIdLabel.substring(
          directionIdLabel.indexOf('-') + 1,
          directionIdLabel.lastIndexOf('-')
        )
      ) + 1;
    step.innerText = `${stepNum}. `;
  });
};

const updateTotalForms = function (formType) {
  document.querySelector(`#id_${formType}-TOTAL_FORMS`).value =
    document.querySelectorAll(`.${formType}`).length;
};

const numberFormElements = function (formType) {
  //Number Hidden Ids
  document
    .querySelectorAll(`[id^="id_${formType}"][id$="id"]`)
    .forEach((hiddenId, index) => {
      hiddenId.name = `${formType}-${index}-id`;
      hiddenId.id = `id_${hiddenId.name}`;
    });

  //Number Input Fields
  let fieldsToNumber = [formType];
  if (formType === 'ingredients')
    fieldsToNumber = ['ingredient', 'quantity', 'unit'];

  fieldsToNumber.forEach(field => {
    document
      .querySelectorAll(`[for^="id_${formType}"][for$="${field}"]`)
      .forEach((input, index) => {
        input.setAttribute('for', `id_${formType}-${index}-${field}`);
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

const showOrHideDeleteBtn = function (formType) {
  document.querySelectorAll(`.${formType}`).length > 1
    ? document
        .querySelectorAll(`.${formType}`)
        .forEach(
          form => (form.querySelector('.bin-btn').style.display = 'block')
        )
    : (document
        .querySelector(`.${formType}`)
        .querySelector('.bin-btn').style.display = 'none');
};

crispyForm.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-form')) {
    event.preventDefault();
    const newHiddenForm = event.target.parentElement.classList.contains(
      'ingredients'
    )
      ? hiddenIngFormId.cloneNode(true)
      : hiddenDirFormId.cloneNode(true);
    const newBlankForm = event.target.parentElement.classList.contains(
      'ingredients'
    )
      ? blankIngForm.cloneNode(true)
      : blankDirForm.cloneNode(true);
    event.target.parentElement.parentElement.insertBefore(
      newHiddenForm,
      event.target.parentElement.nextSibling
    );
    event.target.parentElement.parentElement.insertBefore(
      newBlankForm,
      newHiddenForm.nextSibling
    );
    const formType = event.target.parentElement.classList[0];
    numberFormElements(formType);
    updateTotalForms(formType);
    numberDirectionSteps();
    showOrHideDeleteBtn(formType);
  }
});

//Enables Ingredients Delete button
crispyForm.addEventListener('click', function (event) {
  const formType = event.target.parentElement.classList[0];
  if (
    event.target.classList.contains('delete-form') &&
    document.querySelectorAll(`.${formType}`).length > 1
  ) {
    event.preventDefault();
    event.target.parentElement.previousSibling.remove();
    event.target.parentElement.remove();
    numberFormElements(formType);
    updateTotalForms(formType);
    numberDirectionSteps();
    showOrHideDeleteBtn(formType);
  }
});

const init = function () {
  addFormElToCrispyForm();
  ['ingredients', 'direction'].forEach(formType => {
      numberFormElements(formType);
      updateTotalForms(formType);
      showOrHideDeleteBtn(formType);
      });
  numberDirectionSteps();
};

init();
