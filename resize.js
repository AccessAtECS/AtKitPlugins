(function(){

	var pluginName = "resize";
	var plugin = function(){

		$lib = AtKit.lib();

		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"resize_up" : "Increase Font Size",
			"resize_down" : "Decrease Font Size"
		});

		AtKit.addLocalisationMap("ar", {
			"resize_up" : "&#1578;&#1603;&#1576;&#1610;&#1585; &#1581;&#1580;&#1605; &#1575;&#1604;&#1582;&#1591;",
			"resize_down" : "&#1578;&#1589;&#1594;&#1610;&#1585; &#1581;&#1580;&#1605; &#1575;&#1604;&#1582;&#1591;"
		});

		AtKit.addFn('resizeText', function(multiplier){
			// Every HTML tag
			var tags = AtKit.getHtmlTags();
			
			for(var i = 0; i < tags.length; i++){
				var current = parseFloat($lib(tags[i]).css('font-size'));
				var mult = parseFloat(multiplier);
				var newVal = parseFloat(current + mult);
				$lib(tags[i]).css('font-size', newVal + "px");
			}
		});
		
		AtKit.addButton(
			'resizeUp', 
			AtKit.localisation("resize_up"),
			AtKit.getPluginURL() + 'images/font_increase.png',
			function(dialogs, functions){
				AtKit.call('resizeText', '1');
			},
			null, null
		);
		
		AtKit.addButton(
			'resizeDown', 
			AtKit.localisation("resize_down"),
			AtKit.getPluginURL() + 'images/font_decrease.png',
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
