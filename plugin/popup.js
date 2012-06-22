window.onload = function() { 
  chrome.bookmarks.getTree(function(bookmarks) {
    printBookmarksOne(bookmarks);
    setTimeout(send_request,2250);
  });
};

function openTab(bookmarks_id){
  // chrome.tabs.create({url: "http://localhost:3000/researches/"+bookmarks_id});
  chrome.tabs.create({url: "http://googlesupport.heroku.com/researches/"+bookmarks_id});
}


function send_request(){
//   var req = new XMLHttpRequest();

//   req.onreadystatechange=function()
//   {
//     if (req.readyState==4)
//       {
//         document.body.innerHTML = "response is:" + req.responseXML + " -> "+req.responseText + "->" +req.responseJSON;
//         openTab(req.responseText);
//       }
//   }

//   req.open(
//       "POST",
//       // "http://googlesupport.heroku.com/researches?bookmarks="+document.body.innerHTML,
//       "http://localhost:3000/researches?bookmarks="+document.body.innerHTML+"&callback=?",
//       true);
//   req.setRequestHeader('Accept', 'application/json');
//   req.overrideMimeType("application/json");  
//   req.send();
// }

  if (typeof jQuery  == 'undefined') {
     document.body.innerHTML = "jquery not found....";
  }
  
  // $.post("http://localhost:3000/researches?bookmarks="+document.body.innerHTML+"&callback=?", function(data) {
  // $.post("http://localhost:3000/researches?bookmarks="+document.body.innerHTML, function(data) {
  //   document.body.innerHTML = "response is:"+data;
  //   //openTab(data);
  // });

    // document.getElementById('status').innerHTML = 'making a call';
    // var e = document.createElement('script');
    // e.src = 'http://localhost:3000/researches?bookmarks='+document.getElementById('urls').innerHTML;
    // document.getElementById('fb-root').appendChild(e);




  //Using AJAX not able to retrieve still :(
   $.ajax({
    // url: "http://localhost:3000/researches?callback=openTab",
    url: "http://googlesupport.heroku.com/researches?callback=openTab",
    type: "POST",
    data: {"bookmarks" : document.getElementById('urls').innerHTML},
    dataType: "json",
    // contentType: "application/json; charset=utf-8", //leading to [OPTIONS] request being seng
    success: function(obj){openTab(obj);},
    error: function(jqXHR, textStatus, errorThrown){document.getElementById('status').innerHTML = textStatus+errorThrown;}
    });

}



function printBookmarksOne(bookmarks) {
  document.getElementById('urls').innerHTML = "";
  bookmarks.forEach(function(bookmark) {
    if(isUrl(bookmark.url)){
        // document.body.innerHTML += encodeURIComponent(bookmark.url) + "__";
        document.getElementById('urls').innerHTML += bookmark.url + "__";
    }
    if (bookmark.children){
      printBookmarksOne(bookmark.children);
    }
  });
}


function printBookmarks(id) {
 chrome.bookmarks.getChildren(id, function(children) {
    children.forEach(function(bookmark) { 
      console.debug(bookmark.title);
      if(isUrl(bookmark.url)){
        document.body.innerHTML += bookmark.url + "<br/>";
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
