(function(){

	var pluginName = "localserver-tts";
	var plugin = function(){

		$lib = AtKit.lib();
		
		AtKit.set('localserver_available', false);
		
		$lib.getJSON("http://localserver.atbar.org:8451/ping?callback=?", function(data){
			console.log(data);
			AtKit.set('localserver_available', true);
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
			'TTS', 
			"Start TTS",
			AtKit.getPluginURL() + 'images/sound.png',
			function(dialogs, functions){
				$lib.getJSON("http://localserver.atbar.org:8451/TTS?text=" + AtKit.call('getSelectedText') + "&callback=?", function(data){
					console.log(data);
				});
			}
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