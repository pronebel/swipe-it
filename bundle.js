/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var scrollfix = __webpack_require__(1)
	scrollfix(document.querySelector('.scrollable'))
	if ('ontouchend' in window) {
	  document.querySelector('#list .alert').style.display = 'none'
	}
	var detect = __webpack_require__(2)
	var transform = detect.transform
	var SwipeIt = __webpack_require__(8)
	var tap = __webpack_require__(55)
	var Sortable = __webpack_require__(56)
	var domify = __webpack_require__(9)
	
	!(function () {
	  function hide(el) {
	    el.style.display = 'none'
	  }
	  function show(el) {
	    el.style.display = 'block'
	  }
	  var template = '<div class="remove">删除</div>'
	  var list = document.getElementById('list')
	  // before swipe-it
	  var sortable = new Sortable(list)
	  sortable.handle('.handler')
	  sortable.bind('li')
	  //sortable.ignore('.swipe-dragging')
	
	  var swipe = SwipeIt(template)
	  swipe.bind(list, 'li')
	  swipe.on('start', function (el) {
	    hide(el.querySelector('.handler'))
	  })
	  swipe.on('end', function (el) {
	    show(el.querySelector('.handler'))
	  })
	  swipe.delegate('touchstart', '.remove', tap(function () {
	    swipe.clear()
	  }))
	  window.swipe = swipe
	})()
	
	!(function () {
	var data = [{
	  index: 1,
	  language: 'javascript'
	}, {
	  index: 2,
	  language: 'Ruby'
	}, {
	  index: 3,
	  language: 'Python'
	}, {
	  index: 4,
	  language: 'Php'
	}, {
	  index: 5,
	  language: 'Go'
	}, {
	  index: 6,
	  language: 'Rust'
	}]
	var List = __webpack_require__(70)
	var tmpl = '<li>{language}</li>'
	var colors = ['tomato', 'gold', 'lightgreen', 'deepskyblue', 'orange', 'violet']
	var list = new List(tmpl, window, {
	  selector: '#mobile-list',
	  delegate: {
	    remove: tap(function (e, model) {
	      swipe.clear()
	    })
	  },
	  bindings: {
	    'data-color': function (prop) {
	      this.bind(prop, function (model, el) {
	        var color = colors[model[prop] - 1]
	        el.style.backgroundColor = color
	      })
	    }
	  }
	})
	list.setData(data)
	
	var template = '<div class="remove" data-color="index" on-touchstart="remove">删除</div>'
	var swipe = SwipeIt(template)
	swipe.bind(list, 'li')
	// slide up
	swipe.on('clear', function (el) {
	  //el.style.zIndex = 'aoto'
	  el.style[transform] = 'translateX(' + swipe.x + 'px) translateY(-100%)'
	})
	})()
	
	!(function () {
	  var template = '<div class="remove">{content}</div>'
	
	  var list = document.getElementById('render')
	
	  var swipe = SwipeIt(template)
	  swipe.bind(list, 'li')
	  swipe.render(function (li, template) {
	    var id = parseInt(li.getAttribute('data-id'), 10)
	    var node
	    if (id%2 === 0) {
	      node = domify(template.replace(/\{content\}/, '✓'))
	    } else {
	      node = domify(template.replace(/\{content\}/, '✗'))
	    }
	    return node
	  })
	  swipe.delegate('touchstart', '.remove', tap(function () {
	    swipe.clear()
	  }))
	})()


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * ScrollFix v0.1
	 * http://www.joelambert.co.uk
	 *
	 * Copyright 2011, Joe Lambert.
	 * Free to use under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	(function () {
	  var ScrollFix = function(elem) {
	    // Variables to track inputs
	    var startY, startTopScroll;
	
	    elem = elem || document.querySelector(elem);
	
	    // If there is no element, then do nothing
	    if(!elem) {
	      return;
	    }
	
	    // Handle the start of interactions
	    elem.addEventListener('touchstart', function(event){
	      startY = event.touches[0].pageY;
	      startTopScroll = elem.scrollTop;
	
	      if(startTopScroll <= 0) {
	        elem.scrollTop = 1;
	      }
	
	      if(startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
	        elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
	      }
	
	    }, false);
	
	  };
	
	  // if we've got a window and we don't have a module
	  // create a global;
	  if ((typeof window != 'undefined') && (typeof module == 'undefined')) {
	    window.ScrollFix = ScrollFix;
	  }
	  // otherwise, export it.
	  else {
	    module.exports = ScrollFix;
	  }
	
	})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports.transition = __webpack_require__(3)
	
	exports.transform = __webpack_require__(4)
	
	exports.touchAction = __webpack_require__(5)
	
	exports.transitionend = __webpack_require__(6)
	
	exports.has3d = __webpack_require__(7)


/***/ },
/* 3 */
/***/ function(module, exports) {

	var styles = [
	  'transition',
	  'webkitTransition',
	  'MozTransition',
	  'OTransition',
	  'msTransition'
	]
	
	var el = document.createElement('p')
	var style
	
	for (var i = 0; i < styles.length; i++) {
	  if (null != el.style[styles[i]]) {
	    style = styles[i]
	    break
	  }
	}
	el = null
	
	module.exports = style


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	var styles = [
	  'webkitTransform',
	  'MozTransform',
	  'msTransform',
	  'OTransform',
	  'transform'
	];
	
	var el = document.createElement('p');
	var style;
	
	for (var i = 0; i < styles.length; i++) {
	  style = styles[i];
	  if (null != el.style[style]) {
	    module.exports = style;
	    break;
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = touchActionProperty();
	
	/**
	 * Returns "touchAction", "msTouchAction", or null.
	 */
	
	function touchActionProperty(doc) {
	  if (!doc) doc = document;
	  var div = doc.createElement('div');
	  var prop = null;
	  if ('touchAction' in div.style) prop = 'touchAction';
	  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
	  div = null;
	  return prop;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Transition-end mapping
	 */
	
	var map = {
	  'WebkitTransition' : 'webkitTransitionEnd',
	  'MozTransition' : 'transitionend',
	  'OTransition' : 'oTransitionEnd',
	  'msTransition' : 'MSTransitionEnd',
	  'transition' : 'transitionend'
	};
	
	/**
	 * Expose `transitionend`
	 */
	
	var el = document.createElement('p');
	
	for (var transition in map) {
	  if (null != el.style[transition]) {
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(4);
	
	// IE <=8 doesn't have `getComputedStyle`
	if (!prop || !window.getComputedStyle) {
	  module.exports = false;
	
	} else {
	  var map = {
	    webkitTransform: '-webkit-transform',
	    OTransform: '-o-transform',
	    msTransform: '-ms-transform',
	    MozTransform: '-moz-transform',
	    transform: 'transform'
	  };
	
	  // from: https://gist.github.com/lorenzopolidori/3794226
	  var el = document.createElement('div');
	  el.style[prop] = 'translate3d(1px,1px,1px)';
	  document.body.insertBefore(el, null);
	  var val = getComputedStyle(el).getPropertyValue(map[prop]);
	  document.body.removeChild(el);
	  module.exports = null != val && val.length && 'none' != val;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var domify = __webpack_require__(9)
	var events = __webpack_require__(10)
	var Reactive = __webpack_require__(16)
	var Tween = __webpack_require__(23)
	var classes = __webpack_require__(27)
	var raf = __webpack_require__(29)
	var uid = __webpack_require__(30)
	var event = __webpack_require__(11)
	var Emitter = __webpack_require__(21)
	var detect = __webpack_require__(2)
	var transform = detect.transform
	var transition = detect.transition
	var transitionend = detect.transitionend
	var has3d = detect.has3d
	var util = __webpack_require__(54)
	
	// max overlap 20px
	var overlap = 20
	
	/**
	 * `template` string or element for element swiped out
	 *
	 * @param {String | Element} template
	 * @constructor
	 * @public
	 */
	function SwipeIt(template) {
	  if (!(this instanceof SwipeIt)) return new SwipeIt(template)
	  this.handler = {}
	  if (typeof template === 'string') {
	    this.template = template
	    this.templateEl = domify(template)
	  } else {
	    this.templateEl = template
	    this.template = template.outerHTML
	  }
	  this.x = 0
	  this._onresize = this.onresize.bind(this)
	  window.addEventListener('orientationchange', this._onresize, false)
	  window.addEventListener('resize', this._onresize, false)
	}
	
	Emitter(SwipeIt.prototype)
	
	/**
	 * Bind swipe event to parentNode or ListRender with delegated selector
	 *
	 * @public
	 * @param {Element | ListRender} list
	 * @param {String} selector
	 * @return {undefined}
	 */
	SwipeIt.prototype.bind = function (list, selector) {
	  this.list = list
	  var parentNode
	  if (Array.isArray(list.reactives)) {
	    this.reactiveOpts = {}
	    util.copy(this.reactiveOpts, {
	      delegate: list.delegate,
	      bindings: list.bindings,
	      filters: list.filters
	    })
	    parentNode = list.parentNode
	  } else {
	    parentNode = list
	  }
	  this.selector = selector
	  this.events = events(parentNode, this)
	  this.docEvent = events(document, this)
	  this.events.bind('touchstart ' + selector)
	  this.events.bind('touchmove ' + selector)
	  this.events.bind('touchend ' + selector)
	  this.events.bind('touchcancel', 'ontouchend')
	  this.docEvent.bind('touchend')
	}
	
	/**
	 * @param  {Event}  e
	 * @private
	 */
	SwipeIt.prototype.ontouchstart = function (e) {
	  var el = e.delegateTarget
	  if (this.stat === 'reseting' || (this.holder && el === this.holder)) return
	  if (this.tween) this.tween.stop()
	  // already moved
	  if (this.swipeEl && el === this.swipeEl) return this.reset()
	  if (this.swipeEl) return this.reset('out-quad', 100)
	  // do nothing if handled
	  if (e.defaultPrevented) return
	  var touch = util.getTouch(e)
	  this.dx = 0
	  this.ts = Date.now()
	  this.clientX = touch.clientX
	  this.down = {
	    x: touch.clientX,
	    y: touch.clientY,
	    start: this.x,
	    at: this.ts
	  }
	  var opts = this.reactiveOpts
	  this.onstart = function () {
	    // only called once on move
	    this.onstart = null
	    this.moving = true
	    // show template and bind events
	    var pel = util.getRelativeElement(el)
	    var holder = this.holder = createHolder(el)
	    this.swipeEl = el
	    if (this.renderFn) {
	      this.renderFn(holder)
	    } else {
	      holder.appendChild(this.templateEl)
	    }
	    var templateEl = this.templateEl
	    util.copy(templateEl.style, {
	      position: 'absolute',
	      bottom: '0',
	      right: '0'
	    })
	    templateEl.style.height = holder.style.height
	    this.bindEvents(holder)
	    this.orig = util.makeAbsolute(el, pel)
	    classes(el).add('swipe-dragging')
	    el.parentNode.insertBefore(holder, el)
	    if (opts) {
	      // bind reactive
	      var model = this.list.findModel(el)
	      if (!model) throw new Error('no model find at ListRender with [' + el.outerHTML + ']')
	      if (!this.reactive) {
	        this.reactive = new Reactive(templateEl, model, opts)
	      } else {
	        this.reactive.bind(model)
	      }
	    }
	    this.min = - templateEl.clientWidth - overlap
	    this.emit('start', el)
	  }
	}
	
	/**
	 * @param  {Event}  e
	 * @private
	 */
	SwipeIt.prototype.ontouchmove = function (e) {
	  if (this.stat === 'reseting' || !this.down) return
	  var touch = util.getTouch(e)
	  var cx = touch.clientX
	  var cy = touch.clientY
	  if (!this.onstart && !this.moving) return
	  if (this.onstart) {
	    var dx = cx - this.down.x
	    var dy = cy - this.down.y
	    if (dx === 0 && dy === 0) return
	    if (Math.abs(dx/dy) > 1) {
	      e.preventDefault()
	      this.onstart()
	    } else {
	      this.onstart = null
	    }
	    return
	  }
	  if (e.delegateTarget !== this.swipeEl) return
	  e.preventDefault()
	  //calculate speed every 100 milisecond
	  this.calculate(cx)
	  var x = this.down.start + touch.clientX - this.down.x
	  x = Math.min(0, x)
	  x = Math.max(x, this.min)
	  this.translate(x)
	}
	
	/**
	 * @param  {Event}  e
	 * @private
	 */
	SwipeIt.prototype.ontouchend = function (e) {
	  this.onstart = null
	  if (this.stat === 'reseting') return
	  if (!this.down || !this.moving) return
	  this.moving = false
	  var target = e.delegateTarget
	  var touch = util.getTouch(e)
	  if (target && target !== this.holder) {
	    this.calculate(touch.clientX)
	    var m = this.momentum()
	    if (!m || !m.x) return this.reset()
	    this.animate(m.x, m.ease, m.duration).catch(function () {
	    })
	  } else {
	    this.reset()
	  }
	  this.down = null
	}
	
	/**
	 * Set a custom render function
	 *
	 * @public
	 * @param  {Function}  fn
	 * @return {undefined}
	 */
	SwipeIt.prototype.render = function (fn) {
	  var self = this
	  this.renderFn = function (parentNode) {
	    var el = self.templateEl = fn(self.swipeEl, self.template)
	    parentNode.appendChild(el)
	  }
	}
	
	/**
	 * Delegate `handler` of `type` event with matched `selector` within swiped out element, handler is called with original event and relatived swiped element.
	 *
	 * @public
	 * @param {String} type
	 * @param {String} selector
	 * @param {Function} handler
	 */
	SwipeIt.prototype.delegate = function (type, selector, handler) {
	  var str = type + ' ' + selector
	  // allow mulitiply handler for same event
	  var id = str + ' $' + uid(5)
	  var self = this
	  this.handler[id] = function (e) {
	    handler.call(self.swipeEl, e, self.swipeEl)
	  }
	}
	
	
	/**
	 * Bind events to holder
	 *
	 * @param {Element} holder
	 */
	SwipeIt.prototype.bindEvents = function (holder) {
	  this.holderEvents = events(holder, this.handler)
	  Object.keys(this.handler).forEach(function (key) {
	    var str = key.replace(/\s\$[\w-]{5}$/, '')
	    this.holderEvents.bind(str, key)
	  }, this)
	}
	
	/**
	 * Unbind events of holder
	 *
	 * @param {Element} holder
	 */
	SwipeIt.prototype.unbindEvents = function () {
	  if (this.holderEvents) this.holderEvents.unbind()
	  this.holderEvents = null
	}
	
	/**
	 * Calcute swipe speed and direction with clientX clientY
	 *
	 * @param {Number} x
	 * @private
	 */
	SwipeIt.prototype.calculate = function (x) {
	  var ts = Date.now()
	  var dt = ts - this.ts
	  if (ts - this.down.at < 100) {
	    this.distance = x - this.down.x
	    this.speed = Math.abs(this.distance/dt)
	  } else if(dt > 100){
	    this.distance = x - this.clientX
	    this.speed = Math.abs(this.distance/dt)
	    this.ts = ts
	    this.clientX = x
	  }
	}
	
	SwipeIt.prototype.momentum = function () {
	  var x = this.x
	  var deceleration = 0.0004
	  var speed = Math.min(this.speed, 0.3)
	  var minX = this.min + overlap
	  var destination = x + ( speed * speed ) / ( 2 * deceleration ) * ( this.distance < 0 ? -1 : 1 )
	  var moveSpeed = 0.1
	  var ease = 'out-quad'
	  var duration
	  // already shown
	  if (x < minX) {
	    destination = minX
	    duration = (minX - x)/moveSpeed
	  // should be shown
	  } else if (destination < minX/2) {
	    destination = minX
	    if (x > minX && speed >= 0.3) {
	      ease = util.getOutBack(x - minX, overlap)
	      duration = (x - minX + 2*overlap)/Math.max(speed, 0.15)
	    } else {
	      duration = 2*Math.abs(destination - x)/Math.max(speed, 0.4)
	    }
	  // should not shown
	  } else {
	    destination = 0
	    duration = -x/moveSpeed
	  }
	  return {
	    x: destination,
	    duration: duration,
	    ease: ease
	  }
	}
	
	/**
	 * Translate template element
	 *
	 * @private
	 * @param {Number} x
	 */
	SwipeIt.prototype.translate = function (x) {
	  if (!this.swipeEl) return
	  var s = this.swipeEl.style
	  if (has3d) {
	    s[transform] = 'translate3d(' + x + 'px, 0, 0)'
	  } else {
	    s[transform] = 'translateX(' + x + 'px)'
	  }
	
	  this.x = x
	}
	
	/**
	 * Reset element to original stat with optional ease and duration
	 *
	 * @public
	 * @param {String} ease optional ease
	 * @param {Number} duration optional duration
	 */
	SwipeIt.prototype.reset = function (ease, duration) {
	  if (this.stat === 'reseting') return
	  var holder = this.holder
	  var el = this.swipeEl
	  if (!el || !holder) return
	  this.stat = 'reseting'
	  this.down = null
	  this.moving = false
	  this.unbindEvents()
	  var self = this
	  var promise = new Promise(function (resolve) {
	    var promise = self.animate(0, ease, duration)
	    promise.then(reset, reset)
	    function reset() {
	      // wait for sortable
	      var trans = holder.style[transition]
	      var succeed
	      var end = function () {
	        if (trans) event.unbind(holder, transitionend, end)
	        // restore to original stat
	        classes(el).remove('swipe-dragging')
	        // improve performance
	        el.style[transform] = 'none'
	        util.copy(el.style, self.orig)
	        holder.parentNode.removeChild(holder)
	        self.stat = self.holder = self.swipeEl = null
	        self.x = 0
	        self.emit('end', el)
	        succeed = true
	        resolve()
	      }
	      // make sure called
	      setTimeout(function () {
	        if (!succeed) end()
	      }, 300)
	      if (trans) {
	        event.bind(holder, transitionend, end)
	      } else {
	        end()
	      }
	    }
	  })
	  return promise
	}
	
	/**
	 * Transform swipe el with animation
	 *
	 * @param {Number} x
	 * @param {String} ease
	 * @param {Number} duration
	 * @return {Promise}
	 */
	SwipeIt.prototype.animate = function (x, ease, duration) {
	  if (x == this.x) return Promise.resolve(null)
	  ease = ease || 'out-quad'
	  duration = duration || 350
	  var tween = this.tween = Tween({x : this.x})
	  .ease(ease)
	  .to({x : x})
	  .duration(duration)
	
	  var self = this
	  tween.update(function(o){
	    self.translate(o.x)
	  })
	
	  var promise = new Promise(function (resolve, reject) {
	    var rejected
	    tween.on('stop', function () {
	      self.tween = null
	      rejected = true
	      reject()
	    })
	    tween.on('end', function(){
	      self.tween = null
	      animate = function(){} // eslint-disable-line
	      if (!rejected) resolve()
	    })
	  })
	
	  function animate() {
	    raf(animate)
	    tween.update()
	  }
	
	  animate()
	  return promise
	}
	
	/**
	 * Remove the swiped element and related holder with transition specified by `duration` (default 300) in millisecond and `ease` timing function
	 *
	 * @public
	 * @param {Number} duration
	 * @param {String} ease
	 * @return {promise}
	 */
	SwipeIt.prototype.clear = function (duration, ease) {
	  if (this.stat === 'reseting') return Promise.reject(new Error('clear() should not get called when reseting'))
	  var el = this.holder
	  var sel = this.swipeEl
	  if (!el || !sel) return Promise.resolve(null)
	  this.stat = 'reseting'
	  this.down = null
	  this.unbindEvents()
	  duration = duration || 300
	  ease = ease || 'ease-out'
	  util.copy(sel.style, {
	    transition: 'all ' + duration + 'ms ' + ease,
	    transformOrigin: '0% 0%',
	    webkitTransformOriginY: '0%',
	    opacity: 0
	  })
	  var trans_prop = sel.style[transform]
	  sel.style[transform] = trans_prop + ' rotateX(90deg)'
	  el.style[transition] = 'height ' + duration + 'ms ' + ease
	  self.emit('clear', self.sel)
	  var self = this
	  var promise = new Promise(function (resolve) {
	    var succeed
	    var end = function () {
	      event.unbind(el, transitionend, end)
	      if (el.parentNode) el.parentNode.removeChild(el)
	      if (self.reactive) {
	        self.reactive.model.remove()
	      } else if(sel.parentNode) {
	        sel.parentNode.removeChild(sel)
	      }
	      self.emit('end', sel)
	      self.stat = self.holder = self.swipeEl = null
	      self.x = 0
	      succeed = true
	      resolve()
	    }
	    setTimeout(function () {
	      if (!succeed) end()
	      resolve()
	    }, duration)
	    event.bind(el, transitionend, end)
	    el.style.height = '0px'
	  })
	  return promise
	}
	
	/**
	 * Unbind all events
	 *
	 * @public
	 * @return {undefined}
	 */
	SwipeIt.prototype.unbind = function () {
	  this.unbindEvents()
	  this.events.unbind()
	  this.docEvent.unbind()
	  window.addEventListener('orientationchange', this._onresize, false)
	  window.addEventListener('resize', this._onresize, false)
	  if (this.reactive) this.reactive.remove()
	}
	
	/**
	 * window resize handler
	 *
	 * @private
	 */
	SwipeIt.prototype.onresize = function () {
	  var el = this.swipeEl
	  if (!el) return
	  var holder = this.holder
	  var pel = util.getRelativeElement(holder)
	  var pos = util.getAbsolutePosition(holder, pel)
	  util.copy(el.style, {
	    height: pos.height + 'px',
	    width: pos.width + 'px',
	    left: pos.left + 'px',
	    top: pos.top + 'px'
	  })
	}
	
	function createHolder(el) {
	  var node = el.cloneNode(false)
	  node.removeAttribute('id')
	  classes(node).add('swipe-holder')
	  var styleObj = getComputedStyle(el)
	  var bh = parseInt(styleObj['border-top-width'], 10) + parseInt(styleObj['border-bottom-width'], 10)
	  var w = el.style.width
	  util.copy(node.style, {
	    borderWidth: '0px',
	    overflow: 'hidden',
	    zIndex: 0,
	    transform: 'none',
	    position: 'relative',
	    backgroundColor: 'rgba(255,255,255,0)',
	    height: (el.clientHeight + bh) + 'px',
	    width: w
	  })
	  if (w) node.style.width = w
	  return node
	}
	
	module.exports = SwipeIt


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var events = __webpack_require__(11);
	var delegate = __webpack_require__(12);
	
	/**
	 * Expose `Events`.
	 */
	
	module.exports = Events;
	
	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */
	
	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}
	
	/**
	 * Subscription helper.
	 */
	
	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};
	
	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */
	
	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);
	
	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }
	
	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }
	
	  // subscription for unbinding
	  this.sub(name, method, cb);
	
	  return cb;
	};
	
	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */
	
	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);
	
	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;
	
	  events.unbind(this.el, event, cb);
	};
	
	/**
	 * Unbind all events.
	 *
	 * @api private
	 */
	
	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};
	
	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */
	
	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;
	
	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};
	
	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */
	
	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';
	
	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};
	
	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var closest = __webpack_require__(13)
	  , event = __webpack_require__(11);
	
	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};
	
	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var matches = __webpack_require__(14)
	
	/**
	 * Export `closest`
	 */
	
	module.exports = closest
	
	/**
	 * Closest
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Element} scope (optional)
	 */
	
	function closest (el, selector, scope) {
	  scope = scope || document.documentElement;
	
	  // walk up the dom
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }
	
	  // check scope for match
	  return matches(el, selector) ? el : null;
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var query = __webpack_require__(15);
	
	/**
	 * Element prototype.
	 */
	
	var proto = Element.prototype;
	
	/**
	 * Vendor function.
	 */
	
	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	/**
	 * Expose `match()`.
	 */
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}
	
	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};
	
	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};
	
	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(17)
	var domify = __webpack_require__(9)
	var Binding = __webpack_require__(19)
	var bindings = __webpack_require__(20)
	var Emitter = __webpack_require__(21)
	var filters = __webpack_require__(22)
	var event = __webpack_require__(11)
	
	/**
	 * Reactive
	 *
	 * @param {Element|String} el element or template string
	 * @param {Object} model model with change event emitted
	 * @param {Object} option [Optional] object with `delegate` `bindings` `filters` etc
	 * @api public
	 */
	function Reactive(el, model, option) {
	  if(!(this instanceof Reactive)) return new Reactive(el, model, option)
	  if (typeof el === 'string') el = domify(el)
	  option = option || {}
	  this.bindings = util.assign({}, bindings)
	  // custom bindings first
	  util.assign(this.bindings, option.bindings || {})
	  this.filters = util.assign({}, filters)
	  // custom filters first
	  util.assign(this.filters, option.filters || {})
	  this.binding_names = Object.keys(this.bindings)
	  this.delegate = option.delegate || {}
	  this.model = model
	  this.el = el
	  this.events = []
	  if (option.nobind) return
	  var config = option.config
	  this.config = config ? config : this.generateConfig()
	  if (!model) throw new TypeError('model is requried for reactive')
	  this._bindConfig()
	}
	
	Emitter(Reactive.prototype)
	
	/**
	 * Remove element and unbind events
	 *
	 * @api public
	 */
	Reactive.prototype.remove = function () {
	  if (this._removed) return
	  if (this.el.parentNode) this.el.parentNode.removeChild(this.el)
	  this._removed = true
	  this.unbindEvents()
	  this.emit('remove')
	  // The model may still using, not destroy it
	  this.model = null
	  this.off()
	}
	
	/**
	 * Unbind event handlers
	 *
	 * @public
	 * @return {undefined}
	 */
	Reactive.prototype.unbindEvents = function () {
	  this.events.forEach(function (o) {
	    event.unbind(o.el, o.name, o.handler)
	  })
	  this.events = []
	}
	
	/**
	 * Use generated binding config
	 *
	 * @param {Array} config
	 * @api private
	 */
	Reactive.prototype._bindConfig = function (noEvent) {
	  var root = this.el
	  var reactive = this
	  this.config.forEach(function (o) {
	    var el = util.findElement(root, o.indexes)
	    var binding = new Binding(reactive, el, o.bindings)
	    binding.active(el, noEvent)
	    reactive.on('remove', function () {
	      binding.remove()
	    })
	  })
	}
	
	/**
	 * Parse binding object for no
	 *
	 * @param {Element} node
	 * @return {Binding}
	 * @api public
	 */
	Reactive.prototype.parseBinding = function (node, single) {
	  var binding
	  if (node.nodeType === 3) {
	    binding = new Binding(this, node)
	    binding.interpolation(node.textContent)
	  } else if (node.nodeType === 1) {
	    var attributes = node.attributes
	    binding = new Binding(this, node)
	    for (var i = 0, l = attributes.length; i < l; i++) {
	      var name = attributes[i].name
	      var val = attributes[i].value
	      if (~this.binding_names.indexOf(name)) {
	        binding.add(name, val)
	      }
	    }
	    if (single) {
	      binding.interpolation(node.textContent)
	    }
	  }
	  // empty binding
	  if (binding && binding.bindings.length === 0) {
	    binding.remove()
	    binding = null
	  }
	  return binding
	}
	
	/**
	 * Subscribe to prop change on model
	 *
	 * @param {String} prop
	 * @param {Function} fn
	 * @api public
	 */
	Reactive.prototype.sub = function (prop, fn) {
	  var model = this.model
	  model.on('change ' + prop, fn)
	  this.on('remove', function () {
	    model.off('change ' + prop, fn)
	  })
	}
	
	/**
	 * Get delegate function by function name
	 *
	 * @param {String} name
	 * @param {Object} reactive
	 * @return {Function}
	 * @api public
	 */
	Reactive.prototype.getDelegate = function (name) {
	  var delegate = this.delegate
	  var fn = delegate[name]
	  if (!fn || typeof fn !== 'function') throw new Error('can\'t find delegate function for[' + name + ']')
	  return fn
	}
	
	/**
	 * Generate config array
	 *
	 * @return {Array}
	 * @api public
	 */
	Reactive.prototype.generateConfig = function () {
	  var reactive = this
	  var config = []
	  util.iterate(this.el, function (node, indexes) {
	    var single = util.isSingle(node)
	    var binding = reactive.parseBinding(node, single)
	    if (binding) {
	      config.push({
	        indexes: indexes,
	        bindings: binding.bindings
	      })
	      binding.remove()
	    }
	  }.bind(this), [])
	  return config
	}
	
	/**
	 * Bind new model, exist event handlers would be removed
	 *
	 * @param {Object} model
	 * @api public
	 */
	Reactive.prototype.bind = function (model) {
	  this.model = model
	  this.unbindEvents()
	  this._bindConfig()
	}
	
	/**
	 * Generate config array by the same arguments as Reactive constructor
	 *
	 * @param {Element} el
	 * @param {Object} model
	 * @param {Object} opt
	 * @return {Array}
	 * @api public
	 */
	Reactive.generateConfig = function (el, model, opt) {
	  if (typeof el === 'string') el = domify(el)
	  opt = opt || {}
	  opt.nobind = true
	  var reactive =  Reactive(el, model, opt)
	  return reactive.generateConfig()
	}
	
	/**
	 * Create custom bindings with attribute name and function witch is call with
	 * property value eg:
	 * Reactive.createBinding('data-sum', function (value) {
	 *    var props = value.split(',')
	 *    this.bind(props, function (el, model) {
	 *      var val = props.reduce(function(pre, name) {
	 *        return pre + model[name]
	 *      }, 0)
	 *      el.textContent = val
	 *   })
	 * })
	 *
	 *
	 * @param {String} name attribute name
	 * @param {Function} fn
	 * @api public
	 */
	Reactive.createBinding = function (name, fn) {
	  var names = Object.keys(bindings)
	  if (~names.indexOf(name)) throw new Error('Global binding name [' + name+ '] already in use')
	  bindings[name] = fn
	}
	
	/**
	 * Create global custom filter with `name` and `function`
	 * eg:
	 *  Reactive.createFilter('integer', function (str) {
	 *   if (!str) return 0
	 *   var res = parseInt(str, 10)
	 *   return isNaN(res) ? 0 : res
	 * })
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @api public
	 */
	Reactive.createFilter = function (name, fn) {
	  if (filters[name]) throw new Error('Global filter name [' + name + '] already in use')
	  filters[name] = fn
	}
	
	// use with caution
	Reactive.filters = filters
	Reactive.bindings = bindings
	
	module.exports = Reactive


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(18)
	var funcRe = /\([^\s]*\)$/
	
	/**
	 * Check if node has no element child
	 *
	 * @param {Element} node
	 * @return {Boolean}
	 * @api public
	 */
	var isSingle = exports.isSingle = function (node) {
	  var list = node.childNodes
	  var single = true
	  for (var i = list.length - 1; i >= 0; i--) {
	    var v = list[i]
	    if (v.nodeType === 1) {
	      single = false
	      break
	    }
	  }
	  return single
	}
	
	/**
	 * Parse bindings from function, function calls ignored
	 *
	 * @param {Function} fn
	 * @param {Boolean} firstParam or this
	 * @return {Array}
	 * @api private
	 */
	exports.parseBindings = function (fn, firstParam) {
	  var res = []
	  var str = fn.toString()
	  var arr
	  var param
	  if (firstParam) {
	    var ms = str.match(/\(([A-Za-z0-9_$]+?)(?:[\s,)])/)
	    param = ms ? ms[1] : null
	  } else {
	    param = 'this'
	  }
	  var re = new RegExp('\\b' + param + '\\.([\\w_$]+)\\b(?!([\\w$_]|\\s*\\())', 'g')
	  while ((arr = re.exec(str)) !== null) {
	    res.push(arr[1])
	  }
	  return unique(res)
	}
	
	
	/**
	 * Parse str to get the bindings and render function
	 * eg: {first} {last} => {
	 *  bindings: ['first', 'last'],
	 *  fn: function(model) { return model.first + '' + model.last}
	 * }
	 *
	 * @param {string} str textContent
	 * @return {object} bindings and render function
	 * @api public
	 */
	exports.parseInterpolationConfig = function (str) {
	  var bindings = []
	  // function names
	  var fns = []
	  var res = '"'
	  var inside = false
	  var name = ''
	  for (var i = 0; i < str.length; i++) {
	    var c = str[i]
	    if (c === '{') {
	      inside = true
	      res = res + '"'
	    } else if (c === '}') {
	      inside = false
	      res = res + ' + '
	      name = name.trim()
	      if (!name) {
	        res = res + '""'
	      } else if (/\|/.test(name)) {
	        res = res + parseFilters(name, bindings, fns)
	      } else {
	        res = res + 'model.' + name
	        parseStringBinding(name, bindings, fns)
	      }
	      res = res + '+ "'
	      name = ''
	    } else if (inside) {
	      name = name + c
	    } else {
	      if (c === '"') c = '\\"'
	      res = res + c
	    }
	  }
	  res = res.replace(/\n/g, '\\n')
	  res = res + '"'
	  var fn = new Function('model', 'filter', ' return ' + res)
	  return {
	    bindings: unique(bindings),
	    fns: unique(fns),
	    fn: fn
	  }
	}
	
	/**
	 * Parse filters in string, concat them into js function
	 * If there is function call, push the function name into fns eg:
	 * 'first | json' => 'filter.json(model.first)'
	 * 'first | nonull | json' => 'filter.json(filter.nonull(model.first))'
	 *
	 * @param {String} str
	 * @param {Array} fns
	 * @return {String}
	 * @api public
	 */
	var parseFilters = exports.parseFilters = function (str, bindings, fns) {
	  var res = ''
	  if (str[0] === '|') throw new Error('Interpolation can\'t starts with `|` [' + str + ']')
	  var arr = str.split(/\s*\|\s*/)
	  var name = arr[0]
	  res = 'model.' + name
	  parseStringBinding(name, bindings, fns)
	  for (var i = 1; i < arr.length; i++) {
	    var f = arr[i].trim()
	    if (f) {
	      var parts = f.match(/^([\w$_]+)(.*)$/)
	      var args
	      if (parts[2]) {
	        args = parseArgs(parts[2].trim())
	        res = 'filter.' + parts[1] + '(' + res + ', ' + args.join(', ') + ')'
	      } else {
	        res = 'filter.' + f + '(' + res + ')'
	      }
	    }
	  }
	  return res
	}
	
	/**
	 * Parse string binding into bindings or fns
	 * eg: 'first' => bindings.push('first')
	 *     'first.last' => bindings.push('first')
	 *     'name.first()' => bindings.push('name')
	 *     'first()' => fns.push('first')
	 *
	 * @param {String} str
	 * @api public
	 */
	var parseStringBinding = exports.parseStringBinding = function (str, bindings, fns) {
	  // if nested, only bind the root property
	  if (~str.indexOf('.')) str = str.replace(/\.[^\s]+$/,'')
	  if (funcRe.test(str)) {
	    fns.push(str.replace(funcRe, ''))
	  } else {
	    bindings.push(str)
	  }
	}
	
	/**
	 * Parse the filter function name from function string
	 * Used for check
	 *
	 * @param {Function} fn
	 * @return {Array}
	 * @api public
	 */
	var filterCallRe = /\bfilter\.([^\s(]+?)\b/g
	exports.parseFilterNames = function (fn) {
	  var res = []
	  var str = fn.toString()
	  var arr
	  while ((arr = filterCallRe.exec(str)) !== null) {
	    res.push(arr[1])
	  }
	  return unique(res)
	}
	
	/**
	 * Check if `str` has interpolation.
	 *
	 * @param {String} str
	 * @return {Boolean}
	 * @api private
	 */
	
	exports.hasInterpolation = function(str) {
	  return !!~str.indexOf('{')
	}
	
	/**
	 * Iterate element with process function and pass generated indexes
	 *
	 * @param {Element} el
	 * @param {Function} process
	 * @param {Array} indexes
	 * @api public
	 */
	var iterate = exports.iterate = function (el, process, indexes) {
	  var single = isSingle(el)
	  process(el, indexes)
	  if (single) return
	  for (var i = 0, l = el.childNodes.length; i < l; i++) {
	    var node = el.childNodes[i]
	    iterate(node, process, indexes.slice().concat([i]))
	  }
	}
	
	/**
	 * Find element with indexes array and root element
	 *
	 * @param {Element} root
	 * @param {Array} indexes
	 * @api public
	 */
	exports.findElement = function (root, indexes) {
	  var res = root
	  for (var i = 0; i < indexes.length; i++) {
	    var index = indexes[i]
	    res = res.childNodes[index]
	    if (!res) return
	  }
	  return res
	}
	
	/**
	 * Parse arguments from string eg:
	 * 'a' false 3 => ['a', false, 3]
	 *
	 * @param {String} str
	 * @return {Array}
	 * @api public
	 */
	var parseArgs = exports.parseArgs = function(str) {
	  var strings = []
	  var s = str.replace(/(['"]).+?\1/g, function (str) {
	    strings.push(str)
	    return '$'
	  })
	  var arr = s.split(/\s+/)
	  for (var i = 0, l = arr.length; i < l; i++) {
	    var v= arr[i]
	    if (v === '$') {
	      arr[i] = strings.shift()
	    }
	  }
	  return arr
	}
	
	/**
	 * Copy properties from `from` to `to` and return `to`
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api public
	 */
	exports.assign = function (to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*!
	 * array-unique <https://github.com/jonschlinkert/array-unique>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function unique(arr) {
	  if (!Array.isArray(arr)) {
	    throw new TypeError('array-unique expects an array.');
	  }
	
	  var len = arr.length;
	  var i = -1;
	
	  while (i++ < len) {
	    var j = i + 1;
	
	    for (; j < arr.length; ++j) {
	      if (arr[i] === arr[j]) {
	        arr.splice(j--, 1);
	      }
	    }
	  }
	  return arr;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var unique = __webpack_require__(18)
	var util = __webpack_require__(17)
	
	/**
	 * Create binding instance with reactive and el
	 *
	 * @param {Reactive} reactive
	 * @param {Element} el
	 * @param {Array} optional predefined bindings
	 * @api public
	 */
	function Binding(reactive, el, bindings) {
	  this._reactive = reactive
	  this.bindings = bindings || []
	  this.el = el
	}
	
	/**
	 * Add text interpolation binding
	 *
	 * @param {String} textContent el textContent
	 * @api public
	 */
	Binding.prototype.interpolation = function (textContent) {
	  if (textContent.trim() === '') return
	  if (!util.hasInterpolation(textContent)) return
	  var config = util.parseInterpolationConfig(textContent)
	  var props = config.bindings
	  var filters = this._reactive.filters
	  var fns = config.fns
	  if (fns.length) {
	    var arr = this.parseFunctionBindings(fns)
	    props = unique(props.concat(arr))
	  }
	  props = this.filterBindings(props)
	  var func = function (el) {
	    var model = this._reactive.model
	    var render = function () {
	      // much better performance than innerHTML
	      el.textContent = config.fn(model, filters)
	    }
	    this.bindReactive(props, render)
	    render()
	  }
	  this.bindings.push(func)
	}
	
	/**
	 * Get model bindings from function names
	 *
	 * @param {Array} fns function name
	 * @return {Array}
	 * @api private
	 */
	Binding.prototype.parseFunctionBindings = function (fns) {
	  var res = []
	  var model = this._reactive.model
	  fns.forEach(function (name) {
	    var fn = model[name]
	    if (!fn || typeof fn !== 'function') throw new Error('Can\'t find function [' + name + '] on model')
	    res = res.concat(util.parseBindings(fn))
	  })
	  return unique(res)
	}
	
	/**
	 * Add a binding by element attribute
	 *
	 * @param {String} attr attribute name
	 * @param {String} value attribute value
	 * @api public
	 */
	Binding.prototype.add = function (attr, value) {
	  // custom bindings first
	  var fn = this._reactive.bindings[attr]
	  // no binding should be ok
	  if (!fn) return
	  // custom bindings don't return function
	  var func = fn.call(this, value)
	  if (func) this.bindings.push(func)
	}
	
	/**
	 * Filter binding names with model
	 *
	 * @param {Array} props binding names
	 * @return {Array}
	 * @api public
	 */
	Binding.prototype.filterBindings = function (props) {
	  var model = this._reactive.model
	  return props.filter(function (name) {
	    return (name in model)
	  })
	}
	
	/**
	 * Bind all bindings to the element
	 *
	 * @param {Element} el
	 * @api public
	 */
	Binding.prototype.active = function (el) {
	  var self = this
	  if (this.bindings.length === 0) return
	  this.bindings.forEach(function (fn) {
	    fn.call(self, el)
	  })
	}
	
	/**
	 * Bind eventlistener to model attribute[s]
	 *
	 * @param {String|Array} props model attribute[s]
	 * @param {Function} fn listener
	 * @api private
	 */
	Binding.prototype.bindReactive = function (props, fn) {
	  var reactive = this._reactive
	  if (typeof props === 'string') {
	    reactive.sub(props, fn)
	  } else {
	    props.forEach(function (prop) {
	      reactive.sub(prop, fn)
	    })
	  }
	}
	
	/**
	 * Remove this binding
	 *
	 * @api public
	 */
	Binding.prototype.remove = function () {
	  this.bindings = null
	  delete this._reactive
	  delete this.el
	}
	
	/**
	 * Custom binding method: bind properties with function
	 * function is called with element and model
	 *
	 * @param {String|Array} bindings bind properties
	 * @param {Function} fn callback function
	 * @api public
	 */
	Binding.prototype.bind = function (bindings, fn) {
	  var func = function (el) {
	    var self = this
	    var model = this._reactive.model
	    var render = function () {
	      fn.call(self, model, el)
	    }
	    this.bindReactive(bindings, render)
	    render()
	  }
	  this.bindings.push(func)
	}
	
	
	module.exports = Binding


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(17)
	var event = __webpack_require__(11)
	
	/**
	 * Attributes supported.
	 */
	var attrs = [
	  'id',
	  'src',
	  'rel',
	  'cols',
	  'rows',
	  'name',
	  'href',
	  'title',
	  'class',
	  'style',
	  'width',
	  'value',
	  'height',
	  'tabindex',
	  'placeholder'
	]
	/*
	 * events supported
	 */
	var events = [
	  'change',
	  'touchstart',
	  'touchend',
	  'click',
	  'dblclick',
	  'mousedown',
	  'mouseup',
	  'mousemove',
	  'mouseenter',
	  'mouseleave',
	  'scroll',
	  'blur',
	  'focus',
	  'input',
	  'submit',
	  'keydown',
	  'keypress',
	  'keyup'
	]
	
	/**
	 * Create data-render binding with property value
	 *
	 * @param {String} value
	 * @api public
	 */
	exports['data-render'] = function (value) {
	  var fn = this._reactive.getDelegate(value)
	  var bindings = util.parseBindings(fn, true)
	  bindings = this.filterBindings(bindings)
	  return function (el) {
	    var model = this._reactive.model
	    var context = this._reactive.delegate
	    var render = function () {
	      fn.call(context, model, el)
	    }
	    this.bindReactive(bindings, render)
	    render()
	  }
	}
	
	/**
	 * Create attribute interpolation bindings
	 *
	 */
	attrs.forEach(function (attr) {
	  // attribute bindings
	  exports['data-' + attr] = function (value) {
	    var hasInterpolation = util.hasInterpolation(value)
	    var config = util.parseInterpolationConfig(value)
	    var bindings = config.bindings
	    bindings = this.filterBindings(bindings)
	    var func = config.fn
	    var filters = this._reactive.filters
	    return function (el) {
	      var model = this._reactive.model
	      var fn = function () {
	        if (!hasInterpolation) {
	          el.setAttribute(attr, value)
	        } else {
	          // no escape for attribute
	          var str = func(model, filters)
	          el.setAttribute(attr, str)
	        }
	      }
	      this.bindReactive(bindings, fn)
	      fn()
	    }
	  }
	})
	
	/**
	 * Create event bindings
	 *
	 */
	events.forEach(function (name) {
	  exports['on-' + name] = function (value) {
	    var fn = this._reactive.getDelegate(value)
	    return function (el) {
	      var model = this._reactive.model
	      var context = this._reactive.delegate
	      var handler = function (e) {
	        fn.call(context, e, model, el)
	      }
	      event.bind(el, name, handler)
	      this._reactive.events.push({
	        el: el,
	        name: name,
	        handler: handler
	      })
	    }
	  }
	})
	
	/**
	 * Create checked&selected binding
	 *
	 * @api public
	 */
	var arr = ['checked', 'selected']
	arr.forEach(function (name) {
	  exports['data-' + name] = function (val) {
	    return function (el) {
	      var attr = val || el.getAttribute('name')
	      var value = el.getAttribute('value')
	      var model = this._reactive.model
	      var fn = function () {
	        var v = model[attr]
	        // single checkbox
	        if (value == null) {
	          if (v) {
	            el.setAttribute(name, '')
	          } else {
	            el.removeAttribute(name)
	          }
	          return
	        }
	        if (v == null) return el.removeAttribute(name)
	        // checkbox
	        if (Array.isArray(v) && ~v.indexOf(value)) {
	          el.setAttribute(name, '')
	        // radio
	        } else if (v.toString() === value) {
	          el.setAttribute(name, '')
	        } else {
	          el.removeAttribute(name)
	        }
	      }
	      this.bindReactive(attr, fn)
	      fn()
	    }
	  }
	})
	
	exports['data-html'] = function (value) {
	  return function (el) {
	    var model = this._reactive.model
	    var fn = function () {
	      var v = model[value]
	      el.innerHTML = v == null ? '' : v
	    }
	    this.bindReactive(value, fn)
	    fn()
	  }
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Avoid of null and undefined in output
	 *
	 * @param {String} html
	 * @return {String}
	 * @api public
	 */
	exports.nonull = function (str) {
	  if (str == null) return ''
	  return String(str)
	}
	
	/**
	 * Stringify value.
	 *
	 * @param {Number} indent
	 */
	
	exports.json = function (value, indent) {
	  return typeof value === 'string'
	      ? value
	      : JSON.stringify(value, null, Number(indent) || 2)
	}
	
	/**
	 * 'abc' => 'Abc'
	 */
	
	exports.capitalize = function (value) {
	  if (!value && value !== 0) return ''
	  value = value.toString()
	  return value.charAt(0).toUpperCase() + value.slice(1)
	}
	
	/**
	 * 'abc' => 'ABC'
	 */
	
	exports.uppercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toUpperCase()
	    : ''
	}
	
	/**
	 * 'AbC' => 'abc'
	 */
	
	exports.lowercase = function (value) {
	  return (value || value === 0)
	    ? value.toString().toLowerCase()
	    : ''
	}
	
	/**
	 * 12345 => 12,345.00
	 *
	 * @param {Mixed} value
	 * @param {Number} precision
	 */
	
	var digitsRE = /(\d)(?=(?:\d{3})+$)/g
	exports.currency = function (value, precision) {
	  value = parseFloat(value)
	  if (!isFinite(value) || (!value && value !== 0)) return ''
	  precision = precision == null ? 2 : precision
	  value = Number(value)
	  value = value.toFixed(precision)
	  var parts = value.split('.'),
	  fnum = parts[0],
	  decimal = parts[1] ? '.' + parts[1] : ''
	
	  return fnum.replace(digitsRE, '$1,') + decimal
	}
	
	/**
	 * Reverse string
	 *
	 * @param {string} str
	 * @return {String}
	 * @api public
	 */
	exports.reverse = function (str) {
	  if (!str && str !== 0) return ''
	  return String(str).split(/\s*/).reverse().join('')
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(21);
	var clone = __webpack_require__(24);
	var type = __webpack_require__(25);
	var ease = __webpack_require__(26);
	
	/**
	 * Expose `Tween`.
	 */
	
	module.exports = Tween;
	
	/**
	 * Initialize a new `Tween` with `obj`.
	 *
	 * @param {Object|Array} obj
	 * @api public
	 */
	
	function Tween(obj) {
	  if (!(this instanceof Tween)) return new Tween(obj);
	  this._from = obj;
	  this.ease('linear');
	  this.duration(500);
	}
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(Tween.prototype);
	
	/**
	 * Reset the tween.
	 *
	 * @api public
	 */
	
	Tween.prototype.reset = function(){
	  this.isArray = 'array' === type(this._from);
	  this._curr = clone(this._from);
	  this._done = false;
	  this._start = Date.now();
	  return this;
	};
	
	/**
	 * Tween to `obj` and reset internal state.
	 *
	 *    tween.to({ x: 50, y: 100 })
	 *
	 * @param {Object|Array} obj
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.to = function(obj){
	  this.reset();
	  this._to = obj;
	  return this;
	};
	
	/**
	 * Set duration to `ms` [500].
	 *
	 * @param {Number} ms
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.duration = function(ms){
	  this._duration = ms;
	  return this;
	};
	
	/**
	 * Set easing function to `fn`.
	 *
	 *    tween.ease('in-out-sine')
	 *
	 * @param {String|Function} fn
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.ease = function(fn){
	  fn = 'function' == typeof fn ? fn : ease[fn];
	  if (!fn) throw new TypeError('invalid easing function');
	  this._ease = fn;
	  return this;
	};
	
	/**
	 * Stop the tween and immediately emit "stop" and "end".
	 *
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.stop = function(){
	  this.stopped = true;
	  this._done = true;
	  this.emit('stop');
	  this.emit('end');
	  return this;
	};
	
	/**
	 * Perform a step.
	 *
	 * @return {Tween} self
	 * @api private
	 */
	
	Tween.prototype.step = function(){
	  if (this._done) return;
	
	  // duration
	  var duration = this._duration;
	  var now = Date.now();
	  var delta = now - this._start;
	  var done = delta >= duration;
	
	  // complete
	  if (done) {
	    this._from = this._to;
	    this._update(this._to);
	    this._done = true;
	    this.emit('end');
	    return this;
	  }
	
	  // tween
	  var from = this._from;
	  var to = this._to;
	  var curr = this._curr;
	  var fn = this._ease;
	  var p = (now - this._start) / duration;
	  var n = fn(p);
	
	  // array
	  if (this.isArray) {
	    for (var i = 0; i < from.length; ++i) {
	      curr[i] = from[i] + (to[i] - from[i]) * n;
	    }
	
	    this._update(curr);
	    return this;
	  }
	
	  // objech
	  for (var k in from) {
	    curr[k] = from[k] + (to[k] - from[k]) * n;
	  }
	
	  this._update(curr);
	  return this;
	};
	
	/**
	 * Set update function to `fn` or
	 * when no argument is given this performs
	 * a "step".
	 *
	 * @param {Function} fn
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.update = function(fn){
	  if (0 == arguments.length) return this.step();
	  this._update = fn;
	  return this;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var type;
	try {
	  type = __webpack_require__(25);
	} catch (_) {
	  type = __webpack_require__(25);
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = clone;
	
	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */
	
	function clone(obj){
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;
	
	    case 'array':
	      var copy = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        copy[i] = clone(obj[i]);
	      }
	      return copy;
	
	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);
	
	    case 'date':
	      return new Date(obj.getTime());
	
	    default: // string, number, boolean, …
	      return obj;
	  }
	}


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	
	// easing functions from "Tween.js"
	
	exports.linear = function(n){
	  return n;
	};
	
	exports.inQuad = function(n){
	  return n * n;
	};
	
	exports.outQuad = function(n){
	  return n * (2 - n);
	};
	
	exports.inOutQuad = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return - 0.5 * (--n * (n - 2) - 1);
	};
	
	exports.inCube = function(n){
	  return n * n * n;
	};
	
	exports.outCube = function(n){
	  return --n * n * n + 1;
	};
	
	exports.inOutCube = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2 ) * n * n + 2);
	};
	
	exports.inQuart = function(n){
	  return n * n * n * n;
	};
	
	exports.outQuart = function(n){
	  return 1 - (--n * n * n * n);
	};
	
	exports.inOutQuart = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};
	
	exports.inQuint = function(n){
	  return n * n * n * n * n;
	}
	
	exports.outQuint = function(n){
	  return --n * n * n * n * n + 1;
	}
	
	exports.inOutQuint = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};
	
	exports.inSine = function(n){
	  return 1 - Math.cos(n * Math.PI / 2 );
	};
	
	exports.outSine = function(n){
	  return Math.sin(n * Math.PI / 2);
	};
	
	exports.inOutSine = function(n){
	  return .5 * (1 - Math.cos(Math.PI * n));
	};
	
	exports.inExpo = function(n){
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};
	
	exports.outExpo = function(n){
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};
	
	exports.inOutExpo = function(n){
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};
	
	exports.inCirc = function(n){
	  return 1 - Math.sqrt(1 - n * n);
	};
	
	exports.outCirc = function(n){
	  return Math.sqrt(1 - (--n * n));
	};
	
	exports.inOutCirc = function(n){
	  n *= 2
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};
	
	exports.inBack = function(n){
	  var s = 1.70158;
	  return n * n * (( s + 1 ) * n - s);
	};
	
	exports.outBack = function(n){
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};
	
	exports.inOutBack = function(n){
	  var s = 1.70158 * 1.525;
	  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
	  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
	};
	
	exports.inBounce = function(n){
	  return 1 - exports.outBounce(1 - n);
	};
	
	exports.outBounce = function(n){
	  if ( n < ( 1 / 2.75 ) ) {
	    return 7.5625 * n * n;
	  } else if ( n < ( 2 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
	  } else if ( n < ( 2.5 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
	  } else {
	    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
	  }
	};
	
	exports.inOutBounce = function(n){
	  if (n < .5) return exports.inBounce(n * 2) * .5;
	  return exports.outBounce(n * 2 - 1) * .5 + .5;
	};
	
	// aliases
	
	exports['in-quad'] = exports.inQuad;
	exports['out-quad'] = exports.outQuad;
	exports['in-out-quad'] = exports.inOutQuad;
	exports['in-cube'] = exports.inCube;
	exports['out-cube'] = exports.outCube;
	exports['in-out-cube'] = exports.inOutCube;
	exports['in-quart'] = exports.inQuart;
	exports['out-quart'] = exports.outQuart;
	exports['in-out-quart'] = exports.inOutQuart;
	exports['in-quint'] = exports.inQuint;
	exports['out-quint'] = exports.outQuint;
	exports['in-out-quint'] = exports.inOutQuint;
	exports['in-sine'] = exports.inSine;
	exports['out-sine'] = exports.outSine;
	exports['in-out-sine'] = exports.inOutSine;
	exports['in-expo'] = exports.inExpo;
	exports['out-expo'] = exports.outExpo;
	exports['in-out-expo'] = exports.inOutExpo;
	exports['in-circ'] = exports.inCirc;
	exports['out-circ'] = exports.outCirc;
	exports['in-out-circ'] = exports.inOutCirc;
	exports['in-back'] = exports.inBack;
	exports['out-back'] = exports.outBack;
	exports['in-out-back'] = exports.inOutBack;
	exports['in-bounce'] = exports.inBounce;
	exports['out-bounce'] = exports.outBounce;
	exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var index = __webpack_require__(28);
	
	/**
	 * Whitespace regexp.
	 */
	
	var re = /\s+/;
	
	/**
	 * toString reference.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */
	
	module.exports = function(el){
	  return new ClassList(el);
	};
	
	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */
	
	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}
	
	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }
	
	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */
	
	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};
	
	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }
	
	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */
	
	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};
	
	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Base 64 characters
	 */
	
	var BASE64 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
	
	/**
	 * Make a Uint8Array into a string
	 *
	 * @param {Uint8Array}
	 * @returns {String}
	 * @api private
	 */
	
	function tostr(bytes) {
	  var r, i;
	
	  r = [];
	  for (i = 0; i < bytes.length; i++) {
	    r.push(BASE64[bytes[i] % 64]);
	  }
	
	  return r.join('');
	}
	
	/**
	 * Generate an unique id
	 *
	 * @param {Number} The number of chars of the uid
	 * @api public
	 */
	
	function uid(length) {
	  if (typeof window != 'undefined') {
	    if (typeof window.crypto != 'undefined') {
	      return tostr(window.crypto.getRandomValues(new Uint8Array(length)));
	    } else {
	      var a = new Array(length);
	      for (var i = 0; i < length; i++) {
	        a[i] = Math.floor(Math.random() * 256);
	      }
	      return tostr(a);
	    }
	  } else {
	    var crypto = __webpack_require__(31); // avoid browserify polyfill
	    try {
	      return tostr(crypto.randomBytes(length));
	    } catch (e) {
	      // entropy sources are drained
	      return tostr(crypto.pseudoRandomBytes(length));
	    }
	  }
	}
	
	/**
	 * Exports
	 */
	
	module.exports = uid;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(36)
	
	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}
	
	exports.createHash = __webpack_require__(38)
	
	exports.createHmac = __webpack_require__(51)
	
	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}
	
	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}
	
	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}
	
	var p = __webpack_require__(52)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync
	
	
	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createCipher'
	, 'createCipheriv'
	, 'createDecipher'
	, 'createDecipheriv'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).Buffer))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	var base64 = __webpack_require__(33)
	var ieee754 = __webpack_require__(34)
	var isArray = __webpack_require__(35)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  this.length = 0
	  this.parent = undefined
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).Buffer, (function() { return this; }())))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 34 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * toString
	 */
	
	var str = Object.prototype.toString;
	
	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */
	
	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(37)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(32).Buffer))

/***/ },
/* 37 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(39)
	
	var md5 = toConstructor(__webpack_require__(48))
	var rmd160 = toConstructor(__webpack_require__(50))
	
	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}
	
	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).Buffer))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}
	
	var Buffer = __webpack_require__(32).Buffer
	var Hash   = __webpack_require__(40)(Buffer)
	
	exports.sha1 = __webpack_require__(41)(Buffer, Hash)
	exports.sha256 = __webpack_require__(46)(Buffer, Hash)
	exports.sha512 = __webpack_require__(47)(Buffer, Hash)


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {
	
	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }
	
	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }
	
	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }
	
	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block
	
	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)
	
	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }
	
	      s += ch
	      f += ch
	
	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s
	
	    return this
	  }
	
	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8
	
	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80
	
	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)
	
	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }
	
	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)
	
	    var hash = this._update(this._block) || this._hash()
	
	    return enc ? hash.toString(enc) : hash
	  }
	
	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }
	
	  return Hash
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */
	
	var inherits = __webpack_require__(42).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0
	
	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)
	
	  var POOL = []
	
	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()
	
	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)
	
	    this._h = null
	    this.init()
	  }
	
	  inherits(Sha1, Hash)
	
	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0
	
	    Hash.prototype.init.call(this)
	    return this
	  }
	
	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {
	
	    var a, b, c, d, e, _a, _b, _c, _d, _e
	
	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e
	
	    var w = this._w
	
	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)
	
	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )
	
	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }
	
	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }
	
	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }
	
	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }
	
	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }
	
	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }
	
	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }
	
	  return Sha1
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(44);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(45);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(43)))

/***/ },
/* 43 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 45 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */
	
	var inherits = __webpack_require__(42).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]
	
	  var W = new Array(64)
	
	  function Sha256() {
	    this.init()
	
	    this._w = W //new Array(64)
	
	    Hash.call(this, 16*4, 14*4)
	  }
	
	  inherits(Sha256, Hash)
	
	  Sha256.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }
	
	  function R (X, n) {
	    return (X >>> n);
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }
	
	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }
	
	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }
	
	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }
	
	  Sha256.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]
	
	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w
	
	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }
	
	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0
	
	  };
	
	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)
	
	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)
	
	    return H
	  }
	
	  return Sha256
	
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(42).inherits
	
	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]
	
	  var W = new Array(160)
	
	  function Sha512() {
	    this.init()
	    this._w = W
	
	    Hash.call(this, 128, 112)
	  }
	
	  inherits(Sha512, Hash)
	
	  Sha512.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  Sha512.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0
	
	    for (var i = 0; i < 80; i++) {
	      var j = i * 2
	
	      var Wi, Wil
	
	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)
	
	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)
	
	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)
	
	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]
	
	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]
	
	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)
	
	        W[j] = Wi
	        W[j + 1] = Wil
	      }
	
	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)
	
	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)
	
	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]
	
	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)
	
	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)
	
	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)
	
	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }
	
	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0
	
	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }
	
	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)
	
	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }
	
	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)
	
	    return H
	  }
	
	  return Sha512
	
	}


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */
	
	var helpers = __webpack_require__(49);
	
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;
	
	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;
	
	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;
	
	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
	
	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
	
	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
	
	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
	
	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	
	}
	
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}
	
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}
	
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}
	
	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;
	
	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }
	
	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}
	
	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}
	
	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}
	
	module.exports = { hash: hash };
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).Buffer))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160
	
	
	
	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];
	
	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];
	
	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};
	
	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};
	
	var processBlock = function (H, M, offset) {
	
	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];
	
	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }
	
	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;
	
	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;
	
	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};
	
	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}
	
	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}
	
	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}
	
	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}
	
	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}
	
	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}
	
	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
	
	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');
	
	  var m = bytesToWords(message);
	
	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;
	
	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );
	
	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }
	
	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];
	
	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }
	
	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).Buffer))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(38)
	
	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)
	
	module.exports = Hmac
	
	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg
	
	  var blocksize = (alg === 'sha512') ? 128 : 64
	
	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key
	
	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }
	
	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)
	
	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }
	
	  this._hash = createHash(alg).update(ipad)
	}
	
	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}
	
	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).Buffer))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(53)
	
	module.exports = function (crypto, exports) {
	  exports = exports || {}
	
	  var exported = pbkdf2Export(crypto)
	
	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync
	
	  return exports
	}


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }
	
	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')
	
	    setTimeout(function() {
	      var result
	
	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }
	
	      callback(undefined, result)
	    })
	  }
	
	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')
	
	    if (iterations < 0)
	      throw new TypeError('Bad iterations')
	
	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')
	
	    if (keylen < 0)
	      throw new TypeError('Bad key length')
	
	    digest = digest || 'sha1'
	
	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)
	
	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)
	
	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)
	
	      var U = crypto.createHmac(digest, password).update(block1).digest()
	
	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen
	
	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }
	
	      U.copy(T, 0, 0, hLen)
	
	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()
	
	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }
	
	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }
	
	    return DK
	  }
	
	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).Buffer))

/***/ },
/* 54 */
/***/ function(module, exports) {

	var doc = document.documentElement
	
	exports.getOutBack = function (dis, overlap) {
	  var b = (dis + overlap)/dis
	  return function (n) {
	    var m = 0.75
	    var a = b/(m * m)
	    if (n <= m) {
	      return -a *(n - m)*(n - m) + b
	    }
	    return b - (n - m)*(b - 1)/(1 - m)
	  }
	}
	
	/**
	 * Copy props from from to to
	 * return original props
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api public
	 */
	var copy = exports.copy = function (to, from) {
	  var orig = {}
	  Object.keys(from).forEach(function (k) {
	    orig[k] = to[k]
	    to[k] = from[k]
	  })
	  return orig
	}
	
	 
	/**
	 * Get relative element of el
	 *
	 * @param  {Element}  el
	 * @return {Element}
	 */
	exports.getRelativeElement = function (el) {
	  do {
	    el = el.parentNode
	    if (el === doc) return el
	    var p = getComputedStyle(el).position
	    if (p === 'absolute' || p === 'fixed' || p === 'relative') {
	      return el
	    }
	  } while(el)
	}
	
	/**
	 * Get absolute left top width height
	 *
	 * @param  {Element}  el
	 * @param {Element} pel
	 * @return {Object}
	 * @api public
	 */
	var getAbsolutePosition = exports.getAbsolutePosition = function (el, pel) {
	  var r = el.getBoundingClientRect()
	  var rect = pel.getBoundingClientRect()
	  return {
	    left: r.left - rect.left,
	    top: r.top -rect.top,
	    width: r.width || el.offsetWidth,
	    height: r.height || el.offsetHeight
	  }
	}
	
	/**
	 * Make an element absolute, return origin props
	 *
	 * @param  {Element}  el
	 * @param {Element} pel
	 * @return {Object}
	 */
	exports.makeAbsolute = function (el, pel) {
	  var pos = getAbsolutePosition(el, pel)
	  var orig = copy(el.style, {
	    height: pos.height + 'px',
	    width: pos.width + 'px',
	    left: pos.left + 'px',
	    top: pos.top + 'px',
	    position: 'absolute',
	    float: 'none'
	  })
	  return orig
	}
	
	/**
	 * Get touch Object
	 *
	 * @private
	 * @param  {Event}  e
	 */
	exports.getTouch = function (e) {
	  if (e.changedTouches && e.changedTouches.length > 0) {
	    return e.changedTouches[0]
	  }
	  return e
	}
	


/***/ },
/* 55 */
/***/ function(module, exports) {

	var endEvents = [
	  'touchend'
	]
	
	module.exports = Tap
	
	// default tap timeout in ms
	Tap.timeout = 200
	
	function Tap(callback, options) {
	  options = options || {}
	  // if the user holds his/her finger down for more than 200ms,
	  // then it's not really considered a tap.
	  // however, you can make this configurable.
	  var timeout = options.timeout || Tap.timeout
	
	  // to keep track of the original listener
	  listener.handler = callback
	
	  return listener
	
	  // el.addEventListener('touchstart', listener)
	  function listener(e1) {
	    // tap should only happen with a single finger
	    if (!e1.touches || e1.touches.length > 1) return
	
	    var el = e1.target
	    var context = this
	    var args = arguments;
	
	    var timeout_id = setTimeout(cleanup, timeout)
	
	    el.addEventListener('touchmove', cleanup)
	
	    endEvents.forEach(function (event) {
	      el.addEventListener(event, done)
	    })
	
	    function done(e2) {
	      // since touchstart is added on the same tick
	      // and because of bubbling,
	      // it'll execute this on the same touchstart.
	      // this filters out the same touchstart event.
	      if (e1 === e2) return
	      if (e2.clientX !== e1.clientX || e2.clientY !== e1.clientY) return
	
	      cleanup()
	
	      // already handled
	      if (e2.defaultPrevented) return
	
	      // overwrite these functions so that they all to both start and events.
	      var preventDefault = e1.preventDefault
	      var stopPropagation = e1.stopPropagation
	
	      e1.stopPropagation = function () {
	        stopPropagation.call(e1)
	        stopPropagation.call(e2)
	      }
	
	      e1.preventDefault = function () {
	        preventDefault.call(e1)
	        preventDefault.call(e2)
	      }
	
	      // calls the handler with the `end` event,
	      // but i don't think it matters.
	      callback.apply(context, args)
	    }
	
	    // cleanup end events
	    // to cancel the tap, just run this early
	    function cleanup(e2) {
	      // if it's the same event as the origin,
	      // then don't actually cleanup.
	      // hit issues with this - don't remember
	      if (e1 === e2) return
	
	      clearTimeout(timeout_id)
	
	      el.removeEventListener('touchmove', cleanup)
	
	      endEvents.forEach(function (event) {
	        el.removeEventListener(event, done)
	      })
	    }
	  }
	}


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * dependencies
	 */
	
	var emitter = __webpack_require__(21)
	var classes = __webpack_require__(27)
	var events = __webpack_require__(10)
	var closest = __webpack_require__(57)
	var event = __webpack_require__(11)
	var throttle = __webpack_require__(60)
	var transform = __webpack_require__(61)
	var util = __webpack_require__(62)
	var Animate = __webpack_require__(67)
	var transition = __webpack_require__(65)
	var transitionend = __webpack_require__(68)
	
	var hasTouch = 'ontouchend' in window
	
	/**
	 * export `Sortable`
	 */
	
	module.exports = Sortable
	
	/**
	 * Initialize `Sortable` with `el`.
	 *
	 * @param {Element} el
	 */
	
	function Sortable(el, opts){
	  if (!(this instanceof Sortable)) return new Sortable(el, opts)
	  if (!el) throw new TypeError('sortable(): expects an element')
	  opts = opts || {}
	  this.delta = opts.delta == null ? 10 : opts.delta
	  this.el = el
	  util.touchAction(el, 'none')
	  this.pel = util.getRelativeElement(el)
	  this.dragging = false
	
	  var h
	  this.on('start', function () {
	    h = el.style.height
	    var ch = el.getBoundingClientRect().height || el.clientHeight
	    el.style.height = ch + 'px'
	  })
	  this.on('end', function () {
	    el.style.height = h
	  })
	}
	
	/**
	 * Mixins.
	 */
	
	emitter(Sortable.prototype)
	
	/**
	 * Bind the draggable element selector
	 *
	 * @param {String} selector
	 * @api public
	 */
	Sortable.prototype.bind = function (selector){
	  this.selector = selector || ''
	  this.docEvents = events(document, this)
	  this.events = events(this.el, this)
	
	  this.events.bind('touchstart')
	  this.events.bind('touchmove')
	  this.events.bind('touchend')
	  this.events.bind('touchcancel', 'ontouchend')
	  this.docEvents.bind('touchend')
	
	  if (!hasTouch) {
	    this.events.bind('mousedown', 'ontouchstart')
	    this.events.bind('mousemove', 'ontouchmove')
	    this.docEvents.bind('mouseup', 'ontouchend')
	  }
	
	
	  // MS IE touch events
	  this.events.bind('PointerDown', 'ontouchstart')
	  this.events.bind('PointerMove', 'ontouchmove')
	  this.docEvents.bind('PointerUp', 'ontouchstart')
	  return this
	}
	
	/**
	 * Ignore items that t match the `selector`.
	 *
	 * @param {String} selector
	 * @return {Sortable}
	 * @api public
	 */
	Sortable.prototype.ignore = function(selector){
	  this.ignored = selector
	  return this
	}
	
	Sortable.prototype.horizon = function () {
	  this.dir = 'horizon'
	  return this
	}
	
	/**
	 * Set handle to `selector`.
	 *
	 * @param {String} selector
	 * @return {Sortable}
	 * @api public
	 */
	
	Sortable.prototype.handle = function(selector){
	  this._handle = selector
	  return this
	}
	
	Sortable.prototype.ontouchstart = function(e) {
	  // ignore
	  if (this.ignored && closest(e.target, this.ignored, this.el)) return
	  var node = this.findMatch(e)
	  // element to move
	  if (node) node = util.matchAsChild(node, this.el)
	  // not found
	  if (node == null) return
	  if (node === this.disabled) return
	  var touch = util.getTouch(e)
	  if (this._handle) e.preventDefault()
	  this.timer = setTimeout(function () {
	    this.dragEl = node
	    this.index = util.indexof(node)
	    this.children = util.getChildElements(this.el)
	    var pos = util.getAbsolutePosition(node, this.pel)
	    // place holder
	    var holder = this.holder = node.cloneNode(false)
	    holder.removeAttribute('id')
	    classes(holder).add('sortable-holder')
	    util.copy(holder.style, {
	      borderColor: 'rgba(255,255,255,0)',
	      backgroundColor: 'rgba(255,255,255,0)',
	      height: pos.height + 'px',
	      width: pos.width + 'px'
	    })
	    this.mouseStart = {
	      x: touch.clientX,
	      y: touch.clientY
	    }
	    classes(node).add('sortable-dragging')
	    this.orig = util.copy(node.style, {
	      height: pos.height + 'px',
	      width: pos.width + 'px',
	      left: pos.left + 'px',
	      top: pos.top + 'px',
	      zIndex: 99,
	      position: 'absolute'
	    })
	    this.el.insertBefore(holder, node)
	    this.dragging = true
	    this.animate = new Animate(this.pel, node, holder)
	    this.emit('start')
	  }.bind(this), 100)
	}
	
	Sortable.prototype.ontouchmove = function(e) {
	  if (this.dragEl == null || this.index == null) return
	  if (e.changedTouches && e.changedTouches.length !== 1) return
	  if (e.defaultPrevented) return
	  e.preventDefault()
	  e.stopPropagation()
	  var touch = util.getTouch(e)
	  var touchDir = 0
	  var sx = this.mouseStart.x
	  var sy = this.mouseStart.y
	  var d = this.dragEl
	  var dx = touch.clientX - (this.x || sx)
	  var dy = touch.clientY - (this.y || sy)
	  this.x = touch.clientX
	  this.y = touch.clientY
	  if (this.dir === 'horizon') {
	    this.tx = touch.clientX - sx
	    util.translate(d, this.tx, 0)
	    touchDir = dx > 0 ? 1 : 3
	    if (dx === 0) return
	  } else {
	    this.ty = touch.clientY - sy
	    util.translate(d, 0, this.ty)
	    touchDir = dy > 0 ? 0 : 2
	    if (dy === 0) return
	  }
	  if (util.getPosition(touch.clientX, touch.clientY, this.el)) {
	    this.positionHolder(touch, touchDir)
	  }
	  return false
	}
	
	Sortable.prototype.ontouchend = function() {
	  this.reset()
	}
	
	Sortable.prototype.remove =
	Sortable.prototype.unbind = function() {
	  this.events.unbind()
	  this.docEvents.unbind()
	  this.off()
	}
	
	Sortable.prototype.findMatch = function(e){
	  if (this._handle) return closest(e.target, this._handle, this.el)
	  if (this.selector) {
	    var el = closest(e.target, this.selector, this.el)
	    return el
	  }
	  return util.matchAsChild(e.target, this.el)
	}
	
	var positionHolder = function (e, touchDir) {
	  var d = this.dragEl
	  if (d == null) return
	  var delta = this.delta
	  var rect = d.getBoundingClientRect()
	  var x = rect.left + rect.width/2
	  var y = rect.top + rect.height/2
	  var horizon = this.dir === 'horizon'
	  var children = this.children
	  for (var i = children.length - 1; i >= 0; i--) {
	    var node = children[i]
	    if (node === d) continue
	    var pos = util.getPosition(x, y, node)
	    if (!pos) continue
	    if (horizon) {
	      if (touchDir === 1 && pos.dx > - delta) {
	        this.animate.animate(node, 3)
	      } else if (touchDir === 3 && pos.dx < delta){
	        this.animate.animate(node, 1)
	      }
	    } else {
	      if (touchDir === 2 && pos.dy <= delta) {
	        this.animate.animate(node, 0)
	      } else if (touchDir === 0 && pos.dy >= -delta){
	        this.animate.animate(node, 2)
	      }
	    }
	  }
	}
	
	Sortable.prototype.positionHolder = throttle(positionHolder)
	
	/**
	 * Reset sortable.
	 *
	 * @api private
	 * @return {Sortable}
	 * @api private
	 */
	
	Sortable.prototype.reset = function(){
	  if (this.timer) {
	    clearTimeout(this.timer)
	    this.timer = null
	  }
	  if (this.dragging === false) return
	  this.dragging = false
	  var p = this.el
	  var el = this.dragEl
	  var h = this.holder
	  if (!h) return
	  this.moveTo(h, function () {
	    el.style[transform] = ''
	    p.insertBefore(el, h)
	    p.removeChild(h)
	    util.copy(el.style, this.orig)
	    classes(el).remove('sortable-dragging')
	    if (util.indexof(el) !== this.index) {
	      this.emit('update', el)
	    }
	    delete this.index
	    this.children = this.animate = this.holder = this.dragEl = null
	    this.emit('end')
	  }.bind(this))
	}
	
	Sortable.prototype.moveTo = function (target, cb) {
	  var el = this.dragEl
	  this.disabled = el
	  var duration = 320
	  util.transitionDuration(el, duration, 'linear')
	  var tx = this.tx || 0
	  var ty = this.ty || 0
	  var dis = this.getDistance(el, target, this.animate.dir)
	  var x = tx + dis.x
	  var y = ty + dis.y
	  var nomove = (dis.x ===0 && dis.y === 0)
	  var self = this
	  var fn = function () {
	    el.style[transition] = ''
	    self.disabled = null
	    cb()
	  }
	  if (nomove) {
	    setTimeout(fn, duration)
	  } else {
	    var end = function () {
	      event.unbind(el, transitionend, end)
	      fn()
	    }
	    event.bind(el, transitionend, end)
	    util.translate(el, x, y)
	  }
	}
	
	Sortable.prototype.getDistance = function (from, to, dir) {
	  var x
	  var y
	  var r = from.getBoundingClientRect()
	  var tr = to.getBoundingClientRect()
	  var prop
	  if (dir%2 === 0) {
	    x = 0
	    prop = dir === 0 ? 'top' : 'bottom'
	    y = tr[prop] - r[prop]
	  } else {
	    y = 0
	    prop = dir === 1 ? 'left' : 'right'
	    x = tr[prop] - r[prop]
	  }
	  return {x: x, y: y}
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */
	
	var matches = __webpack_require__(58)
	
	/**
	 * Export `closest`
	 */
	
	module.exports = closest
	
	/**
	 * Closest
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Element} scope (optional)
	 */
	
	function closest (el, selector, scope) {
	  scope = scope || document.documentElement;
	
	  // walk up the dom
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }
	
	  // check scope for match
	  return matches(el, selector) ? el : null;
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var query = __webpack_require__(59);
	
	/**
	 * Element prototype.
	 */
	
	var proto = Element.prototype;
	
	/**
	 * Vendor function.
	 */
	
	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	/**
	 * Expose `match()`.
	 */
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 59 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}
	
	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};
	
	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};
	
	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies.
	 */
	
	var raf = __webpack_require__(29);
	
	/**
	 * Export `throttle`.
	 */
	
	module.exports = throttle;
	
	/**
	 * Executes a function at most once per animation frame. Kind of like
	 * throttle, but it throttles at ~60Hz.
	 *
	 * @param {Function} fn - the Function to throttle once per animation frame
	 * @return {Function}
	 * @public
	 */
	
	function throttle(fn) {
	  var rtn;
	  var ignoring = false;
	
	  return function queue() {
	    if (ignoring) return rtn;
	    ignoring = true;
	
	    raf(function() {
	      ignoring = false;
	    });
	
	    rtn = fn.apply(this, arguments);
	    return rtn;
	  };
	}


/***/ },
/* 61 */
/***/ function(module, exports) {

	
	var styles = [
	  'webkitTransform',
	  'MozTransform',
	  'msTransform',
	  'OTransform',
	  'transform'
	];
	
	var el = document.createElement('p');
	var style;
	
	for (var i = 0; i < styles.length; i++) {
	  style = styles[i];
	  if (null != el.style[style]) {
	    module.exports = style;
	    break;
	  }
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var styles = __webpack_require__(63)
	var transform = __webpack_require__(61)
	var has3d = __webpack_require__(64)
	var transition = __webpack_require__(65)
	var touchAction = __webpack_require__(66)
	
	/**
	 * Get the child of topEl by element within a child
	 *
	 * @param  {Element}  el
	 * @param {Element} topEl
	 * @return {Element}
	 * @api private
	 */
	exports.matchAsChild = function (el, topEl) {
	  if (el === topEl) return
	  do {
	    if (el.parentNode === topEl) return el
	    el = el.parentNode
	  } while(el)
	}
	
	/**
	 * Get position by clientX clientY in element
	 * 1 2 3 4 => tl tr bl br
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param  {Element}  el
	 * @return {Boolean}
	 * @api public
	 */
	exports.getPosition = function (x, y, el) {
	  var rect = el.getBoundingClientRect()
	  var w = rect.width || el.offsetWidth
	  var h = rect.height || el.offsetHeight
	  if (x > rect.left && x < rect.left + w && y > rect.top && y < rect.top + h) {
	    return {
	      dx: x - (rect.left + w/2),
	      dy: y - (rect.top + h/2)
	    }
	  }
	  return false
	}
	
	/**
	 * Get absolute left top width height
	 *
	 * @param  {Element}  el
	 * @param {Element} pel
	 * @return {Object}
	 * @api public
	 */
	var getAbsolutePosition = exports.getAbsolutePosition = function (el, pel) {
	  var r = el.getBoundingClientRect()
	  var rect = pel.getBoundingClientRect()
	  return {
	    left: r.left - rect.left,
	    top: r.top -rect.top,
	    width: r.width || el.offsetWidth,
	    height: r.height || el.offsetHeight
	  }
	}
	
	/**
	 * Make an element absolute, return origin props
	 *
	 * @param  {Element}  el
	 * @param {Element} pel
	 * @return {Object}
	 * @api public
	 */
	exports.makeAbsolute = function (el, pel) {
	  var pos = getAbsolutePosition(el, pel)
	  var orig = copy(el.style, {
	    height: pos.height + 'px',
	    width: pos.width + 'px',
	    left: pos.left + 'px',
	    top: pos.top + 'px',
	    position: 'absolute',
	    float: 'none'
	  })
	  return orig
	}
	
	var doc = document.documentElement
	/**
	 * Get relative element of el
	 *
	 * @param  {Element}  el
	 * @return {Element}
	 * @api public
	 */
	exports.getRelativeElement = function (el) {
	  while(el) {
	    if (el === doc) return el
	    var p = styles(el, 'position')
	    if (p === 'absolute' || p === 'fixed' || p === 'relative') {
	      return el
	    }
	    el = el.parentNode
	  }
	}
	
	/**
	 * Insert newNode after ref
	 *
	 * @param {Element} newNode
	 * @param {Element} ref
	 * @api public
	 */
	exports.insertAfter = function (newNode, ref) {
	  if (ref.nextSibling) {
	    ref.parentNode.insertBefore(newNode, ref.nextSibling)
	  } else {
	    ref.parentNode.appendChild(newNode)
	  }
	}
	
	/**
	 * Copy props from from to to
	 * return original props
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api public
	 */
	var copy = exports.copy = function (to, from) {
	  var orig = {}
	  Object.keys(from).forEach(function (k) {
	    orig[k] = to[k]
	    to[k] = from[k]
	  })
	  return orig
	}
	
	/**
	 * Get index of element as children
	 *
	 * @param  {Element}  el
	 * @return {Number}
	 * @api public
	 */
	exports.indexof = function (el) {
	  var children = el.parentNode.children
	  for (var i = children.length - 1; i >= 0; i--) {
	    var node = children[i];
	    if (node === el) {
	      return i
	    }
	  }
	}
	
	/**
	 * Translate el to `x` `y`.
	 *
	 * @api public
	 */
	exports.translate = function(el, x, y){
	  var s = el.style
	  x = x || 0
	  y = y || 0
	  if (has3d) {
	    s[transform] = 'translate3d(' + x + 'px,' + y + 'px, 0)'
	  } else {
	    s[transform] = 'translateX(' + x + 'px),translateY(' + y + 'px)'
	  }
	}
	
	/**
	 * Set transition duration to `ms`
	 *
	 * @param  {Element}  el
	 * @param {Number} ms
	 * @api public
	 */
	var prefix = transition.replace(/transition/i, '').toLowerCase()
	exports.transitionDuration = function(el, ms, ease){
	  var s = el.style;
	  ease = ease || 'ease-in-out'
	  if (!prefix) {
	    s[transition] = ms + 'ms transform ' + ease
	  } else {
	    s[transition] = ms + 'ms -' + prefix + '-transform ' + ease
	  }
	}
	
	/**
	 * Gets the appropriate "touch" object for the `e` event. The event may be from
	 * a "mouse", "touch", or "Pointer" event, so the normalization happens here.
	 *
	 * @api private
	 */
	exports.getTouch = function(e){
	  // "mouse" and "Pointer" events just use the event object itself
	  var touch = e;
	  if (e.changedTouches && e.changedTouches.length > 0) {
	    // W3C "touch" events use the `changedTouches` array
	    touch = e.changedTouches[0];
	  }
	  return touch;
	}
	
	/**
	 * Sets the "touchAction" CSS style property to `value`.
	 *
	 * @api private
	 */
	exports.touchAction = function(el, value){
	  var s = el.style;
	  if (touchAction) {
	    s[touchAction] = value;
	  }
	}
	
	exports.getChildElements = function (el) {
	  var nodes = el.childNodes
	  var arr = []
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var n = nodes[i]
	    if (n.nodeType === 1) {
	      arr.push(n)
	    }
	  }
	  return arr
	}


/***/ },
/* 63 */
/***/ function(module, exports) {

	// DEV: We don't use var but favor parameters since these play nicer with minification
	function computedStyle(el, prop, getComputedStyle, style) {
	  getComputedStyle = window.getComputedStyle;
	  style =
	      // If we have getComputedStyle
	      getComputedStyle ?
	        // Query it
	        // TODO: From CSS-Query notes, we might need (node, null) for FF
	        getComputedStyle(el) :
	
	      // Otherwise, we are in IE and use currentStyle
	        el.currentStyle;
	  if (style) {
	    return style
	    [
	      // Switch to camelCase for CSSOM
	      // DEV: Grabbed from jQuery
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
	      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
	      prop.replace(/-(\w)/gi, function (word, letter) {
	        return letter.toUpperCase();
	      })
	    ];
	  }
	}
	
	module.exports = computedStyle;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	
	var prop = __webpack_require__(61);
	
	// IE <=8 doesn't have `getComputedStyle`
	if (!prop || !window.getComputedStyle) {
	  module.exports = false;
	
	} else {
	  var map = {
	    webkitTransform: '-webkit-transform',
	    OTransform: '-o-transform',
	    msTransform: '-ms-transform',
	    MozTransform: '-moz-transform',
	    transform: 'transform'
	  };
	
	  // from: https://gist.github.com/lorenzopolidori/3794226
	  var el = document.createElement('div');
	  el.style[prop] = 'translate3d(1px,1px,1px)';
	  document.body.insertBefore(el, null);
	  var val = getComputedStyle(el).getPropertyValue(map[prop]);
	  document.body.removeChild(el);
	  module.exports = null != val && val.length && 'none' != val;
	}


/***/ },
/* 65 */
/***/ function(module, exports) {

	var styles = [
	  'transition',
	  'webkitTransition',
	  'MozTransition',
	  'OTransition',
	  'msTransition'
	]
	
	var el = document.createElement('p')
	var style
	
	for (var i = 0; i < styles.length; i++) {
	  if (null != el.style[styles[i]]) {
	    style = styles[i]
	    break
	  }
	}
	el = null
	
	module.exports = style


/***/ },
/* 66 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = touchActionProperty();
	
	/**
	 * Returns "touchAction", "msTouchAction", or null.
	 */
	
	function touchActionProperty(doc) {
	  if (!doc) doc = document;
	  var div = doc.createElement('div');
	  var prop = null;
	  if ('touchAction' in div.style) prop = 'touchAction';
	  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
	  div = null;
	  return prop;
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(62)
	var transform = __webpack_require__(61)
	var transition = __webpack_require__(65)
	var transitionend = __webpack_require__(68)
	var event = __webpack_require__(11)
	var uid = __webpack_require__(69)
	
	function Animate(pel, dragEl, holder) {
	  var d = this.dragEl = dragEl
	  var r = d.getBoundingClientRect()
	  this.holder = holder
	  this.dx = r.width || d.offsetWidth
	  this.dy = r.height || d.offsetHeight
	  this.pel = pel
	  this.animates = {}
	}
	
	/**
	 * Animate element with direction
	 * 0 1 2 3 is for down right up left
	 *
	 * @param  {Element}  el
	 * @param {Number} dir
	 * @api public
	 */
	Animate.prototype.animate = function (el, dir) {
	  if (!el.id) el.id = uid(7)
	  var o = this.animates[el.id] || {}
	  if (o.dir === dir) return
	  this.dir = dir
	  o.dir = dir
	  // var holder = this.holder
	  if (o.end) {
	    event.unbind(el, transitionend, o.end);
	    if (o.transform) {
	      o.transform = false
	      this.transit(el, 0, 0, dir)
	    } else {
	      o.transform = true
	      var props = this.getTransformProperty(dir)
	      this.transit(el, props.x, props.y, dir)
	    }
	  } else {
	    o.transform = true
	    util.transitionDuration(el, 280)
	    this.animates[el.id] = o
	    this.start(o, el, dir)
	  }
	}
	
	Animate.prototype.getTransformProperty = function (dir) {
	  var x
	  var y
	  if (dir%2 === 0) {
	    y = dir > 1 ? - this.dy : this.dy
	  } else {
	    x = dir > 1 ? - this.dx : this.dx
	  }
	  return {
	    x: x,
	    y: y
	  }
	}
	
	Animate.prototype.start = function (o, el, dir) {
	  var holder = this.holder
	  var r = holder.getBoundingClientRect()
	  var h = r.height || holder.offsetHeight
	  var w = r.width || holder.offsetWidth
	  var s = holder.style
	  var orig = o.orig = util.makeAbsolute(el, this.pel)
	  var isAbsolute = orig.position === 'absolute'
	  // bigger the holder
	  if (!isAbsolute) {
	    if (dir%2 === 0) {
	      s.height = (h + this.dy) + 'px'
	    } else {
	      s.width = (w + this.dx) + 'px'
	    }
	  }
	  var props = this.getTransformProperty(dir)
	  // test if transition begin
	  o.end = this.transit(el, props.x, props.y, dir)
	}
	
	Animate.prototype.transit = function (el, x, y, dir) {
	  var holder = this.holder
	  var s = holder.style
	  var p = el.parentNode
	  var self = this
	  var end = function () {
	    event.unbind(el, transitionend, end);
	    var o = self.animates[el.id]
	    if (!o) return
	    var orig = o.orig
	    self.animates[el.id] = null
	    // reset el
	    el.style[transition] = ''
	    el.style[transform] = ''
	    var removed = !holder.parentNode
	    if (!removed && o.transform && el.parentNode) {
	      if (dir > 1) {
	        util.insertAfter(holder, el)
	      } else {
	        el.parentNode.insertBefore(holder, el)
	      }
	    }
	    var isAbsolute = orig.position === 'absolute'
	    if (!isAbsolute) {
	      util.copy(el.style, orig)
	    }
	    if (removed) return
	    // reset holder
	    var rect = holder.getBoundingClientRect()
	    if (dir%2 === 0) {
	      var dy = isAbsolute ? 0 : self.dy
	      s.height = ((rect.height || holder.offsetHeight) - dy) + 'px'
	    } else {
	      var dx = isAbsolute ? 0 : self.dx
	      s.width = ((rect.width || holder.offsetWidth) - dx) + 'px'
	    }
	  }
	  event.bind(el, transitionend, end)
	  util.translate(el, x, y)
	  return end
	}
	
	module.exports = Animate


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Transition-end mapping
	 */
	
	var map = {
	  'WebkitTransition' : 'webkitTransitionEnd',
	  'MozTransition' : 'transitionend',
	  'OTransition' : 'oTransitionEnd',
	  'msTransition' : 'MSTransitionEnd',
	  'transition' : 'transitionend'
	};
	
	/**
	 * Expose `transitionend`
	 */
	
	var el = document.createElement('p');
	
	for (var transition in map) {
	  if (null != el.style[transition]) {
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Export `uid`
	 */
	
	module.exports = uid;
	
	/**
	 * Create a `uid`
	 *
	 * @param {String} len
	 * @return {String} uid
	 */
	
	function uid(len) {
	  len = len || 7;
	  return Math.random().toString(35).substr(2, len);
	}


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {__webpack_require__(72)
	var inherits = __webpack_require__(73)
	var events = __webpack_require__(10)
	var Iscroll = __webpack_require__(74)
	var Emitter = __webpack_require__(21)
	var ListRender = __webpack_require__(78)
	var More = __webpack_require__(83)
	var Ptr = __webpack_require__(87)
	var throttle = __webpack_require__(76)
	var event = __webpack_require__(11)
	var computedStyle = __webpack_require__(63)
	
	/**
	 * List constructor
	 *
	 * `option` optional option for [list-render](https://github.com/chemzqm/list-render)
	 * `option.selector` selector for parentNode of repeat template, default `ul`
	 * `option.delegate` delegate object for [reactive](https://github.com/chemzqm/reactive-lite)
	 * `option.bindings` bindings object for [reactive](https://github.com/chemzqm/reactive-lite)
	 * `option.filters` filters object for [reactive](https://github.com/chemzqm/reactive-lite)
	 * `option.model` model class used for generate model
	 * `option.empty` String or Element rendered in parentNode when internal data list is empty
	 * `option.limit` the limit number for render when `setData()` (default no limit)
	 * `option.moreCount` works with `option.limit` it limit count of items to render with `.more(n)` method when last item visible on scroll, default 10
	 * `option.autoHeight` set the height of parentNode even if data not rendered (need limit to work, items should have same height)
	 *
	 * @param {Element | String} template
	 * @param {Element} scrollable
	 * @param {Object} option
	 * @api public
	 */
	function List(template, scrollable, option) {
	  if (!(this instanceof List)) return new List(template, scrollable, option)
	  option = option || {}
	  var selector = option.selector || 'ul'
	  var parentNode = (scrollable === window)? document.querySelector(selector) : scrollable.querySelector(selector)
	  this.padding = {
	    top: parseInt(computedStyle(parentNode, 'paddingTop'), 10),
	    bottom: parseInt(computedStyle(parentNode, 'paddingBottom'), 10)
	  }
	  this.scrollable = scrollable
	  // super constructor
	  ListRender.call(this, template, parentNode, option)
	  this.handlers = {}
	  this.params = {perpage: option.perpage}
	  this.events = events(parentNode, this.handlers)
	  this._onscroll = this.onscroll.bind(this)
	  event.bind(scrollable, 'scroll', this._onscroll)
	  this.total = 0
	  if (this.autoHeight) {
	    this._setListHeight = this.setListHeight.bind(this)
	    // should bind to scrollable? may have performance influence
	    event.bind(window, 'resize', this._setListHeight)
	  }
	}
	
	inherits(List, ListRender)
	
	Emitter(List.prototype)
	
	/**
	 * Use iscroll for scrollable element
	 *
	 * @param {Object} opt
	 * @api public
	 */
	List.prototype.iscroll = function (opt) {
	  this._iscroll = Iscroll(this.scrollable, opt)
	}
	
	/**
	 * Handler of `scroll` event from scrollable
	 * Render more data when bottom close to scrollable bottom
	 *
	 * @api public
	 */
	List.prototype.onscroll = throttle(function () {
	  if (this.limit === Infinity) return
	  var last = this.parentNode.lastElementChild
	  if (!last) return
	  var b
	  do {
	    // hidden element has 0 bottom
	    b = last.getBoundingClientRect().bottom
	    if (b) break
	    last = last.previousElementSibling
	  } while(last)
	  var sb
	  if (this.scrollable === 'window') {
	    sb = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	  } else {
	    sb = this.scrollable.getBoundingClientRect().bottom
	  }
	  var h = Math.max(this.itemHeight || 0, 30)
	  if (b - sb < h) {
	    this.more(this.moreCount || 10)
	  }
	} ,100)
	
	/**
	 * User pullToRefresh for data prepend
	 *
	 * @param {Object} opt
	 * @param  {Function}  cb Callback function
	 * @api public
	 */
	List.prototype.pullToRefresh = function (opt, cb) {
	 if (typeof opt === 'function') {
	  cb = opt
	  opt = {}
	 }
	 var self = this
	 var callback = function () {
	  var params = assign({pullTimestamp: self.pullTimestamp}, self.params)
	  var p = cb(params)
	   return new Promise(function (resolve, reject) {
	      p.then(function (arr) {
	        if (Array.isArray(arr)) {
	          self.prependData(arr)
	        }
	        self.pullTimestamp = Date.now()
	        resolve()
	      }, reject)
	   })
	 }
	 this._ptr = Ptr(this.scrollable, opt,callback)
	}
	
	/**
	 * Use more to load more data
	 *
	 * @param  {Function}  cb
	 * @api public
	 */
	List.prototype.useMore = function (cb) {
	  var self = this
	  var callback = function () {
	    if (self._iscroll) self._iscroll.refresh()
	    var list = self.filtered || self.data
	    var params = assign({total: list.length}, self.params)
	    var p = cb(params)
	    return new Promise(function (resolve, reject) {
	      p.then(function (arr) {
	        if (Array.isArray(arr) && arr.length) {
	          self.appendData(arr)
	        } else {
	          // success without data
	          self._more.disable()
	          if (self._iscroll) self._iscroll.refresh()
	        }
	        resolve()
	      }, reject)
	    })
	  }
	  this._more = More(this.parentNode, callback, this.scrollable)
	}
	
	
	/**
	 * Override setData, add pullTimestamp
	 *
	 * @api public
	 */
	List.prototype.setData = function () {
	  if (!this.pullTimestamp) this.pullTimestamp = Date.now()
	  ListRender.prototype.setData.apply(this, arguments)
	}
	
	/**
	 * Do something on dom change
	 *
	 * @api private
	 */
	List.prototype.onchange = function () {
	  var self = this
	  if (this._local) {
	    var list = this.filtered || this.data
	    this.total = list.length
	  }
	  if (this.autoHeight) this.setListHeight()
	  this.emit('change')
	  if (this._iscroll) {
	    setImmediate(function () {
	      self._iscroll.refresh()
	    })
	  }
	}
	
	/**
	 * Adjust list height if there's more data
	 *
	 * @api private
	 */
	List.prototype.setListHeight = function () {
	  var m = this.maxMoreCount()
	  if (m === 0) {
	    this.parentNode.style.height = 'auto'
	    return
	  }
	  var res = this.calculateItem()
	  // something wrong
	  if (!res.itemHeight) return
	  var total = this.reactives.length + m
	  var h = this.padding.top + this.padding.bottom + Math.ceil(total/res.itemRowCount)*res.itemHeight
	  this.parentNode.style.height = h + 'px'
	}
	
	/**
	 * Set the total to `count`
	 * Used for remote mode only
	 *
	 * @param  {Number}  n
	 * @api public
	 */
	List.prototype.setTotal = function (count) {
	  if (this._local) throw new Error('setTotal expect to work at remote mode')
	  this.total = count
	}
	
	/**
	 * Delegate event `type` to `selector` with `handler`,
	 * handler is called with event and a reactive model with content of
	 * delegate target
	 *
	 * @param {String} type
	 * @param {String} selector
	 * @param {Function} handler
	 * @api public
	 */
	List.prototype.bind = function (type, selector, handler) {
	  var name = type + ' ' + selector
	  var args = [].slice.call(arguments, 3)
	  var self = this
	  this.handlers[name] = function (e) {
	    var el = e.delegateTarget
	    var model = self.findModel(el)
	    var a = [e, model].concat(args)
	    handler.apply(e.target, a)
	  }
	  this.events.bind(name, name)
	}
	
	/**
	 * Sort the data by field, direction or method, when it's remote mode(default mode), emit event only
	 *
	 * @param {String} field
	 * @param {Number|String} dir 1 or -1
	 * @param {Function} method
	 * @api public
	 */
	List.prototype.sort = function (field, dir, method) {
	  dir = parseInt(dir, 10)
	  if (this._local) {
	    this.sortData(field, dir, method)
	  } else {
	    this.params.sortField = field
	    this.params.sortDirection = dir
	    var params = assign({curpage: this.curpage}, this.params)
	    this.emit('sort', params)
	  }
	}
	
	/**
	 * Filter the data with field and value
	 *
	 * @param {String} field
	 * @param {String | Function} val
	 * @api public
	 */
	List.prototype.filter = function (field, val) {
	  this.scrollTo(0)
	  if (this._local) {
	    this.filterData(field, val)
	  } else {
	    var params = this.params
	    if (!field || val === '' || val == null) {
	      params.filterField = null
	      params.filterValue = null
	    } else {
	      params.filterField = field
	      params.filterValue = val
	    }
	    this.curpage = 0
	    params = assign({curpage: 0}, params)
	    this.emit('filter', params)
	  }
	}
	
	/**
	 * Select page `n`
	 *
	 * @param  {Element}  n
	 * @api public
	 */
	List.prototype.select = function (n) {
	  if (!this.perpage) throw new Error('select expect perpage option')
	  this.scrollTo(0)
	  if (this._local) {
	    ListRender.prototype.select.apply(this, arguments)
	  } else {
	    this.curpage = n
	    var params = this.params
	    params = assign({curpage: this.curpage}, params)
	    this.emit('page', params)
	  }
	}
	
	/**
	 * Make ptr refresh
	 *
	 * @api public
	 */
	List.prototype.refresh = function () {
	  if (this._ptr) this._ptr.refresh()
	}
	
	/**
	 * Works in local mode
	 *
	 * @api public
	 */
	List.prototype.local = function () {
	  this._local = true
	}
	
	/**
	 * Clean the list and unbind all event listeners
	 *
	 * @api public
	 */
	List.prototype.remove = function () {
	  if (this._removed) return
	  ListRender.prototype.remove.call(this)
	  if (this._iscroll) this._iscroll.unbind()
	  if (this._more) this._more.remove()
	  if (this._ptr) this._ptr.unbind()
	  this.emit('remove')
	  event.unbind(this.scrollable, 'scroll', this._onscroll)
	  event.unbind(window, 'resize', this._setListHeight)
	  this.events.unbind()
	  this.off()
	}
	
	/**
	 * Make scrollable scrollTo position Y
	 *
	 * @param {Number} y
	 * @api public
	 */
	List.prototype.scrollTo = function (y) {
	  if (this.scrollable === window) {
	    window.scrollTo(0, y)
	  } else {
	    this.scrollable.scrollTop = y
	  }
	}
	
	/**
	 * Calculate item height and item count per row
	 *
	 * @api private
	 */
	List.prototype.calculateItem = function () {
	  var children = this.parentNode.children
	  var res = {}
	  // can not calculate
	  if (children.length < 2)return res
	  var bottom
	  for (var i = 0, l = children.length; i < l; i++) {
	    var b = children[i].getBoundingClientRect().bottom
	    if (bottom && b !== bottom) {
	      this.itemHeight = res.itemHeight = Math.abs(b - bottom)
	      res.itemRowCount = i
	      break
	    }
	    bottom = b
	  }
	  return res
	}
	
	/**
	 * Assign props
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {undefined}
	 * @api public
	 */
	function assign(to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}
	
	module.exports = List
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71).setImmediate))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(43).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71).setImmediate, __webpack_require__(71).clearImmediate))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {
	if (typeof setImmediate !== 'function') {
	  // node is stupid and does some weird stuff with `this.`.
	  setImmediate = function setImmediate(fn) {
	    setTimeout(fn, 0)
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71).setImmediate))

/***/ },
/* 73 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(75)


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(2)
	var touchAction = detect.touchAction
	var transform = detect.transform
	var has3d = detect.has3d
	var computedStyle = __webpack_require__(63)
	var Emitter = __webpack_require__(21)
	var events = __webpack_require__(10)
	var Tween = __webpack_require__(23)
	var raf = __webpack_require__(29)
	var throttle = __webpack_require__(76)
	var Handlebar = __webpack_require__(77)
	var max = Math.max
	var min = Math.min
	var now = Date.now
	
	var defineProperty = Object.defineProperty
	
	/**
	 * Create custom event
	 *
	 * @param {String} name
	 * @return {Event}
	 * @api private
	 */
	function customEvent(name) {
	  var e
	  try {
	    e = new CustomEvent(name)
	  } catch(error) {
	    try {
	      e = document.createEvent('CustomEvent')
	      e.initCustomEvent(name, false, false, 0)
	    } catch(err) {
	      return
	    }
	  }
	  return e
	}
	
	/**
	 * Init iscroll with el and optional options
	 * options.handlebar show handlebar if is true
	 *
	 * @param  {Element}  el
	 * @param {Object} opts
	 * @api public
	 */
	function Iscroll(el, opts) {
	  if (! (this instanceof Iscroll)) return new Iscroll(el, opts)
	  this.y = 0
	  this.scrollable = el
	  el.style.overflow = 'hidden'
	  var children = el.children
	  if (children.length !== 1) {
	    throw new Error('iscroll need single element child of scrollable to work')
	  }
	  this.el = children[0]
	  this.touchAction('none')
	  this.refresh()
	  this.bind()
	  var self = this
	  if (defineProperty) {
	    defineProperty(this.scrollable, 'scrollTop', {
	      set: function (v) {
	        return self.scrollTo(-v, 200)
	      },
	      get: function () {
	        return - self.y
	      }
	    })
	  }
	  this.on('scroll', function () {
	    var e = customEvent('scroll')
	    if (e) el.dispatchEvent(e)
	  })
	  opts = opts || {}
	  if (opts.handlebar) {
	    this.handlebar = new Handlebar(el)
	  }
	  this._refresh = this.refresh.bind(this)
	  window.addEventListener('orientationchange', this._refresh, false)
	  window.addEventListener('resize', this._refresh, false)
	}
	
	Emitter(Iscroll.prototype)
	
	/**
	 * Bind events
	 *
	 * @api private
	 */
	Iscroll.prototype.bind = function () {
	  this.events = events(this.el, this)
	  this.docEvents = events(document, this)
	
	   // W3C touch events
	  this.events.bind('touchstart')
	  this.events.bind('touchmove')
	  this.docEvents.bind('touchend')
	  this.docEvents.bind('touchcancel', 'ontouchend')
	}
	
	/**
	 * Recalculate the height
	 *
	 * @api public
	 */
	Iscroll.prototype.refresh = function () {
	  this.viewHeight = this.scrollable.getBoundingClientRect().height
	  this.height = this.el.getBoundingClientRect().height
	}
	
	/**
	 * Unbind all event listeners, and remove handlebar if necessary
	 *
	 * @api public
	 */
	Iscroll.prototype.unbind = function () {
	  this.off()
	  this.events.unbind()
	  this.docEvents.unbind()
	  window.removeEventListener('orientationchange', this._refresh, false)
	  window.removeEventListener('resize', this._refresh, false)
	  if (this.handlebar) this.scrollable.removeChild(this.handlebar.el)
	}
	
	Iscroll.prototype.restrict = function (y) {
	  y = min(y , 80)
	  var h = Math.max(this.height, this.viewHeight)
	  y = max(y , this.viewHeight - h - 80)
	  return y
	}
	
	/**
	 * touchstart event handler
	 *
	 * @param  {Event}  e
	 * @api private
	 */
	Iscroll.prototype.ontouchstart = function (e) {
	  this.speed = null
	  this.leftright = null
	  if (this.tween) this.tween.stop()
	  this.dy = 0
	  this.ts = now()
	  if (this.handlebar) this.resizeHandlebar()
	
	  var touch = this.getTouch(e)
	  this.clientY = touch.clientY
	  this.down = {
	    x: touch.clientX,
	    y: touch.clientY,
	    start: this.y,
	    at: now()
	  }
	}
	
	/**
	 * touchmove event handler
	 *
	 * @param  {Event}  e
	 * @api private
	 */
	Iscroll.prototype.ontouchmove = function (e) {
	  e.preventDefault()
	  // do nothing if left right move
	  if (e.touches.length > 1 || !this.down || this.leftright) return
	  var touch = this.getTouch(e)
	  var down = this.down
	  var dy = this.dy = touch.clientY - down.y
	  var dx = touch.clientX - down.x
	  // can not determine
	  if (dx === 0 && dy === 0) return
	  // determine dy and the slope
	  if (null == this.leftright) {
	    // no move if contentHeight < viewHeight and move up
	    if (this.height <= this.viewHeight && dy < 0) return
	    var slope = dx / dy
	    // if is greater than 1 or -1, we're swiping up/down
	    if (slope > 1 || slope < -1) {
	      this.leftright = true
	      if (this.handlebar) this.hideHandlebar()
	      return
	    } else {
	      this.leftright = false
	    }
	  }
	
	  //calculate speed every 100 milisecond
	  this.calcuteSpeed(touch.clientY)
	  var start = this.down.start
	  var dest = this.restrict(start + dy)
	  this.translate(dest)
	}
	
	/**
	 * Calcute speed by clientY
	 *
	 * @param {Number} y
	 * @api priavte
	 */
	Iscroll.prototype.calcuteSpeed = function (y) {
	  var ts = now()
	  var dt = ts - this.ts
	  if (ts - this.down.at < 100) {
	    this.distance = y - this.clientY
	    this.speed = Math.abs(this.distance/dt)
	  } else if(dt > 100){
	    this.distance = y - this.clientY
	    this.speed = Math.abs(this.distance/dt)
	    this.ts = ts
	    this.clientY = y
	  }
	}
	
	/**
	 * Event handler for touchend
	 *
	 * @param  {Event}  e
	 * @api private
	 */
	Iscroll.prototype.ontouchend = function (e) {
	  if (!this.down || this.leftright) return
	  if (this.height <= this.viewHeight && this.dy < 0) {
	    if(this.handlebar) this.handlebar.hide()
	    return
	  }
	  var touch = this.getTouch(e)
	  this.calcuteSpeed(touch.clientY)
	  var m = this.momentum()
	  this.scrollTo(m.dest, m.duration, m.ease)
	  this.emit('release', this.y)
	  this.down = null
	}
	
	/**
	 * Calculate the animate props for moveon
	 *
	 * @return {Object}
	 * @api private
	 */
	Iscroll.prototype.momentum = function () {
	  var deceleration = 0.0004
	  var speed = this.speed
	  speed = min(speed, 0.8)
	  var destination = this.y + ( speed * speed ) / ( 2 * deceleration ) * ( this.distance < 0 ? -1 : 1 )
	  var duration = speed / deceleration
	  var newY, ease
	  if (destination > 0) {
	    newY = 0
	    ease = 'out-back'
	  } else if (destination < this.viewHeight - this.height) {
	    newY = this.viewHeight - this.height
	    ease = 'out-back'
	  }
	  if (typeof newY === 'number') {
	    duration = duration*(newY - this.y + 160)/(destination - this.y)
	    destination = newY
	  }
	  if (this.y > 0 || this.y < this.viewHeight - this.height) {
	    duration = 500
	    ease = 'out-circ'
	  }
	  return {
	    dest: destination,
	    duration: duration,
	    ease: ease
	  }
	}
	
	
	/**
	 * Scroll to potions y with optional duration and ease function
	 *
	 * @param {Number} y
	 * @param {Number} duration
	 * @param {String} easing
	 * @api public
	 */
	Iscroll.prototype.scrollTo = function (y, duration, easing) {
	  if (this.tween) this.tween.stop()
	  var intransition = (duration > 0 && y !== this.y)
	  if (!intransition) {
	    this.onScrollEnd()
	    return this.translate(y)
	  }
	
	  easing = easing || 'out-cube'
	  var tween = this.tween = Tween({y : this.y})
	      .ease(easing)
	      .to({y: y})
	      .duration(duration)
	
	  var self = this
	  tween.update(function(o) {
	    self.translate(o.y)
	  })
	
	  tween.on('end', function () {
	    animate = function(){} // eslint-disable-line
	    if (!tween.stopped) {
	      self.onScrollEnd()
	    }
	  })
	
	  function animate() {
	    raf(animate)
	    tween.update()
	  }
	
	  animate()
	}
	
	/**
	 * Scrollend
	 *
	 * @api private
	 */
	Iscroll.prototype.onScrollEnd = function () {
	  this.hideHandlebar()
	  var top = this.y === 0
	  var bottom = this.y === (this.viewHeight - this.height)
	  this.emit('scrollend', {
	    top: top,
	    bottom: bottom
	  })
	}
	
	/**
	 * Gets the appropriate "touch" object for the `e` event. The event may be from
	 * a "mouse", "touch", or "Pointer" event, so the normalization happens here.
	 *
	 * @api private
	 */
	
	Iscroll.prototype.getTouch = function(e){
	  // "mouse" and "Pointer" events just use the event object itself
	  var touch = e
	  if (e.changedTouches && e.changedTouches.length > 0) {
	    // W3C "touch" events use the `changedTouches` array
	    touch = e.changedTouches[0]
	  }
	  return touch
	}
	
	
	/**
	 * Translate to `x`.
	 *
	 *
	 * @api private
	 */
	
	Iscroll.prototype.translate = function(y) {
	  var s = this.el.style
	  if (isNaN(y)) return
	  y = Math.floor(y)
	  //reach the end
	  if (this.y !== y) {
	    this.y = y
	    this.emit('scroll', - y)
	    if (this.handlebar) this.transformHandlebar()
	  }
	  if (has3d) {
	    s[transform] = 'translate3d(0, ' + y + 'px' + ', 0)'
	  } else {
	    s[transform] = 'translateY(' + y + 'px)'
	  }
	}
	
	/**
	 * Sets the "touchAction" CSS style property to `value`.
	 *
	 * @api private
	 */
	
	Iscroll.prototype.touchAction = function(value){
	  var s = this.el.style
	  if (touchAction) {
	    s[touchAction] = value
	  }
	}
	
	/**
	 * Transform handlebar
	 *
	 * @api private
	 */
	Iscroll.prototype.transformHandlebar = throttle(function(){
	  var vh = this.viewHeight
	  var h = this.height
	  var bh = vh - vh * vh/h
	  var ih = h - vh
	  var y = parseInt(- bh * this.y/ih)
	  this.handlebar.translateY(y)
	}, 100)
	
	/**
	 * show the handlebar and size it
	 * @api public
	 */
	Iscroll.prototype.resizeHandlebar = function(){
	  var h = this.viewHeight * this.viewHeight/this.height
	  this.handlebar.resize(h)
	}
	
	/**
	 * Hide handlebar
	 *
	 * @api private
	 */
	Iscroll.prototype.hideHandlebar = function () {
	  if (this.handlebar) this.handlebar.hide()
	}
	
	module.exports = Iscroll


/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = throttle;
	
	/**
	 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
	 *
	 * @param {Function} func Function to wrap.
	 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
	 * @return {Function} A new function that wraps the `func` function passed in.
	 */
	
	function throttle (func, wait) {
	  var ctx, args, rtn, timeoutID; // caching
	  var last = 0;
	
	  return function throttled () {
	    ctx = this;
	    args = arguments;
	    var delta = new Date() - last;
	    if (!timeoutID)
	      if (delta >= wait) call();
	      else timeoutID = setTimeout(call, wait - delta);
	    return rtn;
	  };
	
	  function call () {
	    timeoutID = 0;
	    last = +new Date();
	    rtn = func.apply(ctx, args);
	    ctx = null;
	    args = null;
	  }
	}


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var detect = __webpack_require__(2)
	var has3d = detect.has3d
	var transform = detect.transform
	
	/**
	 * Handlebar contructor
	 *
	 * @param {Element} scrollable
	 * @contructor
	 * @api public
	 */
	function handlebar(scrollable) {
	  var el = this.el = document.createElement('div')
	  el.className = 'iscroll-handlebar'
	  scrollable.appendChild(el)
	}
	
	/**
	 * Show the handlebar and resize it
	 *
	 * @param {Number} h
	 * @api public
	 */
	handlebar.prototype.resize = function (h) {
	  var s = this.el.style
	  s.height = h + 'px'
	  s.backgroundColor = 'rgba(0,0,0,0.3)'
	}
	
	/**
	 * Hide this handlebar
	 *
	 * @api public
	 */
	handlebar.prototype.hide = function () {
	  this.el.style.backgroundColor = 'transparent'
	}
	
	/**
	 * Move handlebar by translateY
	 *
	 * @param {Number} y
	 * @api public
	 */
	handlebar.prototype.translateY= function(y){
	  var s = this.el.style
	  if (has3d) {
	    s[transform] = 'translate3d(0, ' + y + 'px' + ', 0)'
	  } else {
	    s[transform] = 'translateY(' + y + 'px)'
	  }
	}
	
	module.exports = handlebar


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var Model = __webpack_require__(79)
	var Reactive = __webpack_require__(16)
	var domify = __webpack_require__(9)
	var uid = __webpack_require__(82)
	var body = document.body
	
	/**
	 * Cteate ListRender
	 *
	 * `template` repeat element or (template string) for rendering
	 * `parentNode` element for list element to append to
	 * `option` optional config obj
	 * `option.delegate` delegate object for [reactive]
	 * `option.bindings` bindings object for [reactive]
	 * `option.filters` filters object for [reactive]
	 * `option.model` model class used for generate model
	 * `option.limit` the limit number for render when `setData()` (default Infinity)
	 * `option.perpage` the limit number for paging, should >= limit
	 * `option.empty` String or Element rendered in parentNode when internal data list is empty
	 *
	 * @param  {Element}  template
	 * @param {Element} parentNode
	 * @param {Object} option
	 * @api public
	 */
	function ListRender(template, parentNode, option) {
	  if (!(this instanceof ListRender)) return new ListRender(template, parentNode, option)
	  if (typeof template === 'string') template = domify(template)
	  option = option || {}
	  var empty = option.empty
	  if (empty) {
	    this.emptyEl = typeof empty === 'string' ? domify(empty) : empty
	    delete option.empty
	  }
	  this.curpage = 0
	  this.curr = 0
	  this.parentNode = parentNode
	  this.template = template
	  this.reactives = []
	  this.data = []
	  assign(this, option)
	  this.limit = this.limit || Infinity
	}
	
	/**
	 * Set internal data array, and render them limit by `option.limit`
	 *
	 * @param {Array} array
	 * @api public
	 */
	ListRender.prototype.setData = function (array) {
	  this.data = array.slice()
	  this.renderRange(0, this.limit)
	}
	
	/**
	  Render more internal data, return `false` if no data to render
	 *
	 * @param {Number} max
	 * @return {Boolean}
	 * @api public
	 */
	ListRender.prototype.more = function (max) {
	  if (this.limit === Infinity) return false
	  var d = this.maxMoreCount()
	  if (d === 0) return false //no more items could render
	  var list = this.filtered || this.data
	  var from = this.curr
	  var to = from + Math.min(max, d)
	  var arr = list.slice(from ,to)
	  var fragment = this.createFragment(arr)
	  this.parentNode.appendChild(fragment)
	  this.curr = to
	  this.onchange()
	  return true
	}
	
	/**
	 * The max count of items can be rendered by more
	 *
	 * @return {number}
	 * @api public
	 */
	ListRender.prototype.maxMoreCount = function () {
	  // filter
	  var list = this.filtered || this.data
	  var l = list.length
	  var perpage = this.perpage
	  // no more data
	  if (this.curr >= l) return 0
	  var still = l - this.curr
	  // paging
	  if (perpage) {
	    var c = this.reactives.length
	    // page is full
	    if (c >= perpage) return 0
	    return Math.min(perpage - c, still)
	  }
	  return still
	}
	/**
	 * Append more data and render them, no refresh
	 *
	 * @param {Array} array
	 * @api public
	 */
	ListRender.prototype.appendData = function (array) {
	  this.data = this.data.concat(array)
	  var fragment = this.createFragment(array)
	  this.parentNode.appendChild(fragment)
	  this.curr = this.curr + array.length
	  this.onchange()
	}
	/**
	 * Prepend more data and render them, no refresh
	 *
	 * @param {Array} array
	 * @api public
	 */
	ListRender.prototype.prependData = function (array) {
	  this.data = array.concat(this.data)
	  var fragment = this.createFragment(array)
	  prepend(this.parentNode, fragment)
	  this.curr = this.curr + array.length
	  this.onchange()
	}
	
	/**
	 * Empty the exist list, and render the specific range of
	 * internal data array (end not included, no option.limit restrict)
	 *
	 * @param {Number} start
	 * @param {Number}  [end]
	 * @api public
	 */
	ListRender.prototype.renderRange = function (start, end) {
	  this.clean()
	  var list = this.filtered || this.data
	  this.curr= end = Math.min(list.length, end)
	  var arr = list.slice(start, end)
	  if (arr.length === 0) {
	    this.empty(true)
	    this.onchange()
	    return
	  }
	  this.empty(false)
	  var fragment = this.createFragment(arr)
	  this.parentNode.appendChild(fragment)
	  this.onchange()
	}
	/**
	 * Filter the internal data with `field` and `val` (or function used for array.filter), and render them limit by `option.limit`
	 * When val or field is falsy, render all with limit by `option.limit`
	 *
	 * @param {String} field
	 * @param {String|Function} val
	 * @return {Number}
	 * @api public
	 */
	ListRender.prototype.filterData = function (field, val) {
	  var fn
	  if (typeof field === 'function') {
	    fn = field
	  } else if (typeof val ==='function') {
	    fn = val
	  } else if (!field || val === '' || typeof val === 'undefined') {
	    fn = function () {return true}
	  } else if (typeof val === 'string') {
	    val = val.replace('\\','\\\\').replace(/\s+/,'').split(/\s*/g).join('.*')
	    var re = new RegExp(val, 'i')
	    fn = function (o) {
	      return re.test(String(o[field]))
	    }
	  } else {
	    fn = function (o) {
	      return String(o[field]) == String(val)
	    }
	  }
	  var arr = this.filtered = this.data.filter(fn)
	  var l = arr.length
	  if (l === this.data.length) this.filtered = null
	  if (this.perpage) {
	    this.select(0)
	  } else {
	    this.renderRange(0, this.limit)
	  }
	  return l
	}
	
	/**
	 * Sort the data with `field` `direction` ( 1 or -1 for ascend and descend)
	 * and optional method (`string` or `number`, or a sort function for javascript array),
	 * render them limit by `option.limit`
	 *
	 * @param {String} field
	 * @param {Number} dir
	 * @param {String|Function} method
	 * @return {undefined}
	 * @api public
	 */
	ListRender.prototype.sortData = function (field, dir, method) {
	  var data = this.filtered || this.data
	  dir = parseInt(dir, 10)
	  if (!dir) throw new Error('direction should only be 1 or -1')
	  data.sort(function (obj, other) {
	    if (typeof method === 'function') {
	      return method(obj, other) * dir
	    }
	    var a = obj[field]
	    var b = other[field]
	    switch (method) {
	      case 'number':
	        a = Number(a)
	        b = Number(b)
	        break
	      case 'string':
	        a = a.trim()
	        b = b.trim()
	        break
	    }
	    return (a < b ? 1 : -1) * dir
	  })
	  if (this.perpage) {
	    this.select(this.curpage)
	  } else {
	    this.renderRange(0, this.limit)
	  }
	}
	
	/**
	 * Find a specific model instance related by element, useful for event delegate
	 *
	 * @param  {Element}  el
	 * @return {reactive}
	 * @api public
	 */
	ListRender.prototype.findModel = function (el) {
	  do {
	    if (el.parentNode === this.parentNode) break
	    if (el === body) return null
	    el = el.parentNode
	  } while (el.parentNode);
	  for (var i = this.reactives.length - 1; i >= 0; i--) {
	    var r = this.reactives[i];
	    if (r.el === el) return r.model;
	  }
	  return null
	}
	
	ListRender.prototype.remove = function () {
	  if (this._removed) return
	  this._removed = true
	  this.clean()
	  delete this.reactives
	  delete this.data
	  delete this.filtered
	}
	
	/**
	 * Show or hide the empty element
	 *
	 * @param {Boolean} show
	 * @api private
	 */
	ListRender.prototype.empty = function (show) {
	  var el = this.emptyEl
	  if (!el) return
	  if (show) {
	    this.parentNode.appendChild(el)
	  } else if (el.parentNode) {
	    this.parentNode.removeChild(el)
	  }
	}
	
	/**
	 * Clean all list items
	 *
	 * @api private
	 */
	ListRender.prototype.clean = function () {
	  // reactive remove would trigger array splice
	  this.reactives.slice().forEach(function (reactive) {
	    reactive.remove()
	  })
	}
	
	/**
	 * Create reactive config and model class by plain obj
	 *
	 * @param  {Object} obj
	 * @return {undefined}
	 * @api public
	 */
	ListRender.prototype.createReactiveConfig = function (obj) {
	  var model
	  if (this.model) {
	    model = this.model(obj)
	  } else {
	    var clz = this.model = createModelClass(Object.keys(obj))
	    model = clz(obj)
	  }
	  this.primaryKey = obj.hasOwnProperty('id') ? 'id' :
	                    obj.hasOwnProperty('_id') ? '_id': null
	  var opt = {
	    delegate: this.delegate,
	    bindings: this.bindings,
	    filters: this.filters
	  }
	  return Reactive.generateConfig(this.template, model, opt)
	}
	
	/**
	 * Append remove to model
	 *
	 * @param {Object} model
	 * @api private
	 */
	ListRender.prototype.appendRemove = function (model, reactive) {
	  var orig = model.remove
	  var id = reactive.id
	  var self = this
	  var fn = function (res) {
	    if (res === false) return
	    self.removeDataById(id)
	    self.curr = Math.max(0, self.curr - 1)
	    reactive.remove()
	    self.onchange(true)
	  }
	  if (orig && typeof orig !== 'function') throw new TypeError('remove is not a function on model')
	  if (!orig) {
	    model.remove = fn
	  } else {
	    model.remove = function () {
	      var res = orig.apply(this, arguments)
	      if (res && typeof res.then === 'function') {
	        res.then(fn, function () {})
	      } else {
	        fn()
	      }
	    }
	  }
	}
	
	/**
	 * Create reactive instance from object
	 *
	 * @param  {Object}  obj
	 * @return {Reactive}
	 * @api private
	 */
	ListRender.prototype.createReactive = function (obj) {
	  var el = this.template.cloneNode(true)
	  var model = this.model(obj)
	  var id
	  if (this.primaryKey == null) {
	    this.primaryKey = '_id'
	    id = obj[this.primaryKey] = uid(10)
	  } else {
	    id = obj[this.primaryKey]
	  }
	  var opt = {
	    delegate: this.delegate,
	    bindings: this.bindings,
	    filters: this.filters,
	    config: this.config
	  }
	  var reactive = Reactive(el, model, opt)
	  reactive.id = id
	  this.appendRemove(model, reactive)
	  var list = this.reactives
	  list.push(reactive)
	  // remove from list
	  reactive.on('remove', function () {
	    var i = list.indexOf(reactive)
	    list.splice(i, 1)
	  })
	  return reactive
	}
	
	/**
	 * Remove data inside internal list by id
	 *
	 * @param {String|Number} id
	 * @return {undefined}
	 * @api private
	 */
	ListRender.prototype.removeDataById = function (id) {
	  var pk = this.primaryKey
	  removeItem(this.data, pk, id)
	  if (this.filtered) {
	    removeItem(this.filtered, pk, id)
	  }
	}
	
	function removeItem(arr, key, val) {
	  for (var i = arr.length - 1; i >= 0; i--) {
	    var v = arr[i]
	    if (v && v[key] === val) {
	      arr.splice(i, 1)
	      return
	    }
	  }
	}
	/**
	 * Get fragment from array of object
	 *
	 * @param  {Array}  arr
	 * @api private
	 */
	ListRender.prototype.createFragment = function (arr) {
	  var obj = arr[0]
	  if (typeof this.config === 'undefined' && obj) this.config = this.createReactiveConfig(obj)
	  var fragment = document.createDocumentFragment()
	  arr.forEach(function (obj) {
	    var reactive = this.createReactive(obj)
	    fragment.appendChild(reactive.el)
	  }, this)
	  return fragment
	}
	
	/**
	 * Select page by page number,
	 * rerender even if page number not change, eg: filter
	 *
	 * @param  {Number}  n
	 * @api public
	 */
	ListRender.prototype.select = function (n) {
	  if (!this.perpage) throw new Error('perpage required in option')
	  var s = n*this.perpage
	  var e = (n + 1)*this.perpage
	  e = Math.min(e, s + this.limit)
	  this.curpage = n
	  this.renderRange(s, e)
	}
	
	/**
	 * Show previous page
	 *
	 * @api public
	 */
	ListRender.prototype.prev = function () {
	  this.select(Math.max(0, this.curpage - 1))
	}
	
	/**
	 * Show next page
	 *
	 * @api public
	 */
	ListRender.prototype.next = function () {
	  var list = this.filtered || this.data
	  var max = Math.ceil(list.length/this.perpage) -1
	  this.select(Math.min(max, this.curpage + 1))
	}
	
	/**
	 * Interface for extra action after dom changed
	 *
	 * @api private
	 */
	ListRender.prototype.onchange = function (isRemove) { // eslint-disable-line
	}
	
	/**
	 * Prepend parentNode with newNode
	 *
	 * @param {Element} parentNode
	 * @param {Element} newNode
	 * @api private
	 */
	function prepend(parentNode, newNode) {
	  var node = parentNode.firstChild;
	  if (node) {
	    parentNode.insertBefore(newNode, node)
	  } else {
	    parentNode.appendChild(newNode)
	  }
	}
	
	/**
	 * Assign properties
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api private
	 */
	function assign(to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}
	
	/**
	 * Create model class by keys
	 *
	 * @param {Array} keys
	 * @return {Function}
	 */
	function createModelClass(keys) {
	  var name = uid(5)
	  var clz = Model(name)
	  keys.forEach(function (k) {
	    clz.attr(k)
	  })
	  return clz
	}
	
	module.exports = ListRender


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var proto = __webpack_require__(80)
	var util = __webpack_require__(81)
	var buildinRe = /^(\$stat|changed|emit|clean|on|off|attrs)$/
	
	/**
	 * Expose `createModel`.
	 */
	
	module.exports = createModel
	
	/**
	 * Create a new model constructor with the given `name`.
	 *
	 * @param {String} name
	 * @return {Function}
	 * @api public
	 */
	
	function createModel(name) {
	  if ('string' != typeof name) throw new TypeError('model name required')
	
	  /**
	   * Initialize a new model with the given `attrs`.
	   *
	   * @param {Object} attrs
	   * @api public
	   */
	
	  function model(attrs) {
	    if (!(this instanceof model)) return new model(attrs)
	    attrs = attrs || {}
	    this._callbacks = {}
	    this.origAttrs = Object.create(attrs)
	    this.attrs = util.assign({}, attrs)
	  }
	
	  // statics
	
	  model.modelName = name
	  model.options = {}
	
	  // prototype
	
	  model.prototype = {}
	  model.prototype.model = model;
	
	  /**
	   * Define instance method
	   *
	   * @param {String} name
	   * @param {Function} fn
	   * @return {Function} self
	   * @api public
	   */
	  model.method = function (name, fn) {
	    this.prototype[name] = fn
	    return this
	  }
	
	  /**
	   * Use function as plugin
	   *
	   * @param {Function} fn
	   * @return {Function} self
	   * @api public
	   */
	  model.use = function (fn) {
	    fn(this)
	    return this
	  }
	
	  /**
	  * Define attr with the given `name` and `options`.
	  *
	  * @param {String} name
	  * @param {Object} optional options
	  * @return {Function} self
	  * @api public
	  */
	
	  model.attr = function(name, options){
	    options = options || {}
	    this.options[name] = options
	
	    if ('id' === name || '_id' === name) {
	      this.options[name].primaryKey = true
	      this.primaryKey = name
	    }
	
	    if (buildinRe.test(name)) throw new Error(name + ' could not be used as field name')
	
	    Object.defineProperty(this.prototype, name, {
	      set: function (val) {
	        var prev = this.attrs[name]
	        var diff = util.diffObject(this.attrs, this.origAttrs)
	        var changedNum = Object.keys(diff).length
	        this.attrs[name] = val
	        this.emit('change', name, val, prev)
	        this.emit('change ' + name, val, prev)
	        if (prev === val) return
	        // make sure when multiple properties changed, only emit once
	        if (changedNum === 0) return this.emit('change $stat', true)
	        if (changedNum === 1 && diff[name] === val) {
	          // became clean
	          this.emit('change $stat', false)
	        }
	      },
	      get: function () {
	        return this.attrs[name]
	      }
	    })
	
	    return this
	  }
	
	  var key
	  for (key in proto) model.prototype[key] = proto[key]
	
	  return model
	}
	


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(21)
	var util = __webpack_require__(81)
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(exports)
	
	
	/**
	 * Return `false` or an object
	 * containing the "dirty" attributes.
	 *
	 * Optionally check for a specific `attr`.
	 *
	 * @param {String} [attr]
	 * @return {Object|Boolean}
	 * @api public
	 */
	
	exports.changed = function(attr){
	  var changed = util.diffObject(this.origAttrs, this.attrs)
	  if (typeof changed[attr] !== 'undefined') {
	    return changed[attr]
	  }
	  if (Object.keys(changed).length === 0) return false
	  return changed
	}
	
	/**
	 * Set current attrs as original attrs
	 *
	 * @api public
	 */
	exports.clean = function(){
	  for (var k in this.attrs) {
	    this.origAttrs[k] = this.attrs[k]
	  }
	  this.emit('change $stat', false)
	}
	
	
	/**
	 * Set multiple `attrs`.
	 *
	 * @param {Object} attrs
	 * @return {Object} self
	 * @api public
	 */
	
	exports.set = function(attrs){
	  for (var key in attrs) {
	    this[key] = attrs[key]
	  }
	  return this
	}
	
	
	/**
	 * Return the JSON representation of the model.
	 *
	 * @return {Object}
	 * @api public
	 */
	
	exports.toJSON = function(){
	  return this.attrs
	}
	
	/**
	 * Check if `attr` is present (not `null` or `undefined`).
	 *
	 * @param {String} attr
	 * @return {Boolean}
	 * @api public
	 */
	
	exports.has = function(attr){
	  return null != this.attrs[attr]
	}


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * Simple diff without nested check
	 * Return the changed props from b
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @api public
	 */
	exports.diffObject = function (a, b) {
	  var res = {}
	  for (var k in a) {
	    if (a[k] !== b[k]) {
	      res[k] = b[k]
	    }
	  }
	  return res
	}
	
	/**
	 * Assign props from `from` to `to` return to
	 *
	 * @param {Object} to
	 * @param {Object} from
	 * @return {Object}
	 * @api public
	 */
	exports.assign = function (to, from) {
	  Object.keys(from).forEach(function (k) {
	    to[k] = from[k]
	  })
	  return to
	}
	


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Export `uid`
	 */
	
	module.exports = uid;
	
	/**
	 * Create a `uid`
	 *
	 * @param {String} len
	 * @return {String} uid
	 */
	
	function uid(len) {
	  len = len || 7;
	  return Math.random().toString(35).substr(2, len);
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var domify = __webpack_require__(9)
	var debounce = __webpack_require__(84)
	var template = __webpack_require__(86)
	var events = __webpack_require__(11)
	
	/**
	 * Init more with element(for insertAfter), callback ,and scrollable
	 *
	 * @param  {Element}  el
	 * @param  {Function}  fn
	 * @param {Element} scrollable
	 * @api public
	 */
	function More(el, fn, scrollable) {
	  if (!(this instanceof More)) return new More(el, fn, scrollable)
	  this.el = el
	  this.callback = fn
	  this.div = domify(template)
	  insertAfter(this.el, this.div)
	  this.scrollable = scrollable = scrollable || el.parentNode
	  this._onscroll = debounce(this.onscroll.bind(this), 100)
	  events.bind(scrollable, 'scroll', this._onscroll)
	}
	
	/**
	 * On scroll event handler
	 *
	 * @api private
	 */
	More.prototype.onscroll = function (e) {
	  if (this.loading || this._disabled) return
	  if (!check(this.scrollable) && e !== true) return
	  this.div.style.display = 'block'
	  // var h = computedStyle(this.el, 'height')
	  this.loading = true
	  var self = this
	  var cb = function () {
	    self.loading = false
	    self.div.style.display = 'none'
	  }
	  var res = this.callback(cb)
	  if (res && typeof res.then === 'function') {
	    res.then(cb, cb)
	  }
	}
	
	/**
	 * Disable loading more data
	 *
	 * @return {undefined}
	 * @api public
	 */
	More.prototype.disable = function () {
	  this._disabled = true
	  this.div.style.display = 'none'
	  this.loading = false
	}
	
	/**
	 * Force more to start loading
	 *
	 * @return {undefined}
	 * @api public
	 */
	More.prototype.load = function () {
	  this.onscroll(true)
	}
	/**
	 * Set the loading text
	 *
	 * @param {String} text
	 * @api public
	 */
	More.prototype.text = function (text) {
	  this.div.querySelector('.more-text').innerHTML = text
	}
	
	/**
	 * Remove the appended element and unbind event
	 *
	 * @return {undefined}
	 * @api public
	 */
	More.prototype.remove = function () {
	  events.unbind(this.scrollable, 'scroll', this._onscroll)
	  this.div.parentNode.removeChild(this.div)
	}
	
	/**
	 * check if scrollable scroll to end
	 */
	function check(scrollable) {
	  if (scrollable === window) {
	    // viewport height
	    var supportPageOffset = window.pageXOffset !== undefined
	    var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
	    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	    var scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
	    if (getDocHeight() - vh == scrollY) return true
	  } else if (scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight < 1) {
	    return true
	  }
	  return false
	}
	
	function insertAfter(referenceNode, newNode) {
	  var next = referenceNode.nextSibling
	  if (next) {
	    referenceNode.parentNode.insertBefore(newNode, next)
	  } else {
	    referenceNode.parentNode.appendChild(newNode)
	  }
	}
	
	function getDocHeight() {
	    var D = document;
	    return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight);
	}
	
	module.exports = More


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var now = __webpack_require__(85);
	
	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */
	
	module.exports = function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;
	
	  function later() {
	    var last = now() - timestamp;
	
	    if (last < wait && last > 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };
	
	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }
	
	    return result;
	  };
	};


/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = Date.now || now
	
	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = "<div class=\"more-loading\">\n  <i class=\"more-refresh more-spin\"></i> <span class=\"more-text\">加载中...</span>\n</div>\n";

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var classes = __webpack_require__(27)
	var domify = __webpack_require__(9)
	var once = __webpack_require__(88)
	var template = __webpack_require__(90)
	
	var LOADING_TEXT = '加载中...'
	var PULL_TEXT = '下拉刷新'
	var RELEASE_TEXT = '释放更新'
	
	function prepend(parentNode, node) {
	  if (parentNode.firstChild) {
	    parentNode.insertBefore(node, parentNode.firstChild)
	  } else {
	    parentNode.appendChild(node)
	  }
	}
	
	/**
	 * `el` the scrollable element
	 * `callback` is called when loading start, the first argument which is a callback function should be called after the dom prepend to the list.
	 * `option` object could contain `PULL_TEXT` `RELEASE_TEXT` `LOADING_TEXT` and `timeout` for the request timeout in millisecond.
	 * `option.template` contains a custom template(string or element) for the inserted element
	 * `option.timeout` millisecond of request timeout, default `10000`
	 *
	 * @param  {Element}  el
	 * @param  {Object} opt
	 * @param  {Function}  fn
	 * @api public
	 */
	module.exports = function PTR(el, opt, fn) {
	  if (!(this instanceof PTR)) return new PTR(el, opt, fn)
	  if (typeof opt === 'function') {
	    fn = opt
	    opt = {}
	  }
	  this.el = el
	  this.LOADING_TEXT = opt.LOADING_TEXT || LOADING_TEXT
	  this.PULL_TEXT = opt.PULL_TEXT || PULL_TEXT
	  this.RELEASE_TEXT = opt.RELEASE_TEXT || RELEASE_TEXT
	  this.timeout = opt.timeout || 10000
	  var start
	  var loading
	  var box
	  var tel = opt.template
	  // custom template
	  if (typeof tel === 'string') {
	    box = domify(template)
	  } else if (tel && tel.nodeType) {
	    box = opt.template
	  } else {
	    box = domify(template)
	  }
	  var first = el.firstElementChild
	  if (first) {
	    prepend(first, box)
	  } else {
	    prepend(el, box)
	  }
	  var imgEl = box.querySelector('.ptr_image')
	  var textEl = box.querySelector('.ptr_text')
	  var self = this
	  function onscroll() {
	    if (loading) return
	    var top = el.scrollTop
	    if (top < 0 && top >= - 40) {
	      textEl.textContent = self.PULL_TEXT
	    }
	    if (top < -40) {
	      classes(imgEl).add('ptr_rotate')
	      textEl.textContent = self.RELEASE_TEXT
	      start = true
	    } else {
	      classes(imgEl).remove('ptr_rotate')
	      start = false
	    }
	  }
	  el.addEventListener('scroll', onscroll, false)
	
	  function callback() {
	    el.scrollTop = 0
	    loading = false
	    textEl.textContent = self.PULL_TEXT
	    imgEl.className = 'ptr_image'
	  }
	
	  /**
	   * Refresh for more data
	   *
	   * @param  {Event}  event
	   * @api public
	   */
	  var refresh = this.refresh = function (e) {
	      if (e) e.stopImmediatePropagation()
	      el.scrollTop = -40
	      imgEl.className += ' ptr_loading'
	      textEl.textContent = self.LOADING_TEXT
	      loading = true
	      var timeout = setTimeout(callback, self.timeout)
	      var cb = once(function () {
	        clearTimeout(timeout)
	        callback()
	      })
	      var res = fn(cb)
	      if (res && typeof res.then === 'function') {
	        res.then(cb, cb)
	      }
	  }
	
	  var end = function (e) {
	    if (start) {
	      refresh(e)
	    }
	    start = false
	  }
	  document.addEventListener('touchend', end)
	
	  /**
	   * Unbind event listener and remove inserted element
	   *
	   * @return {undefined}
	   * @api public
	   */
	  this.unbind = function () {
	    el.removeEventListener('scroll', onscroll)
	    document.removeEventListener('touchend', end)
	  }
	}


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(89)
	module.exports = wrappy(once)
	
	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})
	
	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}


/***/ },
/* 89 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)
	
	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')
	
	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })
	
	  return wrapper
	
	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ptr_box\">\n  <div class=\"ptr_container\">\n    <div class=\"ptr_image\"></div>\n    <div class=\"ptr_text\">下拉刷新</div>\n  </div>\n</div>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map