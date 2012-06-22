window.onload = function() { 
  chrome.bookmarks.getTree(function(bookmarks) {
    printBookmarksOne(bookmarks);
    send_request();
  });
};


var links = "";

function openTab(bookmarks_id){
  // chrome.tabs.create({url: "http://localhost:3000/researches/"+bookmarks_id});
  chrome.tabs.create({url: "http://googlesupport.heroku.com/researches/"+bookmarks_id});
}


function send_request(){
  if (typeof jQuery  == 'undefined') {
     document.getElementById('status').innerHTML = "jquery not found....";
  }

 $.ajax({
  // url: "http://localhost:3000/researches?callback=openTab",
  url: "http://googlesupport.heroku.com/researches?callback=openTab",
  type: "POST",
  data: {"bookmarks" : links},
  dataType: "json",
  success: function(obj){openTab(obj);},
  error: function(jqXHR, textStatus, errorThrown){document.getElementById('status').innerHTML = textStatus+errorThrown;}
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

function isUrl(url_string){
  var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  return re.test(url_string);
}

