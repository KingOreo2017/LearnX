// Wait for the DOM content to be loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Initialize Firebase with your configuration object
    firebase.initializeApp(firebaseConfig);

    // Function to write user data to the database
    function writeUserDataToDatabase(user) {
        if (user) {
            const username = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;

            const database = firebase.database();
            const usersRef = database.ref('users');

            usersRef.child(username).once('value', snapshot => {
                alert(JSON.stringify(snapshot));
                if (!snapshot.exists()) {
                    const userRef = usersRef.child(username);
                    alert("3");
                    userRef.set({
                        email: email,
                        profilePicture: photoURL,
                        accountType: "student"
                    }).then(() => {
                        console.log("User data added to the database successfully!");
                        alert("5");
                    }).catch(error => {
                        console.error("Error adding user data to the database:", error);
                        alert("4");
                    });
                } else {
                    console.log("User already exists in the database.");
                    alert("6");
                }
            });
        } else {
            console.error("User not authenticated");
        }
    }

    // Function to handle Google login
    function googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                alert(JSON.stringify(user));
                console.log("Inside .then((result)!");
                writeUserDataToDatabase(user);
                window.location.href = '/Main Body/index.html';
            })
            .catch(error => {
                console.error("Google login error:", error);
            });
    }

    // Attach Google login function to the button click event
    document.querySelector('button').addEventListener('click', googleLogin);
});
