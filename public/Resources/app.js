function writeUserDataToDatabase(user) {
    if (user) {
        const username = user.displayName;

        const database = firebase.database();
        const usersRef = database.ref('users');

        // Check if the user already exists in the database
        usersRef.child(username).once('value', snapshot => {
            if (!snapshot.exists()) {
                // If the user doesn't exist, create a new node with their information
                const userRef = usersRef.child(username);

                // Set the user information (email, profile picture, and accountType) under the user's node
                userRef.set({
                    accountType: "student" // Set accountType to "student" by default
                }).then(() => {
                    console.log("User data added to the database successfully!");
                    window.location.href = '/Student/index.html'; // Redirect after successful database update
                }).catch(error => {
                    console.error("Error adding user data to the database:", error);
                });
            } else {
                console.log("User already exists in the database.");
                window.location.href = '/Student/index.html'; // Redirect if user already exists
            }
        }).catch(error => {
            console.error("Error fetching user data from the database:", error);
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
                alert("Inside .then((result)!");
                writeUserDataToDatabase(user);
            })
            .catch(error => {
                alert("Google login error:", error);
            });
    }

    // Attach Google login function to the button click event
    document.querySelector('button').addEventListener('click', googleLogin);
