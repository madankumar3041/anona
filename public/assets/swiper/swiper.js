var swiperweek = new Swiper('.week-container', {
	slidesPerView:6,
	slidesPerColumn:1,
	speed:1000,
	spaceBetween:10,
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
		768: {
			slidesPerView:4
		},
		1024: {
			slidesPerView:4
		},
		1280: {
			slidesPerView:5
		},
		1366: {
			slidesPerView:5
		}
	},
	navigation: {
		nextEl: '.week-button-next',
		prevEl: '.week-button-prev',
	},
});
var swiperweek1 = new Swiper('.week1-container', {
	slidesPerView:6,
	slidesPerColumn:1,
	speed:1000,
	spaceBetween:10,
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
		768: {
			slidesPerView:4
		},
		1024: {
			slidesPerView:5
		},
		1280: {
			slidesPerView:5
		},
		1366: {
			slidesPerView:6
		}
	},
	navigation: {
		nextEl: '.week1-button-next',
		prevEl: '.week1-button-prev',
	},
});
var swiperweek2 = new Swiper('.week2-container', {
	slidesPerView:6,
	slidesPerColumn:1,
	speed:1000,
	spaceBetween:10,
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
		768: {
			slidesPerView:4
		},
		1024: {
			slidesPerView:5
		},
		1280: {
			slidesPerView:5
		},
		1366: {
			slidesPerView:6
		}
	},
	navigation: {
		nextEl: '.week2-button-next',
		prevEl: '.week2-button-prev',
	},
});