let tableArea = document.getElementById('favtable');
// let updateFavOnce = false;
// localStorage.setItem("updateFavOnce", JSON.stringify(updateFavOnce));
let favCount = 0;
let current_user = JSON.parse(localStorage.getItem("USER"));
// let listInterest = ["Art","Caregiving","Collaboration and Teamwork","Cooking","Critical Thinking","Effective Communication","Email Management and Setup","Entrepreneurship","Exercise","Leadership","Listening","Negotiation","Online Collaboration","Personal Selling","Persuasion","Professional Writing","Relationship Management","Search Engine Use","Smartphone/Tablet Use","Social Media Use"]
let listInterest = ["Active listening","Art","Caregiving","Collaboration and teamwork","Cooking","Critical thinking","Effective communication","Email","Entrepreneurship","Exercise","Negotiation skill","Online collaboration","People and Leadership","Personal selling","Persuasion","Professional writing","Relationship management","Search for information","SmartphoneTabletComputerUse","Social media use"];
phoneNum = current_user['phone'];
let myFavList = [];
let sortGenerated = false;

let mylst = [];

// Generate grid and display all of user favourited videos.
showFavTable();

function showEmptyText(visible){
  // show text when input is 1 and dont show when input is not 1
  let toggleTxt = document.getElementById("noVideoFavDisplay");
  if (visible == 1){
    toggleTxt.style.display = "block";
  }
  else{
    toggleTxt.style.display = "none";
  }
}

function displayFav(){
  // Read from firebase realtime database and display fav in html
    
  firebase.database().ref('users/'+phoneNum+'/videoFavourite').on('value', (snapshot) => {
    if (snapshot.val() == null){
      let showEmpty = document.getElementById("favEmptyText");
      showEmpty.innerHTML = "";
      showEmpty.innerHTML = emptyTxt;
    }
    else{
      let favList = snapshot.val();
      output = "";
      let count = 0;
      myFavList = []
      for (let i = 0; count<Object.keys(favList).length; i++){
        if (favList[i]){
          let url = favList[i]['videoUrl']
          output += `<div id="favCard${i}" class="favCard">`
          output += `<p class="hideStuff" id=favUrl${i}>`+url+`</p>`
          output += `<div class="favCardThumbnail" onclick="watch_vid(${i})"><img src=`+ favList[i]['videoThumbnail'] +` style="width:auto;height:100%; position: relative; background-color: #fff;"></div>`
          output += `<div class="favCardTopBtn">`
          output += `<button class="favDeleteBtn" onclick="fav_delete(${i})">
                      <img src="./css/images/trash_icon.jpeg" style="background:transparent; height: 80%;"/>
                    </button></div>`
          output += `<div class="favCardInterest" onclick="watch_vid(${i})">`+favList[i]['videoPreference']+`</div>`
          output += `<div class="favCardTitle" onclick="watch_vid(${i})">`+favList[i]['videoTitle']+`</div>`
          
          output += `</div>`
          favCount += 1
          count += 1
          myFavList.push(favList[i]['videoPreference'])
        }
      }
      tableArea.innerHTML = output;
    }
  })
}
function deleteAllFav(){
  let a = false;
  a = confirm("Remove all from favourite?");
  if (a == true) {
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).remove();
    showFavTable();
    location.reload();
    showEmptyText(1);
  }
}

function fav_delete(id){
  // Delete a favCard element by favCard id in HTML

  let a = false;
  a = confirm("Remove from favourite?");
  if (a == true) {
    let card = document.getElementById("favCard"+id);
    card.parentNode.removeChild(card);
    favCount -= 1;
    // display no videos
    if (favCount == 0){
      // let showEmpty = document.getElementById("favEmptyText");
      // showEmpty.innerHTML = emptyTxt;
      showEmptyText(1);
    }
    // remove from firebase
    fav_del_db(id); 
  }
}

function fav_del_db(id){
  // delete the selected favCard using its id, to delete video from firebase realtime database
  firebase.database().ref('users').child(`${current_user.phone}/videoFavourite/`).once("value", function(snapshot){
    let currentFav = []

    // console.log(snapshot.val())
    if (snapshot.exists()){
      myFavList[id] = myFavList[myFavList.length-1];
      myFavList.pop()
      currentFav = snapshot.val();
      currentFav[id] = currentFav[currentFav.length-1];
      currentFav.pop();
      firebase.database().ref('users/'+phoneNum+'/videoFavourite/').set(currentFav);

      // update fav video view
      filter();
    }
  })
}

function watch_vid(id){
  // Watch video of id, top video id = 0, id+=1 for following vids
  // Show and hide video of specific ID

  let player = document.getElementById("favVideo");
  player.style.display = "block";
  // player.style.opacity = 1;
  let url = document.getElementById("favUrl"+id).innerHTML;

  let vid = document.getElementById("favVideoPlayer");

  let link = `<button style="float:right; height: 100px;" onclick="hide_vid()">Return to Favourite</button>`
  link += `<div class="h_iframe">`
  link += `<iframe src=` + "https://www.youtube-nocookie.com/embed/" + url.substring(32) +"?rel=1"
  link += `title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen;></iframe></div>`
  console.log(link)
  player.innerHTML = link;
}
function hide_vid(){
  // Hide video show fav page
  let player = document.getElementById("favVideo");
  player.style.display = "none";
  player.innerHTML = "";
}

function show_sort(){
  // Show and hide sorting area for HTML
  let sortArea = document.getElementById("sortingArea");
  let myBtn = document.getElementById("favSortBtn");

  if (sortArea.style.display == "none"){
    sortArea.style.display = "block";
    myBtn.innerHTML = "Close sort"
  }
  else{
    sortArea.style.display = "none";
    myBtn.innerHTML = "Sort by interest";
    filter();
  }

  // generate sort checkboxes for all skill
  if (sortGenerated == false){
    sortGenerated = true;
    sortArea.innerHTML+=`<br>`;
    for (let i = 0; i<listInterest.length; i++){
      //sortArea.innerHTML+=`<div class="sortInterestBox"><input type="checkbox" name="interest" style="margin-left: 15px;margin-top: 10px;" value="`+listInterest[i]+`"><label class="labelSort">`+"&nbsp"+listInterest[i]+"&nbsp"+`</label></div>`
      sortArea.innerHTML+=`<div class="sortInterestBox" id=sort${i} value="${listInterest[i]}" onclick="sortClick(${i})"><label class="labelSort" style="padding: 5px;">`+listInterest[i]+"&nbsp"+`</label></div>`
    }
  }
}

function inList(value, list){
  // Determine to hide or show favCard when user sort

  //console.log(value)
  //console.log(list)

  if (list.length == 0){
    // if none of the filter option is selected show all
    return true;
  }
  for (let i = 0; i<list.length; i++){
    if (value == list[i]){
      console.log(true);
      return true;
    }
  }
  console.log(false)
  return false;
}

function sortClick(id){
  let sortBox = document.getElementById("sort"+id);
  if (sortBox.style.background == "rgb(210, 210, 210)"){
    sortBox.style.background = "none";
  }
  else{
    sortBox.style.background = "#d2d2d2";
  }
}

function filter() {
  // Refresh display of favCard, only shows the checked interest, by default show all.
  let checkboxes = [];
  let currentInterest;
  for (let i = 0; i<listInterest.length; i++){
    currentInterest = document.getElementById("sort"+i);
    if (currentInterest.style.background == "rgb(210, 210, 210)"){
      checkboxes.push(i); // index of listInterest
    }
  }

  //alert(checkboxes);

  let values = [];
  for (let i = 0; i < checkboxes.length; i++){  
    values.push(listInterest[checkboxes[i]]);
  }
  console.log(values, myFavList, favCount);
  
  let cards = "";
  for (let j = 0; j < myFavList.length; j++){
    // this does not work
    // console.log(myFavList[j] in values);
    // console.log(!(myFavList[j] in values));
    cards = document.getElementById(`favCard${j}`);
    cards.style.display = "block";

    // If not in values hide favCard
    if (inList(myFavList[j], values) == false){
      cards = document.getElementById(`favCard${j}`);
      cards.style.display = "none";
    }
  }
}

function compareUrl(url, urlList){
  // check if first arg is in the second arg list
  // return index in urlList if found else -1
  // console.log(url)
  for (let i = 0; i < urlList.length; i++){
    if (url == urlList[i]){
      return i;
    } 
  }
  return -1;
}

function getVideoId(videoURL){
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    videoId = videoURL.match(rx);
    
    return videoId[1];
}


function updateFavList(){
  // Convert urls from firebase favourite list and convert them into standard object to use in recomemder main page for redirected videos
  // from favourite page to reco main page filling in infomation from post
  firebase.database().ref("posts").once('value').then((snapshot) => {
    let urlList = JSON.parse(localStorage.getItem("favList"));
    if (snapshot.exists()) {
      let favList = [];
      let lst = [];
      for (let i = 0; i<urlList.length; i++){
        lst.push(null);
      }
      // localStorage.setItem("temp", JSON.stringify(favList));    
      // let lst = JSON.parse(localStorage.getItem("temp"));
      let check = null;
        snapshot.forEach(function(childSnap){
            let value = childSnap.val();
            check = compareUrl(value.videoURL, urlList);
            if (check >= 0){
                let videoObj = {
                    title: value.title,
                    videoUrl: value.videoURL,
                    videoThumbnail: value.videoThumbnail,
                    videoId: getVideoId(value.videoURL),
                    postId: value.id,
                    interest: value.interest[0]
                }
                lst[check] = videoObj;
            }
        })
      localStorage.setItem("temp", JSON.stringify(lst));
    }
    else {
        console.log("No data available");
    }
  })
}

function showFavTable(){
  // Generate grid and display all of user favourited videos.
  console.log("Show fav grid ran.");
  let current_user = JSON.parse(localStorage.getItem("USER"));
  grid = document.getElementById('favGrid');

  // Retrieves the currently stored watch history
  firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once("value", function(snapshot){
      let currentHistory = [];

      // If fav is not empty and video already exists in fav, set videoExist to true
      if (snapshot.exists()){
          showEmptyText(0);
          currentHistory = snapshot.val();
          console.log(currentHistory);

          let favList = [];

          // Table implementation
          var title;
          let count = -1;
          myFavList = [];

          for (i in currentHistory){
            favCount += 1;
            count += 1;
            myFavList.push(currentHistory[i].interest);

            currentVideo = currentHistory[i];

            favList.push(currentVideo.videoUrl);
            localStorage.setItem("favList", JSON.stringify(favList));

            $(document).ready(function() {

              console.log("second success callback");
              title = currentVideo.videoTitle;
              let skill = currentVideo.interest;
              let card_url = currentVideo.videoUrl;

              // Grid implementation

              cell = document.createElement("div");
              cell.className = "mdl-cell mdl-cell--6-col";
              cell.id = "favCard" + count;

              card = document.createElement("div");
              card.className = "demo-card-wide mdl-card mdl-shadow--2dp";
              card.style.height = "400px";
              card.style.width = "auto";

              cardTitle = document.createElement("div");
              cardTitle.className = "mdl-card__title";
              cardTitle.style.background = "url(" + currentVideo.videoThumbnail + ") center / cover";
              cardTitle.style.height = "300px";
              console.log(currentVideo.videoThumbnail);

              card.appendChild(cardTitle);

              cardSupport_1 = document.createElement("div");
              cardSupport_1.className = "mdl-card__supporting-text";
              cardSupport_1.innerHTML = currentVideo.videoUrl;
              cardSupport_1.style.display = "none";
              cardSupport_1.style.height = "1px";
              card.appendChild(cardSupport_1);

              cardSupport_2 = document.createElement("div");
              cardSupport_2.className = "mdl-card__supporting-text";
              cardSupport_2.innerHTML = `<b>`+skill+`<b><br>`;
              cardSupport_2.innerHTML += title;
              card.appendChild(cardSupport_2);

              cardAction = document.createElement("div");
              cardAction.className = "mdl-card__actions mdl-card--border";
              cardActionButton_1 = document.createElement("a");
              cardActionButton_1.className = "mdl-button mdl-button--colored mdl-js-button";
              cardActionButton_1.innerHTML = '<img src="./css/images/eye_icon.png" style="height:32px">'; //"VIEW";
              cardActionButton_1.id = count; 
              cardAction.appendChild(cardActionButton_1);

              cardActionButton_1.addEventListener('click', function(){
                let flag = false;
                // let playlist = JSON.parse(localStorage.getItem("playlist"));
                // let currentVideoNumber = JSON.parse(localStorage.getItem("playlist"));

                // let playlist = JSON.parse(localStorage.getItem("playlist"));
                // for (let i = 0; i < playlist.length; i++){
                  // if (card_url === playlist[i].videoUrl){
                    // alert("in playlist");
                    // flag = true;
                    // break;
                  // }
                // }
                // if (flag == false){
                  // alert("not in playlist")
                // }
                shiftPlaylist(this.id);
                window.location.replace("recommender_Ui.html");
              }, false);

              cardActionButton_2 = document.createElement("a");
              cardActionButton_2.className = "mdl-button mdl-button--colored mdl-js-button";
              cardActionButton_2.innerHTML = '<img src="./css/images/delete_icon.png" style="height:32px">'; //"DELETE";
              cardActionButton_2.id = i;
              cardAction.appendChild(cardActionButton_2);

              cardActionButton_2.addEventListener('click', function(){
                fav_delete(this.id);
                console.log("Deleted an entry.");                                                                        
              }, false);

              card.appendChild(cardAction);

              cell.appendChild(card);
              grid.appendChild(cell);
            })
          }
          // updateFavOnce = JSON.parse(localStorage.getItem("updateFavOnce"));
          // if (updateFavOnce == true) {
          // }
          // else{
            // updateFavList();
            // updateFavOnce = true;
            // localStorage.setItem("updateFavOnce", JSON.stringify(updateFavOnce));
          // }
          // 
      }
      // If favourite is empty, add message to show fav is empty
      else{
        console.log("Fav is currently empty.");
        showEmptyText(1);
      }
      updateFavList();
  })
}

function shiftPlaylist (id){
  // add the video from fav to show favourite video, 
  // and when redirected the next will still recommend from current playlist 
  // while the back still shows last video played.
  let playlist = JSON.parse(localStorage.getItem("playlist"));
  let currentVideoNumber = JSON.parse(localStorage.getItem("currentVideoNumber"));
  let temp = JSON.parse(localStorage.getItem("temp"));
  
  let tempLst = [];
  let atVideo = currentVideoNumber;
  for (let i = 0; i < playlist.length; i++){
    tempLst.push(playlist[i]);
    if (i == atVideo) {
      tempLst.push(temp[id]);
      currentVideoNumber+=1;
    }
  }
  localStorage.setItem("playlist", JSON.stringify(tempLst));
  localStorage.setItem("currentVideoNumber", JSON.stringify(currentVideoNumber));
  
}

