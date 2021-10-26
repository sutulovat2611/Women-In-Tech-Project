
const USER_KEY = "USER";

function register(username,phone){
    //retrieve phone from local storage
    firebase.database().ref(`users/${phone}`).set({
        username: username,
        phone: phone
      });

    //set logged in user into local storage
    let user = JSON.parse(localStorage.getItem(USER_KEY));
    user["username"] = username;
    localStorage.setItem(USER_KEY,JSON.stringify(user));


    // //let the user know everything went fine
    document.getElementById("registeredMessage").innerHTML="<h3>You are all set. You will be redirectered shortly<h3>";
    //todo Redirect to the main page
    setInterval(function(){ 
        window.location = "main_page.html"
    }, 2000); //2 seconds

}

/**
 * Function that checks the validity of the input username written by user based on the
 * RegEx pattern given in the function.
 * @returns a boolean indicating whether the input username follows the criteria of
 *          only having alphanumeric usernames; no special characters are allowed with 
 *          length between 5 to 15 characters
 */
function usernameValidation() {

    //var username_regex = /^\+[0-9]{11,15}$/;
    // var username_regex =/^[a-zA-Z0-9_ ]*$/  ///^(?=.*[a-zA-Z"_\d].*)[a-zA-Z_\d]{5,15}$/
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

            register(username, JSON.parse(localStorage.getItem(USER_KEY))["phoneNumber"])
        }


    });


}
