<!--  PAGE INCOMMING CALL  -->
<section id="page-incomming-call" class="page display-none">
    <div class="incomming-call-info box-shadow1 border-radius-18 bg-gradient-purple overflow-hidden mb-20">
        <div class="wrap-info-text bg-white pt-20 pb-20">
            <section class="wrap-status p-l-r-20 top-0 position-relative display-flex ">
                <div class="wrap-status-text line-height-30">
                    <span class="status-text">Currently in call..</span>
                    <div class="line-red-short"></div>
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
        </div>
        <section class="wrap-background bg-gradient-purple height-350 width-100-percent">
            <div class="wrap-avatar-round text-center">
                <img src="<?= BASE_URL ?>images/avatar.png" class="mt-50"/>
            </div>
        </section>
    </div>
    <div class="incomming-call-action display-flex justify-content-space-between">
        <button id="btn-incomming-decline" class="btn-action-incomming btn-round btn-red btn-size-55 display-table-cell border-none">
            <img src="<?= BASE_URL ?>images/icon-phone.svg" class="icon" style="transform: rotate(135deg)" />
        </button>
        <img src="<?= BASE_URL ?>images/icon-dotted-end.svg" />
        <img src="<?= BASE_URL ?>images/icon-dotted-call.svg" />
        <button id="btn-incomming-accept" class="btn-action-incomming btn-round btn-green btn-size-55 display-table-cell border-none">
            <img src="<?= BASE_URL ?>images/icon-phone.svg" class="icon" />
        </button>
    </div>
</section>
<!-- END PAGE INCOMMING CALL -->