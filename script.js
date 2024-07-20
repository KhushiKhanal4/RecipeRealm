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

async function findRecipe(query){
    const apiKey='5a9d81283395453eb818b7f82e920114';
    const endPoint=`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    try{
        const response =await fetch(endPoint);
        if(!response.ok)
        {
            throw new Error('Network response was not ok');
        }

        const output= await response.json();
        console.log('API response:', output); 

        viewResult(output.results);
   }
    catch (error) {
        console.error('Problem in fetch operation', error);
    }
}

//viewResults Function




