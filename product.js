document.addEventListener('DOMContentLoaded', () => {
    // Ця змінна буде зберігати дані про наш поточний товар
    let currentProduct;

    // 1. Отримуємо ID товару з URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    // У файлі product.js, всередині DOMContentLoaded
    const breadcrumbsContainer = document.getElementById('breadcrumbs');
    const product = products.find(p => p.id === productId);

    if (product) {
        // Словник категорій, такий самий, як у catalog.js
        const categoryNames = {
            cosmetics: "Косметика та парфумерія",
            cleaning: "Засоби для прибирання",
            // ... і т.д.
        };
        const categoryName = categoryNames[product.category];

        // Генеруємо "хлібні крихти"
        breadcrumbsContainer.innerHTML = `
        <a href="index.html">Головна</a>
        <span class="breadcrumb-separator">/</span>
        <a href="catalog.html?category=${product.category}">${categoryName}</a>
        <span class="breadcrumb-separator">/</span>
        <span>${product.name}</span>
    `;
    }

    // 2. Знаходимо товар у глобальному масиві `products` (з data.js)
    currentProduct = products.find(p => p.id === productId);

    // 3. Перевіряємо, чи товар знайдено
    if (!currentProduct) {
        const mainContent = document.querySelector('.product-page') || document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `<h1>Товар не знайдено</h1>`;
        }
        return; // Зупиняємо виконання скрипта
    }

    // 4. Заповнюємо сторінку даними про товар
    document.getElementById('product-image').src = currentProduct.image;
    document.getElementById('product-image').alt = currentProduct.name;
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-description').textContent = currentProduct.description;
    document.getElementById('product-price').textContent = `${currentProduct.price} грн`;

    // 5. Знаходимо кнопку "Додати в кошик" і вішаємо на неї обробник
    const addToCartButton = document.getElementById('add-to-cart-btn');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            // Отримуємо кошик з localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Шукаємо, чи цей товар вже є в кошику
            const existingProductInCart = cart.find(item => item.id === currentProduct.id);

            if (existingProductInCart) {
                existingProductInCart.quantity++; // Якщо є, збільшуємо кількість
            } else {
                cart.push({ id: currentProduct.id, quantity: 1 }); // Якщо немає, додаємо
            }

            // Зберігаємо оновлений кошик
            localStorage.setItem('cart', JSON.stringify(cart));

            showToast(`${currentProduct.name} додано в кошик!`);

            // Викликаємо функцію оновлення лічильника з cart.js
            updateCartCounter();
        });
    }
});
// --- ГЛОБАЛЬНА ФУНКЦІЯ ОНОВЛЕННЯ ЛІЧИЛЬНИКА ---
// Ця функція буде доступна для інших скриптів (напр., product.js)
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCounter) {
        cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
}

// --- ЛОГІКА, ЯКА ПРАЦЮЄ ТІЛЬКИ НА СТОРІНЦІ КОШИКА ---
if (window.location.pathname.endsWith('cart.html')) {

    // Функція для відображення всіх елементів кошика
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

    // Функція для додавання обробників подій до кнопок +/-
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

    // Функція для зміни кількості або видалення товару
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
        renderCart(); // Перемальовуємо кошик
    }

    // Запускаємо рендеринг кошика, коли DOM готовий
    document.addEventListener('DOMContentLoaded', renderCart);
}

// --- ГЛОБАЛЬНА ЛОГІКА, ЯКА ПРАЦЮЄ НА ВСІХ СТОРІНКАХ ---

// Оновлюємо лічильник, коли завантажується хедер
document.addEventListener('componentLoaded', function (event) {
    if (event.detail.selector === '#header-placeholder') {
        updateCartCounter();
    }
});