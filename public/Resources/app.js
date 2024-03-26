// Wait for the DOM content to be loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Initialize Firebase with your configuration object
    firebase.initializeApp(firebaseConfig);

    // Function to write user data to the database
    function writeUserDataToDatabase(user) {
        if (user) {
            alert("1");
            const username = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;

            const database = firebase.database();
            const usersRef = database.ref('users');
            alert(usersRef.toString());
            usersRef.child(username).once('value', snapshot => {
                alert("2");
                if (!snapshot.exists() || snapshot.val() === null) {
                    alert("3");
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

    // Function to handle Google login
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

    // Attach Google login function to the button click event
    document.querySelector('button').addEventListener('click', googleLogin);
});
