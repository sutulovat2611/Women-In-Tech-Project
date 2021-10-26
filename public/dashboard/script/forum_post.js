

let posts;
let postid;
let numOfPostsUsers;
let numOfPostsRecommender;

let currentPost;  // holds the current post id or undefined





window.onload = execute();

async function execute(){
    var post_id = localStorage.getItem("POST_ID");

    if (post_id != "null" && post_id != null){
      // onload function

      await collectPosts().then(()=>{

          updateUI(post_id);
          $("#searchInput").val(`${post_id}`);

          $('#searchInput').autocomplete({
            source : postid,
        }).attr('style', 'max-height: 40px; overflow-y: auto; overflow-x: hidden;');


        });
    } else if(post_id == "null" || post_id == null){
        // onload function
        await collectPosts().then(()=>{

            updateUI(null);
            // autocomplete(document.getElementById("searchInput"), postid);


            $('#searchInput').autocomplete({

                source : postid,
            }).attr('style', 'max-height: 40px; overflow-y: auto; overflow-x: hidden;');


            });
        }
      localStorage.removeItem("POST_ID");

}



/**
 * Function used to collect all the posts into an array from firebase
 */
async function collectPosts(){


    posts = []; // reset posts to 0 / initialize to a list
    postid = [];
    numOfPostsRecommender=0;
    numOfPostsUsers=0;

    await firebase.database().ref('posts')
    .once('value', x => {
        x.forEach(data => {
            posts.push(data.val()); //pus  h the data to the list
            postid.push(data.val().id);
            if(data.val().recommender)
                numOfPostsRecommender++;
            else
                numOfPostsUsers++;
        })


    });
}


/**
 * Function used to update all the data on the user interface
 */
function updateUI(postId){



    collectPosts().then(()=>{

        $("#postsByUsers").html(`<h3>${numOfPostsUsers}</h3>`);
        $("#postsByRecommender").html(`<h3>${numOfPostsRecommender}</h3>`);




    if(postId==null || postId == undefined || postId == "null"){
        return // exit
    }




    let post;

    for (let i =0; i<posts.length ;i++){
        if(posts[i].id == postId){
            post = posts[i]
            break; //break out of the loop when found the unique key
        }
    }

    if(post == undefined){
        $("#qerr").html("Invalid Post Id");
        return;
    }
    else{
        $("#qerr").html("");
    }

    //else continue to show data



    // description table
    let url;
    let creator;
    let interests;

    currentPost = postId;

    if(post.username != undefined){
        creator = post.username;
    }
    else{
        creator = "Recommender";
    }


    if(post.interest.length == 2){
        interests = post.interest[0] + ", " + post.interest[1]
    }
    else{
        interests = post.interest[0]
    }


    if(post.videoURL == 0){
        url = "No video attached"
    }
    else{
        url = post.videoURL;
    }



    $("#summaryPostTitle").html(`Summary of ${postId} post`)

    $("#postDetailTable").html(`
                <table class="table table-bordered">
                <tr>
                    <th>POST TITLE</th>
                    <td>${post.title}</td>
                </tr>

                <tr>
                    <th>DESCRIPTION</th>
                    <td>${post.description} </td>
                </tr>

                <tr>
                    <th>VIDEO LINK</th>
                    <td>${url}</td>
                </tr>

                <tr>
                    <th>CREATOR or RECOMMENDED</th>
                    <td>${creator}</td>
                </tr>

                <tr>
                    <th>APPLIED INTERESTS</th>
                    <td>${interests}</td>
                </tr>

            </table>
            <a href="https://fit3170-49455.web.app/post_view.html?post_id=${postId}">
                <div> <button class='btn btn-primary'> Go to Post </button> </div>
            </a>
            `);


    // chart
    $("#statsTitle").html(`Overall statistics of ${postId} post`)
    $("#chart").html(`<canvas id="myChart"></canvas>`);

    var xValues = ["Likes", "Dislikes", "Comments & Replies", "User's Favourited"];


    // get y values
    let likes=0;
    let dislikes=0;
    let comments=0;
    let favourited=0;
    // get likes
    likes = post.likes;
    //get dislikes
    dislikes = post.dislikes;
    // get favourites
    if(post.users_favourite != undefined)
        favourited = post.users_favourite.length

    //get comments
    firebase.database().ref('comments')
    .orderByChild('postID')
        .equalTo(post.id)
            .once('value', x => {
                x.forEach(data => {
                    comments++;
                });

            }).then(()=>{

                firebase.database().ref('replies')
                .orderByChild('postID')
                    .equalTo(post.id)
                        .once('value', x => {
                            x.forEach(data => {
                                comments++;
                            });

                        })



                let yValues = [likes, dislikes, comments, favourited]
                var barColors = ["#00ac3e", "#ff7c00","#006dae","#c00095"];

                new Chart("myChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                    }]
                },
                options: {
                    legend: {display: false}
                  }
                });


            })
        })

  
}







// update posts on an interval (10 sec) to mimic realtime dashboard
setInterval(
    async function(){
    collectPosts().then(()=>{
        //call function to update all the ui fields
        updateUI(currentPost);
    });


}, 30000);
