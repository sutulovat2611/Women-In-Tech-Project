//References
let checkbox = document.getElementById("checkbox");
let tick_warningRef = document.getElementById("tick_warning");
let tick_line = document.getElementById("tick_warning_line");
let content_box = document.getElementById("content-box");
let confirmButtonRef = document.getElementById("confirmButton");
let titleRef = document.getElementById("title");
let checkbox_textRef = document.getElementById("checkbox_text");
let backButtonRef = document.getElementById("backButton");

// add event listener for when confirm button is clicked
confirmButtonRef.addEventListener("click", checkAccepted);

// set title, checkbox text, buttons and tick_warning of page according to selected language
// initialising array of translations of the above mentioned page parts // TODO get confirmation form clients for these translations from google translate
let titles = ["使用条款", "Terma Penggunaan", "เงื่อนไขการใช้บริการ"];
let checkbox_texts = ["我已阅读并接受使用条款", "Saya telah membaca dan menerima Syarat Penggunaan", "ฉันได้อ่านและยอมรับข้อกำหนดการใช้งาน"];
let tick_warnings = ["请在上方打勾以确认使用条款", "Sila Tandakan di atas untuk Mengakui Syarat Penggunaan", "โปรดทำเครื่องหมายด้านบนเพื่อรับทราบข้อกำหนดการใช้งาน"];
let backButtonTexts = ["回页", "Kembali", "กลับมา"];
let confirmButtonTexts = ["确认", "mengesahkan", "ยืนยัน"];

// get selected language
let select_language = localStorage.getItem("LANGUAGE");

// change page elements according to selected language
if (select_language == "Chinese (Simplified)") {
    //titleRef.innerHTML = titles[0];
    checkbox_textRef.innerHTML = checkbox_texts[0];
    tick_warningRef.innerHTML = tick_warnings[0];
    //backButtonRef.innerHTML = backButtonTexts[0];
    confirmButtonRef.innerHTML = confirmButtonTexts[0];
} else if (select_language == "Malay") {
    //titleRef.innerHTML = titles[1];
    checkbox_textRef.innerHTML = checkbox_texts[1];
    tick_warningRef.innerHTML = tick_warnings[1];
    //backButtonRef.innerHTML = backButtonTexts[1];
    confirmButtonRef.innerHTML = confirmButtonTexts[1];
} else if (select_language == "Thai") {
    //titleRef.innerHTML = titles[2];
    checkbox_textRef.innerHTML = checkbox_texts[2];
    tick_warningRef.innerHTML = tick_warnings[2];
    //backButtonRef.innerHTML = backButtonTexts[2];
    confirmButtonRef.innerHTML = confirmButtonTexts[2];
}

// function to check if user has clicked the checkbox before letting them continue to chatbot page
function checkAccepted(){
    // if it is checked, update user's realtime database data that they accept the terms of use
    if (checkbox.checked){

        window.location.href = "./signup.html";


    } else {
        // if the tickbox is not ticked, display error message
        tick_warningRef.hidden = false
        tick_line.hidden = false
    }
}

// checking if all translations for terms and conditions are on the firebase. If not , upload them.
// initialise string array of language branches
let languageBranch = ["TermsOfUse_en", "TermsOfUse_zn_CN", "TermsOfUse_ms", "TermsOfUse_th"];
let updatePage = false;

// for-loop to check if all of the supported language translations are on the firebase
for (let i  = 0; i < languageBranch.length; i++) {
    let TermsOfUseRef = firebase.firestore().collection("TermsOfUse").doc(languageBranch[i]);
    TermsOfUseRef.get().then((doc) => {
        if (doc.exists == false) {
            if (i == 0) {
                // upload the english translation onto the firebase and update the page
                uploadTermsOfUse_en();
                updatePageContent(select_language, languageBranch);
                updatePage = true;
            } else if  (i == 1) {
                // upload the chinese translation onto the firebase and update the page
                uploadTermsOfUse_zn_CN();
                updatePageContent(select_language, languageBranch);
                updatePage = true;
            } else if (i == 2) {
                // upload the malay translation onto the firebase and update the page
                uploadTermsOfUse_ms();
                updatePageContent(select_language, languageBranch);
                updatePage = true;
            } else if (i == 3) {
                // upload the thai translation onto the firebase and update the page
                uploadTermsOfUse_th();
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

/**
 * function to update the terms of use page content by extracting the terms of use from the firestore database depending
 * on the selected language and putting it on the html through the content_boxRef.
 * @param selected_language - a string that is either "en", "zh-CN", "ms" or "th" which represent english, chinese,
 * malay or thai respectively.
 * @param languageBranch - an array of the names of the specific branches on the firebase that contains a translation of
 * the terms of use.
 */
function updatePageContent(selected_language, languageBranch) {
    // initialize content for Terms of Use page
    let content;

    // check the selected language and and extract the corresponding translation of the terms of use and update the page
    if (select_language == "English") {
        let TermsOfUseRef = firebase.firestore().collection("TermsOfUse").doc(languageBranch[0]);
        TermsOfUseRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the terms of use from firestore
            console.log("Error getting document:", error);
        });
    } else if (select_language == "Chinese (Simplified)") {
        let TermsOfUseRef = firebase.firestore().collection("TermsOfUse").doc(languageBranch[1]);
        TermsOfUseRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the terms of use from firestore
            console.log("Error getting document:", error);
        });
    } else if (select_language == "Malay") {
        let TermsOfUseRef = firebase.firestore().collection("TermsOfUse").doc(languageBranch[2]);
        TermsOfUseRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the terms of use from firestore
            console.log("Error getting document:", error);
        });
    } else if (select_language == "Thai") {
        let TermsOfUseRef = firebase.firestore().collection("TermsOfUse").doc(languageBranch[3]);
        TermsOfUseRef.get().then((doc) => {
            if (doc.exists) {
                content =  doc.data();
                content_box.innerHTML = content.contents;
            }
        }).catch((error) => { // print error in getting the terms of use from firestore
            console.log("Error getting document:", error);
        });
    }
}
