// Global variables
var searchFormEl = document.querySelector("#search-form");
var pastSearchEl = document.querySelector("#past-search");
var searchBtnEl = document.querySelector("#search-btn");

var searchInfo = [];

/**************************************/
/** PSEUDOCODE FOR DROPDOWN FEATURES **/
/**************************************/
// When the page loads, there should be a dropdown menu for countries (to query COVID API)
// (starting with just US and CA for now)
// When the user picks a country code, they're given another drop down to pick region (state/province for COVID second query)
// the regional COVID stats print to the page
// city search form is displayed for further drill-down on OpenTripMap and Accuweather APIs
// results for OpenTrip displayed
// Accuweather data is displayed


// city seearch form handler
var searchFormHandler = function(event) {
    event.preventDefault();
    var searchInput = document.querySelector("input[id='searched-location']").value;
    searchInput = searchInput.trim();
    
    // checking if there is a valid input
    if (searchInput) {
        // send city name to OpenTrip handler
        openTripHandler(searchInput);
    } else {    
        alert("Please fill in a destination.")        
    }

    // reset form for next search
    document.querySelector("input[id='searched-location']").value = "";
    
    // create object to pass to past searches and save function
    var searchInputObj = {
        city: searchInput
    }  
    
    // pushing to searchInfo array (is this step necessary?) How do we add country code from dropdown to this object?
    searchInfo.push(searchInputObj);
    // save array to localStorage
    saveInfo(searchInfo);
}

var openTripHandler = function(city) {
  // formats any city which has two or more words so that it's acceptable in the URL
  city = city.replace(" ", "%20");
    // getting OpenTripMap basic city data (longitude and latitude are needed to get other datapoints)
    fetch("https://api.opentripmap.com/0.1/en/places/geoname?name=" + city + "&country=US&apikey=5ae2e3f221c38a28845f05b62f4bde6c0a2383785f9aafa5d94a8281")
        .then(function(response) {
          if (response.ok) {
            response.json().then(function(data) {
              getVariables(data);
            });
          } else {
            alert("Error: No data found.");
          }
        })
        .catch(function(error) {
          alert("Unable to connect to OpenTripMap for location data.");
        });

    var getVariables = function(location) {
      var lon = location.lon
      var lat = location.lat
      console.log(lon, lat);
      var newApiUrl = "https://api.opentripmap.com/0.1/en/places/radius?radius=2000&lon=" + lon + "&lat=" + lat + "&kinds=historic,natural,cultural,amusements&limit=40&apikey=5ae2e3f221c38a28845f05b62f4bde6c0a2383785f9aafa5d94a8281";

      fetch(newApiUrl)
        .then(function(response) {
          if (response.ok) {
            response.json().then(function(data) {
              displayOpenTrip(data);
            });
          } else {
            alert("Error: Something went wrong.");
          }
        })
        .catch(function(error) {
          alert("Unable to connect to OpenTripMap for location data.")
        });
    }
}

var displayOpenTrip = function(cityInfo) {
  
   console.log(cityInfo);
  
}

    
// a card is displayed on the page in the Past Searches area
    
// save input as an object in localStorage
var saveInfo = function() {
    localStorage.setItem("searchInfo", JSON.stringify(searchInfo));
}


// Burger menus
document.addEventListener('DOMContentLoaded', function() {
    // open/close
    const toggler = document.querySelectorAll('[data-toggle="side-menu"]');
    
    if (toggler.length) {
        for (var i = 0; i < toggler.length; i++) {
            const target = toggler[i].getAttribute('data-target');
            
            if (target.length) {
                toggler[i].addEventListener('click', function(event) {
                    event.preventDefault();
                    const menu = document.querySelector(target);
                    
                    if (menu) {
                        menu.classList.toggle('is-hidden');
                    }
                });
            }
        }
    }
});


// city search event listener
searchFormEl.addEventListener("submit", searchFormHandler);
