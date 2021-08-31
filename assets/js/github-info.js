function userInformationHTML(user) {
    return `
    <h2>${user.name} 
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}">
            </a>
        </div>

        <p>
            Followers: ${user.followers} - Following: ${user.following} <br>
            Repos: ${user.public_repos}
        </p>
    </div>
    `
}

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

    /*
    Using promises to retrieve info from github api
        When X is done, Y will happen.
        Here it could be
            When we have gotten a response from the github api
            Then the function to display it in the gh-user-data div is executed
            Unless there is an error
    */

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`) //When the username entered is gotten
    ).then(  // We want to display it
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`)
            }
        });

}


