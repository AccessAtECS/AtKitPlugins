(function(){

	var pluginName = "dev-speech2";
	var plugin = function(){

		$lib = AtKit.lib();
		
		var ttsnextgen_settings = {
			"baseURL": "http://c.atbar.org/",
			"serverURL" : "http://a.atbar.org/"
		};

		var AtKitPlayer = {};
		
		// Array of audio to play.
		var PlayerStack = [];

		AtKit.set('PlayerReady', false);

		if(/https:/.test(window.location.protocol)){
			ttsnextgen_settings.baseURL = "https://ssl.atbar.org/c/";
			ttsnextgen_settings.serverURL = "https://ssl.atbar.org/a/";
		}
		
		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"ttsnextgen_title" : "TTS"
		});

		AtKit.addLocalisationMap("ar", {
			"ttsnextgen_title" : ""
		});

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

		AtKit.addFn('initSpeech', function(){
			// Import swfobject.
			AtKit.addScript(ttsnextgen_settings.baseURL + '/jPlayer/jquery.jplayer.min.js', function(){
				// Once we have jplayer ready, add a player container.
				if($lib('#AtKitAudioContainer').length === 0) {
					$lib('body').append(
						$lib('<div>', { "id": "AtKitAudioContainer" })
					);
				}

				// Invoke jPlayer.
				AtKitPlayer = $lib('#AtKitAudioContainer').jPlayer({
					swfPath: ttsnextgen_settings.baseURL + "jPlayer/Jplayer.swf",
					ready: function(){
						console.log('JPlayer calls ready');
						AtKit.set('PlayerReady', true);
					},
					timeupdate: function(event){
						console.log('timeupdate');
					},
					play: function(event){},
					pause: function(event){},
					ended: function(){
						console.log('ended');
					},
					supplied: "mp3"
				});

			});

		});

		// Initialise frontend speech engine
		AtKit.call('initSpeech');

		AtKit.addFn('playNextChunk', function(){
			// Start
			var data = "test test this is a test";

			AtKit.lib().getJSON(ttsnextgen_settings.serverURL + "TTS/request.php?l=" + AtKit.getLanguage() + "&t=" + encodeURIComponent(data) + "&callback=?", function(response){
				console.log(response);

				if(response.success){
					// Set the file URL
					AtKitPlayer.jPlayer("setMedia", { mp3: response.fileURL });

					// Play the media
					AtKitPlayer.jPlayer("play");
				} else {
					alert(response.message);
				}
			});

		});

		AtKit.addButton(
			pluginName,
			AtKit.localisation("ttsnextgen_title"),
			AtKit.getPluginURL() + 'images/fugue/balloon.png',
			function(dialogs, functions){
				AtKit.call('playNextChunk');
			},
			null, null
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