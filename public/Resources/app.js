import { getDatabase } from "firebase/database";

const database = getDatabase();
function writeUserDataToDatabase(user) {
    if (user) {
        const username = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;

        const database = firebase.database();
        const usersRef = database.ref('users');

        usersRef.child(username).once('value', snapshot => {
            if (!snapshot.exists()) {
                const userRef = usersRef.child(username);

                userRef.set({
                    email: email,
                    profilePicture: photoURL,
                    accountType: "student"
                }).then(() => {
                    console.log("User data added to the database successfully!");
                }).catch(error => {
                    console.error("Error adding user data to the database:", error);
                });
            } else {
                console.log("User already exists in the database.");
            }
        });
    } else {
        console.error("User not authenticated");
    }
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("Inside .then((result)!");
            writeUserDataToDatabase(user);
            window.location.href = '/Main Body/index.html';
        })
        .catch(error => {
            console.error("Google login error:", error);
        });
}

firebase.auth().onAuthStateChanged(user => {
    writeUserDataToDatabase(user);
});
