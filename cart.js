let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// DISPLAY CART

function displayCart() {

    const cartSummary = document.querySelector(".cart-summary");
    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>
                <a href="festive.html" class="continue-shopping-btn">
                    <span class="bracket-char">[</span> Continue Shopping <span class="bracket-char">]</span>
                </a>
            </div>
        `;

        cartTotal.textContent = "0";
        if (cartSummary) {
            cartSummary.style.display = "none";
        }

        return;
    }

    if (cartSummary) {
        cartSummary.style.display = "block";
    }


    let total = 0;


    cart.forEach(function (item, index) {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

            </div>


            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        `;

        cartItems.appendChild(div);

    });


    cartTotal.textContent = total.toLocaleString("en-IN");

}


// INCREASE

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

}


// DECREASE

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


// REMOVE

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// SAVE

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// CHECKOUT

document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        window.location.href = "checkout.html";

    });


displayCart();