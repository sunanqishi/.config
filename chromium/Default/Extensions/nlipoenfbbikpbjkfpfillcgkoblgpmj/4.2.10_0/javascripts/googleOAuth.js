var googleOAuth={clientId:"934696770472-j7vpq5hjkgke5599r0jacuh95ekhga85.apps.googleusercontent.com",clientSecret:"wrVV86YTdcrqYtct2BRapBpm",redirectURL:"https://www.awesomescreenshot.com/google_auth_extension",scopes:["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/youtube.upload","https://www.googleapis.com/auth/drive.file"],oauthBaseURL:"https://accounts.google.com/o/oauth2/v2/auth",accessTokenURL:"https://www.googleapis.com/oauth2/v4/token",userInfoURL:"https://www.googleapis.com/oauth2/v2/userinfo",autherize:function(s){var n=this,e=this._get();e.accessToken?this._isAccessTokenExpired()?e.refreshToken?this._refreshAccessToken(e.refreshToken,function(e,t){var o=n._get();o.accessTokenDate=(new Date).valueOf(),o.accessToken=e,o.expiresIn=t,n._saveToLocalStorage(o),s&&s(e)}):(this.callback=s,this._openAuthorizationCodePopup()):s&&s(e.accessToken):(this.callback=s,this._openAuthorizationCodePopup())},finishAuth:function(e){var s=this,t=null;try{t=this._parseAuthorizationCode(e)}catch(e){this.callback&&this.callback(e)}this._getAccessAndRefreshTokens(t,function(e){var t=s._get();for(var o in t.accessTokenDate=(new Date).valueOf(),e)e.hasOwnProperty(o)&&e[o]&&(t[o]=e[o]);s._getUserInfo(t,function(e){s._saveToLocalStorage(e),s.callback&&s.callback(e.accessToken)})})},getAccount:function(){return this._get()},clearAccount:function(){localStorage.removeItem("google_oauth")},_getUserInfo:function(t,o){var s=new XMLHttpRequest;s.open("GET",this.userInfoURL),s.setRequestHeader("Authorization","OAuth "+t.accessToken),s.onreadystatechange=function(){if(4==this.readyState){var e=JSON.parse(s.response);t.email=e.email,o(t)}},s.send()},_saveToLocalStorage:function(e,t){"string"!=typeof e&&(e=JSON.stringify(e)),localStorage.google_oauth=e},_parseAuthorizationCode:function(e){var t=(e=decodeURIComponent(e)).match(/[&\?]error=([^&]+)/);if(t)throw"Error getting authorization code: "+t[1];return e.match(/.+?code=([\w\/\-]+)/)[1]},_parseAccessToken:function(e){var t=JSON.parse(e);return{accessToken:t.access_token,refreshToken:t.refresh_token,expiresIn:t.expires_in}},_getAccessAndRefreshTokens:function(e,t){var o=this,s=new XMLHttpRequest;s.addEventListener("readystatechange",function(e){4==s.readyState&&200==s.status&&t(o._parseAccessToken(s.responseText))});var n={code:e,client_id:o.clientId,client_secret:o.clientSecret,redirect_uri:o.redirectURL,grant_type:"authorization_code"},a=null,r=new FormData;for(a in n)r.append(a,n[a]);s.open("POST",o.accessTokenURL,!0),s.send(r)},_getAuthUrl:function(){return(this.oauthBaseURL+"?client_id={{CLIENT_ID}}&redirect_uri={{REDIRECT_URI}}&scope={{API_SCOPE}}&access_type=offline&response_type=code&prompt=consent").replace("{{CLIENT_ID}}",this.clientId).replace("{{REDIRECT_URI}}",this.redirectURL).replace("{{API_SCOPE}}",this.scopes.join(" "))},_get:function(e){var t=localStorage.google_oauth,o=t?JSON.parse(t):{};return e?o[e]:o},_isAccessTokenExpired:function(){var e=this._get();return(new Date).valueOf()-e.accessTokenDate>1e3*e.expiresIn},_openAuthorizationCodePopup:function(){chrome.tabs.create({url:this._getAuthUrl()})},_refreshAccessToken:function(e,o){var s=new XMLHttpRequest;s.onreadystatechange=function(e){if(4==s.readyState&&200==s.status){var t=JSON.parse(s.responseText);o(t.access_token,t.expires_in)}};var t=new FormData;t.append("client_id",this.clientId),t.append("client_secret",this.clientSecret),t.append("refresh_token",e),t.append("grant_type","refresh_token"),s.open("POST",this.accessTokenURL,!0),s.send(t)}};chrome.tabs.onUpdated.addListener(function(e,t,o){if(/^https:\/\/www.awesomescreenshot.com\/google_auth_extension/.test(t.url)){var s=t.url,n="?",a=s.indexOf(n);-1<a&&(n=s.substring(a)),googleOAuth.finishAuth(n),chrome.tabs.remove(e)}});