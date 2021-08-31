function fetchGitHubInformation(event) {

    var username = $("#gh-username").val(); // Create a varible to hold the retrieved username
    if (!username) { // if username is empty...
        $("#gh-user-data").html(`<h2>Please enter a gitHub username</h2>`); // Ask user to enter a git hub username
        return; // This stops the call for the github api if the field is empty
    }
    $("gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading">
        </div>`
    );
}

// function fetchGitHubInformation(event) {

//     var username = $("#gh-username").val();
//     if (!username) {
//         $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
//         return;
//     }

//     $("#gh-user-data").html(
//         `<div id="loader">
//             <img src="assets/css/loader.gif" alt="loading..." />
//         </div>`);
// }