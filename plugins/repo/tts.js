(function(){

	var pluginName = "tts";
	var plugin = function(){

		$lib = AtKit.lib();

		var settings = { 
			"baseURL": "https://core.atbar.org/",
			"speechServicesURL": 'https://speech.services.atbar.org/',
			"ttsChunkSize": 800
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
				"title":"Text to Speech options",
				"body": "What do you want to convert to speech? <br /><button id=\"sbStartTTS\"> Entire page</button> <button id=\"sbStartTTSSelection\"> Selected text</button>"
			},
			"starting": {
				"title": "Text To Speech",
				"body": "<center>Text to Speech conversion is taking place. <br /><img src='" + AtKit.getPluginURL() + "images/loadingbig.gif' /><br />Time remaining: <div id='sbttstimeremaining'>calculating</div><br />Please wait... </center>"
			}
		};
		var TTSFunctions = {};
		var TTSExtendedObject = {
			clickEnabled: true, 
			positition: "", 
			playingItem: "",
			"TTSButtons": {
				'ttsPlay': { 
					'tooltip': "Play / Pause",
					'icon': AtKit.getPluginURL() + "images/control-pause.png",
					'fn': function(){
						var targetObj = ($lib.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('play');
					}
				},
				'ttsRewind': {
					'tooltip': "Rewind",
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
					'tooltip': "Stop & Close TTS",
					'icon': AtKit.getPluginURL() + "images/control-stop-square.png",
					'fn': function(){
						var targetObj = ($lib.browser == "msie") ? swfobject.getObjectById(AtKit.get('ATAudioPlayerID')) : window.document['audioe'];
						targetObj.sendEvent('stop');

						AtKit.call('TTSRemoveControlBox');
					}
				}
			}
		};		
		

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
		
		AtKit.addFn('b64', function(input){
			// + == _
			// / == -
			var bkeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-=";
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
		
			input = AtKit.call('utf8_encode', input);
		
			while (i < input.length) {
		
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
		
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
		
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
		
				output = output +
				bkeys.charAt(enc1) + bkeys.charAt(enc2) +
				bkeys.charAt(enc3) + bkeys.charAt(enc4);
		
			}
		
			return output;		
		});
		
		AtKit.addFn('utf8_encode', function(string){
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
		
			for (var n = 0; n < string.length; n++) {
		
				var c = string.charCodeAt(n);
		
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
		
			}
		
			return utftext;	
		});
		
		AtKit.addFn('sendTTSChunk', function(args){
			if(args.block == 1){
				var start = 0;
			} else {
				var start = (settings.ttsChunkSize * args.block);
			}
			
			if( (start + settings.ttsChunkSize) > args.fullData.length ){
				var endPoint = args.fullData.length;
			} else {
				var endPoint = (start + settings.ttsChunkSize);
			}
			
			var payload = args.fullData.substring(start, endPoint);
		
			var urlString = settings.speechServicesURL + 'tts/request.php?rt=tts&v=2&id=' + args.reqID + '&data=' + payload + "&chunkData=" + args.totalBlocks + "-" + args.block;
			if( args.block == args.totalBlocks-1 ){
				urlString += "&page=" + encodeURIComponent(window.location);
			}
			
			urlString += "&callback=?";
			
			$lib.getJSON(urlString, function(RO){
				$lib("#compactStatus").html(args.block + " / " + args.totalBlocks);
				
				var errorTitle = "<h2>Oops!</h2>";
				if(args.block == args.totalBlocks){
					// Finished request..
					AtKit.show(TTSDialogs.starting);
					if(RO.status == "encoding"){
						AtKit.call('countdownTTS', { 'timeLeft':(RO.est_completion / RO.chunks), 'id': RO.ID });
					} else if(RO.status == "failure" && RO.reason == "overcapacity"){
						AtKit.message(errorTitle + "<p>The server is currently over capacity for text to speech conversions. Please try again later.</p>");
					} else if(RO.status == "failure" && RO.message == "") {
						AtKit.message(errorTitle + "<p>Something went wrong while we were converting this page to text. Please try again shortly.</p>");
					} else {
						AtKit.message(errorTitle + "<p>" + RO.reason + " " + RO.data.message + "</p>");
					}

				} else {
					// Send the next block.
					if(RO.data.message == "ChunkSaved"){
						AtKit.call('sendTTSChunk', { 'fullData':args.fullData, 'block':(args.block + 1), 'totalBlocks':args.totalBlocks, 'reqID':args.reqID });
					} else {
						AtKit.message("<h2>Error</h2><p>An error occurred on the server. Please try again later.</p>");
					}
				}				
				
			});
		
		});
		
		AtKit.addFn('countdownTTS', function(arg){
			if(isNaN(arg.timeLeft)){
				AtKit.message("<h2>Oops!</h2> <p>Something went wrong while we were converting this page to text (received a NaN for timeLeft).</p>");
			} else {
				if(arg.timeLeft == 0){

					// Play audio
					var audioContainer = "audioo";
					
					if($lib.browser != "msie"){
						$lib('body').append( $lib("<div id=\"flashContent\"><OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0\" width=\"1\" height=\"1\" id=\"audioe\"> <PARAM name=movie value=\"" + settings.speechServicesURL + "lib/player/player-licensed.swf\"></PARAM> <PARAM name=flashvars value=\"file=" + settings.speechServicesURL + "cache/" + arg.id + ".xml&autostart=true&playlist=bottom&repeat=list&playerready=playerReady&id=" + audioContainer + "\"><PARAM name=allowscriptaccess value=\"always\" /><embed type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" src=\"" + settings.speechServicesURL + "lib/player/player-licensed.swf\" width=\"1\" height=\"1\" allowscriptaccess=\"always\" allowfullscreen=\"false\" flashvars=\"file=" + settings.speechServicesURL + "cache/" + arg.id + ".xml&autostart=true&playlist=bottom&repeat=list&playerready=playerReady\" name=\"audioe\" /> </OBJECT></div>") );
					
						AtKit.call('setupTTSListeners');
					} else {
						
						$lib("<div />", {'id': 'flashContent' }).prependTo("body");
						

						var params = {
						  flashvars: "file=" + settings.speechServicesURL + "cache/" + arg.id + ".xml&autostart=true&playlist=bottom&repeat=list&playerready=playerReady&id=" + audioContainer,
						  allowscriptaccess: "always"
						};
						var attributes = {
						  id: audioContainer,
						  name: audioContainer
						};
						
						swfobject.embedSWF(settings.speechServicesURL + "player/player-licensed.swf", "flashContent", "1", "1", "9.0.0","expressInstall.swf", false, params, attributes, function(){
							AtKit.call('setupTTSListeners');
						});
					
					}

					AtKit.hideDialog();
					
				} else {
					$lib('#sbttstimeremaining').html( arg.timeLeft + " seconds" );
					window.setTimeout(function(){ AtKit.call('countdownTTS', { 'timeLeft':(arg.timeLeft - 1), 'id':arg.id }) }, 1000);
				}
			}
		});
		
		AtKit.addFn('setupTTSListeners', function(args){
			if(AtKit.get('TTS_Listeners_setup') == true) return;

			window.playerReady = function(obj) {
				
				AtKit.set('ATAudioPlayerID', obj.id);

				for(b in TTSExtendedObject.TTSButtons){
					var obj = TTSExtendedObject.TTSButtons[b];
					AtKit.addButton(b, obj.tooltip, obj.icon, obj.fn);
				}
				
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
				
			}

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
		
		AtKit.addFn('TTSRemoveControlBox', function(){
			AtKit.removeButton('ttsPlay');
			AtKit.removeButton('ttsRewind');
			AtKit.removeButton('ttsStop');

	      	$lib("#flashContent").remove();
	      	$lib('#at-lnk-tts').children('img').attr('src', AtKit.getPluginURL() + "images/sound.png").css('padding-top', '6px');
	      	AtKit.set('TTS_clickEnabled', true);
		});

		AtKit.set('TTS_clickEnabled', true);

		AtKit.addButton(
			'tts', 
			'Text to Speech',
			AtKit.getPluginURL() + 'images/sound.png',
			function(dialogs, functions){
				if(AtKit.set('TTS_clickEnabled') == false) return;

				AtKit.show(dialogs.options);
				AtKit.set('TTS_Listeners_setup', false);

				AtKit.addScript(settings.baseURL + 'resources/js/swfobject.js', null);

				$lib('#sbStartTTS').click(function(e){ 
					// Get page contents.
					var pageData = $lib(document.body).clone();
					
					pageData.find('script, noscript, style, #facebox_overlay, #sbar, #sbarGhost, #facebox, br, img').remove();
					
					
					// Remove comments
					pageData = String(pageData.html()).replace(/<!---.*--->/g, '');
					pageData.replace(/[\n\r]+/g, '');
					
					console.log(pageData);
					
					pageData = AtKit.call('b64', pageData);
		
					var chunks = Math.ceil(pageData.length / settings.ttsChunkSize);
					
					if(chunks > 0){
						var reqID = Math.floor(Math.random() * 5001);
						
						AtKit.message( "<h2>Processing</h2><p>Compacting and transmitting data...<br /><div id='compactStatus'>0 / " + chunks + "</div></p>" );
						
						AtKit.call('sendTTSChunk', { 'fullData':pageData, 'block':1, 'totalBlocks':chunks, 'reqID':reqID });
					} else {
						AtKit.message( "<h2>Oops!</h2><p>There doesn't seem to be any content on this page, or we can't read it.</p>" );
					}
					
				});

				$lib('#sbStartTTSSelection').click(function(e){ 
				
					AtKit.set('TTS_clickEnabled', false);

					var selectedData = AtKit.call('getSelectedText');
				
					if(selectedData != ""){
				
						this.clickEnabled = false;
						
						// Send the data in chunks, as chances are we cant get it all into one request.
						var transmitData = AtKit.call('b64', selectedData );
						
						var chunks = Math.ceil(transmitData.length / settings.ttsChunkSize);
						
						if(chunks > 0){
							var reqID = Math.floor(Math.random() * 5001);
							
							AtKit.message( "<h2>Processing</h2><p>Compacting and transmitting data...<br /><div id='compactStatus'>0 / " + chunks + "</div></p>" );
							
							AtKit.call('sendTTSChunk', { 'fullData':transmitData, 'block':1, 'totalBlocks':chunks, 'reqID':reqID });
						} else {
							AtKit.message( "<h2>Oops!</h2><p>There doesn't seem to be any content on this page, or we can't read it.</p>" );
						}
						
					} else {
						AtKit.message("<h2>Text-to-Speech</h2><p>To use the text to speech feature with selected text, please first select the text on this page that you would like to convert. After you have done this, click the Text to Speech button, and select the 'selected text' option.</p>");
					}				
				
				});
				
			},
			TTSDialogs, TTSFunctions, TTSExtendedObject
		);
		
		
		// 
		$lib('a#at-lnk-tts').hover(function(e){
			console.log('test');
			var selectedData = AtKit.call('getSelectedText');
		});


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
