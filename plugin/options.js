function save_options() {
  var days = document.getElementById("days");
  var theValue = days.value;
  if (!theValue) {
    document.getElementById("status").innerText = 'Error: No value specified';
    return;
  }
  chrome.storage.local.set({'days': theValue}, function() {
  	document.getElementById("status").innerText = 'saved';
  });
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  document.getElementById("status").value = 'restored';
  chrome.storage.local.get("days", function(items){
		  if (!items["days"]) {
		    return;
		  }
		  var days = document.getElementById("days");
		  days.value = items["days"];	
  });
  
}

function clickHandler(e) {
  setTimeout(save_options, 1000);
}
// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
	restore_options();
  document.querySelector('button').addEventListener('click', clickHandler);
});



