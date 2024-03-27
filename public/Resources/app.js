function writeUserDataToDatabase(user) {
    if (user) {
        const username = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;

        const database = firebase.database();
        const usersRef = database.ref('users');

        // Check if the user already exists in the database
        usersRef.child(username).once('value', snapshot => {
            if (!snapshot.exists()) {
                // If the user doesn't exist, create a new node with their information
                const userRef = usersRef.child(username);

                // Set the user information (email, profile picture, and accountType) under the user's node
                userRef.set({
                    email: email,
                    profilePicture: photoURL,
                    accountType: "student" // Set accountType to "student" by default
                }).then(() => {
                    alert("User data added to the database successfully!");
                }).catch(error => {
                    alert("Error adding user data to the database:", error);
                });
            } else {
                alert("User already exists in the database.");
            }
        }).catch(error => {
            alert("Error fetching user data from the database:", error);
        });
    } else {
        alert("User not authenticated");
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
