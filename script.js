document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll('.card');

    // Ensure links don't block card clicks
    const links = document.querySelectorAll('.card a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });

    // Toggle card open/close independently
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

});
