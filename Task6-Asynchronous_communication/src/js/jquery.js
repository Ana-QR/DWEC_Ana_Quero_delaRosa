$(document).ready(function() {
    const $container = $('#cat-container');
    let currentPage = 1;

    function fetchCats() {
        $.ajax({
            url: `https://api.thecatapi.com/v1/images/search?limit=10&page=${currentPage}`,
            method: 'GET'
        }).done(function(data) {
            $.each(data, function(index, cat) {
                const $card = $(`
                    <article class='bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out transform hover:shadow-2xl'>
                        <img src='${cat.url}' alt='Cat' class='w-full h-auto rounded-lg shadow-md mb-4'>
                        <h2 class='text-xl font-semibold mt-2 text-gray-800'>Imagen de gato</h2>
                        <p class='text-gray-600 text-sm'>ID: ${cat.id}</p>
                        <p class='text-gray-600 text-sm'>Width: ${cat.width}px</p>
                        <p class='text-gray-600 text-sm'>Height: ${cat.height}px</p>
                        <a href='${cat.url}' target='_blank' class='text-blue-500 underline mt-4 block text-sm hover:text-blue-700'>Ver imagen al completo</a>
                    </article>
                `);
                $container.append($card);
            });
            currentPage++;
        }).fail(function(error) {
            console.error('Error fetching cat images:', error);
        });
    }

    fetchCats();  // Cargar imágenes inicialmente

    // Infinite Scroll
    $(window).on('scroll', function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
            fetchCats();  // Cargar más imágenes cuando se llegue al final de la página
        }
    });
});
