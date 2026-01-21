import { agregarAlCarrito } from "../js/add_cart.js";

document.addEventListener("DOMContentLoaded", async () => {

    const URL = "https://api.sampleapis.com/coffee/hot";
    const container = document.getElementById("api-coffees");

    try {
        const response = await fetch(URL);
        const coffees = await response.json();

        const coffeesValidation = coffees.filter(coffee =>
            typeof coffee.image === 'string' &&
            coffee.image.startsWith('http')
        ).map(coffee => {
            let price;
            if (typeof coffee.id === 'number') {
                price = coffee.id;
            } else {
                price = 35;
            }

            return {
                ...coffee,
                price
            }
        }).slice(1, 5);


        coffeesValidation.forEach(coffee => {
            const coffeeCard = document.createElement("div");
            coffeeCard.classList.add("coffee-card");
            coffeeCard.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.title}" class="coffee-image"/>
            <h3 class="coffee-title">${coffee.title}</h3>
            <p class="coffee-price">$${coffee.price}</p>
            <button class="button-link agregar-carrito-btn">Agregar al carrito</button>
        `;

            const add_cart_btn = coffeeCard.querySelector(".agregar-carrito-btn");

            add_cart_btn.addEventListener("click", () => {
                agregarAlCarrito(coffee);
            });

            container.appendChild(coffeeCard);
        });

    } catch (error) {
        console.error("Error fetching coffee data:", error);
        container.innerHTML = "<p>Fallo al cargar información de cafés.</p>";
    }

});