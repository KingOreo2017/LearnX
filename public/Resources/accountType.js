function addUser(username, email) {
    // Get a reference to the "users" node
    var usersRef = firebase.database().ref('users');

    // Create a new child node under "users" with the username as the key
    var userRef = usersRef.child(username);

    // Set the user information (email in this case) under the user's node
    userRef.set({
        email: email
    });
}
