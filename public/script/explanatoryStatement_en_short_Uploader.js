/*
* This file is dedicated to uploading the short english version of the explanatory statement onto the firestore
* */

function uploadExplanatoryStatement_en_short(){
    let contents = "<center><b>(Survey Participant Group)</b></center><br>" +
        "<center><b>Project ID: 29459</b><br>" +
        "<b>Project email:</b> womenintech@monash.edu</center><br>" +
        "<b>Professor Teh Pei Lee</b><br>" +
        "School of Business<br>" +
        "Phone: +603-55144971<br>" +
        "email: teh.pei.lee@monash.edu<br><br>" +
        "<b>Dr Ewilly Liew Jie Ying</b><br>" +
        "School of Business<br>" +
        "Phone: +603-55145872<br>" +
        "email: ewilly.liew@monash.edu<br><br>" +
        "<b>What does the research involve?</b> We want to understand your needs and perceptions about learning using " +
        "obile application. You are invited to complete a chatbot survey in a mobile application developed by " +
        "Monash Malaysia researchers, which will take about 15 – 30 minutes.<br><br>" +
        "<b>Who can complete the survey?</b> Open to <b>all women aged 50 years and above <u>only</u>.</b><br><br>" +
        "<b>Withdrawal:</b> You may withdraw anytime during the survey duration, or pick up the survey later on " +
        "where you left from the last attempt.<br>" +
        "<b>Payment:</b> You will be awarded a token of appreciation of <b>RM10 cash</b> upon completion.<br><br>" +
        "<b>Confidentiality:</b> The survey is anonymous. All responses that you contribute will be anonymised. " +
        "At the end of the survey, you will be redirected to another Qualtrics survey and asked for two additional " +
        "information. (1) You have the choice to opt-in being contacted on your mobile phone number for future " +
        "(related) research projects that have obtained ethical approval. (2) You have the choice to provide additional " +
        "online banking or e-wallet details on how you want to receive your cash reimbursement, or terminate the " +
        "survey. Additional information provided will not be linked to your survey responses, but will be stored " +
        "separately on Monash server. After the cash reimbursement, all payment data will be permanently deleted " +
        "from the Qualtrics platform. Please see the " +
        "<a href='https://www.qualtrics.com/privacy-statement/' target='_blank'>Qualtrics Privacy Statement</a>" +
        " for further information.<br><br>" +
        "<b>Survey results:</b> No individual’s results will be reported. Only aggregate de-identified outcomes will " +
        "be published in peer-reviewed journals, books/ book chapters and presented at conferences. Participants " +
        "can contact the chief investigator to know the analyses outcomes.<br><br>" +
        "<b>Complaints:</b> for ethics concerns or complaints about the conduct of the project, please contact the " +
        "Monash University Human Research Ethics Committee at muhrec@monash.edu<br><br>" +
        "Please note, by continuing the survey you consent to take part in this research and agree to the information " +
        "provided in the Explanatory Statement.<br><br>" +
        "<a href='./explanatoryStatementLongPage.html'>Long Version of Explanatory Statement</a>"

    firebase.firestore().collection("ExplanatoryStatement").doc("ExplanatoryStatement_en_short").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}