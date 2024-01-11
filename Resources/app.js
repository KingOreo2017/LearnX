document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            window.location.href = '/Main Body/index.html'
        })
        .catch(console.log)
}