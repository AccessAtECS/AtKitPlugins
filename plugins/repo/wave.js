(function(){

	var pluginName = "wave";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"wave_title" : "Use WAVE accessibility checker"
		});
		
		// WAVE
		AtKit.addButton(
			'wave', 
			AtKit.localisation("wave_title"),
			AtKit.getPluginURL() + 'images/wave.png',
			function(dialogs, functions){

				window.open('http://wave.webaim.org/report?url='+escape(window.location))	
				
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