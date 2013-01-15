(function(){

	var pluginName = "overlay";
	var plugin = function(){
			
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"overlay_title" : "Colour overlay",
			"overlay_title_yellow" : "yellow",
			"overlay_title_red" : "red",
			"overlay_title_blue" : "blue",
			"overlay_title_green" : "green"
		});
		AtKit.addLocalisationMap("ar", {
			"overlay_title" : "Colour overlay",
			"overlay_title_yellow" : "yellow",
			"overlay_title_red" : "red",
			"overlay_title_blue" : "blue",
			"overlay_title_green" : "green"
		});
		
		AtKit.addFn('addOverlay', function(args){
			$('body').prepend('<div class="overlay" style="background-color:#' + args.colour + '; opacity:0.4; position:absolute; top:0; left:0; height:100%; width:100%; z-index:10000; opacity:0.3; pointer-events: none;"></div>');
		});
		
		AtKit.addFn('removeOverlay', function(){
			$('.overlay').remove();
		});
		
		AtKit.addButton(
			'overlay', 
			AtKit.localisation("overlay_title"),
			AtKit.getPluginURL() + 'images/overlay.png',
			function(dialogs, functions){
				
				AtKit.addButton('overlayYellow', 
					AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_yellow"),
					AtKit.getPluginURL() + 'images/overlay-yellow.png', 
					function(dialogs, functions){
						AtKit.call('removeOverlay', {});
						AtKit.call('addOverlay', { 'colour':'BABA70' });
					});
				
				AtKit.addButton('overlayRed', 
					AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_red"),
					AtKit.getPluginURL() + 'images/overlay-red.png', 
					function(dialogs, functions){
						AtKit.call('removeOverlay', {});
						AtKit.call('addOverlay', { 'colour':'FF6699' });
					});
				
				AtKit.addButton('overlayBlue', 
					AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_blue"),
					AtKit.getPluginURL() + 'images/overlay-blue.png', 
					function(dialogs, functions){
						AtKit.call('removeOverlay', {});
						AtKit.call('addOverlay', { 'colour':'3399CC' });
					});
						
				AtKit.addButton('overlayGreen', 
					AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_green"),
					AtKit.getPluginURL() + 'images/overlay-green.png', 
					function(dialogs, functions){
						AtKit.call('removeOverlay', {});
						AtKit.call('addOverlay', { 'colour':'00CC66' });
					});
				
				AtKit.removeButton("overlay");
				
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