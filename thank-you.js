document.addEventListener('DOMContentLoaded', () => {
    const orderNumberElement = document.getElementById('order-number');
    if (orderNumberElement) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        orderNumberElement.textContent = `#SYV-${randomNumber}`;
    }

    localStorage.removeItem('cart');
});