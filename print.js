(function(){

	var pluginName = "print";
	var plugin = function(){
		
		$lib = AtKit.lib();
				
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"print_title" : "Print page"
		});
		
		// Print
		AtKit.addButton(
			'print', 
			AtKit.localisation("print_title"),
			AtKit.getPluginURL() + 'images/printer.png',
			function(dialogs, functions){

				if(window['ppw']&&ppw['bookmarklet']){
					ppw.bookmarklet.toggle();
				}
				else {	window._pwyl_home="http://www.printwhatyoulike.com/";
					_pwyl_bmkl=document.createElement('script');
					_pwyl_bmkl.setAttribute('type','text/javascript');
					_pwyl_bmkl.setAttribute('src',_pwyl_home+'static/compressed/pwyl_bookmarklet_10.js');
					_pwyl_bmkl.setAttribute('pwyl','true'); 
					document.getElementsByTagName('head')[0].appendChild(_pwyl_bmkl);
				}
			
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