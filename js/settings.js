
let globalButton = '';


function closePopUp(){
    document.getElementById('pop-up').style.display="none";
    window.location.href='../pages/HomePage.html';
}

function openPopUp(){
    document.getElementById('pop-up').style.display="block";
}

function closeSmallPopUp(){
    document.getElementById('small--pop-up').style.display="none";
}

function openSmallPopUp(){
    document.getElementById('small--pop-up').style.display="block";
}

function cancel(){
    openPopUp();
    closeSmallPopUp();
}

function clearDownloads(){
    //....
    cancel();
}

function clearWatchHistory(){
    //....
    cancel();
}

function clearSearchHistory(){
    //....
    cancel();
}

function turnOnOrOffWatchHistory(){
    if(localStorage.getItem('pauseWatchHistory') == 1){
        localStorage.setItem('pauseWatchHistory',0);
    }
    else{
        localStorage.setItem('pauseWatchHistory',1);
    }
    setToggleValueForSensitive(globalButton);
    cancel();
}

function turnOnOrOffSearchHistory(){
    if(localStorage.getItem('pauseSearchHistory') == 1){
        localStorage.setItem('pauseSearchHistory',0);
    }
    else{
        localStorage.setItem('pauseSearchHistory',1);
    }
    setToggleValueForSensitive(globalButton);
    cancel();
}


//for local storage
function enablePublicStates(){

    localStorage.setItem('enablePublicStatus',1);
    setToggleValueForSensitive(globalButton);
    cancel();
}

function setUser(arg){
    localStorage.setItem('userName',arg);
}

function setGmailId(arg){
    localStorage.setItem('gmailId',arg);
}

function setLocation(arg){
    localStorage.setItem('location',arg);
}

function setLanguage(arg){
    localStorage.setItem('language',arg);
}

function setAudioQuality(arg){
    localStorage.setItem('audioQuality',arg);
}

function setEnablePublicStats(arg){
    localStorage.setItem('enablePublicStatus',arg);
}

function setRestrictedMode(arg){
    localStorage.setItem('restrictedMode',arg);
}

function setShowVideos(arg){
    localStorage.setItem('showVideos',arg);
}
function setRememberMost(arg){
    localStorage.setItem('rememberMost',arg);
}

function setDynamicQueue(arg){
    localStorage.setItem('dynamicQueue',arg);
}

function setPauseWatchHistory(arg){
    localStorage.setItem('pauseWatchHistory',arg);
}

function setPauseSearchHistory(arg){
    localStorage.setItem('pauseSearchHistory',arg);
}

//for local storage code ended

function changeAudioQuality(){
    let audioQuality = document.getElementById('select-audio-quality').value;
    setAudioQuality(audioQuality);
    console.log(audioQuality);
    //api
}

function loadAudioQuality(){
    let audioQuality = document.getElementById('select-audio-quality');
    let audioQualityList = ['normal','high','low'];
    for(let index=0;index<3;index++){
        if(audioQualityList[index] === localStorage.getItem('audioQuality')){
            audioQuality.querySelector('#s'+index).selected = true;
        }
        else{
            audioQuality.querySelector('#s'+index).selected = false;
        }
    }
}

function changeLocation(){
    let location = document.getElementById('select-location').value;
    //alert(location);
    setLocation(location);
    console.log(location);
    //api
}

function loadLocation(){
    let location = document.getElementById('select-location');
    let locationList = ['india','usa','uae','uk','russia'];
    for(let index=0;index<5;index++){
        if(locationList[index] === localStorage.getItem('location')){
            location.querySelector('#s'+index).selected = true;
        }
        else{
            location.querySelector('#s'+index).selected = false;
        }
    }
}

function changeLanguage(){
    let language = document.getElementById('select-language').value;
    //alert(language);
    setLanguage(language);
    console.log(language);
    //api
}

function loadLanguage(){
    let language = document.getElementById('select-language');
    let languageList = ['english','hindi','malayalam','arabic','russian'];
    for(let index=0;index<5;index++){
        if(languageList[index] === localStorage.getItem('language')){
            language.querySelector('#s'+index).selected = true;
        }
        else{
            language.querySelector('#s'+index).selected = false;
        }
    }
}

function loadOptionSelection(){
    loadAudioQuality();
    loadLocation();
    loadLanguage();
}

const setLocalStorage=(()=>{
    if(localStorage.getItem('start') == '1'){return 0;}
    localStorage.setItem('start','1');
    
    //api from firebase
    setUser('Ram Kumar');
    setGmailId('ramkumar@gmail.com');
    setLocation('india');
    setLanguage('hindi');
    setAudioQuality('low');
    setEnablePublicStats(0);
    setRestrictedMode(0);
    setShowVideos(0);
    setRememberMost(0);
    setDynamicQueue(0);
    setPauseWatchHistory(0);
    setPauseSearchHistory(0);
});

function setFBStorage(key,data){
    if(key === 'location'){
        //set to fb api

    }
    else if(key === 'language'){
        //set to fb api
    
    }
}


function doNotShowSettings(div_id){
    document.getElementById('settings-general').style.display="none";
    document.getElementById('settings-playback').style.display="none";
    document.getElementById('settings-downloads').style.display="none";
    document.getElementById('settings-privacy').style.display="none";
    document.getElementById('settings-channel').style.display="none";
    document.getElementById('settings-recommendation').style.display="none";
    document.getElementById('settings-language-and-location').style.display="none";
    document.getElementById('settings-about').style.display="none";

    document.getElementById(div_id).style.display="block";

}

function divOptionClicked(div_id){

    document.getElementById('general').className = "div--option";
    document.getElementById('playback').className = "div--option";
    document.getElementById('download').className = "div--option";
    document.getElementById('privacy').className = "div--option";
    document.getElementById('channel').className = "div--option";
    document.getElementById('recommendation').className = "div--option";
    document.getElementById('languageAndLocation').className = "div--option";
    document.getElementById('about').className = "div--option";    

    document.getElementById(div_id).className = "div--option div--option--clicked";
}

function general(){
    doNotShowSettings('settings-general');
    divOptionClicked('general');
}

function playback(){
    doNotShowSettings('settings-playback');
    divOptionClicked('playback');
}

function download(){
    doNotShowSettings('settings-downloads');
    divOptionClicked('download');
}

function privacy(){
    doNotShowSettings('settings-privacy');
    divOptionClicked('privacy');
}

function channel(){
    doNotShowSettings('settings-channel');
    divOptionClicked('channel');
}

function recommendation(){
    doNotShowSettings('settings-recommendation');
    divOptionClicked('recommendation');
}

function languageAndLocation(){
    doNotShowSettings('settings-language-and-location');
    divOptionClicked('languageAndLocation');
}

function about(){
    doNotShowSettings('settings-about');
    divOptionClicked('about');
}

function showSmallPopUp(settings_option){

    let display = "";
    document.getElementById('pop-up').style.display="none";
    openSmallPopUp();

    if(settings_option === 'clear_downloads'){

        display = `
            <div>
                <div>
                    <h6 class="text-white">Clear downloads</h6>
                </div>
                <div>
                    <p class="description">All downloads will be deleted from this device.</p>
                </div>
                </br>
                <div>
                    <button class="button text--white" onclick="cancel()">Cancel</button>
                    <button class="button text--blue" onclick="clearDownloads()">Remove</button>
                </div>
            </div>  
            `;
        
    }
    else if(settings_option === 'clear_watch_history'){

        display = `
            <div>
                <div>
                    <h6 class="text-white">Clear watch history?</h6>
                </div>
                <div>
                    <p class="text-white">${localStorage.getItem('userName')} (${localStorage.getItem('gmailId')})</p>
                    <p class="description">Your YouTube watch history will be cleared from all YouTube apps on all devices.</p>
                    </br>
                    <p class="description">Your video recommendations will be reset, but may still be influenced by activity on other Google products. To learn more, visit My Activity.</p>
                </div>
                </br>
                <div>
                    <button class="button text--white" onclick="cancel()">Cancel</button>
                    <button class="button text--blue" onclick="clearWatchHistory()">CLEAR WATCH HISTORY</button>
                </div>
            </div>  
            `;

    }
    else if(settings_option === 'clear_search_history'){

        display = `
            <div>
                <div>
                    <h6 class="text-white">Clear search history?</h6>
                </div>
                <div>
                <p class="text-white">${localStorage.getItem('userName')} (${localStorage.getItem('gmailId')})</p>
                    <p class="description">Your YouTube search history will be cleared from all YouTube apps on all devices.</p>
                    </br>
                    <p class="description">Your video recommendations will be reset, but may still be influenced by activity on other Google products. To learn more, visit My Activity.</p>
                </div>
                </br>
                <div>
                    <button class="button text--white" onclick="cancel()">Cancel</button>
                    <button class="button text--blue" onclick="clearSearchHistory()">CLEAR SEARCH HISTORY</button>
                </div>
            </div>  
            `;

    }
    else if(settings_option === 'pauseWatchHistory'){
        let turnOnOrOff;
        if(localStorage.getItem('pauseWatchHistory') == 1){
            turnOnOrOff = "PAUSE";
        }
        else{
            turnOnOrOff = "TURN ON";
        }
        display = `
            <div>
                <div>
                    <h6 class="text-white">Pause watch history?</h6>
                </div>
                <div>
                <p class="text-white">${localStorage.getItem('userName')} (${localStorage.getItem('gmailId')})</p>
                    <p class="description">Pausing YouTube Watch History can make it harder to find videos that you have watched and you may see fewer recommendations for new videos in YouTube and other Google products.</p>
                    </br>
                    <p class="description">Remember, pausing this setting doesn't delete any previous activity but you can view, edit and delete your private YouTube Watch History data at any time. When you pause and clear your watch history, YouTube features that rely on history to personalise your experience are disabled.</p>
                </div>
                </br>
                <div>
                    <button class="button text--white" onclick="cancel()">Cancel</button>
                    <button class="button text--blue" onclick="turnOnOrOffWatchHistory()">${turnOnOrOff}</button>
                </div>
            </div>  
            `;

    }
    else if(settings_option === 'pauseSearchHistory'){
        let turnOnOrOff;
        if(localStorage.getItem('pauseSearchHistory') == 1){
            turnOnOrOff = "PAUSE";
        }
        else{
            turnOnOrOff = "TURN ON";
        }
        display = `
            <div>
                <div>
                    <h6 class="text-white">Pause search history?</h6>
                </div>
                <div>
                <p class="text-white">${localStorage.getItem('userName')} (${localStorage.getItem('gmailId')})</p>
                    <p class="description">Pausing YouTube search history means that future searches will not appear in your search history and will not be used to provide improved recommendations.</p>
                    </br>
                    <p class="description">Remember, pausing this setting doesn't delete any previous activity, but you can view, edit and delete your private YouTube search history data at any time.</p>
                </div>
                </br>
                <div>
                    <button class="button text--white" onclick="cancel()">Cancel</button>
                    <button class="button text--blue" onclick="turnOnOrOffSearchHistory()">${turnOnOrOff}</button>
                </div>
            </div>  
            `;

    }
    else if(settings_option === 'enablePublicStats'){
       
        display = `
            <div>
                <div>
                    <h6 class="text-white">Public stats</h6>
                </div>
                <div>
                    <p class="description">Remember that anyone can see public stats.</br>You can disable them at any time in your channel settings.</p>
                    </br>
                    <p class="description">By enabling public stats, you permit us to use your watch history across all YouTube services to display stats about the content that you've consumed recently. New stats that we introduce in the future will be turned off by default.</p>
                    </br>
                    <p class="description">You can view and edit your watch history at any time.</p>
                    </br>
                    <p class="description">Your public stats will be displayed on your channel for up to 2 years. Disabling the setting will remove public stats from your channel. Learn more.</p>
                </div>
                </br>
                <div>
                    <button class="button text--white" onclick="cancel()">Cancel</button>
                    <button class="button text--blue" onclick="enablePublicStates()">ENABLE</button>
                </div>
            </div>  
            `;

    }

    





    document.getElementById('small--pop-up').innerHTML=display;

}

function showSettingsForm(navHeadName){
    document.getElementById('navigation').style.display = "none";
    document.getElementById('settings--form').style.display = "block";
    document.getElementById('back--to--navigation').style.display = "block";

    document.getElementById('nav-head-name').innerHTML = navHeadName;
}
function showNavigation(){
    document.getElementById('navigation').style.display = "block";
    document.getElementById('settings--form').style.display = "none";
    document.getElementById('back--to--navigation').style.display = "none";

    document.getElementById('nav-head-name').innerHTML = "Settings";
}
    

function fetchDataFromLocalStorage(){

    let toggleValue = 1;
    let buttonStyle = "toggleButton f--right";
    let barStyle = "toggleBar bar--bgcolor";
    let button = "";

    if(localStorage.getItem('restrictedMode') == 1){
        button = document.getElementById('toggle--restricted-mode');
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;

    }
    if(localStorage.getItem('showVideos') == 1){
        button = document.getElementById('toggle--liked-music');
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;

    }
    if(localStorage.getItem('rememberMost') == 1){
        button = document.getElementById('toggle--most-used-playlist');
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;

    }
    if(localStorage.getItem('dynamicQueue') == 1){
        button = document.getElementById('toggle--dynamic-queue');
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;

    }
    if(localStorage.getItem('pauseWatchHistory') == 1){
        button = document.getElementById('toggle--pause-watch-history');
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;

    }
    if(localStorage.getItem('pauseSearchHistory') == 1){
        button = document.getElementById('toggle--pause-search-history');
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;

    }
    if(localStorage.getItem('enablePublicStatus') == 1){
        button = document.getElementById('toggle--enable-public-stats');
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;

    }
}


function setToggleAction(toggleAction,toggleValue){

    if(toggleAction === "restrictedMode"){
        console.log("restricted mode ",toggleValue);
        //api
        localStorage.setItem('restrictedMode',toggleValue);
    }
    else if(toggleAction === "showVideos"){
        console.log("show videos ",toggleValue);
        //api
        localStorage.setItem('showVideos',toggleValue);
    }
    else if(toggleAction === "RememberMost"){
        console.log("remember most ",toggleValue);
        //api
        localStorage.setItem('rememberMost',toggleValue);
    }
    else if(toggleAction === "dynamicQueue"){
        console.log("dynamic queue ",toggleValue);
        //api
        localStorage.setItem('dynamicQueue',toggleValue);
    }
    else if(toggleAction === "pauseWatchHistory"){
        console.log("pause watch history ",toggleValue);
        //api
        showSmallPopUp('pauseWatchHistory');
    }
    else if(toggleAction === "pauseSearchHistory"){
        console.log("pause search history ",toggleValue);
        //api
        showSmallPopUp('pauseSearchHistory');
    }
    else if(toggleAction === "enablePublicStatus"){
        console.log("enable public staus ",toggleValue);
        //api
        if(localStorage.getItem('enablePublicStatus') == 0){
            showSmallPopUp('enablePublicStats');
        }
        else{
            localStorage.setItem('enablePublicStatus',0);
            setToggleValueForSensitive(globalButton);
        }
    }
    
}

function setToggleValueForSensitive(button){
    let toggleValue;
    let barStyle;
    let buttonStyle;

    if(button.getElementsByClassName('button')[0].value == 1)
        {
            toggleValue = 0;
            buttonStyle = "toggleButton";
            barStyle = "toggleBar";
        }   
        else if(button.getElementsByClassName('button')[0].value == 0) 
        {
            toggleValue = 1;
            buttonStyle = "toggleButton f--right";
            barStyle = "toggleBar bar--bgcolor";
        }

    button.getElementsByClassName('button')[0].value = toggleValue;
    button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
    button.getElementsByClassName('toggleBar')[0].className = barStyle;
}

function setToggleValue(toggleAction,button){
    let toggleValue;
    let barStyle;
    let buttonStyle;
    if(toggleAction !== 'pauseWatchHistory' && toggleAction !== 'pauseSearchHistory' && toggleAction !== 'enablePublicStatus'){  ///this settings  also have another window to ask change the settings
        if(button.getElementsByClassName('button')[0].value == 1)
            {
                toggleValue = 0;
                buttonStyle = "toggleButton";
                barStyle = "toggleBar";
            }   
            else if(button.getElementsByClassName('button')[0].value == 0) 
            {
                toggleValue = 1;
                buttonStyle = "toggleButton f--right";
                barStyle = "toggleBar bar--bgcolor";
            }
            
        button.getElementsByClassName('button')[0].value = toggleValue;
        button.getElementsByClassName('toggleButton')[0].className = buttonStyle;
        button.getElementsByClassName('toggleBar')[0].className = barStyle;
    }
    else{
        globalButton = button;
        // alert(globalButton + button);
    }
    

    setToggleAction(toggleAction,toggleValue);
}










general(); //Default Settings
showSettingsForm('General'); //Default Settings for responsiveness
closeSmallPopUp(); //Default
setLocalStorage(); //Onloading set local storage
fetchDataFromLocalStorage(); //Previous settings data
loadOptionSelection();//for previous option selection
