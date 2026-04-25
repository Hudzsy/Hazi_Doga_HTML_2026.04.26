document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://nodejs111.dszcbaross.edu.hu/api/movie';
    const gallery = document.getElementById('gallery');
    const movieList = document.getElementById('movie-list');

    async function fetchMovies() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Hálózati hiba történt');
            
            const movies = await response.json();

            gallery.innerHTML = '';
            movieList.innerHTML = '';

            movies.forEach(movie => {
                const category = movie.category || movie.mufaj || 'Film';
                const rating = movie.rating || movie.korhatar || '12';
                const image = movie.image || 'https://via.placeholder.com/300x450';

                const card = document.createElement('div');
                card.className = 'movie-card';
                card.style.backgroundImage = `url('${image}')`;
                
                card.innerHTML = `
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <div>
                            <span class="tag">${category}</span>
                            <span class="tag">${rating}+</span>
                        </div>
                    </div>
                `;
                gallery.appendChild(card);

                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = "#";
                a.textContent = movie.title;
                li.appendChild(a);
                movieList.appendChild(li);
            });

        } catch (error) {
            console.error('Hiba a betöltés során:', error);
            gallery.innerHTML = '<p style="color:red; padding: 20px;">Hiba történt a filmek betöltésekor. Kérlek próbáld újra később!</p>';
            movieList.innerHTML = '<li>Sikertelen betöltés</li>';
        }
    }

    fetchMovies();
});