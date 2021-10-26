/*
* This file is dedicated to uploading the long english version of the explanatory statement onto the firestore
* */

function uploadExplanatoryStatement_en_long(){
    let contents = "<center><b>(Survey Participant Group)</b></center><br>" +
        "<b>Project ID: 29459</b><br>" +
        "<b>Project title: Sustainable Work through Women-in-tech Application for Older Women in Malaysia and Thailand: " +
        "Integrating Action Research and Design Science Approach</b><br><br>" +
        "<center><b>Project email:</b> womenintech@monash.edu</center><br>" +
        "<b>Professor Teh Pei Lee</b><br>" +
        "School of Business<br>" +
        "Phone: +603-55144971<br>" +
        "email: teh.pei.lee@monash.edu<br><br>" +
        "<b>Dr Ewilly Liew Jie Ying</b><br>" +
        "School of Business<br>" +
        "Phone: +603-55145872<br>" +
        "email: ewilly.liew@monash.edu<br><br>" +
        "You are invited to take part in this study.  Please read this Explanatory Statement in full before deciding " +
        "whether or not to participate in this research. If you would like further information regarding any aspect of " +
        "this project, you are encouraged to contact the researchers via the phone numbers or email addresses listed above.<br><br>" +
        "<b>What does the research involve?</b><br><br>" +
        "In Malaysia and Thailand, numerous older women are illiterate, financially insecure, and less digital-savvy " +
        "than average. The urgency is amplified by the COVID-19 pandemic, which has significantly affected older women " +
        "given their fear and vulnerability to a higher risk of infection, loss of employment, and loss of social " +
        "support. With the lockdown conditions and closure of workplaces, alternatives should be provided for the less " +
        "digitally connected older women who are willing to adapt and learn.  This study aims to investigate the current" +
        " awareness, needs, knowledge, attitudes and practice toward technology among older women in rural areas in " +
        "Malaysia and Thailand.<br><br>" +
        "We want to understand your needs and perceptions about learning life skills and/or job-related skills using a " +
        "mobile application. The information you provided will be interpreted and translated from the social and " +
        "cultural aspects into implications for design of a new mobile application, the Women-in-tech app to help older " +
        "women in rural areas adapt technology and learn online. The Women-in-tech mobile app is designed to provide " +
        "artificial intelligence AI-based recommendation services to aid in the selection of online learning options " +
        "available for older women.<br><br>" +
        "You are invited to complete a chatbot survey in a mobile application developed by Monash Malaysia researchers. " +
        "The chatbot survey will take place on a web browser using your mobile phone, and will take about 15 – 30 " +
        "minutes to complete. At the end of the chatbot survey, you will be redirected to another Qualtrics form to " +
        "indicate your choice if you wish to opt-in to be contacted for a follow up interview within the next six (6) " +
        "months.<br><br>" +
        "<b>Payment/Compensation</b><br><br>" +
        "You will be awarded a token of appreciation of RM 10 cash via online transaction upon completion of the chatbot" +
        " survey. At the end of the chatbot survey, you will be redirected to another Qualtrics form to indicate your " +
        "choice if you wish to receive your cash reimbursement through (a) online banking transfer or (b) online " +
        "e-wallet transfer.  Specifically, you will be asked to provide banking details such as Payee Name, Payee Phone " +
        "Number, Payee Identification Card Number, Bank Account Number, Bank Name and Email Address for online " +
        "transaction and for auditing purposes by the Monash Finance team. There is a possibility of non-anonymity but " +
        "these personal information are only used for the purpose of online transaction of token of appreciation and not " +
        "in any other parts of the study. The additional information will be stored separately and will not be linked to " +
        "your chatbot survey responses. After the cash reimbursement, all payment data will be permanently deleted from " +
        "the Qualtrics platform. Please see the " +
        "<a href='https://www.qualtrics.com/privacy-statement/' target='_blank'>Qualtrics Privacy Statement</a>" +
        " for further information.<br><br>" +
        "<b>Research Procedure</b><br><br>" +
        "The chatbot survey requires you to access the survey on a web browser using your mobile phone. As such, your " +
        "mobile phone number will be required as a unique identifier to start the chatbot survey. Once you have " +
        "submitted your survey responses, we will de-identify your survey responses from your mobile phone number " +
        "after the chatbot survey is ended. Your submitted responses will be assigned an anonymous ID and only " +
        "anonymized survey responses will be analysed. You can choose to answer the chatbot survey in four different " +
        "languages i.e. English, Bahasa Malaysia, Mandarin Chinese, and Thai.<br><br>" +
        "<b>Why were you invited for this research?</b><br><br>" +
        "Your participation in this study is voluntary. Women aged 50 years and above are invited to participate in this" +
        " study. We are interested in your needs and perceptions about using technology for learning and views on the " +
        "use of a mobile application for online learning using AI-based recommendation services.<br><br>" +
        "<b>Source of funding</b><br><br>" +
        "This study is supported by the MUM-ASEAN Sustainable Development Research Grant Scheme 2021 – 2023.<br><br>" +
        "<b>Consenting to participate in the project and withdrawing from the research</b><br><br>" +
        "Participation in this study is voluntary and you are under no obligation to consent to participate. By " +
        "continuing the survey, you consent to take part in this research and agree to the information provided in the " +
        "Explanatory Statement. You can withdraw from the study at any point in time during the chatbot survey. We can " +
        "withdraw your submitted responses before the chatbot survey ends. However, when the chatbot survey is ended, " +
        "your submitted responses will be de-identified from your mobile phone number. At that point, we cannot " +
        "withdraw your answers from the study once your submitted responses have been entered in the database after the " +
        "chatbot survey is ended as we cannot trace your answers anymore once the collated data is de-identified and " +
        "anonymised.<br><br>" +
        "<b>Possible benefits and risks to participants</b><br><br>" +
        "Results of the study will help improve our understanding of an age-friendly technological solution, based on " +
        "the role of socio-technical design and artificial intelligence (AI) capability development, for the future of " +
        "older women in developing countries. This will assist researchers and government agencies to deliberate on new " +
        "technological solutions to improve the socio-economic welfare of older women in a competitive world.<br><br>" +
        "There is no foreseeable potential risk in the short or long term, except for the time spent during the survey, " +
        "using the participant's mobile phone to answer the survey questions via a low-tech chatbot.<br><br>" +
        "<b>Confidentiality</b><br><br>" +
        "This is a research project involving researchers from Monash University Malaysia and Thammasat University, " +
        "Thailand. All data that you contribute will be anonymised. Therefore, you will be assigned an anonymous ID " +
        "upon the completion of the chatbot survey, and your responses will remain confidential. Your responses will " +
        "not be identified, and no single individual’s results will be reported. Only the researchers from Monash " +
        "University Malaysia will have access to the complete data. Additionally, the results will be published in " +
        "peer reviewed journals, books/book chapters and presented at conferences.<br><br>" +
        "<b>Use of data for other purposes</b><br><br>" +
        "Data analysis will be conducted based on data which all personal identifiable information has been removed. " +
        "Participants can contact the researchers to know the outcomes of analyses performed based on data which all " +
        "personal identifiable information has been removed. In accordance with data sharing guidelines, de-identified " +
        "data may be made available for use by the other researchers.  This data will be held on secure public " +
        "repositories and may be a requirement of some journals prior to publication.  Any shared data will not " +
        "include your identifying details.<br><br>" +
        "<b>Results</b><br><br>" +
        "If you would like to be informed of the research findings, please contact Professor Teh Pei Lee at " +
        "Tel: +603-55144971 or email: teh.pei.lee@monash.edu.<br><br>" +
        "<b>Complaints</b><br><br>" +
        "Should you have any concerns or complaints about the conduct of the project, you are welcome to contact the " +
        "following officer<br><br>" +
        "<b>Ms. Jocelyn Fam<br>" +
        "Quality and Governance, Monash University Malaysia<br>" +
        "Jalan Lagoon Selatan, 47500, Bandar Sunway, Selangor Darul Ehsan, Malaysia.<br>" +
        "Tel: (+603) 5514 5664<br>" +
        "Email: jocelyn.fam@monash.edu</b><br><br>" +
        "Thank you<br><br><br>" +
        "<b>Dr. Teh Pei Lee</b><br>" +
        "Professor<br>" +
        "School of Business, Monash University Malaysia.<br>" +
        "Tel: +603-55144971; Email: teh.pei.lee@monash.edu"

    firebase.firestore().collection("ExplanatoryStatement").doc("ExplanatoryStatement_en_long").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}