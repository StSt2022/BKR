document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    const searchTitle = document.getElementById('search-title');
    const resultsGrid = document.getElementById('search-results-grid');

    if (!query) {
        searchTitle.textContent = "Будь ласка, введіть пошуковий запит";
        return;
    }

    searchTitle.innerHTML = `Результати пошуку для: "<strong>${query}</strong>"`;

    const lowerCaseQuery = query.toLowerCase();
    const results = products.filter(product => 
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );

    if (results.length > 0) {
        results.forEach(product => {
            resultsGrid.innerHTML += `
                <a href="product.html?id=${product.id}" class="product-card-link">
                    <div class="catalog-card"> 
                        <img src="${product.image}" alt="${product.name}" class="catalog-card-image">
                        <div class="catalog-card-info">
                            <h3 class="catalog-card-title">${product.name}</h3>
                            <div class="catalog-card-price">${product.price} грн</div>
                        </div>
                    </div>
                </a>
            `;
        });
    } else {
        resultsGrid.innerHTML = `<p>На жаль, за вашим запитом нічого не знайдено.</p>`;
    }
});