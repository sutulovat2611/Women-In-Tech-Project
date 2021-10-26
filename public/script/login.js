// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.4.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>



const USER_KEY = "USER";

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

/**
 * Function used to set the auth language
 * @returns none
 */
function setAuthLanguage(){

    let language = localStorage.getItem(LANGUAGE_KEY);

    if (language == null){
        firebase.auth().languageCode = "en";
        localStorage.setItem(LANGUAGE_KEY,"English")
        return
    }
    else if (language == "Malay")
        language = "ms";
    else if (language == "Chinese (Simplified)")
        language = "zh-CN";
    else if (language == "Thai")
        language = "th"
    else if (language == "English")
        language = "en"

    firebase.auth().languageCode = language;    

}


/**  Function used to change language of the captcha
 * @param newLanguage the language of choice chosen by user
 * @returns none
*/

function changeLanguage(newLanguage){
    if (newLanguage == "Malay")
        language = "ms";
    else if (newLanguage == "Chinese (Simplified)")
        language = "zh-CN";
    else if (newLanguage == "Thai")
        language = "th"
    else
        language = "en"

    // save language for the user upon login
    localStorage.setItem(LANGUAGE_KEY, language);

    setAuthLanguage();

    recaptchaVerifier.reset()
    // window.location = window.location  // refresh the page to reinitialize captcha
}




window.onload = function(){
    
    setAuthLanguage();
    render();

}


/**
 * Function renders a recaptcha
 * @returns none
 */
function render(){

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      });

    recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

}

let credentials;
let persisted = false; //true if the logged in user does not need to sign in again. And instead if has persisted from other session

/**
 * Function used to authenticate the user's phone number by sending them an OTP
 * @returns none
 */
 function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase

    //check invalid characters (space)
    if (number.includes(" ")){
        valid = false
        document.getElementById("error").innerHTML = "<p>Phone number obtain contains invalid characters. Please avoid using spaces and try again</p>";
    }
    //it takes two parameter first one is number,,,second one is recaptcha

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(()=>
    //the Persistence of the authentication is 'SESSION'. If window closed, then no longer signed in.
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        document.getElementById("input-pin").innerHTML = "It might take a minute to send the SMS to your phone.\n Once the SMS with the PIN has been sent to your phone. Please insert the pin below.";
        document.getElementById("input-pin").style.color = "green";

        // alert("Message sent");
    }).catch(function (error) {
        alert(error.message);
        document.getElementById("input-pin").innerHTML = "";

    })
    )
}

/**
 * Function that checks the validity of input phone number given by user based on the
 * RegEx pattern given in the function.
 * @returns a bool where true will be shown green, false will be shown red where
 *          it indicates if the input phone number follows the criteria of using
 *          a valid international phone number
 */
function phoneValidation() {

    let result = false;
    var phone_regex = /^\+[0-9]{8,19}$/; //11-15
    var telephone = document.getElementById("number").value

    // test the input number based on the RegEx pattern stated
    if (phone_regex.test(telephone) && telephone!="")
    {
        document.getElementById("input-error").innerHTML = "";
        document.getElementById("number").style.visibility="visible";
        document.getElementById("number").style.color="green";
        result = true;
    }
    else {
        document.getElementById("input-error").innerHTML = "Invalid phone number. Do avoid any letters, special characters and spaces. Please try again.";
        document.getElementById("number").style.visibility="visible";
        document.getElementById("number").style.color="red";
        result = false;
    }
    return result;
}


/**
 * Function which checks the verification pin the user entered
 * @returns none
 */
function codeverify() {
    var code=document.getElementById('verificationCode').value;

    // var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
    // firebase.auth().signInWithCredential(credential);

    coderesult.confirm(code).then((result)=> {
        const user = result.user
        document.getElementById("registeredMessage").innerHTML="<h3>You are all set. You will be redirectered shortly<h3>";

        //check if this user is already registered
        // checkUserExistence(document.getElementById("number").value);

    }).catch(function (error) {
        alert(error.message);
        recaptchaVerifier.reset();
        document.getElementById("input-pin").innerHTML = "Invalid PIN entered. Please resend a new pin and retry.";
        document.getElementById("input-pin").style.color = "red";
        //delete created user

        firebase.database().ref(`users/${document.getElementById("number").value}`).remove();
    });
}



/**
 * Function used to check if the user with the given phone number of already present in the database
 * @param {1} phone: the user's phone number 
 * @returns boolean true if exists and false is does not
 */
function checkUserExistence(phone){

    let proceed = phoneValidation();

    firebase.database().ref(`users/${phone}`).once("value", snapshot => {

        if (snapshot.exists() && proceed){
            
            let user = snapshot.val(); // get the user


            localStorage.setItem(USER_KEY,JSON.stringify(user));
            window.location = "main_page.html"
        }
        else if(!proceed){
            return; // do not proceed
        }
        else{  // keep as else if so as to not redirect if not proceed
            //!Need to ask to make up a username MAKE LOCAL STORAGE AND REDIRECT
            // localStorage.setItem(USER_KEY, JSON.stringify(phone)); //temporarily use the USER_KEY to store the users phone number
            let user = {
                username: "notset",
                phone: phone

            }
            localStorage.setItem(USER_KEY,JSON.stringify(user));
            window.location = "termsOfUsePage.html"; //TODO make this a proper redirect

        }

     })
        
}
   


/**
 * Function that creates a new user in the firebase database
 * @param {1} phone : the new users mobile number 
 * @param {2} username: the new users username 
 */
function makeNewUser(phone,username){

    firebase.database().ref(`users/${phone}`).set({
        username: username,
        phone: phone
      });
}


firebase.auth().onAuthStateChanged(function(user){
    if (user) {
        user.phone = user.phoneNumber;

        localStorage.setItem(USER_KEY,JSON.stringify(user));
        let userjson = JSON.parse(localStorage.getItem(USER_KEY));
        userjson["phone"] = userjson["phoneNumber"]
        localStorage.setItem(USER_KEY, JSON.stringify(userjson))
        checkUserExistence(user.phoneNumber);


     

    }
    else {
      // User is signed out.
    }
})




// CODE RELATED TO REGISTRATION

/**
 * Function used to register a new user into the database
 * @param {*} username the username input by user
 * @param {*} phone the user's phone number
 */
function register(username,phone){
    //retrieve phone from local storage
    makeNewUser(phone, username);
    
    //set logged in user into local storage
    let user = {
        username: username,
        phone: phone
    };

    firebase.database().ref('users').orderByChild('phone')
    .equalTo(phone).once('value', data => {

        // If username exists, output an error
        user = data.val();
        localStorage.setItem(USER_KEY,JSON.stringify(user));
    })
 
    codeverify();
}

/**
 * Function that checks the validity of the input username written by user based on the
 * RegEx pattern given in the function.
 * @returns a boolean indicating whether the input username follows the criteria of
 *          only having alphanumeric usernames; no special characters are allowed with 
 *          length between 5 to 15 characters
 */
function usernameValidation() {

    var username_regex =/^(?=.*[a-zA-Z\d ].*)[a-zA-Z\d ]{5,15}$/
    var username = document.getElementById("username").value

    // test the input number based on the RegEx pattern stated
    if (username_regex.test(username))
    {
        document.getElementById("error_username").innerHTML = "";
        document.getElementById("username").style.visibility="visible";
        document.getElementById("username").style.color="green";
    }
    else {
        document.getElementById("error_username").innerHTML = "<p>Username should be 5 to 15 characters long and not have any special characters like !@#$%^&*. Please try again.<p>";
        document.getElementById("username").style.visibility="visible";
        document.getElementById("username").style.color="red";
    }

    return username_regex.test(username)
}


 /**
  *  Function checks the validity of the chosen username based on the existing users in the database
  * @param {*} username the chosen username of the user to be registered 
  * @returns true if the username is available and false if there is another username who possesses the chosen username
  */
function checkUsernameValidity(){
    let username = document.getElementById("username").value;
    let valid = usernameValidation();

    //search the username in db. similar to phone number search
    firebase.database().ref('users').orderByChild('username')
    .equalTo(username).once('value', data => {
        data.forEach(() => {
            // If username exists, output an error
            document.getElementById("error_username").innerHTML = "<p>Username exists. Please choose another username</p>";
            valid = false;
        });
    }).then(() => {
        if (valid) {
            document.getElementById("error_username").innerHTML = "";
            //if valid, register the user
            register(document.getElementById("username").value, JSON.parse(localStorage.getItem(USER_KEY))["phone"]);
        }
    });
}
