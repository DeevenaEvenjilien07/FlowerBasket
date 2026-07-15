window.addEventListener("load", () => {
   // alert("Welcome to Flower Basket!");
});

const shopBtn = document.querySelector(".hero button");

if (shopBtn) {
    shopBtn.addEventListener("click", () => {
        document.querySelector(".featured").scrollIntoView({
            behavior: "smooth"
        });
    });
}

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.parentElement;

        const product = {
            name: card.querySelector("h3").innerText,
            price: Number(card.querySelector("p").innerText.replace("₹", "")),
            image: card.querySelector("img").src,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

     
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "cart.html";

    });

});

const cartItems = document.getElementById("cart-items");

if (cartItems) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" class="cart-image">

            <div class="details">

                <h2>${item.name}</h2>

                <p>Price : ₹${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">+</button>

                </div>

                <br>

                <button class="remove" onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    document.getElementById("total-items").innerText = cart.length;

    document.getElementById("total-price").innerText = total;

}
function increaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}
function decreaseQuantity(index) {

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}