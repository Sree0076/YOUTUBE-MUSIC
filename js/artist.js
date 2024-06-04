// =============================================================SIDEBAR JS==================================================================

const showSidebar = () => {
  // document.getElementById("#sidebar").style.backgroundColor = "black"
  document.querySelector("#sidebar").classList.toggle("expand");
};

const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

// =================================================================ON SCROLL NAVBAR COLOR CHANGE==============================================

document.addEventListener("scroll", function () {
  var sidebar = document.getElementById("sidebar");
  var rightnav = document.querySelector(".rightnav");

  if (window.scrollY > 50) {
    sidebar.classList.add("scrolled");
    rightnav.classList.add("scrolled");
  } else {
    sidebar.classList.remove("scrolled");
    rightnav.classList.remove("scrolled");
  }
});

// ====================================================================MODAL SHOWING JS=============================================================

const showmodal = () => {
  var settingsmodal = document.getElementById("modaal");
  if (settingsmodal.style.display == "none") {
    settingsmodal.style.display = "block";
  } else {
    settingsmodal.style.display = "none";
  }
};


// ==========================================================SEARCHING ARTIST & GETTING ARTIST DETAILS========================================================================

let artistDetails = "";

async function getArtistIdFromName(inputValue) {
  let url = "https://youtube-music-api-yt.p.rapidapi.com/search-artists?q=";
  if (inputValue) {
    url += `${inputValue}`;
  }
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': 'b3b9d304c7msha0e775cc7e52d6bp1a3988jsn94b05bdcc497',
      'X-RapidAPI-Host': 'youtube-music-api-yt.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result[0].artistId);
    return result[0].artistId;
  } catch (error) {
    console.error(error);
  }
}

async function getArtistDetails(inputValue) {
  let artistid = await getArtistIdFromName(inputValue);
  let url = 'https://youtube-music-api3.p.rapidapi.com/getArtists?id='+artistid;

  const options = {
    method: "GET",
    headers: {
     
      'X-RapidAPI-Key': 'b3b9d304c7msha0e775cc7e52d6bp1a3988jsn94b05bdcc497',
      'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    artistDetails = result;
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function setArtistDetails() {
  await getArtistDetails(inputValue);
  var artistname = document.getElementById("stagename");
  var artistdescription = document.getElementById("about");
  var artistimage = document.getElementById("imageofartist");
  artistname.textContent = artistDetails.title;
  artistdescription.textContent = artistDetails.description;
  artistimage.src = artistDetails.thumbnail;
  var aboutElement = document.getElementById("about");
  var aboutDiv = document.getElementById("aboutdiv");
  var readMoreDiv = document.getElementById("readmoreDiv");

  if (aboutElement.scrollHeight > aboutElement.clientHeight) {
    readMoreDiv.style.display = "block";
  } else {
    readMoreDiv.style.display = "none";
  }
  await renderSongs(artistDetails);
  createAlbumElement(artistDetails);
  createSingleElement(artistDetails);
  createVideoElement(artistDetails);
  createFeaturedElements(artistDetails);
  createFanElement(artistDetails);


}




// ======================================================================EXPANDING DECSRIPTION BOX====================================================



function expandDescription() {
  var aboutElement = document.getElementById("about");
  var readMoreLink = document.getElementById("readmoreLink");

  if (
    aboutElement.style.height === "90px" ||
    aboutElement.style.height === ""
  ) {
    aboutElement.style.height = "max-content";
    readMoreLink.textContent = "Read Less...";
  } else {
    aboutElement.style.height = "90px";
    readMoreLink.textContent = "Read More...";
  }
}

// ============================================================SONGLIST=====================================================

async function renderSongs(artistDetails) {
  const container = document.getElementById("table-grid-container");
  container.innerHTML = "";

  artistDetails.songs.contents.forEach((song) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song");

    const img = document.createElement("img");
    img.src = song.thumbnail;
    img.alt = song.title;
    img.addEventListener('click', () => {

      localStorage.setItem('playsong', song.videoId)
      window.location.href = '../pages/musicPlayer.html';
      console.log('Clicked video ID:', song.videoId);
      // Add more logic here to handle the click event if needed
    });

    const details = document.createElement("div");
    details.classList.add("detailsTable");
    const listtitlelink = document.createElement("a");
    listtitlelink.href = "#";
    const title = document.createElement("p");
    listtitlelink.textContent = song.title;

    details.appendChild(title);
    details.appendChild(listtitlelink);
    songElement.appendChild(img);
    songElement.appendChild(details);

    const duration = document.createElement("div");
    duration.classList.add("duration");
    duration.textContent = song.duration;
    songElement.appendChild(duration);

    container.appendChild(songElement);
  });
}


// =========================================================ALBUM CAROUSEL JS FETCHING==========================================================

function createAlbumElement(artistDetails) {
  artistDetails.albums.contents.forEach((song) => {
  const itemsElement = document.getElementById("items");
  const listItem = document.createElement("li");
  listItem.classList.add("song-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  const image = document.createElement("img");
  image.src = song.thumbnail;
  image.addEventListener("click", () => {
    const videoId = song.browseId;
    console.log("Clicked video ID:", videoId);
  });
  const playIcon = document.createElement("i");
  playIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-circle-fill",
    "fa-2x",
    "fs-2",
    "text-light"
  );
  playIcon.addEventListener("click", () => {
    const videoId = song.browseId;
    console.log("Clicked video ID:", videoId);
  });
  imageContainer.appendChild(image);
  imageContainer.appendChild(playIcon);

  contentContainer.appendChild(imageContainer);
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");
  const title = document.createElement("div");

  const titleLink = document.createElement("a");
  titleLink.href = "#";
  titleLink.textContent = song.title;
  title.classList.add("title");
  title.appendChild(titleLink);

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem);
});
}


// ============================================================SINGLES CAROUSEL API FETCHING===================================================

function createSingleElement(artistDetails) {
  artistDetails.singles.contents.forEach((song) => {

  const itemsElement = document.getElementById("singlesItems");
  const listItem = document.createElement("li");
  listItem.classList.add("single-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("single-content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("single-image-container");
  const image = document.createElement("img");
  image.src = song.thumbnail;
  image.addEventListener("click", () => {
    const videoId = song.videoId;
    console.log("Clicked video ID:", videoId);
  });
  const playIcon = document.createElement("i");
  playIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-circle-fill",
    "fa-2x",
    "fs-2",
    "text-light"
  );
  playIcon.addEventListener("click", () => {
    const videoId1 = song.browseId;
    localStorage.setItem('playsong', videoId1)
    window.location.href = '../pages/musicPlayer.html';
  });
  imageContainer.appendChild(image);
  imageContainer.appendChild(playIcon);

  contentContainer.appendChild(imageContainer);
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("single-details-container");
  const title = document.createElement("div");

  const titleLink = document.createElement("a");
  titleLink.href = "#";
  titleLink.textContent = song.title;
  title.classList.add("single-title");
  title.appendChild(titleLink);

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem);
});
}

// ========================================================================VIDEO CAROUSEL API FETCHING=========================================================

function createVideoElement(artistDetails) {
  artistDetails.videos.contents.forEach((song) => {

  const itemsElement = document.getElementById("videosItems");
  const listItem = document.createElement("li");
  listItem.classList.add("video-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("video-content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("video-image-container");
  const image = document.createElement("img");
  image.src = song.thumbnail;
  image.addEventListener("click", () => {
    const videoId = song.browseId;
    console.log("Clicked video ID1:", videoId);
  });
  const playIcon = document.createElement("i");
  playIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-fill",
    "fa-2x",
    "fs-1",
    "text-light"
  );
  playIcon.addEventListener("click", () => {
    const videoId = song.browseId;
    localStorage.setItem('playsong', videoId)
    window.location.href = '../pages/musicPlayer.html';
    console.log("Clicked video ID1:", videoId);
  });
  imageContainer.appendChild(image);
  imageContainer.appendChild(playIcon);

  contentContainer.appendChild(imageContainer);
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("video-details-container");
  const title = document.createElement("div");

  const titleLink = document.createElement("a");
  titleLink.href = "#";
  titleLink.textContent = song.title;
  title.classList.add("video-title");
  title.appendChild(titleLink);

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem);
});
}

// ======================================================================FEATURED CAROUSEL API FETCHING================================================================

function createFeaturedElements(artistDetails) {
  artistDetails.featured_on.contents.forEach((song) => {

  const itemsElement = document.getElementById("featuredItems");
  const listItem = document.createElement("li");
  listItem.classList.add("featured-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("featured-content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("featured-image-container");
  const image = document.createElement("img");
  image.src = song.thumbnail;
  image.addEventListener("click", () => {
    const videoId = song.browseId;
    localStorage.setItem('playsong', videoId)
            window.location.href = '../pages/musicPlayer.html';
    console.log("Clicked video ID:", videoId);
  });
  const playIcon = document.createElement("i");
  playIcon.classList.add(
    "fa",
    "fa-solid",
    "fa-play",
    "bi",
    "bi-play-circle-fill",
    "fa-2x",
    "fs-2",
    "text-light"
  );
  playIcon.addEventListener("click", () => {
    const videoId = song.browseId;
    console.log("Clicked video ID:", videoId);
  });
  imageContainer.appendChild(image);
  imageContainer.appendChild(playIcon);

  contentContainer.appendChild(imageContainer);
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("featured-details-container");
  const title = document.createElement("div");

  const titleLink = document.createElement("a");
  titleLink.href = "#";
  titleLink.textContent = song.title;
  title.classList.add("featured-title");
  title.appendChild(titleLink);

  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem);
});
}

// ===============================================================FANS MIGHT LIKE CAROUSEL FETCHING=========================================================

function createFanElement(artistDetails) {
  artistDetails.fans_might_also_like.contents.forEach((song) => {

  const itemsElement = document.getElementById("fanItems");
  const listItem = document.createElement("li");
  listItem.classList.add("fan-container");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("fan-content-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("fan-image-container");
  const image = document.createElement("img");
  image.src = song.thumbnail;
  image.addEventListener("click", () => {
    localStorage.setItem('author',song.title);
  });
  imageContainer.appendChild(image);

  contentContainer.appendChild(imageContainer);
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("fan-details-container");
  const title = document.createElement("div");

  const titleLink = document.createElement("a");
  titleLink.textContent = song.title;
  titleLink.addEventListener("click", () => {
    localStorage.setItem('author',song.title);
    window.location.href="../pages/artist.html"
  });
  title.classList.add("fan-title");
  title.appendChild(titleLink);
  detailsContainer.appendChild(title);
  contentContainer.appendChild(detailsContainer);

  listItem.appendChild(contentContainer);
  itemsElement.appendChild(listItem);
});
}


// =======================================================================================

document.addEventListener("DOMContentLoaded", function () {
  setArtistDetails();
 });

 var inputValue =localStorage.getItem('author');



 