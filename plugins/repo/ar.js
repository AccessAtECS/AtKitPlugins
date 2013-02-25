(function(){

	var pluginName = "ar";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"title" : "Change language to Arabic"
		});
		
		AtKit.addLocalisationMap("ar", {
			"title" : "Change language to Arabic"
		});
		
		// Spell checker
		AtKit.addButton(
			'ar', 
			AtKit.localisation("title"),
			AtKit.getPluginURL() + 'images/ar.png',
			function(dialogs, functions){
				AtKit.setLanguage("ar");
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