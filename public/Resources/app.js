function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Redirect to '/Main Body/index.html' after successful sign-in
            window.location.href = '/Main Body/index.html';
        })
        .catch(error => {
            console.error("Google login error:", error);
        });
}
