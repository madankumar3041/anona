 var swiper = new Swiper('.swiper-container', {
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
});	