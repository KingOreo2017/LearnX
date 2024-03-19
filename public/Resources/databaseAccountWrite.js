// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, check if it's a new user
    var isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

    if (isNewUser) {
      // User is a new user, create a new node under "users"
      var database = firebase.database();
      var usersRef = database.ref('users');
      var newUserRef = usersRef.push(); // Generate a new unique key for the user
      
      // Set initial data for the new user
      newUserRef.set({
        uid: user.uid,
        email: user.email,
        // Add more user data as needed
      });
    }
  }
});
