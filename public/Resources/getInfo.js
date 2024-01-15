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
        }
        else {
            console.error("User not authenticated");
        }
    });
});
