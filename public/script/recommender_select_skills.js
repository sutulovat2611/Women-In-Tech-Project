let phoneNum = "";

// Function to open the content (skills list) under each interest
function openInterest(event, interest) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(interest).style.display = "block";
    event.currentTarget.className += " active";

}

document.getElementById("defaultOpen").click();  // get the element with id="defaultOpen" and click on it

// Function to check for the user's details in local storage
function checkCurrentUser(){
    let getUser = localStorage.getItem("USER");
    let getUserObject = JSON.parse(getUser);

    if(getUserObject === null){
        console.log("Nothing in local storage");
    }
    else{
        phoneNum = getUserObject['phone'];
        console.log(phoneNum);

        // Display the username on the page
        let usernameDisplay = document.getElementById('username');
        usernameDisplay.innerHTML = "Hello, " + getUserObject['username'] + ". Select the skill you are interested to watch";
    }
}

// Function to store a user's current skill to the database
function storeCurrentSkill(id){
    let skill = document.getElementById(id);
    let skillTxt = [skill.value];
    let stringPath = "users/" + phoneNum;
    let userRef = firebase.database().ref(stringPath);
    let time = Date.now();

    id = id.split("Radio");
    id = id[1];

    skillTxt = JSON.stringify(skillTxt);
    localStorage.setItem("preference", skillTxt);
    // userRef.update({ preferences: skillTxt });  // add or modify the preferences property to the user

    console.log("Store function triggered");

    // Code for updating data on which skills have been selected and when
    firebase.database().ref('recommenderData').child(`skills/`).once("value", function (snapshot) {
        if (snapshot.exists()) {
            currentSkills = snapshot.val();

            // Check if the skill has previously been selected on the database, update if so
            if (currentSkills[skill.value] != undefined){
                currentSkills[skill.value].selectedAmount += 1;
                //currentSkills[skill.value].selectedTime[time] = time;
            }
            
            // Else if this is the first time skill is being selected
            else {
                //let selectedTime = {}
                //selectedTime[time] = time;
                
                let newSkillCombine = {
                    favouritedAmount: 0,
                    selectedAmount: 1,
                    //selectedTime: selectedTime
                }

                currentSkills[skill.value] = newSkillCombine;
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

    if (localStorage.getItem("playlist") != null){
        localStorage.removeItem("playlist");
        console.log("here")
    }

    setInterval(function(){
        location.href = "recommender_Ui.html";
    }, 2000); // redirect to recommender page after 2 seconds
}

function goToRecommender(id){
    document.getElementById(id).checked = true;
    storeCurrentSkill(id);
}

checkCurrentUser();
