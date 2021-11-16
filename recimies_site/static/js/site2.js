
///////////////////////// Selecting Elements /////////////////////////

const recipeContainer = document.querySelector('.row');

const curLocation = window.location.href.slice(0, window.location.href.indexOf("/") + 1)

const searchBox = document.querySelector("#search-box")

const searchButton = document.querySelector(".search-btn")

let recipeData

searchButton.addEventListener("click", function(){
  console.log(searchBox.value);
})


///////////////////////// Model /////////////////////////
const getRecipes = async function () {
  try {
    const res = await fetch('/recipes_endpoint', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};


///////////////////////// Controller /////////////////////////

const processData = async function () {
  try {
    const data = await getRecipes();
    recipeData = [...Object.values(data.friends_recipes,), ...Object.values(data.other_recipes,)];
    if (searchBox.value) recipeData = recipeData.filter(recipe=> recipe.name.toLowerCase().includes(searchBox.value.toLowerCase()))
    console.log(recipeData)
    recipeData.slice(0, 8).forEach(recipe => {
      renderRecipe(recipe);
      let recipeLink = recipeContainer.lastElementChild.lastElementChild;
      recipeObserver.observe(recipeLink);
    });
  } catch (err) {
    console.error(err);
  }
};

const loadRecipe = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    let newRecipeIndex =
      recipeData.findIndex(recipe => recipe.name === entry.target.innerText) +
      8;
    if (newRecipeIndex >= recipeData.length) return;
    renderRecipe(recipeData[newRecipeIndex]);
    let recipeLink = recipeContainer.lastElementChild.lastElementChild;
    recipeObserver.observe(recipeLink)
    observer.unobserve(entry.target);
  });
};

const recipeObserver = new IntersectionObserver(loadRecipe, {
  root: null,
  threshold: 0,
});




///////////////////////// View /////////////////////////

const renderRecipe = function (recipe) {
  let html = `<a
    href="${curLocation}recipe/${recipe.id}"
    >
    <div class="col-md-3 col-sm-4 col-6">
    <div class="thumbnail_container">
      <img class="recipe-image" src="/${recipe.image.slice(14)}" />
    </div>
    <a
      class="front-page-link"
    
      >${recipe.name}
    </a>
    </div>
    </a>`;

  recipeContainer.insertAdjacentHTML('beforeend', html);
};


///////////////// init ////////////////////////
processData();


