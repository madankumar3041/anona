import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWhyUs } from '../../store/home/homeAction';

export default function CustomersFeedbacks() {
	const dispatch = useDispatch();
	const whyUs = useSelector((state) => state.home.whyUs);

	useEffect(() => {
		let formData = new FormData();
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getWhyUs(formData));
	}, []);

	useEffect(() => {
		console.log(whyUs);
	}, [whyUs]);

	return (
		<div>
			<section class="section-main why-choose-us">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12 text-center">
							<h1>
								{' '}
								{localStorage.getItem('ls_langauge_id') == 1
									? 'Why customers choose us'
									: 'التزامنا تجاهك. كل يوم.'}{' '}
							</h1>
						</div>
					</div>
					<div class="row package-main align-items-end">
						<div class="col-lg-5 col-md-5 col-sm-6 why-choose-img">
							<div class="package-img full">
								<img src={whyUs && whyUs.image && whyUs.image.url} alt="bulk-package" />
							</div>
						</div>
						<div class="col-lg-7 col-md-7 col-sm-12 why-choose-column">
							<div
								class="why-choose-us-text"
								dangerouslySetInnerHTML={{ __html: whyUs && whyUs.content }}
							></div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
