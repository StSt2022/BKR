document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    const productGrid = document.getElementById('product-grid');
    const categoryTitle = document.getElementById('category-title');
    const mainElement = document.querySelector('.catalog-main');
    const breadcrumbsContainer = document.getElementById('breadcrumbs');

    if (!productGrid || !categoryTitle || !mainElement) return;

    // Розширюємо наш словник, додаючи кольори та CSS-класи
    const categoryData = {
        cleaning: { name: "Засоби для прибирання", colorClass: "category-cleaning" },
        cosmetics: { name: "Косметика та парфумерія", colorClass: "category-cosmetics" },
        hygiene: { name: "Засоби особистої гігієни", colorClass: "category-hygiene" },
        household: { name: "Господарські товари", colorClass: "category-household" }
    };

    const currentCategoryData = categoryData[category] || { name: "Каталог товарів", colorClass: "category-default" };

    breadcrumbsContainer.innerHTML = `
    <a href="index.html">Головна</a>
    <span class="breadcrumb-separator">/</span>
    <span>${currentCategoryData.name}</span>
    `;

    // Встановлюємо заголовок сторінки
    categoryTitle.textContent = currentCategoryData.name;

    // ДОДАЄМО CSS-КЛАС ДО <main>
    mainElement.classList.add(currentCategoryData.colorClass);

    // Фільтруємо товари
    const filteredProducts = category
        ? products.filter(p => p.category === category)
        : products;

    // Генеруємо HTML для товарів (цей блок без змін)
    if (filteredProducts.length > 0) {
        let allCardsHTML = '';
        filteredProducts.forEach(product => {
            allCardsHTML += `
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
        productGrid.innerHTML = allCardsHTML;
    } else {
        productGrid.innerHTML = `<p>На жаль, у цій категорії товарів ще немає.</p>`;
    }
});