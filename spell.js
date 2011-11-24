(function(){

	var pluginName = "spell";
	var plugin = function(){
		
		settings = {
			"baseURL": "http://c.atbar.org/ATBar/"
		};
		
		if(/https:/.test(window.location.protocol)){
			settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}
		
		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"spell_title" : "Start Spellchecker"
		});

		AtKit.addLocalisationMap("ar", {
			"spell_title" : "&#1575;&#1604;&#1578;&#1583;&#1602;&#1612;&#1602; &#1575;&#1575;&#1604;&#1605;&#1575;&#1604;&#1620;&#1610;&#1611;"
		});

		
		// Spell checker
		settings.spellcheckerLoading = false;
		AtKit.addButton(
			'spell', 
			AtKit.localisation("spell_title"),
			settings.baseURL + 'images/spell-off.png',
			function(dialogs, functions){
				if(settings.spellcheckerLoading) return;
				settings.spellcheckerLoading = true;
				
				AtKit.addScript(settings.baseURL + 'spell-ar.js', function(){ 
					
					// Are there any TinyMCE fields on this page?
					if((typeof AtKit.__env.window.tinyMCE) != 'undefined'){
						tinyMCE = AtKit.__env.window.tinyMCE;
						
						tinyMCE.activeEditor.onKeyPress.add(function(ed, e) {
							var content = tinyMCE.activeEditor.getContent();
							if ( rteSpellTimer ) window.clearTimeout(rteSpellTimer);
							rteSpellTimer = window.setTimeout(function() { $("#" + tinyMCE.activeEditor.editorContainer).rteSpellCheck(content, tinyMCE.activeEditor, { useXHRMethod: AtKit.__env.transport, 'lang': AtKit.getLanguage(),  RTEType: 'tMCE' }); }, 750);
						});
					}
					
					if((typeof AtKit.__env.window.CKEDITOR) != 'undefined'){
						CKE = AtKit.__env.window.CKEDITOR;
						for(var o in CKE.instances){
						   	CKE.instances[o].document.on('keypress', function(){
					    		if ( rteSpellTimer ) window.clearTimeout(rteSpellTimer);
					    		var content = CKE.instances[o].getData();
					    		rteSpellTimer = window.setTimeout(function() { $("#" + CKE.instances[o].element.getId()).rteSpellCheck(content, CKE.instances[o], { useXHRMethod: AtKit.__env.transport, 'lang': AtKit.getLanguage(),  RTEType: 'CKE' }); }, 750);
					    	});
						}
					}
					
					
					$("textarea").spellcheck({ useXHRMethod: AtKit.__env.transport, 'lang': "ar", baseURL: settings.baseURL });
					$('input[type=text]').spellcheck({ useXHRMethod: AtKit.__env.transport, 'lang': "ar", baseURL: settings.baseURL });
					
					$('#at-lnk-spell').find('img').attr('src', settings.baseURL + "images/spell.png");
					
				
				});
				
			},
			null, null
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