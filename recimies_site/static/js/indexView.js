
///////////////////////// Selecting Elements /////////////////////////

const recipeContainer = document.querySelector('.row');
const curLocation = window.location.href.slice(0, window.location.href.indexOf("/") + 1)
const searchBox = document.querySelector("#search-box")
const searchButton = document.querySelector(".search-btn")
let recipeData

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
    recipeData = data.friends_recipes ?  [...JSON.parse(data.friends_recipes), ...JSON.parse(data.other_recipes)] : JSON.parse(data.recipes);
    if (searchBox.value) recipeData = recipeData.filter(recipe=> recipe.fields.name.toLowerCase().includes(searchBox.value.toLowerCase()))
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
      recipeData.findIndex(recipe => recipe.fields.name === entry.target.innerText.split('\n')[0]) +
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
  threshold: 0.8,
});




///////////////////////// View /////////////////////////

const renderRecipe = function (recipe) {
  let html = `<a class="recipe-card"
    href="${curLocation}recipe/${recipe.pk}"
    >
    <div class="col-md-3 col-sm-4 col-6">
    <div class="recipe-card__image-wrapper">
      <img class="recipe-card__image recipe-card__image--scale" src="/${recipe.fields.image.slice(14)}" />
    </div>
    <a
      class="recipe-card__description"
      >${recipe.fields.name}<br><p style="color: #6c757d;">${recipe.fields.user}</p>
    </a>
    </div>
    </a>`;

  recipeContainer.insertAdjacentHTML('beforeend', html);
};


///////////////// init ////////////////////////
processData();