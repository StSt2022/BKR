// Функція для оновлення лічильника в шапці
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCounter) {
        cartCounter.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
}

// Функція для відображення всіх елементів кошика
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalSpan = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartTotalSpan) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cartItemsContainer.innerHTML = ''; // Очищуємо контейнер перед рендерингом

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Ваш кошик порожній.</p>';
    } else {
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) {
                const itemTotal = product.price * cartItem.quantity;
                total += itemTotal;
                
                // НОВИЙ ВАРІАНТ
                cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="cart-item-info">
                            <h3>${product.name}</h3>
                            <div class="quantity-controls">
                                <!-- ДОДАЄМО ТЕКСТ "Кількість:" -->
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
    addCartActionListeners(); // Додаємо обробники подій до нових кнопок
}

// Функція, яка додає обробники подій до кнопок +/-
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

// Функція, яка змінює кількість або видаляє товар
function updateQuantity(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
        if (action === 'increase') {
            cart[productIndex].quantity++;
        } else if (action === 'decrease') {
            cart[productIndex].quantity--;
            // Якщо кількість стає 0, видаляємо товар з кошика
            if (cart[productIndex].quantity === 0) {
                cart.splice(productIndex, 1);
            }
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Перемальовуємо весь кошик з новими даними
}


// --- Точка входу для скрипта ---

// Оновлюємо лічильник, коли завантажується хедер
document.addEventListener('componentLoaded', function(event) {
    if (event.detail.selector === '#header-placeholder') {
        updateCartCounter();
    }
});

// Якщо ми на сторінці кошика, запускаємо її рендеринг
if (window.location.pathname.endsWith('cart.html')) {
    // Чекаємо, поки завантажиться DOM, щоб знайти елементи
    document.addEventListener('DOMContentLoaded', renderCart);
}