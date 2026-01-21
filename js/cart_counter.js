document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".cart-count");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!counter) return;

    counter.textContent = cart.length;


});