(function(){

	var pluginName = "findEl";
	var plugin = function(){

		$ = AtKit.lib();

		var settings = {
			'baseURL': 'http://c.atbar.org/ATBar/images/',
			storage: {
				elementStorage: [],
				searchElementStorage: [],
				searchType: '',
				isCtrl: false
			}
		};

		globalFunctions = {
			'bindKeypress': function(){
				$(document).keyup(function (e) {
						if(e.which == 17) settings.isCtrl = false;
					}).keydown(function (e) {
						if(e.which == 17) settings.isCtrl = true;

						if(e.which == 8) $('#asTypeInput').val( $('#asTypeInput').val().substring(0, $('#asTypeInput').val().length - 1) );

						if(e.which == 13 && settings.isCtrl){
							var input = $('#asTypeInput').val();

							settings.storage.searchElementStorage = [];

							$.each(settings.storage.elementStorage, function(i, v){
								if(v.html().substring(0, input.length).toLowerCase() == input.toLowerCase()) settings.storage.searchElementStorage.push(v.get(0));
							});

							settings.storage.elementStorage = settings.storage.searchElementStorage;

							var elements = AtKit.call('locateElements', settings.storage.elementStorage);
							AtKit.message(elements, function(){ $('#facebox a:first').focus(); });

						} else {
							var character = String.fromCharCode(e.which);
							$('#asTypeInput').val( $('#asTypeInput').val() + character );

							// Search for element that starts with the character
							AtKit.call('selectSingleEl', character);
						}
				});

			}

		};


		AtKit.addButton(
			'findParagraphs', 
			'Find Paragraphs',
			settings.baseURL + 'document-icon.png',
			function(dialogs, functions){
				settings.searchType = 'h1, h2, h3, h4, h5';
				var elements = AtKit.call('locateElements', $(settings.searchType));

				AtKit.message(elements, function(){
					$('#facebox a:first').focus();
					AtKit.call('applyCSS', '#searchElementsHolder a');
				});


			},
			null,
			globalFunctions
		);

		AtKit.addButton(
			'findLinks',
			"Find Links",
			settings.baseURL + 'document-export.png',
			function(dialogs, functions){
				settings.searchType = "a";
				var elements = AtKit.call('locateElements', $(settings.searchType));

				AtKit.message(elements, function(){
					$('#facebox a:first').focus();
					AtKit.call('applyCSS', '#searchElementsHolder a');
				});				
			},
			null,
			globalFunctions
		);

		AtKit.addFn('applyCSS', function(c){ $(c).attr('style', AtKit.__CSS[c]); });

		AtKit.addFn('selectSingleEl', function(char){

			$('#facebox .content').find('a').each(function(i, v){
				if($(v).text().substring(3, 4).toLowerCase() == char.toLowerCase()){
					$(v).focus();
					return false;
				} 

			});

		});

		AtKit.addFn('locateElements', function(elements){
			var output = $("<div>", { 'id': 'searchElementsHolder' });

			var inputText = $('<input />', { 'type': 'text',  'id': 'asTypeInput', 'disabled':'disabled' });

			if(elements.length == 0) return $("<p>", { html: "No elements found" });

			output.append( inputText );


			var x = 1;

			$.each(elements, function(i, v){
				var newEl = $('<a>', { href: '#' });
				var mainEl = $(this);
				var content = $(mainEl);

				// Check if el is ok
				if(content.text() == "") return;

				newEl.html( (x) + ". " + content.text() );

				newEl.find('img').remove();

				newEl.bind('click', function(){

					var tagName = $(mainEl).get(0).tagName;

					if(tagName == "A") {
						var link = $(mainEl).attr('href');

						window.location = link;
					}

					if(tagName == "H1" || tagName == "H2" || tagName == "H3" || tagName == "H4" || tagName == "H5"){
						var offset = mainEl.offset();
						$.scrollTo(offset.top - 80, 800);

						mainEl.css("background-color", "red");
						mainEl.animate({ opacity: 0.1 }, 500, function() { 
							mainEl.animate({ opacity: 1}, 500, function(){
								mainEl.animate({ opacity: 0.1 }, 500, function(){
									mainEl.animate({ opacity: 1 }, 500, function(){
										mainEl.css('background-color', ''); 
									})
								})
							})
						});
					}
				});

				settings.storage.elementStorage.push( mainEl );

				output.append( $('<p>').html(newEl.wrap("<p>").get(0)) );

				x++;
			});

			return output;
		});


		// Setup
		globalFunctions.bindKeypress();
		AtKit.setCSS('#searchElementsHolder a', 'font-size: 18px');

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


/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);