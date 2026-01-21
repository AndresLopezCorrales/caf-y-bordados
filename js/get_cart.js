document.addEventListener("DOMContentLoaded", () => {
    const containerItemsInCart = document.getElementById("cart-items");

    const containerTotalPrice = document.getElementById("total-s");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function calculateTotalPrice() {
        return cart.reduce((total, coffee) => total + coffee.price, 0);
    }

    function displayTotalPrice() {

        const totalPrice = calculateTotalPrice();

        containerTotalPrice.innerHTML = `
        <div class="total-price">
            <h3>Total: ${totalPrice}</h3>
            <button id="checkout-btn">Proceder al pago</button>
        </div>
        `;

        const checkoutBtn = document.getElementById("checkout-btn");

        checkoutBtn.addEventListener("click", () => {
            alert("Gracias por su compra. ¡Hasta luego!");
            localStorage.removeItem("cart");
            window.location.reload();
        });
    }

    function displayCartItems() {
        containerItemsInCart.innerHTML = "";

        if (cart.length === 0) {
            containerTotalPrice.innerHTML = "";
            containerItemsInCart.innerHTML = "<p>El carrito está vacío</p>"
            return;
        }

        displayTotalPrice();

        cart.forEach(coffee => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("coffee-card", "cart-item");
            itemDiv.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.title}" class="coffee-image"/>
            <h4 class="coffee-title">${coffee.title}</h4>
            <p class="coffee-price">$${coffee.price}</p>
            <a href="#" class="remove-item-btn" title="Eliminar"><img src="../img/basura/ic_trash.png" alt="Eliminar"></a>
        `;

            itemDiv.querySelector(".remove-item-btn").addEventListener("click", () => {
                cart.splice(cart.indexOf(coffee), 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCartItems();
            });

            containerItemsInCart.appendChild(itemDiv);

        });
    }

    displayCartItems();


});