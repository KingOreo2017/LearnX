function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Redirect to '/Main Body/index.html' after successful sign-in
            window.location.href = '/Main Body/index.html';
            writeUserData(user.uid, user.dispalyName, user.email);
        })
        .catch(error => {
            console.error("Google login error:", error);
        });
function writeUserData(userId, displayName, email) {
    firebase.database().ref('users/' + userId).set({
      username: displayName,
      email: email,
      accountType: "student"
    });
  }
}
