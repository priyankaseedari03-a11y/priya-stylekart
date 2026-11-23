let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const upiQrSection =
    document.getElementById("upi-qr-section");

const qrTotalAmount =
    document.getElementById("qr-total-amount");

const qrStepAmount =
    document.getElementById("qr-step-amount");

const qrStepAppName =
    document.getElementById("qr-step-app-name");

const selectedUpiAppName =
    document.getElementById("selected-upi-app-name");

const upiQrTrigger =
    document.getElementById("upi-qr-trigger");

const upiPaymentDetails =
    document.getElementById("upi-payment-details");

const upiDetailsAmount =
    document.getElementById("upi-details-amount");

const upiDetailsAppName =
    document.getElementById("upi-details-app-name");

const placeOrderBtn =
    document.getElementById("place-order-btn");


// ==========================================
// DISPLAY ORDER
// ==========================================

function displayOrder() {

    checkoutItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div style="padding: 25px 10px; text-align: center; color: #666;">
                <p style="font-size: 16px; margin-bottom: 12px;">Your shopping cart is empty 🛍️</p>
                <a href="products.html" style="display: inline-block; padding: 8px 18px; background: #c2185b; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                    Explore Products
                </a>
            </div>
        `;

        checkoutTotal.textContent = "0";

        if (qrTotalAmount) qrTotalAmount.textContent = "0";
        if (qrStepAmount) qrStepAmount.textContent = "0";
        if (upiDetailsAmount) upiDetailsAmount.textContent = "0";

        return;

    }


    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");

        div.className = "checkout-item";

        div.innerHTML = `

            <div class="checkout-item-info">
                <strong>${item.name}</strong>
                <span class="checkout-item-qty">Qty: ${item.quantity}</span>
            </div>

            <strong class="checkout-item-price">
                ₹${itemTotal.toLocaleString("en-IN")}
            </strong>

        `;

        checkoutItems.appendChild(div);

    });


    const formattedTotal = total.toLocaleString("en-IN");
    checkoutTotal.textContent = formattedTotal;

    if (qrTotalAmount) qrTotalAmount.textContent = formattedTotal;
    if (qrStepAmount) qrStepAmount.textContent = formattedTotal;
    if (upiDetailsAmount) upiDetailsAmount.textContent = formattedTotal;

}


displayOrder();


// ==========================================
// PAYMENT METHOD SELECTION & QR TOGGLE
// ==========================================

function updatePaymentSelection() {

    const selectedRadio = document.querySelector('input[name="payment"]:checked');
    if (!selectedRadio) return;

    const val = selectedRadio.value;
    const currentTotal = checkoutTotal.textContent || "0";

    // Update active class on card elements
    document.querySelectorAll(".payment-card").forEach(card => {
        card.classList.remove("selected");
    });

    const activeCard = selectedRadio.closest(".payment-card");
    if (activeCard) {
        activeCard.classList.add("selected");
    }

    if (val === "GPay" || val === "PhonePe") {

        if (upiQrSection) {
            upiQrSection.style.display = "block";
            upiQrSection.classList.add("fade-in");
        }

        const appLabel = val === "GPay" ? "Google Pay" : "PhonePe";

        if (selectedUpiAppName) {
            selectedUpiAppName.textContent = `Scan & Pay via ${appLabel}`;
        }

        if (qrStepAppName) {
            qrStepAppName.textContent = appLabel;
        }

        if (qrTotalAmount) {
            qrTotalAmount.textContent = currentTotal;
        }

        if (qrStepAmount) {
            qrStepAmount.textContent = currentTotal;
        }

        if (upiDetailsAmount) {
            upiDetailsAmount.textContent = currentTotal;
        }

        if (upiDetailsAppName) {
            upiDetailsAppName.textContent = appLabel;
        }

        if (placeOrderBtn) {
            placeOrderBtn.innerHTML = `Confirm Payment & Place Order (₹${currentTotal})`;
        }

    } else {

        // Cash on Delivery
        if (upiQrSection) {
            upiQrSection.style.display = "none";
        }

        if (placeOrderBtn) {
            placeOrderBtn.innerHTML = `Place Order (Cash on Delivery)`;
        }

    }

}


// Attach change listeners to payment radio options
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener("change", updatePaymentSelection);
});

// Also allow clicking the entire payment card
document.querySelectorAll(".payment-card").forEach(card => {
    card.addEventListener("click", function(e) {
        const radio = this.querySelector('input[name="payment"]');
        if (radio && !radio.checked) {
            radio.checked = true;
            updatePaymentSelection();
        }
    });
});

if (upiQrTrigger && upiPaymentDetails) {
    upiQrTrigger.addEventListener("click", function () {
        const isExpanded = upiQrTrigger.getAttribute("aria-expanded") === "true";
        upiQrTrigger.setAttribute("aria-expanded", String(!isExpanded));
        upiPaymentDetails.hidden = isExpanded;
    });
}

// Initialize payment selection state
updatePaymentSelection();


// ==========================================
// PLACE ORDER FORM SUBMISSION
// ==========================================

document
    .getElementById("checkout-form")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty! Please add products before placing an order.");

            return;

        }


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const paymentRadio =
            document.querySelector('input[name="payment"]:checked');


        if (!paymentRadio) {

            alert("Please choose a payment method.");

            return;

        }

        const payment = paymentRadio.value;


        // Simple validation
        if (
            name === "" ||
            phone === "" ||
            email === "" ||
            address === ""
        ) {

            alert("Please fill all customer details.");

            return;

        }


        const upiUtr = (document.getElementById("upi-utr-input")?.value || "").trim();

        const paymentLabel = payment === "GPay"
            ? "Google Pay (UPI QR)"
            : payment === "PhonePe"
            ? "PhonePe (UPI QR)"
            : "Cash on Delivery";

        const orderId = `ORD-${Date.now()}`;
        const totalFormatted = checkoutTotal.textContent;
        const totalNumber = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


        // Create order object
        const order = {

            orderId: orderId,

            customerName: name,

            phone: phone,

            email: email,

            address: address,

            paymentMethod: paymentLabel,

            upiUtr: upiUtr,

            items: cart,

            total: totalFormatted,

            orderDate: new Date().toLocaleString()

        };


        // Append the order to StylekartStore so previous purchases remain available.
        const orders = StylekartStore.readOrders();
        orders.unshift({
            orderId: order.orderId,
            createdAt: new Date().toISOString(),
            status: payment === "Cash on Delivery" ? "Order placed (COD)" : "Order placed (UPI payment pending verification)",
            customer: {
                name: order.customerName,
                phone: order.phone,
                email: order.email,
                address: order.address,
                paymentMethod: order.paymentMethod,
                upiUtr: order.upiUtr
            },
            items: order.items.map(item => ({ ...item })),
            total: totalNumber
        });
        StylekartStore.saveOrders(orders);

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );


        // Clear cart
        localStorage.removeItem("cart");

        cart = [];


        // Populate thank-you modal details
        document.getElementById("thank-order-id").textContent = order.orderId;
        document.getElementById("thank-customer-name").textContent = order.customerName;
        document.getElementById("thank-customer-phone").textContent = order.phone;
        document.getElementById("thank-customer-address").textContent = order.address;
        document.getElementById("thank-payment-method").textContent = order.paymentMethod + (upiUtr ? ` (Ref: ${upiUtr})` : "");
        document.getElementById("thank-total-amount").textContent = totalFormatted;

        // Show/hide thank-you QR receipt section
        const thankQrSection = document.getElementById("thank-qr-section");
        if (thankQrSection) {
            if (payment === "GPay" || payment === "PhonePe") {
                thankQrSection.style.display = "block";
            } else {
                thankQrSection.style.display = "none";
            }
        }


        // Hide checkout container
        document.querySelector(
            ".checkout-container"
        ).style.display = "none";


        // Show thank-you modal
        document.getElementById(
            "thank-you"
        ).style.display = "flex";

    });


// ==========================================
// TOGGLE THANK YOU QR RECEIPT
// ==========================================

function toggleThankQR() {

    const drawer = document.getElementById("thank-qr-drawer");
    const btn = document.getElementById("toggle-qr-btn");

    if (!drawer) return;

    if (drawer.style.display === "none" || !drawer.style.display) {
        drawer.style.display = "block";
        btn.innerHTML = "📱 Hide Payment QR Code";
    } else {
        drawer.style.display = "none";
        btn.innerHTML = "📱 View Payment QR Code";
    }

}


// ==========================================
// CONTINUE SHOPPING
// ==========================================

function goHome() {

    window.location.href = "index.html";

}