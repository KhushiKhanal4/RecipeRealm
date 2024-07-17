const hamburger=document.querySelector(".hamburger");
const navBar=document.querySelector(".navBar");

hamburger.addEventListener("click",() => {
    hamburger.classList.toggle("active");
    navBar.classList.toggle("active");
})