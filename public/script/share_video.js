/**
 * Changes the url, title, media and description to fit the video that is to be shared
 * 
 * @param: none
 * @return: none
 */
function changeShareDetails(){
    
    // Retrieves the information from local storage
    let playlist = JSON.parse(localStorage.getItem("playlist"));
    let currentVideoNumber = JSON.parse(localStorage.getItem("currentVideoNumber"));
    
    let url = playlist[currentVideoNumber].videoUrl;
    let description = playlist[currentVideoNumber].title;
    let media = playlist[currentVideoNumber].videoThumbnail;

    addthis_share = {
        url: url,
        title: "Recommended video",
        description: description,
        media: media
    }
}

/**
 * Adds the share buttons to the page on load
 * 
 * @param: none
 * @return: none
 */
function addShareButtons(){
    
    // Loads the script for the share buttons
    let script = document.createElement('script');
    
    script.setAttribute("type","text/javascript");
    script.setAttribute("src","//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-61101a2423e8f106");

    document.body.appendChild(script);

}


// Variable to initialize the details when user shares a video
var addthis_share = {
    url: "",
    title: "",
    description: "",
    media: ""
}

// Runs on page load
addShareButtons();
