<!DOCTYPE html>
<html>
	<head>
		<title>TODO supply a title</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<script type="text/javascript" src="public_html/js/jquery-3.1.0.min.js"></script>
	</head>
	<body>

		<style>
			.display-none {
				display: none !important;
			}

			#header {
				height: 50px;
				position: relative;
			}

			.channels-control {
				background-color: #E9EBED;
				border-radius: 4px;

			}

			#header-call-btn {
				position: absolute;
				right: 900px;
				width: 50px;
				height: 25px;
				cursor: pointer;
			}

			#make-call-btn {
				position: absolute;
				right: 1000px;
				width: 150px;
				height: 25px;
				cursor: pointer;
			}

			.wrap-video {
				left: 360px;
				position: fixed;
				height: 300px;
				width: 1200px;
			}
			.wrap-video .video {
				width: 570px;
				float: left;
				height: 100%;
			}
			.wrap-video .video video {
				width: 550px;
				padding-right: 10px;
				background-color: #434a5c !important;
				height: 100%;
			}
			
			.tool1 {
				left: 360px;
				top: 380px;
				position: fixed;
				height: 200px;
				width: 1200px;
			}
			#access_token2 {
				height: 150px;
				width: 800px;
			}
		</style>

		<?php
		//	define('BASE_URL', 'https://test3.stringee.com/tmp/Stringee_WebPhone/public_html/');
		//header("Access-Control-Allow-Origin: *");
		include_once './config.php';

		//build JS===================================================== ==>
		$file1 = file_get_contents('public_html/js/StringeeHashMap.js');
		$file2 = file_get_contents('public_html/StringeeSoftPhone.js');

		$iframeContent = file_get_contents(BASE_URL_LOCAL . 'StringeeSoftphone_iframe.php');
		$iframeContent = str_replace("\r\n", "", $iframeContent);
		$iframeContent = str_replace("\n", "", $iframeContent);

		$file2 = str_replace('IFRAME_CONTENT_REPLACE_BY_PHP', $iframeContent, $file2);

		$all = $file1 . "\r\n" . $file2;

		$fp1 = fopen('public_html/StringeeSoftPhone-' . VERSION . '.js', 'w');
		fwrite($fp1, $all);
		//build JS===================================================== <==
		?>


		<script src="public_html/StringeeSoftPhone-<?= VERSION ?>.js"></script>

		<script>
			var access_token2 = '';
			
			var callPopupWindow = null;
			window.popupMustAnswerIncomingCall = false;
			window.popupMustMakeOutgoingCall = false;
			//
			window.popupMustMakeOutgoingCallFrom = '';
			window.popupMustMakeOutgoingCallTo = '';
			window.popupMustMakeOutgoingCallType = '';

			function openPopupWindow(answerIncomingCallBtnClick) {
				if (callPopupWindow === null || callPopupWindow.closed) {
					//chua tao popup, hoac da dong
					callPopupWindow = window.open('http://127.0.0.1/stringee/StringeeWebPhone/popup.html', 'Call', 'height=740,width=490');

					if (answerIncomingCallBtnClick) {
						window.popupMustAnswerIncomingCall = true;
					} else {
						window.popupMustMakeOutgoingCall = true;
					}
				} else {
					if (answerIncomingCallBtnClick) {
						//answer call
						callPopupWindow.StringeeSoftPhone.answerCall();
					} else {
						//make call
						callPopupWindow.StringeeSoftPhone.makeCall(
								window.popupMustMakeOutgoingCallFrom, 
								window.popupMustMakeOutgoingCallTo, 
								function (res) {
									console.log('res: ', res);
								}, 
								window.popupMustMakeOutgoingCallType
						);
					}
				}

				if (window.focus) {
					callPopupWindow.focus();
				}
			}

			var config = {
				showMode: 'full',
				top: 45,
				left: 50,
//				right: 810,

				arrowLeft: 155,
				arrowDisplay: 'top',

				fromNumbers: [{alias: 'Huy-1', number: '+842473000538'}],

				askCallTypeWhenMakeCall: true,

				makeAndReceiveCallInNewPopupWindow: false,

				appendToElement: null,
//				showButtonClose: true
			};
			StringeeSoftPhone.init(config);




			

			StringeeSoftPhone.on('displayModeChange', function (event) {
				console.log('displayModeChange', event);
				if (event === 'min') {
					StringeeSoftPhone.config({arrowLeft: 75});
				} else if (event === 'full') {
					StringeeSoftPhone.config({arrowLeft: 155});
				}
			});

			StringeeSoftPhone.on('requestNewToken', function () {
				console.log('requestNewToken+++++++');
				StringeeSoftPhone.connect(access_token2);
			});

			StringeeSoftPhone.on('beforeMakeCall', function (call, callType) {
				console.log('beforeMakeCall: ' + callType);
				
				StringeeSoftPhone.setLabelHtml('.info-name', 'Huy');
				
				return true;
			});

//			//neu ko dung video call thi ham nay ko can
//			StringeeSoftPhone.on('addlocalstream', function (stream) {
//				//console.log('addlocalstream: ', stream);
//				localVideo1.srcObject = null;
//				localVideo1.srcObject = stream;
//			});
//
//			//neu ko dung video call thi ham nay ko can
//			//neu ham nay co thi bat buoc phai set vao remoteVideo cua document nay
//			StringeeSoftPhone.on('addremotestream', function (stream) {
//				//console.log('addremotestream: ', stream);
//				remoteVideo1.srcObject = null;
//				remoteVideo1.srcObject = stream;
//			});

			StringeeSoftPhone.on('authen', function (res) {
				console.log('authen: ', res);
				if (res.r === 0){
//					StringeeSoftPhone.setLabelHtml('.top-bar-status', 'Dau Huy');
				}
			});

			StringeeSoftPhone.on('disconnect', function () {
				console.log('disconnected');
			});

			StringeeSoftPhone.on('signalingstate', function (state) {
				console.log('signalingstate', state);
			});

			//su kien click vao nut nghe cuoc goi
			StringeeSoftPhone.on('answerIncomingCallBtnClick', function () {
				console.log('answerIncomingCallBtnClick');
//				openPopupWindow(true);
			});

			//su kien click vao nut goi di
			StringeeSoftPhone.on('makeOutgoingCallBtnClick', function (fromNumber, toNumber, callType) {
				console.log('makeOutgoingCallBtnClick: fromNumber=' + fromNumber + ', toNumber=' + toNumber + ',callType=' + callType);
//				window.popupMustMakeOutgoingCallFrom = fromNumber;
//				window.popupMustMakeOutgoingCallTo = toNumber;
//				window.popupMustMakeOutgoingCallType = callType;
//				openPopupWindow(false);
			});
			
			StringeeSoftPhone.on('endCallBtnClick', function () {
				console.log('endCallBtnClick');
			});
			
			StringeeSoftPhone.on('callingScreenHide', function () {
				console.log('callingScreenHide');
			});

			StringeeSoftPhone.on('incomingCall', function (incomingcall) {
				console.log('incomingCall: ', incomingcall);
				StringeeSoftPhone.setLabelHtml('.info-name', 'Cuoc goi den tu Huy');
			});
			
			
			StringeeSoftPhone.on('declineIncomingCallBtnClick', function () {
				console.log('declineIncomingCallBtnClick');
			});
			
			StringeeSoftPhone.on('incomingScreenHide', function () {
				console.log('incomingScreenHide');
			});
			
			StringeeSoftPhone.on('customMessage', function (data) {
				console.log('customMessage', data);
			});
			
			StringeeSoftPhone.on('messageFromTopic', function (data) {
				console.log('messageFromTopic+++++++', data);
			});
			
			StringeeSoftPhone.on('transferCallBtnClick', function (stringeeCall) {
				console.log('transferCallBtnClick+++++++: ' + stringeeCall.callId);
			});
			
			StringeeSoftPhone.on('addParticipantBtnClick', function (stringeeCall) {
				console.log('addParticipantBtnClick+++++++: ' + stringeeCall.callId);
			});
			
			

			

//				StringeeSoftPhone.show('full');				
//				StringeeSoftPhone.config({fromNumbers: [{alias: 'Huy-1', number: '+1111'}, {alias: 'Huy-2', number: '+2222'}]});
			//}, 500);

//			StringeeSoftPhone.config({fromNumbers: [{alias: 'Huy2', number: '+22222'}]});



//			StringeeSoftPhone.show('full');

//			StringeeSoftPhone.config({arrowDisplay: 'bottom'});
		</script>

		<script>
			$(document).ready(function () {
				var a = localStorage.getItem("access_token2");
				if(!a){
					a = 'YOUR ACCESS TOKEN';
				}
				$('#access_token2').val(a);
				
				$('#connect-btn').on('click', function () {
					access_token2 = $('#access_token2').val();
					localStorage.setItem("access_token2", access_token2);
					
					//ket noi vao StringeeServer test
					StringeeSoftPhone._stringeeServerAddr = 'https://test3.stringee.com:6888';
					
					StringeeSoftPhone.connect(access_token2);
				});
				
				$('#make-call-btn').on('click', function () {
					StringeeSoftPhone.makeCall('84123456789', '84986776707', function (res) {
						console.log('res: ', res);
					});
				});

				$('#make-call-popup-btn').on('click', function () {
					//test
//					window.popupMustMakeOutgoingCallFrom = '84899199586';
					window.popupMustMakeOutgoingCallTo = '84909982668';
					window.popupMustMakeOutgoingCallType = 'callout';
					openPopupWindow(false);
				});

				$('#hangup-call-btn').on('click', function () {
					StringeeSoftPhone.hangupCall();
				});

				$('#disconnect-btn').on('click', function () {
					StringeeSoftPhone.disconnect();
				});

				$('#answer-btn').on('click', function () {
					StringeeSoftPhone.answerCall();
				});
				$('#show-hide-btn').on('click', function(){
					StringeeSoftPhone.show('full');
				});
			});
		</script>

		<div id="header">
			<button id="make-call-btn" class="channels-control">
				Make call
			</button>

			<button id="make-call-popup-btn" class="channels-control">
				Make call in new popup window
			</button>

			<button id="disconnect-btn" class="channels-control">
				Disconnect
			</button>

			<button id="answer-btn" class="channels-control">
				Answer
			</button>

			<button id="header-call-btn" class="channels-control">
				Call
			</button>


			<button id="hangup-call-btn" class="channels-control">
				Hangup
			</button>
			
			
			<button id="show-hide-btn" class="channels-control">
				Show
			</button>
		</div>

		<div class="wrap-video">
			<div class="video wrapLocalVideo">
				<video id="localVideo1" class="flex-item" playsinline="" autoplay="" muted=""></video>
				
				<!--<video id="remoteVideo" playsinline="" autoplay="" style="width: 100px"></video>-->

			</div>
			<div class="video wrapRemoteVideo">
				<video id="remoteVideo1" class="flex-item" playsinline="" autoplay="" style="width: 100px"></video>

			</div>
		</div>
		<div class="tool1">
			<button id="connect-btn" class="channels-control" tabindex="-1" data-ember-action="1866">
                Connect
            </button>
			<br/>
			<br/>
			<textarea id="access_token2" rows="4" cols="50">YOUR ACCESS TOKEN</textarea>
		</div>

	</body>
</html>
