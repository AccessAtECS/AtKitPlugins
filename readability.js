(function(){

	var pluginName = "readability";
	var plugin = function(){
		
		AtKit.addButton(
			'readability', 
			"Start Readability",
			'http://c.atbar.org/ATBar/images/readability.png',
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