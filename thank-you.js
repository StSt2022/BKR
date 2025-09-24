document.addEventListener('DOMContentLoaded', () => {
    // Генеруємо випадковий номер замовлення для реалістичності
    const orderNumberElement = document.getElementById('order-number');
    if (orderNumberElement) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        orderNumberElement.textContent = `#SYV-${randomNumber}`;
    }

    // Очищуємо кошик в localStorage
    localStorage.removeItem('cart');

    // Оновлюємо лічильник кошика (він зникне, оскільки кошик порожній)
    // Ця функція знаходиться в cart.js, але ми не можемо її викликати,
    // бо на цій сторінці немає хедера. Це нормально.
    // Головне - що дані в localStorage очищені.
});