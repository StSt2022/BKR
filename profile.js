document.addEventListener('DOMContentLoaded', () => {
    // Перевіряємо, чи існує наш фейковий користувач
    if (typeof loggedInUser !== 'undefined') {
        // Заповнюємо особисті дані
        document.getElementById('user-firstname').textContent = loggedInUser.firstName;
        document.getElementById('user-lastname').textContent = loggedInUser.lastName;
        document.getElementById('user-email').textContent = loggedInUser.email;
        document.getElementById('user-phone').textContent = loggedInUser.phone;

        // Заповнюємо адреси
        const addressesContainer = document.getElementById('user-addresses');
        loggedInUser.addresses.forEach(addr => {
            addressesContainer.innerHTML += `
                <div class="address-item">
                    <p>${addr.city}, ${addr.street}, ${addr.postalCode}</p>
                </div>
            `;
        });

        // Заповнюємо історію замовлень
        const ordersTableBody = document.querySelector('#order-history-table tbody');
        loggedInUser.orderHistory.forEach(order => {
            ordersTableBody.innerHTML += `
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.date}</td>
                    <td>${order.total} грн</td>
                    <td>${order.status}</td>
                </tr>
            `;
        });
    }
});