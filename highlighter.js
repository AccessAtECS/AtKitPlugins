/*
Based on the following code, modified by Seb Skuse to work with AtKit
*/

/*
 * jQuery Highlight Regex Plugin v0.1.1
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * (c) 2009-10 Jacob Rothstein
 * MIT license
 */
(function(){

	var pluginName = "highlighter";
	var plugin = function(){

		$lib = AtKit.lib();
		
		AtKit.addFn('normalize', function( node ) {
			if(!(node && node.childNodes)) return;

			var children = $lib.makeArray(node.childNodes ),   prevTextNode = null;

			$lib.each( children, function( i, child ) {
				if(child.nodeType === 3) {
					if (child.nodeValue === "") {
						node.removeChild(child);
					} else if ( prevTextNode !== null ) {
						prevTextNode.nodeValue += child.nodeValue;
						node.removeChild( child );
					} else {
						prevTextNode = child;
					}
				} else {
					prevTextNode = null;
					if ( child.childNodes ) {
						AtKit.call('normalize', child );
					}
				}
			});
		});

		AtKit.addFn('unHighlight', function(selector){
			if(selector === null) selector = "body";
			var el = $lib(selector).find('span.atkit-highlight');
			el.replaceWith(el.html());

		});

		AtKit.addFn('highlight', function(args){
			options = args.options;
			regex = args.regex;
			element = args.element;

			if ( typeof options === 'undefined' ) options = {};

				options.className = options.className || 'atkit-highlight';
				options.tagType   = options.tagType   || 'span';

				if ( typeof regex === 'undefined' || regex.source === '' ) {

				$lib( element ).find( options.tagType + '.' + options.className ).each( function() {

					$lib( element ).replaceWith( $lib( element ).text() );

					AtKit.call('normalize', $lib( element ).parent().get(0));

				});

			} else {

				$lib( element ).each( function() {

					var elt = $lib( element ).get( 0 );

					AtKit.call('normalize', elt );

					$lib.each( $lib.makeArray( elt.childNodes ), function( i, searchnode ) {

						var spannode, middlebit, middleclone, pos, match, parent;

						AtKit.call('normalize', searchnode);

						if ( searchnode.nodeType == 3 ) {

							while ( searchnode.data &&
							( pos = searchnode.data.search( regex )) >= 0 ) {

								match = searchnode.data.slice( pos ).match( regex )[ 0 ];

								if ( match.length > 0 ) {

									spannode = document.createElement( options.tagType );
									spannode.style.background = "yellow";
									spannode.className = options.className;

									parent      = searchnode.parentNode;
									middlebit   = searchnode.splitText( pos );
									searchnode  = middlebit.splitText( match.length );
									middleclone = middlebit.cloneNode( true );

									spannode.appendChild( middleclone );
									parent.replaceChild( spannode, middlebit );

								} else break;
							}

						} else {
							AtKit.call('highlight', {
								"options": options,
								"regex": regex,
								"element": searchnode
							});
						}
					});
				});
			}

			return $lib( element );

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