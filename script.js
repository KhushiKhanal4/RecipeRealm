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




