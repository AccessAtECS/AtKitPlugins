(function(){

	var pluginName = "google";
	var plugin = function(){
			
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"google_title" : "Google search"
		});

		// Google
		AtKit.addButton(
			'google', 
			AtKit.localisation("google_title"),
			AtKit.getPluginURL() + 'images/google.png',
			function(dialogs, functions){


				q = "" + (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text); 
				
				if (!q) {
					q = prompt("You did not select any text.  Enter a search phrase:", ""); 
				}
				if (q!=null) {
					location="http://www.google.com/search?q=" + escape(q).replace(/ /g, "+"); 
				}
				void 0
			
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