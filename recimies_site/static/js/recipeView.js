const recipeImage = document.querySelector(".recipe-main-image");
const ingredientsContainer = document.querySelector(".ingredient-container");
const methodContainer = document.querySelector(".method-container");
const recipeContainer = document.querySelector(".recipe-container");
const contentContainer = document.querySelector(".content-container")
const recipeImageContainer = document.querySelector(".recipe-image-container");
const ingredients = document.querySelector(".ingredients");
const methodCol = document.querySelector(".method");
const imageIngredientsCol = document.querySelector(
  ".recipe-row-flex-container"
);
const verticalLine = document.querySelector(".vl");

const ing = document.getElementsByClassName("ingredients-list")[0]
const ingCol = document.querySelector(".ingredient-column")
const titleContainer1 = document.querySelector(".title-container1")
const titleContainer2 = document.querySelector(".title-container2")
console.log(titleContainer1, titleContainer2);













const a = window.getComputedStyle(ing)['scroll-width']
// const c = Object.freeze(a)
console.log(window.innerHeight);
console.log(ing.scrollHeight)
console.log(ing);
console.log(ing.scrollWidth)
console.log(ingCol);
console.log(ingCol.offsetWidth)
console.log(ingredientsContainer)
console.log(ingredientsContainer.scrollWidth);

// recipeImageContainer.style.height = `${window.innerHeight - ing.scrollHeight}px`
// const b = Object.entries(a)
// console.log(b)
// console.log(ing, ing.clientWidth, window.getComputedStyle(ing));

// const imageFillContainer = () =>
//   $(".recipe-main-image").css('height', 'auto');
//   recipeImageContainer.style.height = `${
//     (methodContainer.offsetHeight + titleContainer.offsetHeight) - ingredients.offsetHeight
//   }px`;
  // recipeImageContainer.style.width = `${ingredients.offsetWidth
//   }px !important`;
//   console.log(methodCol)

console.log(ing.scrollHeight)
// if(ingCol[1].hei)
"resize load".split(" ").forEach(function(e){
  window.addEventListener(e, function(){
    recipeImageContainer.style.height = `${window.innerHeight - ing.scrollHeight - 160}px`;
    recipeImageContainer.style.width = `${ingredientsContainer.scrollWidth}px`;
    if (methodCol.offsetWidth > 0.7*window.innerWidth){
      titleContainer2.style.display = "none";
      titleContainer1.style.display = "block";
      recipeImageContainer.style.width = "90vw";
      recipeImageContainer.style.maxHeight = "30vh"
      recipeImageContainer.style.minHeight = "20vh"
      ingCol.style.maxWidth = "90vw";
        // ingCol.style.paddingLeft = "15px"
        // ingCol.style.paddingRight = "15px"
      verticalLine.style.display = "none";
    } else {
      titleContainer2.style.display = "block";
      titleContainer1.style.display = "none";
      // ingCol.forEach(col=> col.style.maxWidth = "210px")
      verticalLine.style.display = "block";
    }
  })
})

// "resize load".split(" ").forEach(function(e){
//   window.addEventListener(e, function(){
//     if (methodCol.offsetWidth < 0.7*window.innerWidth){
//       console.log(methodCol.offsetWidth)
//       // let newTitle = titleContainer.cloneNode(true)
//       methodCol.insertBefore(titleContainer, methodContainer)
//       imageFillContainer()
//     } else {
//       console.log(methodCol.offsetWidth)
//       contentContainer.insertBefore(titleContainer, recipeContainer)
//     }
//   })
// })
// console.log(contentContainer);
// console.log(recipeContainer);
// // set body background:
// document.querySelector("body").style.backgroundColor = "#FAFCFA"



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