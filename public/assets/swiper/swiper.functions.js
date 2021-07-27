var swiperabout = new Swiper('.categories-container', {
		slidesPerView:6,
		slidesPerColumn:1,
		speed:1000,
		spaceBetween:0,
		// Responsive breakpoints
		breakpoints: {
			// when window width is <= 320px
			320: {
				slidesPerView:3
			},
			// when window width is <= 480px
			480: {
				slidesPerView:3
			},
			// when window width is <= 640px
			640: {
				slidesPerView:4
			}
		},
		pagination:{
			el:'.categories-pagination',
			clickable:true,
		  },
		navigation: {
			nextEl: '.categories-button-next',
			prevEl: '.categories-button-prev',
		},
	}); 
	var swiperarriaval = new Swiper('.arriaval-container', {
		slidesPerView:4,
		slidesPerColumn:1,
		speed: 1000,
		spaceBetween:20,
		// Responsive breakpoints
		breakpoints: {
			479: {
				slidesPerView:2,
				spaceBetween:0,
			},
			// when window width is <= 480px
			480: {
				slidesPerView:2,
				spaceBetween:0,
			},
			// when window width is <= 640px
			640: {
				slidesPerView:3,
				spaceBetween:0,
			},
			780: {
				slidesPerView:3,
				spaceBetween:0,
			},
			1024: {
				slidesPerView:4,
				spaceBetween:10,
			},
			1280: {
				slidesPerView:4
			}
		},
		navigation: {
			nextEl: '.arriaval-button-next',
			prevEl: '.arriaval-button-prev',
		},
		on: {
			init: function () {
				//$('.guest-icon').css({'height':$('.guest-icon').width()});
			},
		}
	});
	var swipertopsellers = new Swiper('.topsellers-container', {
		slidesPerView:4,
		slidesPerColumn:1,
		speed: 1000,
		spaceBetween:30,
		// Responsive breakpoints
		breakpoints: {
			479: {
				slidesPerView:2,
				spaceBetween:0,
			},
			// when window width is <= 480px
			480: {
				slidesPerView:2,
				spaceBetween:0,
			},
			// when window width is <= 640px
			640: {
				slidesPerView:3,
				spaceBetween:0,
			},
			780: {
				slidesPerView:3,
				spaceBetween:0,
			},
			1024: {
				slidesPerView:4,
				spaceBetween:10,
			},
			1280: {
				slidesPerView:4
			}
		},
		navigation: {
			nextEl: '.topsellers-button-next',
			prevEl: '.topsellers-button-prev',
		},
		on: {
			init: function () {
				//$('.guest-icon').css({'height':$('.guest-icon').width()});
			},
		}
	});
	var productdetailPageswiper = new Swiper('.productdetail-container', {
		slidesPerView:1,
		navigation: {
			nextEl: '.productdetail-button-next',
			prevEl: '.productdetail-button-prev',
		}
	});
	var swiperListing = new Swiper('.listing-container', {
      pagination: {
        el: '.listing-pagination',
		  clickable:true,
      },
    });
 var swiperVertical = new Swiper('.vertical-container', {
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