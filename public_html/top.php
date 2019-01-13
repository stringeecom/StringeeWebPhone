<!--  TOP BAR -->
<section class="wrap-top-bar height-40 position-absolute top-0 width-100-percent">
    <div class="top-bar-status color-red">
        Chưa kết nối
    </div>

    <div class="text-center top-bar-title">
        CONTACT
    </div>

    <div class="wrap-action-top-right float-right mr position-absolute right-15 top-10">
        <div class="wrapper-dropdown wrapper-dropdown-call">
            <div id="dropdown-option-call" class="wrapper-dropdown-3" tabindex="1">
                <span id="routingTypeLabelActived"><img src="<?=BASE_URL?>images/icon-browser.png" class="icon-option-active"
                        title="Đổ cuộc gọi đến app và sipphone" /></span>
                <ul class="dropdown">
                    <li data-value="1"><a href="javascript:void(0)"><img src="<?=BASE_URL?>images/icon-browser.png"
                                class="icon-option" title="Đổ cuộc gọi đến app và sipphone" />Đổ cuộc gọi đến app và
                            sipphone</a></li>
                    <li data-value="2"><a href="javascript:void(0)"><img src="<?=BASE_URL?>images/icon-phone.png" class="icon-option"
                                title="Đổ cuộc gọi đến số điện thoại" />Đổ cuộc gọi đến số điện thoại</a></li>
                    <li data-value="3"><a href="javascript:void(0)"><img src="<?=BASE_URL?>images/icon-app.png" class="icon-option"
                                title="Đổ cuộc gọi đến app" />Đổ
                            cuộc gọi đến app</a></li>
                    <li data-value="4"><a href="javascript:void(0)"><img src="<?=BASE_URL?>images/icon-ipphone.png"
                                class="icon-option" title="Đổ cuộc gọi đến ipphone" />Đổ cuộc gọi đến ipphone</a></li>
                </ul>
            </div>
            ​
        </div>
        <button id="btnMinimize" class="btn-minimize border-none bg-transparent" title="Minimize">
            <img src="<?=BASE_URL?>images/icon-minimize.svg">
        </button>
        <button id="btnCloseIframe" class="btn-minimize border-none bg-transparent display-none" title="Close">
            <img src="<?=BASE_URL?>images/icon-close-no-border.svg" />
        </button>
    </div>

</section>
<!--  END TOP BAR  -->