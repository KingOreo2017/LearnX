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

    // Check if the user already exists in the database
    usersRef.child(userId).once('value', function(snapshot) {
        if (!snapshot.exists()) {
            // If the user doesn't exist, write their information to the database
            usersRef.child(userId).set({
                displayName: displayName,
                email: email
                // You can add more user data here if needed
            });
        }
    });
}
