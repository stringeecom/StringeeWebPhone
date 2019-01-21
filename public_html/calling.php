<!-- PAGE CALLING  -->
<section id="page-calling" class="page display-none">
    <section class="wrap-status p-l-r-20 top-0 position-relative display-flex">
        <div class="wrap-status-text line-height-30">
            <span class="status-text">Currently in call..</span>
            <div class="line-red-short"></div>
        </div>
        <div class="wrap-status-time line-height-30 position-absolute right-0">
            <span class="status-time"> </span>
        </div>
    </section>

    <section class="wrap-info p-20">
        <div class="info-name pb-10">
            Pattrick Penna
        </div>
        <div class="wrap-location">
            <span class="location-via">thông qua</span>
            <span class="location-text">Vietnam</span>
        </div>
    </section>

    <div class="line-dotted"></div>

    <section class="wrap-action display-flex justify-content-space-between">
        <button id="btnMic" class="action-call text-center flex-basis p-10 bg-white border-none">
            <img class="icon" src="<?=BASE_URL?>images/icon-mic.svg" />
            <img class="icon-on display-none" src="<?=BASE_URL?>images/icon-mic-off.svg" />
        </button>
        <button id="btnHold" class="action-call text-center flex-basis p-10 bg-white border-none">
            <img class="icon" src="<?=BASE_URL?>images/icon-pause.svg" />
            <img class="icon-on display-none" src="<?=BASE_URL?>images/icon-pause-red.svg">
        </button>
        <button id="btnKeypadInCall" class="action-call text-center flex-basis p-10 bg-white border-none">
            <img src="<?=BASE_URL?>images/icon-pad-gray.svg" />
        </button>
        <button id="btnTransfer" class="action-call text-center flex-basis p-10 bg-white border-none">
            <img src="<?=BASE_URL?>images/icon-back.svg" />
        </button>
        <button id="btnAddToCall" class="action-call text-center flex-basis p-10 bg-white border-none">
            <img src="<?=BASE_URL?>images/icon-add-to-call.svg">
        </button>
        <!--        <button id="btnMore" class="action-call text-center flex-basis p-10 bg-white border-none position-relative">
            <img src="<?=BASE_URL?>images/icon-more.svg" />
            <span class="drop-down-action display-none">
                <span class="drop-down-rectangle"></span>
                <ul>
                    <li>
                        <img src="<?=BASE_URL?>images/icon-assign-call.svg" class="icon" />
                        <img src="<?=BASE_URL?>images/icon-assign-call-purple.svg" class="icon-hover display-none" />
                        <span>Assign this call</span>
                    </li>
                    <li>
                        <img src="<?=BASE_URL?>images/icon-add-tag.svg" class="icon" />
                        <img src="<?=BASE_URL?>images/icon-add-tag-purple.svg" class="icon-hover display-none" />
                        <span>Add a tag</span>
                    </li>
                    <li>
                        <img src="<?=BASE_URL?>images/icon-comment.svg" class="icon" />
                        <img src="<?=BASE_URL?>images/icon-comment-purple.svg" class="icon-hover display-none" />
                        <span>Add a comment</span>
                    </li>
                </ul>
            </span>
        </button>-->
    </section>

    <section class="wrap-background bg-gradient-purple height-350 width-100-percent">
        <div class="wrap-avatar-round text-center">
            <img src="<?=BASE_URL?>images/avatar.png" class="mt-80" />
        </div>
    </section>
    <section class="wrap-diapad-when-calling display-none">
        <div class="wrap-typing-number pl-15 pr-15 mt-10 mb-10 display-flex justify-content-space-between">
            <input type="text" value="" placeholder="*101#" class="font-size-24 color-black border-none" />
            <button class="btn-close border-none bg-transparent">
                <img src="<?=BASE_URL?>images/icon-close.svg" />
            </button>
        </div>
        <div class="wrap-diapad mb-20 diapad-size-medium">
            <div class="diapad-row">
                <button class="diapad-key" id="diapad-key-dtmf-1">
                    <span class="diapad-key-number">
                        1
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-2">
                    <span class="diapad-key-number">
                        2
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-3">
                    <span class="diapad-key-number">
                        3
                    </span>

                </button>
            </div>
            <div class="diapad-row">
                <button class="diapad-key" id="diapad-key-dtmf-4">
                    <span class="diapad-key-number">
                        4
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-5">
                    <span class="diapad-key-number">
                        5
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-6">
                    <span class="diapad-key-number">
                        6
                    </span>

                </button>
            </div>
            <div class="diapad-row">
                <button class="diapad-key" id="diapad-key-dtmf-7">
                    <span class="diapad-key-number">
                        7
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-8">
                    <span class="diapad-key-number">
                        8
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-9">
                    <span class="diapad-key-number">
                        9
                    </span>

                </button>
            </div>
            <div class="diapad-row">
                <button class="diapad-key" id="diapad-key-dtmf-star">
                    <span class="diapad-key-number">
                        *
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-0">
                    <span class="diapad-key-number">
                        0
                    </span>

                </button>
                <button class="diapad-key" id="diapad-key-dtmf-sharp">
                    <span class="diapad-key-number">
                        #
                    </span>

                </button>
            </div>
        </div>
    </section>
</section>
<!-- END PAGE CALLING  -->