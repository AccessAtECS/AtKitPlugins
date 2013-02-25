(function(){

	var pluginName = "en";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"title" : "Change language to English"
		});
		
		AtKit.addLocalisationMap("ar", {
			"title" : "Change language to English"
		});
		
		// Spell checker
		AtKit.addButton(
			'en', 
			AtKit.localisation("title"),
			AtKit.getPluginURL() + 'images/en.png',
			function(dialogs, functions){
				AtKit.setLanguage("en");
				console.log('Language changed to: ' + AtKit.getLanguage());
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