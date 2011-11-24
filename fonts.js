(function(){

	var pluginName = "fonts";
    var plugin = function(){

		var settings = {
			'baseURL': 'http://c.atbar.org/ATBar/'
		};

		if(/https:/.test(window.location.protocol)){
			settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}

		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"fonts_dialogTitle" : "Page font settings",
			"fonts_fontFace" : "Font Face",
			"fonts_lineSpacing" : "Line Spacing",
			"fonts_apply": "Apply"
		});

		AtKit.addLocalisationMap("ar", {
			"fonts_dialogTitle" : "&#1578;&#1594;&#1612;&#1612;&#1585; &#1606;&#1608;&#1593; &#1608;&#1606;&#1605;&#1591; &#1575;&#1604;&#1582;&#1591;",
			"fonts_fontFace" : "&#1606;&#1608;&#1593; &#1575;&#1604;&#1582;&#1591;",
			"fonts_lineSpacing": "&#1575;&#1604;&#1605;&#1587;&#1575;&#1601;&#1575;&#1578; &#1576;&#1610;&#1606; &#1575;&#1604;&#1571;&#1587;&#1591;&#1585;",
			"fonts_apply": "&#1578;&#1591;&#1576;&#1610;&#1602;"
		});		


		// Font settings
		var fontDialogs = {
				"main": "<h1>" + AtKit.localisation("fonts_dialogTitle") + "</h1><label for=\"sbfontface\">" + AtKit.localisation("fonts_fontFace") + ":</label> <select id=\"sbfontface\"><option value=\"sitespecific\">--Site Specific--</option><option value=\"arial\">Arial</option><option value=\"courier\">Courier</option><option value=\"cursive\">Cursive</option><option value=\"fantasy\">Fantasy</option><option value=\"georgia\">Georgia</option><option value=\"helvetica\">Helvetica</option><option value=\"impact\">Impact</option><option value=\"monaco\">Monaco</option><option value=\"monospace\">Monospace</option><option value=\"sans-serif\">Sans-Serif</option><option value=\"tahoma\">Tahoma</option><option value=\"times new roman\">Times New Roman</option><option value=\"trebuchet ms\">Trebuchet MS</option><option value=\"verdant\">Verdana</option></select><br /><br /> <label for=\"sblinespacing\">" + AtKit.localisation("fonts_lineSpacing") + "</label> <input type=\"text\" name=\"sblinespacing\" id=\"sblinespacing\" maxlength=\"3\" size=\"3\" value=\"100\">%<br /><br /><button id='ATApplyFont'>" + AtKit.localisation("fonts_apply") + "</a></div>"
		};
		
		AtKit.addFn('changeFont', function(args){
			if(args.fontFace != "--Site Specific--") $('body').css('font-family', args.fontFace);
			
			$('div').css('line-height', args.lineHeight + "%");
			$('#sbar').css('line-height', '0%');
			AtKit.storage('pageFont', args.fontFace);
			AtKit.storage('pageLineHeight', args.lineHeight);
		});
		
		AtKit.addButton(
			'fontSettings', 
			AtKit.localisation("fonts_dialogTitle"),
			settings.baseURL + 'images/font.png',
			function(dialogs, functions){
				AtKit.message(dialogs.main);
				
				var storedFont = AtKit.storage('pageFont');
				if(storedFont != false) $('#sbfontface').children('option[value="' + storedFont + '"]').attr('selected', 'selected');
				
				$('#ATApplyFont').click(function(){
					AtKit.call('changeFont', { 
						'fontFace': $('#sbfontface').val(),
						'lineHeight': $('#sblinespacing').val()
					});
				});
				
				$("#sbfontface").focus();
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
