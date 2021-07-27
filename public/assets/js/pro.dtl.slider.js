$(function(){
	setTimeout(function(){
		var productdetailswiper = new Swiper('.productdetail-container', {
		slidesPerView:1,
		  navigation: {
			nextEl: '.productdetail-button-next',
			prevEl: '.productdetail-button-prev',
		  },
		});

	},1000);
});

