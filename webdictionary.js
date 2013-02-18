(function(){

	var pluginName = "webdictionary";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"webdictionary_title" : "Use the dictionary"
		});
		
		// Web Dictionary
		AtKit.addButton(
			'webdictionary', 
			AtKit.localisation("webdictionary_title"),
			AtKit.getPluginURL() + 'images/dictionary.png',
			function(dialogs, functions){

				try{
					var b=window.getSelection(),a=b?b.toString().replace(/(^\W+|\W+$)/g,''):'';

					if(!a){
						a=prompt('Enter a word to look up');
						if(!a)return
					}
					var c='http://dictionary.reference.com/search?r=1&q='+encodeURIComponent(a);window.open(c)
				}	
				catch(d){
					alert('Error:\n'+d.message)
				}
			
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