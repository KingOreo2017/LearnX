document.addEventListener("DOMContentLoaded", () => {
    // Check authentication status on page load
    firebase.auth().onAuthStateChanged(user => {
        const welcomeParagraph = document.getElementById("welcome-paragraph");

        if (user) {
            const username = user.displayName || "User"; // Use the display name if available, otherwise default to "User"
            welcomeParagraph.textContent = `Welcome, ${username}!`;
        }
    });
});