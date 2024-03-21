function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            writeUserData(user.uid, user.displayName, user.email);

            window.location.href = '/Main Body/index.html';
        })
        .catch(error => {
            console.error("Google login error:", error);
        });
}

function writeUserData(userId, displayName, email) {
    var usersRef = firebase.database().ref('users');
    var userRef = usersRef.child(displayName);
}
    
