

var StringeePhone = StringeePhone || {};

function StringeePhone() {
	this.connected = false;

	this.isInCall = false;
	this.currentTab = 'dialpad';//dialpad | calling | contact | activity

	this.stringeeClient = new StringeeClient();

	this.currentOutgoingCall = null;

	/**
	 * Bien nay bao gom ca incoming call va outgoing call; chi set = null khi man hinh CALL an di
	 */
	this.currentCall = null;
	this.currentCallAnswerTime = 0;

	this.remoteVideo = document.getElementById('remoteVideo');
	this.ringtonePlayer = document.getElementById('ringtonePlayer');

	this.timeoutEndCallUI = null;

	this.timeoutCountDuration = null;
}

StringeePhone.prototype.connect = function (access_token) {
	//trang thai
	$('.top-bar-status').html('Connecting...');
	$('.top-bar-status').addClass('color-red');
	$('.top-bar-status').removeClass('color-green');

	this.stringeeClient.connect(access_token);
	this.settingClientEvents(this.stringeeClient);
};

StringeePhone.prototype.disconnect = function () {
	this.stringeeClient.disconnect();
};

StringeePhone.prototype.updateUiMinMode = function () {
	if (!this.currentCall || this.currentCall.ended) {
		//min mode: khong co cuoc goi nao
		$('#app-minimize .time').addClass('display-none');
		$('#app-minimize .line-vertical').addClass('display-none');
		$('#app-minimize .phone').addClass('display-none');
		$('#app-minimize .min-no-calls').removeClass('display-none');
	} else {
		//co cuoc goi dang dien ra
		$('#app-minimize .time').removeClass('display-none');
		$('#app-minimize .line-vertical').removeClass('display-none');
		$('#app-minimize .phone').removeClass('display-none');
		$('#app-minimize .min-no-calls').addClass('display-none');

		//
		if (this.currentCall.isIncomingCall) {
			$('#app-minimize .phone').html(this.currentCall.fromNumber);
		} else {
			$('#app-minimize .phone').html(this.currentCall.toNumber);
		}
		if (!this.currentCall.isIncomingCall.isAnswered) {
			$('#app-minimize .time').html('00:00');
		}
	}
};

StringeePhone.prototype.countDuration = function () {
	var thisPhone = this;

	thisPhone.updateUiMinMode();

	if (!thisPhone.currentCall || thisPhone.currentCall.ended) {
		return;
	}

	var time = (new Date()).getTime() - thisPhone.currentCallAnswerTime;
	var timeString = StringeePhone.formatDuration(time);

	//full mode
	$('.status-time').removeClass('display-none');
	$('.status-time').html(timeString);

	//min mode
	$('#app-minimize .time').html(timeString);

	this.timeoutCountDuration = setTimeout(function () {
		thisPhone.countDuration();
	}, 1000);
};

StringeePhone.prototype.settingClientEvents = function (client) {
	var thisPhone = this;

	client.on('connect', function () {
		console.log('connected to StringeeServer');
	});
	client.on('authen', function (res) {
//		console.log('authen: ', res);
		$('#loggedUserId').html(res.userId);
		
		window.parent.StringeeSoftPhone._callOnEvent('authen', res);
		
		if (res.r === 0) {
			thisPhone.connected = true;
			window.parent.StringeeSoftPhone.connected = true;

			$('#btnToolCall').removeAttr('disabled');

			//trang thai
			$('.top-bar-status').html(res.userId);
			$('.top-bar-status').removeClass('color-red');
			$('.top-bar-status').addClass('color-green');
		} else {
			//trang thai
			$('.top-bar-status').html(res.message);
			$('.top-bar-status').addClass('color-red');
			$('.top-bar-status').removeClass('color-green');
		}
	});
	client.on('disconnect', function () {
//		console.log('disconnected');
		thisPhone.connected = false;
		window.parent.StringeeSoftPhone.connected = false;
		
		window.parent.StringeeSoftPhone._callOnEvent('disconnect');

		//disable btn call
		$('#btnToolCall').attr('disabled', 'disabled');

		//trang thai
		$('.top-bar-status').html('Disconnected');
		$('.top-bar-status').addClass('color-red');
		$('.top-bar-status').removeClass('color-green');
	});
	client.on('incomingcall', function (incomingcall) {
		if (thisPhone.currentCall) {
			//neu hien tai dang co cuoc goi
			if (!thisPhone.currentCall.ended) {
				//reject cuoc goi den
				console.log('Im busy now, reject incoming call: ' + incomingcall.callId);
				incomingcall.reject();
				return;
			} else if (thisPhone.timeoutEndCallUI) {
				//cuoc goi hien tai da ngat, tuy nhien timeout hideCalling chua chay xong
//				console.log('cuoc goi hien tai da ngat, tuy nhien timeout hideCalling chua chay xong');
				clearTimeout(thisPhone.timeoutEndCallUI);
				thisPhone.hideCallingUI();
				thisPhone.showIncomingCall(false);

				thisPhone.isInCall = false;
				thisPhone.currentCall = null;
				thisPhone.timeoutEndCallUI = null;
			}
		}

		thisPhone.isInCall = true;
		thisPhone.currentCall = incomingcall;

		thisPhone.settingCallEvents(incomingcall);

//		console.log('incomingcall: ', incomingcall);
		thisPhone.showIncomingCall(true);

		//show full mode
		window.parent.StringeeSoftPhone.show('full');

		var promise = thisPhone.ringtonePlayer.play();
//		if (promise !== undefined) {
//			promise.catch(error => {
//				// Auto-play was prevented
//				// Show a UI element to let the user manually start playback
//				console.log('Auto-play was prevented');
//			}).then(() => {
//				console.log('Auto-play started');
//			});
//		}
//		navigator.mediaDevices.getUserMedia(constraints).then(successCallback).catch(errorCallback);

		window.parent.StringeeSoftPhone._callOnEvent('incomingCall', incomingcall);
	});
	client.on('requestnewtoken', function () {
		window.parent.StringeeSoftPhone._callOnEvent('requestNewToken');
	});
	client.on('otherdeviceauthen', function (data) {
		console.log('otherdeviceauthen: ', data);
	});
};

StringeePhone.prototype.settingCallEvents = function (call1) {
	var thisPhone = this;

	call1.on('addlocalstream', function (stream) {
		window.parent.StringeeSoftPhone._callOnEvent('addlocalstream', stream);
	});

	call1.on('addremotestream', function (stream) {
		var eventMethod = window.parent.StringeeSoftPhone._onMethods.get('addremotestream');
		if (!eventMethod) {
			// reset srcObject to work around minor bugs in Chrome and Edge.
			thisPhone.remoteVideo.srcObject = null;
			thisPhone.remoteVideo.srcObject = stream;
		} else {
			eventMethod.call(window.parent.StringeeSoftPhone, stream);
		}
	});

	call1.on('signalingstate', function (state) {
//		console.log('signalingstate ', state);
		if (state.code === 6) {//Ended
			//neu la cuoc goi den chua tra loi
			if (call1.isIncomingCall && !call1.isAnswered) {
//				thisPhone.showIncomingCall(false);
				thisPhone.hideIncomingCallUIWithTimeout('Call ended');

//				thisPhone.ringtonePlayer.pause();
//				thisPhone.ringtonePlayer.currentTime = 0;
				thisPhone.stopRingtoneIncomingCall();
			} else {
				thisPhone.hideCallingUIWithTimeout();
			}

//			thisPhone.hideCallingUIWithTimeout();//test nen de day
		} else if (state.code === 5) {//Busy
			thisPhone.hideCallingUIWithTimeout();
		} else if (state.code === 3) {//answer
			thisPhone.currentCallAnswerTime = (new Date()).getTime();
			thisPhone.countDuration();
		}

		thisPhone.callStatus(state.reason);
		
		var eventMethod = window.parent.StringeeSoftPhone._onMethods.get('signalingstate');
		if(eventMethod){
			eventMethod.call(window.parent.StringeeSoftPhone, state);
		}
	});

	call1.on('mediastate', function (state) {
		console.log('mediastate ', state);
	});

	call1.on('info', function (info) {
		console.log('on info', info);
	});

	call1.on('otherdevice', function (data) {
		console.log('on otherdevice:' + JSON.stringify(data));
		if ((data.type === 'CALL_STATE' && data.code >= 200) || data.type === 'CALL_END') {
			var status = '';
			thisPhone.hideIncomingCallUIWithTimeout(status);
		}

		//dung tieng chuong khi nghe tu thiet bi khac
		if (data.type === 'CALL_STATE' && data.code >= 200) {
			thisPhone.stopRingtoneIncomingCall();
		}
	});
};


StringeePhone.prototype.makeCall = function (fromNumber, toNumber, callType) {
	var thisPhone = this;
	
	var isVideoCall = callType === 'free-video-call';

	var call = new StringeeCall(this.stringeeClient, fromNumber, toNumber, isVideoCall);

	//Kiem tra xem Dev co thuc hien ham: onBeforeMakeCall
	var onBeforeMakeCall = window.parent.StringeeSoftPhone._onMethods.get('beforeMakeCall');
	if (onBeforeMakeCall) {
		//neu dev dinh nghia ham nay 'onBeforeMakeCall'
		var res = onBeforeMakeCall.call(this, call, callType);
		if (res === false) {
			console.log('onBeforeMakeCall return false');
			return false;
		}
	}

	this.settingCallEvents(call);
	call.makeCall(function (res) {
		console.log('+++make call callback: ' + JSON.stringify(res));
		if (res.r != 0) {
			$('#callStatus').html(res.message);
			thisPhone.hideCallingUIWithTimeout();
		}
	});

	this.currentOutgoingCall = call;
	this.currentCall = call;

	return true;
};
