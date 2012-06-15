
window.onload = function() { 
  chrome.bookmarks.getTree(function(bookmarks) {
    printBookmarksOne(bookmarks);
    setTimeout(function() {openTab();},2250);
  });
};

function openTab(){
  chrome.tabs.create({url: "http://localhost:3000/researches?bookmarks="+document.body.innerHTML})
}

function printBookmarksOne(bookmarks) {
  bookmarks.forEach(function(bookmark) {
    if(isUrl(bookmark.url)){
        document.body.innerHTML += encodeURIComponent(bookmark.url) + "__";
    }
    if (bookmark.children)
      printBookmarksOne(bookmark.children);
  });
}


function printBookmarks(id) {
 chrome.bookmarks.getChildren(id, function(children) {
    children.forEach(function(bookmark) { 
      console.debug(bookmark.title);
      if(isUrl(bookmark.url)){
        document.body.innerHTML += bookmark.url + "<br/>";
        // google_query += " site:"+bookmark.url+" OR "
      }
      printBookmarks(bookmark.id);
    });
 });
}

function isUrl(url_string){
  var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  return re.test(url_string);
}

function getBookmarks() {
 
  chrome.bookmarks.getChildren("0", function(){
     document.body.innerHTML = "<b> Just wow!! </b>";
  });
}

