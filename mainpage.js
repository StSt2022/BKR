// Функція для ініціалізації логіки бургера
function initializeBurgerMenu() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.user-menu');
    if (!burger || !nav) return;
    const burgerIcon = burger.querySelector('img');
    const menuIconPath = 'images/menu.png';
    const closeIconPath = 'images/close.png';

    burger.addEventListener('click', () => {
        nav.classList.toggle('is-active');
        if (nav.classList.contains('is-active')) {
            burgerIcon.src = closeIconPath;
            burger.setAttribute('aria-label', 'Закрити меню');
        } else {
            burgerIcon.src = menuIconPath;
            burger.setAttribute('aria-label', 'Відкрити меню');
        }
    });
}

// Функція для ініціалізації "живого" пошуку
function initializeLiveSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');
    if (!searchInput || !searchResultsContainer) return;

    // "Слухаємо" кожне введення символу
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        
        // Очищуємо результати, якщо поле порожнє
        if (query.length < 2) { // Починаємо пошук після введення 2-х символів
            searchResultsContainer.innerHTML = '';
            searchResultsContainer.style.display = 'none';
            return;
        }

        // Фільтруємо товари
        const results = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        // Очищуємо попередні результати
        searchResultsContainer.innerHTML = '';

        if (results.length > 0) {
            results.slice(0, 5).forEach(product => { // Показуємо не більше 5 результатів
                const itemHTML = `
                    <a href="product.html?id=${product.id}" class="search-result-item">
                        <img src="${product.image}" alt="${product.name}" class="search-result-image">
                        <div class="search-result-info">
                            <span class="search-result-name">${product.name}</span>
                            <span class="search-result-price">${product.price} грн</span>
                        </div>
                    </a>
                `;
                searchResultsContainer.innerHTML += itemHTML;
            });
            searchResultsContainer.style.display = 'block';
        } else {
            searchResultsContainer.innerHTML = `<div class="search-no-results">Нічого не знайдено</div>`;
            searchResultsContainer.style.display = 'block';
        }
    });

    // Ховаємо результати, якщо клікнути десь на сторінці
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.search-container')) {
            searchResultsContainer.style.display = 'none';
        }
    });
}

// Головна точка входу: чекаємо, поки завантажиться хедер
document.addEventListener('componentLoaded', function(event) {
    if (event.detail.selector === '#header-placeholder') {
        initializeBurgerMenu();
        initializeLiveSearch(); // Запускаємо ініціалізацію пошуку
    }
});