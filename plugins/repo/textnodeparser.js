(function(){

	var pluginName = "ttsnextgen";
	var plugin = function(){

		$lib = AtKit.lib();
		
		var ttsnextgen_settings = {
			"baseURL": "http://c.atbar.org/ATBar/",
			"contentThreshold": 1024
		};

		var pendingNodes = [];
		
		if(/https:/.test(window.location.protocol)){
			ttsnextgen_settings.baseURL = "https://ssl.atbar.org/c/ATBar/";
		}
		
		// Internationalisation
		AtKit.addLocalisationMap("GB", {
			"ttsnextgen_title" : "TTS"
		});

		AtKit.addLocalisationMap("ar", {
			"ttsnextgen_title" : ""
		});

		// Import the highlighter plugin so we can highlight the text we are speaking.
		AtKit.importPlugins(['highlighter'], function(){
			AtKit.addPlugin('highlighter');
		});


		// Actual plugin code starts here.

		// Get all text nodes in element specified by el
		// And any children of el
		AtKit.addFn('getTextNodes', function(el){
			return $lib(el).find(":not(iframe)").andSelf().contents().filter(function() {
				if(this.nodeType != 3) {
					// Are there any non-text nodes that we want?
					// Filter out here.

					// Otherwise..
					return false;
				}

				if($lib.trim(this.nodeValue) === "") return false;

				return true;
			});
		});

		// Read a particular section by parsing text nodes
		AtKit.addFn('analyseSection', function(el){
			var target = $lib(el);

			// Storage for any identified text nodes.
			var data_nodes = [];

			// This is the combined data that we will send to the TTS engine
			var combined = "";

			// Convert to strings & build an array
			$lib.each(AtKit.call('getTextNodes', target), function(i, v){
				data_nodes.push($lib.trim($lib(v).text()));

				var cleanString = $lib.trim($lib(v).text());
				// Strip out any other rubbish.
				cleanString  = cleanString.replace(/(\r\n|\n|\r|\t)/gm, "");
				
				// Combined is used as the string sent to the TTS engine.
				combined += cleanString + ( (cleanString.substr(-1, 1) == ".") ? " " : ". " );
			});


			// Check the overall length of the string.
			//console.log('combined text is ' + combined  + " - " + combined.length);
			if(combined.length < ttsnextgen_settings.contentThreshold){
				// Send tts request.
				pendingNodes.push({
					"target": target,
					"ttsData": combined,
					"nodes": data_nodes
				});

			} else {
				// Split into chunks and recursivley read.
				var children = target.children();
				console.log("data in this node exceeds limit. Analysing children...");

				// This node has child nodes.
				// Pull out the nodes and run this function recursivley.
				if(children.length > 0){

					$lib.each(children, function(i, v){
						// Get text
						var text_nodes = AtKit.call('getTextNodes', v);
						if(text_nodes.length === 0) return true;

						AtKit.call('analyseSection', v);
					});
				} else {
					// This node is too large to process in one go
					// But does not have child nodes. We're going to have to split up.
					var content = $lib(AtKit.call('getTextNodes', target)).text();

					// Break apart the string into an array we can convert into text.
					var textChunks = [];
					var textChunksTTS = [];

					var regex = new RegExp("\\s*((\\n?.?){1," + ttsnextgen_settings.contentThreshold + "}([\\s|\\.]){1})", "gm");
					var chunks = content.match(regex);

					for(i=0;i<chunks.length;i++){
						// Trim any whitespace off the beginning or end of the string.
						chunks[i] = $lib.trim(chunks[i]);

						// Push the chunk onto the textChunks stack.
						textChunks.push(chunks[i]);

						// We only need the text for the TTS engine. Rid the string of any carraige returns, tabs, etc.
						textChunksTTS.push(chunks[i].replace(/(\r\n|\n|\r|\t)/gm, ""));
					}

					pendingNodes.push({
						"target": target,
						"ttsData": textChunksTTS,
						"nodes": textChunks
					});
				}
			}
			return pendingNodes;
		});

		AtKit.addFn('startTalking', function(){
			if(pendingNodes.length === 0) return;

			n = pendingNodes[0];

			if(n.nodes.length === 0) {
				// If there are no more child nodes in this pendingNode shift it off the stack,
				pendingNodes.shift();

				// And call ourself to start on the next pendingNode.
				AtKit.call('startTalking');
				return;
			}

			var thisNode = n.nodes[0];

			// When this is hooked up to the TTS this is where we hook into swfobject's start playing.
			AtKit.call('highlight', {
				"regex": new RegExp(thisNode, 'ig'),
				"element": n.target
			});

			// When this is hooked up this will be replaced with callback from swfobject.
			setTimeout(function(){
				AtKit.call('unHighlight', n.target);
				AtKit.call('startTalking');
			}, 2000);

			// If the node has more children, shift one off the stack.
			if(n.nodes.length > 0) n.nodes.shift();

		});

		// Add the button to the toolbar.
		AtKit.addButton(
			pluginName,
			AtKit.localisation("ttsnextgen_title"),
			AtKit.getPluginURL() + 'images/fugue/balloon.png',
			function(dialogs, functions){
				// Analyse section of the webpage for readable text.
				AtKit.call('analyseSection', $lib('.span11'));

				// Start talking!
				AtKit.call('startTalking');

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