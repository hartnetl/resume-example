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

// This is the lesson 
// https://www.youtube.com/watch?v=OEEb_LXSXh4

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos here!</div>`;
    }

    // Remember map works like forEach() and returns an array
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
    });

    // Now we want to display it on screen
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List: </strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`
            // We use join on the array to join everything on a new line
}

function fetchGitHubInformation(event) {
    // Empty divs so data isn't stored as search is changed
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

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
        $.getJSON(`https://api.github.com/users/${username}`), //When the username entered is gotten
        $.getJSON(`https://api.github.com/users/${username}/repos`) // Let's get the repos too
    ).then(  // We want to display it
        function(firstResponse, secondResponse) {
            // When we do 2 calls, the response is returned as an array by the when() method
            // Each response is in the first index
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else if(errorResponse.status === 403) {
                // This gets the time until we can perform another API request
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') *1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`)
            }
        });
}

// Display Octocat when page loads
$(document).ready(fetchGitHubInformation);

