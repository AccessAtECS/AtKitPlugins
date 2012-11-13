(function(){

	var pluginName = "calc";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"calc_title" : "Start instant calculator"
		});
		
		// Calculator
		AtKit.addButton(
			'calc', 
			AtKit.localisation("calc_title"),
			AtKit.getPluginURL() + 'images/calculator.png',
			function(dialogs, functions){
				
				instacalc_script=document.createElement('SCRIPT');
				instacalc_script.type='text/javascript';
				instacalc_script.src='http://instacalc.com/gadget/instacalc.bookmarklet.js?x='+ Math.random();document.getElementsByTagName('head')[0].appendChild(instacalc_script);		

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