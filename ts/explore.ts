// Type definitions for the song and API response
interface Song {
    title: string;
    author: string;
    thumbnail: string;
    videoId: string;
    details?: string;
  }
  
  interface ApiResponse {
    result: Song[];
  }
  
  const hamBurger1 = document.querySelector(".toggle-btn") as HTMLElement;
  hamBurger1.addEventListener("click", function () {
    const sidebar = document.querySelector("#sidebar") as HTMLElement;
    sidebar.classList.toggle("expand");
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  
    function performSearch() {
      const searchTerm = searchInput.value;
      if (searchTerm) {
        localStorage.setItem("searchTerm", searchTerm);
        window.location.href = "../pages/search.html";
      }
    }
  
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        performSearch();
      }
    });
  
    const homeButton = document.getElementById("home") as HTMLElement;
    homeButton.addEventListener("click", function () {
      window.location.href = "../pages/HomePage.html";
    });
  
    const libraryButton = document.getElementById("library") as HTMLElement;
    libraryButton.addEventListener("click", function () {
      window.location.href = "../pages/library.html";
      console.log("library");
    });
  
    const elements = ["more", "more1", "more2", "more3", "more4"];
    elements.forEach((id) => {
      const element = document.getElementById(id) as HTMLElement;
      element.addEventListener("click", function () {
        window.location.href = "../pages/MorePage1.html";
      });
    });
  });
  
  async function populateSongs(search: string): Promise<Song[]> {
    let url = "https://youtube-music-api3.p.rapidapi.com/search?";
    if (search) {
      url += `q=${search}&type=song`;
    }
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b3b9d304c7msha0e775cc7e52d6bp1a3988jsn94b05bdcc497",
        "X-RapidAPI-Host": "youtube-music-api3.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const data: ApiResponse = await response.json();
      renderSongs(data.result);
      return data.result;
    } catch (error) {
      console.error("Error fetching songs:", error);
      return [];
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const search = "d se dance";
    populateSongs(search)
      .then((songs) => {
        const itemsElement = document.getElementById("items") as HTMLElement;
        if (Array.isArray(songs)) {
          songs.forEach((song) => {
            console.log(song);
            const listItem = document.createElement("li");
            listItem.classList.add("song-container");
            const contentContainer = document.createElement("div");
            contentContainer.classList.add("content-container");
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");
            const image = document.createElement("img");
            image.src = song.thumbnail;
            imageContainer.appendChild(image);
            const playIcon = document.createElement("i");
            playIcon.classList.add("bi", "bi-caret-right-fill", "play-icon");
            playIcon.addEventListener("click", () => {
              const videoId = song.videoId;
              localStorage.setItem("playsong", videoId);
              window.location.href = "../pages/musicPlayer.html";
              console.log("Clicked video ID:", videoId);
            });
            imageContainer.appendChild(playIcon);
            contentContainer.appendChild(imageContainer);
            const detailsContainer = document.createElement("div");
            detailsContainer.classList.add("details-container");
  
            const title = document.createElement("p");
            title.textContent = song.title;
            title.classList.add("title");
            title.style.overflow = "hidden";
            const details = document.createElement("p");
            details.textContent = song.details || "";
            details.classList.add("details");
            details.style.whiteSpace = "break-spaces";
            details.style.overflow = "hidden";
            details.style.textOverflow = "ellipsis";
            details.style.display = "-webkit-box";
            details.style.webkitLineClamp = "2";
            details.style.webkitBoxOrient = "vertical";
            const type = document.createElement("p");
            type.textContent = (song.details ? "Album" : "Single") + " • " + song.author;
            details.appendChild(type);
            detailsContainer.appendChild(title);
            detailsContainer.appendChild(details);
            contentContainer.appendChild(detailsContainer);
            listItem.appendChild(contentContainer);
            itemsElement.appendChild(listItem);
          });
        } else {
          console.error("Error: Invalid data format for songs");
        }
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById("prevButton") as HTMLElement;
    const nextButton = document.getElementById("nextButton") as HTMLElement;
    const carouselWrapper = document.querySelector(".slider-container") as HTMLElement;
  
    prevButton.addEventListener("click", function () {
      // Move carousel to the left
      carouselWrapper.scrollLeft -= carouselWrapper.offsetWidth;
    });
  
    nextButton.addEventListener("click", function () {
      // Move carousel to the right
      carouselWrapper.scrollLeft += carouselWrapper.offsetWidth;
    });
  });
  
  const categories: string[] = [
    "Hindi", "Workout", "Monsoon", "Party", "Romance", "Sleep", "Feel Good", "Malayalam",
    "Bollywood", "Cardio", "Rainy", "Celebration", "Love", "Nap", "Happy", "Study",
    "Desi", "Fitness", "Stormy", "Dance", "Passion", "Rest", "Joy", "Concentration",
    "Filmi", "Exercise", "Drizzle", "Gathering", "Affection", "Dream", "Smile", "Work",
    "Indie", "Yoga", "Wet", "Festival", "Heart", "Relax", "Content", "Attention",
    "Classical", "Pilates", "Thunder", "Event", "Crush", "Slumber", "Bliss", "Reading"
  ];
  
  function renderCategories() {
    const categoriesContainer = document.getElementById("categories") as HTMLElement;
    categoriesContainer.innerHTML = ""; // Clear previous content
  
    categories.forEach((category) => {
      const li = document.createElement("li");
      li.classList.add("category");
  
      const card = document.createElement("div");
      card.classList.add("card");
      card.textContent = category;
      card.addEventListener("click", function () {
        console.log(card.textContent);
        localStorage.setItem("moredata", card.textContent || "");
        window.location.href = "../pages/MorePage1.html";
      });
  
      li.appendChild(card);
      categoriesContainer.appendChild(li);
    });
  }
  renderCategories();
  
  const basicColors: string[] = ["red", "orange", "yellow", "cyan", "blue", "blueviolet", "#90EE90", "gold", "limegreen", "antiquewhite"];
  document.querySelectorAll(".card").forEach(function (card) {
    const randomColor = basicColors[Math.floor(Math.random() * basicColors.length)];
    (card as HTMLElement).style.borderLeft = "5px solid " + randomColor;
  });
  
  document.addEventListener("DOMContentLoaded", async () => {
    const url = "https://youtube-data8.p.rapidapi.com/playlist/videos/?id=PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr&hl=en&gl=US";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b3b9d304c7msha0e775cc7e52d6bp1a3988jsn94b05bdcc497",
        "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
  
      const contents = result.contents.slice(0, 25);
      console.log(contents);
      const popularEpisodesList = document.getElementById("episodes-popular") as HTMLElement;
  
      const createCardInListItem = (item: any) => {
        const li = document.createElement("li");
        li.className = "episode-item";
  
        const card = document.createElement("div");
        card.className = "card-episodes";
  
        const img = document.createElement("img");
        img.src = item.thumbnails[0].url; // Use the first thumbnail
        img.alt = item.title;
  
        const details = document.createElement("div");
        details.className = "details";
  
        const lengthseconds = document.createElement("p");
        lengthseconds.className = "lengthseconds";
        lengthseconds.textContent = item.lengthSeconds + " seconds";
  
        const title = document.createElement("h3");
        title.textContent = item.title;
  
        const description = document.createElement("p");
        description.classList.add("popular-description");
        description.textContent = item.author.canonicalBaseUrl + item.title || "No description available";
        details.appendChild(lengthseconds);
        details.appendChild(title);
        details.appendChild(description);
        card.appendChild(img);
        card.appendChild(details);
        li.appendChild(card);
  
        return li;
      };
  
      contents.forEach((content: any) => {
        const videoDetails = content.video; // Access the video details from the content
        const listItem = createCardInListItem(videoDetails);
        popularEpisodesList.appendChild(listItem);
      });
    } catch (error) {
      console.error(error);
    }
  });
  
  async function renderSongs(songs: Song[]) {
    const container = document.getElementById("table-grid-container") as HTMLElement;
    container.innerHTML = "";
    let serialNumber = 1;
    songs.forEach((song) => {
      const songElement = document.createElement("div");
      songElement.classList.add("song");
  
      // Image
      const img = document.createElement("img");
      img.src = song.thumbnail;
      img.alt = song.title;
  
      const playIcon = document.createElement("i");
      playIcon.classList.add("bi", "bi-caret-right-fill", "playbutton-icon");
      songElement.appendChild(playIcon);
  
      const number = document.createElement("div");
      number.classList.add("serial-number");
       // Assuming 'number' is the key for song number
  
      // Details (You can replace 'details' with the actual details property from the data)
      const details = document.createElement("div");
      details.classList.add("detailsTable");
      const title = document.createElement("p");
      title.textContent = song.title;
      const author = document.createElement("p");
      const authorWords = song.author.split(" ");
      author.textContent = authorWords.slice(0, 4).join(" ");
      details.appendChild(title);
      details.appendChild(author);
  
      songElement.appendChild(img);
      songElement.appendChild(number);
      songElement.appendChild(details);
  
      container.appendChild(songElement);
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const search = "d se dance"; // Your search query
    populateSongs(search)
      .then((songs) => {
        const newvideosElement = document.getElementById("newvideos") as HTMLElement;
        // Check if songs is defined and is an array
        if (Array.isArray(songs)) {
          // Loop through each song object in the array of songs and populate the HTML
          songs.forEach((song) => {
            const newlistItem = document.createElement("li");
            newlistItem.classList.add("song-container");
  
            // Create a parent container for image and details
            const contentContainer = document.createElement("div");
            contentContainer.classList.add("newvideo-container");
  
            // Image container
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("newimage-container");
            const image = document.createElement("img");
            image.src = song.thumbnail;
            const playIcon = document.createElement("i");
            playIcon.classList.add("bi", "bi-caret-right-fill", "play-newsongsicon");
            playIcon.addEventListener("click", () => {
              const videoId = song.videoId;
              localStorage.setItem("playsong", videoId);
              window.location.href = "../pages/musicPlayer.html";
              console.log("Clicked video ID:", videoId);
            });
            imageContainer.appendChild(image);
            imageContainer.appendChild(playIcon);
            contentContainer.appendChild(imageContainer);
            // Details container
            const detailsContainer = document.createElement("div");
            detailsContainer.classList.add("newdetails-container");
  
            const title = document.createElement("p");
            title.textContent = song.title;
            title.classList.add("title");
            title.style.overflow = "hidden";
            const details = document.createElement("p");
            details.textContent = song.details || "";
            details.classList.add("details");
            details.style.whiteSpace = "break-spaces";
            details.style.overflow = "hidden";
            details.style.textOverflow = "ellipsis";
            details.style.display = "-webkit-box";
            details.style.webkitLineClamp = "2";
            details.style.webkitBoxOrient = "vertical";
            const type = document.createElement("p");
            const subContent = song.author.split(" ");
  
            type.textContent = subContent.slice(0, 3).join(" ");
            details.appendChild(type);
            detailsContainer.appendChild(title);
            detailsContainer.appendChild(details);
            contentContainer.appendChild(detailsContainer);
  
            newlistItem.appendChild(contentContainer);
            newvideosElement.appendChild(newlistItem);
          });
        } else {
          console.error("Error: Invalid data format for songs");
        }
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const dropdownButton = document.querySelector(".dropdown-button") as HTMLElement;
    const dropdownMenu = document.querySelector(".dropdown-menu") as HTMLElement;
  
    dropdownButton.addEventListener("click", () => {
      dropdownMenu.style.display = "block";
    });
  
    window.addEventListener("click", (event) => {
      if (!(event.target as HTMLElement).matches(".dropdown-button")) {
        if ((dropdownMenu.style.display = "block")) {
          dropdownMenu.style.display = "none";
        }
      }
    });
  });
  