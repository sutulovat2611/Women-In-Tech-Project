/**
 * This file contains functions that initialize the chatbot
 * when the page is loaded.
 *
 * Current order of execution
 * 1. initFirebaseAuth & the progress bar thing
 * 2. initQuestionIndex
 * 3. initChatbot
 */
let noDelayMode = false;

initFirebaseAuth();

window.onload = function () {
    // Initialises progress bar
    document.querySelector('#progress-bar')
        .addEventListener('mdl-componentupgraded', function() {
            this.MaterialProgress.setProgress(0);
        });
};

/**
 * Listen for changes in the firebase auth system
 * and initializes the user object.
 */
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(() => {
        // Initialize current user object
        currentUser = firebase.auth().currentUser;
        initProgressData().then(() => {
            initChatbot();
        })
    });
}

/**
 * Synchronizes the local question data with the one
 * on the firestore database. Alternatively, initialize
 * the user branch on the firestore database.
 * @returns {PromiseLike<any> | Promise<any>}
 */
function initProgressData() {
    // The question data should be stored in
    // users/ [phone number/email] /
    let userID = getUserID();
    //let userID = phone === null ? currentUser.email : phone;

    // Formulating the response object

    // Retrieve the question index
    let reference = firebase.firestore().collection(USERS_BRANCH)
        .doc(userID);
    return reference.get().then((document) => {
        if (document.exists) {
            // If the branch exists, that means the user has visited
            // the chat bot page at least once

            // Synchronize question data and leave the other functions
            // to do the rest
            let questionData = document.data();
            questionIndex = questionData.questionIndex;

            if (questionData.currentSubQuestionIds === undefined) {
                currentSubQuestionIds = null;
            } else {
                currentSubQuestionIds = questionData.currentSubQuestionIds;
            }

            if (questionData.subQuestionIndex === undefined) {
                subQuestionIndex = null;
            } else {
                subQuestionIndex = questionData.subQuestionIndex;
            }

            console.log(questionIndex, currentSubQuestionIds, subQuestionIndex);
        } else {
            // The user is visiting the chat bot page for the
            // first time

            // document.data() will be undefined in this case
            console.log("User branch not found, initializing...");

            // Initialize questionIndex to 0 and sub question data to their
            // initial values
            firebase.firestore().collection(USERS_BRANCH)
                .doc(userID)
                .set({
                    questionIndex: NO_QUESTIONS_DONE,
                    currentSubQuestionIds: currentSubQuestionIds,
                    subQuestionIndex: subQuestionIndex
                })
                .then(() => {
                    console.log(`Branch 'users/${userID}' created`);
                    console.log(`questionIndex set to ${NO_QUESTIONS_DONE}`)
                })
                .catch(() => {
                    console.error("Error while initializing user branch " +
                        `'users/${userID}'`);
                });
        }
    })

}

/**
 * Initializes the chat bot based on the user's previous
 * survey instance.
 */
function initChatbot() {
    if (questionIndex === NO_QUESTIONS_DONE) {
        // Survey has not been started yet
        greeting();
    } else if (questionIndex === LAST_QUESTION_DONE) {
        // Survey has been completed
        showEndingMessage();
    } else {
        // Survey has been left off halfway
        resumeGreeting();
    }
}

/**
 * Greet the user and offer options to resume or restart
 * the survey.
 */
function resumeGreeting() {
    let contents = "";

    // Welcome message
    contents +=
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>Hi! I am the chatbot for this App.</p>" +
        "<p>Please select \"Resume\" to resume your " +
        "previous survey or \"Restart\" to start again if you want change your previous answers.</p>" +
        "</div>" +
        "</div>";

    // Buttons (options)
    contents +=
        "<div class=\"space\">" +
        "<button id='resume-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"resumeSurvey(this)\" " +
        "value=\"Resume\">" +
        "Resume" +
        "</button>" +

        "<button id='restart-survey-button' " +
        "class=\"mdl-button mdl-js-button " +
        "mdl-button--raised mdl-js-ripple-effect\" " +
        "onclick=\"startSurvey(this)\" " +
        "value=\"Restart\">" +
        "Restart" +
        "</button>" +
        "</div>";


    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => messages.innerHTML += contents, delay);
    disableTextInput();
}

/**
 * function to initialise starting messages in chat and create "start survey" button.
 */
function greeting() {
    // format starting message html
    let quesTemplate =
        "<div class='space'>" +
        "<div class='message-container sender blue'>" +
        "<p>Hi! I am the chatbot for this App.</p>" +
        "<p>To get started, can you please fill up this survey." +
        " You only have one attempt in completing the survey." +
        " You are allowed to restart the survey any number of times if it is still incomplete. " +
        "Are you ready?</p>" +
        "</div>" +
        "</div>";

    // format start survey button html
    let mcqOptions = "<div class=\"space\">"
    mcqOptions += "<button class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect\" onclick=\"startSurvey(this)\">Start Survey</button>";
    mcqOptions += "</div>";

    // set time out to display the message and start survey button
    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => {
        messages.innerHTML += quesTemplate;
        messages.innerHTML += mcqOptions;
    }, delay);

    // disable textbox
    disableTextInput();
}

/**
 * Starts the survey fresh
 */
function startSurvey(button) {
    button.disabled = true;
    // Display the choice as a message bubble
    let choice = button.textContent.trim();
    showMessageReceiver(choice);

    if (button.value === "Restart") {
        // Reset local progress data and sync with the cloud
        questionIndex = 0;
        subQuestionIndex = 0;
        currentSubQuestionIds = null;

        syncProgress();

        // Clear responses stored in the cloud
        purgeUserResponses();

        // Disable options
        document.getElementById("restart-survey-button")
            .disabled = true;
        document.getElementById("resume-survey-button")
            .disabled = true;
    }

    // Disable options
    let space = button.parentElement;
    for (let i = 0; i < space.childNodes.length; i++) {
        space.childNodes[i].disabled = true;
    }
    scrollToBottom();

    let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
    setTimeout(() => nextQuestion(), delay);
}

/**
 * Shows all previous conversations and resumes the survey
 */
function resumeSurvey(button) {
    // Display the choice as a message bubble
    let choice = button.textContent.trim();
    showMessageReceiver(choice);

    // Populate the chatbot window with previous conversations
    noDelayMode = true;
    let lastTitleQuestion = "";
    firebase.firestore().collection(getUserResponsesBranch())
        .orderBy('timestamp')
        .get()
        .then(responses => {
            responses.forEach(response => {
                // For each response, output the question and the response
                let responseObject = response.data();
                let titleQuestion = responseObject.titleQuestion;
                let question = responseObject.question;
                let answer = responseObject.answer;
                let questionChoices = responseObject.restrictions.choices;

                if (titleQuestion !== null && titleQuestion !== undefined) {
                    // If this is the first sub-question of a long question type
                    if (lastTitleQuestion !== titleQuestion) {
                        lastTitleQuestion = titleQuestion;
                        showShortQuestionMessage(titleQuestion);
                    }
                }

                showShortQuestionMessage(question);

                if (questionChoices == null){
                    showMessageReceiver(answer);
                } else {
                    if (typeof answer == "string") {
                        showMessageReceiver(answer.substr(3))
                    } else {
                        showMessageReceiver(questionChoices[answer]);
                    }
                }
            });

        })
        .then(() => {
            // Disable options
            document.getElementById("restart-survey-button")
                .disabled = true;
            document.getElementById("resume-survey-button")
                .disabled = true;

            scrollToBottom();

            let delay = noDelayMode ? 0 : MESSAGE_OUTPUT_DELAY;
            setTimeout(() => nextQuestion(), delay);
            updateProgress();

            // After previous conversations are loaded, re-enable
            // message delay
            noDelayMode = false;
        });
}