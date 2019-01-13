<!-- PAGE DIAPAD -->
<section id="page-diapad" class="page">
    <div class="wrap-typing-number pl-15 pr-15 mt-10 mb-30 display-flex justify-content-space-between">
        <input type="text" value="" placeholder="+84966050926" class="font-size-24 color-black border-none" />
        <button class="btn-close border-none bg-transparent">
            <img src="<?=BASE_URL?>images/icon-close.svg" />
        </button>
    </div>
    <div class="wrap-diapad mb-10">
        <div class="diapad-row">
            <button class="diapad-key" id="diapad-key-1">
                <span class="diapad-key-number">
                    1
                </span>
                <span class="diapad-key-text">

                </span>
            </button>
            <button class="diapad-key" id="diapad-key-2">
                <span class="diapad-key-number">
                    2
                </span>
                <span class="diapad-key-text">
                    ABC
                </span>
            </button>
            <button class="diapad-key" id="diapad-key-3">
                <span class="diapad-key-number">
                    3
                </span>
                <span class="diapad-key-text">
                    DEF
                </span>
            </button>
        </div>
        <div class="diapad-row">
            <button class="diapad-key" id="diapad-key-4">
                <span class="diapad-key-number">
                    4
                </span>
                <span class="diapad-key-text">
                    GHI
                </span>
            </button>
            <button class="diapad-key" id="diapad-key-5">
                <span class="diapad-key-number">
                    5
                </span>
                <span class="diapad-key-text">
                    JKL
                </span>
            </button>
            <button class="diapad-key" id="diapad-key-6">
                <span class="diapad-key-number">
                    6
                </span>
                <span class="diapad-key-text">
                    MNO
                </span>
            </button>
        </div>
        <div class="diapad-row">
            <button class="diapad-key" id="diapad-key-7">
                <span class="diapad-key-number">
                    7
                </span>
                <span class="diapad-key-text">
                    PQRS
                </span>
            </button>
            <button class="diapad-key" id="diapad-key-8">
                <span class="diapad-key-number">
                    8
                </span>
                <span class="diapad-key-text">
                    TUV
                </span>
            </button>
            <button class="diapad-key" id="diapad-key-9">
                <span class="diapad-key-number">
                    9
                </span>
                <span class="diapad-key-text">
                    WXYZ
                </span>
            </button>
        </div>
        <div class="diapad-row">
            <button class="diapad-key" id="diapad-key-star">
                <span class="diapad-key-number">
                    *
                </span>
                <span class="diapad-key-text">

                </span>
            </button>
            <button class="diapad-key" id="diapad-key-0">
                <span class="diapad-key-number">
                    0
                </span>
                <span class="diapad-key-text" style="font-size: 18px;">
                    <span>
                        <!-- + -->
                    </span>
                </span>
            </button>
            <button class="diapad-key" id="diapad-key-sharp">
                <span class="diapad-key-number">
                    #
                </span>
                <span class="diapad-key-text">

                </span>
            </button>
        </div>
    </div>

    <div class="wrap-call-using-dropdown position-relative display-none">
        <div id="list-from-numbers" class="call-using-dropdown box-shadow3 border-radius-8 bg-white">
            <!--			<div class="call-using-dropdown-item cursor-pointer p-15 pt-10 pb-10">
				<div>
					<span class="call-using-text-name display-block">Number 1</span>
					<span class="call-using-text-phone display-block">+84899199586</span>
				</div>
			</div>-->
        </div>

        <div class="icon-dropdown right-40">
        </div>
    </div>

    <div class="wrap-call-using pl-20 pr-20 position-relative cursor-pointer">
        <div class="call-using-text mb-5">
            Sử dụng số
        </div>
        <div class="call-using-select p-15 display-flex justify-content-space-between">
            <div>
                <span id="from-number-callout-alias" class="call-using-text-name display-block">Number 1</span>
                <span id="from-number-callout" class="call-using-text-phone display-block">+84899199586</span>
            </div>
            <img src="<?=BASE_URL?>images/icon-dropdown.svg" />
        </div>
    </div>
</section>
<!-- END PAGE DIAPAD --->