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


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projects-grid');
    if (!container) return;   // safety guard
  
    const endpoint = 'https://api.github.com/users/pqb0/repos?per_page=100&sort=updated';
  
    fetch(endpoint)
      .then(r => {
        if (!r.ok) throw new Error(`GitHub ${r.status}`);
        return r.json();
      })
      .then(repos => {
        // Optionally drop forks – comment the next line if you want them too
        const list = repos.filter(r => !r.fork);
  
        container.innerHTML = list.map(repo => `
          <article class="project-card">
            <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
            <p class="desc">${repo.description || ''}</p>
            <p class="meta">
              ${repo.language ? `<span class="lang">${repo.language}</span>` : ''} ★ ${repo.stargazers_count}
            </p>
            ${repo.homepage ? `<a class="demo" href="${repo.homepage}" target="_blank">Live demo</a>` : ''}
          </article>
        `).join('');
      })
      .catch(err => {
        container.innerHTML = `<p class="error">⚠️ Could not load projects: ${err.message}</p>`;
      });
  });
