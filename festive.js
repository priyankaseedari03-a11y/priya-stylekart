// FESTIVE ADD TO CART

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard = button.closest(".product-card");

        const name = productCard.querySelector("h3").textContent;

        const priceText = productCard.querySelector(".price").textContent;

        const image = productCard.querySelector("img").src;

        const price = parseInt(
            priceText.replace("₹", "").replace(",", "")
        );

        const product = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };

        // Get existing cart
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists
        const existingProduct = cart.find(function(item) {
            return item.name === product.name;
        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);

        }

        // Save cart
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        // Open cart page
        window.location.href = "cart.html";

    });

});