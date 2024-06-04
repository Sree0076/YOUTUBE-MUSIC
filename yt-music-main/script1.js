document.addEventListener("DOMContentLoaded", function () {
    const videoPlayer = document.getElementById("videoPlayer");
    const playPauseButton = document.getElementById("playPauseButton");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");
    const progressBar = document.getElementById("progressBar");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");
    const muteButton = document.getElementById("muteButton");
    const muteIcon = document.getElementById("muteIcon");
    const unmuteIcon = document.getElementById("unmuteIcon");
    const volumeControl = document.getElementById("volumeControl");
    const fullscreenButton = document.getElementById("fullscreenButton");
    const downloadButton = document.getElementById("downloadButton");
    const pipButton = document.getElementById("pipButton");
     let title="";

    customImageButton.addEventListener("click", function () {
        // Toggle the display property of the video player
        videoPlayer.style.display = videoPlayer.style.display === "none" ? "block" : "none";
    });




    async function getMusic(audioid) {
        let url = 'https://yt-api.p.rapidapi.com/dl?id=';
        if (audioid) {
            url += `${audioid}`;
        }
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7a6694efccmshbf3595fdaf4c2fep1ac0e1jsn8225601fbcde',
                'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const videoUrl = result.formats[0].url;
            document.getElementById("videoSource").src = videoUrl;
            videoPlayer.load();
            title=result.title;
          
        } catch (error) {
            console.error(error);
        }
    }

    async function getMusicData() {
        await getMusic('Xa41fcCOoRo');
    }

    getMusicData();

    playPauseButton.addEventListener("click", function () {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playIcon.style.display = "none";
            pauseIcon.style.display = "inline";
        } else {
            videoPlayer.pause();
            playIcon.style.display = "inline";
            pauseIcon.style.display = "none";
        }
    });

    videoPlayer.addEventListener("timeupdate", function () {
        const value = (100 / videoPlayer.duration) * videoPlayer.currentTime;
        progressBar.value = value;
        currentTime.textContent = formatTime(videoPlayer.currentTime);
    });

    videoPlayer.addEventListener("loadedmetadata", function () {
        duration.textContent = formatTime(videoPlayer.duration);
    });

    progressBar.addEventListener("input", function () {
        const time = videoPlayer.duration * (progressBar.value / 100);
        videoPlayer.currentTime = time;
    });

    muteButton.addEventListener("click", function () {
        videoPlayer.muted = !videoPlayer.muted;
        if (videoPlayer.muted) {
            muteIcon.style.display = "none";
            unmuteIcon.style.display = "inline";
        } else {
            muteIcon.style.display = "inline";
            unmuteIcon.style.display = "none";
        }
    });

    volumeControl.addEventListener("input", function () {
        videoPlayer.volume = this.value;
    });

    fullscreenButton.addEventListener("click", function () {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.mozRequestFullScreen) { // Firefox
            videoPlayer.mozRequestFullScreen();
        } else if (videoPlayer.webkitRequestFullscreen) { // Chrome, Safari and Opera
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) { // IE/Edge
            videoPlayer.msRequestFullscreen();
        }
    });

    pipButton.addEventListener("click", function () {
        if (videoPlayer !== document.pictureInPictureElement) {
            videoPlayer.requestPictureInPicture()
                .catch(error => {
                    console.error('Error entering PiP mode: ', error);
                });
        } else {
            document.exitPictureInPicture()
                .catch(error => {
                    console.error('Error exiting PiP mode: ', error);
                });
        }
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    function saveVideo() {
        // Get the video URL
        const videoUrl = videoPlayer.src;

        // Create a temporary anchor element
        const a = document.createElement("a");
        a.href = videoUrl;
        a.download = title+".mp4"; // Set the filename

        // Append the anchor to the document body and trigger a click event
        document.body.appendChild(a);
        a.click();

        // Remove the temporary anchor
        document.body.removeChild(a);
    }

    // Event listener for the download button
    downloadButton.addEventListener("click", saveVideo);
});
