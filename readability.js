(function(){

	var pluginName = "readability";
	var plugin = function(){

		var settings = {
			'baseURL': 'http://c.atbar.org/ATBar/'
		};

		if(/https:/.test(window.location.protocol)){
			settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}
		
		AtKit.addButton(
			'readability', 
			"Start Readability",
			settings.baseURL + 'images/readability.png',
			function(dialogs, functions){
				window.readabilityToken='';
				AtKit.addScript(document.location.protocol + "//www.readability.com/bookmarklet/read.js");
			}
		);

	}

	if(typeof window['AtKit'] == "undefined"){

		window.AtKitLoaded = function(){
			var eventAction = null;
		
			this.subscribe = function(fn) {
				eventAction = fn;
			};
		
			this.fire = function(sender, eventArgs) {
				if (eventAction != null) {
					eventAction(sender, eventArgs);
				}
			};
		}

		window['AtKitLoaded'] = new AtKitLoaded();
		window['AtKitLoaded'].subscribe(function(){ AtKit.registerPlugin(pluginName, plugin); });
	} else {
		AtKit.registerPlugin(pluginName, plugin);
	}

})();