/*! Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 *
 * Heavily modified by Seb Skuse (scs@ecs.soton.ac.uk) to use Greasemonkey XHR requests, as well as custom XHR to get around limitations in other browsers.
 */
  /*!
 * ATBar
 *
 * http://www.atbar.org/
 *
 * Licensed under the BSD Licence.
 * http://www.opensource.org/licenses/bsd-license.php
 *
 */

(function(){

	var pluginName = "spellng";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		$lib.sb_spellVersion = '3.5';

		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"spell_title" : "Start Spellchecker",
			"spell_complete": "Spell checking complete!",
			"spell_mistake": "Spelling Mistake",
			"spell_suggestions": "Spelling Suggestions",
			"spell_ignore": "Ignore",
			"spell_replace": "Replace"
		});

		AtKit.addLocalisationMap("ar", {
			"spell_title" : "&#1575;&#1604;&#1578;&#1583;&#1602;&#1612;&#1602; &#1575;&#1575;&#1604;&#1605;&#1575;&#1604;&#1620;&#1610;&#1611;",
			"spell_complete": "&#1578;&#1605; &#1575;&#1604;&#1575;&#1606;&#1578;&#1607;&#1575;&#1569; &#1605;&#1606; &#1575;&#1604;&#1578;&#1583;&#1602;&#1610;&#1602; &#1575;&#1604;&#1573;&#1605;&#1604;&#1575;&#1574;&#1610;",
			"spell_mistake": "&#1582;&#1591;&#1571; &#1573;&#1605;&#1604;&#1575;&#1574;&#1610;",
			"spell_suggestions": "&#1575;&#1602;&#1578;&#1585;&#1575;&#1581;&#1575;&#1578; &#1604;&#1578;&#1589;&#1581;&#1610;&#1581; &#1575;&#1604;&#1582;&#1591;&#1571; &#1575;&#1604;&#1573;&#1605;&#1604;&#1575;&#1574;&#1610;",
			"spell_ignore": "&#1578;&#1580;&#1575;&#1607;&#1604;",
			"spell_replace": "&#1575;&#1587;&#1578;&#1576;&#1583;&#1575;&#1604;"
		});

		AtKit.set('spellInitialised', false);

		var complete = $lib('<div>', { "style": "" });
		complete.append($lib('<h3>', { "html": AtKit.localisation("spell_complete") }));


		var spell_settings = {
			"baseURL": "http://c.atbar.org/ATBar/",
			"completeDialog": complete
		};
		
		if(/https:/.test(window.location.protocol)){
			spell_settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}


		AtKit.addFn('removeIncorrectWord', function(){
			var selector = "#spellcheckmistakes";
			$lib(selector + ' option:selected').remove();
			$lib(selector).val($lib(selector + ' option:first').val());

			// If there are no more replacements, we're done.
			if($lib(selector).children().length === 0){
				AtKit.message(spell_settings.completeDialog);
			} else {
				$lib(selector).trigger('change');
			}
			
		});


		AtKit.addFn('initSpell', function(){
			$lib.fn.spellcheck = function(options) {
				return this.each(function() {
					var $this = $lib(this);
					if ( !$this.is('[type=password]') && !$this.data('spellchecker') )
						$lib(this).data('spellchecker', new $lib.SpellChecker(this, options));
				});
			};
			
			$lib.fn.removeSpellCheck = function(){
				return this.each(function() {
					$lib(this).unbind(this.options.events);
					$lib(this).removeData('spellchecker');
				});
			};
			
			$lib.fn.rteSpellCheck = function(content, rteptr, options){
				return this.each(function(){
					var $this = $lib(this);
					var checker = new $lib.SpellChecker(this, options);
					checker.checkRTESpelling( content, rteptr, options.RTEType );
				});
			};
			
			/**
			* Forces a spell check on an element that has an instance of SpellChecker.
			*/
			$lib.fn.checkspelling = function() {
				return this.each(function() {
					var spellchecker = $this.data('spellchecker');
					spellchecker && spellchecker.checkSpelling();
				});
			};
			
			
			$lib.SpellChecker = function(element, options) {
				this.$element = $lib(element);
				this.options = $lib.extend({
					lang: 'en_US',
					autocheck: 750,
					events: 'keypress blur paste',
					url: 'spellcheck.php',
					useXHRMethod: 'GM-XHR',
					ignorecaps: 1,
					ignoredigits: 1,
					isRTE: false,
					RTEType: ''
				}, options);
				this.bindEvents();
			};
			
			$lib.SpellChecker.prototype = {
				bindEvents: function() {
					if ( !this.options.events ) return;
					var self = this, timeout;
					this.$element.bind(this.options.events, function(event) {
						if ( /^key[press|up|down]/.test(event.type) ) {
							if ( timeout ) clearTimeout(timeout);
							timeout = setTimeout(function() { self.checkSpelling(); }, self.options.autocheck);
						} else
							self.checkSpelling();
					});
				},
				
				checkRTESpelling: function(input, rteptr, type){
					this.options.isRTE = true;
					this.origText = input;
					this.rteptr = rteptr;
					this.RTEType = type;
					
					var prevText = input.replace(/<.*?>/ig, '');
					this.text = input.replace(/<.*?>/ig, '');
					var self = this, timeout;
					
					$lib.getJSON("http://core.a.atbar.org/API/spellng.php?l=" + this.options.lang + "&r=" + encodeURIComponent(this.text) + "&callback=?", function(data){
						self.parseResults( data );
					});

				},
				
				checkSpelling: function() {
					this.options.isRTE = false;
					var prevText = this.text, text = this.$element.val(), self = this;
					if ( prevText === text ) return;
					this.text = this.$element.val();
					var self = this, timeout;
					
					$lib.getJSON("http://core.a.atbar.org/API/spellng.php?l=" + this.options.lang + "&r=" + encodeURIComponent(this.text) + "&callback=?", function(data){
						self.parseResults( data );
					});

				},
				
				parseResults: function(res) {
					var self = this;
					self.results = {};
					self.results.words = {};

					i = 0;

					for(r in res){
						self.results.words[r] = {
							word: r,
							suggestions: res[r].suggestions,
							w_offset: res[r].offset
						};
						i++;
					}

					self.results.count = i;

					this.displayResults();
				},
			
				
				displayResults: function() {
					if ( !this.results.count ) return;

					var dlg = $lib('<div>', { "style": "" });
					dlg.append($lib('<h3>', { "html": AtKit.localisation("spell_mistake") }));
					dlg.append($lib('<div>', { "id": "AtKitSpellMistakeContainer" }));
					dlg.append($lib('<h3>', { "html": AtKit.localisation("spell_suggestions") }));
					dlg.append($lib('<div>', { "id": "AtKitSpellSuggestionContainer" }));
					dlg.append($lib('<button>', { "html": AtKit.localisation("spell_replace"), "id": "AtKitSpellReplace" }));
					dlg.append($lib('<button>', { "html": AtKit.localisation("spell_ignore"), "id": "AtKitSpellIgnore" }));


					var self = this;

					dlg.children("#AtKitSpellMistakeContainer").append(
						$lib('<select>', { "name": "spellcheckmistakes", "id": "spellcheckmistakes", "size": 7, "style": "width: 350px" }).change(
							function(){
								// Remove children from suggestions
								$lib('#spellchecksuggestions').empty();

								var word = self.results.words[$lib(this).val()];

								var suggestions = word.suggestions;
								
								$lib.each(suggestions, function(i,v){
									$lib('#spellchecksuggestions').append(
										$lib('<option>', { "name": v, "text": v })
									);
								});

							}
						)

					);

					dlg.children("#AtKitSpellSuggestionContainer").append(
						$lib('<select>', { "name": "spellchecksuggestions", "id": "spellchecksuggestions", "size": 7, "style": "width: 350px" })
					);


					AtKit.message(dlg);

					// Add items to spellcheckmistakes.
					$lib.each(this.results.words, function(i,v){
						dlg.find('#spellcheckmistakes').append(
							$lib('<option>', { "name": v.word, "text": v.word })
						);
					});


					// Ignore this mistake
					$lib('#AtKitSpellIgnore').click(function(){
						AtKit.call('removeIncorrectWord');
					});

					$lib('#AtKitSpellReplace').click(function(){
						var selector = "#spellcheckmistakes";

						var mistake = dlg.find(selector).val();
						var replacement = dlg.find("#spellchecksuggestions").val();

						if(self.isRTE === false || (typeof self.isRTE) == 'undefined'){
							self.$element.val( self.$element.val().replace( mistake, replacement ) );
						} else {
							var tmpData = self.origText;
							self.origText = tmpData.replace( mistake, replacement );
							// Set the new content back to the RTE.
							if(self.RTEType == 'tMCE'){
								self.rteptr.setContent(self.origText);
							} else if(self.RTEType == 'CKE'){
								self.rteptr.setData(self.origText);
							}
						}

						AtKit.call('removeIncorrectWord');
					});

					dlg.find("#spellcheckmistakes").val(dlg.find('#spellcheckmistakes option:first').val());
					dlg.find("#spellcheckmistakes").trigger('change');
				}
				
			};
			AtKit.set('spellInitialised', true);
		});

		
		// Spell checker
		AtKit.addButton(
			'spell',
			AtKit.localisation("spell_title"),
			AtKit.getPluginURL() + 'images/spell-off.png',
			function(dialogs, functions){
				// Initialise spelling if not already
				if(AtKit.get('spellInitialised') === false) AtKit.call('initSpell');

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