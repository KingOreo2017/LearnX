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

                // Set the user information (accountType) under the user's node
                userRef.set({
                    accountType: "student" // Set accountType to "student" by default
                }).then(() => {
                    console.log("User data added to the database successfully!");
                    // Redirect after successful database update
                    window.location.href = '/Student/index.html';
                }).catch(error => {
                    console.error("Error adding user data to the database:", error);
                });
            } else {
                // User already exists in the database, check their accountType
                const userData = snapshot.val();
                const accountType = userData.accountType;

                if (accountType === "student") {
                    console.log("User already exists as a student in the database.");
                    // Redirect if user is a student
                    window.location.href = '/Student/index.html';
                } else if (accountType === "teacher") {
                    console.log("User already exists as a teacher in the database.");
                    // Redirect if user is a teacher
                    window.location.href = '/Teacher/index.html';
                }
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
            console.log("Inside .then((result)!");
            writeUserDataToDatabase(user);
        })
        .catch(error => {
            console.error("Google login error:", error);
        });
}

// Attach Google login function to the button click event
document.querySelector('button').addEventListener('click', googleLogin);
