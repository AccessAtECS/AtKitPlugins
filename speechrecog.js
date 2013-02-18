(function(){

	var pluginName = "speechrecog";
	var plugin = function(){
	
		AtKit.addButton(
			'speechrecog', 
			"Speech Recognition",
			AtKit.getPluginURL() + 'images/fugue/balloon-ellipsis.png',
			function(dialogs, functions){
				AtKit.message("<h1>Speech Recognition</h1><center><input type='text' x-webkit-speech /></center>");
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