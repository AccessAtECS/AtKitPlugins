(function(){

	var pluginName = "translate";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"translate_title" : "Start Google Translate"
		});
		
		// Spell checker
		AtKit.addButton(
			'translate', 
			AtKit.localisation("translate_title"),
			AtKit.getPluginURL() + 'images/translate.png',
			function(dialogs, functions){

				loc = location.href;
				lang = prompt('Choose language (2chars abbreviation):', 'en'); 
				   if (lang.length == 2) { 
				      flag = true; 
				   } else { 
				      flag = false; 
				      alert('Invalid language abbreviation.') 
				   } 
				   text = ''; 
				   if (window.getSelection) { 
				      text = window.getSelection(); 
				   } 
				   else if(document.getSelection) { 
				      text = document.getSelection(); 
				   } 
				   else if(document.selection) { 
				      text = document.selection.createRange().text; 
				   } 

				   if ((flag == true) && (text == '')) { 
				      location = 'http://translate.google.com/translate?u=' + encodeURIComponent(loc) + '&sl=auto&tl=' + lang; 
				   } 

				   if ((flag == true) && (text != '')) { 
				      var res = window.open('http://translate.google.com/translate_t?text=' + text + '&sl=auto&tl=' + lang, 'gTranslate_popup', 'left=' + ((window.screenX || window.screenLeft) + 10) + ',top=' + ((window.screenY || window.screenTop) + 10) + ',height=500px,width=640px,resizable=1,scrollbars=1'); 
				      window.setTimeout(function() { 
				         res.focus() 
				      }, 300) 
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