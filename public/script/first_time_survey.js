// Caches the title question of the current sub-question
let titleQuestionString = null;

// Initializing variables
let messages = document.getElementById("messages");
let textBoxInput = document.getElementById("message");
let submit = document.getElementById("submit");
let input = document.getElementById("input-box");
let errorText = document.getElementById("error-text");
let messageHistoryColour = 'white';
let skippedToEnd = null;
let joinFutureResearchExist = null;
let otherChosen = false;
let MCQOptionIDs = [];
let possibleAnswersMCQ = [];
let othersAnswers = [];
let question_bubble_no = 0;
var speechSynth = window.speechSynthesis;
var voices = [];

// get user's selected language and set the questions branches id to the corresponding index for that language
let select_language = localStorage.getItem("LANGUAGE");

let branch_id;
if (select_language == "English") {
    branch_id = EN_INDEX;
} else if (select_language == "Chinese (Simplified)") {
    branch_id = ZH_CN_INDEX;
} else if (select_language == "Malay") {
    branch_id = MS_INDEX;
} else if (select_language == "Thai") {
    branch_id = TH_INDEX;
}

/*
The user object of the currently logged in user.

Can be used to retrieve details such as phone number
and user ID.
 */
let currentUser = null;
let currentQuestionId = null;
let currentQuestionObject = null;
let currentLongQuestionObject = null;

/*
Stores the index of the current question object.

Used to retrieve the current question object's ID from
QUESTION_IDS
 */
let questionIndex = 0;

/*
Used when displaying sub-questions
 */
let currentSubQuestionId = null;
let subQuestionIndex = 0;
let currentSubQuestionIds = null;

/*
Used for likert scale indexes of questions stored in firebase
 */
let agreeLikertQues = [13, 27]; //[1] Strongly Disagree [2] Disagree [3] Neutral [4] Agree [5] Strongly Agree
let satisfyLikertQues = [16]; //[0] Not Applicable [1] Very Dissatisfied [2] Dissatisfied [3] Neutral [4] Satisfied [5] Very Satisfied
let confidentLikertQues = [19,20,22]; //[0] Not Applicable [1] Not Confident At All [2] Somewhat Not Confident [3] Moderately Confident [4] Somewhat Confident [5] Extremely Confident
let interestedLikertQues = [25] //[1] Extremely Not Interested [2] Not Interested [3] Neutral [4] Interested [5] Extremely Interested

//translation
changeLang(select_language);

/**
 * onclick function for option buttons.
 * This functions displays and records the response of the MCQ answer option clicked from user.
 * @param button The option button
 */
function select(button, index) {
    // clear any error message
    errorText.innerHTML = "";

    // get selected button's text
    let choice = currentQuestionObject.restrictions.choices[index-1];

    // format choice html text bubble
    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver notranslate">\
                                <p>' + choice + '</p>\
                            </div>\
                        </div>';

    // disable clicked button and other button options from MCQ question
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }

    // display user's choice on chat
    messages.innerHTML += ansTemplate;

    // extract skip target and skip choices from currentQuestionObject
    let skipTarget = currentQuestionObject.restrictions.skipTarget;
    let skipChoices = currentQuestionObject.restrictions.skipChoices;

    // check the type of skip target
    if (skipTarget === SKIP_NOT_ALLOWED) {
        // Don't skip next question
        let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
        setTimeout(() => {nextQuestion(); saveResponse(index-1);}, delay);
    } else if (skipTarget === SKIP_END_SURVEY) {
        // check if one of the skipChoices were selected. If so, end survey
        if (skipChoices.includes(choice)) {
            endSurvey(index-1);
        } else { // else move onto the next question
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => {nextQuestion(); saveResponse(index-1);}, delay);
        }
    } else {
        // Skip to a question ID if the selected answer is in skipChoices
        if (skipChoices.includes(choice)) {
            // display the next question after a small delay
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;

            setTimeout(() => {
                // increment subQuestionIndex to be like nextQuestion call
                subQuestionIndex++;

                // save index of choice onto firebase
                saveResponse(index-1);

                // set currentQuestionId to skipTarget
                currentQuestionId = skipTarget;

                // Set the current question index to the question before the
                // skip target since nextQuestion increments
                // the question index by 1
                questionIndex = QUESTION_IDS[branch_id].indexOf(skipTarget) - 1;

                // In case the user was answering a long question,
                // reset params related to long questions
                currentSubQuestionIds = null;

                nextQuestion();

                // call sync progress to update currentSubQuestionIds and questionID after nextQuestion
                syncProgress();
                }, delay);
        } else {
            // display the next question after a small delay
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => {nextQuestion(); saveResponse(index-1);}, delay);
        }
    }

    // scroll to bottom of chat log
    scrollToBottom();
}

/**
 * Function to add the user textbox input as a chat bot message
 */
function addMessage() {
    let message = input.value;
    let type = currentQuestionObject.type;

    // check if the input is valid
    if (message.length > 0) {
        if (type ===TYPE_MULTIPLE_CHOICE ||
            type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION){
            message = message.trim();

            // getting which index does message correspond to in currentQuestionObject.restrictions.choices based on possibleAnswersMCQ
            for (let i = 0; i < possibleAnswersMCQ.length; i++) {
                if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
                    select(document.getElementById(MCQOptionIDs[i]), i+1);
                    break;
                }
            }
        }
        else if (type === TYPE_MULTIPLE_CHOICE_OTHERS) {
            message = message.trim();

            // check if others option was chosen
            if (otherChosen) {
                // resets otherChosen
                otherChosen = false;

                // display input
                showMessageReceiver(message);

                // display next question after time delay and scroll to bottom of screen
                let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
                setTimeout(() => {nextQuestion(); saveResponse((currentQuestionObject.restrictions.choices.length - 1) + ". " + message);}, delay);
                scrollToBottom();
            }
            else {
                // getting which index does message correspond to in currentQuestionObject.restrictions.choices based on possibleAnswersMCQ
                for (let i = 0; i < possibleAnswersMCQ.length; i++) {
                    if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
                        select(document.getElementById(MCQOptionIDs[i]), i+1);
                        break;
                    }
                }
            }
        }
        else if(type === TYPE_NUMERIC || type === TYPE_NUMERIC_SUB_QUESTION){
            // Saving the response before clearing the input box
            let numInput = input.value;

            // display input
            showMessageReceiver(message);

            if (currentQuestionObject.restrictions.skipIfInvalid) {
                if (currentQuestionObject.restrictions.skipTarget !== SKIP_END_SURVEY) {
                    if (currentQuestionObject.restrictions.skipTarget !== SKIP_NOT_ALLOWED && (parseInt(numInput) < currentQuestionObject.restrictions.lowerRange || parseInt(numInput) > currentQuestionObject.restrictions.upperRange)) {
                        // Set the current question index to the question before the skip target since nextQuestion increments
                        // the question index by 1
                        questionIndex = QUESTION_IDS[branch_id].indexOf(currentQuestionObject.restrictions.skipTarget) - 1;

                        // In case the user was answering a long question, reset params related to long questions
                        currentSubQuestionIds = null;

                        // call sync progress to update currentSubQuestionIds and questionID after nextQuestion
                        syncProgress();
                    }
                }
            }

            // display next question after time delay and scroll to bottom of screen
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => {nextQuestion(); saveResponse(parseInt(numInput));}, delay);
            scrollToBottom();
        }
        else {
            // Saving the response before clearing the input box
            let textInput = input.value;

            // display input
            showMessageReceiver(message);

            // display next question after time delay and scroll to bottom of screen
            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => {nextQuestion(); saveResponse(textInput);}, delay);
            scrollToBottom();
        }

        // clear textbox
        input.value = "";

        // Prevent users from using text box
        disableTextInput();
    }
    else{
      errorText.style.visibility = "visible";
      errorText.innerHTML = "Please type your answer in the text box.";
    }
}


/**
 * Function to increment through survey questions one by one and display them.
 */
function nextQuestion() {
    console.log("nextQuestion() is called.")
    // check if currentQuestionObject is null
    if (currentSubQuestionIds !== null && currentSubQuestionIds !== undefined) {
        // The user is answering sub-questions
        console.log("subquestionIndex is ", subQuestionIndex);

        // check if the subQuestionIndex is at the end of  currentSubQuestionIds
        if (subQuestionIndex === currentSubQuestionIds.length) {
            // If the user has completed answering sub-questions,
            // increment the questionIndex and move on
            currentSubQuestionIds = null;
            questionIndex++;
            showQuestion(false);
        } else {
            // If there are unanswered sub-questions left
            showQuestion(true);
            subQuestionIndex++;
        }
    } else if (currentQuestionObject === null) {
        // The user is answering its first survey question
        showQuestion(false);
    } else if (questionIndex < QUESTION_IDS[branch_id].length - 1) { // check if questionIndex is still not at the end of survey questions
        // The user is answering a normal question
        questionIndex++;
        showQuestion(false);
    } else if (skippedToEnd){
        showEndingMessage();
    } else { //  else end the survey
        showEndingMessage();
    }
}

/**
 * Shows the ending message when the survey has been completed.
 */
function showEndingMessage() {
    // disable the textbox and send button and empty textbox
    input.value = "";
    input.disabled = true;
    submit.disabled = true;
    input.onkeyup = () => {};

    // update progress bar
    questionIndex = QUESTION_IDS[branch_id].length;
    updateProgress();

    // initialise userID and reference to user's branch in firestore database
    let userID = getUserID();
    let reference = firebase.firestore().collection(USERS_BRANCH).doc(userID)

    // if skippedTOEnd was
    if (skippedToEnd == true) {
        let userID = getUserID();
        firebase.firestore().collection(USERS_BRANCH).doc(userID).update({
            skippedToEnd: "Yes"
        });
    }

    // check if user exist in firestore
    reference.get().then((document) => {
        if (document.exists) {
            // check if the first closing message has been answered before by user and that if
            // skippedToEnd exists in user's branch
            let closedSurvey = document.data().closedSurvey;
            joinFutureResearchExist = (document.data().joinFutureResearch != null);
            skippedToEnd = (document.data().skippedToEnd != null);

            if (closedSurvey == null) {
                // asks if the user is ready to end the survey
                showReadyClosingMessage();
            } else if (closedSurvey != null && joinFutureResearchExist == false && skippedToEnd == false) {
                // show future research question if user has not finished answering it
                showFutureResearchQuestion();
            } else {
                // Show option to move to different pages of the app
                showMoveToDifferentPages();
            }
        } else {
            console.log("user does not exist.")
        }
    })

    // scroll to bottom of page
    scrollToBottom();
}

function showReadyClosingMessage(){
    // display a question asking if the user wants to participate in future research
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Are you ready to finish the survey?</p>` +
        "</div>" +
        "</div>";
    document.getElementById('hint_area').innerHTML = "";

    // display the options
    let questionOptions = "<div class=\"space\">"
    questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"endSurveyYes\" onclick=\"selectClosingQuestionOption(this, 1, 0)\">1. Yes</button>";
    questionOptions += "</div>";
    messages.innerHTML += questionOptions;

    // open the text box to take input
    input.disabled = false;
    submit.disabled = false;
    submit.setAttribute("onclick", "textInputClosingQuestion(0)");
}

/**
 * function to display the first closing message of the survey.
 * To ask if the user would want to participate in future research.
 */
function showFutureResearchQuestion(){
    // display a question asking if the user wants to participate in future research
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>We would like to hear from you again in a few months' time. Would you like to participate in the qualitative study(interview)? </p>` +
        "</div>" +
        "</div>";
    document.getElementById('hint_area').innerHTML = "";

    // display the options
    let questionOptions = "<div class=\"space\">"
    questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchYes\" onclick=\"selectClosingQuestionOption(this, 1, 1)\">1. Yes</button>";
    questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchNo\" onclick=\"selectClosingQuestionOption(this, 2, 1)\">2. No</button>";
    questionOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" id=\"futureResearchMaybe\" onclick=\"selectClosingQuestionOption(this, 3, 1)\">3. Maybe</button>";
    questionOptions += "</div>";
    messages.innerHTML += questionOptions;

    // open the text box to take input
    input.disabled = false;
    submit.disabled = false;
    submit.setAttribute("onclick", "textInputClosingQuestion(1)");
}

/**
 * function to store response from user on future research participation and move on to next closing message.
 * @param button - the html element of the button that was clicked
 * @param index - the index of the option chosen
 */
function selectClosingQuestionOption(button, index, closingQsID){
    // disable the textbox and send button and empty textbox
    input.value = "";
    input.disabled = true;
    submit.disabled = true;

    // initialise choice and get the user's ID (phone number they registered under)
    let choice;
    let userID = getUserID();

    // assign the choice with the strings used in the option
    if (index == 1) {
        choice = "Yes";
    } else if (index == 2) {
        choice = "No";
    } else if (index == 3) {
        choice = "Maybe";
    }

    // update user's branch in firestore with data based on which closingQsID was answered
    if (closingQsID == 0) {
        firebase.firestore().collection(USERS_BRANCH).doc(userID).update({
            closedSurvey: choice
        })
    } else if (closingQsID == 1) {
        firebase.firestore().collection(USERS_BRANCH).doc(userID).update({
            joinFutureResearch: choice
        })
    }

    // print the choice chosen onto console
    console.log(choice);

    // format choice html text bubble
    let ansTemplate = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + choice + '</p>\
                            </div>\
                        </div>';

    // disable clicked button and other button options from MCQ question
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }

    // display user's choice on chat
    messages.innerHTML += ansTemplate;

    // display the next parts of the closing message depending on which the closingQsID
    if (closingQsID == 0) {
        if (skippedToEnd == true) { // scenario where user causes the end survey immediately logic
            // Show online transaction options
            showOnlineTransactionOptions();
            // Show option to move to different pages of the app
            showMoveToDifferentPages();
        } else if (skippedToEnd == false) { // when user finishes the survey normally
            // ask user if they want to participate in future research
            showFutureResearchQuestion();
        }
    } else if (closingQsID == 1) { // after user given their answer if they want to participate in future research
        // Show online transaction options
        showOnlineTransactionOptions();

        // Show option to move to different pages of the app
        showMoveToDifferentPages();
    }

    // scroll to bottom of message log
    scrollToBottom();
}

/**
 * function to check user input from textbox for answering the 2 closing questions of the chatbot
 */
function textInputClosingQuestion(closingQsID){
    // initialise yesOptions and noOptions
    let yesOptions = ["yes", "1", "1. yes", "1.yes"];
    let noOptions = ["no", "2", "2. No", "2.No"];
    let maybeOptions = ["maybe", "3", "3. maybe", "3.maybe"];

    // check if the text input from textbox is one of the options in maybeOptions after converting all
    // alphabetic characters to lowercase
    if (maybeOptions.includes(input.value.toLowerCase())) {
        if (closingQsID == 1) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("futureResearchMaybe"), 3, closingQsID);
        }
    }
    // check if the text input from textbox is one of the options in yesOptions after converting all
    // alphabetic characters to lowercase
    else if (yesOptions.includes(input.value.toLowerCase())) {
        if (closingQsID == 0) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("endSurveyYes"), 1, closingQsID);
        } else if (closingQsID == 1) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("futureResearchYes"), 1, closingQsID);
        }
    }
    // check if the text input from textbox is one of the options in noOptions after converting all
    // alphabetic characters to lowercase
    else if (noOptions.includes(input.value.toLowerCase())){
         if (closingQsID == 1) {
            // activate selectClosingQuestionOption with respective chosen option value and closingQsID
            selectClosingQuestionOption(document.getElementById("futureResearchNo"), 2, closingQsID);
        }
    }
}

/**
 * function to show the online transaction options for users when they complete the survey.
 * the options will create a new tab to transaction links
 */
function showOnlineTransactionOptions(){
    // message
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        `<p>Thank you for completing the survey! A token of participation will be granted via online transaction.</p>` +
        "</div>" +
        "</div>";
    document.getElementById('hint_area').innerHTML = "";

    // display the options
    let options = "<div class=\"space\">"
    options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_ewGEyXijAKfNeQe','_blank')\">Banking</button>";
    options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.open('https://businessmy.au1.qualtrics.com/jfe/form/SV_baBzV5GgFOGDTYW','_blank')\">e-Wallet</button>";
    options += "</div>";
    messages.innerHTML += options;
}

/**
 * function to display options for users to click on to move to different pages of the app.
 */
function showMoveToDifferentPages(){
    // message

    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current'>" +
        "<p>Thank you so much for your participation in this survey." +
        // uncomment line below when app is no longer in trial phase
        //" Now, feel free to browse on the <b>Recommender</b>, where you'll find interesting videos to broaden your skillsets. Or the <b>Forum</b>, where you get to know more friends!
        "</p>" +
        "</div>" +
        "</div>";
    document.getElementById('hint_area').innerHTML = "";

    // display the options to got to recommender, forum and main page respectively
    let options = "<div class=\"space\">"

    // uncomment the below 2 line when app is no longer in trial phase. these are to allow users to use recommender and forum page
    //options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'recommender_Ui.html\'\">Recommender</button>";
    //options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'forum.html\'\">Forum</button>";
    options += "<button class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"window.location.href = \'main_page.html\'\">Main Page</button>";
    options += "</div>";
    messages.innerHTML += options;
}

/**
 * Appends a message bubble to the chat bot containing the specified message string.
 * This function is only used by the chatbot.
 * @param message A message string
 */
function showMessageSender(message) {
    // display a message in html format below
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current notranslate'>" +
        `<p>${message}</p>` +
        "<button  onclick = \"bindingFunc()\" class=\"text-to-speech\" id=\"text-to-speech-" + question_bubble_no + "\"></button>" +
        "</div>" +
        "</div>";
    // showHints();
    question_bubble_no++;
}

function bindingFunc(){
    var toSpeak = new SpeechSynthesisUtterance(currentQuestionObject.question.replace( /(<([^>]+)>)/ig, ''));
    // Adjusts the rate of the speaker
    toSpeak.rate = 0.9;

    voices = speechSynth.getVoices();
    voices.forEach((voice)=>{
        if(voice.name === 'Google UK English Female'){
            toSpeak.voice = voice;
        }
    });
    speechSynth.speak(toSpeak);
}


/**
 * display a question from chatbot without any hint
 * @param message
 */
function showMessageSenderWithoutHints(message) {
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current notranslate'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>";
    document.getElementById('hint_area').innerHTML = "";
}

/**
 * Appends a message bubble to the chat bot containing
 * the specified question string
 * @param questionString The question string
 */
function showShortQuestionMessage(questionString) {
    document.getElementById("messages").innerHTML +=
        "<div class='space'>" +
        "<div class='message-container sender blue current notranslate'>" +
        `<p>${questionString}</p>` +
        "</div>" +
        "</div>";
    // showHints();
}

/**
 * function to scroll to bottom of screen
 */
function scrollToBottom() {
    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, delay);
}

/**
 * function to show the question at questionIndex or subQuestionIndex
 * @param isSubQuestion
 */
function showQuestion(isSubQuestion) {

    //Resets linkert scale
    document.getElementById('likert_scale').innerHTML='';

    // Get the ID of the current question
    let question_id = "";

    // check if the current question is a sub-question
    if (isSubQuestion) {
        // get the firebase ID of the sub-question
        currentSubQuestionId = currentSubQuestionIds[subQuestionIndex];
        question_id = currentSubQuestionId;
    } else {
        // get the firebase ID of the question
        currentQuestionId = QUESTION_IDS[branch_id][questionIndex];
        question_id = currentQuestionId;
    }
    console.log("Reading ", question_id);

    firebase.firestore().collection(QUESTIONS_BRANCHES[branch_id])
        .doc(question_id)
        .get()
        .then((docRef) => {
            let questionObject = docRef.data();
            let questionType = questionObject.type;

            currentQuestionObject = questionObject;

            // DONT REMOVE THIS - Yong Peng
            console.log(currentQuestionObject);

            // checking the type of the question to assign the appropriate function to display it
            switch (questionType) {
                case TYPE_NUMERIC:
                case TYPE_NUMERIC_SUB_QUESTION:
                    showNumeric(questionObject);
                    if (agreeLikertQues.includes(questionIndex)) {
                        makeLikertScale(branch_id, "agree");
                    } else if (satisfyLikertQues.includes(questionIndex)){
                        makeLikertScale(branch_id, "satisfy");
                    } else if (confidentLikertQues.includes(questionIndex)){
                        makeLikertScale(branch_id, "confident");
                    } else if (interestedLikertQues.includes(questionIndex)){
                        makeLikertScale(branch_id, "interested");
                    }
                    break;

                case TYPE_MULTIPLE_CHOICE:
                case TYPE_MULTIPLE_CHOICE_SUB_QUESTION:
                    showMultipleChoice(questionObject);
                    break;

                case TYPE_MULTIPLE_CHOICE_OTHERS:
                    showMultipleChoiceOthers(questionObject);
                    break;

                case TYPE_SHORT_TEXT:
                    showShortText(questionObject);
                    break;

                case TYPE_LONG_TEXT:
                    showLongText(questionObject);
                    break;

                case TYPE_LONG_QUESTION:
                    currentLongQuestionObject = questionObject;
                    showLongQuestion(questionObject);
                    break;

                default:
                    let errorLog = "[ERROR]Invalid question type supplied: " +
                        questionType +
                        "\nQuestion object: " +
                        questionObject;
                    console.log(errorLog);
            }
            showHints();
            updateProgress();
            // Scroll the chat box window to the correct position
            scrollToBottom();
        });
}

/**
 * function to set up and display questions that require numeric inputs
 * @param questionObject
 */
function showNumeric(questionObject) {
    // anonymous function to check user input in textbox is valid or not
    input.onkeyup = () => {
        // get range of the expected answer
        let lowerRange = questionObject.restrictions.lowerRange;
        let upperRange = questionObject.restrictions.upperRange;

        if (input.value != ""){
            // get user's input
            let message = parseInt(input.value);

            // If it's a number
            if (!isNaN(message)) {
                // If there is no upper/lower range specified set either to infinity and negative infinity respectively
                if (lowerRange != null && upperRange == null){
                    upperRange = Number.POSITIVE_INFINITY;
                } else if (lowerRange == null && upperRange != null){
                    lowerRange = Number.NEGATIVE_INFINITY;
                }

                // if number is in normal range
                if ((message >= lowerRange) && (message <= upperRange)) {
                    // If it's within range
                    errorText.innerHTML = "";
                    errorText.style.visibility = "hidden";
                    submit.onclick = addMessage;
                } else if(message < 0){
                    // If the number is negative
                    errorText.style.visibility = "visible";
                    errorText.innerHTML = "the number can not be less than 0";
                    submit.onclick = null;
                } else if(message > upperRange){
                    // If the number is larger than
                    errorText.style.visibility = "visible";
                    errorText.innerHTML = "the number can not be larger than " + upperRange;
                    submit.onclick = null;
                } else {
                    // If it's out of range, display error messages
                    /*errorText.style.visibility = "visible";
                    if (lowerRange !== Number.NEGATIVE_INFINITY && upperRange !== Number.POSITIVE_INFINITY) {
                        errorText.innerHTML = "number is not within the range of " + lowerRange + " - " + upperRange;
                    }

                    else if (lowerRange !==  Number.NEGATIVE_INFINITY && upperRange === Number.POSITIVE_INFINITY) {
                        errorText.innerHTML = "number is not greater than " + lowerRange;
                    }

                    else if (lowerRange === Number.NEGATIVE_INFINITY && lowerRange !== Number.POSITIVE_INFINITY) {
                        errorText.innerHTML = "number is not lesser than " + upperRange;
                    }*/

                    // check if question requires use to end the survey if an invalid response is given
                    if (questionObject.restrictions.skipIfInvalid) {
                        if (questionObject.restrictions.skipTarget === SKIP_END_SURVEY) {
                            submit.onclick = endSurveyText;
                        } else {
                            submit.onclick = addMessage;
                        }
                    }
                }
            }
            else {
                // If it's not a number
                errorText.style.visibility = "visible";
                errorText.innerHTML = "the answer needs to be a number.";
                submit.onclick = null;
            }
        } else {
            // clear error text area
            errorText.innerHTML = "";
            errorText.style.visibility = "hidden";
        }
    }

    // display the question and enable the textbox
    showMessageSender(questionObject.question);
    enableTextInput();
}

/**
 * function to display the last answered item from user and re-display the current question again on the chat log
 */
function repromptQuestion() {
    // print error message onto chat
    errorText.style.visibility = "hidden";

    //getting type of question and the question itself
    let type = currentQuestionObject.type;
    let question = currentQuestionObject.question;

    if (type === TYPE_LONG_QUESTION ||
        type === TYPE_SHORT_TEXT ||
        type === TYPE_NUMERIC ||
        type === TYPE_NUMERIC_SUB_QUESTION ||
        type === TYPE_LONG_TEXT||
        type ===TYPE_MULTIPLE_CHOICE ||
        type === TYPE_MULTIPLE_CHOICE_OTHERS ||
        type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION) {
        let wrongInput = input.value;
        showMessageReceiver(wrongInput);
    }

    // print out multiple choice options if question reprompted is a MCQ
    if (type ===TYPE_MULTIPLE_CHOICE ||
        type === TYPE_MULTIPLE_CHOICE_OTHERS ||
        type === TYPE_MULTIPLE_CHOICE_SUB_QUESTION) {
        showMultipleChoice(currentQuestionObject);
    }else{
      // print out the question again onto chat
      showMessageSender(question);
    }

    showHints();
    updateProgress();
    scrollToBottom();
}

/**
 * function to display an MCQ survey question onto chat log to ask user
 * @param questionObject - an Object from firebase which contain the question, it's multiple choice answers and skip logic
 */
function showMultipleChoice(questionObject) {
    // Leaving these here as references to multiple choice
    // question objects.
    let reference = {
        question_number: "1.2",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "What is your gender?",
        restrictions: {
            choices: ["Male", "Female"],
            skipChoice: ["Male"],
            skipTarget: "end_survey"
        },
        hint: "select an option"
    };

        // reset possibleAnswersMCQ back to an empty array
        possibleAnswersMCQ = [];

        // for loop to add possible answer string for each MCQ option
        for (let i=0; i < questionObject.restrictions.choices.length; i++) {
            possibleAnswersMCQ.push([]); // add empty array to store answer strings for choice i
            possibleAnswersMCQ[i].push((i+1).toString()); // MCQ option number
            possibleAnswersMCQ[i].push(i+1 + "."); // MCQ option number + .
            possibleAnswersMCQ[i].push(questionObject.restrictions.choices[i].toLowerCase()); // MCQ option word
            // MCQ option number + . + MCQ option word (no space before and after .)
            possibleAnswersMCQ[i].push((i+1) + "." + questionObject.restrictions.choices[i].toLowerCase());
            // MCQ option number + . + MCQ option word (with space after . only)
            possibleAnswersMCQ[i].push((i+1) + ". " + questionObject.restrictions.choices[i].toLowerCase());
        }

    input.onkeyup = () => {
      // set submit.onclick appropriately based on found
      submit.disabled = false;
      submit.onclick = checkMCQInput;
    }

    enableTextInput();
    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    showMessageSender(question);
    showOptions(choices, false);
}

/**
* Function to check the text input from user to answer an MCQ.
*/
function checkMCQInput(){
    // get answer from textbox and remove spaces before the first non-space character and remove spaces after last non-space cahracters
    let message = (input.value).trim();
    // set found as false
    let found = false;

    // for loop to check if message is in possibleAnswersMCQ
    for (let i=0; i < possibleAnswersMCQ.length; i++){
        // if message is found to be in possibleAnswers
        if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
            found = true;
            break;
          }
    }

    // set submit.onclick appropriately based on found
    if (found) {
        errorText.innerHTML = "";
        addMessage();
    } else {
        errorText.innerHTML = "";
        errorText.style.visibility = "visible";
        errorText.innerHTML = "Please enter a number from (1 to " + (currentQuestionObject.restrictions.choices.length) + ") or enter the option word(s)";
        submit.onclick = null;
    }
}

/**
 * function to display multiple choice questions that can be answered by typing something in the textbox or by selecting one of the options available
 * @param questionObject- an Object from firebase which contain the question, it's multiple choice answers and skip logic.
 */
function showMultipleChoiceOthers(questionObject) {

        // reset possibleAnswersMCQ back to an empty array
        possibleAnswersMCQ = [];
        // initialise othersAnswers
        othersAnswers = [];

        // for loop to add possible answer string for each MCQ option
        for (let i=0; i < questionObject.restrictions.choices.length-1; i++) {
            possibleAnswersMCQ.push([]); // add empty array to store answer strings for choice i
            possibleAnswersMCQ[i].push((i+1).toString()); // MCQ option number
            possibleAnswersMCQ[i].push(i+1 + "."); // MCQ option number + .
            possibleAnswersMCQ[i].push(questionObject.restrictions.choices[i].toLowerCase()); // MCQ option word
            // MCQ option number + . + MCQ option word (no space before and after .)
            possibleAnswersMCQ[i].push((i+1) + "." + questionObject.restrictions.choices[i].toLowerCase());
            // MCQ option number + . + MCQ option word (with space after . only)
            possibleAnswersMCQ[i].push((i+1) + ". " + questionObject.restrictions.choices[i].toLowerCase());
        }

        // add possible answer string for each others option
        othersAnswers.push((questionObject.restrictions.choices.length).toString());// MCQ option number
        othersAnswers.push(questionObject.restrictions.choices.length + "."); // MCQ option number + .
        othersAnswers.push(questionObject.restrictions.choices[questionObject.restrictions.choices.length-1].toLowerCase()); // MCQ option word
        // MCQ option number + . + MCQ option word (no space before and after .)
        othersAnswers.push(questionObject.restrictions.choices.length + "." + questionObject.restrictions.choices[questionObject.restrictions.choices.length-1].toLowerCase());
        // MCQ option number + . + MCQ option word (with space after . only)
        othersAnswers.push(questionObject.restrictions.choices.length + ". " + questionObject.restrictions.choices[questionObject.restrictions.choices.length-1].toLowerCase());

    input.onkeyup = () => {
      // set submit.onclick appropriately based on found
      submit.disabled = false;
      submit.onclick = checkMCQInputOthers;
    }

    // allow users to use textbox
    enableTextInput();

    let question = questionObject.question;
    let choices = questionObject.restrictions.choices;

    showMessageSender(question);
    showOptions(choices, true);
}

/**
 * function to check textbox input for MCQ with others option
 * */
function checkMCQInputOthers(){
    // get answer from textbox and remove spaces before the first non-space character and remove spaces after last non-space cahracters
    let message = (input.value).trim();

    // check if text input is for "others" option
    if (othersAnswers.includes(message.toLowerCase())){
        // remove last error message and call othersOptionInput()
        errorText.innerHTML = "";
        othersOptionInput();
    } else {
        // initialise found as false
        let found = false;

        // for loop to check if message is in possibleAnswersMCQ
        for (let i=0; i < possibleAnswersMCQ.length; i++){
            // if message is found to be in possibleAnswers
            if (possibleAnswersMCQ[i].includes(message.toLowerCase())) {
                found = true;
                break;
            }
        }

        // set submit.onclick appropriately based on found
        if (found) {
            // remove last error message and call addMessage()
            errorText.innerHTML = "";
            addMessage();
        } else {
            // clear old error message and display a new one. Set the send button to null
            errorText.innerHTML = "";
            errorText.style.visibility = "visible";
            errorText.innerHTML = "Please enter a number from (1 to " + (currentQuestionObject.restrictions.choices.length) + ") or enter the option word(s)";
            submit.onclick = null;
        }
    }
}

/**
 * function that let the users enter their "others" option for MCQs in the textbox
 */
function othersOptionInput(){
    // reset textbox and scroll chat log to bottom
    scrollToBottom();
    input.value = "";
    otherChosen = true;

    showMessageSender(currentQuestionObject.restrictions.choices[currentQuestionObject.restrictions.choices.length-1] + ":");
    document.getElementById('hint_area').innerHTML = OTHERS_OPTION_HINTS[branch_id];

    input.onkeyup = () => {
        let message = input.value;
        if (message.length <= SHORT_TEXT_LENGTH) {
            // If it's not too long
            errorText.innerHTML = "";

            errorText.style.visibility = "hidden";
            submit.onclick = addMessage;
        } else {
            // If it's super long
            errorText.style.visibility = "visible";
            errorText.innerHTML = "character limit exceeded";
        }
    }

    // allow users to use textbox
    enableTextInput();
}

/**
 * function to display questions that consist of sub questions
 * @param questionObject
 */
function showLongQuestion(questionObject) {
    // Leaving this here as a reference to long questions
    // (questions with sub-questions)
    let reference = {
        question_number: "4.3",
        category: "Part IV: About your learning interest",
        type: "long-question",
        question: "How interested are you to learn the following skills" +
            "using a mobile phone ? (Rate from 1 to 7)" +
            "[1] extremely not interested, [2] very not interested, " +
            "[3] not interested," +
            "[4] moderately interested, [5] highly interested, " +
            "[6] very interested," +
            "[7] extremely interested",
        restrictions: {},
        hint: "placeholder",
        arrangement: []
    };

    // Cache title question for easier outputting (when resuming)
    titleQuestionString = questionObject.question;

    showMessageSender(questionObject.question);

    // Initialize fields for looping over the sub-question IDs array
    subQuestionIndex = 0;
    currentSubQuestionIds = questionObject.arrangement;
    nextQuestion();
}

/**
 * function to display questions that require textbox inputs and have restricted answer character number length.
 * @param questionObject
 */
function showShortText(questionObject) {
    let message = input.value;
    input.onkeyup = () => {
        if (message.length <= SHORT_TEXT_LENGTH) {
            // If it's not too long

            // TODO Spellcheck here

            errorText.style.visibility = "hidden";
            submit.onclick = addMessage;
        } else {
            // If it's super long
            errorText.style.visibility = "visible";
            errorText.innerHTML = "The answer is too long";
            submit.onclick = null;
            //submit.onclick = repromptQuestion;
        }

    }

    showMessageSender(questionObject.question);
    enableTextInput();
}

/**
 * function to display questions which require textbox inputs and are expected to have a large character limit for it's answer
 * @param questionObject
 */
function showLongText(questionObject) {
    //TODO Do spellchecks here
    showShortText(questionObject);
}

/**
 * function to create MCQ answer buttons on screen for users to select to answer the MCQs
 * @param choices an array of string representing the options of an MCQ
 */
function showOptions(choices, hasOther) {
    let mcqOptions = "<div class=\"space\">"
    let numberOption = 1;
    let index = 1;

    MCQOptionIDs = [];

    if(!hasOther) {
        for (let i = 0; i < choices.length; i++){
            mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised notranslate\" onclick=\"select(this, " + index + ")\" id=\"" + currentQuestionObject.question_number + i + "\">" + numberOption + ". " + choices[i] + "</button>";
            numberOption ++;
            index++;
            MCQOptionIDs.push(currentQuestionObject.question_number + i);
        }
    } else {
        for (let i = 0; i < choices.length -1; i++){
            mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised notranslate\" onclick=\"select(this, " + index + ")\" id=\"" + currentQuestionObject.question_number + i + "\">" + numberOption + ". " + choices[i] + "</button>";
            numberOption ++;
            index++;
            MCQOptionIDs.push(currentQuestionObject.question_number + i);
        }
        mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised notranslate\" onclick=\"othersOptionInput()\" id=\"" + currentQuestionObject.question_number + (choices.length-1) + "\">" + numberOption + ". " + choices[choices.length-1] + "</button>";
        MCQOptionIDs.push(currentQuestionObject.question_number + (choices.length-1));
    }

    mcqOptions += "</div>";
    messages.innerHTML += mcqOptions;
}

/**
 * function to display hints for questions when the hint button is clicked
 * @param hintId
 */
function showHints(hintId) {
    document.getElementById('hint_area').innerHTML = currentQuestionObject.hint;
}

/**
 * Prevents users from using the input text box
 */
function disableTextInput() {
    submit.disabled = true;
    input.disabled = true;
}

/**
 * Enables users to use the input text box
 */
function enableTextInput() {
    submit.disabled = false;
    input.disabled = false;
}

/**
 * @return {boolean} true the user is currently answering
 * a sub-question, false otherwise
 */
function isAnsweringSubQuestions() {
    if (currentQuestionObject === null) {
        // The current question object is not set yet,
        // hence it is impossible for the user to be
        // answering a question
        return false;
    } else {
        // If the current question object is set,
        // the user is answering sub-questions if
        // the list of sub-question IDs is not null.
        return currentSubQuestionIds !== null;
    }
}

/**
 * Ends the survey
 */
function endSurvey(endingAns) {
    questionIndex = QUESTION_IDS[branch_id].length;
    skippedToEnd = true;
    saveResponse(endingAns);

    nextQuestion();
}

/**
 * End Survey and display the user's response
 * in the chat bot window.
 * <br>
 * To be used by text-based survey questions ONLY
 */
function endSurveyText() {
    // show answer given
    showMessageReceiver(input.value);

    // set question index to end, set skippedToEnd to true and save the answer
    questionIndex = QUESTION_IDS[branch_id].length;
    saveResponse(input.value);
    skippedToEnd = true;

    // hide errorText and call next question
    errorText.style.visibility = "hidden";
    nextQuestion();
}

/**
 * Changes the colour of the next message based on
 * the colour of the current message in the history tab.
 *
 * Used in HISTORY SENDER messages only (bot side)
 */
 function changeMessageHistoryColour() {
    if (messageHistoryColour == 'white') {
        messageHistoryColour = 'blue';
    }
    else {
        messageHistoryColour = 'white';
    }
}

/**
 * Updates the progress bar. Also changes previous sender question to
 * white.
 */
function updateProgress() {
    let progress = (questionIndex/QUESTION_IDS[branch_id].length) * 100;
    console.log('updateProgress() is called. Current percentage is ' + progress + '%.');
    document.querySelector('#progress-bar').MaterialProgress.setProgress(progress);

    $('#percentage').html(progress.toFixed(2) + "%");

    changeColour();
}

/**
 * Changes all blue colour messages to white unless they have a current tag.
 * Current class tag will be removed.
 */
function changeColour() {
    var prev = $('.blue');
    $.each(prev, function() {
        if (!$(this).hasClass('current')) {
            $(this).animate({
                backgroundColor: "#FFFFF",
                color: "#006DAE",
            }, 500 );
        }
        $(this).removeClass('current')
    })
}

/** Function of selecting likert options **/
function likertSelect(number)
{
    // format choice html text bubble
    let ansTemp = '<div class="space">\
                            <div class="message-container receiver">\
                                <p>' + number + '</p>\
                            </div>\
                        </div>';

    // display user's choice on chat
    messages.innerHTML += ansTemp;


    // Prevent users from using text box
    disableTextInput();

    // display next question and save user response after time delay and scroll to bottom of screen
    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => {nextQuestion(); saveResponse(number);}, delay);
    scrollToBottom();
}
