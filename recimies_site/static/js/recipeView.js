const recipeImage = document.querySelector(".recipe-main-image");
const ingredientsContainers = document.querySelectorAll(".ingredient-column");
const methodContainer = document.querySelector(".method-container");
const recipeContainer = document.querySelector(".recipe-container");
const recipeContainerClone = recipeContainer.cloneNode(true)
const recipeImageContainer = document.querySelector(".recipe-image-container");
const ingredients = document.querySelector(".ingredients");
const methodCol = document.querySelector(".method");
const imageIngredientsCol = document.querySelector(
  ".recipe-row-flex-container"
);

const imageFillContainer = () =>
  (recipeImage.style.height = `${
    methodContainer.offsetHeight - ingredientsContainers[0].offsetHeight
  }px`);

if (methodContainer.scrollHeight < 200) {
    console.log(methodContainer.scrollHeight);
  recipeImage.style.height = "300px";
  recipeImageContainer.classList.add("col-md-4");
  ingredients.classList.add("col-md-4");
  methodCol.classList.remove("row-container");
  methodCol.classList.add("col-md-4");
  while (imageIngredientsCol.firstChild) {
    imageIngredientsCol.parentNode.insertBefore(
      imageIngredientsCol.firstChild,
      imageIngredientsCol
    );
  }
  imageIngredientsCol.parentNode.removeChild(imageIngredientsCol);
} else {
    recipeContainer.innerHTML = recipeContainerClone.innerHTML
    imageFillContainer()
}

const init =()=>{
    // 
    }

init()
