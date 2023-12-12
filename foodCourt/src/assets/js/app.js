let menuBar = document.querySelector(".menu-bar");
let navbar = document.querySelector(".nav");
let closeMenu = document.querySelector(".close-menu");

menuBar.addEventListener("click", () => {
  navbar.style.opacity = 1;
  navbar.style.transform = "scaleY(1)";
});

closeMenu.addEventListener("click", () => {
  navbar.style.opacity = 0;
  navbar.style.transform = "scaleY(0)";
});
