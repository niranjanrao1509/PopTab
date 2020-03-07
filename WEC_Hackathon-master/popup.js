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
	var moveAll = function(tabs){

		   var getMatchingTabs = function(key,tabs) {



				  var matches = function( searchText, tab ) {
				    for(var i = 0; i < searchText.length; i++) {
				      if( (tab.url.toLowerCase()).search(searchText[i]) > -1 ) { return true; }
				      if( (tab.title.toLowerCase()).search(searchText[i]) > -1 ) { return true; }
				    }
				    return false;
				  };

		   	var key = key.toLowerCase().split(" ");
		    var matchingTabs = [];

		    for(var i = 0; i < tabs.length; i++) {

		        if( matches( key, tabs[i] ) ) {
		          matchingTabs.push( tabs[i] );
		        }
		    }
		    return matchingTabs;

		   };




        tempTabs = tabs;
        my_urls = [];
        var my_titles = [];
        my_titles.concat(tabs[0].title);
        for(var i = 1 ; i < tabs.length ; i++){
            my_titles=my_titles.concat(tabs[i].title);
            my_urls = my_urls.concat(tabs[i].url);
        }

		var tempTabs;
		var func = function(tabs){
			console.log(tabs);
		    tempTabs = tabs;
		    var div1 = document.getElementById('div1');
		    for(var i = 0 ; i < tabs.length ; i++ )
		    {
		        var button = document.createElement('input');
		        button.setAttribute('type','button');
		        button.setAttribute('value',tabs[i].title);
		        button.setAttribute('id',i.toString());
		        button.setAttribute('style','background-color: white ;border: 1px solid black;color: black;padding: 8px 50px;cursor: pointer;width: 100%; display: block;');
		        button.addEventListener('click',myfunc);
		        div1.appendChild(button);
		        
		    }
		};
		var myfunc = function()
		{
		    chrome.tabs.update(tempTabs[Number(this.id)].id, {active: true, highlighted: true});
		}

	  a=getMatchingTabs(searchText,tabs);
	  document.getElementById("div1").innerHTML = "";
	  func(a);
   };
  chrome.tabs.query({ currentWindow: false}, moveAll);
};


var showLink = function(){
    document.location.href = "list_links.html";
}

function poptabs(){
  searchText=document.getElementById('searchBox').value;
  // console.log(searchText);
	var moveAll = function(tabs){

		   var getMatchingTabs = function(key,tabs) {



				  var matches = function( searchText, tab ) {
				    for(var i = 0; i < searchText.length; i++) {
				      if( (tab.url.toLowerCase()).search(searchText[i]) > -1 ) { return true; }
				      if( (tab.title.toLowerCase()).search(searchText[i]) > -1 ) { return true; }
				    }
				    return false;
				  };

		   	var key = key.toLowerCase().split(" ");
		    var matchingTabs = [];

		    for(var i = 0; i < tabs.length; i++) {

		        if( matches( key, tabs[i] ) ) {
		          matchingTabs.push( tabs[i] );
		        }
		    }
		    return matchingTabs;

		   };




        tempTabs = tabs;
        my_urls = [];
        var my_titles = [];
        my_titles.concat(tabs[0].title);
        for(var i = 1 ; i < tabs.length ; i++){
            my_titles=my_titles.concat(tabs[i].title);
            my_urls = my_urls.concat(tabs[i].url);
        }

		var tempTabs;
		var func = function(tabs){
			console.log(tabs);
		    tempTabs = tabs;
		    var div1 = document.getElementById('div1');
		    for(var i = 0 ; i < tabs.length ; i++ )
		    {
		        var button = document.createElement('input');
		        button.setAttribute('type','button');
		        button.setAttribute('value',tabs[i].title);
		        button.setAttribute('id',i.toString());
		        button.setAttribute('style','background-color: white ;border: 1px solid black;color: black;padding: 8px 50px;cursor: pointer;width: 100%; display: block;');
		        button.addEventListener('click',myfunc);
		        div1.appendChild(button);
		        
		    }
		    var m=[];
		    for(var i = 0; i < tabs.length; i++) {
		    	m.push(tabs[i].id)
		    }


	        chrome.windows.create( {type: "normal"}, function( win ) {
	          var newWindow = win;
	          chrome.tabs.move( m, { windowId: newWindow.id, index: -1 }, function( tabs ) {
	          } )
	          chrome.tabs.remove( newWindow.tabs[newWindow.tabs.length - 1].id );
	        } );




		};
		var myfunc = function()
		{
		    chrome.tabs.update(tempTabs[Number(this.id)].id, {active: true, highlighted: true});
		}








	  a=getMatchingTabs(searchText,tabs);

	  document.getElementById("div1").innerHTML = "";

	  func(a);


   };


    
    

  chrome.tabs.query({ currentWindow: false}, moveAll);
};


function clear(){

	document.getElementById("div1").innerHTML = "";


};








document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', getSearchText);
  document.getElementById('showLinks').addEventListener('click',showLink);
  document.getElementById('pop').addEventListener('click',poptabs);
 document.getElementById('clear').addEventListener('click',clear);
 
});