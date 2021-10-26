//References
let checkbox_textRef = document.getElementById("acceptStatement")
let tick_warningRef = document.getElementById("tick-warning")
let content_box = document.getElementById("content-box")
let confirmButtonRef = document.getElementById("confirmButton")
let backButtonRef = document.getElementById("backButton");
let titleRef = document.getElementById("title");

// add event listener for when confirm button is clicked
confirmButtonRef.addEventListener("click", checkAccepted);

// set title, checkbox text, buttons and tick_warning of page according to selected language
// initialising array of translations of the above mentioned page parts // TODO get confirmation form clients for these translations from google translate
let titles = ["解释性声明", "Pernyataan Penjelasan", "คำชี้แจง"];
let checkbox_texts = ["我已阅读并接受解释性声明", "Saya telah membaca dan setuju Pernyataan Penjelasan", "ฉันได้อ่านและยอมรับข้อคำชี้แจง"];
let tick_warnings = ["请在上方打勾以确认解释性声明", "Sila Tandakan di atas untuk Mengakui Pernyataan Penjelasan", "โปรดทำเครื่องหมายด้านบนเพื่อยอมรับใคำชี้แจง"];
let backButtonTexts = ["回页", "Kembali", "กลับมา"];
let confirmButtonTexts = ["确认", "mengesahkan", "ยืนยัน"];

// get selected language
let select_language = localStorage.getItem("LANGUAGE");

// checking if all translations for Explanatory Statement are on the firebase. If not , upload them.
// initialise string array of language branches
let languageBranch = ["ExplanatoryStatement_en_short", "ExplanatoryStatement_zh_CN_short", "ExplanatoryStatement_ms_short", "ExplanatoryStatement_th_short"];
let updatePage = false;

window.onload = function(){
    // change page elements according to selected language
    if (select_language == "Chinese (Simplified)") {
        titleRef.innerHTML = titles[0];
        checkbox_textRef.innerHTML = checkbox_texts[0];
        tick_warningRef.innerHTML = tick_warnings[0];
        backButtonRef.innerHTML = backButtonTexts[0];
        confirmButtonRef.innerHTML = confirmButtonTexts[0];
    } else if (select_language == "Malay") {
        titleRef.innerHTML = titles[1];
        checkbox_textRef.innerHTML = checkbox_texts[1];
        tick_warningRef.innerHTML = tick_warnings[1];
        backButtonRef.innerHTML = backButtonTexts[1];
        confirmButtonRef.innerHTML = confirmButtonTexts[1];
    } else if (select_language == "Thai") {
        titleRef.innerHTML = titles[2];
        checkbox_textRef.innerHTML = checkbox_texts[2];
        tick_warningRef.innerHTML = tick_warnings[2];
        backButtonRef.innerHTML = backButtonTexts[2];
        confirmButtonRef.innerHTML = confirmButtonTexts[2];
    }

    // for-loop to check if all of the supported language translations are on the firebase
    for (let i  = 0; i < languageBranch.length; i++) {
        let ExplanatoryStatementRef = firebase.firestore().collection("ExplanatoryStatement").doc(languageBranch[i]);
        ExplanatoryStatementRef.get().then((doc) => {
            if (doc.exists == false) {
                if (i == 0) {
                    // upload the english translation onto the firebase and update the page
                    uploadExplanatoryStatement_en_short();
                    updatePageContent(select_language, languageBranch);
                    updatePage = true;
                } else if  (i == 1) {
                    // upload the chinese translation onto the firebase and update the page
                    uploadExplanatoryStatement_zh_CN_short();
                    updatePageContent(select_language, languageBranch);
                    updatePage = true;
                } else if (i == 2) {
                    // upload the malay translation onto the firebase and update the page
                    uploadExplanatoryStatement_ms_short();
                    updatePageContent(select_language, languageBranch);
                    updatePage = true;
                } else if (i == 3) {
                    // upload the thai translation onto the firebase and update the page
                    uploadExplanatoryStatement_th_short();
                    updatePageContent(select_language, languageBranch);
                    updatePage = true;
                }
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    // if the page has not been updated, active updatePageContent
    if (!updatePage) {
        updatePageContent(select_language, languageBranch);
        updatePage = true;
    }
}


/**
 * function to update the explanatory statement page content by extracting the explanatory statement from the firestore database depending
 * on the selected language and putting it on the html through the content_box.
 * @param selected_language - a string that is either "English", "Chinese (Simplified)", "Malay" or "Thai" which represent english, chinese,
 * malay or thai respectively.
 * @param languageBranch - an array of the names of the specific branches on the firebase that contains a translation of
 * the explanatory statement.
 */
function updatePageContent(selected_language, languageBranch) {
    // initialize content for explanatory statement page
    let content;

    // check the selected language and and extract the corresponding translation of the explanatory statement and update the page
    if (select_language == "English") {
        let ExplanatoryStatementRef = firebase.firestore().collection("ExplanatoryStatement").doc(languageBranch[0]);
        ExplanatoryStatementRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the explanatory statement from firestore
            console.log("Error getting document:", error);
        });
    } else if (select_language == "Chinese (Simplified)") {
        let ExplanatoryStatementRef = firebase.firestore().collection("ExplanatoryStatement").doc(languageBranch[1]);
        ExplanatoryStatementRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the explanatory statement from firestore
            console.log("Error getting document:", error);
        });
    } else if (select_language == "Malay") {
        let ExplanatoryStatementRef = firebase.firestore().collection("ExplanatoryStatement").doc(languageBranch[2]);
        ExplanatoryStatementRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the explanatory statement from firestore
            console.log("Error getting document:", error);
        });
    } else if (select_language == "Thai") {
        let ExplanatoryStatementRef = firebase.firestore().collection("ExplanatoryStatement").doc(languageBranch[3]);
        ExplanatoryStatementRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the explanatory statement from firestore
            console.log("Error getting document:", error);
        });
    }
}


// function to check if user has clicked the checkbox before letting them continue to chatbot page
function checkAccepted(){
    // if it is checked, update user's realtime database data that they accept the Explanatory Statement
    if (checkbox.checked){
        window.location.href = "./chatbot.html"
    } else {
        // if the tickbox is not ticked, display error message
        tick_warning.hidden = false
    }
}