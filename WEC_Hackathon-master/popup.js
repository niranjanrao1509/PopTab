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

var doGroup = function() {
    myFunc();
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var tempTabs;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var arr = new Array(tempTabs.length);
            //console.log(arr);
            //console.log(this);
            var count = 0;
            var tabObject = JSON.parse(this.responseText);
            //alert(this.Date);
            //alert(this.responseText);
            for ( var i = 0 ; i < tabObject.cluster_list.length ; i++ )
            {
                var keys = Object.keys(tabObject.cluster_list[i].document_list);
                for ( var j = 0 ; j < keys.length ; j++ )
                {
                    var num = Number(keys[j]);
                    if(typeof arr[num-1] === 'undefined')
                    {
                        arr[num-1]=count;
                        count++;
                    }
                }
            }
            document.getElementById('group').innerHTML = "By Content";
            for ( var i = 0 ; i < tempTabs.length ; i++)
            {
                var moveProperties = {index:arr[i]};
                chrome.tabs.move(tempTabs[i].id,moveProperties);    
            }
            
        }
    });
    var data = "key=8f15a67478a01cbbe2497542550c1117&lang=en&txt=";
    var moveAll = function(tabs){
        //alert(tabs)
        //alert(tabs.label);
        //alerts(tabs.category_list);
        test = JSON.stringify(tabs);
        // alert(test);
        tempTabs = tabs;
        my_urls = [];
        var my_titles = [];
        my_titles.concat(tabs[0].title);
        for(var i = 1 ; i < tabs.length ; i++){
            my_titles=my_titles.concat(tabs[i].title);
            my_urls = my_urls.concat(tabs[i].url);
        }
        preprocess(my_titles);
    };
    
    var func = function(my_titles){
        for ( var i = 0 ;i < my_titles.length ; i++)
        {oeplace("/[^a-zA-Z? ]/g, "," ");
            my_titles[i] = my_titles[i].replace("  "," ");
            
        }
                
            data = data.concat("\n",my_titles[0]);
            for(var i = 1 ; i < my_titles.length; i++)
            {
                data = data.concat("\n",my_titles[i]);
                //console.log(data);
            }
            xhr.open("POST", "http://api.meaningcloud.com/clustering-1.1");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            // alert(data);
            xhr.send(data);
    }
    var count = 0;
    var preprocess = function (my_titles){
        var my_new_titles = new Array(my_titles.length);
        for( var i = 0 ;i < my_titles.length ; i++)
        {
            var data = "key=8f15a67478a01cbbe2497542550c1117&txt=";
            data = data.concat(my_titles[i],"&model=IAB_en");
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                
                var tabObject = JSON.parse(this.responseText);
                my_new_titles[count] = my_titles[count];
                for(var j =  0 ;j < tabObject.category_list.length;j++)
                {
                    my_new_titles[count] = my_new_titles[count].concat(" ",tabObject.category_list[j].label);
                }
                count++;
                
                if(count == my_titles.length)
                {
                    func(my_titles);
                }
              }
            });

            xhr.open("POST", "http://api.meaningcloud.com/class-1.1");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.send(data);

            function sleep(milliseconds) {
                var start = new Date().getTime();
                var final=start+milliseconds;
                while(start<=final){
                    start = new Date().getTime();
                }
            }
            sleep(1500);
        }
    };
    
    chrome.tabs.query({ currentWindow: true}, moveAll);
};

var myFunc = function(){
    document.getElementById('group').innerHTML = "Waiting";
}

var doTitle = function()
{
    var move = function(tabs){
        tabs.sort(function(a,b){
            if(a.title<b.title)
                return -1;
            else if(a.title.toLowerCase()===b.title.toLowerCase())
                return 0;
            else
                return 1;
        });
        for ( var i = 0 ; i < tabs.length ; i++ )
        {
            var moveProperties = {index : i};
            chrome.tabs.move(tabs[i].id,moveProperties);
        }
    }
    chrome.tabs.query({ currentWindow: true}, move);
}

var doUrl = function()
{
    var move = function(tabs){
        tabs.sort(function(a,b){
            if(a.url<b.url)
                return -1;
            else if(a.url.toLowerCase()===b.url.toLowerCase())
                return 0;
            else
                return 1;
        });
        for ( var i = 0 ; i < tabs.length ; i++ )
        {
            var moveProperties = {index : i};
            chrome.tabs.move(tabs[i].id,moveProperties);
        }
    }
    chrome.tabs.query({ currentWindow: true}, move);
}

var doAll = function(){
    document.location.href = "AllTabs.html";
}
var getAll = function(){
    var getText = function(tabs){
        alert(chrome.tabs.title);
    }
}







document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', getSearchText);
  document.getElementById('showLinks').addEventListener('click',showLink);
  document.getElementById('pop').addEventListener('click',poptabs);
 document.getElementById('clear').addEventListener('click',clear);
 document.getElementById('group').addEventListener('click', doGroup);
document.getElementById('title').addEventListener('click', doTitle);
document.getElementById('url').addEventListener('click', doUrl);
document.getElementById('doAll').addEventListener('click',doAll);
// document.getElementById('getAll').addEventListener('click',getAll);
 
});