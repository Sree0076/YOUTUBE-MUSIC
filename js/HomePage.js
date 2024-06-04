const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

document.addEventListener("scroll", function () {
  var sidebar = document.getElementById("sidebar");
  var rightnav = document.querySelector(".rightnav");

  if (window.scrollY > 50) {
    // Change this value to adjust when the color change should happen
    sidebar.classList.add("scrolled");
    rightnav.classList.add("scrolled");
  } else {
    sidebar.classList.remove("scrolled");
    rightnav.classList.remove("scrolled");
  }
});
// Function to fetch music data from the API
async function fetchMusicData(search) {
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
async function fetchTrending() {
  let url =
    "https://youtube-v2.p.rapidapi.com/trending/?lang=en&country=in&section=Music";
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
    const trendingsongs = result.videos;
    trendingsongs.forEach((trendingsong) => {
      createAlbumElement(trendingsong);
    });
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuickPicks() {
  let url = "https://youtube-music-api3.p.rapidapi.com/recommend?gl=ID";
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
    const quicksongs = result.results;
    quicksongs.forEach((quicksong) => {
      quickpicks(quicksong);
    });
  } catch (error) {
    console.error(error);
  }
}

async function topMusic() {
  let url = "https://youtube-music-api3.p.rapidapi.com/v2/home?gl=ID";
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
    const topsongs = result.results.charts.top_music_videos.list;
    topsongs.forEach((topsong) => {
      topPicks(topsong);
    });
  } catch (error) {
    console.error(error);
  }
}
// Function to create music cards and display them on the page
async function createMusicCards(search) {
  const musicContainer = document.getElementById("product-container");
  const songs = await fetchMusicData(search);

  if (!songs || songs.length === 0) {
    musicContainer.innerHTML = "<p>No songs found.</p>";
    return;
  }

  songs.forEach((song) => {
    createAlbumElement1(song);
  });
}


// Function to create album elements
function createAlbumElement(song) {
  const itemsElement = document.getElementById("items");
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
  title.classList.add("title");

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem); // Appending the song element to items
}
function createAlbumElement1(song) {
  const itemsElement = document.getElementById("items1");
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
function quickpicks(song) {
  console.log("quck");
  const quick_itemsElement = document.getElementById("categories");
  const quick_listItem = document.createElement("li");
  quick_listItem.classList.add("category");
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");
  const quickpicksTitle = document.createElement("div");
  quickpicksTitle.classList.add("quick-picks-title");
  const image = document.createElement("img");
  image.src = song.thumbnail;
  const QuickplayIcon = document.createElement("i");
  QuickplayIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-circle",
    "fs-1x"
  );
  QuickplayIcon.addEventListener("click", () => {
    const videoId = song.videoId;
    localStorage.setItem("playsong", videoId);
    window.location.href = "../pages/musicPlayer.html";
    console.log("Clicked video ID:", videoId);
    // Add more logic here to handle the click event if needed
  });
  quickpicksTitle.appendChild(QuickplayIcon);
  quickpicksTitle.appendChild(image);
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("quick-picks-title-p");
  const text = document.createElement("p");
  text.textContent = song.title;
  titleContainer.appendChild(text);
  quickpicksTitle.appendChild(titleContainer);

  const authorContainer = document.createElement("div");
  authorContainer.classList.add("quick-picks-author");
  const authorText = document.createElement("p");
  authorText.textContent = song.author;
  authorText.classList.add("author-text");
  authorContainer.appendChild(authorText);
  quickpicksTitle.appendChild(authorContainer);

  cardContainer.appendChild(quickpicksTitle);
  quick_listItem.appendChild(cardContainer);
  quick_itemsElement.appendChild(quick_listItem);
}

function topPicks(song) {
  const itemsElement = document.getElementById("items2");
  const listItem = document.createElement("li");
  listItem.classList.add("song-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  const image = document.createElement("img");
  image.src = song.thumbnail; // Assuming thumbnail is the property containing the image URL
  image.addEventListener("click", () => {
    const videoId = song.videoId;
    localStorage.setItem("playsong", videoId);
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

document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const carouselWrapper = document.querySelector(".slider-container");

  prevButton.addEventListener("click", function () {
    // Move carousel to the left
    carouselWrapper.scrollLeft -= carouselWrapper.offsetWidth;
  });

  nextButton.addEventListener("click", function () {
    // Move carousel to the right
    carouselWrapper.scrollLeft += carouselWrapper.offsetWidth;
  });
  getHomeData();
});


async function getHomeData() {
  await fetchTrending();
  await createMusicCards("despacito");
  await fetchQuickPicks();
  await topMusic();
}



document.getElementById("library").addEventListener("click", function () {
  window.location.href = "../pages/library.html";
  console.log("library");
});
document.getElementById("explore").addEventListener("click", function () {
  window.location.href = "../pages/explore.html";
});
const elements = ["more", "more1", "more2", "more3"];
elements.forEach((id) => {
  document.getElementById(id).addEventListener("click", function () {
    if(id=="more")
      {
        localStorage.setItem('moredata','hindi songs')
      }
      else     if(id=="more1")
        {
          localStorage.setItem('moredata','english songs')
        }
        else if(id=="more2")
          {
            localStorage.setItem('moredata','despacito')
          }
   
    window.location.href = "../pages/MorePage1.html";
  });
});
// document.getElementById('home').addEventListener('click', function () {
//     window.location.href = '../pages/HomePage.html';
// });

// Function to toggle PiP mode signout
document.getElementById("relax").addEventListener("click", function () {
  localStorage.setItem("moredata", "relax");
  window.location.href = "../pages/MorePage1.html";
});

document.getElementById("signout").addEventListener("click", function () {
  localStorage.setItem("auth", 0);
  window.location.href = "../pages/HomePage.html";
});
document.getElementById("workout").addEventListener("click", function () {
  localStorage.setItem("moredata", "trip song");
  window.location.href = "../pages/MorePage1.html";
});
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (event) {
    let search = document.getElementById("searchInput").value;
    if (event.key === "Enter") {
      localStorage.setItem("searchTerm", search);
      window.location.href = "../pages/search.html";
    }
  });

function togglePiP() {
  const videoElement = document.getElementById("videoController");

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((error) => {
      console.error("Error exiting PiP:", error);
    });
  } else {
    videoElement.requestPictureInPicture().catch((error) => {
      console.error("Error entering PiP:", error);
    });
  }
}
const searchBar = document.getElementById("searchInput");
searchBar.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    localStorage.getItem("searchTerm", searchBar.value);
    window.location.href = "../pages/search.html";
  }
});
const showmodal = () => {
   const auth= localStorage.getItem('auth');
   if(auth==0 || auth==null)
    {
  var settingsmodal = document.getElementById("modaalsign");
  if (settingsmodal.style.display == "none") {
    settingsmodal.style.display = "block";
  } else {
    settingsmodal.style.display = "none";
  }
}
else  if(auth==1)
  { 
    var settingsmodal1 = document.getElementById("modaal");
    if (settingsmodal1.style.display == "none") {
      settingsmodal1.style.display = "block";
    } else {
      settingsmodal1.style.display = "none";
    }

  }
};
document.getElementById('signinp').textContent=(localStorage.getItem('email').split('@')[0]);
