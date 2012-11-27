(function(){

	var pluginName = "ftw";
	var plugin = function(){

		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"ftw_title" : "Create a fix the web report about this page (opens in a popup window)"
		});

		AtKit.addButton(
			pluginName,
			AtKit.localisation("ftw_title"),
			AtKit.getPluginURL() + 'images/FTW.png',
			function(dialogs, functions){
				loc = window.location.toString();
				loc = loc.replace(window.location.hash.toString(), "");
				var url = "http://www.fixtheweb.net/frame/report?url=" + encodeURI(loc);
				
				var load = window.open(url,'','scrollbars=no,menubar=no,height=260,width=370,resizable=no,toolbar=no,location=no,status=no');
				if (window.focus) {load.focus()}
				
				var externalWindow = load.document;
				
				externalWindow.all['edit-field-report-url'].focus();
			}, 
			null, null
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