const hamBurger = document.querySelector(".toggle-btn") as HTMLElement;

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar")?.classList.toggle("expand");
});

document.addEventListener("scroll", function () {
  const sidebar = document.getElementById("sidebar") as HTMLElement;
  const rightnav = document.querySelector(".rightnav") as HTMLElement;

  if (window.scrollY > 50) {
    // Change this value to adjust when the color change should happen
    sidebar.classList.add("scrolled");
    rightnav.classList.add("scrolled");
  } else {
    sidebar.classList.remove("scrolled");
    rightnav.classList.remove("scrolled");
  }
});

interface Song {
  thumbnails: { url: string }[];
  video_id: string;
  title: string;
}

interface TrendingSong extends Song {
  videoId: string;
}

async function fetchMusicData1(search: string): Promise<Song[] | undefined> {
  let url = "https://youtube-v2.p.rapidapi.com/search/?query=";
  if (search) {
    url += `${search}&lang=en&order_by=this_month&country=in`;
  }
  const options = {
    method: "GET",
    headers: {
      'x-rapidapi-key': 'fe560ddabcmsh313fd0df97b8f8ep1110a8jsn5714c2168418',
      'x-rapidapi-host': 'youtube-v2.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // Parse as JSON instead of text
    return result.videos;
  } catch (error) {
    console.error(error);
  }
}

async function fetchTrending(): Promise<void> {
  const url = "https://youtube-v2.p.rapidapi.com/trending/?lang=en&country=in&section=Music";
  const options = {
    method: "GET",
    headers: {
      'x-rapidapi-key': 'fe560ddabcmsh313fd0df97b8f8ep1110a8jsn5714c2168418',
      'x-rapidapi-host': 'youtube-v2.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const trendingsongs: TrendingSong[] = result.videos.map((song: any) => ({
      ...song,
      videoId: song.video_id,
    }));
    trendingsongs.forEach((trendingsong) => {
      createAlbumElement(trendingsong);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuickPicks(): Promise<void> {
  const url = "https://youtube-music-api3.p.rapidapi.com/recommend?gl=ID";
  const options = {
    method: "GET",
    headers: {
      'x-rapidapi-key': 'fe560ddabcmsh313fd0df97b8f8ep1110a8jsn5714c2168418',
      'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const quicksongs: TrendingSong[] = result.results.map((song: any) => ({
      ...song,
      videoId: song.video_id,
    }));
    quicksongs.forEach((quicksong) => {
      quickpicks(quicksong);
    });
  } catch (error) {
    console.error(error);
  }
}

async function topMusic(): Promise<void> {
  const url = "https://youtube-music-api3.p.rapidapi.com/v2/home?gl=ID";
  const options = {
    method: "GET",
    headers: {
      'x-rapidapi-key': 'fe560ddabcmsh313fd0df97b8f8ep1110a8jsn5714c2168418',
      'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const topsongs: TrendingSong[] = result.results.charts.top_music_videos.list.map((song: any) => ({
      ...song,
      videoId: song.video_id,
    }));
    topsongs.forEach((topsong) => {
      topPicks(topsong);
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to create music cards and display them on the page
async function createMusicCards(search: string): Promise<void> {
  const musicContainer = document.getElementById("product-container") as HTMLElement;
  const songs = await fetchMusicData(search);

  if (!songs || songs.length === 0) {
    musicContainer.innerHTML = "<p>No songs found.</p>";
    return;
  }


}

// Function to create album elements
function createAlbumElement(song: TrendingSong): void {
  const itemsElement = document.getElementById("items") as HTMLElement;
  const listItem = document.createElement("li");
  listItem.classList.add("song-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  const image = document.createElement("img");
  image.src = song.thumbnails[0].url; // Assuming thumbnail is the property containing the image URL
  image.addEventListener("click", () => {
    const videoId = song.videoId;
    console.log(song);
    console.log("Clicked video ID:", videoId);
    // Add more logic here to handle the click event if needed
  });
  // Play icon
  const playIcon = document.createElement("i");
  playIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-circle",
    "fa-2x"
  );
  playIcon.addEventListener("click", () => {
    const videoId = song.videoId;
    localStorage.setItem("playsong", videoId);
    window.location.href = "../pages/musicPlayer.html";
    console.log("Clicked video ID:", videoId);
    // Add more logic here to handle the click event if needed
  });
  imageContainer.appendChild(image);
  imageContainer.appendChild(playIcon); // Add play icon to the image container

  contentContainer.appendChild(imageContainer);
  // Details container
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");
  const title = document.createElement("div");
  title.textContent = song.title; // Assuming title is the property containing song name
  title.classList.add("title");

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem); // Appending the song element to items
}

function createAlbumElement1(song: Song): void {
  const itemsElement = document.getElementById("items1") as HTMLElement;
  const listItem = document.createElement("li");
  listItem.classList.add("song-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  const image = document.createElement("img");
  image.src = song.thumbnails[0].url; // Assuming thumbnail is the property containing the image URL
  image.addEventListener("click", () => {
    const videoId = song.video_id;
    console.log(song);
    console.log("Clicked video ID:", videoId);
    // Add more logic here to handle the click event if needed
  });
  // Play icon
  const playIcon = document.createElement("i");
  playIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-circle",
    "fa-2x"
  );
  playIcon.addEventListener("click", () => {
    const videoId = song.video_id;
    localStorage.setItem("playsong", videoId);
    window.location.href = "../pages/musicPlayer.html";
    console.log("Clicked video ID:", videoId);
    // Add more logic here to handle the click event if needed
  });
  imageContainer.appendChild(image);
  imageContainer.appendChild(playIcon); // Add play icon to the image container

  contentContainer.appendChild(imageContainer);
  // Details container
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");
  const title = document.createElement("div");
  title.textContent = song.title; // Assuming title is the property containing song name
  title.classList.add("title"); // Assuming title is the property containing song name

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem); // Appending the song element to items
}

// Function to handle quick picks
function quickpicks(song: TrendingSong): void {
  const quick_itemsElement = document.getElementById("items2") as HTMLElement;
  const quick_listItem = document.createElement("li");
  quick_listItem.classList.add("song-container");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  const quickpicksTitle = document.createElement("div");
  quickpicksTitle.textContent = song.title;
  quickpicksTitle.classList.add("quickpicksTitle");
  const quick_image = document.createElement("img");
  quick_image.src = song.thumbnails[0].url; // Assuming thumbnail is the property containing the image URL

  quick_image.addEventListener("click", () => {
    const videoId = song.videoId;
    localStorage.setItem("playsong", videoId);
    window.location.href = "../pages/musicPlayer.html";
    console.log("Clicked video ID:", videoId);
  });

  cardContainer.appendChild(quick_image);
  cardContainer.appendChild(quickpicksTitle);

  quick_listItem.appendChild(cardContainer);
  quick_itemsElement.appendChild(quick_listItem); // Appending the song element to items
}

// Function to handle top picks
function topPicks(song: TrendingSong): void {
  const top_itemsElement = document.getElementById("product-container1") as HTMLElement;
  const top_listItem = document.createElement("li");
  top_listItem.classList.add("song-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  const image = document.createElement("img");
  image.src = song.thumbnails[0].url; // Assuming thumbnail is the property containing the image URL
  image.addEventListener("click", () => {
    const videoId = song.videoId;
    console.log(song);
    console.log("Clicked video ID:", videoId);
    // Add more logic here to handle the click event if needed
  });
  // Play icon
  const playIcon = document.createElement("i");
  playIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-circle",
    "fa-2x"
  );
  playIcon.addEventListener("click", () => {
    const videoId = song.videoId;
    localStorage.setItem("playsong", videoId);
    window.location.href = "../pages/musicPlayer.html";
    console.log("Clicked video ID:", videoId);
    // Add more logic here to handle the click event if needed
  });
  imageContainer.appendChild(image);
  imageContainer.appendChild(playIcon); // Add play icon to the image container

  contentContainer.appendChild(imageContainer);
  // Details container
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");
  const title = document.createElement("div");
  title.textContent = song.title; // Assuming title is the property containing song name
  title.classList.add("title");

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  top_listItem.appendChild(contentContainer);
  top_itemsElement.appendChild(top_listItem); // Appending the song element to items
}

// Event listener for search button
const searchButton = document.getElementById("search-btn") as HTMLElement;
searchButton.addEventListener("click", async () => {
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const searchValue = searchInput.value.trim();
  console.log(searchValue);
  await createMusicCards(searchValue);
  searchInput.value = "";
});

// Call fetchTrending to fetch trending songs
fetchTrending();
fetchQuickPicks();
topMusic();
