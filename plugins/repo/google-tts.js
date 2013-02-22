(function(){

	var pluginName = "gtts";
	var plugin = function(){

		$lib = AtKit.lib();

		var settings = {
			'baseURL': 'http://c.atbar.org/ATBar/',
			'serverURL': 'http://a.atbar.org/',
			"baseURL": "https://core.atbar.org/",
			"speechServicesURL": 'https://speech.services.atbar.org/',
			'ttsChunkSize': 1500
		};

		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"tts_title" : "Text to Speech",
			"tts_options": "Text to Speech Options",
			"tts_what": "What do you want to convert to speech?",
			"tts_selected": "Selected Text",
			"tts_page": "Entire Page",
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
			"tts_explain": "To use the text to speech feature with selected text, please first select the text on this page that you would like to convert. After you have done this, click the Text to Speech button, and select the 'selected text' option."
		});

		AtKit.addLocalisationMap("ar", {
			"tts_title" : "&#1578;&#1581;&#1608;&#1612;&#1604; &#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1593;&#1585;&#1576;&#1611; &#1621;&#1575;&#1604;&#1609; &#1603;&#1575;&#1604;&#1605;",
			"tts_options":"&#1582;&#1610;&#1575;&#1585;&#1575;&#1578; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;",
			"tts_what": "&#1605;&#1575; &#1607;&#1608; &#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1584;&#1610; &#1578;&#1585;&#1610;&#1583; &#1606;&#1591;&#1602;&#1607",
			"tts_selected":"&#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1605;&#1581;&#1583;&#1583;",
			"tts_page": "&#1603;&#1575;&#1605;&#1604; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577;",
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
			"tts_explain":"&#1604;&#1575;&#1587;&#1578;&#1582;&#1583;&#1575;&#1605; &#1582;&#1575;&#1589;&#1610;&#1577; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;&#1548; &#1575;&#1604;&#1585;&#1580;&#1575;&#1569; &#1578;&#1581;&#1583;&#1610;&#1583; &#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1605;&#1585;&#1575;&#1583; &#1578;&#1581;&#1608;&#1610;&#1604;&#1607; &#1593;&#1604;&#1609; &#1607;&#1584;&#1607; &#1575;&#1604;&#1589;&#1601;&#1581;&#1577;. &#1576;&#1593;&#1583; &#1584;&#1604;&#1603; &#1575;&#1590;&#1594;&#1591; &#1586;&#1585; &#1606;&#1591;&#1602; &#1575;&#1604;&#1606;&#1589;&#1548; &#1608;&#1575;&#1590;&#1594;&#1591; &#1582;&#1610;&#1575;&#1585; &quot;&#1575;&#1604;&#1606;&#1589; &#1575;&#1604;&#1605;&#1581;&#1583;&#1583;&quot;."		
		});

		// Text to speech
		var TTSDialogs = {
			"options": {
				"title": AtKit.localisation("tts_options"),
				"body": AtKit.localisation("tts_what") + "<br /><button id=\"sbStartTTSSelection\">" + AtKit.localisation("tts_selected") + "</button>"
			},
			"starting": {
				"title": AtKit.localisation("tts_title"),
				"body": "<center>" + AtKit.localisation("tts_converting") + "<br /><img src='" + AtKit.getPluginURL() + "images/loadingbig.gif' /><br />" + AtKit.localisation("tts_timeremaining") + " <div id='sbttstimeremaining'>calculating</div><br />" + AtKit.localisation("tts_pleasewait") + "</center>"
			}
		};
		var TTSFunctions = {};
		var TTSExtendedObject = {
			clickEnabled: true, 
			positition: "", 
			playingItem: "",
			"TTSButtons": {
				'ttsPlay': { 
					'tooltip': AtKit.localisation("tts_playpause"),
					'icon': AtKit.getPluginURL() + "images/control-pause.png",
					'fn': function(){
						var targetObj = ($lib.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('play');
					}
				},
				'ttsRewind': {
					'tooltip': AtKit.localisation("tts_rewind"),
					'icon': AtKit.getPluginURL() + "images/control-stop-180.png",
					'fn': function(){
						var scrubAmount = 2;
						var currentPosition = AtKit.get("TTS_position");
						var newPosition = (currentPosition - scrubAmount);
						if(newPosition < 0) newPosition = 0;

						var targetObj = ($lib.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('seek', newPosition);
					}
				},
				'ttsStop': {
					'tooltip': AtKit.localisation("tts_stop"),
					'icon': AtKit.getPluginURL() + "images/control-stop-square.png",
					'fn': function(){
						var targetObj = ($lib.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('stop');

						AtKit.call('TTSRemoveControlBox');
					}
				}
			}
		};		

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
		
		AtKit.addFn('setupTTSListeners', function(args){
			if(AtKit.get('TTS_Listeners_setup') == true) return;

			window.playerReady = function(obj) {
				
				AtKit.set('ATAudioPlayerID', obj.id);
				
				/*
				for(b in TTSExtendedObject.TTSButtons){
					var obj = TTSExtendedObject.TTSButtons[b];
					AtKit.addButton(b, obj.tooltip, obj.icon, obj.fn);
				}*/
				
				// Set values.
				AtKit.set("TTS_position", 0);
				AtKit.set("TTS_playingItem", 0);
				
				// Add page listeners
				var playerObj = swfobject.getObjectById(obj.id);
				
				if($lib.browser != "msie"){
					playerObj = window.document["audioe"];
				}

				playerObj.addModelListener("STATE", "ATBarAudioStateListener");
				playerObj.addModelListener("TIME", "ATBarAudioTimeMonitor");
				playerObj.addControllerListener("ITEM", "ATBarAudioItemMonitor");
				
			};

			window.ATBarAudioTimeMonitor = function(obj){
				AtKit.set('TTS_position', obj.position);
			}

			window.ATBarAudioItemMonitor = function(obj){
				AtKit.set('TTS_playingItem', obj.index);
			}

			window.ATBarAudioStateListener = function(obj) {
				var state = obj.newstate;

				var playerObj = swfobject.getObjectById(obj.id);
				
				if($lib.browser != "msie"){
					playerObj = window.document["audioe"];
				}
				
				if(state == "COMPLETED" && (AtKit.get('TTS_playingItem') + 1) == playerObj.getPlaylist().length){
					// Completed, remove controlbox and reset everything back to normal.
					AtKit.call('TTSRemoveControlBox');
				}

				if(state == "IDLE" || state == "PAUSED") {
					$lib('#at-lnk-ttsPlay').children('img').attr('src', AtKit.getPluginURL() + "images/control.png");
					$lib('#at-btn-tts').children('img').attr('src', AtKit.getPluginURL() + "images/sound.png").css('padding-top', '6px');
				} else {
					if(AtKit.get('TTS_clickEnabled') == false){
						$lib('#at-lnk-ttsPlay').children('img').attr('src', AtKit.getPluginURL() + "images/control-pause.png");
						$lib('#at-btn-tts').children('img').attr('src', AtKit.getPluginURL() + "images/loading.gif").css('padding-top', '8px');
					}
				}
			}
		
			AtKit.set('TTS_Listeners_setup', true);
		});

		AtKit.addButton(
			'gtts', 
			AtKit.localisation("gtts_title"),
			AtKit.getPluginURL() + 'images/sound.png',
			function(dialogs, functions){
				if(AtKit.set('TTS_clickEnabled') == false) return;

				AtKit.show(dialogs.options);

				AtKit.addScript(settings.baseURL + '/resources/js/swfobject.js', null);
				
				$lib('#sbStartTTSSelection').click(function(e){ 
					
					var selectedData = AtKit.call('getSelectedText');
					
					if(selectedData != ""){
				
						this.clickEnabled = false;
						
						$lib.getJSON("https://speech.services.atbar.org/google-tts/request.php?l=" + AtKit.getLanguage() + "&r=" + encodeURIComponent(selectedData) + "&c=?", function(data){
							var audioContainer = "audioo";
							
							$lib("<div />", {'id': 'flashContent' }).prependTo("#sbar");
							
							var params = {
								 flashvars: "file=" + data.url + "&autostart=true&playlist=bottom&repeat=list&playerready=playerReady&id=" + audioContainer,
								 allowscriptaccess: "always"
							};
							var attributes = {
								 id: audioContainer,
								 name: audioContainer
							};
							
							swfobject.embedSWF(settings.speechServicesURL + "lib/player/player-licensed.swf", "flashContent", "1", "1", "9.0.0","expressInstall.swf", false, params, attributes, function(){
								AtKit.call('setupTTSListeners');
							});
							
							AtKit.hideDialog();
						});
					} else {
						AtKit.message("<h2>" + AtKit.localisation("tts_title") + "</h2><p>" + AtKit.localisation("tts_explain") + "</p>");
					}				
				
				});
				
			},
			TTSDialogs, TTSFunctions, TTSExtendedObject
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