let current_user = JSON.parse(localStorage.getItem("USER"));
let video_url_track = 1;
let postNamesCreatePost = [];
let postNamesFeed = [];
let postNamesRecommender = [];
let post_names = [];




window.onload = execute()

/**
 * Calls the printing User posts function
 * @returns none
 */
function execute(){
    printUserPosts();
}

/**
 * Function used to check whether or not a post exists provided the post id. Function should be called before performing any action on the post.
 * @param {1} id: the post id
 * returns 1 if the post exists and 0 otherwise
 */
async function checkPostExists(id){

    let res = 0;

    await firebase.database().ref(`posts`).orderByChild("id").equalTo(id).once("value", snapshot => {

        if (snapshot.exists()){
            console.log(1);

            res = 1;
        }
     });

     return new Promise(function(resolve, reject) {
        resolve(res);
      });


}

/**
 * The function displays a list of available options to autocomplete to the search query limited to 10 options
 * @param {1} query: the query text inputed into the search field
 * @returns void
 */
function autoComplete(query){

    document.getElementById("autocomplete").innerHTML = ""; // empty autocomplete box

    let tab = document.getElementsByName("tabs");

    let inputarr;

    if (tab[0].checked){ // recommender
        inputarr = postNamesRecommender;
    }
    else if (tab[1].checked){ // feed
        inputarr = postNamesFeed;
    }
    else{ // create Post
        inputarr = postNamesCreatePost;
    }

    let count = 0;
	for (let i = 0 ; i < inputarr.length ; i++){
        if(query != "" && (inputarr[i].toLowerCase()).indexOf(query.toLowerCase()) != -1 && count<10){
            //output.push(inputarr[i]);
            document.getElementById("autocomplete").innerHTML += `<div class="autocomplete-item" onclick="document.getElementById('searchBox').value = '${inputarr[i]}'"><strong>${inputarr[i]}<strong/></div>`;
            count++;
        }
  }
}


/**
 * Checks whether the user currently looking at the page is logged.
 * @returns true if logged in, false otherwise
 */
function checkUserExistence() {
    // if a user is signed in then
    if (current_user["username"] && current_user["phone"]) {
        return true;
    } else {
        return false;
    }
}

/**
 * Function used to check if a video link is from youtube.
 * If it is, then it manipulates the url to be able to display a video on the app.
 * @param {1} url: input url of a video from create_post.html
 * @returns youtube_url: the url with embed param added if the condition is satisfied. Or else, it returns 0
 */
function checkEmbeddingVideo(url) {
    let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    let youtube_url = 'https://www.youtube.com/embed/';

    //check whether the link is valid
    if (match && match[2].length == 11) {
        return youtube_url + match[2];
    } else {
        return 0;
    }
}


/**
 * Function used to make a new post on forum.
 * If all required fields are filled, the data will be written into the database and a post is created
 * and shown on the forum.
 * @returns none
 */
function makeNewPost() {

    if (checkUserExistence()) {
        interest_arr = [];
        $("input:checkbox[name=interests]:checked").each(function(){
            interest_arr.push($(this).val());
        });

        //alert if the interests are not chosen
        if (!interest_arr.length){
            document.getElementById("interest-Modal").style.display = "block";
            return
        }

        // gets all the information from the create post UI
        let title = document.getElementById("post_title").value
        let description = document.getElementById("post_description").value

        let myRef = firebase.database().ref(`posts`);
        let key = myRef.push().key;

        let embedding_video_url = 0
        if(document.getElementById("video_url") != null){
          let video_url = document.getElementById("video_url").value
          if (video_url !== "") {
              embedding_video_url = checkEmbeddingVideo(video_url);
              //alert if an invalid link is provided for the video
              if (embedding_video_url == 0) {
                  document.getElementById("video-Modal").style.display = "block";
                  return;
              }
          }
        }
        

        // format the time of the post
        let now = new Date();
        let utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        utc = utc.toString();
        utc = utc.substring(0,25);
        utc+="(UTC TIME)";

        // create a new object of the post
        let newData = {
            id: key,
            description: description,
            interest: interest_arr,
            title: title,
            userID: current_user["phone"],
            username: current_user["username"],
            videoURL: embedding_video_url,
            created: utc,
            likes:0,
            dislikes:0,
            recommender: false,
            anonymous: 0
        }

        //upload the post to the firebase
        firebase.database().ref(`posts/${key}`).set(newData).then(()=>{
            window.location = "forum.html";
        });
    }
    else{
        window.location = "forum.html";
    }
}


/**
 * Prints all the posts which are created by users from the firebase to the screen.
 * @returns none
 */
function printAllPosts(){

    $("#radio-0").attr("disabled",true);
    $("#radio-1").attr("disabled",true);

    $('#resNum').html(``);
    document.getElementById("searchBox").value = ""; // clear search box

    print_create_post();
    $('#postField').text(``); // emtpy the field of any previous posts

    let printPostCount = 10; // start printing 10 posts first
    let printStartIndex;

    let data_list = [];
    let button_nums = []
    let posts = [];

    postNamesCreatePost = [];

    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }
        })
    }).then(()=>{
        //get all the posts from the firebase
        firebase.database().ref('posts')
        .once('value', x => {
            x.forEach(data => {
                // if the post is not from recommender
                if(data.val().recommender == false || data.val().recommender == undefined){
                    let button_num=0
                    for (let i =0; i<data_list.length; i++) {
                        if(data_list[i][0] == data.key){  // if an action was performed on this post
                            if(data_list[i][1] == 1) { // liked
                                button_num=1
                            }
                            else{ //disliked
                                button_num=-1
                            }
                        }
                    }
                    button_nums.push(button_num);
                posts.push(data.val());
                postNamesCreatePost.push(data.val().title);
        }
            });
        }).then(()=>{
            printStartIndex = posts.length-1;
            printPostQuan(printStartIndex, printPostCount, posts, button_nums);
        }).then(()=>{

            // Reenable the other tabs
            $("#radio-0").attr("disabled",false);
            $("#radio-1").attr("disabled",false);

            if(posts.length == 0 ){
                $('#resNum').html('<h4>0 Posts in this section</h4>');
            }
        })
    })
}

/**
 * Function used to print videos from the recommended data
 * it calls the function that holds html component in a loop and add it to the post field under thread tab.
 * @returns null
 */
function printThread(){
    //disables the tabs till all the posts are loaded
    $("#radio-1").attr("disabled",true);
    $("#radio-2").attr("disabled",true);

    postNamesRecommender = [];

    console.log(document.getElementById(`radio-1`), document.getElementById(`radio-2`))

    document.getElementById("searchBox").value = ""; // clear search box
    $('#create_post').text(``);  // remove create post ui
    $('#postField').text(``); // clear post field from posts
    $('#resNum').html(``);


    let printPostCount = 10; // start printing 10 posts first
    let printStartIndex;

    let data_list = [];
    let button_nums = []
    let posts = [];

    //gets the posts with the like/dislike by the logged in user
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }
        })
    }).then(()=>{
        firebase.database().ref('posts')
        .once('value', x => {
            x.forEach(data => {
                // if the post is from recommender
                if(data.val().recommender == true){
                    let button_num=0
                    for (let i =0; i<data_list.length; i++) {
                        if(data_list[i][0] == data.key){  // if an action was performed on this post
                            if(data_list[i][1] == 1) { // liked
                                button_num=1
                            }
                            else{ //disliked
                                button_num=-1
                            }
                        }
                    }
                    button_nums.push(button_num);
                posts.push(data.val());
                postNamesRecommender.push(data.val().title);
        }
            });
        }).then(()=>{
            printStartIndex = posts.length - 1;
            printPostQuan(printStartIndex, printPostCount, posts, button_nums);

            if(posts.length == 0 ){
                $('#resNum').html('<h4>0 Posts in this section</h4>');
            }

        }).then(()=>{

            // Reenable the other tabs
            $("#radio-1").attr("disabled",false);
            $("#radio-2").attr("disabled",false);
            // if(posts.length == 0 ){
            //     $('#postField').html('<h4>0 Posts in this section</h4>');
            // }


            $('#searchBoxRecommender').autocomplete({
                source: post_names
            }).attr('style', 'max-height: 40px; overflow-y: auto; overflow-x: hidden;');
        });
    });
}

/**
 * Function used to print a specific amount of posts in the posts field. Used to prevent delays or browser crashes when printing many posts.
 * @param {1} startIndex  the starting index from which to begin printing posts from posts list
 * @param {2} numberOfPosts the number of posts to be printed
 * @param {3} PostsList the list containing all the post json data
 * @param {4} buttonNums list of the like and dislike button numbers for each post
 */
function printPostQuan(startIndex, numberOfPosts, postsList, buttonNums){
    if(startIndex-numberOfPosts >= 0){ // if have at least 10 posts to print
        for(let i=startIndex; i>startIndex-numberOfPosts ; i--){ // print specific number of posts
            printPost(postsList[i], buttonNums[i], i);
        }
    }
    else{
        for(let i=startIndex; i>=0 ; i--){ // print out 0 otherwise
            printPost(postsList[i], buttonNums[i], i);
        }
    }

    // add a print more button
    if(startIndex-numberOfPosts>=0){ // only if more posts to load
        $('#postField').append(`<button id='moreBut' class='mdl-button mdl-js-button mdl-button--raised' style='color:white; background-color:#006dae'
        >Load More</button>`);

        let moreBut = document.getElementById("moreBut");
        moreBut.onclick = function(){
            moreBut.remove();
            printPostQuan(startIndex-numberOfPosts,numberOfPosts,postsList,buttonNums);
        };
    }
}

/**
 * Function which outputs the video url textbox
 * which users can paste their valid Youtube link to be posted along in the forum
 */
function showVideoUrl() {

    let video_button = document.getElementById("post_video");

    if (video_url_track == 1) {

        video_button.style = "visibility: visible"; // make the element visible

        let video_url_appear = `<br><input class="input" type="text" id="video_url" name="video_url" placeholder="Add a video link here"></input>`;

        video_button.innerHTML = video_url_appear;

        video_url_track = 0; // make the track number 0

        video_button.animate([
            { // from
                opacity: 0,
                color: "#fff"
            },
            { // to
                opacity: 1,
            }
        ], 500);

    } else {
        video_button.style = "visibility: hidden"; // hide the element
        video_url_track = 1; // make the track number 1
    }
}


/**
 * Function used to display the layout of forum under "Create Post" tab
 * @returns none
 */
function print_create_post()
{
    $('#create_post').html(
        `<div id="create_post">
    <br>
    <div class="demo-card-wide mdl-card mdl-shadow--2dp" id="create_post">
    <div class="mdl-card__title">
       <h2 class="mdl-card__title-text mdl-color-text--black" style="font-weight: bold;">New Forum Post</h2>
    </div>
    <hr style="margin: 0;">
    <div class="new_post_form">
       <!-- POST TITLE -->
       <div>
       <label for="post_title" style="font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif"><b>TITLE:  </b></label>
       </div>
       <input class="input" type="text" id="post_title" name="post_title" placeholder=" Share your thoughts with the community!" required></input><br>
       <!-- POST DESCRIPTION -->
       <textarea class="input"  id="post_description" name="post_description" placeholder="Description" cols="30" required></textarea>
       <br>
       <br>

       <!-- VIDEO URL  -->
       <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="video_btn" style="background-color:#006DAE; border: white;" onclick="showVideoUrl()">
        Video Link
        </button>
        <br>
        <div id="post_video">
        </div>
       <br>
       <br>
       <!-- INTEREST  -->
       <span class="label success"><label style="margin: 0; font-family: 'Helvetica', 'Arial', sans-serif"><b>Choose 2 interests for your post</b></label> </span>
       <br>
       <!-- INTEREST BUTTON -->
       <div id="interests_box">
       <br>
        <!-- ICT/TECHNOLOGY SKILLS -->
        <span class="label success"><label style="margin: 0; font-family: 'Helvetica', 'Arial', sans-serif"><b>ICT/Technology Skills</b></label> </span>
        <div class="box">
          <label class="checkbox-inline" id="interest1" >
          <input type="checkbox" name="interests" value="Browser search" /> Browser Search
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline" >
          <input type="checkbox" name="interests" value="Device use" /> Device Use
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline" >
          <input type="checkbox" name="interests" value="Email" /> E-mail
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline" >
          <input type="checkbox" name="interests" value="Online collaboration" /> Online Collaboration
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline" >
          <input type="checkbox" name="interests" value="Social media use" /> Social Media Use
          </label>
        </div>
        <br>
        <!-- Social Communication Skills -->
        <span class="label success">
            <label style="margin: 0; font-family: 'Helvetica', 'Arial', sans-serif"><b>Social Communication Skills</b></label>
        </span>

        <div class="box">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Active listening" /> Active Listening
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Effective communication" /> Effective Communication
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Negotiation skill" /> Negotiation Skill
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Persuasion" /> Persuasion
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Relationship management" /> Relationship Management
          </label>
        </div>
        <br>

        <!-- Complementary skills -->
        <span class="label success">
            <label style="margin: 0; font-family: 'Helvetica', 'Arial', sans-serif"><b>Complementary Skills</b></label>
        </span>

        <div class="box">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Art" /> Art
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Caregiving" /> Caregiving
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Cooking" /> Cooking
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Exercise" /> Exercise
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Professional writing" /> Professional Writing
          </label>
        </div>
        <br>

        <!-- Work-related Skills -->
        <span class="label success">
            <label style="margin: 0; font-family: 'Helvetica', 'Arial', sans-serif"><b>Work-related Skills</b></label>
        </span>
        <div class="box">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Collaboration and teamwork" /> Collaboration and Teamwork
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Critical thinking" /> Critical Thinking
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Entrepreneurship" /> Entrepreneurship
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="People and Leadership" /> People and Leadership
          </label>
          <br class="mobile-br">
          <label class="checkbox-inline">
          <input type="checkbox" name="interests" value="Personal selling" /> Personal Selling
          </label>
        </div>
        <br>

       </div>
       <script type="text/javascript">
          $(document).ready(function () {
             $("input[name='interests']").change(function () {
                 var maxAllowed = 2;
                 var cnt = $("input[name='interests']:checked").length;
                 if (cnt > maxAllowed) {
                     $(this).prop("checked", "");
                     document.getElementById("interest-Modal").style.display = "block";
                 }
             });
          });
       </script>
       <br>
       <!-- POST BUTTON -->
       <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="post_btn"
          style="background-color:#006DAE; border: white;" onclick="makeNewPost()">
       POST
       </button>
    </div>

 </div>`
    );
}

/**
 * Function which prints out posts on forum. Each post will display all the obtained information
 * and includes all the related functionalities such as the likes, dislike.
 * @param {*} post the post object
 * @param {*} button_num indicator for buttons for which post
 * @param {*} i the button index
 */
function printPost(post, button_num, i )
{
    let button = `
    <button class="like mdl-button mdl-js-button" value="${post.likes}" id="btn_like${i}"  style="cursor: pointer;">
    <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
    </button>
    <button class="dislike mdl-button mdl-js-button"  value="${post.dislikes}" id="btn_dislike${i}" style="cursor: pointer;">
    <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
    </button>
    `
    if (button_num==1)
    {
         // liked
         button = `<button
         class="like mdl-button mdl-js-button "  style="color: white !important; background-color:#2bbd7e !important;"  value="${post.likes}" id="btn_like${i}" style="cursor: pointer;">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button" value="${post.dislikes}" id="btn_dislike${i}" style="cursor: pointer;">
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>
         `
    }
    else if(button_num==-1)
    {
         // disliked
         button = `<button class="like mdl-button mdl-js-button"  value="${post.likes}" id="btn_like${i}" style="cursor: pointer;">
         <img src="./css/images/button-designs_23.png"  id="like_post_icon"></img><span class="number_of_likes"> ${post.likes}</span>
         </button>
         <button class="dislike mdl-button mdl-js-button"  style="background-color:#e53935; color: white;" value="${post.dislikes}" id="btn_dislike${i}" style="cursor: pointer;">
         <img src="./css/images/button-designs_24.png"  id="dislike_post_icon"></img><span class="number_of_dislikes"> ${post.dislikes}</span>
         </button>`
    }

    //checks whether the post has a username and date created
    let atchar = "@";
    if(post.username == undefined)
        post.username = "";
    else
        post.username = atchar+post.username;
    if(post.created == undefined)
        post.created = "";

    $('#postField').append(
        `   <div style="padding-top: 20px;">
            <span class="post_card">
               <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                  <!-- POST HEADER -->
                  <br>
                  <div class="f">
                     <h2 class="mdl-card__title-text mdl-color-text--black notranslate" style="text-align: left; float: left; position: relative; left: 10px" id='poster_id'>${post.username}</h2>
                  </div>
                  <br>
                  <div class="post_header" style="margin:0 10px; background-color: white">
                     <h5 class="post_header mdl-color-text--black;"style="padding-left:18px; font-size: 30px; color: #006DAE">${post.title}</h5>
                  </div>
                  <!-- POST FORM -->
                  <form class="post_content" style="margin:0 10px; background-color: white">
                     <h6 class="post_content mdl-color-text--black" style="margin:0 10px; background-color: white; padding-left:10px; font-size: 20px" >${post.description} </h6>
                     <br>
                     `
                                  +
                                  `
                                  ${post.videoURL !== 0 && post.videoURL !== undefined ? `<iframe loading="lazy" allow="fullscreen" width="420" height="315" src="${post.videoURL}"></iframe>` : ``}
                                  `
                                  +
                                  `
                                  <br>
                     <div style='display: inline-block'>
                     `
                     +
                     `
                     ${post.interest[1] == undefined? `<button class="mdl-button mdl-js-button  mdl-color-text--white" id="interest1_id" disabled>${post.interest[0]} </button>` :
                      `<button class="mdl-button mdl-js-button  mdl-color-text--white" id="interest1_id" disabled>${post.interest[0]} </button>
                      <button class="mdl-button mdl-js-button mdl-color-text--white" id="interest2_id" disabled>${post.interest[1]}</button>`}
                     `
                     +
                     `

                     </div>
                     <br><br>
                  </form>
                  <div class="f">
                  <h2 class="mdl-card__title-text mdl-color-text--black" id='date_posted'>${post.created}</h2>
                  </div>
                  <br>
                     <!--  LIKE DISLIKE FOR POST -->
                     <br>
                    <div id="button_div${i}">
                     ${button}
                    <button class="more mdl-button mdl-js-button mdl-button--raised mdl-shadow--5dp"  id="more_btn" onclick="postDetail('${post.id}');">
                    <img src="./css/images/more_icon.png" id="more_icon"></img><span> More</span>
                    </button>
                    </div>

                    <!-- Like dislike double click -->
                    <script>
                        //checks for double click on like button
                        $("#btn_like"+${i}).on('click',function(){
                            var $button=$(this);
                            if ($button.data('alreadyclicked')){
                                $button.data('alreadyclicked', false); // reset


                                if ($button.data('alreadyclickedTimeout')){
                                    clearTimeout($button.data('alreadyclickedTimeout')); // prevent this from happening
                                }

                                // do what needs to happen on double click
                                document.getElementById("like-Modal").style.display = "block";
                            }else{
                                $button.data('alreadyclicked', true);

                                var alreadyclickedTimeout=setTimeout(function(){
                                    $button.data('alreadyclicked', false); // reset when it happens

                                    $('#action').val('Was single clicked');
                                    likePost('${post.id}', ${i});
                                },300); // <-- dblclick tolerance here
                                $button.data('alreadyclickedTimeout', alreadyclickedTimeout); // store this id to clear if necessary
                            }
                            return false;
                        });

                        //checks for double click on dislike button
                        $("#btn_dislike"+${i}).on('click',function(){
                            var $button=$(this);
                            if ($button.data('alreadyclicked')){
                                $button.data('alreadyclicked', false); // reset


                                if ($button.data('alreadyclickedTimeout')){
                                    clearTimeout($button.data('alreadyclickedTimeout')); // prevent this from happening
                                }

                                // do what needs to happen on double click.
                                document.getElementById("like-Modal").style.display = "block";

                            }else{
                                $button.data('alreadyclicked', true);

                                var alreadyclickedTimeout=setTimeout(function(){
                                    $button.data('alreadyclicked', false); // reset when it happens

                                    $('#action').val('Was single clicked');
                                    dislikePost('${post.id}', ${i});
                                },300); // <-- dblclick tolerance here
                                $button.data('alreadyclickedTimeout', alreadyclickedTimeout); // store this id to clear if necessary
                            }
                            return false;
                        });
                    </script>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
                    <script type="text/javascript"></script>
                  <br>
            </span>
     </div>`
    );
}

/**
 * Function which hides the Like alert
 */
function hideLikeAlert(){
    document.getElementById("like-Modal").style.display =  "none";
}

/**
 * Function which hides the Video alert
 */
function hideVideoAlert(){
    document.getElementById("video-Modal").style.display =  "none";
}

/**
 * Function which hides the Interest alert
 */
function hideInterestAlert(){
    document.getElementById("interest-Modal").style.display =  "none";
}

/**
 * Function which hides the deleted post alert
 */
function hideDeletedPostAlert(){
    document.getElementById("deletedPost-Modal").style.display =  "none";
}

/**
 * A function which prints an array of post that user has favourited
 * @param {*} current_user_posts a list of user's personal posts
 * @param {*} buttons_index an indicator for like and dislike button
 */
async function printUserFavouritePosts(current_user_posts, buttons_index){
    let post_arr = [];
    let fav_post_arr =[];
    let users_arr = [];
    let data_list = [];
    let button_nums = [];

    //gets the posts with the like/dislike by the logged in user
    await firebase.database().ref('likesDislikes')
        .once('value', x => {
            x.forEach(data => {
                if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                    data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
                }
            })
        }).then(async ()=>{
            await firebase.database().ref(`posts`)
                .orderByChild(`users_favourite`)
                    .once('value', x => {
                        x.forEach(data => {
                            //check whether there is an attribute users favourite in teh database
                            let hasFavouriteAttribute = data.hasChild("users_favourite");
                            if (hasFavouriteAttribute){
                                users_arr = data.val()["users_favourite"];
                                let current_user_exist = false;
                                //checks whether the current user is in list of users who favourited the post
                                for(let i = 0; i < users_arr.length; i++){
                                    if (users_arr[i] == current_user["phone"]){
                                        current_user_exist = true
                                    }
                                }
                                // if found user favourite a post, push post into fav post arr
                                if (current_user_exist){
                                    fav_post_arr.push(data.val());
                                }
                            }
                        });
                        //eliminates duplicates
                        fav_post_arr.forEach(fav_post => {
                            let duplicate = false;

                            for (let i = 0; i < current_user_posts.length; i++){
                                if (current_user_posts[i]["id"] == fav_post["id"]){
                                    duplicate = true
                                }
                            }

                            //if not duplicates found
                            if (!duplicate){
                                post_arr.push(fav_post);
                                postNamesFeed.push(fav_post.title);
                            }
                        })
                    }).then(()=>{
                        //likes and dislikes
                        for (let k =0; k<post_arr.length; k++){
                            let button_num=0
                            for (let i =0; i<data_list.length; i++) {
                                if(data_list[i][0] == post_arr[k]["id"]){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                            }
                            button_nums.push(button_num);
                        }
                        
                                for(let i=post_arr.length-1; i>=0 ; i--){

                                    printPost(post_arr[i], button_nums[i], buttons_index)
                                    buttons_index++;
                                }

        })
      })

      // return a value one to specify the function has completed
      if(post_arr.length == 0){
          return true; // return true to specify its empty
      }
      else{
        return false; // specifies the list favs is not empty
      }
      
}

/**
 * Prints the posts which are created the logged in user from the firebase to the screen.
 * @returns none
 */
function printUserPosts(){
    //disables the tabs till all the posts are loaded
    $("#radio-0").attr("disabled",true);
    $("#radio-2").attr("disabled",true);


    postNamesFeed = [];



    $('#resNum').html(``);
    document.getElementById("searchBox").value = ""; // clear search box

    $('#create_post').text(''); // clear create post ui area
    $('#postField').text(''); // emtpy the field of any previous posts

    let data_list = [];
    let button_nums = [];
    let posts = [];

    //gets the posts with the like/dislike by the logged in user
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }
        })
    }).then(()=>{
        //get all the posts from the firebase
        firebase.database().ref('posts')
            .orderByChild('username')
                .equalTo(current_user['username'])
                    .once('value', x => {
                        x.forEach(data => {
                            let button_num=0
                            for (let i =0; i<data_list.length; i++) {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{ //disliked
                                        button_num=-1
                                    }
                                }
                            }
                            button_nums.push(button_num);
                            posts.push(data.val());
                            postNamesFeed.push(data.val().title);
                        });

                    }).then(()=>{
                        for(let i=posts.length-1; i>=0 ; i--){
                            //print posts
                            printPost(posts[i], button_nums[i], i )
                        }


                    }).then(async function(){
                        //print user favourites
                        let favouritePostEmpty = await printUserFavouritePosts(posts,button_nums.length);

                             // Reenable the other tabs
                           // $("#radio-0").attr("disabled",false);
                            //$("#radio-2").attr("disabled",false);
                            document.getElementById("radio-0").disabled = false;
                            document.getElementById("radio-2").disabled = false;

                            if(posts.length == 0 && favouritePostEmpty){
                                $('#resNum').html('<h4>0 Posts in this section</h4>');
                            }

                    });
    });
}

/**
 * Function used to search forum posts in feed. A parameter is typed (interest or a name of the post)
 * @param {param} a search parameter. Could be one of the two. Post title, or interest linked to a post.
 * @returns Nothing. The function automatically updates the screen with relevant posts.
 */
 function searchAllPosts(param){

    document.getElementById("autocomplete").innerHTML = ""; // empty autocomplete

    let printPostCount = 10; // start printing 10 posts first
    let printStartIndex;
    let data_list = [];
    let toPrint =[];
    let button_nums = []
    let posts = [];

    let tab = document.getElementsByName("tabs");

    if(tab[1].checked){  // if the navigated tab is "Your feed", delegate the work to the helper function for user's posts
        searchYourPosts(param);
        return
    }
    else if(tab[0].checked){ // if the navigation tab is trending posts, delegate the work to the helper function for recommender posts
        searchTrendingPosts(param);
        return;
    }

    if(!param.replace(/\s/g, '').length){  //check if only contains white spaces
        printAllPosts();
        return // exit function
    }

    //$('#postField').html(''); // emtpy the field of any previous posts

    document.getElementById("postField").innerHTML = '';


    //gets the posts with the like/dislike by the logged in user
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  )  // push the post key into list
            }
        })
    }).then(()=>{
        let button_num=0
        firebase.database().ref(`posts`).orderByChild('title')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {
                    for (let i =0; i<data_list.length; i++) {
                        if (data.val()['id']==data_list[i][0])
                        {
                            if(data_list[i][0] == data.key){  // if an action was performed on this post
                                if(data_list[i][1] == 1) { // liked
                                    button_num=1
                                }
                                else{ //disliked
                                    button_num=-1
                                }
                            }
                        }
                    }
                    button_nums.push(button_num);
                    if(data.val().username != undefined){ // only if created by a user
                        posts.push(data.val());
                        toPrint.push(data.val().id);  // get the post id
                    }
                })
            })
        //find interests in posts
        firebase.database().ref(`posts`).orderByChild('interest/0')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {
                    for (let i =0; i<data_list.length; i++) {
                        if (data.val()['id']==data_list[i][0])
                        {
                            if(data_list[i][0] == data.key){  // if an action was performed on this post
                                if(data_list[i][1] == 1) { // liked
                                    button_num=1
                                }
                                else{
                                    button_num=-1
                                }
                            }
                        }
                    }
                    button_nums.push(button_num);

                    if(!toPrint.includes(data.val().id) && data.val().username != undefined){ // push only if its not yet being printed
                        posts.push(data.val());
                        toPrint.push(data.val().id);
                    }
                })
            })

        firebase.database().ref(`posts`).orderByChild('interest/1')
            .startAt(param)
                .endAt(param+"\uf8ff").once("value", x=> {
                    x.forEach(data => {
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{ //disliked
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        if(!toPrint.includes(data.val().id) && data.val().username != undefined){ // push only if its not yet being printed
                            posts.push(data.val());
                            toPrint.push(data.val().id);
                        }
                    })
                }).then(()=>{
                    printStartIndex = posts.length-1;

                    //$('#resNum').html(`<h3>${printStartIndex+1} Results Found<h3>`);

                    document.getElementById("resNum").innerHTML = `${printStartIndex+1} Results Found`;

                    printPostQuan(printStartIndex, printPostCount, posts, button_nums);
                });
    })
}


/**
 * Function used to search forum posts in "Your posts". A parameter is typed (interest or a name of the post)
 * @param {param} a search parameter. Could be one of the two. Post title, or interest linked to a post.
 * @returns Nothing. The function automatically updates the screen with relevant posts.
 */
function searchYourPosts(param){
    let data_list = [];
    let button_nums = []
    let posts = [];
    //let field = document.getElementById("#postField");
    let toPrint = [];


    if(!param.replace(/\s/g, '').length){  //check if only contains white spaces
        printUserPosts();
        return // exit function
    }

    //$('#postField').html(""); // emtpy the field of any previous posts

    document.getElementById("postField").innerHTML = '';

    //gets the posts with the like/dislike by the logged in user
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  ) ; // push the post key into list
            }
        })
    }).then(()=>{
        let button_num=0
        firebase.database().ref(`posts`).orderByChild('title')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {
                    let userFav = [];

                    if(data.val().users_favourite != undefined){ // no favs on the post
                        userFav= data.val().users_favourite; //get all users favs
                    }

                    if(data.val().username == current_user["username"] || userFav.includes(current_user["phone"])){
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        posts.push(data.val());
                        toPrint.push(data.val().id);
                    }
                })
            })
        //find interests in posts
        firebase.database().ref(`posts`).orderByChild('interest/0')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {

                    let users_fav = data.val().users_favourite // all the users who favourited the post

                    if(users_fav == undefined){
                        users_fav = [];
                    }

                    if(data.val().username == current_user["username"] || users_fav.includes(current_user["phone"])){
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        if(!toPrint.includes(data.val().id)){ // push only if its not yet being printed
                            posts.push(data.val());
                            toPrint.push(data.val().id);
                        }
                    }
                })
            })

        firebase.database().ref(`posts`).orderByChild('interest/1')
            .startAt(param)
                .endAt(param+"\uf8ff").once("value", x=> {
                    x.forEach(data => {

                        let users_fav = data.val().users_favourite // all the users who favourited the post

                        if(users_fav == undefined){
                            users_fav = [];
                        }
                        if(data.val().username == current_user["username"] || users_fav.includes(current_user["phone"])){
                            for (let i =0; i<data_list.length; i++) {
                                if (data.val()['id']==data_list[i][0])
                                {
                                    if(data_list[i][0] == data.key){  // if an action was performed on this post
                                        if(data_list[i][1] == 1) { // liked
                                            button_num=1
                                        }
                                        else{
                                            button_num=-1
                                        }
                                    }
                                }
                            }
                            button_nums.push(button_num);
                            if(!toPrint.includes(data.val().id)){ // push only if its not yet being printed
                                posts.push(data.val());
                                toPrint.push(data.val().id);
                            }
                        }
                    })
                }).then(()=>{
                    //printing posts
                    let i =0;
                    for(i=posts.length-1; i>=0 ; i--){
                        printPost(posts[i], button_nums[i], i )
                    }

                    //$('#resNum').html(`<h3>${posts.length-1-i} Results Found<h3>`);

                    document.getElementById("resNum").innerHTML =`${posts.length-1-i} Results Found`;


                    // if(i == posts.length-1){
                    //     $('#postField').append(`<h2>No results found<h2>`); // no results found
                    // }

                });
            })
}

/**
 * Function used to search forum posts in "Your posts". A parameter is typed (interest or a name of the post)
 * @param {param} a search parameter. Could be one of the two. Post title, or interest linked to a post.
 * @returns Nothing. The function automatically updates the screen with relevant posts.
 */
 function searchTrendingPosts(param){
    let data_list = [];
    let button_nums = []
    let posts = [];
    let toPrint = [];

    let printStartIndex;
    let printPostCount = 10;


    if(!param.replace(/\s/g, '').length){  //check if only contains white spaces
        printThread();
        return // exit function
    }

    //$('#postField').html(``); // emtpy the field of any previous posts

    document.getElementById("postField").innerHTML = '';


    //gets the posts with the like/dislike by the logged in user
    firebase.database().ref('likesDislikes')
    .once('value', x => {
        x.forEach(data => {
            if(data.val()[`${current_user["username"]}`] != undefined){ // if the user performed an action on the post
                data_list.push( [data.key , data.val()[`${current_user["username"]}`].action]  ) ; // push the post key into list
            }
        })
    }).then(()=>{
        let button_num=0
        firebase.database().ref(`posts`).orderByChild('title')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {
                    if(data.val().users_favourite != undefined){ // no favs on the post
                        userFav= data.val().users_favourite; //get all users favs
                    }
                    if(data.val().recommender == true){
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        posts.push(data.val());
                        toPrint.push(data.val().id);
                    }
                })
            })
        //find interests in posts
        firebase.database().ref(`posts`).orderByChild('interest/0')
        .startAt(param)
            .endAt(param+"\uf8ff").once("value", x=> {
                x.forEach(data => {

                    if(data.val().recommender == true){
                        for (let i =0; i<data_list.length; i++) {
                            if (data.val()['id']==data_list[i][0])
                            {
                                if(data_list[i][0] == data.key){  // if an action was performed on this post
                                    if(data_list[i][1] == 1) { // liked
                                        button_num=1
                                    }
                                    else{ //disliked
                                        button_num=-1
                                    }
                                }
                            }
                        }
                        button_nums.push(button_num);
                        if(!toPrint.includes(data.val().id)){ // push only if its not yet being printed
                            posts.push(data.val());
                            toPrint.push(data.val().id);
                        }
                    }
                })
            })

        firebase.database().ref(`posts`).orderByChild('interest/1')
            .startAt(param)
                .endAt(param+"\uf8ff").once("value", x=> {
                    x.forEach(data => {

                        let users_fav = data.val().users_favourite // all the users who favourited the post

                        if(data.val().recommender == true){
                            for (let i =0; i<data_list.length; i++) {
                                if (data.val()['id']==data_list[i][0])
                                {
                                    if(data_list[i][0] == data.key){  // if an action was performed on this post
                                        if(data_list[i][1] == 1) { // liked
                                            button_num=1
                                        }
                                        else{ //disliked
                                            button_num=-1
                                        }
                                    }
                                }
                            }
                            button_nums.push(button_num);

                            if(!toPrint.includes(data.val().id)){ // push only if its not yet being printed
                                posts.push(data.val());
                                post_names.push(data.val().title);
                                toPrint.push(data.val().id);
                            }
                        }
                    })
                }).then(()=>{
                    //if no results found print 0 results found
                    printStartIndex = posts.length-1;

                    document.getElementById('resNum').innerHTML = `${printStartIndex+1} Results Found`;
                    printPostQuan(printStartIndex, printPostCount, posts, button_nums);
                });
            })
}

/**
 * Allows to like a post, updating the firebase and UI accordingly
 * @param {string} post_id the id of the post to be liked
 * @param {number} i the index of the post on the page
 * @returns Nothing. The function automatically updates the screen with liked post
 */
async function likePost(post_id, i) {

    if (await checkPostExists(post_id) == 0){ // if doesnt exist
        // give an alert
        document.getElementById("deletedPost-Modal").style.display = "block";
        return;
    }

    like_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("like")[0]
    dislike_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("dislike")[0]

    let res = await checkForLikeDislike(post_id);
    if (!res) {
        // if there is no action at all, lilke
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({
            action: 1
        }).then(() => {
            updateLikes(post_id, 1) // add 1 like
        });

        // UI
        like_btn_addr.style.background='#2bbd7e';
        like_btn_addr.style.color='white';

        //increase like count
        current_value=like_btn_addr.value
        new_value=parseInt(current_value)+1
        like_btn_addr.value=new_value
        $('#button_div'+i).find('.number_of_likes').html(new_value);





    } else {
        // if there is action
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}/action`).once('value', (snapshot) => {
            let current_state = snapshot.val();
            if (current_state == -1) {
                // if action is dislike
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({
                    action: 1
                }).then(() => {
                    updateLikes(post_id, 1) // add 1 like
                    updateDislikes(post_id, -1)
                });

                // UI
                like_btn_addr.style.background='#2bbd7e';
                like_btn_addr.style.color='white';
                dislike_btn_addr.style.background='#dadada';
                dislike_btn_addr.style.color='black';

                // increase like count
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)+1
                like_btn_addr.value=new_value
                $('#button_div'+i).find('.number_of_likes').html(new_value);
                //decrease dislike count
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)-1
                dislike_btn_addr.value=new_value
                console.log(dislike_btn_addr.value)
                $('#button_div'+i).find('.number_of_dislikes').html(new_value);
            }
            else {
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).remove();
                updateLikes(post_id, -1)  // remove 1 like
                //UI
                like_btn_addr.style.background='#dadada';
                like_btn_addr.style.color='black';
                // change like number
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)-1
                like_btn_addr.value=new_value
                $('#button_div'+i).find('.number_of_likes').html(new_value);
            }
        })
    }
}

/**
 * Allows to dislike a post, updating the firebase and UI accordingly
 * @param {string} post_id the id of the post to be disliked
 * @param {number} i the index of the post on the page
 * @returns none
 */
async function dislikePost(post_id, i)
{

    if (await checkPostExists(post_id) == 0){ // if doesnt exist
        // give an alert
        document.getElementById("deletedPost-Modal").style.display = "block";
        return;
    }

    like_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("like")[0]
    dislike_btn_addr=document.getElementById("button_div"+i).getElementsByClassName("dislike")[0]

    let res = await checkForLikeDislike(post_id);

    if (!res){
        // if there is no action at all
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({ action: -1}).then(()=>{
            // add 1 dislike
            updateDislikes(post_id, 1)
        });

        // UI
        dislike_btn_addr.style.background='#e53935';
        dislike_btn_addr.style.color='white';

        //increase dislike count
        current_value=dislike_btn_addr.value
        new_value=parseInt(current_value)+1
        dislike_btn_addr.value=new_value

        $('#button_div'+i).find('.number_of_dislikes').html(new_value);
    }
    else{
        // if there is action
        firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}/action`).once('value', (snapshot) => {
            let current_state=snapshot.val();
            if (current_state==1){
                // if action is like
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).set({action: -1}).then(()=>{
                    // add 1 dislike and remove 1 like
                    updateDislikes(post_id, 1)
                    updateLikes(post_id,-1)
                });
                // UI
                like_btn_addr.style.background='#dadada';
                like_btn_addr.style.color='black';
                dislike_btn_addr.style.background='#e53935';
                dislike_btn_addr.style.color='white';

                // increase dislike count
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)+1
                dislike_btn_addr.value=new_value
                $('#button_div'+i).find('.number_of_dislikes').html(new_value);

                //decrease like count
                current_value=like_btn_addr.value
                new_value=parseInt(current_value)-1
                like_btn_addr.value=new_value

                $('#button_div'+i).find('.number_of_likes').html(new_value);
            }
            else{
                // remove 1 dislike
                updateDislikes(post_id, -1)
                firebase.database().ref(`likesDislikes/${post_id}/${current_user["username"]}`).remove();
                // UI
                // change color
                dislike_btn_addr.style.background='#dadada';
                dislike_btn_addr.style.color='black';
                // change dislike number
                current_value=dislike_btn_addr.value
                new_value=parseInt(current_value)-1
                dislike_btn_addr.value=new_value
                $('#button_div'+i).find('.number_of_dislikes').html(new_value);
            }
        })
    }
}

/**
 * Redirects the user to more detailed post information page.
 * @param {string} id the id of the post to be redirected to
 */
async function postDetail(id) {
        let exist = ":"
        exist = await checkPostExists(id);
        if(exist == 1){
            window.location = "post.html" + "?post_id=" + id;
        }
        else{
            // give an alert that the post doesnt exist
            document.getElementById("deletedPost-Modal").style.display = "block";
            return; 
        }
}


