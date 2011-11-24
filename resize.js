(function(){

	var pluginName = "resize";
	var plugin = function(){

		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"resize_up" : "Increase Font Size",
			"resize_down" : "Decrease Font Size"
		});

		AtKit.addLocalisationMap("ar", {
			"resize_up" : "&#1586;&#1612;&#1575;&#1583;&#1577; &#1581;&#1580;&#1605; &#1575;&#1604;&#1582;&#1591;",
			"resize_down" : "&#1575;&#1606;&#1602;&#1575;&#1589; &#1581;&#1580;&#1605; &#1575;&#1604;&#1582;&#1591;"
		});

		var settings = { baseURL: "http://c.atbar.org/ATBar/" }

		if(/https:/.test(window.location.protocol)){
			settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}

		AtKit.addFn('resizeText', function(multiplier){
			var current = parseFloat($('body').css('font-size'));
		
			var mult = parseFloat(multiplier);
			var newVal = parseFloat(current + mult);
		
			$('body').css('font-size', newVal + "px" );
			AtKit.storage('pageFontSize', newVal);
		});
		
		// If we have a stored fontsize for this page, restore it now.
		var stored_fontSize = AtKit.storage('pageFontSize');
		if(stored_fontSize != false) $('body').css('font-size', stored_fontSize + "px" );
		
		AtKit.addButton(
			'resizeUp', 
			AtKit.localisation("resize_up"),
			settings.baseURL + 'images/font_increase.png',
			function(dialogs, functions){
				AtKit.call('resizeText', '1');
			},
			null, null
		);
		
		AtKit.addButton(
			'resizeDown', 
			AtKit.localisation("resize_down"),
			settings.baseURL + 'images/font_decrease.png',
			function(dialogs, functions){
				AtKit.call('resizeText', '-1');
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