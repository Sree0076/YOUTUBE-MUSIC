document.addEventListener("DOMContentLoaded", function() {
    async function searchMusic(search) {
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
            displayResults(result.result)
            return result.result;
        } catch (error) {
            console.error(error);
        }
    }

    function displayResults(data) {
        const searchResultsContainer = document.getElementById("searchResults");
        if (!searchResultsContainer) {
            console.error("Search results container not found.");
            return;
        }
        searchResultsContainer.innerHTML = ""; // Clear previous results
    
        // Display videos
        if (data && data.length > 0) {
            data.forEach(item => {
                const resultDiv = document.createElement("div");
                resultDiv.classList.add("result");
    
                // Image container
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("searchimage-container");
    
                const image = document.createElement("img");
                image.src = item.thumbnail;
                image.alt = item.title;
                image.classList.add("searchimage");
                imageContainer.appendChild(image);
    
                // Play button
                const playButton = document.createElement("div");
                playButton.classList.add("bi", "bi-caret-right-fill", "play-button");
                playButton.addEventListener('click', () => {
                    const videoId = item.videoId;
                    console.log(videoId)
                    localStorage.setItem('playsong', videoId)
                    window.location.href='../pages/musicPlayer.html'
                    // Add more logic here to handle the click event if needed
                });

                imageContainer.appendChild(playButton);
                
    
                imageContainer.addEventListener("mouseover", () => {
                    image.style.opacity = "0.7";
                    playButton.style.display = "block";
                });
    
                imageContainer.addEventListener("mouseout", () => {
                    image.style.opacity = "1";
                    playButton.style.display = "none";
                });
    
                resultDiv.appendChild(imageContainer);
    
                // Details container
                const detailsContainer = document.createElement("div");
                detailsContainer.classList.add("details-container");
    
                const title = document.createElement("h6");
                title.textContent = item.title;
                detailsContainer.appendChild(title);

                const author = document.createElement("p");
                author.classList.add("author");
                author.textContent = item.author;
                detailsContainer.appendChild(author);
                author.addEventListener('click', () => {
                
                    localStorage.setItem('author', item.author)
                    window.location.href='../pages/artist.html'
                    // Add more logic here to handle the click event if needed
                  });

                const duration = document.createElement("p");
                duration.textContent = item.duration;
                detailsContainer.appendChild(duration);
    
                resultDiv.appendChild(detailsContainer);
    
                searchResultsContainer.appendChild(resultDiv);
    
                // Add horizontal rule
                const hr = document.createElement("hr");
                searchResultsContainer.appendChild(hr);
            });
        }
    }
    const searchTerm = localStorage.getItem('searchTerm');
    const searchInput = document.getElementById('searchInput');
    if (searchTerm) {
        searchMusic(searchTerm);
    }
    
    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            const searchTerm = searchInput.value;
            searchMusic(searchTerm);

        }
    });


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

