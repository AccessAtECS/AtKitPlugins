(function(){

	var pluginName = "wordprediction";
	var plugin = function(){

		$lib = AtKit.lib();
		
		var wpTimeout;

		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"wp_title" : "Word Prediction",
			"wp_ignore": "Ignore",
			"wp_instruct": "Keystrokes: esc to close, Ctrl + Alt + (1, 2, 3 etc)"
		});

		AtKit.addLocalisationMap("ar", {
			"wp_title" : "&#1578;&#1588;&#1594;&#1610;&#1604; &#1605;&#1602;&#1578;&#1585;&#1581; &#1575;&#1604;&#1603;&#1604;&#1605;&#1575;&#1578;",
			"wp_ignore": "&#1578;&#1580;&#1575;&#1607;&#1604;",
			"wp_instruct": "&#1605;&#1601;&#1575;&#1578;&#1610;&#1581;: Esc &#1604;&#1604;&#1582;&#1585;&#1608;&#1580;&#1548; Ctrl+Alt+(1,2,3...)"	
		});
		
		AtKit.set('WordPrediction_TextSelected', null);
		
		$lib('input[type="text"], textarea').bind('focus', function(){
			AtKit.set('WordPrediction_TextSelected', $lib(this));
		});

		AtKit.addFn('getCaretPos', function(input){
			input = input[0];
			
			var caret_pos;
			// Internet Explorer Caret Position (TextArea)
			if (document.selection && document.selection.createRange) {
				var range = document.selection.createRange();
				var bookmark = range.getBookmark();
				caret_pos = bookmark.charCodeAt(2) - 2;
			} else {
				// Firefox Caret Position (TextArea)
				if (input.setSelectionRange)
				caret_pos = input.selectionStart;
			}
			
			return caret_pos;
		});
		
		AtKit.addFn('setCaretPos', function(args){
			var elem = args.input[0];
		
			if(elem !== null) {
				if(elem.createTextRange) {
					var range = elem.createTextRange();
					range.move('character', args.position);
					range.select();
				} else {
					if(elem.selectionStart) {
						elem.focus();
						elem.setSelectionRange(args.position, args.position);
					} else {
						elem.focus();
					}
				}
			}
		});

		AtKit.addButton(
			'wordprediction',
			AtKit.localisation("wp_title"),
			AtKit.getPluginURL() + 'images/aitype.png',
			function(dialogs, functions){

				ctrlModifier = false;
				altModifier = false;

				$lib('input[type="text"], textarea').bind('keydown', function(e){
					if(e.which == 17 || e.which == 18 || ctrlModifier || altModifier) return; // ctrl & alt keys ignore.
					
					clearTimeout(wpTimeout);
					
					var textElement = $lib(this);
					
					if(e.keyCode == 27) return $lib('#AtKitWordPrediction').remove();

					wpTimeout = setTimeout(function(){
						var el = AtKit.get('WordPrediction_TextSelected');
						if(el === null) return;
					
						var elData = el.val();
					
						var pos = AtKit.call('getCaretPos', el);
						AtKit.set('WordPrediction_CaretPos', pos);
						
						var leadingText = elData.substring(0, pos).split(" ").slice(-6).join(" ");
						var trailingText = elData.substring(pos).split(" ").slice(0, 2).join(" ");
						
						var predictURL = "http://predict.services.atbar.org/wordprediction/";

						if(AtKit.getLanguage() == "ar") {
							predictURL += "?lang=AR";
						} else {
							predictURL += "?lang=EN";
						}

						predictURL += "&l=" + encodeURIComponent(leadingText) + "&t=" + encodeURIComponent(trailingText) + "&callback=?";
						
						$lib.getJSON(predictURL, function(response){
							var data = response.payload.split(";");
							
							var input = data.splice(0, 2);

							// Remove any digits signifying liklihood
							$lib.each(input, function(i, v){
								if(!isNaN(input[i].charAt(0))) input[i] = input[i].substring(1);
							});

							//console.log(input);

							var pos = el.position();
							var width = el.width();
							var height = el.outerHeight();


							var suggestions = "";

							if($lib('#AtKitWordPrediction').length === 0){
								suggestions = $lib('<div>', { "id": "AtKitWordPrediction" }).css({
									"position": "absolute",
									"left": pos.left + "px",
									"width": width,
									"top": (5 + pos.top + height) + "px",
									"background": "white",
									"font-size": "16pt",
									"font-weight": "bold",
									"color": "black",
									"border": "2px solid black",
									"z-index": "9999999999",
									"padding": "10px"
								});
							} else {
								suggestions = $lib('#AtKitWordPrediction').empty();
							}
							
							
							suggestions.append(
								$lib("<a>", { "href": "#", "html": AtKit.localisation("wp_ignore"), "style": "color:red;padding-right:10px;float:left;" }).bind('click', function(){
									$lib('#AtKitWordPrediction').remove();
									el.focus();
								})
							);

							for(i = 0; i < data.length; i++){
								var suggestion = data[i];
								
								if(suggestion == "") continue;
								
								// Get number 0-9 representing likelihood of word being correct.
								var likelihood = suggestion.charAt(0);

								// Remove the liklihood from the string.
								suggestion = suggestion.substring(1);

								var link = $lib('<a>', { "html": suggestion, "href": "#", "style": "padding-right:10px;float:left;" }).data('suggestion', suggestion).bind('click', function(e){
									var pos = AtKit.get('WordPrediction_CaretPos');
									var toInsert = $lib(this).data('suggestion') + " ";
									var el = AtKit.get('WordPrediction_TextSelected');
	
									var start = pos - input[0].length;
									var end = pos + input[1].length;
									
									//console.log('Caret position: ' + pos + ", inserting text '" + toInsert + "'");
									//console.log("at pos start " + start + ", end " + end + " identified substring is '" + el.val().substring(start, end) + "'");
									
									el.val( el.val().substring(0, start) + toInsert + el.val().substring(end) );
									
									suggestions.remove();
									
									el.focus();

									AtKit.call('setCaretPos', {
										input: el,
										position: start + toInsert.length
									});
									
									e.preventDefault();
									return false;
								});
								
								suggestions.append(link);
							}
							
							
							// Add the information div.
							var info = $lib('<p>', { "html": AtKit.localisation("wp_instruct"), "style": "font-size:12pt; padding-top:10px;clear:left" });
							
							suggestions.append(info);
							
							// Insert the suggestions into the DOM
							el.after(suggestions);
							
							// Bind shortcutkeys
							
							textElement.keyup(function (e) {
								if(e.keyCode == 17) ctrlModifier = false;
								if(e.keyCode == 18) altModifier = false;
							}).keydown(function (e) {
								if(e.keyCode == 17) ctrlModifier = true;
								if(e.keyCode == 18) altModifier = true;
								
								offset = 48;
								// Are the modifier keys held down?
								if(ctrlModifier && altModifier && (e.keyCode >= 49 && e.keyCode <= 57)) {
									numKey = e.keyCode - offset;
									
									ctrlModifier = false;
									altModifier = false;
									
									$lib('#AtKitWordPrediction').children('a:eq(' + numKey + ')').click();
									
									if(e.preventDefault){ e.preventDefault()
									}else{e.stop()};
									
									e.returnValue = false;
									e.stopPropagation();  
									
									textElement.trigger('keydown');
								}	
							});

						});
					
					}, 500);
				});
			}
		);

	};

	if(typeof window['AtKit'] == "undefined"){

		window.AtKitLoaded = function(){
			var eventAction = null;
		
			this.subscribe = function(fn) {
				eventAction = fn;
			};
		
			this.fire = function(sender, eventArgs) {
				if (eventAction !== null) {
					eventAction(sender, eventArgs);
				}
			};
		};

		window['AtKitLoaded'] = new AtKitLoaded();
		window['AtKitLoaded'].subscribe(function(){ AtKit.registerPlugin(pluginName, plugin); });
	} else {
		AtKit.registerPlugin(pluginName, plugin);
	}

})();