document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();

    // Check authentication status on page load
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const photoURL = user.photoURL;
            if (photoURL) {
                // Set the profile picture
                document.getElementById("profile-picture").src = photoURL;
            }
        } else {
            // Redirect to the main page if not authenticated
            window.location.href = '/Main Body/index.html';
        }
    });
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .catch(error => {
            console.error("Google login error:", error);
        });
}