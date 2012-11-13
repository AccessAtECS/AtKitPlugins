(function(){

	var pluginName = "wiki";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"wiki_title" : "Search Wikipedia"
		});

		// Wiki
		AtKit.addButton(
			'wiki', 
			AtKit.localisation("wiki_title"),
			AtKit.getPluginURL() + 'images/wikipedia.png',
			function(dialogs, functions){

				try{
					var b=window.getSelection(),a=b?b.toString().replace(/(^\W+|\W+$)/g,''):'';

					if(!a){
						a=prompt('Enter a word to look up on Wikipedia');
						if(!a)return
					}
					var c='http://en.wikipedia.org/w/wiki.phtml?search='+encodeURIComponent(a);
					window.open(c)
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