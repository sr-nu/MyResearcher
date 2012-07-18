var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-32860962-1']);
_gaq.push(['_trackPageview']);

window.onload = function() { 
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

  var done = false;
  var days = 10;
  
  populateGUID();


  chrome.bookmarks.getTree(function(bookmarks) {
    printBookmarksOne(bookmarks);
    if(done){
      send_request();
    }else{
      done = true;
    }
  });


  chrome.storage.local.get("days", function(items){

      if (items["days"]) {
        days = items["days"]; 
      }

      chrome.history.search({
          'text': '',           // Return every history item....
          'startTime': (new Date).getTime() - (3600000 * 24 * days) // that was accessed less than one week ago.
        },
        function(historyItems) {
          printBookmarksOne(historyItems);
          if(done){
            send_request();
          }else{
            done = true;
          }
        });
  });
};


var links = "";
var guid = "";

function openTab(bookmarks_id){
  // chrome.tabs.create({url: "http://localhost:3000/researches/"+bookmarks_id+"?r="+guid});
  chrome.tabs.create({url: "http://googlesupport.heroku.com/researches/"+bookmarks_id+"?r="+guid});
}


function send_request(){
  if (typeof jQuery  == 'undefined') {
     document.getElementById('status').innerHTML = "jquery not found....";
  }

 $.ajax({
  // url: "http://localhost:3000/researches?callback=openTab",
  url: "http://googlesupport.heroku.com/researches?callback=openTab",
  type: "POST",
  data: {"bookmarks" : links, "r" : guid},
  dataType: "json",
  success: function(obj){openTab(obj);},
  error: function(jqXHR, textStatus, errorThrown){document.getElementById('status').innerHTML = textStatus+' '+errorThrown;}
  });

}

function printBookmarksOne(bookmarks) {
  bookmarks.forEach(function(bookmark) {
    if(isUrl(bookmark.url)){
        links += bookmark.url + "__";
    }
    if (bookmark.children){
      printBookmarksOne(bookmark.children);
    }
  });
}



function populateGUID() {
  if(guid.length <= 0){
    chrome.storage.local.get("guid", function(items){
        if (!items["guid"]) {
          guid = guidGenerator();
          chrome.storage.local.set({'guid': guid}, function(){});
        }else{
          guid = items["guid"]; 
        }
    });
  }
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function isUrl(url_string){
  var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  return re.test(url_string);
}