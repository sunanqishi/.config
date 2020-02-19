'use strict';

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({'lastXhrUrl':{lastXhrUrl:'https://apip.weatherdt.com/h5.html?id=ekqV4EtKUy'}}, function () {
		console.log('set lastXhrUrl onInstalled');
    }); 
	
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'developer.chrome.com'},
			})],
				actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
