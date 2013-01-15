(function(){

	var pluginName = "overlay";
	var plugin = function(){
		
		var overlays = {
			"yellow": "BABA70",
			"red": "FF6699",
			"blue": "3399CC",
			"green": "00CC66"
		}
		
		var overlaysToggle = {
			"yellow": 0,
			"red": 0,
			"blue": 0,
			"green": 0
		};
		
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
			overlaysToggle.yellow = 0;
			overlaysToggle.red = 0;
			overlaysToggle.blue = 0;
			overlaysToggle.green = 0;
		});
		
		AtKit.addFn('toogleOverlayYellow', function(args){
			if(overlaysToggle.yellow){
				AtKit.call('removeOverlay', {});
			}
			else{
				AtKit.call('removeOverlay', {});
				AtKit.call('addOverlay', { 'colour':overlays.yellow });
				overlaysToggle.yellow = 1;
			}
		});
		
		AtKit.addFn('toogleOverlayRed', function(args){
			if(overlaysToggle.red){
				AtKit.call('removeOverlay', {});
			}
			else{
				AtKit.call('removeOverlay', {});
				AtKit.call('addOverlay', { 'colour':overlays.red });
				overlaysToggle.red = 1;
			}
		});
		
		AtKit.addFn('toogleOverlayBlue', function(args){
			if(overlaysToggle.blue){
				AtKit.call('removeOverlay', {});
			}
			else{
				AtKit.call('removeOverlay', {});
				AtKit.call('addOverlay', { 'colour':overlays.blue });
				overlaysToggle.blue = 1;
			}
		});
		
		AtKit.addFn('toogleOverlayGreen', function(args){
			if(overlaysToggle.green){
				AtKit.call('removeOverlay', {});
			}
			else{
				AtKit.call('removeOverlay', {});
				AtKit.call('addOverlay', { 'colour':overlays.green });
				overlaysToggle.green = 1;
			}
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
						AtKit.call('toogleOverlayYellow', {});
					});
				
				AtKit.addButton('overlayRed', 
					AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_red"),
					AtKit.getPluginURL() + 'images/overlay-red.png', 
					function(dialogs, functions){
						AtKit.call('toogleOverlayRed', {});
					});
				
				AtKit.addButton('overlayBlue', 
					AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_blue"),
					AtKit.getPluginURL() + 'images/overlay-blue.png', 
					function(dialogs, functions){
						AtKit.call('toogleOverlayBlue', {});
					});
						
				AtKit.addButton('overlayGreen', 
					AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_green"),
					AtKit.getPluginURL() + 'images/overlay-green.png', 
					function(dialogs, functions){
						AtKit.call('toogleOverlayGreen', {});
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