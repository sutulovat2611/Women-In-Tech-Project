


/**
 * the function is used to check if the user's entered email is valid or not, and perform the according actions.
 * Redirect to admin dashboard if correct email, and display an error otherwise
 * @param {1} email the input input from the user
 */
function adminLogin(email){

    let found = false;

    firebase.database().ref('admins')
    .orderByChild('email')
        .equalTo(email)
            .once('value', x => {
                x.forEach(data => {
                    console.log("valid email",data); //todo redirect later
                    found = true;
                });


                }).then(()=>{

                    if (!found){
                        //display an error
                        $('#input-error').html('The email entered is not a valid administrator email');
                    }
                    else{
                        $('#input-error').val('');
                        window.location = "admin_dashboard_landing.html"
                    }

                })

}
