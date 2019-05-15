(function ($) {
    $(function () {
        $(".show-on-map").on('click', function() {
            const $parent = $(this).parents('.item-js');
            $parent.find(".show-on-map__text-open").toggleClass("hidden");
            $parent.find(".show-on-map__text-close").toggleClass("show");
            $parent.find(".btn-tariff").toggleClass("hidden");
            $parent.find(".btn-tariff-close").toggleClass("show");
            $parent.find(".tariffs-city-map").toggleClass("show");
        });

        $(document).on('click', ".tariffs-rules", function() {
            if($('.taxi-wrapper-rules').length > 0) {
                $(".service-provider").slideToggle();

                setTimeout(function(){
                    $(".taxi-wrapper").toggleClass("taxi-wrapper-rules");
                }, 500);

            } else {
                $(".taxi-wrapper").toggleClass("taxi-wrapper-rules");
                $(".service-provider").slideToggle();

            }
          $(".tariffs-rules__text").toggleClass("hidden");
          $(".tariffs-rules__text-close").toggleClass("show-flex");
        });
    });
})(jQuery);
