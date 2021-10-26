document.addEventListener('DOMContentLoaded', showFavouriteTable(), false);


// From the selected preferences, randomly select a video ID for the player
// This would be replaced with code for the content library + details from user account, currently just for show
function getTopic(){
  var preferenceList = ["Cooking", "Sports", "Music", "Travel"];
  var i = Math.floor(Math.random() * preferenceList.length);
  var chosen = preferenceList[i];

  var topicDictionary = {};
  topicDictionary['Cooking'] = "7EnWiGYT1g4";
  topicDictionary['Sports'] = "p3c6L81HLAQ";
  topicDictionary['Music'] = "v=oHg5SJYRHA0";
  topicDictionary['Travel'] = "ODuEl4oNae0";

  return topicDictionary[chosen]

}


var videoNames = [];
// Function to populate history page table
function showFavouriteTable(){
  console.log("Show history table ran.");
  let current_user = JSON.parse(localStorage.getItem("USER"));

  table = document.getElementById('historyTableBody');
  table.innerHTML = "";

  // Retrieves the currently stored watch history
  firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once("value", function(snapshot){
      let currentFavourites = [];

      // If history is not empty and video already exists in history, set videoExist to true
      if (snapshot.exists()){
          currentFavourites = snapshot.val();
          console.log(currentFavourites);


          table = document.getElementById('historyTableBody');
          var title;

          for (i in currentFavourites){
            currentVideo = currentFavourites[i];

            $(document).ready(function() {
                
              console.log("second success callback");

            //   url = "https://www.youtube.com/watch?v=" + getVideoUrl(data);

              tr = document.createElement("tr");

              td0 = document.createElement("td");
              td0.className = "mdl-data-table__cell--non-numeric";
              img = document.createElement("img");
              img.src = currentVideo.videoThumbnail;
              td0.appendChild(img);

              td1 = document.createElement("td");
              td1.className = "mdl-data-table__cell--non-numeric";

              td2 = document.createElement("td");
              td2.className = "mdl-data-table__cell--non-numeric";
              td2.innerHTML = currentVideo.videoUrl;

              td3 = document.createElement("td");
              a = document.createElement("a");
              a.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent";
              a.innerHTML = "DELETE";

              td4 = document.createElement("td");
              a2 = document.createElement("a");
              a2.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button";
              a2.innerHTML = "VIEW";


              title = currentVideo.videoTitle;
              td1.innerHTML = title;

              a.addEventListener('click', function(){
                if(confirm("Are you sure you want to delete this entry?")){
                  console.log("Deleted an entry.");
                  var row = this.parentElement.parentElement;
                  console.log("Row index: " + row.rowIndex);
                  var url = row.getElementsByTagName("td")[2].innerHTML;
                  console.log(url);
                  var table = this.parentElement.parentElement.parentElement;
                  removeFromFavourite(url);
                  table.deleteRow(row.rowIndex-1);
                };
              }, false);

              td3.appendChild(a);

              td4.appendChild(a2);

              a2.addEventListener('click', function(){
                var row = this.parentElement.parentElement;
                var url = row.getElementsByTagName("td")[2].innerHTML;
                console.log(url);
                window.open(url, '_blank').focus();
              }, false);

              tr.appendChild(td0);
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td4);
              tr.appendChild(td3);
              table.appendChild(tr);


              // console.log(data);
              videoNames += title;


            })
          }
      }

      // If history is empty, add message to show history is empty
      else{
        console.log("Favourite is currently empty.")
      }
  })
}


function deleteAllFavourite(){
  if(confirm("Are you sure you want to delete all your favourite videos?")){
    console.log("All favourites deleted.");

    let current_user = JSON.parse(localStorage.getItem("USER"));
    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).remove();

    location.reload();
  }
}

// Function to remove a video from history
function removeFromFavourite(currentVideoUrl){
    let current_user = JSON.parse(localStorage.getItem("USER"));

    firebase.database().ref('users').child(`${current_user.phone}/videoFavourite`).once('value', function(snapshot){
        if (snapshot.exists()){
            currentFavourites = snapshot.val();
            for (i in currentFavourites){
                if (currentFavourites[i].videoUrl == currentVideoUrl){
                    currentFavourites.splice(i,1);
                    updateFirebase(currentFavourites, current_user, 'videoFavourite');
                    break;
                }
            }
        }
    })
}

// Function to update watch history of specific user in database
function updateFirebase(video_list, current_user, child_name){
    firebase.database().ref('users').child(`${current_user.phone}`).child(child_name).set(
        video_list
    , function(error){
        if (error){
            console.log(error)
        }
    })
}
