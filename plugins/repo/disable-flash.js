(function(){

	var pluginName = "disable-flash";
	var plugin = function(){
			
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"plugin_title" : "Disabled flash player on this page"
		});
		
		// WAVE
		AtKit.addButton(
			'disable-flash', 
			AtKit.localisation("plugin_title"),
			AtKit.getPluginURL() + 'images/disable-flash.png',
			function(dialogs, functions){

				function removePlugins( node ) {
					if ( node.nodeType == 1 && node.tagName.toLowerCase() == 'object') {
						var a = node.parentNode;
						var box = document.createElement('div');
						box.style.overflow="hidden";box.style.border = "1px solid black";
						box.style.textAlign = "left";box.innerHTML = "Plugin";
						box.style.width = document.defaultView.getComputedStyle(node, '').getPropertyValue('width');box.style.height = document.defaultView.getComputedStyle(node, '').getPropertyValue('height');
						a.insertBefore( box, node );a.removeChild( node );
					}
					else if (node.childNodes) {
						for (var i=0; i < node.childNodes.length;i++)
						removePlugins(node.childNodes[i]);
					}
				}
				removePlugins(document.body);

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