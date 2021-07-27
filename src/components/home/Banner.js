import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../store/home/homeAction';

export default function Banner() {
	const dispatch = useDispatch();
	const banners = useSelector((state) => state.home.banners);

	useEffect(() => {
		let formData = new FormData();
		formData.append('type', 'advertise');
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);

		dispatch(getBanners(formData));
	}, []);

	return (
		<div>
			<section class="banner-main">
				<div class="slideshow-container swiper-container">
					<div class="swiper-wrapper">
						{banners &&
							banners.length > 0 &&
							banners.map((banner) => (
								<div class="swiper-slide">
									<div class="slideshow-img">
										<img
											src={
												(banner &&
													banner.advertisement_image &&
													banner.advertisement_image.url) ||
												'assets/images/gradient_1920X.jpg'
											}
											alt="slide"
										/>
									</div>
									<div class="slideshow-contents">
										<div class="container">
											<div class="row">
												<div class="col-6">
													<h1>Nourishing With Healthy Food Choices </h1>
													<p>
														Nutrition Services is dedicated to bringing you and your family
														healthy,
													</p>
													<div class="knowmore-btn">
														<a href="javascript:void(0)" class="button">
															know more
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}

						{/* <div class="swiper-slide right-slide">
							<div class="slideshow-img">
								<img src="assets/slideshow/slide-2.jpg" alt="slide" />
							</div>
							<div class="slideshow-contents">
								<div class="container">
									<div class="row">
										<div class="col-6"> </div>
										<div class="col-6">
											<h1>Loss The Fat! Eat Right, Be Bright!</h1>
											<p>
												Nutrition Services is dedicated to bringing you and your family healthy.
											</p>
											<div class="knowmore-btn">
												<a href="javascript:void(0)" class="button">
													know more
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="slideshow-img">
								<img src="assets/slideshow/slide-3.jpg" alt="slide" />
							</div>
							<div class="slideshow-contents">
								<div class="container">
									<div class="row">
										<div class="col-6">
											<h1>Healthier Choices For a Healthier You.</h1>
											<p>
												Nutrition Services is dedicated to bringing you and your family healthy,
												delicious food options whenever you're at one of our locations.
											</p>
											<div class="knowmore-btn">
												<a href="javascript:void(0)" class="button">
													know more
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</div>
					<div class="swiper-pagination"></div>
					<div class="swiper-button-prev slideshow-button-prev"></div>
					<div class="swiper-button-next slideshow-button-next"></div>
				</div>
			</section>
		</div>
	);
}
