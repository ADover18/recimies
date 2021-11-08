const recipeContainer = document.querySelector(".row")

const curLocation = window.location.href

const getRecipes = async function () {
  try {
    const res = await fetch('/recipes_endpoint', {
      method: "GET",
      headers: {
        Accept: 'social/json',
        'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
      },
    })
      .then(response => {
        console.log(response);
        return response.json(); //Convert response to JSON
      })
      .then(data => {
        const recipeData = Object.values(data.recipes);
        console.log(recipeData);
        // recipeData.map()
        renderRecipe(recipeData)
      });
  } catch (err) {
    console.error(err);
  }
};

getRecipes()

const renderRecipe = function(data){
  data.forEach(recipe => {
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
  
    recipeContainer.insertAdjacentHTML('beforeend', html)
  });
};






recipeContainer.innnerHTML = `<a
href="{% url 'recipe' recipe_pk=recipe.pk %}"
>
<div class="col-md-3 col-sm-4 col-6">
<div class="thumbnail_container">
  <img class="recipe-image" src="/{{recipe.image_url}}" />
</div>
<a
  class="front-page-link"
  
  >{{recipe.name}}
</a>
</div>
</a>`





// {% for recipe in recipes %}
      
//       {% endfor %}