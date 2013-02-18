(function(){

	var pluginName = "google-tts";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		var settings = {
			"googleURL": "https://translate.google.com/translate_tts/",
			"baseURL": "https://core.atbar.org/",
			"speechServicesURL": 'https://speech.services.atbar.org/'
		};
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"tts_title" : "Text to Speech",
			"tts_options": "Text to Speech Options",
			"tts_converting": "Text to Speech conversion is taking place.",
			"tts_timeremaining": "Time Remaining:",
			"tts_pleasewait": "Please wait...",
			"tts_playpause" : "Play / Pause",
			"tts_rewind": "Rewind",
			"tts_stop": "Stop & Close TTS",
			"tts_error": "Error",
			"tts_overloaded": "The server is currently over capacity for text to speech conversions. Please try again later.",
			"tts_problem": "Something went wrong while we were converting this page to speech. Please try again shortly.",
			"tts_servererror": "An error occurred on the server. Please try again later.",
			"tts_seconds": "seconds",
			"tts_explain": "To use the text to speech feature with selected text, please first select the text on this page that you would like to convert. After you have done this, click the Text to Speech button, and select the 'selected text' option.",
			"tts_select_voice": "Highlight text and select a voice",
			"tts_male": "Male",
			"tts_female": "Female"
		});

		AtKit.addLocalisationMap("ar", {
			"tts_title" : "&#1578;&#1581;&#1608;&#1610;&#1604; &#1575;&#1604;&#1606;&#1589;&#1608;&#1589; &#1575;&#1604;&#1610; &#1605;&#1575;&#1583;&#1577; &#1605;&#1587;&#1605;&#1608;&#1593;&#1577;",
			"tts_options":"&#1582;&#1610;&#1575;&#1585;&#1575;&#1578; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;",
			"tts_converting":"&#1580;&#1575;&#1585;&#1610;&#1577; &#1581;&#1575;&#1604;&#1610;&#1575;&#1611; &#1593;&#1605;&#1604;&#1610;&#1577; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;",
			"tts_timeremaining": "&#1575;&#1604;&#1608;&#1602;&#1578; &#1575;&#1604;&#1605;&#1578;&#1576;&#1602;&#1610;",
			"tts_pleasewait":"&#1575;&#1604;&#1585;&#1580;&#1575;&#1569; &#1575;&#1604;&#1575;&#1606;&#1578;&#1592;&#1575;&#1585;...",
			"tts_playpause":"&#1578;&#1588;&#1594;&#1610;&#1604;/&#1573;&#1610;&#1602;&#1575;&#1601; &#1605;&#1572;&#1602;&#1578;",
			"tts_rewind":"&#1573;&#1593;&#1575;&#1583;&#1577;",
			"tts_stop":"&#1573;&#1610;&#1602;&#1575;&#1601;",
			"tts_error":"&#1582;&#1591;&#1571;",
			"tts_overloaded":"&#1601;&#1575;&#1602;&#1578; &#1593;&#1605;&#1604;&#1610;&#1575;&#1578; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;&#1608;&#1589; &#1587;&#1593;&#1577; &#1575;&#1604;&#1582;&#1575;&#1583;&#1605;. &#1575;&#1604;&#1585;&#1580;&#1575;&#1569; &#1575;&#1604;&#1605;&#1581;&#1575;&#1608;&#1604;&#1577; &#1604;&#1575;&#1581;&#1602;&#1575;&#1611;.",
			"tts_problem":"&#1581;&#1583;&#1579; &#1582;&#1591;&#1571; &#1571;&#1579;&#1606;&#1575;&#1569; &#1593;&#1605;&#1604;&#1610;&#1577; &#1606;&#1591;&#1602; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577;. &#1575;&#1604;&#1585;&#1580;&#1575;&#1569; &#1575;&#1604;&#1605;&#1581;&#1575;&#1608;&#1604;&#1577; &#1576;&#1593;&#1583; &#1602;&#1604;&#1610;&#1604;.",
			"tts_servererror": "&#1581;&#1583;&#1579; &#1582;&#1591;&#1571; &#1601;&#1610; &#1575;&#1604;&#1582;&#1575;&#1583;&#1605;. &#1575;&#1604;&#1585;&#1580;&#1575;&#1569; &#1575;&#1604;&#1605;&#1581;&#1575;&#1608;&#1604;&#1577; &#1604;&#1575;&#1581;&#1602;&#1575;&#1611;.",
			"tts_seconds":"&#1579;&#1608;&#1575;&#1606;&#1613;",
			"tts_explain":"&#1604;&#1575;&#1587;&#1578;&#1582;&#1583;&#1575;&#1605; &#1582;&#1575;&#1589;&#1610;&#1577; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;&#1548; &#1575;&#1604;&#1585;&#1580;&#1575;&#1569; &#1578;&#1581;&#1583;&#1610;&#1583; &#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1605;&#1585;&#1575;&#1583; &#1578;&#1581;&#1608;&#1610;&#1604;&#1607; &#1593;&#1604;&#1609; &#1607;&#1584;&#1607; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577;. &#1576;&#1593;&#1583; &#1584;&#1604;&#1603; &#1575;&#1590;&#1594;&#1591; &#1586;&#1585; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;&#1548; &#1608;&#1575;&#1590;&#1594;&#1591; &#1582;&#1610;&#1575;&#1585; &quot;&#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1605;&#1581;&#1583;&#1583;&quot;.",
			"tts_select_voice": "&#1602;&#1605; &#1576;&#1578;&#1592;&#1604;&#1610;&#1604; &#1575;&#1604;&#1606;&#1589; &#1608;&#1575;&#1582;&#1578;&#1610;&#1575;&#1585; &#1575;&#1604;&#1589;&#1608;&#1578;",
			"tts_male": "&#1605;&#1584;&#1603;&#1585;",
			"tts_female": "&#1605;&#1572;&#1606;&#1579;"
		});
		
		// Text to speech
		var TTSDialogs = {
			"options": {
				"title": AtKit.localisation("tts_options"),
				"body": AtKit.localisation("tts_select_voice") + " <br /><button id=\"sbStartTTSSelection\">Do some TTS</button>"
			},
			"starting": {
				"title": AtKit.localisation("tts_title"),
				"body": "<center>" + AtKit.localisation("tts_converting") + " <br /><img src='" + AtKit.getPluginURL() + "images/loadingbig.gif' /><br />"+ AtKit.localisation("tts_timeremaining") +" <div id='sbttstimeremaining'>...</div><br />" + AtKit.localisation("tts_pleasewait") + " </center>"
			}
		};
		
		// Add functions to AtKit.
		AtKit.addFn('getSelectedTextTTS', function(strip){
			
			var text = AtKit.call('getSelectedTextInElement');
			
			if(text == null){
				var text = '';
				
				   if (document.selection && document.selection.type != "Control" && document.selection.createRange().text != "") {
					text = document.selection.createRange().text;
				} else if (window.getSelection && window.getSelection().toString() != ""){
					text = window.getSelection().toString();
				} else if (document.getSelection){
					text = document.getSelection();
				   }
			  }
			  
			  if(strip === true){
				return String(text).replace(/([\s]+)/ig, '');
			} else {
				return String(text);
			}

		});
		
		AtKit.addFn('getSelectedTextInElement', function(){
			var e = document.activeElement;
			
			return (

				/* mozilla / dom 3.0 */
				('selectionStart' in e && function() {
					var l = e.selectionEnd - e.selectionStart;
					return e.value.substr(e.selectionStart, l);
				}) ||

				/* exploder */
				(document.selection && function() {
				
					var nn = $lib(e).prop('nodeName');
					if(nn != "input" && nn != "textarea") return null;
					
					e.focus();

					var r = document.selection.createRange();
					if (r === null) {
						return null;
					}

					var re = e.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint('EndToStart', re);

					return r.text;
				}) ||

				/* browser not supported */
				function() { return null; }

			)();
		});
		
		AtKit.addFn('sendTTSChunk', function(args){
			var urlString = settings.googleURL + '?tl=' + AtKit.getLanguage() + '&q=' + payload;
			console.log(urlString);
			
			var params = {
			  flashvars: settings.googleURL + '?tl=' + AtKit.getLanguage() + '&q=' + payload,
			  allowscriptaccess: "always"
			};
			var attributes = {
			  id: audioContainer,
			  name: audioContainer
			};
			
			swfobject.embedSWF(settings.speechServicesURL + "lib/player/player-licensed.swf", "flashContent", "1", "1", "9.0.0","expressInstall.swf", false, params, attributes, function(){
			});
		
		});		
		
		AtKit.addFn('sbStartTTSSelection', function(){
						
			AtKit.set('TTS_clickEnabled', false);

			var selectedData = AtKit.get('TTSselectedData');
			if(selectedData == "" || typeof selectedData == "undefined") selectedData = AtKit.call('getSelectedTextTTS');
			
			if(typeof selectedData != "undefined" && selectedData !== ""){
		
			this.clickEnabled = false;
				
				// Send the data in chunks, as chances are we cant get it all into one request.
				var transmitData = selectedData;
				
				var chunks = Math.ceil(transmitData.length / settings.ttsChunkSize);
				
				if(chunks > 0){
					var reqID = Math.floor(Math.random() * 5001);
					
					AtKit.message( "<h2>" + AtKit.localisation("tts_pleasewait") + "</h2><p>" + AtKit.localisation("tts_converting") + "...<br /><div id='compactStatus'>0 / " + chunks + "</div></p>" );
					
					AtKit.call('sendTTSChunk', { 'fullData':transmitData, 'block':1, 'totalBlocks':chunks, 'reqID':reqID, 'voice':args.voice });
				} else {
					AtKit.message( "<h2>" + AtKit.localisation("tts_error") + "</h2><p>" + AtKit.localisation("tts_problem") + "</p>" );
				}
				
			} else {
				AtKit.message("<h2>" + AtKit.localisation("tts_title") + "</h2><p>" + AtKit.localisation("tts_explain") + "</p>");
			}
		
		});	

		AtKit.set('TTS_clickEnabled', true);
		
		$lib(document).delegate('#at-btn-tts', 'mousemove, focus, mouseover', function(){
			var text = AtKit.call('getSelectedTextTTS');
			if(typeof text == "undefined" || text == "") return;		
			AtKit.set('TTSselectedData', text);
		});

		AtKit.addButton(
			'tts',
			AtKit.localisation("tts_title"),
			AtKit.getPluginURL() + 'images/google.png',
			function(dialogs, functions){
				if(AtKit.set('TTS_clickEnabled') == false) return;
				
				var text = AtKit.call('getSelectedTextTTS');

				if(AtKit.get('TTSselectedData') == "" && text != "") AtKit.set('TTSselectedData', text);
				
				
				AtKit.show(dialogs.options);
				
				AtKit.addScript(settings.baseURL + 'resources/js/swfobject.js', null);
				
				$lib('#sbStartTTSSelection').click(function(){
					AtKit.call('sbStartTTSSelection');
				});			
			},
			TTSDialogs
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