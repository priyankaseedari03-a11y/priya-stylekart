// ================================
// PRIYA Fancy Store - script.js
// ================================

// Welcome Offer Popup
window.addEventListener("load", function () {
    setTimeout(function () {
        alert("🎉 Welcome to PRIYA Fancy Store!\nGet 20% OFF on your first purchase.");
    }, 1000);
});

// ================================
// Add to Cart
// ================================
let cart = 0;

function addToCart(productName) {
    cart++;

    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart;
    }

    alert(productName + " added to cart!");
}

// ================================
// Wishlist
// ================================
let wishlist = 0;

function addToWishlist(productName) {
    wishlist++;

    const wishlistCount = document.getElementById("wishlist-count");
    if (wishlistCount) {
        wishlistCount.innerText = wishlist;
    }

    alert(productName + " added to your wishlist ❤️");
}

// ================================
// Live Product Search
// ================================
function searchProducts() {
    const input = document.getElementById("search");

    if (!input) return;

    const filter = input.value.toUpperCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {
        const title = product.querySelector("h3");

        if (!title) return;

        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}

// ================================
// Back To Top Button
// ================================
const topButton = document.getElementById("topBtn");

window.onscroll = function () {
    if (!topButton) return;

    if (document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";
    }
};

function topFunction() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ================================
// Hero Image Slider
// ================================
const slides = document.querySelectorAll(".hero-slide");

let currentSlide = 0;

if (slides.length > 0) {

    setInterval(function () {

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        slides[currentSlide].classList.add("active");

    }, 3000);

}
