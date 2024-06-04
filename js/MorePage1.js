const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
});


document.addEventListener('scroll', function () {
    var sidebar = document.getElementById('sidebar');
    var rightnav = document.querySelector('.rightnav');

    if (window.scrollY > 50) {
        sidebar.classList.add('scrolled');
        rightnav.classList.add('scrolled');
    } else {
        sidebar.classList.remove('scrolled');
        rightnav.classList.remove('scrolled');
    }
});



document.addEventListener('DOMContentLoaded', async () => {
    async function fetchMusicData(search) {
        let url = 'https://youtube-music-api3.p.rapidapi.com/search?';
        if (search) {
            url += `&q=${search}&type=videos`;
        }
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'fe560ddabcmsh313fd0df97b8f8ep1110a8jsn5714c2168418',
                'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.result);
            return result.result;
        } catch (error) {
            console.error(error);
        }
    }

    async function createMusicCards(search) {
        const moregrid = document.getElementById('moregrid');
        moregrid.innerHTML = '';
        const songs = await fetchMusicData(search);

        if (!songs || songs.length === 0) {
            moregrid.innerHTML = '<div class="col-12">No songs found.</div>';
            return;
        }

        songs.forEach(song => {
            createCardElement(song);
        });
    }

    function createCardElement(song) {
        const moregrid = document.getElementById('moregrid');
        const col = document.createElement('div');
        col.className = "col-md-2 col-sm-4 moregrid-item";

        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '100%';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'thumbnail-container';

        const thumbnail = document.createElement('img');
        thumbnail.className = 'card-img-top';
        thumbnail.src = song.thumbnail;
        thumbnail.alt = song.title;

        const playIcon = document.createElement('i');
        playIcon.classList.add('fa', 'fa-solid', 'fa-play', 'bi', 'bi-play-circle-fill', 'fa-2x', 'play-icon');
        playIcon.addEventListener('click', () => {
            const videoId = song.videoId;
            console.log('Clicked video ID:', videoId);
            localStorage.setItem('playsong', videoId)
            window.location.href = '../pages/musicPlayer.html';
        });

        thumbnailContainer.appendChild(thumbnail);
        thumbnailContainer.appendChild(playIcon);

        const cardContent = document.createElement('div');
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = song.title;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = song.author;



        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardText);

        cardBody.appendChild(thumbnailContainer);
        cardBody.appendChild(cardContent);
        card.appendChild(cardBody);
        col.appendChild(card);

        moregrid.appendChild(col);
    }

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            const searchQuery = searchBar.value.trim();
            if (searchQuery) {
                await createMusicCards(searchQuery);
            }
        }
    });
    
    await createMusicCards(localStorage.getItem('moredata'));





    document.getElementById('library').addEventListener('click', function () {
        window.location.href = '../pages/library.html';
        console.log("library")
    });
    document.getElementById('explore').addEventListener('click', function () {
        window.location.href = '../pages/explore.html';
    });

    document.getElementById('home').addEventListener('click', function () {
        window.location.href = '../pages/HomePage.html';
    });

});