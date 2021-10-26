
let branch = "";
let languageIndex = 0;

// Initialising variables
let selected = null;
let viewingSubQuestions = false;
let clicked = false;
let responsesList = document.getElementById("responses-list");
let responsesHeader = document.getElementById("responses-header");
let questionsList = document.getElementById("questions-list");
let questionsSpinner = document.getElementById("questions-spinner");
let responsesSpinner = document.getElementById("responses-spinner");
let languageDropdown = document.getElementById("language-dropdown");

// A list of sub-question IDs of the currently in view
// long question
// <br>
// Basically the arrangement array of long question objects
let subQuestionIds = [];

// Hard-coded sample questions & responses
let responses = ["Response 1", "Response 2", "Response 3", "Response 1", "Response 2", "Response 3", "Response 1", "Response 2", "Response 3"];
let questions = [{question_number: "1.1", question: "What is your name?", type: "none"},
    {question_number: "1.2", question: "Where are you from?", type: "multiple-choice-sub-question"},
    {question_number: "1.3", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.4", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.5", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.6", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.7", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.8", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.9", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.10", question: "What is your first name, last name, and middle name?", type: "none"},
    {question_number: "1.11", question: "What is your first name, last name, and middle name?", type: "none"}];
let subquestions = [{question_number: "1.2.1", question: "What is your name?", type: "none"},
    {question_number: "1.2.2", question: "Where are you from?", type: "none"},
    {question_number: "1.2.3", question: "What is your first name, last name, and middle name?", type: "none"}];

/**
 * Adds list of questions in questions to the UI
 */
function addQuestionsList() {
    viewingSubQuestions = false;
    let questionsListString = "";

    for (let i = 0; i < questions.length; i++) {
        let innerFunction = "changeQuestion(" + i + ")";
        if (questions[i].type === TYPE_LONG_QUESTION) {
            innerFunction = "changeSubQuestion(" + i + ")";
        }

        questionsListString +=  '<button type="button" onclick="' + innerFunction + '" \
                                id="q' + i + '" class="list-group-item \
                                list-group-item-action flex-column align-items-start"> \
                                    <div class="row align-items-center"> \
                                    <div class="col"> \
                                        <strong>Question ' + questions[i].question_number + '</strong> \
                                        <div class="my-0 small">' + questions[i].question + '</div> \
                                        </div> \
                                    </div> \
                                </button>';
    }
    questionsList.innerHTML = questionsListString;
}

/**
 * Changes the responses to the question selected's responses.
 *
 * @param index Number representing the index of the question in the list.
 */
function changeQuestion(index) {
    if (selected != null) {
        selected.style.backgroundColor = "";
    }
    
    responsesSpinner.className += " d-flex"

    let q = "q" + index;

    selected = document.getElementById(q)
    selected.style.backgroundColor = "#d8d8d8";

    let header = "";
    if (!viewingSubQuestions) {
        header = "Question " + questions[index].question_number + " Responses"
    } else {
        header = "Question " + subquestions[index].question_number + " Responses"
    }

    let list = null;
    let buttonString = "";
    let phone = false;

    // If on phone, set responsesList = questionsList
    if ($(window).width() <= 575) {
        phone = true;
        buttonString = '<div style="text-align: center;"> \
                            <button type="button" class="btn btn-secondary" \
                            onclick="addQuestionsList()" style="width: 40%;"> \
                            Back \
                        </button></div>'
        questionsList.innerHTML = "";
    }
    // Else, use responsesList
    // else {
    //     list = responsesList;
    // }
    responsesList.innerHTML = "";
    responsesHeader.innerHTML = header;

    let responses_branch = "";
    if (!viewingSubQuestions) {
        responses_branch = `chatbot/survey_responses/${QUESTION_IDS[languageIndex][index]}`
    } else {
        responses_branch = `chatbot/survey_responses/${subQuestionIds[index]}`
    }
    responses = [];
    // Populate the responses list with the list of responses for that question
    firebase.firestore().collection(responses_branch).get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                responses.push(doc.data());
            });
        })
        .then(() => {
            // Populate HTML elements to display responses
            let listString = "";
            if (phone) {
                questionsList.innerHTML += 
                '<div class="card-header"> \
                  <strong class="h2 card-title" id="responses-header">' + header + '</strong> \
                </div>';
            }
            for (let i = 0; i < responses.length; i++) {
                listString += '<li class="list-group-item">' + responses[i].answer + '</li>'
            }
            if (phone) {
                questionsList.innerHTML += listString + '<br>';
                questionsList.innerHTML += buttonString;
            }
            responsesList.innerHTML += listString + '<br>';

            responsesSpinner.classList.remove("d-flex");
        });
}

/**
 * Changes the question list to list out the subquestions of a question.
 */
function changeSubQuestion(index) {
    // Some long question is selected, populate the sub-questions list
    subquestions = [];
    subQuestionIds = questions[index].arrangement;
    
    for (let i = 0; i < subQuestionIds.length; i++) {
        firebase.firestore().collection(QUESTIONS_BRANCHES[languageIndex])
            .doc(subQuestionIds[i])
            .get()
            .then((document) => {
                subquestions.push(document.data());
            })
            .then(() => {
                // After the last sub-question is fetched, populate the HTML
                // question elements
                if (i === subQuestionIds.length - 1) {
                    viewingSubQuestions = true;
                    let subQuestionsListString = '<div class="card-header"> \
                      <strong class="h3 card-title">Question ' + questions[index].question_number + ' Subquestions </strong> \
                      <div class="my-0 small">' + questions[index].question + '</div> \
                    </div>';
                    for (let i = 0; i < subquestions.length; i++) {
                        let innerFunction = "changeQuestion(" + i + ")";
                        subQuestionsListString += 
                                '<button type="button" onclick="' + innerFunction + '" \
                                id="q' + i + '" class="list-group-item \
                                list-group-item-action flex-column align-items-start"> \
                                    <div class="row align-items-center"> \
                                    <div class="col"> \
                                        <strong>Question ' + subquestions[i].question_number + '</strong> \
                                        <div class="my-0 small">' + subquestions[i].question + '</div> \
                                        </div> \
                                    </div> \
                                </button>';
                    }
                    questionsList.innerHTML = subQuestionsListString + '<br>';

                    let buttonString = '<div style="text-align: center;"> \
                        <button type="button" class="btn btn-secondary" \
                        onclick="addQuestionsList()" style="width: 40%;"> \
                        Back \
                        </button></div>'
                    questionsList.innerHTML += buttonString;
                }
            })
    }
}

window.onload = function () {
    // On load, get the list of questions, then populate
    // questions list
    addQuestions(languageIndex);
};

// Checks everytime the window is resized to prevent two response tabs
$(window).resize(function () {
    if ($(this).width() > 479) {
        addQuestionsList();
    }
});

function loadQuestions(languageSelection) {
    // After language selection, get the list of questions, then populate
    // questions list
    languageIndex = languageSelection.value;
    languageDropdown.innerHTML = languageSelection.innerHTML;
    responsesHeader.innerHTML = "Select a Question to view Responses!";
    responsesList.innerHTML = "";

    addQuestions(languageIndex);
}

function addQuestions(languageIndex) {
    branch = QUESTIONS_BRANCHES[languageIndex];
    questions = [];

    questionsList.innerHTML = "";
    questionsSpinner.className += " d-flex"

    for (let i = 0; i < QUESTION_IDS[languageIndex].length; i++) {
        firebase.firestore().collection(branch)
            .doc(QUESTION_IDS[languageIndex][i])
            .get()
            .then((document) => {
                questions.push(document.data());
            })
            .then(() => {
                // After the last question is fetched, populate the HTML
                // question elements
                if (i === QUESTION_IDS[languageIndex].length - 1) {
                    addQuestionsList();
                }

                // and clear the left/right pane labels
                questionsSpinner.classList.remove("d-flex");
            })
    }
}