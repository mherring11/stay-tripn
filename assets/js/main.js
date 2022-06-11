// Global variables
let formEl = document.querySelector("#search-form");
let pastSearch = document.querySelector("#past-search");
let searchBtn = document.querySelector("#search-btn");

let searchInfo = [];

let searchFormHandler = function(event) {
    event.preventDefault();
    let searchInput = document.querySelector("input[id='searched-location']").value;
    
    console.log(searchInput);

    // checking if there is a valid input
    if (!searchInput) {
        alert("Please fill in a destination.")        
      return false;
    }
    
  // reset form for next search
  document.querySelector("input[id='searched-location']").value = "";
  
  // create object to pass to past searches and save function
  let searchInputObj = {
      city: searchInput
    }  
    
    searchInfo.push(searchInputObj);
    saveInfo();
}

// a card is displayed on the page in the Past Searches area

// save input as an object in localStorage
let saveInfo = function() {
    localStorage.setItem("searchInfo", JSON.stringify(searchInfo));
}



// search event listener
formEl.addEventListener("submit", searchFormHandler);