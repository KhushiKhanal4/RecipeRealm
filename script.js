// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".navBar");
const navLinks = document.querySelectorAll(".navBar li a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navBar.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navBar.classList.remove("active");
  });
});

// Recipe Finder

// findRecipe function

async function findRecipe(query) {
  const apiKey = "b846c1bf5fa848c69c6f373d0e6c7d83";
  const endPoint = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const output = await response.json();
    console.log("API response:", output);

    viewResult(output.results);
  } catch (error) {
    console.error("Problem in fetch operation", error);
  }
}

//recipedetails api fetch

async function getRecipeDetails(recipeId) {
  const apiKey = "b846c1bf5fa848c69c6f373d0e6c7d83";
  const endPoint = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

  try {
    const response = await fetch(endPoint);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Problem in fetch operation", error);
  }
}

//viewResults Function

function viewResult(results) {
  const outputContainer = document.getElementById("output");
  outputContainer.innerHTML = "";

  if (results.length === 0) {
    outputContainer.textContent = "No recipes found.";
    return;
  }

  results.forEach((recipe) => {
    const recipeModal = document.createElement("div");
    recipeModal.classList.add("modal");

    const recipeImg = document.createElement("img");
    recipeImg.src = recipe.image;
    recipeImg.alt = recipe.title;

    const recipeName = document.createElement("h3");
    recipeName.classList.add("name");
    recipeName.textContent = recipe.title;

    const viewButton = document.createElement("button");
    viewButton.classList.add("viewBtn");
    viewButton.textContent = "View Recipe";

    viewButton.addEventListener("click", async () => {
      document.querySelectorAll(".modal").forEach((button) => {
        button.onclick = async () => {
          document.querySelector(".popup").style.display = "block";

          const recipeDetails = await getRecipeDetails(recipe.id);

          const rImg = document.querySelector(".recipeBox img");
          rImg.src = recipeDetails.image;
          rImg.alt = recipeDetails.title;

          const rName = document.querySelector(".recipeBox .rname");
          rName.textContent = recipeDetails.title;

          const rIngredients = document.querySelector(
            ".recipeBox .rIngredients"
          );
          rIngredients.innerHTML = "";
          recipeDetails.extendedIngredients.forEach((ingredient) => {
            const p = document.createElement("p");
            p.textContent = ingredient.original;
            rIngredients.appendChild(p);
          });

          const rInstructions = document.querySelector(
            ".recipeBox .rInstructions"
          );
          rInstructions.innerHTML = recipeDetails.instructions;
        };
      });
      document
        .querySelector(".recipeBox span")
        .addEventListener("click", () => {
          document.querySelector(".popup").style.display = "none";
        });
    });
    recipeModal.appendChild(recipeImg);
    recipeModal.appendChild(recipeName);
    recipeModal.appendChild(viewButton);

    outputContainer.appendChild(recipeModal);
  });
}

document.querySelector(".btn-search").addEventListener("click", () => {
  const query = document.querySelector(".input-search").value;
  findRecipe(query);
});

//recipe book


  const recipeForm = document.getElementById('recipeForm');
  const recipesContainer = document.getElementById('recipesContainer');

  
  const recipes = JSON.parse(localStorage.getItem('recipes')) ;

 
  const displayRecipes = () => {
      recipesContainer.innerHTML = '';
      recipes.forEach((recipe, index) => {
          const recipeCard = document.createElement('div');
          recipeCard.classList.add('recipe-card');
          recipeCard.innerHTML = `
          <div class="flex">
              <h3 data-index="${index}">${recipe.name}</h3>
              <button class="delete-recipe" data-index="${index}">Delete</button>
              </div>
              <div class="contents" id="contents-${index}">
                  <img src="${recipe.image}" alt="${recipe.name}">
                  <div class="ingredients">
                      <h4>Ingredients</h4>
                      <p>${recipe.ingredients}</p>
                  </div>
                  <div class="instructions">
                      <h4>Instructions</h4>
                      <p>${recipe.instructions}</p>
                  </div>
                   
              </div>
          `;
          recipesContainer.appendChild(recipeCard);

          const recipeHeader = recipeCard.querySelector('h3');
          const recipeContent = recipeCard.querySelector('.contents');
          const deleteButton = recipeCard.querySelector('.delete-recipe');
          recipeHeader.addEventListener('click', () => {
              recipeContent.style.display = recipeContent.style.display === 'none' ? 'block' : 'none';
          });
          deleteButton.addEventListener('click', () => {
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes();
        });
      });
  };

  displayRecipes();

 
  recipeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newRecipe = {
          name: recipeForm.recipeName.value,
          image: recipeForm.recipeImage.value,
          ingredients: recipeForm.ingredients.value,
          instructions: recipeForm.instructions.value
      };

      recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      displayRecipes();

      recipeForm.reset();
  });
});
