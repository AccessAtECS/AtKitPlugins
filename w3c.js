(function(){

	var pluginName = "w3c";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"plugin_title" : "Use W3C HTML validator"
		});
		
		// WAVE
		AtKit.addButton(
			'w3c', 
			AtKit.localisation("plugin_title"),
			AtKit.getPluginURL() + 'images/w3c.png',
			function(dialogs, functions){

				window.open('http://validator.w3.org/check?uri='+escape(window.location))	
				
			},
			null, null
		);

	};

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