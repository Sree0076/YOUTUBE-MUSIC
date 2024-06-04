// let songId=localStorage.getItem('songId');
// if(songId===null){
//     songId='m87B0ulgN64';
// }
let songId='';
let musicData;
let videoData;
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = '<i class="fas fa-play"></i>';
const pauseIcon = '<i class="fas fa-pause"></i>';
const fullscreenButton = document.getElementById("fullscreenButton");
const songProgress = document.getElementById('songProgress');
const currentTime = document.getElementById('selectedSongTime');
const muteButton = document.getElementById("muteButton");
const muteIcon = document.getElementById("muteIcon");
const unmuteIcon = document.getElementById("unmuteIcon");
const volumeIcon = '<i class="fas fa-volume-up"></i>';
const volumeControl = document.getElementById('volumeControl');
const popUpBtn = document.getElementById('popUpBtn');
const popUpDiv = document.getElementById('popUpDiv');
const circleIcon = '<i class="fas fa-circle fa-xs"></i>';
const popUpIcon = '<i class="fas fa-caret-up"></i>';
const popDownIcon = '<i class="fas fa-caret-down"></i>';
const popUpImage = document.getElementById('popUpImage');
const nextSongBtn = document.getElementById('nextSongBtn');
const previousSongBtn = document.getElementById('previousSongBtn');
const videoController = document.getElementById('videoController');
const loopButton = document.getElementById('loop-button');
const songLists = document.getElementById('songList');
const songOtherDetails=document.getElementById('songOtherDetails');
const songName = document.getElementById('songName');

// Variables
let isPlaying = true;
let songImage;
let songName_;
let songArtist;
let songDuration;
let nextClickCounter = 0;
let videoUrl;

// navbars code below

const hamBurger = document.querySelector(".toggle-btn");
hamBurger.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("expand");
});

// navbars code above

async function fetchMusicData(songId) {
    let url = `https://youtube-music-api3.p.rapidapi.com/v2/next?id=${songId}`;
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
        musicData=result;
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchVideo(songId) {
    console.log("fecth"+songId)
    let url = `https://yt-api.p.rapidapi.com/dl?id=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fe560ddabcmsh313fd0df97b8f8ep1110a8jsn5714c2168418',
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function relatedContent(relatedId) {
    let url = `https://youtube-music-api3.p.rapidapi.com/related?id=${relatedId}`;
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
        console.log(result)
        return result[0].items;
    } catch (error) {
        console.error(error);
        return null;
    }
}



async function startMusic() {
    songProgress.value=0;
    document.getElementById('songList').innerHTML='';
    await fetchMusicData(songId)
        .then(data => {
            if (data) {
                relatedDisplay(data.relatedBrowseId);
                // Handle the data here
                songImage = data.nextItems[0].thumbnail;
                // console.log("songImage: "+songImage);
                songName_ = data.nextItems[0].title;
                // console.log("title: "+songName_);
                songArtist = data.nextItems[0].author;
                songDuration = data.nextItems[0].duration;
                // console.log("views: "+songViews);
                playerSongImage.src = songImage;
                songName.innerHTML = songName_;
                songOtherDetails.innerHTML = songArtist + " " + circleIcon + " " + songDuration;
                popUpImage.src = songImage;
                
                // console.log("songImage: "+songImage);

                for(let i=0;i<50;i++){
                   
                    const newSongImage=data.nextItems[i].thumbnail;
                    const newSongName=data.nextItems[i].title;
                    const newSongOtherDetails=data.nextItems[i].author+" "+circleIcon+" "+data.nextItems[i].duration;
                    let newClickCounter=i;

                    const newListItem = document.createElement("li");
                    newListItem.id="newListItem";
                    newListItem.classList.add("position-relative");
                    const songListDetailsDiv=document.createElement("div");
                    songListDetailsDiv.id="songListDetailsDiv";
                    songListDetailsDiv.classList.add("d-flex", "flex-row", "flex-wrap", "align-items-center", "justify-content-center", "m-0", "p-2");
                    songListDetailsDiv.style.color="white";

                    const songListImage = document.createElement("img");
                    songListImage.id = "songListImage";
                    songListImage.classList.add("me-3");
                    songListImage.alt = "songListImage";
                    songListImage.style.height='40px';
                    songListImage.style.borderRadius='2px';
                    songListImage.src=data.nextItems[i].thumbnail;
                    songListDetailsDiv.appendChild(songListImage);

                    const songListTextDetails = document.createElement("div");
                    songListTextDetails.id = "songListTextDetails";
                    songListTextDetails.classList.add("d-flex", "flex-column", "flex-wrap", "p-0", "m-0", "me-2");
                    songListDetailsDiv.appendChild(songListTextDetails);

                    const songListName = document.createElement("label");
                    songListName.id = "songListName";
                    songListName.innerHTML=data.nextItems[i].title;
                    songListTextDetails.appendChild(songListName);

                    const songListOtherDetails = document.createElement("label");
                    songListOtherDetails.id = "songListOtherDetails";
                    songListOtherDetails.innerHTML=data.nextItems[i].author+" "+circleIcon+" "+data.nextItems[i].duration;
                    songListTextDetails.appendChild(songListOtherDetails);
                    newListItem.appendChild(songListDetailsDiv);
                    const playPauseOverlay=document.createElement("div");
                    playPauseOverlay.id="playPauseOverlay";
                    playPauseOverlay.innerHTML=playIcon;
                    newListItem.appendChild(playPauseOverlay);

                    songLists.appendChild(newListItem);

                    newListItem.addEventListener('mouseenter',()=>{
                        newListItem.style.backgroundColor='grey';
                        playPauseOverlay.style.opacity='1'
                        newListItem.style.cursor='pointer'
                    })
                    newListItem.addEventListener('mouseleave',()=>{
                        newListItem.style.backgroundColor='';
                        playPauseOverlay.style.opacity=''
                        newListItem.style.cursor=''
                    })
                  
                    playPauseOverlay.addEventListener('click',()=>{
                        
                        nextClickCounter=newClickCounter;
                        playerSongImage.src=newSongImage;
                        songName.innerHTML=newSongName;
                        songOtherDetails.innerHTML=newSongOtherDetails;
                        popUpImage.src=newSongImage;

                       
                         fetchVideo(data.nextItems[newClickCounter].videoId)
                        .then(data => {

                            if (data) {
                                // nextClickCounter++;
                                updateSongData(musicData)
                                videoUrl = data.formats[0].url;
                                videoPlayer.src=videoUrl;
                                videoController.load();
                                videoController.play();
                                playPauseBtn.innerHTML=pauseIcon;
                            } else {
                                console.log("Failed to fetch music data.");
                            }
                        });
                    });
                    }
            } else {
                console.log("Failed to fetch music data.");
            }

        });
        
      
        await fetchVideo(songId)
        .then(data => {
           console.log("strt1:"+songId)
            if (data) {  
                nextClickCounter=0;
                updateSongData(musicData) 
                console.log("start1:"); 
                console.log(data); 
                videoUrl = data.formats[0].url;
                console.log(videoUrl)
                videoPlayer.src=videoUrl;
                videoController.load();
                videoController.play();
                playPauseBtn.innerHTML=pauseIcon;
            } else {
                console.log("Failed to fetch music data.");
            }
        });
    
};
 async function relatedDisplay(relatedid) {
    songProgress.value=0;
    document.getElementById('related').innerHTML='';
       const relatedlist= await relatedContent(relatedid);

                // console.log("songImage: "+songImage);
           relatedlist.forEach(data => {    
                    const newSongImage=data.thumbnail;
                    const newSongName=data.title;
                    const newSongOtherDetails=data.author;

                    const newListItem = document.createElement("li");
                    newListItem.id="newListItem";
                    newListItem.classList.add("position-relative");
                    const songListDetailsDiv=document.createElement("div");
                    songListDetailsDiv.id="songListDetailsDiv";
                    songListDetailsDiv.classList.add("d-flex", "flex-row", "flex-wrap", "align-items-center", "justify-content-center", "m-0", "p-2");
                    songListDetailsDiv.style.color="white";

                    const songListImage = document.createElement("img");
                    songListImage.id = "songListImage";
                    songListImage.classList.add("me-3");
                    songListImage.alt = "songListImage";
                    songListImage.style.height='40px';
                    songListImage.style.borderRadius='2px';
                    songListImage.src=newSongImage;
                    songListDetailsDiv.appendChild(songListImage);

                    const songListTextDetails = document.createElement("div");
                    songListTextDetails.id = "songListTextDetails";
                    songListTextDetails.classList.add("d-flex", "flex-column", "flex-wrap", "p-0", "m-0", "me-2");
                    songListDetailsDiv.appendChild(songListTextDetails);

                    const songListName = document.createElement("label");
                    songListName.id = "songListName";
                    songListName.innerHTML=newSongName;
                    songListTextDetails.appendChild(songListName);

                    const songListOtherDetails = document.createElement("label");
                    songListOtherDetails.id = "songListOtherDetails";
                    songListOtherDetails.innerHTML=newSongOtherDetails;
                    songListTextDetails.appendChild(songListOtherDetails);
                    newListItem.appendChild(songListDetailsDiv);
                    const playPauseOverlay=document.createElement("div");
                    playPauseOverlay.id="playPauseOverlay";
                    playPauseOverlay.innerHTML=playIcon;
                    newListItem.appendChild(playPauseOverlay);
                
                    document.getElementById("related").appendChild(newListItem);

                    newListItem.addEventListener('mouseenter',()=>{
                        newListItem.style.backgroundColor='grey';
                        playPauseOverlay.style.opacity='1'
                        newListItem.style.cursor='pointer'
                    })
                    newListItem.addEventListener('mouseleave',()=>{
                        newListItem.style.backgroundColor='';
                        playPauseOverlay.style.opacity=''
                        newListItem.style.cursor=''
                    })
                    playPauseOverlay.addEventListener('click',()=>{
                        console.log("related:"+data.videoId)
                        songId=data.videoId;
                        startMusic();

                    });
                });

};

popUpBtn.addEventListener('click', () => {
    if (popUpDiv.classList.contains('show')) {
        hidePopUp();
        popUpBtn.innerHTML = popUpIcon;
    } else {
        showPopUp();
        popUpBtn.innerHTML = popDownIcon;
    }
});


// Update song data and video
async function updateSongData(data)
 {
    console.log(data)
    const songItem = data.nextItems[nextClickCounter];
    songImage = songItem.thumbnail;
    songName_ = songItem.title;
    songArtist = songItem.author;
    songDuration = songItem.duration;
    let newSongId = songItem.videoId;
    playerSongImage.src = songImage;
    songName.innerHTML = songName_;
    songOtherDetails.innerHTML = `${songArtist} ${circleIcon} ${songDuration}`;
    popUpImage.src = songImage;
     fetchVideo(newSongId).then(videoData => {
        if (videoData) {
            console.log("next:"+newSongId);
            videoUrl = videoData.formats[0].url;
            videoController.src = videoUrl;
            videoController.load();
            videoController.play();
            playPauseBtn.style.color = 'white';
            playPauseBtn.innerHTML = pauseIcon;

        } else {
            console.log("Failed to fetch video data.");
        }
    });
}

// Event listener for next song button
nextSongBtn.addEventListener('click', () => {
    nextClickCounter++;
    updateSongData(musicData);
    console.log("next")
});

// Event listener for previous song button
previousSongBtn.addEventListener('click', () => {
    nextClickCounter--;
    updateSongData(musicData);
});

playPauseBtn.addEventListener("click", togglePlayPause);

function togglePlayPause() {
    playPauseBtn.style.color = 'white';
    if (videoController.paused) {
        videoController.play();

        playPauseBtn.innerHTML = pauseIcon;
    } else {
        videoController.pause();
        playPauseBtn.innerHTML = playIcon;
    }
}

videoController.addEventListener("timeupdate", function () {
    const value = (100 / videoController.duration) * videoController.currentTime;
    songProgress.value = value;
    currentTime.textContent = formatTime(videoController.currentTime);
});

songProgress.addEventListener("input", function () {
    const time = videoController.duration * (songProgress.value / 100);
    videoController.currentTime = time;
});

muteButton.addEventListener("click", function () {
    videoController.muted = !videoController.muted;
    if (videoController.muted) {
        muteIcon.style.display = "none";
        unmuteIcon.style.display = "inline";
    } else {
        muteIcon.style.display = "inline";
        unmuteIcon.style.display = "none";
    }
});

volumeControl.addEventListener("input", function () {
    videoController.volume = this.value;
});
videoController.addEventListener('ended', () => {
    // Check if looping is enabled
    if (!videoController.loop) {
        // Play the next song
        nextClickCounter++;
        updateSongData(musicData);
    }
});
fullscreenButton.addEventListener("click", function () {
    var videoTab = new bootstrap.Tab(document.querySelector('#video-tab'));
    videoTab.show();
    if (videoController.requestFullscreen) {
        popUpDiv.style.visibility='visible';
        popUpBtn.innerHTML=popDownIcon;
        videoController.requestFullscreen();
    } else if (videoController.mozRequestFullScreen) { // Firefox
        videoController.mozRequestFullScreen();
    } else if (videoController.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoController.webkitRequestFullscreen();
    } else if (videoController.msRequestFullscreen) { // IE/Edge
        videoController.msRequestFullscreen();
    }
});
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
// Pop-up button click event
loopButton.addEventListener('click', () => {
    if (videoController.loop) {
        // Disable looping
        videoController.loop = false;
        loopButton.style.color = 'white'; // or any other color to indicate loop is off
    } else {
        // Enable looping
        videoController.loop = true;
        loopButton.style.color = 'red'; // or any other color to indicate loop is on
    }
});

function showPopUp() {
    const popUpDiv = document.getElementById('popUpDiv');
    popUpDiv.classList.add('show');
}
function hidePopUp() {
    const popUpDiv = document.getElementById('popUpDiv');
    popUpDiv.classList.remove('show');
}

document.addEventListener("DOMContentLoaded", function () {
    songId=localStorage.getItem('playsong');
    if(songId===null){
        songId ='Xa41fcCOoRo';
    }     
     startMusic();
}); 
document.getElementById('home').addEventListener('click', function () {
    window.location.href = '../pages/HomePage.html';
});

// Function to toggle PiP mode
function togglePiP() {
    const videoElement = document.getElementById('videoController'); // Corrected id here

    if (document.pictureInPictureElement) {
        document.exitPictureInPicture()
            .catch(error => {
                console.error('Error exiting PiP:', error);
            });
    } else {
        videoElement.requestPictureInPicture()
            .catch(error => {
                console.error('Error entering PiP:', error);
            });
    }
}

// Function to update PiP button visibility
function updatePiPButtonVisibility() {
    const pipButton = document.getElementById('pipButton');
    pipButton.style.display = (document.pictureInPictureEnabled) ? 'block' : 'none';
}

// Check if the browser supports PiP
if ('pictureInPictureEnabled' in document) {
    // Show PiP button
    updatePiPButtonVisibility();

    // Add click event listener to the PiP button
    const pipButton = document.getElementById('pipButton');
    pipButton.addEventListener('click', () => {
        togglePiP();
    });

    // Update PiP button visibility on page load
    updatePiPButtonVisibility();

    // Listen for changes in PiP status and update button visibility
    document.addEventListener('enterpictureinpicture', () => {
        updatePiPButtonVisibility();
        localStorage.setItem('pipStatus', 'true'); // Store PiP status
    });

    document.addEventListener('leavepictureinpicture', () => {
        updatePiPButtonVisibility();
        localStorage.setItem('pipStatus', 'false'); // Store PiP status
    });

    // Check PiP status on page load and enter PiP if previously active
    const pipStatus = localStorage.getItem('pipStatus');
    if (pipStatus === 'true') {
        togglePiP();
    }
}
document
  .getElementById("search-bar")
  .addEventListener("keydown", function (event) {
    let search = document.getElementById("search-bar").value;
    if (event.key === "Enter") {
      localStorage.setItem("searchTerm", search);
      window.location.href = "../pages/search.html";
    }
  });
