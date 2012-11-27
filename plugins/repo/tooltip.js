(function(){

	var pluginName = "tooltip";
	var plugin = function(){
		
		var $lib = AtKit.lib();

		 "use strict"

		var Tooltip = function ( element, options ) {
		    this.init('tooltip', element, options)
		  }
		
		  Tooltip.prototype = {
		
		    constructor: Tooltip
		
		  , init: function ( type, element, options ) {
		      var eventIn
		        , eventOut
		
		      this.type = type
		      this.$element = $lib(element)
		      this.options = this.getOptions(options)
		      this.enabled = true
		
		      if (this.options.trigger != 'manual') {
		        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
		        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
		        this.$element.bind(eventIn, this.options.selector, $lib.proxy(this.enter, this))
		        this.$element.bind(eventOut, this.options.selector, $lib.proxy(this.leave, this))
		      }
		
		      this.options.selector ?
		        (this._options = $lib.extend({}, this.options, { trigger: 'manual', selector: '' })) :
		        this.fixTitle()
		    }
		
		  , getOptions: function ( options ) {
		      options = $lib.extend({}, $lib.fn[this.type].defaults, options, this.$element.data())
		
		      if (options.delay && typeof options.delay == 'number') {
		        options.delay = {
		          show: options.delay
		        , hide: options.delay
		        }
		      }
		
		      return options
		    }
		
		  , enter: function ( e ) {
		      var self = $lib(e.currentTarget)[this.type](this._options).data(this.type)
		
		      if (!self.options.delay || !self.options.delay.show) {
		        self.show()
		      } else {
		        self.hoverState = 'in'
		        setTimeout(function() {
		          if (self.hoverState == 'in') {
		            self.show()
		          }
		        }, self.options.delay.show)
		      }
		    }
		
		  , leave: function ( e ) {
		      var self = $lib(e.currentTarget)[this.type](this._options).data(this.type)
		
		      if (!self.options.delay || !self.options.delay.hide) {
		        self.hide()
		      } else {
		        self.hoverState = 'out'
		        setTimeout(function() {
		          if (self.hoverState == 'out') {
		            self.hide()
		          }
		        }, self.options.delay.hide)
		      }
		    }
		
		  , show: function () {
		      var $tip
		        , inside
		        , pos
		        , actualWidth
		        , actualHeight
		        , placement
		        , tp
		
		      if (this.hasContent() && this.enabled) {
		        $tip = this.tip()
		        this.setContent()
		
		        if (this.options.animation) {
		          $tip.addClass('fade')
		        }
		
		        placement = typeof this.options.placement == 'function' ?
		          this.options.placement.call(this, $tip[0], this.$element[0]) :
		          this.options.placement
		
		        inside = /in/.test(placement)
		
		        $tip
		          .remove()
		          .css({ top: 0, left: 0, display: 'block' })
		          .appendTo(inside ? this.$element : document.body)
		
		        pos = this.getPosition(inside)
		
		        actualWidth = $tip[0].offsetWidth
		        actualHeight = $tip[0].offsetHeight
		
		        switch (inside ? placement.split(' ')[1] : placement) {
		          case 'bottom':
		            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
		            break
		          case 'top':
		            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
		            break
		          case 'left':
		            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
		            break
		          case 'right':
		            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
		            break
		        }
		
		        $tip
		          .css(tp)
		          .addClass(placement)
		          .addClass('in')
		      }
		    }
		
		  , setContent: function () {
		      var $tip = this.tip()
		      $tip.find('.tooltip-inner').html(this.getTitle())
		      $tip.removeClass('fade in top bottom left right')
		    }
		
		  , hide: function () {
		      var that = this
		        , $tip = this.tip()
		
		      $tip.removeClass('in')
		
		      function removeWithAnimation() {
		        var timeout = setTimeout(function () {
		          $tip.off($lib.support.transition.end).remove()
		        }, 500)
		
		        $tip.one($lib.support.transition.end, function () {
		          clearTimeout(timeout)
		          $tip.remove()
		        })
		      }
		
		      $lib.support.transition && this.$tip.hasClass('fade') ?
		        removeWithAnimation() :
		        $tip.remove()
		    }
		
		  , fixTitle: function () {
		      var $e = this.$element
		      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
		        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
		      }
		    }
		
		  , hasContent: function () {
		      return this.getTitle()
		    }
		
		  , getPosition: function (inside) {
		      return $lib.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
		        width: this.$element[0].offsetWidth
		      , height: this.$element[0].offsetHeight
		      })
		    }
		
		  , getTitle: function () {
		      var title
		        , $e = this.$element
		        , o = this.options
		
		      title = $e.attr('data-original-title')
		        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)
		
		      title = title.toString().replace(/(^\s*|\s*$)/, "")
		
		      return title
		    }
		
		  , tip: function () {
		      return this.$tip = this.$tip || $lib(this.options.template)
		    }
		
		  , validate: function () {
		      if (!this.$element[0].parentNode) {
		        this.hide()
		        this.$element = null
		        this.options = null
		      }
		    }
		
		  , enable: function () {
		      this.enabled = true
		    }
		
		  , disable: function () {
		      this.enabled = false
		    }
		
		  , toggleEnabled: function () {
		      this.enabled = !this.enabled
		    }
		
		  , toggle: function () {
		      this[this.tip().hasClass('in') ? 'hide' : 'show']()
		    }
		
		  }
		
		
		 /* TOOLTIP PLUGIN DEFINITION
		  * ========================= */
		
		  $lib.fn.tooltip = function ( option ) {
		    return this.each(function () {
		      var $this = $lib(this)
		        , data = $this.data('tooltip')
		        , options = typeof option == 'object' && option
		      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
		      if (typeof option == 'string') data[option]()
		    })
		  }
		
		  $lib.fn.tooltip.Constructor = Tooltip
		
		  $lib.fn.tooltip.defaults = {
		    animation: true
		  , delay: 0
		  , selector: false
		  , placement: 'top'
		  , trigger: 'hover'
		  , title: ''
		  , template: '<div class="tooltip" style="position: absolute;z-index:9999999;display: block;visibility:visible;padding: 5px;font-size:11px"><div class="tooltip-arrow" style="position: absolute;width:0;height:0;"></div><div class="tooltip-inner" style="max-width: 200px;padding: 3px 8px;color: #ffffff;text-align: center;text-decoration: none;background-color: #000000;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;"></div></div>'
		  }
		
		setTimeout(function(){
			AtKit.lib()('.at-btn').tooltip({ 
				"placement": "bottom",
				"trigger": "hover"
			});		

			AtKit.lib()('.at-btn a').tooltip({ 
				"placement": "bottom",
				"trigger": "focus"
			});	

		}, 500);

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