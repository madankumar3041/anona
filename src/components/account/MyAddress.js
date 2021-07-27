import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAreaList, addAddress, getAddress } from '../../store/home/homeAction';
import { Link } from 'react-router-dom';
import Address from '../modals/Address';

const MyAddress = () => {
	const dispatch = useDispatch();
	const [openAddressModal, setOpenAddressModal] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState('');

	const address = useSelector((state) => state.home.address);

	const onCloseAddressModal = () => setOpenAddressModal(false);
	const onOpenAddressModal = () => setOpenAddressModal(true);

	useEffect(() => {
		onGetAddress();
		onGetAreaList();
	}, []);

	const onGetAddress = () => {
		let formData = new FormData();
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getAddress(formData));
	};

	const onGetAreaList = () => {
		let formData = new FormData();
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getAreaList(formData));
	};

	const logout = () => {
		localStorage.clear();
		localStorage.setItem('ls_langauge_id', 1);
		window.location.href = '#/';
	};

	return (
		<div>
			<section class="section-main innerpages">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-8 col-md-8 col-sm-12 text-center">
							<h1>
								{localStorage.getItem('ls_langauge_id') == 1 ? 'My Address' : 'عنوان التوصيل الخاص بي '}
							</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-8 col-md-8 col-sm-7">
							<div className="package-box">
								<div class="address-sub-div">
									<h3>
										{localStorage.getItem('ls_langauge_id') == 1
											? 'Delivery Address '
											: ' عنوان التسليم'}{' '}
										<a
											onClick={() => onOpenAddressModal()}
											data-fancybox
											class="button change-btn text-white float-right btn-sm"
										>
											{localStorage.getItem('ls_langauge_id') == 1 ? 'Add Address ' : ' يتغيرون'}
										</a>
									</h3>

									<div class="row m-0 w-100">
										{address &&
											address.map((address) => (
												<div class="col-lg-12 col-md-12 col-sm-12 left-faq p-0">
													<a class="faq-link" onClick={() => setSelectedAddress(address)}>
														{address.address_type}
													</a>
													{selectedAddress.address_id === address.address_id ? (
														<div class="faq-contents d-block">
															{address.area !== '' && (
																<div class="profiledata">
																	<div class="row">
																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>Governate</label>
																				<p>
																					{address.area &&
																						address.area.city_name}
																				</p>
																			</div>
																		</div>
																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>Area</label>
																				<p>
																					{address.area &&
																						address.area.area_name}
																				</p>
																			</div>
																		</div>
																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>Block</label>
																				<p>{address.block}</p>
																			</div>
																		</div>
																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>Street </label>
																				<p>{address.street}</p>
																			</div>
																		</div>
																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>Avenue</label>
																				<p>{address.avenue}</p>
																			</div>
																		</div>
																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>Flat No</label>
																				<p>{address.flat_no}</p>
																			</div>
																		</div>
																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>House No</label>
																				<p>{address.house_number}</p>
																			</div>
																		</div>

																		<div class="col-lg-6 col-md-6 col-sm-12">
																			<div class="form-group">
																				<label>Directions</label>
																				<p>{address.directions}</p>
																			</div>
																		</div>
																	</div>

																	<a
																		onClick={() =>
																			onOpenAddressModal(address.address_id)
																		}
																		data-fancybox
																		class="button change-btn py-1 px-2 mt-3 text-white"
																	>
																		Change
																	</a>
																</div>
															)}
														</div>
													) : (
														<div class="faq-contents"></div>
													)}
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-4 col-md-4 col-sm-5 rightside">
							<div class="package-box">
								<div class="account-main">
									{/* <!--<a href="javascript:void(0);" class="account-link"><img src="images/user.svg" alt="user"/></a>--> */}
									<div class="dashboard-div">
										<ul class="dashboard-ul">
											<li>
												<Link to="/dashboard">
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Dashboard'
														: 'لوحة القيادة'}
												</Link>
											</li>
											<li>
												<Link to="/profile">
													{' '}
													{localStorage.getItem('ls_langauge_id') == 1
														? 'My Profile'
														: 'ملفي'}
												</Link>
											</li>
											<li>
												<Link to="/address" class="active">
													{' '}
													{localStorage.getItem('ls_langauge_id') == 1
														? 'My Address'
														: ' عنوان التوصيل الخاص بي'}
												</Link>
											</li>
											<li>
												<Link to="/change-password">
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Change Password'
														: '  تغيير كلمة المرور  '}
												</Link>
											</li>
											<li>
												<a href="javascript:void(0);" onClick={logout}>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Logout'
														: '  تسجيل الخروج '}
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Address open={openAddressModal} onCloseModal={onCloseAddressModal} address={selectedAddress} />
		</div>
	);
};
export default MyAddress;
