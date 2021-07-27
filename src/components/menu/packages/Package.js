import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPackageDetails,
	getDeliveryTimeList,
	getDeliveryMethod,
	getAreaList,
	addAddress,
	getAddress,
	purchasePackage,
	getEndDate,
	CouponCode,
} from '../../../store/home/homeAction';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Address from '../../modals/Address';
import Login from '../../modals/Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			class={`swiper-button-prev week-button-prev`}
			style={{ ...style, display: 'block', left: '-50px' }}
			onClick={onClick}
		></div>
	);
}

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			class={`swiper-button-next week-button-next`}
			style={{ ...style, display: 'block', right: '-50px' }}
			onClick={onClick}
		></div>
	);
}

export default function Package({ match, history }) {
	const dispatch = useDispatch();
	const packageDetails = useSelector((state) => state.home.packageDetails);
	const deliveryTimeList = useSelector((state) => state.home.deliveryTimeList);
	const areaList = useSelector((state) => state.home.areaList);
	const deliveryMethod = useSelector((state) => state.home.deliveryMethod);
	const address = useSelector((state) => state.home.address);
	const endDate = useSelector((state) => state.home.endDate);
	const couponDetails = useSelector((state) => state.home.couponDetails);

	console.log(couponDetails)
	const [selectedDay, setSelectedDay] = useState('');
	const [selectedPlanList, setSelectedPlanList] = useState('');
	const [selectedSubPackage, setSelectedSubPackage] = useState('');
	const [weekDays, setWeekDays] = useState('');
	const [startDate, setStartDate] = useState('');
	const [selectedAddress, setSelectedAddress] = useState('');
	const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('');
	const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('knet');

	const [openAddressModal, setOpenAddressModal] = useState(false);
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const onOpenAddressModal = (id) => {
		if (!localStorage.getItem('ls_login')) {
			onOpenLoginModal();
			return false;
		}

		if (id) {
			setOpenAddressModal(true);
		} else {
			setSelectedAddress({});
			setOpenAddressModal(true);
		}
	};
	const onCloseAddressModal = () => setOpenAddressModal(false);
	const onOpenLoginModal = () => setOpenLoginModal(true);
	const onCloseLoginModal = () => setOpenLoginModal(false);

	useEffect(() => {
		onGetPackageDetails();
		onGetDeliveryTimeList();
		onGetDeliveryMethod();
		onGetAreaList();
		onGetAddress();
		getWeekDays();
	}, [history]);

	useEffect(() => {
		setSelectedDeliveryTime(deliveryTimeList && deliveryTimeList?.[0].timeid);

		console.log(deliveryTimeList && deliveryTimeList?.[0]?.timeid)
	}, [deliveryTimeList]);
	useEffect(() => {
		setSelectedDay(packageDetails && packageDetails.sub_package_list[0].package_for_id);
		setSelectedPlanList(packageDetails && packageDetails.sub_package_list[0]);
		setSelectedSubPackage(packageDetails && packageDetails.sub_package_list[0].sub_packages[0]);

		calculateEndDate(packageDetails && packageDetails.sub_package_list[0].package_for_id);
	}, [packageDetails]);

	const onGetPackageDetails = () => {
		let formData = new FormData();
		formData.append('package_id', match.params.package_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getPackageDetails(formData));
	};
	const onGetDeliveryTimeList = () => {
		let formData = new FormData();
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getDeliveryTimeList(formData));
	};
	const onGetDeliveryMethod = () => {
		let formData = new FormData();
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getDeliveryMethod(formData));
	};
	const onGetAreaList = () => {
		let formData = new FormData();
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getAreaList(formData));
	};
	const onGetAddress = () => {
		let formData = new FormData();
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getAddress(formData));
	};

	const onSelectDays = (id) => {
		var sub_package_list = packageDetails.sub_package_list;
		for (let i = 0; i < sub_package_list.length; i++) {
			if (id === sub_package_list[i].package_for_id) {
				setSelectedDay(sub_package_list[i].package_for_id);
				calculateEndDate(sub_package_list[i].package_for_id);
				setSelectedPlanList(sub_package_list[i]);
				setSelectedSubPackage(sub_package_list[i] && sub_package_list[i].sub_packages[0]);
			}
		}
	};

	const onSelectSubPackage = (id) => {
		const sub_packages = selectedPlanList.sub_packages;
		for (let i = 0; i < sub_packages.length; i++) {
			if (id === sub_packages[i].sub_package_id) {
				setSelectedSubPackage(sub_packages[i]);
				console.log(sub_packages[i]);
			}
		}
	};


	const onPurchasePackage = () => {

		if (couponDetails?.discount_type === "amount") {
			var TotalData = parseInt(selectedSubPackage?.price) - parseInt(couponDetails?.discount_value)
		}

		else if (couponDetails?.discount_type === "percentage") {
			TotalData = parseInt(selectedSubPackage?.price) - (parseInt(selectedSubPackage?.price) * parseInt(couponDetails?.discount_value) / 100)
		}
		else {
			TotalData = parseInt(selectedSubPackage?.price)
		}
		if (!selectedDeliveryMethod) {
			toast('Please Select the delivary Method!', {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
			return false
		}
		if (!selectedAddress.address_id) {
			toast('Please Select the delivary Address!', {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
			return false
		}

		let formData = new FormData();
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('package_id', match.params.package_id);
		formData.append('package_for', selectedDay);
		formData.append('sub_package_id', selectedSubPackage.sub_package_id);
		formData.append('start_date', endDate.order_start_date);
		formData.append('end_date', endDate.order_end_date);
		formData.append('consultant_fees', '');
		formData.append('delivery_address_id', selectedAddress.address_id);
		formData.append('delivery_method_id', selectedDeliveryMethod);

		formData.append('payment_type', 'knet');
		// formData.append('total_amount', parseInt(selectedSubPackage.price));
		// formData.append('package_amount', parseInt(selectedSubPackage.price));

		formData.append('total_amount', TotalData);
		formData.append('package_amount', parseInt(selectedSubPackage.price));
		formData.append('unique_code', '22343453443');
		formData.append('coupon_code', couponDetails?.coupon_code || 0);
		formData.append('app_mode', 'prod');

		var data = {
			user_id: localStorage.getItem('ls_user_id'),
			package_id: match.params.package_id,
			package_for: selectedDay,
			sub_package_id: selectedSubPackage.sub_package_id,
			start_date: endDate.order_start_date,
			end_date: endDate.order_end_date,
			consultant_fees: '',
			delivery_address_id: selectedAddress.address_id,
			payment_type: 'knet',
			total_amount: TotalData,
			package_amount: parseInt(selectedSubPackage.price),
			delivery_method_id: selectedDeliveryMethod,
			unique_code: '22343453443',
			coupon_code: couponDetails?.coupon_code || 0,
			app_mode: 'prod',
		};

		dispatch(purchasePackage(formData, data));

		// let data = {
		// 	packageDetails,
		// 	selectedPlanList,
		// 	selectedSubPackage,
		// };
		// data = JSON.stringify(data);
		// localStorage.setItem('ls_purchased_package', data);
	};
	const [couponData, setCouponData] = useState('');
	const ApplyCoupon = (event) => {
		setCouponData({
			[event.target.name]: event.target.value
		})
	}
	const coupon = () => {
		if (couponData?.coupon_code !== undefined || "" || null) {
			let formData = new FormData();

			formData.append('user_id', localStorage.getItem('ls_user_id'));
			formData.append('coupon_code', couponData.coupon_code);

			var data = {
				user_id: localStorage.getItem('ls_user_id'),
				coupon_code: couponData.coupon_code,
			};
			dispatch(CouponCode(formData, data));
		}

	}
	const getWeekDays = () => {
		var date = new Date();
		var days = [];
		var first = date.getDate();
		var hour = date.toLocaleString('en-US', { hour:'numeric',minute:'numeric' ,hour12: true, timeZone: 'Asia/Kuwait' });
		if (hour.includes('AM')) {
			first = first - 1
		}
		for (let i = 0; i < 28; i++) {
			
			date = new Date();
			var firstDayofWeek = new Date(date.setDate(first + i + 5)).toUTCString();
			if (i === 0) {
				setStartDate(firstDayofWeek);
				calculateEndDate();
			}
			days.push(firstDayofWeek);
		}

		setWeekDays(days);
	};
	// var hrs =parseInt(hour)
	// if (hrs <= 12) {
	// 	first = first + 1
	// }
	const calculateEndDate = (package_for, date) => {
		let formData = new FormData();
		formData.append('package_for', package_for || selectedDay);
		formData.append('start_date', date || startDate);
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getEndDate(formData));
	};

	var settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<div>
			{packageDetails && (
				<section class="section-main innerpages">
					<div class="container-fluid">
						<div class="row">
							<div class="col-12 text-center">
								<h1></h1>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-6 col-md-6 col-sm-6">
								<div class="package-box">
									<div class="package-dtl">
										<ul class="unstyled days-ul">
											{packageDetails.sub_package_list.map((pack) => (
												<li>
													<input
														type="radio"
														class="styled-checkbox"
														id={pack.package_for_id}
														name="day"
														onClick={onSelectDays.bind(this, pack.package_for_id)}
														checked={selectedDay === pack.package_for_id ? true : false}
													/>
													<label for={pack.package_for_id} title="25 Days">
														<h2>{pack.days}</h2>
														<p>
															{localStorage.getItem('ls_langauge_id') == 1
																? 'Days '
																: ' أيام'}
														</p>
													</label>
												</li>
											))}
										</ul>
										<div class="select-package">
											<h3 class="text-center">
												{localStorage.getItem('ls_langauge_id') == 1
													? 'Select Plan '
													: ' اختر نطاق السعرات الحرارية'}{' '}
											</h3>

											<ul class="unstyled sel-pack-list">
												{selectedPlanList &&
													selectedPlanList.sub_packages &&
													selectedPlanList.sub_packages.length > 0 &&
													selectedPlanList.sub_packages.map((plan) => (
														<li>
															<input
																type="radio"
																class="styled-checkbox"
																id={plan.sub_package_id}
																name="package"
																value=""
																onClick={onSelectSubPackage.bind(
																	this,
																	plan.sub_package_id
																)}
																checked={
																	selectedSubPackage.sub_package_id ===
																		plan.sub_package_id
																		? true
																		: false
																}
															/>
															<label
																for={plan.sub_package_id}
																title={plan.sub_package_id}
															>
																<div class="label-div">
																	<div className="meal-wrapper">
																		{plan &&
																			plan.sub_package_combo &&
																			plan.sub_package_combo.length > 0 &&
																			plan.sub_package_combo.map((subPack, key) =>
																				key === 0 ? (
																					<p>
																						<span class="d-block">
																							{subPack.meal_value}{' '}
																							{
																								subPack.product_category_name
																							}
																						</span>{' '}
																						<img
																							src="assets/images/breakfast.svg"
																							alt="Breakfast"
																						/>
																					</p>
																				) : key === 1 ? (
																					<p>
																						<span class="d-block">
																							{subPack.meal_value}{' '}
																							{
																								subPack.product_category_name
																							}
																						</span>{' '}
																						<img
																							src="assets/images/meal.svg"
																							alt="Breakfast"
																						/>
																					</p>
																				) : key === 2 ? (
																					<p>
																						<span class="d-block">
																							{subPack.meal_value}{' '}
																							{
																								subPack.product_category_name
																							}
																						</span>{' '}
																						<img
																							src="assets/images/snacks.svg"
																							alt="Breakfast"
																						/>
																					</p>
																				) : key === 3 ? (
																					<p>
																						<span class="d-block">
																							{subPack.meal_value} {
																								subPack.product_category_name
																							}
																						</span>{' '}
																						<img
																							src="assets/images/soup.svg"
																							alt="Breakfast"
																						/>
																					</p>
																				) : null
																			)}
																	</div>

																	<h4>
																		<span>
																			{plan.min_limit} to {plan.max_limit} kcal
																		</span>
																		<span>
																			{parseInt(plan.price).toFixed(3)} KWD
																		</span>
																	</h4>
																</div>
															</label>
														</li>
													))}
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 starting-from">
								<div class="package-box">
									<div class="carousel">
										<div class="week-container menu-container">
											{/* <div class="swiper-wrapper w-100"> */}
											<Slider {...settings}>
												{weekDays &&
													weekDays.map((day) => (
														<div className="px-1">
															<div class="swiper-slide">
																{startDate === day ? (
																	<a
																		href="javascript:void(0);"
																		class="active"
																		onClick={() => {
																			setStartDate(day);
																			calculateEndDate();
																		}}
																	>
																		<span>{day.slice(0, 3)}</span>
																		{day.slice(5, 12)}
																	</a>
																) : (
																	<a
																		href="javascript:void(0);"
																		onClick={() => {
																			setStartDate(day);
																			calculateEndDate('', day);
																		}}
																	>
																		<span>{day.slice(0, 3)}</span>
																		{day.slice(5, 12)}
																	</a>
																)}
															</div>
														</div>
													))}
											</Slider>
											{/* </div> */}
										</div>
									</div>

									<div class="row starting-div">
										<div class="col-lg-8 col-md-8 col-sm-7">
											<div class="starting-box">
												<h4>


													{selectedSubPackage &&
														selectedSubPackage.sub_package_combo &&
														selectedSubPackage.sub_package_combo.length > 0 &&
														selectedSubPackage.sub_package_combo.map((subPack, key) =>
															key === 0 ? (
																<>

																	{subPack.meal_value}{' '}
																	{
																		subPack.product_category_name
																	} + {" "}

																</>
															) : key === 1 ? (
																<>

																	{subPack.meal_value}{' '}
																	{
																		subPack.product_category_name
																	} +  {" "}

																</>
															) : key === 2 ? (
																<>

																	{subPack.meal_value}{' '}
																	{
																		subPack.product_category_name
																	} +  {" "}

																</>
															) : key === 3 ? (
																<>

																	{subPack.meal_value} {
																		subPack.product_category_name
																	}

																</>
															) : null
														)}
												</h4>
												<p>
													You selected starting date is{' '}
													<strong>{startDate.slice(0, 16)}</strong>
												</p>
											</div>
										</div>
										<div class="col-lg-4 col-md-4 col-sm-5">
											<div class="starting-box">
												<h4>
													<span>
														{selectedSubPackage &&
															parseInt(selectedSubPackage.price).toFixed(3)}{' '}
														KWD
													</span>
												</h4>
											</div>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<div class="devider"></div>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<p class="text-center">
												{' '}
												{localStorage.getItem('ls_langauge_id') == 1
													? 'Select the delivery time '
													: ' حدد فتحة التسليم'}
											</p>
											<ul class="unstyled days-ul">
												{deliveryTimeList &&
													deliveryTimeList.map((delivery, key) => (
														<li key={key}>
															<input
																type="radio"
																class="styled-checkbox"
																id={`dt${key}`}
																name="deliveryTime"
																onClick={() => {
																	setSelectedDeliveryTime(delivery.timeid);
																}}
																checked={
																	selectedDeliveryTime === delivery.timeid
																		? true
																		: false
																}
															/>
															<label for={`dt${key}`}>
																<div>{delivery.timename}</div>
															</label>
														</li>
													))}
											</ul>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<div class="devider"></div>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<p class="text-center">
												{' '}
												{localStorage.getItem('ls_langauge_id') == 1
													? 'Preferred contact method upon delivery'
													: '   طريقة الاتصال المفضلة عند التسليم'}
											</p>
											<ul class="unstyled days-ul delivery-method d-flex">
												{deliveryMethod &&
													deliveryMethod.map((delivery, key) => (
														<li key={key}>
															<input
																type="radio"
																class="styled-checkbox"
																id={`dm${key}`}
																name="deliveryMethod"
																onClick={() =>
																	setSelectedDeliveryMethod(delivery.methodid)
																}
																checked={
																	selectedDeliveryMethod === delivery.methodid
																		? true
																		: false
																}
															/>
															<label for={`dm${key}`}>
																<div>{delivery.methodname}</div>
															</label>
														</li>
													))}
											</ul>
										</div>
										{/* <div class="col-lg-6 col-md-6 col-sm-6">
											<div class="starting-box">
												<div class="form-group">
													<select class="form-control">
														<option>Select the delivery time</option>
														<option>9AM to 1 PM</option>
														<option>2PM to 4PM</option>
														<option>4PM to 6PM</option>
													</select>
												</div>
												<div class="form-group">
													<select class="form-control">
														<option>Preferred contact method upon delivery</option>
														<option>Leave the box at the door</option>
														<option>Right the bell</option>
														<option>Call</option>
													</select>
												</div>
												<p>The driver will keep the box in front of the door</p>
											</div>
										</div> */}
										<div class="col-12">
											<div class="address-sub-div">
												<h3>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Delivery Address '
														: ' عنوان التسليم'}{' '}
													<a
														onClick={() => onOpenAddressModal()}
														data-fancybox
														class="button change-btn text-white"
													>
														{localStorage.getItem('ls_langauge_id') == 1
															? 'Add Address '
															: ' يتغيرون'}
													</a>
												</h3>

												<div class="row">
													{address &&
														address.map((address) => (
															<div class="col-lg-12 col-md-12 col-sm-12 left-faq">
																<a class="faq-link">
																	{address.address_type}

																	{selectedAddress.address_id ===
																		address.address_id ? (
																		<a
																			onClick={() => setSelectedAddress(address)}
																			data-fancybox
																			class="button change-btn py-0 px-2 ml-2 text-white bg-dark float-right mr-5"
																		>
																			Selected
																		</a>
																	) : (
																		<a
																			onClick={() => setSelectedAddress(address)}
																			data-fancybox
																			class="button change-btn py-0 px-2 ml-2 text-white float-right mr-5"
																		>
																			Select
																		</a>
																	)}
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
																									address.area
																										.city_name}
																							</p>
																						</div>
																					</div>
																					<div class="col-lg-6 col-md-6 col-sm-12">
																						<div class="form-group">
																							<label>Area</label>
																							<p>
																								{address.area &&
																									address.area
																										.area_name}
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
																							<p>
																								{address.house_number}
																							</p>
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
																						onOpenAddressModal(
																							address.address_id
																						)
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
								</div>
							</div>

							<div class="col-12">
								<div class="row">
									<div class="col-lg-6 col-md-6 col-sm-6 cart-summary">
										<div class="package-box">
											<h4 class="text-center">
												{localStorage.getItem('ls_langauge_id') == 1
													? 'Bulk package starting from '
													: ' خطة إنقاص الوزن السهلة (3 وجبات) تبدأ من'}
											</h4>
											<h5 class="text-center">
												{endDate && endDate.order_start_date} to{' '}
												{endDate && endDate.order_end_date}
											</h5>
											<div class="row amount-row m-0">
												<div class="col-6">
													<p>
														{' '}
														{localStorage.getItem('ls_langauge_id') == 1
															? 'Sub Total '
															: ' المجموع الفرعي'}
													</p>
												</div>
												<div class="col-6">
													<p class="text-right">
														<strong>
															{selectedSubPackage &&
																parseInt(selectedSubPackage.price).toFixed(3)}{' '}
														</strong>{' '}
														KWD
													</p>
												</div>
											</div>
											<div class="discount-row">
												<div class="discount-lbl">
													<img src="assets/images/percentage.svg" alt="product" />
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Coupon Code '
														: ' رمز الكوبون'}
												</div>
												<div class="discount-input">
													<input
														type="text"
														id=""
														name="coupon_code"
														onChange={ApplyCoupon}
														placeholder={
															localStorage.getItem('ls_langauge_id') == 1
																? 'Coupon Code '
																: '  رمز الكوبون'
														}
														class="form-control"

													/>
													<button class="button"
														onClick={() => coupon()}>
														{localStorage.getItem('ls_langauge_id') == 1
															? 'Apply '
															: ' تطبيق رمز القسيمة'}
													</button>
												</div>
											</div>
											{/* <!--<div class="row amount-row m-0">
									<div class="col-6">
										<p>Shipping Changes</p>
									</div>
									<div class="col-6">
										<p class="text-right">+<strong>0.500</strong> KWD</p>
									</div>
								</div>--> */}
											<div class="row m-0">
												<div class="col-6">
													<p>
														{localStorage.getItem('ls_langauge_id') == 1
															? 'Total '
															: ' مجموع'}
													</p>
												</div>
												<div class="col-6">
													<p class="text-right">
														<strong>
															{couponDetails?.discount_type === "amount" ?

																(parseInt(selectedSubPackage?.price) - parseInt(couponDetails?.discount_value)).toFixed(3)
																: couponDetails?.discount_type === "percentage" ?
																	(parseInt(selectedSubPackage?.price) - (parseInt(selectedSubPackage?.price) * parseInt(couponDetails?.discount_value) / 100)).toFixed(3)

																	: parseInt(selectedSubPackage?.price).toFixed(3)
															}
															{' '}
															KWD
														</strong>
													</p>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6 cart-summary">
										<div class="package-box">
											<h4 class="text-center">
												{' '}
												{localStorage.getItem('ls_langauge_id') == 1
													? 'Payment Method '
													: ' أيطريقة الدفع او السدادام'}{' '}
											</h4>
											<p class="text-center">
												{' '}
												{localStorage.getItem('ls_langauge_id') == 1
													? 'The Fridays will be the off days '
													: ' يرجى ملاحظة أننا نغلق أبوابنا أيام الجمعة'}
											</p>
											<div class="payment-method">
												<div class="payment-detail">
													<ul class="unstyled">
														<li>
															<input
																type="radio"
																class="styled-checkbox"
																id="knet"
																name="payment"
																value=""
																onClick={() => setSelectedPaymentMethod('knet')}
																checked={
																	selectedPaymentMethod === 'knet' ? true : false
																}
															/>
															<label for="knet" title="K-Net">
																<img src="assets/images/k-net.png" alt="k net" />
															</label>
															<div>
																{' '}
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'knet '
																	: ' كي نت'}
															</div>
														</li>
														<li>
															<input
																type="radio"
																class="styled-checkbox"
																id="visa"
																name="payment"
																value=""
																onClick={() => setSelectedPaymentMethod('visa')}
																checked={
																	selectedPaymentMethod === 'visa' ? true : false
																}
															/>
															<label for="visa" title="Credit Card">
																<img
																	src="assets/images/creditcard.png"
																	alt="Credit Card"
																/>
															</label>
															<div>
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'Credit Card '
																	: ' بطاقة الائتمان'}
															</div>
														</li>

													</ul>
												</div>
											</div>
											<p class="text-center total-amount">
												{localStorage.getItem('ls_langauge_id') == 1 ? 'Total ' : ' الإجمالي'}:{' '}
												<strong>
													{couponDetails?.discount_type === "amount" ?

														(parseInt(selectedSubPackage?.price).toFixed(3) - parseInt(couponDetails?.discount_value).toFixed(3)).toFixed(3)
														: couponDetails?.discount_type === "percentage" ?
															(parseInt(selectedSubPackage?.price) - (parseInt(selectedSubPackage?.price) * parseInt(couponDetails?.discount_value) / 100)).toFixed(3)

															: parseInt(selectedSubPackage?.price).toFixed(3)
													}
													{' '}
												</strong>
												{localStorage.getItem('ls_langauge_id') == 1 ? 'KWD ' : ' د.ك.'}
											</p>
											<div class="text-center">
												<button type="submit" class="button" onClick={onPurchasePackage}>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Pay Now '
														: ' ادفع الآن'}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			<Login open={openLoginModal} onCloseModal={onCloseLoginModal}></Login>
			<Address open={openAddressModal} onCloseModal={onCloseAddressModal} address={selectedAddress} />
		</div>
	);
}
