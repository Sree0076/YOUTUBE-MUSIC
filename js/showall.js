
const showmodal =()=>{
    var settingsmodal = document.getElementById("modaalonshowall");
    if(settingsmodal.style.display == "none"){
        settingsmodal.style.display ="block";
    }
    else{
        settingsmodal.style.display ="none";
    }
}



const showSidebar=()=>{
    // document.getElementById("#sidebar").style.backgroundColor = "black"
    document.querySelector("#sidebar").classList.toggle("expand");
    
}


const hamBurger = document.querySelector(".toggle-btn");
hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


    document.addEventListener('scroll', function () {
        var sidebar = document.getElementById('sidebar');
        var rightnav = document.querySelector('.rightnav');

        if (window.scrollY > 50) { // Change this value to adjust when the color change should happen
            sidebar.classList.add('scrolled');
            rightnav.classList.add('scrolled');
        } else {
            sidebar.classList.remove('scrolled');
            rightnav.classList.remove('scrolled');
        }
    });

async function fetchMusicData(search) {
    let url = 'https://youtube-music-api3.p.rapidapi.com/search?';
    if (search) {
        url += `&q=${search}&type=song`;
    }
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '33c431b604msh6e6d5181f112eeep19ae7cjsnf5c1fdd3ef0b',
            'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
        }
    };
 
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.result)
        return result.result;
    } catch (error) {
        console.error(error);
    }
}


async function createmoreMusicCards(search) {
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

createmoreMusicCards("jack harlow")


function createCardElement(song) {

    const moregrid = document.getElementById('moregrid');
    const col = document.createElement('div');
    col.className = "col-md-2 col-sm-4 moregrid-item"; // Use col-md-2 for 6 items per row and col-sm-4 for responsiveness

    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'thumbnail-container';

    const thumbnail = document.createElement('img');
    thumbnail.className = 'card-img-top';
    thumbnail.src = `${song.thumbnail}`;
    thumbnail.alt = `${song.title}`;

    const playIcon = document.createElement('i');
    playIcon.classList.add('fa', 'fa-solid', 'fa-play', 'bi', 'bi-play-circle-fill', 'fa-2x', 'play-icon');
    playIcon.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
        // Add more logic here to handle the click event if needed
    });

    thumbnailContainer.appendChild(thumbnail);
    thumbnailContainer.appendChild(playIcon);

    col.innerHTML = `
        <div class="card" style="width: 100%;">
            <div class="card-body d-flex align-items-start">
                ${thumbnailContainer.outerHTML}
                <div>
                    <h5 class="card-title">${song.title}</h5>
                    <p class="card-text">${song.author}</p>
                </div>
            </div>
        </div>
    `;

    moregrid.appendChild(col);
}

