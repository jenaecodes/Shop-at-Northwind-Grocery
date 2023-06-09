//Redirect to home page if no product in query string 
const queryString = window.location.search;
    if (!queryString) {
      window.location.replace("index.html");
    }