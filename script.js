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

    const container = document.getElementById('projects-grid');
    if (!container) return;

    const endpoint = 'https://api.github.com/users/pqb0/repos?per_page=100&sort=updated';

    fetch(endpoint)
        .then(r => {
            if (!r.ok) throw new Error(`GitHub ${r.status}`);
            return r.json();
        })
        .then(repos => {
            const list = repos.filter(r => r.name !== 'pqb0.github.io');

            container.innerHTML = '';
            list.forEach(repo => {
                const article = document.createElement('article');
                article.className = 'card';

                const heading = document.createElement('h3');
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.rel = 'noopener';
                link.className = 'box-content';
                link.textContent = repo.name;
                heading.appendChild(link);

                const desc = document.createElement('p');
                desc.textContent = repo.description || '';

                article.appendChild(heading);
                article.appendChild(desc);

                if (repo.homepage) {
                    const demo = document.createElement('a');
                    demo.className = 'demo';
                    demo.href = repo.homepage;
                    demo.target = '_blank';
                    demo.rel = 'noopener';
                    demo.textContent = 'Live demo';
                    article.appendChild(demo);
                }

                container.appendChild(article);
            });
        })
        .catch(err => {
            const msg = document.createElement('p');
            msg.className = 'error';
            msg.textContent = `⚠️ Could not load projects: ${err.message}`;
            container.appendChild(msg);
        });
});
