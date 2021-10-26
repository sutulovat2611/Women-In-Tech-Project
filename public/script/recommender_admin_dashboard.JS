// Runs on page load
// Initializing variables
var current_user = JSON.parse(localStorage.getItem("USER"));
var playlist = [];
var player = null;
loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js", drawChart);

// Function to update watch history of specific user in database
function updateFirebase(video_list, current_user, child_name) {
    firebase.database().ref('users').child(`${current_user.phone}`).child(child_name).set(
        video_list
        , function (error) {
            if (error) {
                console.log(error)
            }
        })
}

// Loading chart.js
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

// Drawing chart
function drawChart(){
    // Get number of favourites for each category
    let ictSkillTotal, socialSkillTotal, complimentarySkillTotal, workSkillTotal;
    let ictSkills = [0,0,0,0,0];
    let socialSkills = [0,0,0,0,0];
    let complimentarySkills = [0,0,0,0,0];
    let workSkills = [0,0,0,0,0];

    firebase.database().ref('recommenderData').child(`skills/`).once("value", function (snapshot) {
        if (snapshot.exists()) {
            currentSkills = snapshot.val();
            console.log(currentSkills);
            console.log(Object.keys(currentSkills));

            // Total ICT skills
            ictSkillTotal = 0;

            if (currentSkills["Email"] != undefined){
                ictSkills[0] = currentSkills["Email"].favouritedAmmount;
                ictSkillTotal += ictSkills[0];
            }
            if (currentSkills["Online collaboration"] != undefined){
                ictSkills[1] = currentSkills["Online collaboration"].favouritedAmmount;
                ictSkillTotal += ictSkills[1];
            }
            if (currentSkills["Search for information"] != undefined){
                ictSkills[2] = currentSkills["Search for information"].favouritedAmmount;
                ictSkillTotal += ictSkills[2];
            }
            if (currentSkills["Smartphone/tablet/computer use"] != undefined){
                ictSkills[3] = currentSkills["Smartphone/tablet/computer use"].favouritedAmmount;
                ictSkillTotal += ictSkills[3];
            }
            if (currentSkills["Social media use"] != undefined){
                ictSkills[4] = currentSkills["Social media use"].favouritedAmmount;
                ictSkillTotal += ictSkills[4];
            }
            
            console.log(ictSkillTotal);

            // Total Social Communication skills
            socialSkillTotal = 0;

            if (currentSkills["Active listening"] != undefined){
                socialSkills[0] = currentSkills["Active listening"].favouritedAmmount;
                socialSkillTotal += socialSkills[0];
            }
            if (currentSkills["Effective communication"] != undefined){
                socialSkills[1] = currentSkills["Effective communication"].favouritedAmmount;
                socialSkillTotal += socialSkills[1];
            }
            if (currentSkills["Negotiation"] != undefined){
                socialSkills[2] = currentSkills["Negotiation"].favouritedAmmount;
                socialSkillTotal += socialSkills[2];
            }
            if (currentSkills["Persuasion"] != undefined){
                socialSkills[3] = currentSkills["Persuasion"].favouritedAmmount;
                socialSkillTotal += socialSkills[3];
            }
            if (currentSkills["Relationship management"] != undefined){
                socialSkills[4] = currentSkills["Relationship management"].favouritedAmmount;
                socialSkillTotal += socialSkills[4];
            }
            
            console.log(socialSkillTotal);

            // Total Complimentary skills
            complimentarySkillTotal = 0;

            if (currentSkills["Art"] != undefined){
                complimentarySkills[0] = currentSkills["Art"].favouritedAmmount;
                complimentarySkillTotal += complimentarySkills[0];
            }
            if (currentSkills["Caregiving"] != undefined){
                complimentarySkills[1] = currentSkills["Caregiving"].favouritedAmmount;
                complimentarySkillTotal += complimentarySkills[1];
            }
            if (currentSkills["Cooking"] != undefined){
                complimentarySkills[2] = currentSkills["Cooking"].favouritedAmmount;
                complimentarySkillTotal += complimentarySkills[2];
            }
            if (currentSkills["Exercises"] != undefined){
                complimentarySkills[3] = currentSkills["Exercises"].favouritedAmmount;
                complimentarySkillTotal += complimentarySkills[3];
            }
            if (currentSkills["Professional writing"] != undefined){
                complimentarySkills[4] = currentSkills["Professional writing"].favouritedAmmount;
                complimentarySkillTotal += complimentarySkills[4];
            }

            console.log(complimentarySkillTotal);

            // Work-related skills
            workSkillTotal = 0;

            if (currentSkills["Collaboration and teamwork"] != undefined){
                workSkills[0] = currentSkills["Collaboration and teamwork"].favouritedAmmount;
                workSkillTotal += workSkills[0];
            }
            if (currentSkills["Critical thinking"] != undefined){
                workSkills[1] = currentSkills["Critical thinking"].favouritedAmmount;
                workSkillTotal += workSkills[1];
            }
            if (currentSkills["Entrepreneurship"] != undefined){
                workSkills[2] = currentSkills["Entrepreneurship"].favouritedAmmount;
                workSkillTotal += workSkills[2];
            }
            if (currentSkills["People and leadership"] != undefined){
                workSkills[3] = currentSkills["People and leadership"].favouritedAmmount;
                workSkillTotal += workSkills[3];
            }
            if (currentSkills["Personal selling"] != undefined){
                workSkills[4] = currentSkills["Personal selling"].favouritedAmmount;
                workSkillTotal += workSkills[4];
            }

            console.log(workSkillTotal);

            // Percentage of videos favourited, sorted by interest
            var chart1 = document.getElementById('totalInterestsChart');

            var oneChart = new Chart(chart1, {
                type: 'pie',
                data: {
                    labels: [
                        'ICT Skills',
                        'Social Skills',
                        'Complementary',
                        'Work skills'
                    ],
                    datasets: [{
                    label: 'Total skills favourited dataset',
                    data: [ictSkillTotal, socialSkillTotal, complimentarySkillTotal, workSkillTotal],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(32, 75, 86)'
                    ],
                    hoverOffset: 4
                    }]
                }
            });
            

        }
    })
}