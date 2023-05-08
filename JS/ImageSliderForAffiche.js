let scrollContainer = document.querySelector(".gallery");
let leftBtn = document.getElementById("leftBtn"); 
let rightBtn = document.getElementById("rightBtn");

rightBtn.addEventListener("click", ()=>{
scrollContainer.style.scrollBehavior = "smooth";
scrollContainer.scrollLeft += 900;
});
leftBtn.addEventListener("click", ()=>{
scrollContainer.style.scrollBehavior = "smooth";
scrollContainer.scrollLeft -= 900;
});