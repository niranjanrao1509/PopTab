// chrome.runtime.onMessage.addListener(function(request, sender) {
//   if (request.action == "getSource") {
//     message.innerText = request.source;
//   }
// });

// function onWindowLoad() {

//   var message = document.querySelector('#message');

//   chrome.tabs.executeScript(null, {
//     file: "getPagesSource.js"
//   }, function() {
//     // If you try and inject into an extensions page or the webstore/NTP you'll get an error
//     if (chrome.runtime.lastError) {
//       message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
//     }
//   });

// }

// window.onload = onWindowLoad;
function getSearchText(){
  searchText=document.getElementById('searchBox').value;
  // console.log(searchText);
  	alert(searchText);
	var moveAll = function(tabs){
	  tempTabs = tabs;
	  my_urls = [];
	  var my_titles = [];
	  my_titles.concat(tabs[0].title);
	  for(var i = 1 ; i < tabs.length ; i++){
	      my_titles=my_titles.concat(tabs[i].title);
	      my_urls = my_urls.concat(tabs[i].url);
	  }
	  alert(my_titles);
	};

    
    

  chrome.tabs.query({ currentWindow: false}, moveAll);


var showLink = function(){
    document.location.href = "list_links.html";
}




}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', getSearchText);
  document.getElementById('showLinks').addEventListener('click',showLink);
 
});