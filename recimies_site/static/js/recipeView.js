const recipeImage = document.querySelector(".recipe-main-image");
const ingredientsContainers = document.querySelectorAll(".ingredient-column");
const methodContainer = document.querySelector(".method-container");
const recipeContainer = document.querySelector(".recipe-container");
const contentContainer = document.querySelector(".content-container")
const recipeImageContainer = document.querySelector(".recipe-image-container");
const ingredients = document.querySelector(".ingredients");
const methodCol = document.querySelector(".method");
const imageIngredientsCol = document.querySelector(
  ".recipe-row-flex-container"
);


const titleContainer = document.getElementsByClassName("title-container")[0]

const imageFillContainer = () =>
  // $(".recipe-main-image").css('height', 'auto');
  // recipeImageContainer.style.height = `${
  //   (methodContainer.offsetHeight + titleContainer.offsetHeight) - ingredients.offsetHeight
  // }px`;
  recipeImageContainer.style.width = `${ingredients.offsetWidth
  }px !important`;
  console.log(methodCol)
"resize load".split(" ").forEach(function(e){
  window.addEventListener(e, function(){
    if (methodCol.offsetWidth < 0.7*window.innerWidth){
      console.log(methodCol.offsetWidth)
      // let newTitle = titleContainer.cloneNode(true)
      methodCol.insertBefore(titleContainer, methodContainer)
      imageFillContainer()
    } else {
      console.log(methodCol.offsetWidth)
      contentContainer.insertBefore(titleContainer, recipeContainer)
    }
  })
})
console.log(contentContainer);
console.log(recipeContainer);
// set body background:
document.querySelector("body").style.backgroundColor = "#FAFCFA"



// if (methodContainer.scrollHeight < 200) {
//     console.log(methodContainer.scrollHeight);
//   recipeImage.style.height = "300px";
//   recipeImageContainer.classList.add("col-md-4");
//   ingredients.classList.add("col-md-4");
//   methodCol.classList.remove("row-container");
//   methodCol.classList.add("col-md-4");
//   while (imageIngredientsCol.firstChild) {
//     imageIngredientsCol.parentNode.insertBefore(
//       imageIngredientsCol.firstChild,
//       imageIngredientsCol
//     );
//   }
//   imageIngredientsCol.parentNode.removeChild(imageIngredientsCol);
// } else {
//     const recipeContainerClone = recipeContainer.cloneNode(true)
//     recipeContainer.innerHTML = recipeContainerClone.innerHTML
//     imageFillContainer()
// }








const init =()=>{
    // 
    }

init()
