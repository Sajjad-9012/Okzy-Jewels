/* ==========================================
   PRODUCT DATABASE

   CHANGE YOUR PRODUCTS HERE
========================================== */

const products = [

    {
        id: 1,
        name: "Onyx Signet Ring",
        category: "rings",
        price: 2499,
        oldPrice: 3299,
        badge: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
        description:
            "A bold signet silhouette with a refined polished finish."
    },

    {
        id: 2,
        name: "Luxe Rope Bracelet",
        category: "bracelets",
        price: 2899,
        oldPrice: 3799,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
        description:
            "A sophisticated rope-inspired bracelet designed for everyday wear."
    },

    {
        id: 3,
        name: "Twist Hoop Earrings",
        category: "earrings",
        price: 2199,
        oldPrice: 2899,
        badge: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85",
        description:
            "Elegant twisted hoops with a contemporary silhouette."
    },

    {
        id: 4,
        name: "Classic Gold Pendant",
        category: "necklaces",
        price: 2999,
        oldPrice: 3999,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
        description:
            "A timeless pendant designed to be worn alone or layered."
    },

    {
        id: 5,
        name: "Cuban Link Bracelet",
        category: "bracelets",
        price: 3499,
        oldPrice: 4499,
        badge: "",
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85",
        description:
            "A strong chain profile with a polished luxury finish."
    },

    {
        id: 6,
        name: "Aurelia Band",
        category: "rings",
        price: 1999,
        oldPrice: 2699,
        badge: "",
        image: "https://images.unsplash.com/photo-1598560912005-59a0a87c6f0f?auto=format&fit=crop&w=900&q=85",
        description:
            "A clean minimalist band made for effortless styling."
    },

    {
        id: 7,
        name: "Pearl Drop Earrings",
        category: "earrings",
        price: 2399,
        oldPrice: 2999,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
        description:
            "A delicate pearl-inspired design for an elegant finish."
    },

    {
        id: 8,
        name: "Midnight Chain",
        category: "necklaces",
        price: 2799,
        oldPrice: 3599,
        badge: "",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
        description:
            "A versatile chain designed for layering or wearing alone."
    }

];


/* ==========================================
   CART
========================================== */

let cart = [];


/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function displayProducts(list = products) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    list.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                ${
                    product.badge
                    ? `<span class="badge">
                        ${product.badge}
                       </span>`
                    : ""
                }

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-price">

                    <span class="old-price">
                        Rs. ${product.oldPrice.toLocaleString()}
                    </span>

                    Rs. ${product.price.toLocaleString()}

                </div>


                <div class="product-actions">

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})">

                        ADD TO BAG

                    </button>

                    <button
                        class="view-button"
                        onclick="quickView(${product.id})">

                        QUICK VIEW

                    </button>

                </div>

            </div>

        `;

        grid.appendChild(card);

    });

}


/* ==========================================
   FILTER
========================================== */

function filterProducts(category) {

    document.querySelectorAll(".filter")
        .forEach(button => {
            button.classList.remove("active");
        });


    const selectedButton =
        [...document.querySelectorAll(".filter")]
        .find(button =>
            button.innerText.toLowerCase() === category
        );


    if (selectedButton) {
        selectedButton.classList.add("active");
    }


    let filteredProducts;


    if (category === "all") {

        filteredProducts = products;

    } else {

        filteredProducts =
            products.filter(product =>
                product.category === category
            );

    }


    displayProducts(filteredProducts);


    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==========================================
   CART
========================================== */

function addToCart(id) {

    const product =
        products.find(product => product.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


function updateCart() {

    const container =
        document.getElementById("cartItems");

    const count =
        document.getElementById("cartCount");

    const totalElement =
        document.getElementById("cartTotal");


    container.innerHTML = "";


    let total = 0;
    let totalQuantity = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        totalQuantity += item.quantity;


        const element =
            document.createElement("div");

        element.className = "cart-product";


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Rs. ${item.price.toLocaleString()}
                </p>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove"
                onclick="removeFromCart(${item.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        container.appendChild(element);

    });


    if (cart.length === 0) {

        container.innerHTML = `

            <div style="
                text-align:center;
                color:#888;
                padding:70px 20px;
            ">

                Your bag is empty.

            </div>

        `;

    }


    count.innerText = totalQuantity;

    totalElement.innerText =
        `Rs. ${total.toLocaleString()}`;

}


function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    updateCart();

}


function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

}


function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


/* ==========================================
   QUICK VIEW
========================================== */

function quickView(id) {

    const product =
        products.find(product => product.id === id);


    alert(
        `${product.name}\n\n` +
        `Rs. ${product.price.toLocaleString()}\n\n` +
        `${product.description}`
    );

}


/* ==========================================
   SEARCH
========================================== */

function openSearch() {

    document
        .getElementById("searchOverlay")
        .classList.add("show");

    document
        .getElementById("searchInput")
        .focus();

}


function closeSearch() {

    document
        .getElementById("searchOverlay")
        .classList.remove("show");

}


function searchProducts() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const results =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(query)

            ||

            product.category
                .toLowerCase()
                .includes(query)

        );


    const container =
        document.getElementById("searchResults");


    if (!query) {

        container.innerHTML = "";

        return;

    }


    if (results.length === 0) {

        container.innerHTML = `
            <p style="
                color:#777;
                margin-top:30px;
            ">
                No jewelry found.
            </p>
        `;

        return;

    }


    container.innerHTML =
        results.map(product => `

            <div
                class="search-result"
                onclick="
                    addToCart(${product.id});
                    closeSearch();
                "
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        Rs. ${product.price.toLocaleString()}
                    </p>

                </div>

            </div>

        `).join("");

}


/* ==========================================
   FAQ
========================================== */

function toggleFAQ(button) {

    const item =
        button.parentElement;

    item.classList.toggle("open");

}


/* ==========================================
   MOBILE MENU
========================================== */

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("show");

}


/* ==========================================
   NEWSLETTER
========================================== */

function subscribe(event) {

    event.preventDefault();

    alert(
        "You're on the list. Welcome to NOIRÉ."
    );

}


/* ==========================================
   START WEBSITE
========================================== */

displayProducts();

updateCart();