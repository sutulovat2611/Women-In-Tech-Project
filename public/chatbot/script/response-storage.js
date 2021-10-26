/**
 * This file contains functions related to storing/retrieving responses
 * from the Firestore Database.
 */

/**
 * Stores local question indices and other data to the cloud
 */
function syncProgress() {
    // Storing questionIndex to the cloud
    firebase.firestore().collection(USERS_BRANCH).doc(getUserID())
        .set({
            questionIndex: questionIndex,
            currentSubQuestionIds: currentSubQuestionIds,
            subQuestionIndex: subQuestionIndex
        })
        .then(() => {
            console.log(
                `Synchronizing with cloud... (at 'users/${getUserID()}')\n` +
                `\tquestionIndex = ${questionIndex}\n` +
                `\tcurrentSubQuestionIds = [${currentSubQuestionIds}]\n` +
                `\tsubQuestionIndex = ${subQuestionIndex}\n`
            );
        })
        .catch(() => {
            console.error("Error while storing question index: " +
                `'users/${getUserID()}'`);
        });
}

/**
 * Saves a user response to a survey question into the
 * Firestore Database. Uses the boolean lastSubQuestionAnswering variable to
 * indicate that the next subquestion being answered is the last subquestion.
 *
 * @param answer A string indicating the user's selected or typed answer.
 *               Objects are also accepted in more complex scenarios.
 */
let lastSubQuestionAnswering = false;
function saveResponse(answer) {
    // getting the timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()

    // Formulating the response object for the user responses branch
    let responseObject = {
        question_id: QUESTION_IDS[branch_id][questionIndex-1],
        type: currentQuestionObject.type,
        question: currentQuestionObject.question,
        restrictions: currentQuestionObject.restrictions,
        answer: answer,
        timestamp: timestamp
    };

    if (isAnsweringSubQuestions()) {
        // For sub-questions
        // 1. Append the titleQuestion attribute which
        // stores the long question
        responseObject.titleQuestion = titleQuestionString;

        // 2. Change the question_id to the sub question's ID
        // (instead of the "title" question's

        responseObject.question_id = currentSubQuestionIds[subQuestionIndex-2];

        if (subQuestionIndex === currentSubQuestionIds.length) {
            lastSubQuestionAnswering = true;
        }
    } else if (lastSubQuestionAnswering) {
        // For sub-questions
        // 1. Append the titleQuestion attribute which
        // stores the long question
        responseObject.titleQuestion = currentLongQuestionObject.question;

        // 2. Change the question_id to the sub question's ID
        // (instead of the "title" question's
        //responseObject.question_id = currentSubQuestionId;
        responseObject.question_id = currentLongQuestionObject.arrangement[currentLongQuestionObject.arrangement.length -1];

        // reset to false
        lastSubQuestionAnswering = false;
    }

    // Update the questionIndex on the cloud with the local one
    syncProgress();

    // Add an auto-ID response entry to the user branch
    firebase.firestore().collection(getUserResponsesBranch())
        .add(responseObject)
        .then((docRef) => {
            // console.log("Response object written with ID: ", docRef.id);

            // After writing the response to the user branch, also
            // write it to the responses branch
            // (chatbot/survey_responses/question_id)

            let reducedResponseObject = {
                phone: getUserID(),
                answer: answer,
                timestamp: timestamp
            };
            let responsesBranch = `chatbot/survey_responses/${responseObject.question_id}`;

            firebase.firestore().collection(responsesBranch)
                .doc(docRef.id)
                // The response ID we got in the first store
                .set(reducedResponseObject)
                .then(() => {
                    // console.log("Response written with ID: ", docRef.id,
                    //     " at survey_responses branch");
                })
                .catch((error) => {
                    console.error("Error writing response copy at" +
                        " survey_responses branch: ", error);
                });
        })
        .catch((error) => {
            console.error("Error writing response at " + getUserID() +
                " branch: ", error);
        });
}

function getUserID() {
    let userString = localStorage.getItem("USER");
    let user = JSON.parse(userString);
    return user["phone"]; //=== null ? currentUser.email : phone;
}

function getUserResponsesBranch() {
    // User responses are stored in
    // users/ [phone number/email] /responses
    return `users/${getUserID()}/responses`;
}

/**
 * Deletes all survey responses of the current user
 */
function purgeUserResponses() {
    let db = firebase.firestore();

    db.collection(getUserResponsesBranch()).get().then(responses => {
        responses.forEach(response => {
            // Get the ID of each response and delete it manually
            db.collection(getUserResponsesBranch()).doc(response.id)
                .delete()
                .catch((error) => {
                    console.error("Error removing response: ", error);
                });
        });

    });
    delete_user_responses_in_response_branch()
}

function delete_user_responses_in_response_branch(){
    let db = firebase.firestore();
    let compiledQuestionIDs = [QUESTION_IDS_EN, QUESTION_IDS_ZH_CN, QUESTION_IDS_MS,QUESTION_IDS_TH];
    let branch_ids = [EN_INDEX, ZH_CN_INDEX, MS_INDEX, TH_INDEX];


    for (let a = 0; a < branch_ids.length; a++) {
        for (let b = 0; b < compiledQuestionIDs[a].length; b++) {
            firebase.firestore().collection(QUESTIONS_BRANCHES[branch_ids[a]])
                .doc(compiledQuestionIDs[a][b])
                .get()
                .then((docRef) => {
                    let questionObject = docRef.data();
                    let questionType = questionObject.type;
                    switch (questionType) {
                        // question object
                        case TYPE_LONG_QUESTION:
                            for (let i = 0; i < (questionObject.arrangement).length; i++) {
                                let user_responses_query = db.collection(RESPONSE_BRANCH + '/' + questionObject.arrangement[i]).where('phone', '==', getUserID());
                                user_responses_query.get().then(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc) {
                                        doc.ref.delete();
                                    });
                                });
                            }
                            break;
                        default:
                            let user_responses_query = db.collection(RESPONSE_BRANCH + '/' + compiledQuestionIDs[a][b]).where('phone', '==', getUserID());
                            user_responses_query.get().then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    doc.ref.delete();
                                });
                            });
                            break;
                    }
                });
        }
    }
}