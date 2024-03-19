/*document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();

    // Check authentication status on page load
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            console.log("Redirecting to /Main Body/index.html")
            window.location.href = '/Main Body/index.html';
        }
        else {
            console.error("User not authenticated");
        }
    });
});*/
// Create popup and signs in user
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