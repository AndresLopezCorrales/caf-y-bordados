export function agregarAlCarrito(coffee) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const coffeeToShop = {
        id: coffee.id,
        title: coffee.title,
        image: coffee.image,
        price: coffee.price
    }

    cart.push(coffeeToShop);

    localStorage.setItem("cart", JSON.stringify(cart));

    const counter = document.querySelector(".cart-count");
    if (counter) {
        counter.textContent = cart.length;
    }

    alert(`${coffee.title} ha sido agregado al carrito.`);
}