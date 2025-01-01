document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      card.addEventListener('click', function() {
        // Toggle the 'active' class on click
        card.classList.toggle('active');
      });
    });
  });