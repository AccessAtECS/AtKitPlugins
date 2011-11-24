(function(){

	var pluginName = "dictionary";
	var plugin = function(){
		

		var settings = {
			'baseURL': 'http://c.atbar.org/ATBar/',
			'serverURL': 'http://a.atbar.org/'
		};

		if(/https:/.test(window.location.protocol)){
			settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
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

		AtKit.addFn('parseDictionaryResponse', function(input){
	
			// Remove translations blocks.
			output = input.replace(/^((?:={2,})+translations(?:={2,})+.*?)((?:={2,}).*?(?:={2,})|(?:-{4}))/ig, '$2');	
			
			// Replace headings.
			var output = output.replace(/(={2,})+(.*?)(?:={2,})+/ig, function(match, g1, g2, position, input) {
		    	return "<h" + g1.length + ">" + g2 + "</h" + g1.length + ">";
		    });
		    
		    // Remove comments
		    var output = output.replace(/(<!--.*?-->)/ig, '');
			
			// Replace bold / italics.
			output = output.replace(/(('+){1}(.*?)(?:'+){1})/ig, function(match, g1, g2, g3, position, input){
				switch(g2.length){
				
					case 2:
						return "<em>" + g3 + "</em>";
					break;
					
					case 3:
						return "<b>" + g3 + "</b>";
					break;
					
					case 5:
						return "<em><b>" + g3 + "</b></em>";
					break;
				}
			
			});
			
			// Replace text in curley brackets.
			output = output.replace(/(\{\{(?:(.*?)\|)+(.*?)\}\})/ig, function(match, g1, g2, g3, position, input){
				switch(g2.toLowerCase()){
					case 'also':
						return "See also: " + g3;
					break;
					
					case 'ipa':
						return g3;
					break;
					
					case 'audio':
						return "";
					break;
					
					default:
						return g3;	
					break;
				}
			});
			
			// Replace lists.
			output = output.replace(/([#|\*]+(.*?)\n)/ig, '<li>$2</li>');
			
			// Replace unmatched doublebraces.
			output = output.replace(/(\{\{(\w{1,})\}\})/ig, "<i>$2</i>");
			
			output = output.replace(/(\[\[(.*?)\]\])/ig, "$2");
			
			return output;
	
		});
		
		AtKit.addButton(
			'dictionary', 
			AtKit.localisation("dictionary_title"),
			settings.baseURL + 'images/book_open.png',
			function(dialogs, functions){
				var data = eval("\"" + AtKit.call('getSelectedText', true) + "\";");
				
				if(data != ""){
					$("#at-lnk-dictionary").children('img').attr('src', settings.baseURL + "images/loading.gif");
					
					$.getJSON( settings.serverURL + 'xmlhttp/remote.php?rt=dict&titles=' + encodeURI(data.toLowerCase()) + '&v=2&l=' + AtKit.getLanguage() + '&callback=?', function(data){
						ro = data;
						for(var result in ro.query.pages){
							if(result > -1){
								var definition = eval("ro.query.pages[\"" + result + "\"].revisions[0][\"*\"];");
								var title = eval("ro.query.pages[\"" + result + "\"].title;");
								// Format the wikicode into something we can read in HTML.
								//console.log(definition);
								
								definition = AtKit.call('parseDictionaryResponse', definition);
							} else {
								var definition = "Unknown word";
								var title = eval("ro.query.pages[\"-1\"].title;");
							}
						}
						
						AtKit.message("<h2>" + AtKit.localisation("dictionary_definition") + " \"" + title + "\"</h2><div class=\"constrainContent\">" + definition + "</div>");
						$("#at-lnk-dictionary").children('img').attr('src', settings.baseURL + "images/book_open.png");
					});
					
				} else {
					$.facebox("<h2>" + AtKit.localisation("dictionary_title") + "</h2><p>" + AtKit.localisation("dictionary_use") + "</p>");
					$("#at-lnk-dictionary").children('img').attr('src', settings.baseURL + "images/book_open.png");
				}
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