import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPackages } from '../../store/home/homeAction';

export default function SelectPlan() {
	const dispatch = useDispatch();
	const packages = useSelector((state) => state.home.packages);

	useEffect(() => {
		let formData = new FormData();
		formData.append('type', 'advertise');
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);

		dispatch(getPackages(formData));
	}, []);

	return (
		<div>
			<section class="section-main">
				<div class="container-fluid">
					<div class="row">
						<div class="col-12 text-center">
							<h1>
								{' '}
								{localStorage.getItem('ls_langauge_id') == 1 ? 'Select a Plan' : 'اختر وعدل خطتك'}{' '}
							</h1>
						</div>
					</div>
					<div class="row package-main">
						{packages &&
							packages.length > 0 &&
							packages.map((pack) => (
								<div class="col-lg-4 col-md-4 col-sm-6 category-column">
									<div class="package-thumb">
										<div class="package-img img-contain">
											<img
												src={pack.img_url || 'assets/images/lifestyle.svg'}
												alt="bulk-package"
											/>
										</div>
										<h2>{pack.package_name}</h2>
										<div class="package-btns">
											<Link to={`/menu/${pack.package_master_id}`} class="button" style={{marginBottom:"8px"}}>
												{localStorage.getItem('ls_langauge_id') == 1 ? 'Menu Preview' : 'استكشف القائمة ، أنشئ خطة'}
											</Link>
											<Link to={`/package/${pack.package_master_id}`} class="button button-dark">
												{localStorage.getItem('ls_langauge_id') == 1 ? 'Create a Plan' : 'اختر وعدل خطتك'}
											</Link>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</section>
		</div>
	);
}
