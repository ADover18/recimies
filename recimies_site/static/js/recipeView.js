const recipeHeaderMobile = document.querySelector(".recipe-header--mobile")
const recipeHeaderDesktop = document.querySelector(".recipe-header--desktop")
const recipeTitleMobile = document.querySelector(".recipe-header__title--mobile")
const recipeTitleDesktop = document.querySelector(".recipe-header__title--desktop")
const recipeImage = document.querySelector(".recipe-image");
const imageIngredientsCol = document.querySelector(".ingredient-col");
const ingredients = document.querySelector(".ingredients");
const ingList = document.querySelector(".ingredients__list")
const verticalLine = document.querySelector(".vl");
const method = document.querySelector(".method");



recipeTitleDesktop.style.fontSize = `${3 + 1/recipeTitleDesktop.textContent.length*20}rem`
recipeTitleMobile.style.fontSize = `${3 + 1/recipeTitleMobile.textContent.length*10}rem`



"resize load".split(" ").forEach(function(e){
  window.addEventListener(e, function(){
    ingList.style.columnCount = 2;
    ingList.style.columnGap = "16px"
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let ingredientsHeight = ingredients.scrollHeight;
    let ingredientsWidth = ingList.scrollWidth;
    recipeImage.style.height = `${windowHeight - ingredientsHeight - 160}px`;
    recipeImage.style.width = `${ingredientsWidth}px`;
    if (ingredientsWidth + 42 + windowWidth*0.03 >windowWidth - 500){
      ingList.style.columnCount = `${Math.floor(windowWidth/290)}`
      recipeHeaderDesktop.style.display = "none";
      recipeHeaderMobile.style.display = "block";
      recipeImage.style.width = "90vw";
      recipeImage.style.marginLeft = "20px";
      ingredients.style.marginLeft = "20px";
      method.style.marginLeft = "20px";
      ingList.style.maxWidth = "90vw";
      verticalLine.style.display = "none";
      recipeImage.style.height = `300px`;
      imageIngredientsCol.style.position = "";
      imageIngredientsCol.style.top = "";
    }
    if (ingredientsWidth + 42 + windowWidth*0.03 < windowWidth - 500){
      ingList.style.columnCount = 2
      recipeHeaderDesktop.style.display = "block";
      recipeHeaderMobile.style.display = "none";
      ingList.style.maxWidth = "500px";
      verticalLine.style.display = "block";
      recipeImage.style.marginLeft = "0px";
      ingredients.style.marginLeft = "0px";
      method.style.marginLeft = "20px";
      imageIngredientsCol.style.position = "sticky";
      imageIngredientsCol.style.top = "30px"
    }
  })
});


