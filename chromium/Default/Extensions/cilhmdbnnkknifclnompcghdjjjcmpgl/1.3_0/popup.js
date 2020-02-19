
var weatherContent = document.getElementById('weatherContent');
var apiUrl;

// https://stackoverflow.com/questions/38261197/how-to-check-if-a-key-is-set-in-chrome-storage
chrome.storage.sync.get('lastXhrUrl', function(result) {
	if (typeof result.lastXhrUrl.lastXhrUrl === 'undefined'  ||  result.lastXhrUrl.lastXhrUrl === 'https://apip.weatherdt.com/h5.html?id=ekqV4EtKUy') {
		apiUrl = 'https://apip.weatherdt.com/h5.html?id=ekqV4EtKUy';
	} else {
		/* 
		lastXhrUrl json https://apip.weatherdt.com/plugin/data?key=ekqV4EtKUy&location=101280601
		webUrl https://apip.weatherdt.com/h5.html?id=ekqV4EtKUy&location=101280601
		*/
		apiUrl = 'https://apip.weatherdt.com/h5.html?id=ekqV4EtKUy&location='+result.lastXhrUrl.lastXhrUrl.slice(-9);
	}
	weatherContent.innerHTML = "<iframe id='iframeWeather' src='"+apiUrl+"' height='590' width='400' frameborder='0' scrolling='yes' >";
});

/*
(function () {
		chrome.storage.onChanged.addListener(function (changes,areaName) {
				console.log("New item in storage",changes.lastXhrUrl.newValue);
		})
})();
*/