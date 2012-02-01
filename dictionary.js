(function(){

	var pluginName = "dictionary";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		var settings = {
			'serverURL': 'http://a.atbar.org/'
		};

		if(/https:/.test(window.location.protocol)){
			settings.serverURL = "https://ssl.atbar.org/a/";
		}

		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"dictionary_title" : "Dictionary",
			"dictionary_definition": "Dictionary definition for",
			"dictionary_use": "To use the dictionary select a word on the page and click the dictionary button"
		});

		AtKit.addLocalisationMap("ar", {
			"dictionary_title" : "&#1575;&#1604;&#1605;&#1593;&#1580;&#1605;",
			"dictionary_definition" : "&#1578;&#1593;&#1585;&#1610;&#1601; &#1575;&#1604;&#1605;&#1593;&#1580;&#1605; &#1604;",
			"dictionary_use": "&#1604;&#1575;&#1587;&#1578;&#1582;&#1583;&#1575;&#1605; &#1575;&#1604;&#1605;&#1593;&#1580;&#1605; &#1581;&#1583;&#1583; &#1603;&#1604;&#1605;&#1577; &#1593;&#1604;&#1609; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577; &#1579;&#1605; &#1575;&#1590;&#1594;&#1591; &#1586;&#1585; &#1575;&#1604;&#1605;&#1593;&#1580;&#1605;"
		});


		// Add functions to AtKit.
		AtKit.addFn('getSelectedText', function(strip){ 
			var text = '';
		     if (window.getSelection){
		        text = window.getSelection();
		     } else if (document.getSelection){
		        text = document.getSelection();
		     } else if (document.selection){
		        text = document.selection.createRange().text;
		     }
		    if(strip == true){
				return String(text).replace(/([\s]+)/ig, '');
			} else {
				return String(text);
			}

		});
		
		AtKit.addButton(
			'dictionary', 
			AtKit.localisation("dictionary_title"),
			AtKit.getPluginURL() + 'images/book_open.png',
			function(dialogs, functions){
				var text = AtKit.call('getSelectedText');
				var stored = AtKit.get('DictionaryText');
				
				if(text == "" && stored != "") text = stored;
				
				var data = eval("\"" + text.split(" ").slice(0, 1) + "\";");
				
				if(data != ""){
					$lib("#at-lnk-dictionary").children('img').attr('src', AtKit.getPluginURL() + "images/loading.gif");
					
					$lib.getJSON( settings.serverURL + 'xmlhttp/remote.php?rt=dict&titles=' + encodeURI(data.toLowerCase()) + '&v=2&l=' + AtKit.getLanguage() + '&callback=?', function(data){
						ro = data;
						for(var result in ro.query.pages){
							if(result > -1){
								var definition = eval("ro.query.pages[\"" + result + "\"].revisions[0][\"*\"];");
								var title = eval("ro.query.pages[\"" + result + "\"].title;");

							} else {
								var definition = "Unknown word";
								var title = eval("ro.query.pages[\"-1\"].title;");
							}
						}
						
						AtKit.message("<h2>" + AtKit.localisation("dictionary_definition") + " \"" + title + "\"</h2><div style=\"height:300px; overflow-x:scroll\">" + definition + "</div>");
						$lib("#at-lnk-dictionary").children('img').attr('src', AtKit.getPluginURL() + "images/book_open.png");
					});
					
				} else {
					AtKit.message("<h2>" + AtKit.localisation("dictionary_title") + "</h2><p>" + AtKit.localisation("dictionary_use") + "</p>");
					$lib("#at-lnk-dictionary").children('img').attr('src', AtKit.getPluginURL() + "images/book_open.png");
				}
			},
			null, null
		);

		
		$lib('#at-btn-dictionary').mouseover(function(){
			AtKit.set('DictionaryText', AtKit.call('getSelectedText'));
		});

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