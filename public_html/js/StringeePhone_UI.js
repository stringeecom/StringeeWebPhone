var StringeePhone = StringeePhone || {};

StringeePhone.prototype.baseUrl = 'https://static.stringee.com/web_phone/lastest/';

StringeePhone.prototype.showIncomingCall = function (show) {
	if (show) {
		this.callStatus('Có cuộc gọi đến');

		//from, fromAlias
		$('.incomming-call-info .info-name').html(this.currentCall.fromNumber);
		$('.incomming-call-info .location-text').html(this.currentCall.toAlias);

		$('.page').addClass('display-none');
		$('#page-incomming-call').removeClass('display-none');
		$('.wrap-toolbar-bottom').addClass('display-none');

		$('.wrap-toolbar-bottom').removeClass('bg-transparent');
	} else {
		$('.wrap-toolbar-bottom').removeClass('display-none');

		this.showTab(this.currentTab);

		$('#btn-incomming-decline').removeAttr('disabled');
		$('#btn-incomming-accept').removeAttr('disabled');
	}
};

StringeePhone.prototype.hideCallingUI = function () {
	$('#btnToolCall').removeAttr('disabled');

	//chuyen btn END_CALL -> CALL
	$('#btnToolCall').removeClass('btn-red');
	$('#btnToolCall').addClass('btn-green');
	$('#btnToolCall .icon').removeAttr('style');
	$('#page-diapad').removeClass('diapad-when-calling');

	var eventMethod = window.parent.StringeeSoftPhone._onMethods.get('callingScreenHide');
	if (eventMethod) {
		eventMethod.call(window.parent.StringeeSoftPhone);
	}

	this.showTab('dialpad');
};

StringeePhone.prototype.showTab = function (tabName) {
	if (tabName === 'activity' || tabName === 'contact') {
		alert('Coming soon!');
		return false;
	}

	this.currentTab = tabName;

	if (tabName === 'dialpad') { //dialpad =========================>
		$('.page').addClass('display-none');
		$('#page-diapad').removeClass('display-none');

		$('#app').removeClass('bg-light-gray');
		$('#btnToolPad').addClass('display-none');
		$('#btnToolCall').removeClass('display-none');

		$('.wrap-toolbar-bottom').removeClass('bg-transparent');

		$('#page-diapad input').focus();
		if ($("#page-diapad input").val().length === 0) {
			$("#page-diapad input").val('+84 ');
		}

		$('.top-bar-title').html('');
	} else if (tabName === 'calling') { //calling =========================>
		$('.page').addClass('display-none');
		$('#page-calling').removeClass('display-none');
		$('.wrap-toolbar-bottom').addClass('bg-transparent');

		$('.top-bar-title').html('');
	} else if (tabName === 'contact') { //contact =========================>
		$('.page').addClass('display-none');
		$('#page-contact').removeClass('display-none');

		$('#btnToolPad').removeClass('display-none');
		$('#btnToolCall').addClass('display-none');

		$('.wrap-toolbar-bottom').removeClass('bg-transparent');

		$('.top-bar-title').html('Contacts');
	} else if (tabName === 'activity') { //activity =========================>
		$('.page').addClass('display-none');
		$('#page-activity').removeClass('display-none');

		$('.wrap-toolbar-bottom .icon').addClass('display-none');
		$('.wrap-toolbar-bottom .icon-gray').removeClass('display-none');
		$('.wrap-toolbar-bottom').removeClass('bg-transparent');

		$('#btnToolPad').removeClass('display-none');
		$('#btnToolCall').addClass('display-none');

		$('.top-bar-title').html('Recents');
	}
};

StringeePhone.prototype.callStatus = function (status) {
	$('.status-text').html(status);

	this.updateUiMinMode();
};

StringeePhone.prototype.setLabelHtml = function (selector, html) {
	$(selector).html(html);
};

StringeePhone.prototype.hideCallingUIWithTimeout = function () { //tao timeout an man hinh Calling
	var thisPhone = this;

	$('#btnToolCall').attr('disabled', 'disabled');

	this.callStatus('Đã kết thúc');

	thisPhone.timeoutEndCallUI = setTimeout(function () {
		thisPhone.hideCallingUI();

		thisPhone.isInCall = false;
		thisPhone.currentCall = null;
		thisPhone.timeoutEndCallUI = null;
	}, 2000);
};

StringeePhone.prototype.hideIncomingCallUIWithTimeout = function (status) { //tao timeout an man hinh IncomingCall
	var thisPhone = this;

	this.callStatus(status);

	$('#btn-incomming-decline').attr('disabled', 'disabled');
	$('#btn-incomming-accept').attr('disabled', 'disabled');

	thisPhone.timeoutEndCallUI = setTimeout(function () {
		thisPhone.showIncomingCall(false);

		thisPhone.isInCall = false;
		thisPhone.currentCall = null;
		thisPhone.timeoutEndCallUI = null;

		var eventMethod = window.parent.StringeeSoftPhone._onMethods.get('incomingScreenHide');
		if (eventMethod) {
			eventMethod.call(window.parent.StringeeSoftPhone);
		}

	}, 2000);
};

StringeePhone.prototype.makeCallWithUI = function (fromNumber, toNumber, callback, callType) {
	if (this.isInCall || this.currentCall) {
		callback.call(this, {
			r: 2,
			msg: 'StringeeSoftphone is busy'
		});
		return false;
	}

	$("#page-diapad input").val(toNumber);
	$('#from-number-callout').html(fromNumber);

	this.callBtnClicked(callType, false);

	callback.call(this, {
		r: 0,
		msg: 'Success'
	});
};

StringeePhone.prototype.callBtnClicked = function (callType, isBtnClicked) {
	//toNumber
	var toNumber = $("#page-diapad input").val();
	toNumber = toNumber.replace("%2B", '');
	toNumber = toNumber.replace("+", '');
	toNumber = toNumber.replace(' ', '');

	//fromNumber
	var fromNumber = $('#from-number-callout').html();
	fromNumber = fromNumber.replace("%2B", '');
	fromNumber = fromNumber.replace("+", '');
	fromNumber = fromNumber.replace(' ', '');

	this.isInCall = !this.isInCall;

	if (this.isInCall) {
		//neu cau hinh hoi xem kieu Call (voice call, video call, call out); neu setting la hoi va chua truyen vao callType
		if (window.parent.StringeeSoftPhone.askCallTypeWhenMakeCall && !callType) {
			//hien thi man hinh hoi
			$('.wrap-option-call').removeClass('display-none');

			this.isInCall = !this.isInCall;
			return;
		}

		//set callType
		if (!callType) {
			callType = 'callout';
		}

		if (isBtnClicked) {
			var eventMethod = window.parent.StringeeSoftPhone._onMethods.get('makeOutgoingCallBtnClick');
			if (eventMethod) {
				eventMethod.call(window.parent.StringeeSoftPhone, fromNumber, toNumber, callType);
			}
		}

		//neu mo popup moi luc makecall
		if (window.parent.StringeeSoftPhone.makeAndReceiveCallInNewPopupWindow) {
			this.isInCall = !this.isInCall;
			return;
		}

		$('.info-name').html(toNumber);
		this.callStatus('Đang gọi...');

		this.showTab('calling');

		$('.status-time').addClass('display-none');

		var makeCallOk = this.makeCall(fromNumber, toNumber, callType);

		//chuyen btn CALL -> END_CALL
		$('#btnToolCall').addClass('btn-red');
		$('#btnToolCall').removeClass('btn-green');
		$('#btnToolCall .icon').attr('style', 'transform: rotate(135deg);');

		if (makeCallOk) {
			$('#page-calling .location-text').html(fromNumber);
		} else {
			this.isInCall = !this.isInCall;
			this.hideCallingUIWithTimeout();
		}
	} else {
		var eventMethod = window.parent.StringeeSoftPhone._onMethods.get('endCallBtnClick');
		if (eventMethod) {
			eventMethod.call(window.parent.StringeeSoftPhone);
		}

		if (this.currentCall) {
			this.currentCall.hangup();
			this.hideCallingUIWithTimeout();
		}
	}
};

StringeePhone.prototype.hangupCall = function () {
	if (this.currentCall) {
		this.currentCall.hangup();
		this.hideCallingUIWithTimeout();

		return true;
	}
	return false;
};

StringeePhone.prototype.answerCall = function () {
	if (this.currentCall && this.currentCall.isIncomingCall && !this.currentCall.isAnswered) {
		this.incomingCallAcceptBtnClicked();

		return true;
	}

	return false;
};

StringeePhone.prototype.stopRingtoneIncomingCall = function () {
	this.ringtonePlayer.pause();
	this.ringtonePlayer.currentTime = 0;
};

StringeePhone.prototype.incomingCallAcceptBtnClicked = function () {
	var thisPhone = this;
	if (thisPhone.currentCall && !thisPhone.currentCall.isAnswered) {
		if (!thisPhone.currentCall.answeredOnAnotherDevice) {
			thisPhone.currentCall.answer();
		}

		thisPhone.currentCallAnswerTime = (new Date()).getTime();
		thisPhone.countDuration();

		//toAlias
		$('#page-calling .location-text').html(this.currentCall.toAlias);
	}

	//dung tieng play ringtone
	thisPhone.stopRingtoneIncomingCall();

	thisPhone.showIncomingCall(false);

	this.isInCall = true;

	$('.info-name').html(thisPhone.currentCall.fromNumber);
	this.callStatus('Đã trả lời');

	this.showTab('calling');

	//show tab calling thi phai chuyen btn o giua thanh call
	$('#btnToolPad').addClass('display-none');
	$('#btnToolCall').removeClass('display-none');

	//chuyen btn CALL -> END_CALL
	$('#btnToolCall').addClass('btn-red');
	$('#btnToolCall').removeClass('btn-green');
	$('#btnToolCall .icon').attr('style', 'transform: rotate(135deg);');
};

StringeePhone.prototype.incomingCallDeclineBtnClicked = function () {
	var eventMethod = window.parent.StringeeSoftPhone._onMethods.get('declineIncomingCallBtnClick');
	if (eventMethod) {
		eventMethod.call(window.parent.StringeeSoftPhone);
	}

	var thisPhone = this;
	if (this.currentCall) {
		this.currentCall.reject();
	}

	thisPhone.stopRingtoneIncomingCall();

	thisPhone.hideIncomingCallUIWithTimeout('Call declined');
};

StringeePhone.prototype.keypadKeyPress = function (key) {
	var current = $('#page-diapad input').val();
	$('#page-diapad input').val(current + key);
	$('#page-diapad input').focus();
};

StringeePhone.formatDuration = function (duration) {
	var time = Math.floor(duration / 1000);

	var second = time % 60;
	var minute = Math.floor(time / 60);
	var hour;
	if (minute < 60) {
		hour = 0;
	} else {
		hour = Math.floor(minute / 60);
		minute = minute % 60;
	}

	//them so 0
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minute < 10) {
		minute = '0' + minute;
	}
	if (second < 10) {
		second = '0' + second;
	}

	var timeString;
	if (hour === '00') {
		timeString = minute + ':' + second;
	} else {
		timeString = hour + ':' + minute + ':' + second;
	}

	return timeString;
};

StringeePhone.prototype.muteBtnClicked = function () {
	if (this.currentCall && !this.currentCall.ended) {
		var active = $('#btnMic').hasClass('active');
		if (active) {
			$('#btnMic').removeClass('active');
		} else {
			$('#btnMic').addClass('active');
		}

		var muted = !active;
		this.currentCall.mute(muted);
	}
};

StringeePhone.prototype.transferBtnClicked = function () {
	if (this.currentCall && !this.currentCall.ended) {
		//		console.log('StringeePhone.prototype.transferBtnClicked');
		window.parent.StringeeSoftPhone._callOnEvent('transferCallBtnClick', this.currentCall);
	}
};

StringeePhone.prototype.addParticipantBtnClicked = function () {
	if (this.currentCall && !this.currentCall.ended) {
		//		console.log('StringeePhone.prototype.transferBtnClicked');
		window.parent.StringeeSoftPhone._callOnEvent('addParticipantBtnClick', this.currentCall);
	}
};



StringeePhone.prototype.holdBtnClicked = function () {
	if (this.currentCall && !this.currentCall.ended) {
		var active = $('#btnHold').hasClass('active');
		if (active) {
			//hien tai dang hold
			//goi lenh de unhold
			var unholdOk = this.currentCall.unhold();
			if (unholdOk) {
				$('#btnHold').removeClass('active');
			}
		} else {
			//hien tai dang chua hold
			//goi lenh de hold
			var holdOk = this.currentCall.hold();
			if (holdOk) {
				$('#btnHold').addClass('active');
			}
		}
	}
};

StringeePhone.prototype.showMode = function (mode) {
	if (mode === 'min') {
		$('#stringee_clound').addClass('mode-minimize');
	} else if (mode === 'full') {
		$('#stringee_clound').removeClass('mode-minimize');
	}
};

StringeePhone.prototype.setFromNumbers = function (numbers) {
	var itemHtml = '<div class="call-using-dropdown-item cursor-pointer p-15 pt-10 pb-10"><div><span class="call-using-text-name display-block">Number 1</span><span class="call-using-text-phone display-block">+84899199586</span></div></div>';

	$('#list-from-numbers').html('');

	for (var i = 0; i < numbers.length; i++) {
		var number = numbers[i]; //{number: '84900000', alias: ''}

		var $item = $(itemHtml);
		$item.find('.call-using-text-name').html(number.alias);
		$item.find('.call-using-text-phone').html(number.number);

		$('#list-from-numbers').append($item);
	}

	//selected
	var selectedNumber = '';
	var selectedAlias = '';
	if (numbers.length > 0) {
		selectedNumber = numbers[0].number;
		selectedAlias = numbers[0].alias;
	}
	$('#from-number-callout-alias').html(selectedAlias);
	$('#from-number-callout').html(selectedNumber);
};

StringeePhone.prototype.showButtonClose = function (show) {
	if (show === 'show') {
		$('#btnCloseIframe').removeClass('display-none');
	} else {
		$('#btnCloseIframe').addClass('display-none');
	}
};

StringeePhone.prototype.showIconRoutingType = function (routingType) {
	// var routingType = window.parent.StringeeSoftPhone.routingType;
	var routingTypeLabelActived = '';
	if (routingType == 1) {
		routingTypeLabelActived = "<img src='" + stringeePhone.baseUrl + "images/icon-browser.png' class='icon-option-active' title='Đổ cuộc gọi đến app và sipphone'>"
	} else if (routingType == 2) {
		routingTypeLabelActived = "<img src='" + stringeePhone.baseUrl + "images/icon-phone.png' class='icon-option icon-option-active' title='Đổ cuộc gọi đến số điện thoại'>";
	} else if (routingType == 3) {
		routingTypeLabelActived = "<img src='" + stringeePhone.baseUrl + "images/icon-app.png' class='icon-option icon-option-active' title='Đổ cuộc gọi đến app'>";
	} else if (routingType == 4) {
		routingTypeLabelActived = "<img src='" + stringeePhone.baseUrl + "images/icon-ipphone.png' class='icon-option icon-option-active' title='Đổ cuộc gọi đến ipphone'>";
	}
	$('#routingTypeLabelActived').html(routingTypeLabelActived);
}

StringeePhone.prototype.setRoutingType = function (routingType) {
	window.parent.StringeeSoftPhone._callOnEvent('setRoutingType', routingType);
};

StringeePhone.prototype.toggleKeypadInCall = function () {
	if ($('#page-diapad').hasClass('diapad-when-calling')) {
		$('#page-diapad').removeClass('diapad-when-calling');
		$('.wrap-toolbar-bottom').addClass('bg-transparent');
	} else {
		$('#page-diapad').addClass('diapad-when-calling');
		$('.wrap-toolbar-bottom').removeClass('bg-transparent');
	}

}


function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}
DropDown.prototype = {
	initEvents: function () {
		var obj = this;

		obj.dd.on('click', function (event) {
			$(this).toggleClass('active');
			return false;
		});

		obj.opts.on('click', function () {
			var opt = $(this);
			obj.val = opt.attr('data-value');
			obj.icon = opt.find('.icon-option')
			obj.index = opt.index();
			var iconActive = obj.icon.clone().addClass('icon-option-active');
			obj.placeholder.html(iconActive);
		});
	},
	getValue: function () {
		return this.val;
	},
	getIndex: function () {
		return this.index;
	}
}




$(document).ready(function () {
	//khoi tao 1 StringeePhone
	var stringeePhone = new StringeePhone();

	//khoi tao dropdown routing-type
	var dd = new DropDown($('#dropdown-option-call'));

	//disable btn call
	$('#btnToolCall').attr('disabled', 'disabled');

	stringeePhone.showTab('dialpad');
	if (window.parent.StringeeSoftPhone._access_token) {
		stringeePhone.connect(window.parent.StringeeSoftPhone._access_token);
	}

	//gan vao window
	window.stringeePhone = stringeePhone;

	//window.parent
	window.parent.StringeeSoftPhone._ready = true;
	window.parent.StringeeSoftPhone.config(window.parent.StringeeSoftPhone);

	//tabbar activity click
	$('#btnToolActivity').on('click', function () {
		stringeePhone.showTab('activity');
	});

	//tabbar contact click
	$('#btnToolContact').on('click', function () {
		stringeePhone.showTab('contact');
	});

	$('#btnToolPad').on('click', function () {
		console.log('click to dialpad');
		stringeePhone.showTab('dialpad');
	});

	//call
	$('#btnToolCall').on('click', function () {
		stringeePhone.callBtnClicked(null, true);
	});

	$('#btnIncommingCall').on('click', function () {
		$('.page').addClass('display-none');
		$('#page-incomming-call').removeClass('display-none');
		$('.wrap-toolbar-bottom').addClass('display-none');

		$('.wrap-toolbar-bottom').removeClass('bg-transparent');
	});


	$('#btnSearchContact').on('click', function () {
		$('#inputSearchContact').removeClass('display-none');
	});

	$("body").on('click', function (e) {
		console.log(e.target.id);
		if (e.target.id !== "btnSearchContact" && e.target.id !== "inputSearchContact") {
			$("#inputSearchContact").addClass('display-none');
		} else {
			$("#inputSearchContact").removeClass('display-none');
			$("#inputSearchContact").focus();
		}
	});



	// call action ========= ==>
	$('#btnMic').on('click', function () {
		stringeePhone.muteBtnClicked();
	});
	//btnHold
	$('#btnHold').on('click', function () {
		stringeePhone.holdBtnClicked();
	});
	//btnTransfer
	$('#btnTransfer').on('click', function () {
		stringeePhone.transferBtnClicked();
	});
	$('#btnAddToCall').on('click', function () {
		stringeePhone.addParticipantBtnClicked();
	});

	//
	$('#btnKeypadInCall').on('click', function () {
		console.log("++++ toggleKeypadInCall")
		stringeePhone.toggleKeypadInCall()
	});
	// call action ========= <==

	//accept incoming call
	$('#btn-incomming-accept').on('click', function () {
		if (!window.parent.StringeeSoftPhone.makeAndReceiveCallInNewPopupWindow) {
			stringeePhone.incomingCallAcceptBtnClicked();
		}
		window.parent.StringeeSoftPhone._callOnEvent('answerIncomingCallBtnClick');
	});

	//decline incoming call
	$('#btn-incomming-decline').on('click', function () {
		stringeePhone.incomingCallDeclineBtnClicked();
	});

	// CLICK SHOW DROPDOWN
	$('.call-using-select').on('click', function () {
		var hasClass = $('.wrap-call-using-dropdown').hasClass('display-none');
		if (hasClass) {
			$('.wrap-call-using-dropdown').removeClass('display-none');
		} else {
			$('.wrap-call-using-dropdown').addClass('display-none');
		}
	});

	// CLICK SELECT NUMBER
	$(document).on('click', '.call-using-dropdown-item', function () {
		var thisItem = $(this);
		var text = thisItem.find('.call-using-text-name').html();
		var phone = thisItem.find('.call-using-text-phone').html();

		$('#from-number-callout-alias').html(text);
		$('#from-number-callout').html(phone);

		$('.wrap-call-using-dropdown').addClass('display-none');
	});

	//dialpad clear
	$('#page-diapad .btn-close').on('click', function () {
		$('#page-diapad input').val('+84 ');
		$('#page-diapad input').focus();
	});

	//keypadKeyPress
	$('#diapad-key-1').on('click', function () {
		stringeePhone.keypadKeyPress('1');
	});
	$('#diapad-key-2').on('click', function () {
		stringeePhone.keypadKeyPress('2');
	});
	$('#diapad-key-3').on('click', function () {
		stringeePhone.keypadKeyPress('3');
	});
	$('#diapad-key-4').on('click', function () {
		stringeePhone.keypadKeyPress('4');
	});
	$('#diapad-key-5').on('click', function () {
		stringeePhone.keypadKeyPress('5');
	});
	$('#diapad-key-6').on('click', function () {
		stringeePhone.keypadKeyPress('6');
	});
	$('#diapad-key-7').on('click', function () {
		stringeePhone.keypadKeyPress('7');
	});
	$('#diapad-key-8').on('click', function () {
		stringeePhone.keypadKeyPress('8');
	});
	$('#diapad-key-9').on('click', function () {
		stringeePhone.keypadKeyPress('9');
	});
	$('#diapad-key-star').on('click', function () {
		stringeePhone.keypadKeyPress('*');
	});
	$('#diapad-key-sharp').on('click', function () {
		stringeePhone.keypadKeyPress('#');
	});
	//+
	var mousedown0;
	$('#diapad-key-0').mouseup(function () {
		// Clear timeout
		if (mousedown0) {
			clearTimeout(mousedown0);
			stringeePhone.keypadKeyPress('0');
		}
		return false;
	}).mousedown(function () {
		// Set timeout
		mousedown0 = setTimeout(function () {
			stringeePhone.keypadKeyPress('+');
			mousedown0 = null;
		}, 1000);
		return false;
	});

	//thu nho / phong to
	$('#btnMinimize').on('click', function () {
		//goi len parent de thu nho iframe
		window.parent.StringeeSoftPhone.show('min');
	});

	$('#app-minimize').on('click', function () {
		//goi len parent de phong to iframe
		window.parent.StringeeSoftPhone.show('full');
	});

	//an man hinh chon call type
	$('.btn-close-option-call').on('click', function () {
		$('.wrap-option-call').addClass('display-none');
	});

	//chon call type
	$('.btn-free-voice-call').on('click', function () {
		stringeePhone.callBtnClicked('free-voice-call', true);
		$('.wrap-option-call').addClass('display-none');
	});
	$('.btn-free-video-call').on('click', function () {
		stringeePhone.callBtnClicked('free-video-call', true);
		$('.wrap-option-call').addClass('display-none');
	});
	$('.btn-free-callout').on('click', function () {
		stringeePhone.callBtnClicked('callout', true);
		$('.wrap-option-call').addClass('display-none');
	});

	// click close iframe
	$('#btnCloseIframe').on('click', function () {
		if (!stringeePhone.currentCall || stringeePhone.currentCall.ended) {
			window.parent.StringeeSoftPhone.show('none');
		} else {
			alert('Please end call before close phone');
		}
	});

	$('#dropdown-option-call').find('li').on('click', function () {
		// console.log('setRoutingType', this.attr('data-value'))
		var routingType = $(this).attr('data-value');
		stringeePhone.setRoutingType(routingType)
	})
});