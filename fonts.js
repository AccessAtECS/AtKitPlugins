(function(){

	var pluginName = "fonts";
    var plugin = function(){

		$lib = AtKit.lib();

		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"fonts_dialogTitle" : "Page font settings",
			"fonts_fontFace" : "Font Face",
			"fonts_lineSpacing" : "Line Spacing",
			"fonts_apply": "Apply"
		});

		AtKit.addLocalisationMap("ar", {
			"fonts_dialogTitle" : "&#1575;&#1604;&#1578;&#1581;&#1603;&#1605; &#1601;&#1610; &#1606;&#1608;&#1593; &#1575;&#1604;&#1582;&#1591;",
			"fonts_fontFace" : "&#1606;&#1608;&#1593; &#1575;&#1604;&#1582;&#1591;",
			"fonts_lineSpacing": "&#1575;&#1604;&#1605;&#1587;&#1575;&#1601;&#1575;&#1578; &#1576;&#1610;&#1606; &#1575;&#1604;&#1571;&#1587;&#1591;&#1585;",
			"fonts_apply": "&#1578;&#1591;&#1576;&#1610;&#1602;"
		});


		// Font settings
		var fontDialogs = {
				'main': '<h1>' + AtKit.localisation('fonts_dialogTitle') + '</h1><label for="sbfontface">' + AtKit.localisation('fonts_fontFace') + ':</label> <select id="sbfontface"><option value="sitespecific">--Site Specific--</option><option value="arial">Arial</option><option value="courier">Courier</option><option value="cursive">Cursive</option><option value="fantasy">Fantasy</option><option value="georgia">Georgia</option><option value="helvetica">Helvetica</option><option value="impact">Impact</option><option value="monaco">Monaco</option><option value="monospace">Monospace</option><option value="sans-serif">Sans-Serif</option><option value="tahoma">Tahoma</option><option value="times new roman">Times New Roman</option><option value="trebuchet ms">Trebuchet MS</option><option value="verdant">Verdana</option></select><br /><br /> <label for="sblinespacing">' + AtKit.localisation('fonts_lineSpacing') + '</label> <input type="text" name="sblinespacing" id="sblinespacing" maxlength="3" size="3" value="100">%<br /><br /><button id="ATApplyFont">' + AtKit.localisation('fonts_apply') + '</a></div>'
		};
		
		AtKit.addFn('changeFont', function(args){
			// Get all HTML tags from AtKit
			var tags = AtKit.getHtmlTags();
			
			if(args.fontFace != "--Site Specific--"){
				// Change font family
				for(var i = 0; i < tags.length; i++){
					$lib(tags[i]).css('font-family', args.fontFace);
				}
				// Change line height
				for(var k = 0; k < tags.length; k++){
					$lib(tags[k]).css('line-height', args.lineHeight + '%');
				}
				
				// Set ATbar line height back to 0%
				$lib('#sbar').find('div').css('line-height', '0%');
			}
			
		})
		
		AtKit.addButton(
			'fontSettings', 
			AtKit.localisation("fonts_dialogTitle"),
			AtKit.getPluginURL() + 'images/font.png',
			function(dialogs, functions){
				AtKit.message(dialogs.main);
				
				$lib('#ATApplyFont').click(function(){
					AtKit.call('changeFont', { 
						'fontFace': $lib('#sbfontface').val(),
						'lineHeight': $lib('#sblinespacing').val()
					});
				});
				
				$lib("#sbfontface").focus();
			},
			fontDialogs, null
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
