// Hamburger Menu

const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".navBar");
const navLinks = document.querySelectorAll(".navBar li a");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navBar.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navBar.classList.remove("active");
    });
});

// Recipe Finder

// findRecipe function

async function findRecipe(query) {
    const apiKey = '5a9d81283395453eb818b7f82e920114';
    const endPoint = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const output = await response.json();
        console.log('API response:', output);

        viewResult(output.results);
    }
    catch (error) {
        console.error('Problem in fetch operation', error);
    }
}

//viewResults Function

function viewResult(results) {
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = '';

    if (results.length === 0) {
        outputContainer.textContent = 'No recipes found.';
        return;
    }

    results.forEach(recipe => {
        const recipeModal = document.createElement('div');
        recipeModal.classList.add('modal');

        const recipeImg = document.createElement('img');
        recipeImg.src = recipe.image;
        recipeImg.alt = recipe.title;

        const recipeName = document.createElement('h3');
        recipeName.classList.add('name');
        recipeName.textContent = recipe.title;


        const viewButton = document.createElement('button');
        viewButton.classList.add('viewBtn');
        viewButton.textContent = 'View Recipe';

        viewButton.addEventListener("click", () => {
            document.querySelectorAll('.modal').forEach((button) => {
                button.onclick = () => {
                    document.querySelector('.popup').style.display = 'block';

                    const rImg = document.querySelector('.recipeBox img');
                    rImg.src = recipe.image;
                    rImg.alt = recipe.title;

                    const rName = document.querySelector('.recipeBox .rname');
                    rName.textContent = recipe.title;

                    const rIngredients=document.createElement('ul');
                    rIngredients.textContent=recipe.ingredients;


                    const rInstructions=document.createElement('p');
                    rInstructions.textContent=recipe.instructions;
                }
            });
            document.querySelector('.recipeBox span').addEventListener('click',() =>{
                document.querySelector('.popup').style.display = 'none';
            })

        });
        recipeModal.appendChild(recipeImg);
        recipeModal.appendChild(recipeName);
        recipeModal.appendChild(viewButton);

        outputContainer.appendChild(recipeModal);

    });

}

document.querySelector('.btn-search').addEventListener('click', () => {
    const query = document.querySelector('.input-search').value;
    findRecipe(query);
});

