'use strict';

// JStuff

function JStuff(query)
{
	this.nodes = null; 

	if (typeof query === 'string' || query instanceof String) {
		this.nodes = document.querySelectorAll(query);
	} else {
		this.nodes = [ query ];
	}

	this.all = function(func, arg) {
		var i, result;
		for (i = 0; i < this.nodes.length; i++) {
			result = func(this.nodes[i], arg);
		}
		return result;
	};

	this.attribute = function(name, value) {
		return this.all(function(node, attr) {
			if (attr.v)
				node.setAttribute(attr.k, attr.v);
			return node.getAttribute(attr.k);
		}, {k: name, v: value});
	};

	this.onClick = function(handler) {
		this.all(function(n, f) {n.addEventListener('click', f, false)}, handler);
		return this;
	};

	this.onSubmit = function(handler) {
		this.all(function(n, f) {n.addEventListener('submit', f, false)}, handler);
		return this;
	};

	this.addClass = function(className) {
		this.all(function(node, cn) {
			if (node.classList)
				node.classList.add(className);
		}, className);
		return this;
	}

	this.removeClass = function(className) {
		this.all(function(node, cn) {
			if (node.classList)
				node.classList.remove(className);
		}, className);
		return this;
	}

	this.replaceClass = function(oldClass, newClass) {
		this.all(function(node, obj) {
			if (node.classList) {
				node.classList.remove(obj.ocl);
				node.classList.add(obj.ncl);
			}
		}, {ocl: oldClass, ncl: newClass});
		return this;
	}

	this.switchClass = function(className) {
		this.all(function(node, obj) {
			if (node.classList) {
				node.classList.toggle(className);
			}
		}, className);
		return this;
	}

	this.hasClass = function(className) {
		return this.all(function(node, cn) {
			if (node.classList) {
				return node.classList.contains(cn);
			} else {
				return (node.className.indexOf(cn) != -1);
			}
		}, className);
	}

	this.value = function(value) {
		return this.all(function(node, val) {
			if (node.value) {
				if (typeof (val) !== 'undefined')
					node.value = val;
				return node.value;
			}
			return null;
		}, value);
	}
}

window.$ = function(q){return new JStuff(q)};

window.$.main = function(func) {
	if (window.addEventListener) {
		addEventListener("load", func, false);
	} else if (window.attachEvent) {
		attachEvent("onload", func);
	} else {
		onload = func;
	}
}

$.create = function(tagName, childNode) {
	var n = document.createElement(tagName);
	if (childNode)
		n.appendChild(childNode);
	return new JStuff(n);
}

$.createLabel = function(text) {
	return new JStuff(document.createTextNode(text));
}

// AJAX

function JStuffAjax(attr) {
	var GET = 'GET',
	    POST = 'POST',
	    t = this,
	    query = '',
	    method,
	    r;

	try {
		method = (attr.method == POST) ? POST : GET;
	} catch(e) {
		method = GET;
	}

	this.onReadyStateChange = function() {
		if (this.request.readyState == 4) {
			if (this.request.status === 200) {
				if (typeof (this.attr.handler) !== 'undefined') {
					this.attr.handler(this.request.status, this.request.responseText);
				}
			}
			return true;
		}
		return false
	}

	try {
		r = new XMLHttpRequest();
	} catch(e) {
		var iev=[
		  "MSXML2.XmlHttp.5.0",
		  "MSXML2.XmlHttp.4.0",
		  "MSXML2.XmlHttp.3.0",
		  "MSXML2.XmlHttp.2.0",
		  "Microsoft.XmlHttp"
		];

		for(var i = 0; i < iev.length; i++) {
			try {
				r = new ActiveXObject(iev[i]);
				break;
			} catch(e){
				// do nothing
			}
		}
	}

	if (typeof (attr.data) !== 'undefined') {
		for (var key in attr.data) {
			if (query != '')
				query += '&';
			query += encodeURIComponent(key)+'='+encodeURIComponent(attr.data[key]);
		}

		if (method == GET) {
			attr.url += '?'+query;
			query = null;
		}
	}

	if (typeof (attr.sync) === 'undefined') {
		attr.sync = true;
	}

	r.overrideMimeType("text/plain");
	r.open(method, attr.url, attr.sync);
	r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	r.onreadystatechange = function() {t.onReadyStateChange()};

	r.send(query);

	this.request = r;
	this.attr = attr;
}

$.ajax = function(attr) {return new JStuffAjax(attr)};

$.log = function(msg, ex) {
	if (console.log) {
		if (ex) {
			msg += ' E('+ex.message+')';
		}
		console.log(msg);
	}
};


// SVG fix

/*! code below is based on svg4everybody v2.1.9
 * github.com/jonathantneal/svg4everybody */

var LEGACY_SUPPORT = false;

function embed(parent, svg, target) {
	// if the target exists
	if (target) {
		// create a document fragment to hold the contents of the target
		var fragment = document.createDocumentFragment();

		// cache the closest matching viewBox
		var viewBox = !svg.hasAttribute('viewBox') && target.getAttribute('viewBox');

		// conditionally set the viewBox on the svg
		if (viewBox) {
			svg.setAttribute('viewBox', viewBox);
		}

		// clone the target
		var clone = target.cloneNode(true);

		// copy the contents of the clone into the fragment
		while (clone.childNodes.length) {
			fragment.appendChild(clone.firstChild);
		}

		// append the fragment into the svg
		parent.appendChild(fragment);
	}
}

function loadreadystatechange(xhr) {
	// listen to changes in the request
	xhr.onreadystatechange = function () {
		// if the request is ready
		if (xhr.readyState === 4) {
			// get the cached html document
			var cachedDocument = xhr._cachedDocument;

			// ensure the cached html document based on the xhr response
			if (!cachedDocument) {
				cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument('');

				cachedDocument.body.innerHTML = xhr.responseText;

				// ensure domains are the same, otherwise we'll have issues appending the
				// element in IE 11
				// cachedDocument.domain = document.domain;

				xhr._cachedTarget = {};
			}

			// clear the xhr embeds list and embed each item
			xhr._embeds.splice(0).map(function (item) {
				// get the cached target
				var target = xhr._cachedTarget[item.id];

				// ensure the cached target
				if (!target) {
					target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id);
				}

				// embed the target into the svg
				embed(item.parent, item.svg, target);
			});
		}
	};

	// test the ready state change immediately
	xhr.onreadystatechange();
}

function svg4everybody(rawopts) {
	var opts = Object(rawopts);

	// create legacy support variables
	var nosvg;
	var fallback;

	// if running with legacy support
	if (LEGACY_SUPPORT) {
		// configure the fallback method
		fallback = opts.fallback || function (src) {
			return src.replace(/\?[^#]+/, '').replace('#', '.').replace(/^\./, '') + '.png' + (/\?[^#]+/.exec(src) || [''])[0];
		};

		// set whether to shiv <svg> and <use> elements and use image fallbacks
		nosvg = 'nosvg' in opts ? opts.nosvg : /\bMSIE [1-8]\b/.test(navigator.userAgent);

		// conditionally shiv <svg> and <use>
		if (nosvg) {
			document.createElement('svg');
			document.createElement('use');
		}
	}

	// set whether the polyfill will be activated or not
	var polyfill;
	var olderIEUA = /\bMSIE [1-8]\.0\b/;
	var newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
	var webkitUA = /\bAppleWebKit\/(\d+)\b/;
	var olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
	var edgeUA = /\bEdge\/.(\d+)\b/;
	//Checks whether iframed
	var inIframe = window.top !== window.self;

	if ('polyfill' in opts) {
		polyfill = opts.polyfill;
	} else if (LEGACY_SUPPORT) {
		polyfill = olderIEUA.test(navigator.userAgent) || newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
	} else {
		polyfill = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
	}

	// create xhr requests object
	var requests = {};

	// use request animation frame or a timeout to search the dom for svgs
	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	// get a live collection of use elements on the page
	var uses = document.getElementsByTagName('use');
	var numberOfSvgUseElementsToBypass = 0;

	function oninterval() {
		// get the cached <use> index
		var index = 0;

		// while the index exists in the live <use> collection
		while (index < uses.length) {
			// get the current <use>
			var use = uses[index];

			// get the current <svg>
			var parent = use.parentNode;
			var svg = getSVGAncestor(parent);
			var src = use.getAttribute('xlink:href') || use.getAttribute('href');

			if (!src && opts.attributeName) {
				src = use.getAttribute(opts.attributeName);
			}

			if (svg && src) {

				// if running with legacy support
				if (LEGACY_SUPPORT && nosvg) {
					// create a new fallback image
					var img = document.createElement('img');

					// force display in older IE
					img.style.cssText = 'display:inline-block;height:100%;width:100%';

					// set the fallback size using the svg size
					img.setAttribute('width', svg.getAttribute('width') || svg.clientWidth);
					img.setAttribute('height', svg.getAttribute('height') || svg.clientHeight);

					// set the fallback src
					img.src = fallback(src, svg, use);

					// replace the <use> with the fallback image
					parent.replaceChild(img, use);
				} else if (polyfill) {
					if (!opts.validate || opts.validate(src, svg, use)) {
						// remove the <use> element
						parent.removeChild(use);

						// parse the src and get the url and id
						var srcSplit = src.split('#');
						var url = srcSplit.shift();
						var id = srcSplit.join('#');

						// if the link is external
						if (url.length) {
							// get the cached xhr request
							var xhr = requests[url];

							// ensure the xhr request exists
							if (!xhr) {
								xhr = requests[url] = new XMLHttpRequest();

								xhr.open('GET', url);

								xhr.send();

								xhr._embeds = [];
							}

							// add the svg and id as an item to the xhr embeds list
							xhr._embeds.push({
								parent: parent,
								svg: svg,
								id: id
							});

							// prepare the xhr ready state change event
							loadreadystatechange(xhr);
						} else {
							// embed the local id into the svg
							embed(parent, svg, document.getElementById(id));
						}
					} else {
						// increase the index when the previous value was not "valid"
						++index;
						++numberOfSvgUseElementsToBypass;
					}
				}
			} else {
				// increase the index when the previous value was not "valid"
				++index;
			}
		}

		// continue the interval
		if (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) {
			requestAnimationFrame(oninterval, 67);
		}
	}

	// conditionally start the interval if the polyfill is active
	if (polyfill) {
		oninterval();
	}
}

function getSVGAncestor(node) {
	var svg = node;
	while (svg.nodeName.toLowerCase() !== 'svg') {
		svg = svg.parentNode;
		if (!svg) {
			break;
		}
	}
	return svg;
}


// Core
var gCore = {
	mod: null
};

// Contact

function Contact()
{
	var t = this;

	this.email = $('#feedback__email');
	this.msg = $('#feedback__msg');

	this.onLoad = function(httpStatus, content) {
		if (httpStatus == 200) {
			this.email.value('');
			this.msg.value('');
			$.log('Success!');
			alert("Thank you for your message!");
		} else {
			alert("Your message was not sent!");
			$.log('server response: '+httpStatus);
		}
	};

	this.onSubmit = function(evt) {
		var t = this;
		$.ajax({
			url: '/hook/feedback/',
			handler: function(httpStatus, content) {t.onLoad(httpStatus, content)},
			data: {email: this.email.value(), msg: this.msg.value()},
			method: 'POST'
		});
		$.log('Email: '+this.email.value() +'; MSG: '+this.msg.value());
		event.preventDefault();
		return false;
	}

	$('#feedback__form').onSubmit(function(evt) {return t.onSubmit(evt)});
}

// Main

$.main(function(){
	// initialize menu
	var sw = $('#menu-switch').onClick(function(evt) {
		var menu = $('#menu'),
			  targ = $(evt.currentTarget);
		menu.switchClass('opened');
		targ.switchClass('opened');
	});
	// modules
	switch (window.location.pathname) {
	case '/contact/':
		gCore.mod = new Contact();
		break;
	}

	svg4everybody();
});

