console.log("I'M THE MEETUP AND I WORK!");


// how many photos to display per page
var perPage = 10; 
// maximum number of pages to display
// don't make less than 3 -- else pagination becomes useless
var maxPages = 11;

// searchTag gets updated when the user searches
var searchTag = "";

// meetup.com API Key --- to be hidden later with PHP
var key = "5b28d76494833466616a481457337";
// number of pages found
var pagesFound = 0;

// input tells you which page to show
function updatePage(){

  // clear past results first
  $("#results").empty();

  // create api URL
  var apiURL = "https://api.meetup.com/2/groups?callback=?&sign=true&member_id=208969008&page=20&api&key="+key+"&only=name,link";


$.getJSON(apiURL,function(flickrJson){ 

       console.log(flickrJson[0]);


  for ( i = 0; i < perPage; i++ ){ 

        $("#results").prepend('<p><a href="'+flickrJson.results[i].link+'">'+flickrJson.results[i].name+'</a></p>');
      } // end of for loop
  }); // end of getJSON

}


$( document ).ready(updatePage());