(function(){

	var pluginName = "overlay";
	var plugin = function(){
			
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"overlay_title" : "Colour overlay"
		});
				
		AtKit.addButton(
			'overlay_yellow', 
			AtKit.localisation("overlay_title"),
			AtKit.getPluginURL() + 'images/palette.png',
			function(dialogs, functions){
				
				$('body').prepend('<div class="overlay" style="background-color:#BABA70; opacity:0.4; position:absolute; top:0; left:0; height:100%; width:100%; z-index:10000; opacity:0.4; pointer-events: none;"></div>');
			
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