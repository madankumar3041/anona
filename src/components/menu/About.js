import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs } from '../../store/home/homeAction';

export default function About() {
	const dispatch = useDispatch();

	const aboutUs = useSelector((state) => state.home.aboutUs);
	console.log(aboutUs);

	useEffect(() => {
		const formData = new FormData();
		formData.append('lang_id', 1);

		dispatch(getAboutUs(formData));
	}, [dispatch]);
	return (
		<div>
			<div class="main" id="main">
				<section class="section-main innerpages">
					<div class="container-fluid">
						<div class="row">
							<div class="col-12 text-center">
								<h1>{localStorage.getItem('ls_langauge_id') == 1 ? 'About Us' : ' معلومات عنا '}</h1>
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<figure class="inner-img">
									<img src="assets/images/lifestyle.svg" alt="lifestyle" />
								</figure>
								<p dangerouslySetInnerHTML={{ __html: aboutUs && aboutUs.content }}></p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
