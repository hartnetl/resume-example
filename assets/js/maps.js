function initMap() {
    /* Created using tutorials and https://developers.google.com/maps/documentation/javascript/marker-clustering?hl=en_GB#maps_marker_clustering-javascript  */


    var map = new google.maps.Map(document.getElementById("map"), { // Creates the map
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    // Labels for the markers on the map
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Set an array for each location - these are all in new york
    var locations = [{
            lat: 40.785091,
            lng: -73.968285
        },
        {
            lat: 41.084045,
            lng: -73.874245
        },
        {
            lat: 40.754932,
            lng: -73.984016
        }
    ];

    // Iterate through the array to create a marker for each

    // NOTES ON THIS JS MAP METHOD
    /* 
    The map method in JavaScript works similar to a forEach() function.
    The difference is that it returns an array with the results of looping through each item in our locations array.
    The map method can take up to three arguments:
        1 - location, the current value of where we are in the array as we're looping through.
        2 - i, the index number of where we currently are in the array.
    */

    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            // Using % here stops an error being thrown when you get more than 26 locations
        });
    });

    // Add a marker clusterer to manage the markers.
    new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}