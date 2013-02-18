(function(){

	var pluginName = "tweet";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"tweet_title" : "Tweet this page"
		});
		
		// Tweet
		AtKit.addButton(
			'tweet', 
			AtKit.localisation("tweet_title"),
			AtKit.getPluginURL() + 'images/twitter.png',
			function(dialogs, functions){
			
				f='http://twitter.com/share?url='+encodeURIComponent(window.location.href)+'&text='+encodeURIComponent(document.title);				
				a=function(){window.open(f,'twitterui','location=yes,links=no,scrollbars=yes,toolbar=no,status=no,width=550,height=450')};
				
				if(/Firefox/.test(navigator.userAgent)){
					setTimeout(a,0)}else{a()
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