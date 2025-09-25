document.addEventListener('DOMContentLoaded', () => {
    let currentProduct;

    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const breadcrumbsContainer = document.getElementById('breadcrumbs');
    const product = products.find(p => p.id === productId);

    if (product) {
        const categoryNames = {
            cosmetics: "Косметика та парфумерія",
            cleaning: "Засоби для прибирання",
            hygiene: "Засоби особистої гігієни",
            household: "Господарські товари"
        };
        const categoryName = categoryNames[product.category];

        breadcrumbsContainer.innerHTML = `
        <a href="index.html">Головна</a>
        <span class="breadcrumb-separator">/</span>
        <a href="catalog.html?category=${product.category}">${categoryName}</a>
        <span class="breadcrumb-separator">/</span>
        <span>${product.name}</span>
    `;
    }

    currentProduct = products.find(p => p.id === productId);

    if (!currentProduct) {
        const mainContent = document.querySelector('.product-page') || document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `<h1>Товар не знайдено</h1>`;
        }
        return;
    }

    document.getElementById('product-image').src = currentProduct.image;
    document.getElementById('product-image').alt = currentProduct.name;
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-description').textContent = currentProduct.description;
    document.getElementById('product-price').textContent = `${currentProduct.price} грн`;

    const addToCartButton = document.getElementById('add-to-cart-btn');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductInCart = cart.find(item => item.id === currentProduct.id);

            if (existingProductInCart) {
                existingProductInCart.quantity++;
            } else {
                cart.push({ id: currentProduct.id, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            showToast(`${currentProduct.name} додано в кошик!`);

            updateCartCounter();
        });
    }
});

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCounter) {
        cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
}

if (window.location.pathname.endsWith('cart.html')) {

    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartTotalSpan = document.getElementById('cart-total');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Ваш кошик порожній.</p>';
        } else {
            cart.forEach(cartItem => {
                const product = products.find(p => p.id === cartItem.id);
                if (product) {
                    const itemTotal = product.price * cartItem.quantity;
                    total += itemTotal;

                    cartItemsContainer.innerHTML += `
                        <div class="cart-item">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="cart-item-info">
                                <h3>${product.name}</h3>
                                <div class="quantity-controls">
                                    <span class="quantity-label">Кількість:</span>
                                    <button class="quantity-btn" data-id="${product.id}" data-action="decrease">-</button>
                                    <span class="quantity-text">${cartItem.quantity}</span>
                                    <button class="quantity-btn" data-id="${product.id}" data-action="increase">+</button>
                                </div>
                            </div>
                            <div class="cart-item-price">${itemTotal} грн</div>
                        </div>
                    `;
                }
            });
        }

        cartTotalSpan.textContent = total;
        updateCartCounter();
        addCartActionListeners();
    }

    function addCartActionListeners() {
        const quantityButtons = document.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                const action = event.target.dataset.action;
                updateQuantity(productId, action);
            });
        });
    }

    function updateQuantity(productId, action) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            if (action === 'increase') {
                cart[productIndex].quantity++;
            } else if (action === 'decrease') {
                cart[productIndex].quantity--;
                if (cart[productIndex].quantity === 0) {
                    cart.splice(productIndex, 1);
                }
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    document.addEventListener('DOMContentLoaded', renderCart);
}

document.addEventListener('componentLoaded', function (event) {
    if (event.detail.selector === '#header-placeholder') {
        updateCartCounter();
    }
});