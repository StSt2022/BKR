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

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResultsContainer.innerHTML = '';
            searchResultsContainer.style.display = 'none';
            return;
        }

        const results = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        searchResultsContainer.innerHTML = '';

        if (results.length > 0) {
            results.slice(0, 5).forEach(product => {
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

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.search-container')) {
            searchResultsContainer.style.display = 'none';
        }
    });
}

document.addEventListener('componentLoaded', function(event) {
    if (event.detail.selector === '#header-placeholder') {
        initializeBurgerMenu();
        initializeLiveSearch();
    }
});