// https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('myInjectedScript.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);



// https://stackoverflow.com/questions/3937000/chrome-extension-accessing-localstorage-in-content-script/21066312
/*
(function () {
    var visited = window.location.href;
    var time = +new Date();
    chrome.storage.sync.set({'visitedPages':{pageUrl:visited,time:time}}, function () {
        console.log("Just visited",visited)
    });
})();
*/


// receive msg from myInjectedScript.js 
// https://stackoverflow.com/questions/25838804/gmail-extension-sendmessage-to-background-from-page-context/25847017#25847017
window.addEventListener("passToContentScript", function(evt) {
	// chrome.runtime.sendMessage(evt.detail);
	console.log(evt.detail);
	chrome.storage.sync.set({'lastXhrUrl':{lastXhrUrl:evt.detail}}, function () {
		console.log('lastXhrUrl Settings saved');
    });
}, false);