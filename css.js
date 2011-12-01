(function(){

	var pluginName = "css";
	var plugin = function(){

		var settings = {
			'baseURL': 'http://c.atbar.org/ATBar/'
		};
		
		if(/https:/.test(window.location.protocol)){
			settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}

		$lib = AtKit.lib();

		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"css_title" : "Change Styles",
			"css_changeColour" : "Change colour settings",
			"css_changeToolbar": "Change Toolbar colour",
			"css_changeText": "Change text and link colours",
			"css_changePage": "Change page style",
			"css_changeATbar": "Change ATbar colour",
			"css_changeBackground" : "Background colour",
			"css_set" : "Set",
			"css_black": "Black",
			"css_white": "White",
			"css_grey": "Grey",
			"css_random": "Random",
			"css_reset_defaults" : "Reset to Defaults",
			"css_change_linktext" : "Change text and link colours",
			"css_textcolour": "Text Colour:",
			"css_colour_original": "Original",
			"css_colour_red": "Red",
			"css_colour_blue": "Blue",
			"css_colour_green": "Green",
			"css_colour_yellow": "Yellow",
			"css_colour_orange": "Orange",
			"css_linkColour":"Link Colour:",
			"css_apply": "Apply",
			"css_change_page": "Change Page Styles",
			"css_black_white": "Black on White",
			"css_white_black": "White on Black",
			"css_yellow_black": "Yellow on Black",
			"css_black_yellow": "Black on Yellow",
			"css_white_grey": "White on Grey"
		});

		AtKit.addLocalisationMap("ar", {
			"css_title" : "&#1578;&#1594;&#1612;&#1612;&#1585; &#1605;&#1592;&#1607;&#1585; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577; &#1575;&#1604;&#1581;&#1575;&#1604;&#1612;&#1607;",
			"css_changeColour": "&#1573;&#1593;&#1583;&#1575;&#1583;&#1575;&#1578; &#1578;&#1594;&#1610;&#1610;&#1585; &#1575;&#1604;&#1571;&#1604;&#1608;&#1575;&#1606;",
			"css_changeToolbar": "&#1578;&#1594;&#1610;&#1610;&#1585; &#1604;&#1608;&#1606; &#1588;&#1585;&#1610;&#1591; &#1575;&#1604;&#1571;&#1583;&#1608;&#1575;&#1578;",
			"css_changeText": "&#1578;&#1594;&#1610;&#1610;&#1585; &#1571;&#1604;&#1608;&#1575;&#1606; &#1575;&#1604;&#1606;&#1589;&#1608;&#1589; &#1608;&#1575;&#1604;&#1585;&#1608;&#1575;&#1576;&#1591;",
			"css_changePage": "&#1578;&#1594;&#1610;&#1610;&#1585; &#1606;&#1605;&#1591; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577;",
			"css_changeATbar": "&#1578;&#1594;&#1610;&#1610;&#1585; &#1604;&#1608;&#1606;  ATbar",
			"css_changeBackground": "&#1604;&#1608;&#1606; &#1575;&#1604;&#1582;&#1604;&#1601;&#1610;&#1577;",
			"css_set":"&#1578;&#1591;&#1576;&#1610;&#1602;",
			"css_black":"&#1571;&#1587;&#1608;&#1583;",
			"css_white": "&#1571;&#1576;&#1610;&#1590;",
			"css_grey":"&#1585;&#1605;&#1575;&#1583;&#1610;",
			"css_random": "&#1593;&#1588;&#1608;&#1575;&#1574;&#1610;",
			"css_reset_defaults":"&#1575;&#1587;&#1578;&#1593;&#1575;&#1583;&#1577; &#1575;&#1604;&#1608;&#1590;&#1593; &#1575;&#1604;&#1571;&#1589;&#1604;&#1610;",
			"css_change_linktext":"&#1578;&#1594;&#1610;&#1610;&#1585; &#1571;&#1604;&#1608;&#1575;&#1606; &#1575;&#1604;&#1582;&#1591;&#1608;&#1591; &#1608;&#1575;&#1604;&#1585;&#1608;&#1575;&#1576;&#1591;",
			"css_textcolour":"&#1604;&#1608;&#1606; &#1575;&#1604;&#1606;&#1589;",
			"css_colour_original": "&#1575;&#1604;&#1571;&#1589;&#1604;&#1610;",
			"css_colour_red":"&#1571;&#1581;&#1605;&#1585;",
			"css_colour_blue":"&#1571;&#1586;&#1585;&#1602;",
			"css_colour_green":"&#1571;&#1582;&#1590;&#1585;",
			"css_colour_yellow": "&#1571;&#1589;&#1601;&#1585;",
			"css_colour_orange": "&#1576;&#1585;&#1578;&#1602;&#1575;&#1604;&#1610;",
			"css_linkColour":"&#1604;&#1608;&#1606; &#1575;&#1604;&#1585;&#1608;&#1575;&#1576;&#1591;",
			"css_apply":"&#1578;&#1591;&#1576;&#1610;&#1602;",
			"css_change_page":"&#1578;&#1594;&#1610;&#1610;&#1585; &#1606;&#1605;&#1591; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577;",
			"css_black_white":"&#1571;&#1587;&#1608;&#1583; &#1593;&#1604;&#1609; &#1582;&#1604;&#1601;&#1610;&#1577; &#1576;&#1610;&#1590;&#1575;&#1569;",
			"css_white_black":"&#1571;&#1576;&#1610;&#1590; &#1593;&#1604;&#1609; &#1582;&#1604;&#1601;&#1610;&#1577; &#1587;&#1608;&#1583;&#1575;&#1569;",
			"css_yellow_black": "&#1571;&#1589;&#1601;&#1585; &#1593;&#1604;&#1609; &#1582;&#1604;&#1601;&#1610;&#1577; &#1587;&#1608;&#1583;&#1575;&#1569;",
			"css_black_yellow":"&#1571;&#1587;&#1608;&#1583; &#1593;&#1604;&#1609; &#1582;&#1604;&#1601;&#1610;&#1577; &#1589;&#1601;&#1585;&#1575;&#1569;",
			"css_white_grey":"&#1571;&#1576;&#1610;&#1590; &#1593;&#1604;&#1609; &#1582;&#1604;&#1601;&#1610;&#1577; &#1585;&#1605;&#1575;&#1583;&#1610;&#1577;"
		});

		var colourOptions = "<option value=\"original\">--" + AtKit.localisation("css_colour_original") + "--</option><option value=\"B80028\">" + AtKit.localisation("css_colour_red") + "</option><option value=\"194E84\">" + AtKit.localisation("css_colour_blue") + "</option><option value=\"60BB22\">" + AtKit.localisation("css_colour_green") + "</option><option value=\"FDB813\">" + AtKit.localisation("css_colour_yellow") + "</option><option value=\"F17022\">" + AtKit.localisation("css_colour_orange") + "</option><option value=\"000000\">" + AtKit.localisation("css_black") + "</option><option value=\"A8B1B8\">" + AtKit.localisation("css_grey") + "</option><option value=\"FFFFFF\">" + AtKit.localisation("css_white") + "</option>";

		// CSS button
		var CSSDialogs = {
			"main": {
				"title":AtKit.localisation("css_changeColour"),
				"body":"<button id=\"sbColourChange\"> " + AtKit.localisation("css_changeToolbar") + "</button> <br /><button id=\"sbChangeSiteColours\"> " + AtKit.localisation("css_changeText") + "</button><br /> <button id=\"sbAttachCSSStyle\">" + AtKit.localisation("css_changePage") + "</button>"
			},
			"toolbar": {
				"title":AtKit.localisation("css_changeATbar"),
				"body":"<label for=\"sbbackgroundcolour\">" + AtKit.localisation("css_changeBackground") + "</label><input type=\"text\" name=\"sbbackgroundcolour\" id=\"sbbackgroundcolour\"> <button id=\"sbSetColour\">" + AtKit.localisation("css_set") + "</button> <br /> <p><button onclick=\"document.getElementById('sbbackgroundcolour').value = 'black';\">" + AtKit.localisation("css_black") + "</button> <button onclick=\"document.getElementById('sbbackgroundcolour').value = 'white';\">" + AtKit.localisation("css_white") + "</button> <button onclick=\"document.getElementById('sbbackgroundcolour').value = 'grey';\">" + AtKit.localisation("css_grey") + "</button></p> <br /> <button id=\"sbRandomColour\"> " + AtKit.localisation("css_random") + "</button> <button id=\"sbColourReset\">" + AtKit.localisation("css_reset_defaults") + "</button>"
			},
			"siteColours": {
				"title": AtKit.localisation("css_change_linktext"),
				"body": "<label for=\"sbtextcolour\" style=\"display:block\">" + AtKit.localisation("css_textcolour") + "</label><select id=\"sbtextcolour\" name=\"sbtextcolour\">" + colourOptions + "</select><br /><label for=\"sblinkcolour\" style=\"display:block\">" + AtKit.localisation("css_linkColour") + "</label><select id =\"sblinkcolour\">" + colourOptions + "</select> <br /><br /><button id=\"applyPageColours\">" + AtKit.localisation("css_apply") + "</button>"
			},
			"CSSStyles":{
				"title": AtKit.localisation("css_change_page"),
				"body": "<button id=\"sbApplyCSS-wb\">" + AtKit.localisation("css_black_white") + "</button><br /> <button id=\"sbApplyCSS-wbw\">" + AtKit.localisation("css_white_black") + "</button><br /> <button id=\"sbApplyCSS-yb\">" + AtKit.localisation("css_yellow_black") + "</button><br /> <button id=\"sbApplyCSS-by\">" + AtKit.localisation("css_black_yellow") + "</button><br /> <button id=\"sbApplyCSS-gw\">" + AtKit.localisation("css_white_grey") + "</button>"
			}
		};
		
		CSSFunctions = {
			"changeToolbar": function(){
				$lib("#sbbackgroundcolour").focus();
				
				$lib('#sbRandomColour').click(function(){ AtKit.call('setColour', "rand"); });
				$lib('#sbSetColour').click(function(){ AtKit.call('setColour', $lib("#sbbackgroundcolour").val() ); });
				$lib('#sbColourReset').click(function(){ AtKit.call('setColour', "#EBEAED"); });
			},
			"siteColours": function(){
				$lib('#applyPageColours').click(function(e){ 			
					if( $lib('#sbtextcolour').val() != "undefined" && $lib('#sbtextcolour').val() != "original" ){
						$lib('*').css('color', "#" + $lib('#sbtextcolour').val());
					}
					
					if( $lib('#sblinkcolour').val() != "undefined" && $lib('#sblinkcolour').val() != "original" ){
						$lib('a').css('color', "#" + $lib('#sblinkcolour').val());
					}
				});
				
				$lib('#sblinkcolour').keypress(function(e){ 
					if(e.keyCode == 13){  
						if( $lib('#sbpagebackgroundcolour').val() != "undefined"){
							$lib('body').css('backgroundColor', $lib('#sbpagebackgroundcolour').val());
						}
						
						if( $lib('#sbtextcolour').val() != "undefined" && $lib('#sbtextcolour').val() != "original" ){
							$lib('body').css('color', "#" + $lib('#sbtextcolour').val());
						}
						
						if( $lib('#sblinkcolour').val() != "undefined" && $lib('#sblinkcolour').val() != "original" ){
							$lib('a').css('color', "#" + $lib('#sblinkcolour').val());
						}	
						
						$lib(document).trigger('close.facebox');		
					} 
				
				});
				
				$lib("#sbtextcolour").focus();			
			},
			"CSSStyles": function(){
				$lib('#sbApplyCSS-yb').click(function(e){ 
					$lib(document).trigger('close.facebox');
					$lib('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-yo.css", "highvis-yo");
				});
				
				$lib('#sbApplyCSS-wb').click(function(e){ 
					$lib(document).trigger('close.facebox');
					$lib('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-wb.css", "highvis-wb");
				});
				
				$lib('#sbApplyCSS-wbw').click(function(e){
					$lib(document).trigger('close.facebox');
					$lib('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-bw.css", "highvis-wbw");
				});
				
				$lib('#sbApplyCSS-by').click(function(e){
					$lib(document).trigger('close.facebox');
					$lib('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-by.css", "highvis-by");
				});
				
				$lib('#sbApplyCSS-gw').click(function(e){
					$lib(document).trigger('close.facebox');
					$lib('link[rel=stylesheet]').remove();
					AtKit.addStylesheet(settings.baseURL + "stylesheets/high-gw.css", "highvis-by");
				});	
				
				
				$lib("#sbApplyCSS-wb").focus();
			}
		};
		
		AtKit.addFn('setColour', function(code){
			if(code == "rand"){
				colour = '#'+Math.floor(Math.random()*16777215).toString(16);
				$lib("#sbbackgroundcolour").val(colour);
			} else {
				colour = code;
			}
			$lib('#sbar').css('background-color', colour);
		});
		
		AtKit.addButton(
			pluginName,
			AtKit.localisation("css_title"),
			settings.baseURL + 'images/palette.png',
			function(dialogs, functions){
				AtKit.show(dialogs.main);
				
				$lib('#sbColourChange').click(function(){
					AtKit.show(dialogs.toolbar);
					functions.changeToolbar();
				});

				$lib('#sbChangeSiteColours').click(function(){
					AtKit.show(dialogs.siteColours);
					functions.siteColours();
				});

				$lib('#sbAttachCSSStyle').click(function(){
					AtKit.show(dialogs.CSSStyles);
					functions.CSSStyles();
				});
			}, 
			CSSDialogs, CSSFunctions
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