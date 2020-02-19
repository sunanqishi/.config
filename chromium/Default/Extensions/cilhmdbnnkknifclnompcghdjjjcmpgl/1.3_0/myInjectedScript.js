
/*
https://stackoverflow.com/questions/5202296/add-a-hook-to-all-ajax-requests-on-a-page

https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script

*/

function getXhrUrl(){
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        console.log('request started!');
        this.addEventListener('load', function() {
            console.log('request completed!');
            console.log(this.readyState); //will always be 4 (ajax is completed successfully)
            // console.log(this.responseText); //whatever the response was
			console.log(this.responseURL); //URL

			// send msg to contentScript.js
			var lastXhrUrl = this.responseURL;
			
			
			if(lastXhrUrl.indexOf('apip.weatherdt.com') != -1){
				var cwCityId = lastXhrUrl.slice(-9);
				console.log('lastXhrUrl cwCityId is ' + cwCityId);

				if(!isNaN(cwCityId)){
					var event = new CustomEvent("passToContentScript", {detail: lastXhrUrl});
					window.dispatchEvent(event);
					console.log('lastXhrUrl cwCityId is valid');
				}else{
					console.log('lastXhrUrl cwCityId is invalid');
				}
			}else{
				console.log('lastXhrUrl does not contain apip.weatherdt.com');
			}


        });
        origOpen.apply(this, arguments);
    };
}


(function () {
	window.onload = function(e){
		console.log( 'window loaded' );
		getXhrUrl();
	}
})();


// send msg to Content script
// https://stackoverflow.com/questions/25838804/gmail-extension-sendmessage-to-background-from-page-context/25847017#25847017
/*
var message = { 'whatever' };
var event = new CustomEvent("passToContentScript", {detail: message});
window.dispatchEvent(event);
*/


// Air Quality Link
/*
function attacheCwAqiElClickEvent(){
		if(document.location.href.indexOf('apip.weatherdt.com') > 0){
			var cwAqiEl = document.querySelector('.wh5-nc-aqi');
			var cwCityId = document.location.href.slice(-9);
			console.log('cwCityId is ' + cwCityId);
			
			if(cwCityId != 'kqV4EtKUy'){
				var cwAqiUrl = 'https://m.weather.com.cn/maqi/'+cwCityId+'.shtml';
				console.log('cwAqiUrl is' + cwAqiUrl);
				cwAqiEl.onclick = function(){
					window.location.assign(cwAqiUrl);
				};
			}
		}
}

(function () {
	setTimeout(attacheCwAqiElClickEvent, 1000);
})();

*/

// 这个好些
function attacheCwAqiElClickEvent(){
		if(document.location.href.indexOf('apip.weatherdt.com') > 0){
			window.addEventListener("passToContentScript", function(evt) {
				var cwAqiEl = document.querySelector('.wh5-nc-aqi');
				var cwCityId = evt.detail.slice(-9);
				console.log('cwCityId is ' + cwCityId);
				var cwAqiUrl = '#';
				if(!isNaN(cwCityId)){
					cwAqiUrl = 'https://m.weather.com.cn/maqi/'+cwCityId+'.shtml';
					console.log('cwCityId is valid');
				}else{
					console.log('cwCityId is invalid');
				}
				console.log('cwAqiUrl is' + cwAqiUrl);
				cwAqiEl.onclick = function(){
					window.location.assign(cwAqiUrl);
				};
				
			}, false);
		}
}
attacheCwAqiElClickEvent();





















