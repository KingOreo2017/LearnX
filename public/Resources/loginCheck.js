document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.log("Redirecting to Login page")
            window.location.href = '/Login/index.html'
        }
    });
});