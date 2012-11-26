(function(){

	var pluginName = "afterthedeadline";
	var plugin = function(){
		
		$lib = AtKit.lib();
		
		// Internationalisation
		AtKit.addLocalisationMap("en", {
			"spell_title" : "Start AfterTheDeadline"
		});

		AtKit.addLocalisationMap("ar", {
			"spell_title" : "&#1575;&#1604;&#1578;&#1583;&#1602;&#1612;&#1602; &#1575;&#1575;&#1604;&#1605;&#1575;&#1604;&#1620;&#1610;&#1611;"
		});
		
		// Spell checker
		AtKit.addButton(
			'afterthedeadline', 
			AtKit.localisation("spell_title"),
			AtKit.getPluginURL() + 'images/spell-off.png',
			function(dialogs, functions){

				    if (typeof AtD != 'undefined') return;
				    var loadresource = function (tag, link, type, breakc) {
				            var d = new Date();
				            var breakCache = breakc ? '?ver=' + d.getMonth() + '.' + d.getYear() + '.5' : '';
				            var res = document.createElement(tag);
				            res.type = type;
				            if (tag == 'link') {
				                res.href = link + breakCache;
				                res.rel = 'stylesheet';
				            } else {
				                res.src = link + breakCache;
				            }
				            document.getElementsByTagName('head')[0].appendChild(res);
				        };
				    if (typeof jQuery == 'undefined') {
				        loadresource('SCRIPT', 'https://core.atbar.org/resources/jquery/1.8/jquery.min.js', 'text/javascript', false);
				        setTimeout(function () {
				            if (typeof jQuery != 'undefined') jQuery.noConflict();
				            else setTimeout(this, 1000);
				        }, 1000);
				    }
				    loadresource('SCRIPT', 'http://static.afterthedeadline.com/atd-jquery/scripts/jquery.atd.textarea.js', 'text/javascript', true);
				    loadresource('SCRIPT', 'http://static.afterthedeadline.com/atd-jquery/scripts/csshttprequest.js', 'text/javascript', true);
				    loadresource('link', 'http://static.afterthedeadline.com/atd-jquery/css/atd.css', 'text/css', true);
				    setTimeout(function () {
				        if (typeof AtD != 'undefined' && typeof jQuery != 'undefined') {
				            AtD.rpc_css = 'http://www.polishmywriting.com/bookmarklet/proxycss.php?data=';
				            $lib('textarea').addProofreader();
				        } else {
				            setTimeout(this, 1000);
				        }
				    }, 1000);
				
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