document.addEventListener('DOMContentLoaded', () => {
    if (typeof loggedInUser !== 'undefined') {
        document.getElementById('firstName').value = loggedInUser.firstName;
        document.getElementById('lastName').value = loggedInUser.lastName;
        document.getElementById('phone').value = loggedInUser.phone;
    }

    const summaryContainer = document.getElementById('summary-items-container');
    const summaryTotalEl = document.getElementById('summary-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length > 0 && summaryContainer) {
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) {
                total += product.price * cartItem.quantity;
                summaryContainer.innerHTML += `
                    <div class="summary-item">
                        <span class="summary-item-name">${product.name} (x${cartItem.quantity})</span>
                        <span class="summary-item-price">${product.price * cartItem.quantity} грн</span>
                    </div>
                `;
            }
        });
        summaryTotalEl.textContent = `${total} грн`;
    }

    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const novaPoshtaFields = document.getElementById('nova-poshta-fields');
    const ukrposhtaFields = document.getElementById('ukrposhta-fields');
    const courierFields = document.getElementById('courier-fields');

    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedDelivery = event.target.value;

            novaPoshtaFields.style.display = 'none';
            ukrposhtaFields.style.display = 'none';
            courierFields.style.display = 'none';

            if (selectedDelivery === 'nova-poshta') {
                novaPoshtaFields.style.display = 'block';
            } else if (selectedDelivery === 'ukrposhta') {
                ukrposhtaFields.style.display = 'block';
            } else if (selectedDelivery === 'courier') {
                courierFields.style.display = 'block';
            }
        });
    });

    document.querySelector('input[name="delivery"]:checked').dispatchEvent(new Event('change'));
});