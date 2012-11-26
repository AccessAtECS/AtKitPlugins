(function(){

	var pluginName = "ff";
	var plugin = function(){
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"ff_title" : "Start Font Friend"
		});
		
		// FontFriend
		AtKit.addButton(
			'ff', 
			AtKit.localisation("ff_title"),
			AtKit.getPluginURL() + 'images/font.png',
			function(dialogs, functions){

				if(typeof jQuery=='undefined'){
					var jqit=document.createElement('script');jqit.type='text/javascript';jqit.src='https://core.atbar.org/resources/jquery/1.8/jquery.min.js';document.getElementsByTagName('head')[0].appendChild(jqit);
				}
				
				_my_script=document.createElement('script');_my_script.type='text/javascript';_my_script.src='http://font-friend.googlecode.com/svn/trunk/font-friend.js';document.getElementsByTagName('head')[0].appendChild(_my_script);


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