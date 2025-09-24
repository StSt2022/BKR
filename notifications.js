// Новий файл: notifications.js
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Створюємо новий елемент для сповіщення
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;

    // Додаємо його в контейнер
    container.appendChild(toast);

    // Встановлюємо таймер на видалення сповіщення
    setTimeout(() => {
        toast.classList.remove('show');
        // Чекаємо, поки закінчиться анімація зникнення, і видаляємо елемент
        setTimeout(() => {
            container.removeChild(toast);
        }, 500); // 0.5s, як у CSS-анімації
    }, 3000); // Сповіщення буде видимим 3 секунди
}