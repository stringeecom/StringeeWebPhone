<!DOCTYPE html>
<html>
    <head>
        <title>SOFTPHONE CLOUND</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

		<?
		include_once '../config.php';
		
		//build CSS===================================================== ==>
		$file1 = file_get_contents('css/reset.css');
		$file2 = file_get_contents('css/util.css');
		$file3 = file_get_contents('css/style.css');

		$all = $file1 . "\r\n" . $file2 . "\r\n" . $file3;

		$fp1 = fopen('css/all-style-' . VERSION . '.css', 'w');
		fwrite($fp1, $all);
		//build CSS===================================================== <==
		?>

		<link href="<?=BASE_URL?>css/all-style-<?=VERSION?>.css" rel="stylesheet" type="text/css"/>

		<style>
			#btnToolCall.btn-red:disabled, #btnToolCall.btn-red[disabled] {
				background: linear-gradient(262.92deg, #94343a 6.49%, #94343a 108.73%);
			}

			#btn-incomming-decline:disabled, #btn-incomming-decline[disabled]{
				background: linear-gradient(262.92deg, #94343a 6.49%, #94343a 108.73%);
			}

			#btn-incomming-accept:disabled, #btn-incomming-accept[disabled]{
				background: linear-gradient(262.92deg, #336b25 6.49%, #336b25 108.73%);
			}

			#btnToolCall.btn-green:disabled, #btnToolCall.btn-green[disabled]{
				background: linear-gradient(262.92deg, #40882f 6.49%, #40882f 108.73%);
			}

			.top-bar-title {
				font-size: 14px !important;
			}

			.min-no-calls {
				color: #525252;
				width: 176px;
				text-align: center;
				padding-top: 3px;
			}
		</style>

		<?
		//build JS===================================================== ==>
		$file1 = file_get_contents('js/socket.io-2.1.1.js');
		$file2 = file_get_contents('js/StringeeSDK-1.5.8.js');
		$file3 = file_get_contents('js/jquery-3.1.0.min.js');
		$file4 = file_get_contents('js/StringeePhone_CallProcess.js');
		$file5 = file_get_contents('js/StringeePhone_UI.js');

		$all = $file1 . "\r\n"
				. $file2 . "\r\n"
				. $file3 . "\r\n"
				. $file4 . "\r\n"
				. $file5 . "\r\n";

		$fp1 = fopen('js/all-js-' . VERSION . '.js', 'w');
		fwrite($fp1, $all);
		//build JS===================================================== <==
		?>

		<script type="text/javascript" src="<?= BASE_URL ?>js/all-js-<?=VERSION?>.js"></script>

    </head>
    <body>
        <div id="stringee_clound" class="overflow-hidden">

			<div id="app-minimize" class="cursor-pointer">
                <div class="wrap-info-minimize display-flex justify-content-space-between font-size-16">
                    <div class="time bg-pink border-radius-16 color-white display-none">00:28</div>
                    <div class="line-vertical display-none"></div>
                    <div class="phone line-height-26 display-none">0966050828</div>

					<div class="min-no-calls">No calls</div>
                </div>
            </div>

            <div id="app">
				<?php include 'top.php'; ?>

				<?php include 'calling.php'; ?>

				<?php include 'incoming_call.php'; ?>

				<?php include 'dialpad.php'; ?>

				<?php include 'contact.php'; ?>

				<?php include 'activity.php'; ?>

				<?php include 'footer.php'; ?>
				
				<?php include 'select_call_type.php'; ?>
            </div>

			<audio preload="auto" id="ringtonePlayer" playsinline style="width: 1px" src="<?= BASE_URL ?>Antique-Phone5.mp3"></audio>

			<video id="remoteVideo" playsinline autoplay style="width: 1px"></video>
        </div>
    </body>
</html>
