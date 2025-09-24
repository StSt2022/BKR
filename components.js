document.addEventListener("DOMContentLoaded", function () {
    const loadComponent = (selector, url) => {
        const element = document.querySelector(selector);
        if (element) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load component from ${url}`);
                    }
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                    const event = new CustomEvent('componentLoaded', { detail: { selector: selector } });
                    document.dispatchEvent(event);
                })
                .catch(error => console.error(error));
        }
    };

    loadComponent("#header-placeholder", "header.html");
    loadComponent("#footer-placeholder", "footer.html");
});