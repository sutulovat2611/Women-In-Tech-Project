/**
 * This file contains functions and variables used in the history tab.
 * @author Morad
 */

let logDate = null;
let logAttempt = null;
let longQueId = null;

/**
 * function to display buttons for each MCQ question's answer options
 * only used for MCQ questions
 */
function loadOptions(){
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;

    var x = document.getElementById("Dropdown");
    x.options.length = 0;
    const collectionRef = firebase.firestore().collection(userID);
    collectionRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var option = document.createElement("option");
                // Splitting the year month and day from date
                var ymd = doc.id.split("-");
                var dateString = ymd[0] + "-" + ("0" + ymd[1]).slice(-2) + "-" + ("0" + ymd[2]).slice(-2);
                option.text = dateString;
                x.add(option);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

/**
 * function to display history log's dropdown date
 */
function dates(){
    document.getElementById("Dropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/**
 *
 */
function selectdate(){
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;

    var mylist = document.getElementById('Dropdown');
    const collectionRef = firebase.firestore().collection(userID).doc(mylist.options[mylist.selectedIndex].text);
    collectionRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data().set_id);
            if (document.contains(document.getElementById("attempt"))) {
                document.getElementById("attempt").remove();
                document.getElementById("label_id").remove();
            }
            var select = document.createElement("select");
            select.id = "attempt";
            select.class = "dropbtn";
            var label = document.createElement("label");
            label.id = "label_id";
            for (var i = 0;i<=doc.data().set_id;i++){
                var option = document.createElement("option");
                option.value = i+1;
                option.text = i+1;
                select.appendChild(option);
            }
            label.innerHTML = "Choose which attempt you'd like to view: "
            label.htmlFor = "attemptsection";

            document.getElementById("attemptsection").appendChild(label).appendChild(select);
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    logDate = mylist.options[mylist.selectedIndex].text;
}

/**
 * function to select which attempt is going to be displayed in history chatlog
 */
function selectattempt(){
    var mylist = document.getElementById('attempt');
    logAttempt = mylist.options[mylist.selectedIndex].text;

    let log = document.getElementById('logs');
    log.innerHTML = "";

    showlog();
}

/**
 * function to display which old survey is going to be displayed in history page
 */
function showlog(){
    let phone = currentUser.phoneNumber;
    let userID = phone === undefined ? currentUser.email : phone;

    const collectionRef = firebase.firestore().collection(userID).doc(logDate).collection('responses').orderBy('timestamp').where('set_id','==',parseInt(logAttempt-1));
    collectionRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().longQuestionId!=null && doc.data().longQuestionId!=longQueId){
                    longQueId = doc.data().longQuestionId;
                    firebase.firestore().collection('chatbot').doc('survey_questions').collection('questions').doc(longQueId).get().then((doc) => {
                        console.log("long question:", doc.data().question);
                        showQuestionLog(doc.data().question);
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                }
                console.log(doc.id, " => ", doc.data().question);
                showQuestionLog(doc.data().question);
                showAnswerLog(doc.data().answer);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

/**
 * function to add a message in history log under chatbot.
 * @param message
 */
function showQuestionLog(message) {
    logs.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender " + messageHistoryColour + "'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
    changeMessageHistoryColour();
}

/**
 * function to add a message in history log under user.
 * @param message
 */
function showAnswerLog(message) {
    logs.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container receiver'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
}
