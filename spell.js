(function(){

	var pluginName = "spell";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		var spell_settings = {
			"baseURL": "http://c.atbar.org/ATBar/"
		};
		
		if(/https:/.test(window.location.protocol)){
			spell_settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}
		
		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"spell_title" : "Start Spellchecker"
		});

		AtKit.addLocalisationMap("ar", {
			"spell_title" : "&#1575;&#1604;&#1578;&#1583;&#1602;&#1612;&#1602; &#1575;&#1575;&#1604;&#1605;&#1575;&#1604;&#1620;&#1610;&#1611;"
		});

		
		// Spell checker
		spell_settings.spellcheckerLoading = false;
		AtKit.addButton(
			'spell',
			AtKit.localisation("spell_title"),
			AtKit.getPluginURL() + 'images/spell-off.png',
			function(dialogs, functions){
				if(spell_settings.spellcheckerLoading) return;
				spell_settings.spellcheckerLoading = true;
				
				var script = "spell.js";
				
				if(AtKit.getLanguage() == "ar") script = 'spell-ar.js';
				
				AtKit.addScript(spell_settings.baseURL + script, function(){
					
					// Are there any TinyMCE fields on this page?
					if((typeof AtKit.__env.window.tinyMCE) != 'undefined'){
						tinyMCE = AtKit.__env.window.tinyMCE;
						
						tinyMCE.activeEditor.onKeyPress.add(function(ed, e) {
							var content = tinyMCE.activeEditor.getContent();
							if ( rteSpellTimer ) window.clearTimeout(rteSpellTimer);
							rteSpellTimer = window.setTimeout(function() { $lib("#" + tinyMCE.activeEditor.editorContainer).rteSpellCheck(content, tinyMCE.activeEditor, { useXHRMethod: AtKit.__env.transport, 'lang': AtKit.getLanguage(),  RTEType: 'tMCE' }); }, 750);
						});
					}
					
					if((typeof AtKit.__env.window.CKEDITOR) != 'undefined'){
						CKE = AtKit.__env.window.CKEDITOR;
						for(var o in CKE.instances){
							CKE.instances[o].document.bind('keypress', function(){
								if ( rteSpellTimer ) window.clearTimeout(rteSpellTimer);
								var content = CKE.instances[o].getData();
								rteSpellTimer = window.setTimeout(function() { $lib("#" + CKE.instances[o].element.getId()).rteSpellCheck(content, CKE.instances[o], { useXHRMethod: AtKit.__env.transport, 'lang': AtKit.getLanguage(),  RTEType: 'CKE' }); }, 750);
							});
						}
					}
					
					
					$lib("textarea").spellcheck({ useXHRMethod: AtKit.__env.transport, 'lang': AtKit.getLanguage(), baseURL: spell_settings.baseURL });
					$lib('input[type=text]').spellcheck({ useXHRMethod: AtKit.__env.transport, 'lang': AtKit.getLanguage(), baseURL: spell_settings.baseURL });
					
					$lib('#at-lnk-spell').find('img').attr('src', spell_settings.baseURL + "images/spell.png");
					
				
				});
				
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
