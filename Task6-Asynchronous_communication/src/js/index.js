document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cat-container');

    async function fetchCats() {
        try {
            let response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
            let data = await response.json();

            data.forEach(cat => {
                let article = document.createElement('article');
                article.className = 'bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out transform hover:shadow-2xl';
                article.innerHTML = `
                    <img src="${cat.url}" alt="Cat" class="w-full h-auto rounded-lg shadow-md mb-4">
                    <h2 class="text-xl font-semibold mt-2 text-gray-800">Imagen de gato</h2>
                    <p class="text-gray-600 text-sm">ID: ${cat.id}</p>
                    <p class="text-gray-600 text-sm">Width: ${cat.width}px</p>
                    <p class="text-gray-600 text-sm">Height: ${cat.height}px</p>
                    <a href="${cat.url}" target="_blank" class="text-blue-500 underline mt-4 block text-sm hover:text-blue-700">Ver imagen al completo</a>
                `;
                container.appendChild(article);
            });
        } catch (error) {
            console.error('Error fetching cat images:', error);
        }
    }

    fetchCats();

    // Infinite Scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            fetchCats();
        }
    });
});
