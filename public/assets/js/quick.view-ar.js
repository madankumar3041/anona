/*$(document).ready(function(){
	"use strict";
	$('.quick-view-addtocart').on('click', function(){
		$('.product-detail').addClass('moveleft');
	 	$('.quick-view-addcart-main').addClass('show-added-cart');
    });
	$('.minusBtn').click(function(){
		no_of_bottle = parseInt($(this).parent('.plus-minus').find('.noValue').val());		
		if(no_of_bottle > 1){
			no_of_bottle = no_of_bottle - 1;
			$(this).parent('.plus-minus').find('.noValue').val(no_of_bottle);
		}
	});
	$('.plusBtn').click(function(){
		no_of_bottle =  parseInt($(this).parent('.plus-minus').find('.noValue').val());
		no_of_bottle = no_of_bottle + 1;
		$(this).parent('.plus-minus').find('.noValue').val(no_of_bottle);
	});
	$(".noValue").on("keypress keyup blur",function (event) {
		"use strict";
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
		if ((event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
	});
});*/
setTimeout(function(){
	//swiperVertical.update();
	/* var swiperVertical = new Swiper('.vertical-container', {
	  direction: 'vertical',
	  pagination: {
		el: '.swiper-pagination',
		clickable: true,
	  },
	 navigation: {
			nextEl: '.vertical-button-next',
			prevEl: '.vertical-button-prev',
		},
		on: {
			init: function () {
				//$('.guest-icon').css({'height':$('.guest-icon').width()});
			},
		}
	});*/
	$('.qv-addtocart').on('click', function () {
		$('.cart-link').trigger('click');
        cart = $('.shoppingcart-main');
		top_position_cart=cart.height()/3;
        imgtodrag = $('.producy-detail-right').find(".pro-holder img").eq(0);
        if (imgtodrag) {
            imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            }).css({
                'opacity':'1',	
				'position':'absolute',
				'width':imgtodrag.width(),
				'z-index':'999'
            })
			.appendTo($('body'))
			.animate({
                'top':cart.offset().top+top_position_cart,
				'left':0,
				'width':cart.width()
            }, 1000 );
            imgclone.animate({
                'opacity':0
            },function(){
                $(this).detach();
				setTimeout(function(){
					$('.cart-link').trigger('click');
				},10)
            });
        }
		setTimeout(function(){
			$.fancybox.close();
		},300)
    });
	jQuery('button').blur();
},500)