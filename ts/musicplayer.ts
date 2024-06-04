// Constants for API
const YT_MUSIC_API_KEY = 'fe560ddabcmsh313fd0df97b8f8ep1110a8jsn5714c2168418';
const YT_MUSIC_API_HOST = 'youtube-music-api3.p.rapidapi.com';
const YT_VIDEO_API_HOST = 'yt-api.p.rapidapi.com';

// Elements
const playPauseBtn = document.getElementById('playPauseBtn') as HTMLButtonElement;
const playIcon = '<i class="fas fa-play"></i>';
const pauseIcon = '<i class="fas fa-pause"></i>';
const fullscreenButton = document.getElementById("fullscreenButton") as HTMLButtonElement;
const songProgress = document.getElementById('songProgress') as HTMLInputElement;
const currentTime = document.getElementById('selectedSongTime') as HTMLElement;
const muteButton = document.getElementById("muteButton") as HTMLButtonElement;
const muteIcon = document.getElementById("muteIcon") as HTMLElement;
const unmuteIcon = document.getElementById("unmuteIcon") as HTMLElement;
const volumeControl = document.getElementById('volumeControl') as HTMLInputElement;
const popUpBtn = document.getElementById('popUpBtn') as HTMLButtonElement;
const popUpDiv = document.getElementById('popUpDiv') as HTMLElement;
const circleIcon = '<i class="fas fa-circle fa-xs"></i>';
const popUpIcon = '<i class="fas fa-caret-up"></i>';
const popDownIcon = '<i class="fas fa-caret-down"></i>';
const popUpImage = document.getElementById('popUpImage') as HTMLImageElement;
const nextSongBtn = document.getElementById('nextSongBtn') as HTMLButtonElement;
const previousSongBtn = document.getElementById('previousSongBtn') as HTMLButtonElement;
const videoController = document.getElementById('videoController') as HTMLVideoElement;
const loopButton = document.getElementById('loop-button') as HTMLButtonElement;
const songLists = document.getElementById('songList') as HTMLUListElement;
const songOtherDetails = document.getElementById('songOtherDetails') as HTMLElement;
const songName = document.getElementById('songName') as HTMLElement;
const pipButton = document.getElementById('pipButton') as HTMLButtonElement;
const searchBar = document.getElementById('search-bar') as HTMLInputElement;
const homeButton = document.getElementById('home') as HTMLButtonElement;
const playerSongImage = document.getElementById('playerSongImage') as HTMLImageElement;

// Variables
let songId: string = '';
let musicData: any;
let videoData: any;
let isPlaying: boolean = true;
let songImage: string;
let songName_: string;
let songArtist: string;
let songDuration: string;
let nextClickCounter: number = 0;
let videoUrl: string;

// Navbar code
const hamBurger2 = document.querySelector(".toggle-btn") as HTMLElement;
hamBurger2.addEventListener("click", () => {
    document.querySelector("#sidebar")?.classList.toggle("expand");
});

// Fetch music data
async function fetchMusicData(songId: string): Promise<any> {
    const url = `https://youtube-music-api3.p.rapidapi.com/v2/next?id=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': YT_MUSIC_API_KEY,
            'x-rapidapi-host': YT_MUSIC_API_HOST,
        }
    };
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Fetch video data
async function fetchVideo(songId: string): Promise<any> {
    const url = `https://yt-api.p.rapidapi.com/dl?id=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': YT_MUSIC_API_KEY,
            'x-rapidapi-host': YT_VIDEO_API_HOST,
        }
    };
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Fetch related content
async function relatedContent(relatedId: string): Promise<any> {
    const url = `https://youtube-music-api3.p.rapidapi.com/related?id=${relatedId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': YT_MUSIC_API_KEY,
            'x-rapidapi-host': YT_MUSIC_API_HOST,
        }
    };
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Start music
async function startMusic(): Promise<void> {
    songProgress.value = "0";
    songLists.innerHTML = '';
    musicData = await fetchMusicData(songId);
    if (musicData) {
        relatedDisplay(musicData.relatedBrowseId);
        updateSongData(0);
        populateSongList();
        playCurrentVideo();
    } else {
        console.log("Failed to fetch music data.");
    }
}

// Display related content
async function relatedDisplay(relatedId: string): Promise<void> {
    songProgress.value = "0";
    document.getElementById('related')!.innerHTML = '';
    const relatedList = await relatedContent(relatedId);
    if (relatedList) {
        relatedList.forEach((data: any) => {
            const newListItem = createSongListItem(data, 'related');
            document.getElementById("related")?.appendChild(newListItem);
        });
    }
}

// Create song list item
function createSongListItem(data: any, listType: string): HTMLLIElement {
    const newListItem = document.createElement("li");
    newListItem.id = "newListItem";
    newListItem.classList.add("position-relative");

    const songListDetailsDiv = document.createElement("div");
    songListDetailsDiv.id = "songListDetailsDiv";
    songListDetailsDiv.classList.add("d-flex", "flex-row", "flex-wrap", "align-items-center", "justify-content-center", "m-0", "p-2");
    songListDetailsDiv.style.color = "white";

    const songListImage = document.createElement("img");
    songListImage.id = "songListImage";
    songListImage.classList.add("me-3");
    songListImage.alt = "songListImage";
    songListImage.style.height = '40px';
    songListImage.style.borderRadius = '2px';
    songListImage.src = data.thumbnail;
    songListDetailsDiv.appendChild(songListImage);

    const songListTextDetails = document.createElement("div");
    songListTextDetails.id = "songListTextDetails";
    songListTextDetails.classList.add("d-flex", "flex-column", "flex-wrap", "p-0", "m-0", "me-2");
    songListDetailsDiv.appendChild(songListTextDetails);

    const songListName = document.createElement("label");
    songListName.id = "songListName";
    songListName.innerHTML = data.title;
    songListTextDetails.appendChild(songListName);

    const songListOtherDetails = document.createElement("label");
    songListOtherDetails.id = "songListOtherDetails";
    songListOtherDetails.innerHTML = `${data.author} ${circleIcon} ${data.duration}`;
    songListTextDetails.appendChild(songListOtherDetails);

    newListItem.appendChild(songListDetailsDiv);
    const playPauseOverlay = document.createElement("div");
    playPauseOverlay.id = "playPauseOverlay";
    playPauseOverlay.innerHTML = playIcon;
    newListItem.appendChild(playPauseOverlay);

    newListItem.addEventListener('mouseenter', () => {
        newListItem.style.backgroundColor = 'grey';
        playPauseOverlay.style.opacity = '1';
        newListItem.style.cursor = 'pointer';
    });
    newListItem.addEventListener('mouseleave', () => {
        newListItem.style.backgroundColor = '';
        playPauseOverlay.style.opacity = '';
        newListItem.style.cursor = '';
    });
    playPauseOverlay.addEventListener('click', () => {
        songId = data.videoId;
        startMusic();
    });

    return newListItem;
}

// Populate song list
function populateSongList(): void {
    for (let i = 0; i < 50; i++) {
        const data = musicData.nextItems[i];
        const newListItem = createSongListItem(data, 'next');
        songLists.appendChild(newListItem);
    }
}

// Play current video
async function playCurrentVideo(): Promise<void> {
    videoData = await fetchVideo(songId);
    if (videoData) {
        videoUrl = videoData.formats[0].url;
        videoController.src = videoUrl;
        videoController.load();
        videoController.play();
        playPauseBtn.innerHTML = pauseIcon;
    } else {
        console.log("Failed to fetch video data.");
    }
}

// Update song data
async function updateSongData(index: number): Promise<void> {
    const songItem = musicData.nextItems[index];
    songImage = songItem.thumbnail;
    songName_ = songItem.title;
    songArtist = songItem.author;
    songDuration = songItem.duration;

    songName.innerHTML = songName_;
    playerSongImage.src = songImage;
    songOtherDetails.innerHTML = `${songArtist} ${circleIcon} ${songDuration}`;
}

// Event listeners
playPauseBtn.addEventListener('click', () => {
    if (videoController.paused) {
        videoController.play();
        playPauseBtn.innerHTML = pauseIcon;
    } else {
        videoController.pause();
        playPauseBtn.innerHTML = playIcon;
    }
});

// Initialize player
document.addEventListener('DOMContentLoaded', () => {
    songId = '5qap5aO4i9A';
    startMusic();
});
