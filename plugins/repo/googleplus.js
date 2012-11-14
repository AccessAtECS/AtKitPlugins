(function(){

	var pluginName = "googleplus";
	var plugin = function(){
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"googleplus_title" : "Share to Google Plus"
		});
		
		// Google Plus
		AtKit.addButton(
			'googleplus', 
			AtKit.localisation("googleplus_title"),
			AtKit.getPluginURL() + 'images/google-plus.png',
			function(dialogs, functions){

				var a=window,
					b=document,
					c=encodeURIComponent,
					d=a.open("https://m.google.com/app/plus/x/?v=compose&hideloc=1&content="+c(b.title)+" - "+c(b.location),"Share to Google+","left="+(screen.availWidth/2-225)+",top="+(screen.availHeight/2-150)+",height=300px,width=450px,resizable=1,alwaysRaised=1");
					
					a.setTimeout(function(){d.focus()},300)
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