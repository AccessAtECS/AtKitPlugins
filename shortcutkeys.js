(function(){

	var pluginName = "shortcutkeys";
	var plugin = function(){
	
		$lib = AtKit.lib();
	
		// Select button based on keypress		
		ctrlModifier = false;
		TModifier = false;
		$lib(document).keyup(function (e) {
			if(e.which == 17) ctrlModifier = false;
			if(e.which == 84) TModifier = false;
		}).keydown(function (e) {
			if(e.which == 17) ctrlModifier = true;
			if(e.which == 84) TModifier = true;

			// If we don't have the T modifier just get the first button.
			if(e.which == 49 && ctrlModifier && !TModifier) {
				//$lib('.at-btn:eq(2) a').focus();
				//return false;
			} else if( e.which >= 49 && e.which <= 57 && ctrlModifier && TModifier){
				// Select the button at offset
				$lib('.at-btn:eq(' + ( String.fromCharCode(e.which) - 1 ) + ') a').focus();
				return false;
			}
		});

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