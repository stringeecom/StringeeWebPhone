var StringeeSoftPhone = StringeeSoftPhone || {
	//private
	_ready: false,
	_iframe: null,
	_access_token: null,

	_onMethods: new StringeeHashMap(),

	_stringeeServerAddr: null,

	connected: false,

	//public
	showMode: 'full', //full | min | none
	top: undefined,
	left: undefined,
	right: undefined,
	bottom: undefined,
	arrowDisplay: 'top', //top | bottom | none
	arrowLeft: 20,
	fromNumbers: [],
	askCallTypeWhenMakeCall: false,
	appendToElement: null,

	makeAndReceiveCallInNewPopupWindow: false,
	showButtonClose: true,
	routingType: 1
};



StringeeSoftPhone.on = function (eventName, method) {
	StringeeSoftPhone._onMethods.put(eventName, method);
};

StringeeSoftPhone._callOnEvent = function (eventName, param) {
	var eventMethod = StringeeSoftPhone._onMethods.get(eventName);
	if (eventMethod) {
		if (param) {
			eventMethod.call(this, param);
		} else {
			eventMethod.call(this);
		}
	} else {
		console.log('Please implement StringeeSoftPhone event: ' + eventName);
	}
};

StringeeSoftPhone.init = function (config) {
	if (document.readyState === "complete") {
		StringeeSoftPhone._initOnReady(config);
		return;
	}

	document.addEventListener("DOMContentLoaded", function () {
		StringeeSoftPhone._initOnReady(config);
	});
};

StringeeSoftPhone._initOnReady = function (config) {
	//copy toan bo thuoc tinh cua config qua
	for (var propertyName in config) {
		StringeeSoftPhone[propertyName] = config[propertyName];
	}

	window.onbeforeunload = function (e) {
		e = e || window.event;

		// For IE and Firefox prior to version 4
		if (e && StringeeSoftPhone._iframe.contentWindow.stringeePhone.currentCall) {
			e.returnValue = 'Sure?';
		}

		// For Safari
		if (StringeeSoftPhone._iframe.contentWindow.stringeePhone.currentCall) {
			return 'Sure?';
		}
	};

	//build css: https://www.minifier.org/ : style_page.css
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.stringee_iframe_wrapper{margin-top:0;margin-right:0;margin-bottom:0;padding:0;display:block;background:transparent;position:fixed;z-index:16000015;border-radius:10px;width:287px;height:538px;box-shadow:0 10px 30px 0 rgba(0,0,0,.15);border:1px solid #E9EBED;box-sizing: content-box}.stringee_iframe_wrapper .iframe{background-color:transparent;vertical-align:text-bottom;position:relative;width:100%;height:100%;min-width:100%;min-height:100%;max-width:100%;max-height:100%;margin:0;overflow:hidden;display:block;border-width:0}.drop-down-rectangle1{position:absolute;width:15px;height:15px;background:#FFF;transform:rotate(45deg);top:-5px;right:35px;border:1px solid #E9EBED}';
	document.getElementsByTagName('head')[0].appendChild(style);

	getContentIframe = function (iframe_html) {
		//tao the div chua iframe
		var div = document.createElement("div");
		div.innerHTML = '<span class="drop-down-rectangle1"></span>';
		div.setAttribute('class', 'stringee_iframe_wrapper');
		div.style.display = 'none';

		//iframe
		var iframe = document.createElement('iframe');
		iframe.setAttribute('class', 'iframe');

		div.appendChild(iframe);

		//append vao body
		if (!StringeeSoftPhone.appendToElement) {
			document.body.appendChild(div);
		} else {
			//append vao the div bat ky
			//position: absolute;
			div.style.position = "absolute";

			var toElement = document.getElementById(StringeeSoftPhone.appendToElement);
			if (toElement) {
				toElement.appendChild(div);
			} else {
				console.log('ERROR: element with ID: ' + StringeeSoftPhone.appendToElement + ' not found!');
				return;
			}
		}

		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(iframe_html);
		iframe.contentWindow.document.close();

		StringeeSoftPhone._iframe = iframe;
	};

	var iframe_html = 'IFRAME_CONTENT_REPLACE_BY_PHP';
	getContentIframe(iframe_html);
};

StringeeSoftPhone.connect = function (access_token) {
	StringeeSoftPhone._access_token = access_token;
	if (StringeeSoftPhone._iframe && StringeeSoftPhone._iframe.contentWindow.stringeePhone) {
		StringeeSoftPhone._iframe.contentWindow.stringeePhone.connect(access_token);
	}
};

StringeeSoftPhone.disconnect = function () {
	if (StringeeSoftPhone._iframe && StringeeSoftPhone._iframe.contentWindow.stringeePhone) {
		StringeeSoftPhone._iframe.contentWindow.stringeePhone.disconnect();
	} else {
		console.log('StringeePhone not ready');
	}
};

StringeeSoftPhone.config = function (config) { //{top, left, right, bottom}
	//copy toan bo thuoc tinh cua config qua
	for (var propertyName in config) {
		StringeeSoftPhone[propertyName] = config[propertyName];
	}

	if (!StringeeSoftPhone._ready) {
		return;
	}

	var iframe_wrappers = document.getElementsByClassName("stringee_iframe_wrapper");
	if (iframe_wrappers.length > 0) {
		var iframe_wrapper = iframe_wrappers[0];

		//vi tri cua iframe
		if (config.top !== undefined) {
			iframe_wrapper.style.top = config.top + 'px';
		}
		if (config.left !== undefined) {
			iframe_wrapper.style.left = config.left + 'px';
		}
		if (config.right !== undefined) {
			iframe_wrapper.style.right = config.right + 'px';
		}
		if (config.bottom !== undefined) {
			iframe_wrapper.style.bottom = config.bottom + 'px';
		}

		//vi tri cua arrow
		var arrows = document.getElementsByClassName("drop-down-rectangle1");
		if (arrows.length > 0) {
			var arrow = arrows[0];
			if (config.arrowDisplay !== undefined) {
				if (config.arrowDisplay === 'top') {
					arrow.style.top = '-5px';
					arrow.style.display = 'block';
				} else if (config.arrowDisplay === 'bottom') {
					arrow.style.top = '526px';
					arrow.style.display = 'block';
				} else if (config.arrowDisplay === 'none') {
					arrow.style.display = 'none';
				}
			}

			if (config.arrowLeft !== undefined) {
				arrow.style.left = config.arrowLeft + 'px';
			}
		}

		//show mode
		if (config.showMode === 'full' || config.showMode === 'min') {
			if (StringeeSoftPhone._ready) {
				iframe_wrapper.style.display = 'block';

				if (config.showMode === 'min') {
					iframe_wrapper.style.width = '206px';
					iframe_wrapper.style.height = '44px';
				} else {
					iframe_wrapper.style.width = '287px';
					iframe_wrapper.style.height = '538px';
				}

				StringeeSoftPhone._iframe.contentWindow.stringeePhone.showMode(config.showMode);

				StringeeSoftPhone._callOnEvent('displayModeChange', config.showMode);
			}
		} else if (config.showMode === 'none') {
			if (StringeeSoftPhone._ready) {
				iframe_wrapper.style.display = 'none';

				StringeeSoftPhone._callOnEvent('displayModeChange', config.showMode);
			}
		}

		//fromNumbers
		if (config.fromNumbers !== undefined) {
			StringeeSoftPhone._iframe.contentWindow.stringeePhone.setFromNumbers(config.fromNumbers);
		}

		//showButtonClose
		if (config.showButtonClose !== undefined) {
			if (config.showButtonClose) {
				StringeeSoftPhone._iframe.contentWindow.stringeePhone.showButtonClose('show');
			} else {
				StringeeSoftPhone._iframe.contentWindow.stringeePhone.showButtonClose('none');
			}
		}

		if (config.routingType !== undefined) {
			StringeeSoftPhone._iframe.contentWindow.stringeePhone.showIconRoutingType(config.routingType)
		}
	}
};

StringeeSoftPhone.show = function (showMode) {
	var config = {
		showMode: showMode
	};
	StringeeSoftPhone.config(config);
};


StringeeSoftPhone.makeCall = function (fromNumber, toNumber, callback, callType) {
	if (!StringeeSoftPhone._ready) {
		callback.call(this, {
			r: 1,
			msg: 'StringeeSoftphone is not ready yet'
		});
		return;
	}

	StringeeSoftPhone._iframe.contentWindow.stringeePhone.makeCallWithUI(fromNumber, toNumber, callback, callType);
};

StringeeSoftPhone.hangupCall = function () {
	if (!StringeeSoftPhone._ready) {
		return false;
	}

	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.hangupCall();
};

StringeeSoftPhone.answerCall = function () {
	if (!StringeeSoftPhone._ready) {
		return false;
	}

	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.answerCall();
};

StringeeSoftPhone.setLabelHtml = function (selector, html) {
	if (!StringeeSoftPhone._ready) {
		return false;
	}

	return StringeeSoftPhone._iframe.contentWindow.stringeePhone.setLabelHtml(selector, html);
};