(function(){

	var pluginName = "overlay";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		var overlays = {
			"yellow": "BABA70",
			"red": "FF6699",
			"blue": "3399CC",
			"green": "00CC66"
		}
		
		var overlayRunning = 0;
		
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
			"overlay_title_green" : "green",
			"overlay_remove" : "Remove overlay"
		});
		AtKit.addLocalisationMap("ar", {
			"overlay_title" : "&#1604;&#1608;&#1606;&#160;&#1575;&#1604;&#1588;&#1575;&#1588;&#1577;",
			"overlay_title_yellow" : "&#1571;&#1589;&#1601;&#1585;",
			"overlay_title_red" : "&#1571;&#1581;&#1605;&#1585;",
			"overlay_title_blue" : "&#1571;&#1586;&#1585;&#1602;",
			"overlay_title_green" : "&#1571;&#1582;&#1590;&#1585;",
			"overlay_remove" : "Remove overlay"
		});
		
		AtKit.addFn('addOverlay', function(args){
			var overlay = '<div class="at-overlay" style="background-color:#' + args.colour + '; opacity:0.4; position:absolute; top:0; left:0; height:100%; width:100%; z-index:2147483640; opacity:0.3; filter: alpha(opacity = 30); pointer-events: none; position:fixed"></div>';
			$lib('body').prepend(overlay);
			AtKit.call('addOvelayClose', {});
		});
		
		AtKit.addFn('removeOverlay', function(){
			$lib('.at-overlay').remove();
			$lib('.at-overlay-close').remove();
			overlaysToggle.yellow = 0;
			overlaysToggle.red = 0;
			overlaysToggle.blue = 0;
			overlaysToggle.green = 0;
		});
		
		AtKit.addFn('addOvelayClose', function(){
			var direction = (AtKit.getLanguage() == 'ar') ? 'right' : 'left';
			var overlayClose = '<div class="at-overlay-close" style="position:absolute; ' + direction + ':96%; top:48px; z-index:9999999999; position:fixed""><a href="#" onclick="AtKit.call(\'removeOverlay\', {});"><img src="' + AtKit.getResourceURL() + '/resources/img/facebox-close.png" alt="' + AtKit.localisation("overlay_remove") + '" title="' + AtKit.localisation("overlay_remove") + '"/></a></div>';
			$lib('body').prepend(overlayClose);	
		});
		
		AtKit.addFn('toggleOverlayYellow', function(){
			if(overlaysToggle.yellow) AtKit.call('removeOverlay', {});
			else{
				AtKit.call('removeOverlay', {});
				AtKit.call('addOverlay', { 'colour':overlays.yellow });
				overlaysToggle.yellow = 1;
			}
		});
		
		AtKit.addFn('toggleOverlayRed', function(){
			if(overlaysToggle.red) AtKit.call('removeOverlay', {});
			else{
				AtKit.call('removeOverlay', {});
				AtKit.call('addOverlay', { 'colour':overlays.red });
				overlaysToggle.red = 1;
			}
		});
		
		AtKit.addFn('toggleOverlayBlue', function(){
			if(overlaysToggle.blue)	AtKit.call('removeOverlay', {});
			else{
				AtKit.call('removeOverlay', {});
				AtKit.call('addOverlay', { 'colour':overlays.blue });
				overlaysToggle.blue = 1;
			}
		});
		
		AtKit.addFn('toggleOverlayGreen', function(){
			if(overlaysToggle.green) AtKit.call('removeOverlay', {});
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
				
				AtKit.call('removeOverlay', {});
				if(!overlayRunning){
					overlayRunning = 1;
					
					AtKit.addSeparator('overlayStart');
					
					AtKit.addButton('overlayYellow', 
						AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_yellow"),
						AtKit.getPluginURL() + 'images/overlay-yellow.png', 
						function(dialogs, functions){
							AtKit.call('toggleOverlayYellow', {});
						});
					
					AtKit.addButton('overlayRed', 
						AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_red"),
						AtKit.getPluginURL() + 'images/overlay-red.png', 
						function(dialogs, functions){
							AtKit.call('toggleOverlayRed', {});
						});
					
					AtKit.addButton('overlayBlue', 
						AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_blue"),
						AtKit.getPluginURL() + 'images/overlay-blue.png', 
						function(dialogs, functions){
							AtKit.call('toggleOverlayBlue', {});
						});
					
					AtKit.addButton('overlayGreen', 
						AtKit.localisation("overlay_title") + " " + AtKit.localisation("overlay_title_green"),
						AtKit.getPluginURL() + 'images/overlay-green.png', 
						function(dialogs, functions){
							AtKit.call('toggleOverlayGreen', {});
						});
				}
				else{
					overlayRunning = 0;
					AtKit.removeSeparator('overlayStart');
					AtKit.removeButton('overlayYellow');
					AtKit.removeButton('overlayRed');
					AtKit.removeButton('overlayBlue');
					AtKit.removeButton('overlayGreen');
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