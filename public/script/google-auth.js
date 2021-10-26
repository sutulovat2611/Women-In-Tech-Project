/**
 * Function called when clicking the Login/Logout button.
 */
function toggleSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            alert("successfully logged in");
            window.location = "main_page.html";
        } else {
            // User is signed out
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
            }).catch(function (error) {
                // Handle Errors here.
                console.error(error);
            });
        }
    });
}