/**
 * Function that executes when the user selects the like button
 * 
 * @param: none
 * @return: none
 */
function positiveRating() {
    // Get like/dislike buttons
    let likeBtn = document.getElementById("positiveRating")
    let dislikeBtn = document.getElementById("negativeRating")

    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    // Remove the selection of the like button
    if (likeBtn.innerHTML == `<img src="./css/images/button-designs_17.png" style="height:80%">`) {
        likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%">`

        updateLikeDislike(playlist[currentVideoNum], 'none')
    }
    // Change colour of the like button
    else {
        likeBtn.innerHTML = `<img src="./css/images/button-designs_17.png" style="height:80%">`
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%">`

        updateLikeDislike(playlist[currentVideoNum], 'like')
    }
    
}


/**
 * Function that executes when the user selects the dislike button
 * 
 * @param: none
 * @return: none
 */
function negativeRating() {
    // Get like/dislike buttons
    let likeBtn = document.getElementById("positiveRating")
    let dislikeBtn = document.getElementById("negativeRating")

    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    // Remove selection of the dislike button
    if (dislikeBtn.innerHTML == `<img src="./css/images/button-designs_18.png" style="height:80%">`) {
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%">`

        console.log("Remove dislike")
        updateLikeDislike(playlist[currentVideoNum], 'none')
    }
    // Change colour of the dislike button
    else {
        dislikeBtn.innerHTML = `<img src="./css/images/button-designs_18.png" style="height:80%">`
        likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%">`

        console.log("Dislike")
        updateLikeDislike(playlist[currentVideoNum], 'dislike')
    }
    
}


/**
 * Function that runs after a new video is displayed to check if favourite, like and dislike icons 
 * should be already selected
 * If it is, the corresponding icon should be coloured to indicate the user has liked/disliked/added to favourites
 * 
 * @param: none
 * @return: none
 */
 function checkLikeDislikeStatus() {
    /* Like and dislike icons check */
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let likeBtn = document.getElementById("positiveRating")
        let dislikeBtn = document.getElementById("negativeRating")

        let ss = snapshot.val();
        let title = document.getElementById("videoDescription");

        for (let i = 0; i < ss.length; i++) {
            if (title.innerHTML === ss[i]["videoTitle"]) {
                if(ss[i]["like"] === true){
                    likeBtn.innerHTML = `<img src="./css/images/button-designs_17.png" style="height:80%"></img>`
                }
                else if(ss[i]["dislike"] === true){
                    dislikeBtn.innerHTML = `<img src="./css/images/button-designs_18.png" style="height:80%"></img>`
                }
                else{
                    likeBtn.innerHTML = `<img src="./css/images/button-designs_23.png" style="height:80%"></img>`
                    dislikeBtn.innerHTML = `<img src="./css/images/button-designs_24.png" style="height:80%"></img>`
                }

            }
        }


    })

}

/**
 * Function that executes when the user clicks the favourite button (for adding a video to their favourites list)
 * 
 * @param: none
 * @return: none
 */
function favoriteRating() {
    let current_color = document.getElementById("favoriteIcon").style.color;
    let snackbarContainer = document.querySelector('#messagePopUp');
    let data = null;
    let playlist = JSON.parse(localStorage.getItem("playlist"));
    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    if (current_color == "red") {
        document.getElementById("favoriteIcon").style.color = "black";
        data = { message: 'Removed from Favourite Videos' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        removeFromFavourite(playlist[currentVideoNum].videoUrl);

        let btn = document.getElementById("favoriteIcon");
        btn.innerHTML = `<img src="./css/images/button-designs_25.png" style="height:80%"></img>`

    } else {
        document.getElementById("favoriteIcon").style.color = "red";
        data = { message: 'Added to Favourite Videos' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
        addToFavourite(playlist[currentVideoNum]);

        let btn = document.getElementById("favoriteIcon");
        btn.innerHTML = `<img src="./css/images/button-designs_28.png" style="height:80%"></img>`
    }
}

/**
 * Function to add a video to favourites and storing data on how many times each video has 
 * been favourited cumulatively into Firebase
 * 
 * @param currentVideoInfo: data of the video that is currently shown
 * @return: none
 */
function addToFavourite(currentVideoInfo) {
    let current_user = JSON.parse(localStorage.getItem("USER"));  // get user details from local storage
    let currentVideo = {
        videoUrl: currentVideoInfo.videoUrl,
        videoThumbnail: currentVideoInfo.videoThumbnail,
        videoTitle: currentVideoInfo.title,
        interest: currentVideoInfo.interest,
        postId: currentVideoInfo.postId
    }
    
    // Get video id from the embed url
    let videoUrlEnd = currentVideo.videoUrl.split("https://www.youtube.com/embed/");
    videoUrlEnd = videoUrlEnd[1];


    let time = Date.now();

    // Retrieves the currently list of favourites
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite/`).once("value", function (snapshot) {
        let currentFavourites = []
        let videoExist = false

        // If favourite is not empty and video already exists, set videoExist to true
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            for (i in currentFavourites) {
                if (currentFavourites[i].videoUrl == currentVideoInfo.videoUrl) {
                    videoExist = true;
                }
            }
        }

        // Add video url to favourite only if video doesn't exist
        if (videoExist != true) {
            currentFavourites.push(currentVideo);
            updateFirebase(currentFavourites, current_user, 'videoFavourite');
        }
    })
    
    // Storing data on how many times each video has been favourited, cumulatively into Firebase
    //current_user["time"] = time;
    firebase.database().ref('recommenderData').child(`favourite/`).once("value", function (snapshot) {
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            // If the video has previously been favourited
            if (currentFavourites[videoUrlEnd] != undefined){
                // If the user has not previously favourited this video
                if (currentFavourites[videoUrlEnd].favouritedUsers[current_user.phone] == undefined){
                    currentFavourites[videoUrlEnd].favouritedAmount += 1;
                    currentFavourites[videoUrlEnd].favouritedUsers[current_user.phone] = current_user;
                }
            }

            // If the video has not been previously favourited
            else{
                let user = {}
                user[current_user.phone] = current_user;
                let newFavourite = {
                    favouritedAmount: 1,
                    preferenceType: currentVideo.videoPreference,
                    favouritedUsers: user
                }

                currentFavourites[videoUrlEnd] = newFavourite;
            }

            // Setting changes on Firebase
            firebase.database().ref('recommenderData/favourite').set(
                currentFavourites
                , function (error) {
                    if (error) {
                        console.log(error)
                    }
                })
        }
    })

    id = currentVideo.videoPreference;
    // Update skill favourited statistics
    firebase.database().ref('recommenderData').child(`skills/`).once("value", function (snapshot) {
        if (snapshot.exists()) {
            currentSkills = snapshot.val();

            // Check if the skill has previously selected/favourited on the database, update if so
            if (currentSkills[id] != undefined){
                if(currentSkills[id].favouritedAmount != undefined){
                    currentSkills[id].favouritedAmount += 1;
                }
                else{
                    currentSkills[id].favouritedAmount = 1;
                }
                
            }
            
            // Else if this is the first time skill is being selected/favourited
            else {
                //let selectedTime = {}
                //selectedTime[time] = time;
                
                let newSkillCombine = {
                    selectedAmount: 0,
                    favouritedAmount: 1,
                    //selectedTime: selectedTime
                }

                currentSkills[id] = newSkillCombine;
            }

            // Update the firebase skills data section with changes
            firebase.database().ref('recommenderData/skills').set(
                currentSkills
                , function (error) {
                    if (error) {
                        console.log(error)
                    }
                })
        }
    })
}


/**
 * Function to check if a video has been favourited before and display the correct icon
 * 
 * @param currentVideoUrl: the embed url of the current video
 * @return: none
 */
function checkFavoriteStatus(currentVideoUrl) {
    let current_user = JSON.parse(localStorage.getItem("USER"));  // get user details from local storage

    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite/`).once('value', function (snapshot) {
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            for (i in currentFavourites) {
                if (currentFavourites[i].videoUrl == currentVideoUrl) {
                    document.getElementById("favoriteIcon").style.color = "red";
                    let btn = document.getElementById("favoriteIcon");
                    btn.innerHTML = `<img src="./css/images/button-designs_28.png" style="height:80%"></img>`
                    break;
                } else {
                    document.getElementById("favoriteIcon").style.color = "black";
                    let btn = document.getElementById("favoriteIcon");
                    btn.innerHTML = `<img src="./css/images/button-designs_25.png" style="height:80%"></img>`
                }
            }
        }
    })
}



/**
 * Function to remove a video from favourites
 * 
 * @param currentVideoUrl: the embed url of the current video
 * @return: none
 */
function removeFromFavourite(currentVideoUrl) {
    let current_user = JSON.parse(localStorage.getItem("USER"));

    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once('value', function (snapshot) {
        if (snapshot.exists()) {
            currentFavourites = snapshot.val();
            for (i in currentFavourites) {
                if (currentFavourites[i].videoUrl == currentVideoUrl) {
                    currentFavourites.splice(i);
                    updateFirebase(currentFavourites, current_user, 'videoFavourite')
                }
            }
        }
    })

}


/**
 * Function to update data of a child path in Firebase
 * 
 * @param video_list: the list of videos based on the current category/skill/preference/etc chosen by the user
 * @param current_user: the current active/logged in user
 * @param child_name: the relative path used in Firebase (e.g. videoHistory)
 * @return: none
 */
function updateFirebase(video_list, current_user, child_name) {
    firebase.database().ref('users').child(`${current_user.phone}`).child(child_name).set(
        video_list
        , function (error) {
            if (error) {
                console.log(error)
            }
        })
}


/**
 * Function to update description based on current video
 * 
 * @param description: the title/description of the video
 * @return: none
 */
function updateDescription(description) {
    document.getElementById('videoDescription').innerHTML = description;
}


/**
 * Function to check if the user has selected a skill/preference prior to going to the recommender_Ui (video player)
 * 
 * @param: none
 * @return: none
 */
function checkForPreference() {
    let current_user = JSON.parse(localStorage.getItem("USER"));  // get user details from local storage 
    let phoneNum = current_user['phone'];
    let stringPath = "users/" + phoneNum;

    firebase.database().ref(stringPath + "/preferences").once('value').then((snapshot) => {
        if (snapshot.exists()) {
            location.href = "recommender_Ui.html"; // redirect to recommender
        }
        else {
            console.log("No data available");
            location.href = "recommender_select_skills.html";   // redirect to skill page (for first time user only)
        }
    }).catch((error) => {
        console.error(error);
    });

}


/**
 * Function to query a playlist of videos based on the chosen skill/preference the user would like to watch
 * 
 * @param: none
 * @return: none
 */
function queryVideosOnPreferences() {
    let current_user = JSON.parse(localStorage.getItem("USER"));   // get user details from local storage 
    let phoneNum = current_user['phone'];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);
    let pref = JSON.parse(localStorage.getItem("preference"));  // store the chosen skill/preference in local storage
    userRef.update({preferences: pref});
    
    if (localStorage.getItem("playlist") == null) {
        makeRequest(pref);
    }
}


/**
 * Function to check if a YouTube link is an embed
 * 
 * @param videoURL: YouTube video url
 * @return: none
 */
function getVideoId(videoURL){
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    videoId = videoURL.match(rx);
    
    return videoId[1];
}


/**
 * Function to get all the videos that fit the selected skill/preference and stores them in local storage
 * 
 * @param preference: the skill/preference chosen by the user at recommender_select_skills.html page
 * @return: none
 */
function makeRequest(preference) {

    firebase.database().ref("posts").once('value').then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach(function(childSnap){  // retrieve each video and its information
                if (childSnap.val().interest[0] == preference && childSnap.val().recommender){
                    let value = childSnap.val();
                    let videoObj = {
                        title: value.title,
                        videoUrl: value.videoURL,
                        videoThumbnail: value.videoThumbnail,
                        videoId: getVideoId(value.videoURL),
                        postId: value.id,
                        interest: value.interest[0]
                    }
                    if (childSnap.val().topVideo){
                        playlist.unshift(videoObj);
                    } else {
                        playlist.push(videoObj);
                    }
                }
            })
            localStorage.setItem("playlist", JSON.stringify(playlist));  // save the list of videos into local storage
            localStorage.setItem("currentVideoNumber", 0);  // set the initial video to be shown
            playVideo();
        }
        else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


/**
 * Function to start the YouTube player
 * 
 * @param: none
 * @return: none
 */
function playVideo() {
    changeShareDetails();  // from share_video.js

    playlist = JSON.parse(localStorage.getItem("playlist"));  // retrieve playlist
    currentVideoNumber = JSON.parse(localStorage.getItem("currentVideoNumber"));  // get the current video the user is at

    // Checks the video's favourite status
    checkFavoriteStatus(playlist[currentVideoNumber].videoUrl);

    // Checks the video's like/dislikes status
    checkLikeDislikeStatus();

    // Loads a new video
    player.loadVideoById(playlist[currentVideoNumber].videoId);
    player.stopVideo();

    // Updates the page's description with the video title
    updateDescription(playlist[currentVideoNumber].title);

}


/**
 * Function that takes the user to the forum page containing the video and comment thread
 * 
 * @param: none
 * @return: none
 */
function moveToForum(){
    const baseurl = "/post.html?post_id=";

    playlist = JSON.parse(localStorage.getItem("playlist"));
    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));

    let destinationUrl = baseurl.concat(playlist[currentVideoNum].postId);  // concat the post id of the video
    window.location = destinationUrl;
}


/**
 * Function that takes the user to the previous video in the playlist if they tapped the playback button
 * 
 * @param: none
 * @return: none
 */
function skipToPreviousVideo() {
    playlist = JSON.parse(localStorage.getItem("playlist"));
    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));
   
    currentVideoNum -= 1;
    
    if (currentVideoNum < 0){
        currentVideoNum = 0;
        alert("You are already at the beginning of the list of recommended videos");
    }
    
    localStorage.setItem("currentVideoNumber", currentVideoNum);
    
    player.loadVideoById(playlist[currentVideoNum].videoId);
    player.stopVideo();
    location.reload()
    updateDescription(playlist[currentVideoNum].title);
    changeShareDetails();  // from share_video.js
}


/**
 * Function that takes the user to the next video in the playlist if they tapped the skip button
 * 
 * @param: none
 * @return: none
 */
function skipToNextVideo() {
    playlist = JSON.parse(localStorage.getItem("playlist"));

    let currentVideoNum = JSON.parse(localStorage.getItem("currentVideoNumber"));
    currentVideoNum += 1;
    
    if (currentVideoNum >= playlist.length){
        currentVideoNum = 0;
        alert("You have gone through all the recommended videos");
    }
    
    localStorage.setItem("currentVideoNumber", currentVideoNum);

    player.loadVideoById(playlist[currentVideoNum].videoId);
    player.stopVideo();
    location.reload()
    updateDescription(playlist[currentVideoNum].title);
    changeShareDetails();  // from share_video.js
}


/**
 * Function that adds an event listener to the state change of the player (play, pause, etc.)
 * 
 * @param: none
 * @return: none
 */
function onPlayerReady(){
    console.log("Ready");

    if (localStorage.getItem('playlist') != null) {
        playlist = JSON.parse(localStorage.getItem('playlist'));
        playVideo();
    } else {
        queryVideosOnPreferences();
    }

    player.stopVideo();
}


/**
 * Function that updates the user's current watch history
 * 
 * @param currentVideoInfo: the data of the current video being watched
 * @return: none
 */
function updateHistory(currentVideoInfo) {
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let currentVideo = {
        interest: currentVideoInfo.interest,
        videoUrl: currentVideoInfo.videoUrl,
        videoThumbnail: currentVideoInfo.videoThumbnail,
        videoTitle: currentVideoInfo.title,
        postId: currentVideoInfo.postId
    }

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []
        let videoExist = false

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                if (currentHistory[i].videoUrl == currentVideoInfo.videoUrl) {
                    videoExist = true;
                }
            }
        }

        // Add video url to history only if video doesn't exist
        if (videoExist != true) {
            currentVideo.totalWatchCount = 0;  // initialise number of times the user played the video
            currentVideo.like = false;
            currentVideo.dislike = false;
            currentHistory.push(currentVideo)
            updateFirebase(currentHistory, current_user, 'videoHistory');
        }
    })
}


/**
 * Function that updates the number of times the user has watched a video
 * 
 * @param currentVideoInfo: the data of the current video being watched
 * @return: none
 */
function updateWatchCount(currentVideoInfo){
    let current_user = JSON.parse(localStorage.getItem("USER"));
    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []

        // If history is not empty and video already exists in history, increment watch count
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                if (currentHistory[i].videoUrl == currentVideoInfo.videoUrl) {
                    let updateCount = parseInt(currentHistory[i].totalWatchCount)
                    updateCount += 1;
                    firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({totalWatchCount: updateCount});

                }
            }
        }

    })
}


/**
 * Function that updates the status of the like/dislike on a video
 * 
 * @param currentVideoInfo: the data of the current video being watched
 * @param actionType: the action of tapping the like/dislike button
 * @return: none
 */
function updateLikeDislike(currentVideoInfo, actionType){
    let current_user = JSON.parse(localStorage.getItem("USER"));

    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []

        // If history is not empty and video already exists in history, set videoExist to true
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                if (currentHistory[i].videoUrl == currentVideoInfo.videoUrl) {
                    if(actionType === 'like'){
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({like: true});
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({dislike: false});
                    }
                    else if(actionType === 'dislike'){
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({dislike: true});
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({like: false});
                    }
                    else if(actionType === 'none'){
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({like: false});
                        firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${i}`).update({dislike: false});
                    }
                }
            }
        }

    })
}


/**
 * Function to get video analytics and store it to Firebase
 * 
 * @param currentVideoAnalytics: the analytics data of the current video being watched
 * @param currentGTMUrl: the url that Google Tag Manager has tracked and recorded
 * @return: none
 */
function saveAnalytics(currentVideoAnalytics, currentGTMUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));
    let todaysDate = new Date()
    const offset = todaysDate.getTimezoneOffset()
    todaysDate = new Date(todaysDate.getTime() - (offset*60*1000))
    todaysDate = todaysDate.toISOString().split('T')[0];
    //let currentUnixTimestamp = Date.now(); 
    let currentTimestamp = new Date().toISOString().substr(11, 8);

    let videoIndex = -1;
    
    // Retrieves the currently stored watch history
    firebase.database().ref('users').child(`${current_user.phone}/videoHistory`).once("value", function (snapshot) {
        let currentHistory = []

        // If history is not empty and video already exists in history, get the index of the video in history
        if (snapshot.exists()) {
            currentHistory = snapshot.val();
            for (i in currentHistory) {
                let currentHistoryUrlStrip = currentHistory[i].videoUrl.replace("https://www.youtube.com/embed/", "")
                
                let index = currentGTMUrl.indexOf(currentHistoryUrlStrip)
                let currentGTMUrlStrip = currentGTMUrl.substring(index, currentGTMUrl.length);
                

                if (currentHistoryUrlStrip === currentGTMUrlStrip) {
                    videoIndex = i;
                }
            }
        }

        if(videoIndex !== -1){  // if the video is found in history, save the analytics to Firebase
            firebase.database().ref('users').child(`${current_user.phone}/videoHistory/${videoIndex}/videoAnalytics/${todaysDate}/${currentTimestamp}`).set(currentVideoAnalytics).then(() => {
                console.log(currentTimestamp);
            });
        }
        else{
            console.log("Something went wrong with the analytics")
        }
        
    })
}


/**
 * Function for YouTube player state change event
 * 
 * @param event: current video event
 * @return: none
 */
function onPlayerStateChange(event){

    updateHistory(playlist[currentVideoNumber]);  // fires if the video is playing
    if (event.data == YT.PlayerState.PLAYING) {
        playlist = JSON.parse(localStorage.getItem("playlist"));
    }
}


/**
 * Following code runs on page load
 */

// Initializing variables
var current_user = JSON.parse(localStorage.getItem("USER"));
var playlist = [];
var player = null;

// Loads the YouTube iframe API
setTimeout(()=>{
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $(function(){
        player = new YT.Player('my-video', {
            height: '390',
            width: '640',
            playerVars: {
            'autoplay': 0
            },
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady,
                'onError': function(){
                    console.log("error");
                }
            },
            enablejsapi: 1
        });
    })
}, 500);

// Fetch the analytics and store it every 10s
let pauseCounter = 0; 
let intervalTime = 10000;
let watchCountFlag = false;  // flag to avoid updating watch count when duplicate records with start status are found in the data layer array

let interval = setInterval(function (){
    let currentDataLayerEntry = dataLayer[dataLayer.length-1]  // From Google Tag Manager

    if(currentDataLayerEntry['event'] === 'gtm.video'){
        let currentGTMUrl = currentDataLayerEntry['gtm.videoUrl']
        let currentVideoAnalytics = { 
            videoCurrentTime: currentDataLayerEntry['gtm.videoCurrentTime'],
            videoDuration: currentDataLayerEntry['gtm.videoDuration'],
            videoElapsedTime: currentDataLayerEntry['gtm.videoElapsedTime'],
            videoPercent: currentDataLayerEntry['gtm.videoPercent'],
            videoStatus: currentDataLayerEntry['gtm.videoStatus'],
            videoVisible: currentDataLayerEntry['gtm.videoVisible']
        }

        if(currentVideoAnalytics.videoStatus === 'start'){
            if(watchCountFlag === false){
                updateWatchCount(playlist[currentVideoNumber]);  // update watch count if user tapped play on video
                watchCountFlag = true;
            }   
            pauseCounter = 0;  // reset pause counter
            saveAnalytics(currentVideoAnalytics, currentGTMUrl);
        }
        else if(currentVideoAnalytics.videoStatus === 'pause'){
            pauseCounter += 1;
            if(pauseCounter < 13) {
                saveAnalytics(currentVideoAnalytics, currentGTMUrl);
            }

            // if video is paused / not replayed for some time (2 mins), stop saving to Firebase
        }
        else if(currentVideoAnalytics.videoStatus === 'progress' || currentVideoAnalytics.videoStatus === 'seek'){
            pauseCounter = 0;  // reset pause counter 
            saveAnalytics(currentVideoAnalytics, currentGTMUrl);
        }
        else if(currentVideoAnalytics.videoStatus === 'complete'){
            watchCountFlag = false;
            pauseCounter += 1;
            if(pauseCounter < 13) {
                saveAnalytics(currentVideoAnalytics, currentGTMUrl);
            }
        }
    }
}, intervalTime)

