// Signs-in Friendly Chat.
function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// Signs-out of Friendly Chat.
function signOut() {
  // Sign out of Firebase.
  firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// Saves a new message on the Cloud Firestore.
function saveMessage(messageText) {
  // Add a new message entry to the Firebase database.
  return firebase
    .firestore()
    .collection("messages")
    .add({
      name: getUserName(),
      text: messageText,
      profilePicUrl: getProfilePicUrl(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch(function (error) {
      console.error("Error writing new message to Firebase Database", error);
    });
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
  // Create the query to load the last 12 messages and listen for new ones.
  var query = firebase
    .firestore()
    .collection("messages")
    .orderBy("timestamp", "desc")
    .limit(12);

  // Start listening to the query.
  query.onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "removed") {
        deleteMessage(change.doc.id);
      } else {
        var message = change.doc.data();
        displayMessage(
          change.doc.id,
          message.timestamp.toMillis(),
          message.name,
          message.text,
          message.profilePicUrl,
          message.imageUrl
        );
      }
    });
  });
}

// Displays a Message in the UI.
function displayMessage(id, timestamp, name, text) {
  var div =
    document.getElementById(id) || createAndInsertMessage(id, timestamp);

  div.querySelector(".name").textContent = name;
  var messageElement = div.querySelector(".message");

  if (text) {
    // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, "<br>");
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function () {
    div.classList.add("visible");
  }, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
  messageInputElement.focus();
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (
    !window.firebase ||
    !(firebase.app instanceof Function) ||
    !firebase.app().options
  ) {
    window.alert(
      "You have not configured and imported the Firebase SDK. " +
        "Make sure you go through the codelab setup instructions and make " +
        "sure you are running the codelab using `firebase serve`"
    );
  }
}

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById("messages");
var messageFormElement = document.getElementById("message-form");
var messageInputElement = document.getElementById("message");
var submitButtonElement = document.getElementById("submit");
var userNameElement = document.getElementById("user-name");
var signInButtonElement = document.getElementById("sign-in");
var signOutButtonElement = document.getElementById("sign-out");

// Saves message on form submit.
messageFormElement.addEventListener("submit", onMessageFormSubmit);
signOutButtonElement.addEventListener("click", signOut);
signInButtonElement.addEventListener("click", signIn);

// initialize Firebase
initFirebaseAuth();

// We load currently existing chat messages and listen to new ones.
loadMessages();
