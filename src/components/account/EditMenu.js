import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMyMeals,
	getDaysList,
	getMealListBreakfast,
	getMealListMeal,
	getMealListSnacks,
	getMealListSoup,
	addMeal,
	getMyPackages,
} from '../../store/home/homeAction';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Ingredients from '../modals/Ingredients';

export default function EditMenu({ match, history }) {
	const dispatch = useDispatch();
	var day = [];
	const myPackages1 = useSelector((state) => state.home.myPackages);

	const myPackages = myPackages1?.filter(i => i.order_id === match.params.order_id)
	console.log(myPackages)


	let packageDetails = {}

	const [weekDays, setWeekDays] = useState('');
	const [startDate, setStartDate] = useState('');
	const [selectedWeek, setSelectedWeek] = useState('week1');
	const [selectedDay, setSelectedDay] = useState(1);
	const [selectedType, setSelectedType] = useState(null);
	const [availableDates, setAvailableDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState('');
	const [selectedMeal, setSelectedMeal] = useState([]);
	const [render, setRender] = useState(false);
	const [selectedCount, setSelectedCount] = useState({
		breakfastCount: 0,
		mealCount: 0,
		snacksCount: 0,
		soupCount: 0,
	});

	const [breakfastList, setBreakfastList] = useState([]);
	const [mealList, setMealList] = useState([]);
	const [snacksList, setSnacksList] = useState([]);
	const [soupList, setSoupList] = useState([]);
	const [daysList, setDayList] = useState([]);
	const [openIngredientsModal, setOpenIngredientsModal] = useState(false);
	const [mealDetail, setMealDetail] = useState({});


	const breakfast = useSelector((state) => state.home.breakfast);
	const meal = useSelector((state) => state.home.meal);
	const snacks = useSelector((state) => state.home.snacks);

	const soup = useSelector((state) => state.home.soup);

	console.log(soup)
	const myMeals = useSelector((state) => state.home.myMeals && state.home.myMeals[0]);
	console.log(breakfast, soup, meal, snacks)
	useEffect(() => {
		if (breakfast) {
			setBreakfastList(breakfast);
		}
	}, [breakfast]);
	useEffect(() => {
		if (meal) {
			setMealList(meal);
		}
	}, [meal]);
	useEffect(() => {
		if (snacks) {
			setSnacksList(snacks);
		}
	}, [snacks]);
	useEffect(() => {
		if (soup) {
			setSoupList(soup);
			// setTimeout(() => {
			// 	onSelectMeal();
			// }, 1000);
		}
	}, [soup]);

	useEffect(() => {
		onGetMyPackages();

		getWeekDays();
	}, [history]);

	useEffect(() => {
		// setDayList(myPackages && myPackages?.[0].order_dates_array_ws);
		var arraydata;
		var dateFormate1 = myPackages?.[0]?.booing_date_display;
		var dateFormate2 = myPackages?.[0]?.order_dates_array_ws?.map((itm) =>
			itm.schedule_date)
		if(dateFormate1!= null)
		{
		for (let i = 0; i < dateFormate2?.length; i++) {
			var date = dateFormate2[i]?.split("-")?.reverse()?.join("-");
			var d = new Date(dateFormate1)
			var d1 = new Date(date)
			console.log(d, d1)
			if (d <= d1) {
				if (date) {
					var t = myPackages && myPackages?.[0]?.order_dates_array_ws
					let date1 = date?.split("-")?.reverse()?.join("-");
					arraydata = t?.find((itm) => itm.schedule_date == date1)
					day.push(...daysList, arraydata)
				}
			}
		}
	}
		setDayList(day)
		//var mydate1 = new Date('2021-07-27');

		// for (let i = 0; i < myPackages?.length; i++) {
		// 	console.log(match.params.order_id, myPackages[i].order_id)
		// 	
		// 	if (match.params.order_id === myPackages[i].order_id) {
		// 		packageDetails = myPackages[i]
		// 	}

		// }
	}, []);

	useEffect(() => {
		for (let i = 0; i < myPackages?.length; i++) {
			console.log(match.params.order_id, myPackages[i].order_id)
			
			if (match.params.order_id === myPackages[i].order_id) {
				packageDetails = myPackages[i]
			}

		}
	}, [myPackages]);

	useEffect(() => {
		var Daynumber = myPackages && myPackages[0].order_dates_array_ws?.[0]?.schdeule_day_number
		var dat = myPackages && myPackages[0].order_dates_array_ws?.filter(i => i.schdeule_day_name == "Fri")

		if (dat?.[0]) {
			setScheduleDayNumber(dat?.[0]?.schdeule_day_number);
		}
		else {
			setScheduleDayNumber(Daynumber);
		}
	}, [myPackages]);

	useEffect(() => {
		if (myMeals && myMeals.order_data && myMeals.order_data?.length > 0) {
			var orderData = myMeals.order_data;
			for (let i = 0; i < orderData?.length; i++) {
				onSelectMeal(orderData[i]);
			}
		}
	}, [myMeals]);

	useEffect(() => {
		setSelectedMeal([]);
		onGetMyMeals();
		onGetMealListBreakfast();
		onGetMealListMeal();
		onGetMealListSnacks();
		onGetMealListSoup();
		setSelectedMeal([]);
		setSelectedCount({
			breakfastCount: 0,
			mealCount: 0,
			snacksCount: 0,
			soupCount: 0,
		});
		setSelectedType(0);
	}, [selectedDate, selectedDay, history, daysList]);

	const onGetMyPackages = () => {
		let formData = new FormData();
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('display_passed_dates', 'no');
		dispatch(getMyPackages(formData));
	};

	const logout = () => {
		localStorage.clear();
		localStorage.setItem('ls_langauge_id', 1);
		window.location.href = '#/';
	};
	const [ScheduleDayNumber, setScheduleDayNumber] = useState('')
	const onGetMyMeals = () => {
		let formData = new FormData();
		formData.append('sub_package_id', packageDetails.sub_package_id);
		formData.append('order_id', packageDetails.order_id);
		formData.append('date', selectedDate);

		// formData.append('schdeule_day_number', myPackages?.[0]?.order_dates_array_ws?.[0]?.schdeule_day_number);
		// formData.append('schdeule_day_number', ScheduleDayNumber);
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('days_master_id', ScheduleDayNumber);
		dispatch(getMyMeals(formData));
	};

	const onGetMealListBreakfast = () => {
		let formData = new FormData();
		formData.append('package_id', packageDetails.package_master_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', ScheduleDayNumber);
		// formData.append('schdeule_day_number', ScheduleDayNumber);
		formData.append('mealtype_id', 1);
		dispatch(getMealListBreakfast(formData));
	};
	const onGetMealListMeal = () => {
		let formData = new FormData();
		formData.append('package_id', packageDetails.package_master_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', ScheduleDayNumber);
		formData.append('mealtype_id', 2);
		// formData.append('schdeule_day_number', ScheduleDayNumber);
		dispatch(getMealListMeal(formData));
	};
	const onGetMealListSnacks = () => {
		let formData = new FormData();
		formData.append('package_id', packageDetails.package_master_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', ScheduleDayNumber);
		formData.append('mealtype_id', 3);
		// formData.append('schdeule_day_number', ScheduleDayNumber);
		dispatch(getMealListSnacks(formData));
	};
	const onGetMealListSoup = () => {
		let formData = new FormData();
		formData.append('package_id', packageDetails.package_master_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', ScheduleDayNumber);
		// formData.append('schdeule_day_number', ScheduleDayNumber);
		formData.append('mealtype_id', 13);
		dispatch(getMealListSoup(formData));
	};

	const getWeekDays = () => {
		var date = new Date();
		var days = [];
		var first = date.getDate();
		for (let i = 0; i < 7; i++) {
			var firstDayofWeek = new Date(date.setDate(first + i)).toUTCString();
			if (i === 0) {
				setStartDate(firstDayofWeek);
			}
			days.push(firstDayofWeek);
		}
		setWeekDays(days);
	};

	const onAddMeal = () => {
		let formData = new FormData();

		let sampleData = [];
		for (let i = 0; i < selectedMeal?.length; i++) {
			var obj = {
				main_meal_id: selectedMeal[i].main_meal_id,
				proteins_amount: selectedMeal[i].proteins_amount,
				carbs_amount: selectedMeal[i].carbs_amount,
				meal_type: selectedMeal[i].meal_type,
			};
			sampleData.push(obj);
		}

		formData.append('order_id', packageDetails.order_id);
		formData.append('package_id', packageDetails.package_master_id);
		formData.append('meal_date', selectedDate);
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('meal', JSON.stringify(sampleData));
		dispatch(addMeal(formData, packageDetails.order_id));
		setSelectedType(0);
	};

	const onSelectMeal = (meal) => {
		var meals = selectedMeal;

		var meal_value = 0;
		var meal_type_id = 0;
		var sub_package_combo = myPackages[0].sub_packages_data.sub_package_combo;

		if (sub_package_combo && meal) {
			console.log(sub_package_combo);
			for (let i = 0; i < sub_package_combo?.length; i++) {
				if (meal.meal_type_object.meal_name === sub_package_combo[i].product_category_name) {
					meal_value = sub_package_combo[i].meal_value;
					meal_type_id = meal.meal_type;
				}
			}
		}

		if (checkValidation(meal_value, meal_type_id)) {
			if (meal) {
				var obj = {
					meal_id: meal.main_meal_id,
					main_meal_id: meal.main_meal_id,
					proteins_amount: meal.prot,
					carbs_amount: meal.carb,
					meal_type: meal.meal_type,
					selected_combo: {
						calory: meal.calory,
					},
				};

				if (meal.selected_combo) {
					obj.proteins_amount = meal.selected_combo.prot;
					obj.carbs_amount = meal.selected_combo.crab;
					obj.selected_combo = {
						calory: meal.calory,
					};
				}

				meals.push(obj);
				setSelectedMeal(meals);
			}

			var breakfastCount = 0;
			var mealCount = 0;
			var snacksCount = 0;
			var soupCount = 0;

			for (let i = 0; i < meals?.length; i++) {
				if (1 === meals[i].meal_type) {
					breakfastCount = breakfastCount + 1;
				} else if (2 === meals[i].meal_type) {
					mealCount = mealCount + 1;
				} else if (3 === meals[i].meal_type) {
					snacksCount = snacksCount + 1;
				} else if (4 === meals[i].meal_type) {
					soupCount = soupCount + 1;
				}
			}

			var sampleBreakfastList = breakfastList;
			var sampleMealList = mealList;
			var sampleSnacksList = snacksList;
			var sampleSoupList = soupList;

			for (let i = 0; i < meals?.length; i++) {
				for (let j = 0; j < sampleBreakfastList?.length; j++) {
					if (meals[i].main_meal_id === sampleBreakfastList[j].main_meal_id) {
						sampleBreakfastList[j].exist = true;
					}
				}
				for (let k = 0; k < sampleMealList?.length; k++) {
					if (meals[i].main_meal_id === sampleMealList[k].main_meal_id) {
						sampleMealList[k].exist = true;
					}
				}
				for (let l = 0; l < sampleSnacksList?.length; l++) {
					if (meals[i].main_meal_id === sampleSnacksList[l].main_meal_id) {
						sampleSnacksList[l].exist = true;
					}
				}

				for (let m = 0; m < sampleSoupList?.length; m++) {
					if (meals[i].main_meal_id === sampleSoupList[m].main_meal_id) {
						sampleSoupList[m].exist = true;
					}
				}
			}

			setBreakfastList(sampleBreakfastList);
			setMealList(sampleMealList);
			setSnacksList(sampleSnacksList);
			setSoupList(sampleSoupList);
			setRender(false);
			setSelectedCount({
				breakfastCount: breakfastCount,
				mealCount: mealCount,
				snacksCount: snacksCount,
				soupCount: soupCount,
			});

			setTimeout(() => {
				setRender(true);
			}, 1);
		}
	};

	const onUnSelectMeal = (meal) => {
		var meals = selectedMeal;

		var sampleBreakfastList = breakfastList;
		var sampleMealList = mealList;
		var sampleSnacksList = snacksList;
		var sampleSoupList = soupList;

		var breakfastCount = selectedCount.breakfastCount;
		var mealCount = selectedCount.mealCount;
		var snacksCount = selectedCount.snacksCount;
		var soupCount = selectedCount.soupCount;

		for (let j = 0; j < sampleBreakfastList?.length; j++) {
			if (meal.main_meal_id === sampleBreakfastList[j].main_meal_id) {
				sampleBreakfastList[j].exist = false;
				breakfastCount = breakfastCount - 1;
			}
		}
		for (let k = 0; k < sampleMealList?.length; k++) {
			if (meal.main_meal_id === sampleMealList[k].main_meal_id) {
				sampleMealList[k].exist = false;
				mealCount = mealCount - 1;
			}
		}
		for (let l = 0; l < sampleSnacksList?.length; l++) {
			if (meal.main_meal_id === sampleSnacksList[l].main_meal_id) {
				sampleSnacksList[l].exist = false;
				snacksCount = snacksCount - 1;
			}
		}

		for (let m = 0; m < sampleSoupList?.length; m++) {
			if (meal.main_meal_id === sampleSoupList[m].main_meal_id) {
				sampleSoupList[m].exist = false;
				soupCount = soupCount - 1;
			}
		}

		for (let i = 0; i < meals?.length; i++) {
			if (meal.main_meal_id === meals[i].main_meal_id) {
				meals.splice(i, 1);
			}
		}

		setSelectedMeal(meals);

		setBreakfastList(sampleBreakfastList);
		setMealList(sampleMealList);
		setSnacksList(sampleSnacksList);
		setSoupList(sampleSoupList);
		setRender(false);

		setSelectedCount({
			breakfastCount: breakfastCount,
			mealCount: mealCount,
			snacksCount: snacksCount,
			soupCount: soupCount,
		});

		setTimeout(() => {
			setRender(true);
		}, 1);
	};

	const calculateCalory = () => {
		let total = 0;
		if (selectedMeal) {
			for (let i = 0; i < selectedMeal?.length; i++) {
				total = total + parseInt(selectedMeal[i].selected_combo.calory);
			}
		}
		return total;
	};

	const checkValidation = (meal_value, meal_type_id) => {
		var validation = true;
		if (meal_type_id === 1) {
			if (selectedCount.breakfastCount === parseInt(meal_value)) {
				toast(`Quantity exceed`, {
					type: toast.TYPE.ERROR,
					autoClose: 5000,
				});
				validation = false;
			}
		}

		if (meal_type_id === 2) {
			if (selectedCount.mealCount === parseInt(meal_value)) {
				toast(`Quantity exceed`, {
					type: toast.TYPE.ERROR,
					autoClose: 5000,
				});
				validation = false;
			}
		}

		if (meal_type_id === 3) {
			if (selectedCount.snacksCount === parseInt(meal_value)) {
				toast(`Quantity exceed`, {
					type: toast.TYPE.ERROR,
					autoClose: 5000,
				});
				validation = false;
			}
		}

		if (meal_type_id === 4) {
			if (selectedCount.soupCount === parseInt(meal_value)) {
				toast(`Quantity exceed`, {
					type: toast.TYPE.ERROR,
					autoClose: 5000,
				});
				validation = false;
			}
		}

		if (validation) {
			return true;
		}
	};

	const onOpenIngredientsModal = (meal) => {
		console.log(meal);
		setMealDetail(meal);
		setOpenIngredientsModal(true);
	};
	const onCloseIngredientsModal = () => setOpenIngredientsModal(false);

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
			<section class="section-main innerpages">
				<div class="container-fluid">
					<div class="row">
						<div class="col-lg-8 col-md-8 col-sm-12 text-center">
							<h1> {localStorage.getItem('ls_langauge_id') == 1 ? 'Edit Menu' : 'لوحة القيادة'}</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-9 col-md-9 col-sm-7">
							<div class="package-box">
								{myPackages && myPackages?.length > 0 ? (
									myPackages.map((packageDetails) => (
										<div class="upgrade-freeze-edit">
											<div class="starting-from-div text-center">
												Starting From : <strong>{packageDetails.start_date_display}</strong> to{' '}
												<strong>{packageDetails.end_date_display}</strong>
											</div>
											<div class="carousel">
												<div class="week-container menu-container">
													{/* <div class="swiper-wrapper w-100"> */}
													<Slider {...settings}>
														{daysList &&
															daysList?.map((day) => (
																<div className="px-1">
																	<div class="swiper-slide">
																		{day.schdeule_day_number !== ScheduleDayNumber ? (
																			startDate === day.schedule_date ? (
																				<a
																					class="active"
																					onClick={() => {
																						setStartDate(day.schedule_date);
																						setSelectedDate(
																							day.schedule_date
																						);
																						{
																							setSelectedWeek(
																								day.schedule_week_name
																							); setScheduleDayNumber(day.schdeule_day_number);
																						}
																					}}
																					style={{ borderRadius: '0px' }}
																				>
																					<span>{day.schdeule_day_name}</span>
																					<br />
																					{day.schedule_date}
																				</a>
																			) : (
																				<a
																					onClick={() => {
																						setStartDate(day.schedule_date);
																						setSelectedDate(
																							day.schedule_date
																						);
																						{
																							setSelectedWeek(
																								day.schedule_week_name
																							); setScheduleDayNumber(day.schdeule_day_number)
																						}
																					}}
																					style={{ borderRadius: '0px' }}
																				>
																					<span>{day.schdeule_day_name}</span>
																					<br />
																					{day.schedule_date}
																				</a>
																			)
																		) : (
																			<a
																			className="bg-secondary"
																			onClick={() => {
																				setStartDate(day.schedule_date);
																				setSelectedDate(
																					day.schedule_date
																				);
																				{
																					setSelectedWeek(
																						day.schedule_week_name
																					); setScheduleDayNumber(day.schdeule_day_number)
																				}
																			}}
																			style={{ borderRadius: '0px' }}
																				
																			>
																				<span>{day.schdeule_day_name}</span>
																				<br />
																				{day.schedule_date}
																			</a>
																		)}
																	</div>
																</div>
															))}
													</Slider>
													{/* </div> */}
												</div>
											</div>
											<div class="menu-day-dish-main" id="ids1">
												<div class="menu-meals">
													<ul class="unstyled allfood">
														{packageDetails &&
															packageDetails.sub_packages_data &&
															packageDetails.sub_packages_data.sub_package_combo.map(
																(subPack, key) => (
																	<li>
																		<input
																			type="radio"
																			class="styled-checkbox"
																			checked
																			id={key + 1}
																			name={key + 1}
																			value="dish-breakfast"
																			onClick={() => {
																				setSelectedType(key + 1);
																				onSelectMeal();
																			}}
																			checked={
																				selectedType === key + 1 ? true : false
																			}
																		/>
																		<label for={key + 1}>
																			<span>
																				{key + 1 === 1 && (
																					<img
																						src="assets/images/breakfast.svg"
																						alt="Breakfast"
																					/>
																				)}
																				{key + 1 === 2 && (
																					<img
																						src="assets/images/meal.svg"
																						alt="Breakfast"
																					/>
																				)}
																				{key + 1 === 3 && (
																					<img
																						src="assets/images/snacks.svg"
																						alt="Breakfast"
																					/>
																				)}
																				{key + 1 === 4 && (
																					<img
																						src="assets/images/soup.svg"
																						alt="Breakfast"
																					/>
																				)}
																			</span>
																			<div>
																				<h2>{subPack.product_category_name}</h2>
																				<p>
																					{key + 1 === 1 &&
																						selectedCount.breakfastCount}
																					{key + 1 === 2 &&
																						selectedCount.mealCount}
																					{key + 1 === 3 &&
																						selectedCount.snacksCount}
																					{key + 1 === 13 &&
																						selectedCount.soupCount}{' '}
																					Selected
																				</p>
																			</div>
																		</label>
																	</li>
																)
															)}
													</ul>
												</div>
												<div class="dish-container" style={{ minHeight: '400px' }}>
													{/* <!--<div class="kilo-calories">Kilo Calories: 154</div>--> */}
													<div class="dish-listing dish-breakfast">
														<div class="row">
															<div class="col-12 text-center day-title">
																<h2>
																	{selectedType === 1
																		? 'Breakfast'
																		: selectedType === 2
																			? 'Main Meals & Sandwiches'
																			: selectedType === 3
																				? 'Snacks & Salads'
																				: selectedType === 4
																					? 'Fruits & Desserts'
																					: ''}
																</h2>
															</div>
														</div>
														<div class="row">
															{selectedType === 1
																? render &&
																breakfastList &&
																breakfastList.map((food) =>
																	food.exist === true ? (
																		<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																			<div class="package-thumb">
																				<div class="info-zoom-btn">
																					<a
																						class="infoBtn"
																						onClick={onOpenIngredientsModal.bind(
																							this,
																							food
																						)}
																						data-src="dish/dish-title-one.html"
																						title="Information"
																					>
																						i
																					</a>
																					<a
																						data-fancybox
																						data-src="assets/images/blog_01-1150x720.jpg"
																						title="View Large"
																					>
																						<img
																							src="assets/images/zoom.svg"
																							alt="view large"
																						/>
																					</a>
																				</div>

																				<label
																					onClick={onUnSelectMeal.bind(
																						this,
																						food
																					)}
																					style={{
																						backgroundColor: '#9dca00',
																					}}
																				>
																					<span>
																						<img
																							src={
																								(food &&
																									food.meal_image &&
																									food.meal_image
																										.url) ||
																								'assets/images/lifestyle.svg'
																							}
																							alt="view large"
																						/>
																					</span>
																					<h2>{food.meal_name}</h2>
																					<div class="calories-add">
																						<div>
																							Calories : {food.calory}
																						</div>
																						<div>
																							<span>Added</span>
																						</div>
																					</div>
																				</label>
																			</div>
																		</div>
																	) : (
																		<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																			<div class="package-thumb">
																				<div class="info-zoom-btn">
																					<a
																						class="infoBtn"
																						onClick={onOpenIngredientsModal.bind(
																							this,
																							food
																						)}
																						data-src="dish/dish-title-one.html"
																						title="Information"
																					>
																						i
																					</a>
																					<a
																						data-fancybox
																						data-src="assets/images/blog_01-1150x720.jpg"
																						title="View Large"
																					>
																						<img
																							src="assets/images/zoom.svg"
																							alt="view large"
																						/>
																					</a>
																				</div>

																				<label
																					onClick={onSelectMeal.bind(
																						this,
																						food
																					)}
																				>
																					<span>
																						<img
																							src={
																								(food &&
																									food.meal_image &&
																									food.meal_image
																										.url) ||
																								'assets/images/lifestyle.svg'
																							}
																							alt="view large"
																						/>
																					</span>
																					<h2>{food.meal_name}</h2>
																					<div class="calories-add">
																						<div>
																							Calories : {food.calory}
																						</div>
																						<div>Add</div>
																					</div>
																				</label>
																			</div>
																		</div>
																	)
																)
																: selectedType === 2
																	? render &&
																	mealList &&
																	mealList.map((food) =>
																		food.exist === true ? (
																			<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																				<div class="package-thumb">
																					<div class="info-zoom-btn">
																						<a
																							class="infoBtn"
																							onClick={onOpenIngredientsModal.bind(
																								this,
																								food
																							)}
																							data-src="dish/dish-title-one.html"
																							title="Information"
																						>
																							i
																						</a>
																						<a
																							data-fancybox
																							data-src="assets/images/blog_01-1150x720.jpg"
																							title="View Large"
																						>
																							<img
																								src="assets/images/zoom.svg"
																								alt="view large"
																							/>
																						</a>
																					</div>

																					<label
																						onClick={onUnSelectMeal.bind(
																							this,
																							food
																						)}
																						style={{
																							backgroundColor: '#9dca00',
																						}}
																					>
																						<span>
																							<img
																								src={
																									(food &&
																										food.meal_image &&
																										food.meal_image
																											.url) ||
																									'assets/images/lifestyle.svg'
																								}
																								alt="view large"
																							/>
																						</span>
																						<h2>{food.meal_name}</h2>
																						<div class="calories-add">
																							<div>
																								Calories : {food.calory}
																							</div>
																							<div>
																								<span>Added</span>
																							</div>
																						</div>
																					</label>
																				</div>
																			</div>
																		) : (
																			<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																				<div class="package-thumb">
																					<div class="info-zoom-btn">
																						<a
																							class="infoBtn"
																							onClick={onOpenIngredientsModal.bind(
																								this,
																								food
																							)}
																							data-src="dish/dish-title-one.html"
																							title="Information"
																						>
																							i
																						</a>
																						<a
																							data-fancybox
																							data-src="assets/images/blog_01-1150x720.jpg"
																							title="View Large"
																						>
																							<img
																								src="assets/images/zoom.svg"
																								alt="view large"
																							/>
																						</a>
																					</div>

																					<label
																						onClick={onSelectMeal.bind(
																							this,
																							food
																						)}
																					>
																						<span>
																							<img
																								src={
																									(food &&
																										food.meal_image &&
																										food.meal_image
																											.url) ||
																									'assets/images/lifestyle.svg'
																								}
																								alt="view large"
																							/>
																						</span>
																						<h2>{food.meal_name}</h2>
																						<div class="calories-add">
																							<div>
																								Calories : {food.calory}
																							</div>
																							<div>Add</div>
																						</div>
																					</label>
																				</div>
																			</div>
																		)
																	)
																	: selectedType === 3
																		? render &&
																		snacksList &&
																		snacksList.map((food) =>
																			food.exist === true ? (
																				<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																					<div class="package-thumb">
																						<div class="info-zoom-btn">
																							<a
																								class="infoBtn"
																								onClick={onOpenIngredientsModal.bind(
																									this,
																									food
																								)}
																								data-src="dish/dish-title-one.html"
																								title="Information"
																							>
																								i
																							</a>
																							<a
																								data-fancybox
																								data-src="assets/images/blog_01-1150x720.jpg"
																								title="View Large"
																							>
																								<img
																									src="assets/images/zoom.svg"
																									alt="view large"
																								/>
																							</a>
																						</div>

																						<label
																							onClick={onUnSelectMeal.bind(
																								this,
																								food
																							)}
																							style={{
																								backgroundColor: '#9dca00',
																							}}
																						>
																							<span>
																								<img
																									src={
																										(food &&
																											food.meal_image &&
																											food.meal_image
																												.url) ||
																										'assets/images/lifestyle.svg'
																									}
																									alt="view large"
																								/>
																							</span>
																							<h2>{food.meal_name}</h2>
																							<div class="calories-add">
																								<div>
																									Calories : {food.calory}
																								</div>
																								<div>
																									<span>Added</span>
																								</div>
																							</div>
																						</label>
																					</div>
																				</div>
																			) : (
																				<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																					<div class="package-thumb">
																						<div class="info-zoom-btn">
																							<a
																								class="infoBtn"
																								onClick={onOpenIngredientsModal.bind(
																									this,
																									food
																								)}
																								data-src="dish/dish-title-one.html"
																								title="Information"
																							>
																								i
																							</a>
																							<a
																								data-fancybox
																								data-src="assets/images/blog_01-1150x720.jpg"
																								title="View Large"
																							>
																								<img
																									src="assets/images/zoom.svg"
																									alt="view large"
																								/>
																							</a>
																						</div>

																						<label
																							onClick={onSelectMeal.bind(
																								this,
																								food
																							)}
																						>
																							<span>
																								<img
																									src={
																										(food &&
																											food.meal_image &&
																											food.meal_image
																												.url) ||
																										'assets/images/lifestyle.svg'
																									}
																									alt="view large"
																								/>
																							</span>
																							<h2>{food.meal_name}</h2>
																							<div class="calories-add">
																								<div>
																									Calories : {food.calory}
																								</div>
																								<div>Add</div>
																							</div>
																						</label>
																					</div>
																				</div>
																			)
																		)
																		: selectedType === 4
																			? render &&
																			soupList &&
																			soupList.map((food) =>
																				food.exist === true ? (
																					<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																						<div class="package-thumb">
																							<div class="info-zoom-btn">
																								<a
																									class="infoBtn"
																									onClick={onOpenIngredientsModal.bind(
																										this,
																										food
																									)}
																									data-src="dish/dish-title-one.html"
																									title="Information"
																								>
																									i
																								</a>
																								<a
																									data-fancybox
																									data-src="assets/images/blog_01-1150x720.jpg"
																									title="View Large"
																								>
																									<img
																										src="assets/images/zoom.svg"
																										alt="view large"
																									/>
																								</a>
																							</div>

																							<label
																								onClick={onUnSelectMeal.bind(
																									this,
																									food
																								)}
																								style={{
																									backgroundColor: '#9dca00',
																								}}
																							>
																								<span>
																									<img
																										src={
																											(food &&
																												food.meal_image &&
																												food.meal_image
																													.url) ||
																											'assets/images/lifestyle.svg'
																										}
																										alt="view large"
																									/>
																								</span>
																								<h2>{food.meal_name}</h2>
																								<div class="calories-add">
																									<div>
																										Calories : {food.calory}
																									</div>
																									<div>
																										<span>Added</span>
																									</div>
																								</div>
																							</label>
																						</div>
																					</div>
																				) : (
																					<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																						<div class="package-thumb">
																							<div class="info-zoom-btn">
																								<a
																									class="infoBtn"
																									onClick={onOpenIngredientsModal.bind(
																										this,
																										food
																									)}
																									data-src="dish/dish-title-one.html"
																									title="Information"
																								>
																									i
																								</a>
																								<a
																									data-fancybox
																									data-src="assets/images/blog_01-1150x720.jpg"
																									title="View Large"
																								>
																									<img
																										src="assets/images/zoom.svg"
																										alt="view large"
																									/>
																								</a>
																							</div>

																							<label
																								onClick={onSelectMeal.bind(
																									this,
																									food
																								)}
																							>
																								<span>
																									<img
																										src={
																											(food &&
																												food.meal_image &&
																												food.meal_image
																													.url) ||
																											'assets/images/lifestyle.svg'
																										}
																										alt="view large"
																									/>
																								</span>
																								<h2>{food.meal_name}</h2>
																								<div class="calories-add">
																									<div>
																										Calories : {food.calory}
																									</div>
																									<div>Add</div>
																								</div>
																							</label>
																						</div>
																					</div>
																				)
																			)
																			: ''}
														</div>
													</div>
													<div class="dish-listing dish-meal">
														<div class="row">
															<div class="col-12 text-center day-title">
																<h2>Meals</h2>
															</div>
														</div>
														<div class="row">
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-one.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch1.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch1"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch1">
																		<span>
																			<img
																				src="assets/images/lunch1.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish one</h2>
																		<div class="calories-add">
																			<div>Calories : 225</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-one.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch2.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch2"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch2">
																		<span>
																			<img
																				src="assets/images/lunch2.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish Two</h2>
																		<div class="calories-add">
																			<div>Calories : 142</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-two.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch3.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch3"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch3">
																		<span>
																			<img
																				src="assets/images/lunch3.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish Three</h2>
																		<div class="calories-add">
																			<div>Calories : 158</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-three.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch4.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch4"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch4">
																		<span>
																			<img
																				src="assets/images/lunch4.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish Four</h2>
																		<div class="calories-add">
																			<div>Calories : 270</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-four.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch5.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch5"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch5">
																		<span>
																			<img
																				src="assets/images/lunch5.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish Five</h2>
																		<div class="calories-add">
																			<div>Calories : 321</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-four.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch6.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch6"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch6">
																		<span>
																			<img
																				src="assets/images/lunch6.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish Six</h2>
																		<div class="calories-add">
																			<div>Calories : 217</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-one.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch7.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch7"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch7">
																		<span>
																			<img
																				src="assets/images/lunch7.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish Seven</h2>
																		<div class="calories-add">
																			<div>Calories : 1890</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-two.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/lunch8.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="lunch8"
																		name="lunch"
																		value=""
																	/>
																	<label for="lunch8">
																		<span>
																			<img
																				src="assets/images/lunch8.jpg"
																				alt="bulk-package"
																			/>
																		</span>
																		<h2>Lunch Dish Eight</h2>
																		<div class="calories-add">
																			<div>Calories : 365</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
														</div>
													</div>
													<div class="dish-listing dish-snacks">
														<div class="row">
															<div class="col-12 text-center day-title">
																<h2>Snacks</h2>
															</div>
														</div>
														<div class="row">
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-one.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/blog_01-1150x720.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks1"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks1">
																		<span>
																			<img
																				src="assets/images/blog_01-1150x720.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish one</h2>
																		<div class="calories-add">
																			<div>Calories : 150</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-two.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/03_menu_balanced.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks2"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks2">
																		<span>
																			<img
																				src="assets/images/03_menu_balanced.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish Two</h2>
																		<div class="calories-add">
																			<div>Calories : 220</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-three.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/01_menu_slimming.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks3"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks3">
																		<span>
																			<img
																				src="assets/images/01_menu_slimming.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish Three</h2>
																		<div class="calories-add">
																			<div>Calories : 120</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-four.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/02_menu_muscle.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks4"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks4">
																		<span>
																			<img
																				src="assets/images/02_menu_muscle.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish Four</h2>
																		<div class="calories-add">
																			<div>Calories : 320</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-one.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks5"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks5">
																		<span>
																			<img
																				src="assets/images/breakfast.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish Five</h2>
																		<div class="calories-add">
																			<div>Calories : 220</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-two.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast2.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks6"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks6">
																		<span>
																			<img
																				src="assets/images/breakfast2.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish Six</h2>
																		<div class="calories-add">
																			<div>Calories : 220</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-three.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast3.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks7"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks7">
																		<span>
																			<img
																				src="assets/images/breakfast3.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish Seven</h2>
																		<div class="calories-add">
																			<div>Calories : 250</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-three.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast4.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="snacks8"
																		name="Snacks"
																		value=""
																	/>
																	<label for="snacks8">
																		<span>
																			<img
																				src="assets/images/breakfast4.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Snacks Dish Seven</h2>
																		<div class="calories-add">
																			<div>Calories : 140</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
														</div>
													</div>
													<div class="dish-listing dish-soup">
														<div class="row">
															<div class="col-12 text-center day-title">
																<h2>Soups</h2>
															</div>
														</div>
														<div class="row">
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-one.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/blog_01-1150x720.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup1"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup1">
																		<span>
																			<img
																				src="assets/images/blog_01-1150x720.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass One</h2>
																		<div class="calories-add">
																			<div>Calories : 150</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-two.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/03_menu_balanced.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup2"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup2">
																		<span>
																			<img
																				src="assets/images/03_menu_balanced.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass Two</h2>
																		<div class="calories-add">
																			<div>Calories : 150</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-three.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/01_menu_slimming.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup3"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup3">
																		<span>
																			<img
																				src="assets/images/01_menu_slimming.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass Three</h2>
																		<div class="calories-add">
																			<div>Calories : 120</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-four.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/02_menu_muscle.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup4"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup4">
																		<span>
																			<img
																				src="assets/images/02_menu_muscle.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass Four</h2>
																		<div class="calories-add">
																			<div>Calories : 320</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-one.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup5"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup5">
																		<span>
																			<img
																				src="assets/images/breakfast.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass Five</h2>
																		<div class="calories-add">
																			<div>Calories : 320</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-two.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast2.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup6"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup6">
																		<span>
																			<img
																				src="assets/images/breakfast2.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass Six</h2>
																		<div class="calories-add">
																			<div>Calories : 220</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-three.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast3.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup7"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup7">
																		<span>
																			<img
																				src="assets/images/breakfast3.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass Seven</h2>
																		<div class="calories-add">
																			<div>Calories : 220</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
															<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
																<div class="package-thumb">
																	<div class="info-zoom-btn">
																		<a
																			class="infoBtn"
																			data-src="dish/dish-title-four.html"
																			title="Information"
																		>
																			i
																		</a>
																		<a
																			data-fancybox
																			data-src="assets/images/breakfast4.jpg"
																			title="View Large"
																		>
																			<img
																				src="assets/images/zoom.svg"
																				alt="view large"
																			/>
																		</a>
																	</div>
																	<input
																		type="checkbox"
																		class="styled-checkbox"
																		id="soup8"
																		name="Soup"
																		value=""
																	/>
																	<label for="soup8">
																		<span>
																			<img
																				src="assets/images/breakfast3.jpg"
																				alt="Snacks"
																			/>
																		</span>
																		<h2>Soup Glass Seven</h2>
																		<div class="calories-add">
																			<div>Calories : 140</div>
																			<div>
																				<span>Add</span>
																				<span>Added</span>
																			</div>
																		</div>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="food-footer-sticky padding-left-right">
													<div class="row">
														<div class="col-lg-9 col-md-9 col-sm-7">
															<p>
																<span>
																	Selected Meals: {calculateCalory()} Calories
																</span>
																<br />
																<span>
																	My Daily Target:{' '}
																	{/* {packageDetails &&
																		packageDetails.sub_packages_data &&
																		packageDetails.sub_packages_data.max_limit}{' '} */}
																	{JSON.parse(localStorage.getItem('ls_user_details')).calorie_count}
																	Calories
																</span>
															</p>
															<button
																type="submit"
																class="button button-line"
																onClick={onAddMeal}
															>
																Confirm my meal
															</button>
														</div>
													</div>
												</div>
											</div>
											<div class="menu-day-dish-main" id="ids2">
												<div class="edit-completed-dead">
													<h3>
														<div class="h-title">
															<strong>Sun</strong> 21 Feb
														</div>{' '}
														<div class="total-calories">Total Calories</div>{' '}
														<div class="status-edit">
															<span>
																Status: <strong class="btn-success">Completed</strong>
															</span>{' '}
															<a class="button">Edit Meal</a>
														</div>
													</h3>
												</div>
												<div>
													<table class="table food-table bg-white">
														<tr>
															<th>Food name</th>
															<th>Calories</th>
														</tr>
														<tr>
															<td>
																<p>Meal/lunch</p>
																<h5>Lorem ipsum dolor</h5>
															</td>
															<td>150</td>
														</tr>
														<tr>
															<td>
																<p>Meal/lunch</p>
																<h5>Consectetur adipiscing elit</h5>
															</td>
															<td>127</td>
														</tr>
														<tr>
															<td>
																<p>Snacks</p>
																<h5>Quis ipsum suspendisse</h5>
															</td>
															<td>206</td>
														</tr>
														<tr>
															<td>
																<p>Soup</p>
																<h5>Risus commodo viverra</h5>
															</td>
															<td>206</td>
														</tr>
														<tr>
															<td>
																<p>Salad</p>
																<h5>Viverra maecenas accumsan</h5>
															</td>
															<td>206</td>
														</tr>
														<tr>
															<td>
																<p>Dinner</p>
																<h5>Risus commodo viverra</h5>
															</td>
															<td>206</td>
														</tr>
														<tr>
															<td>
																<p>Dinner</p>
																<h5>Tempor incididunt ut</h5>
															</td>
															<td>206</td>
														</tr>
													</table>
												</div>
											</div>
										</div>
									))
								) : (
									<div class="col-lg-9 col-md-9 col-sm-7">
										<div class="package-box d-flex justify-content-center align-items-center">
											<p> No data available, Please purchase package!</p>
										</div>
									</div>
								)}
							</div>
						</div>

						<div class="col-lg-3 col-md-3 col-sm-5 rightside">
							<div class="package-box">
								<div class="account-main">
									{/* <!--<a  class="account-link"><img src="assets/images/user.svg" alt="user"/></a>--> */}
									<div class="dashboard-div">
										<ul class="dashboard-ul">
											<li>
												<Link to="/dashboard" class="active">
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
												<Link to="/address">
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
												<a onClick={logout}>
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
			<Ingredients
				mealDetail={mealDetail}
				open={openIngredientsModal}
				onCloseModal={onCloseIngredientsModal}
			></Ingredients>
		</div>
	);
};
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

{
	/* <div class="edit-completed-dead">
	<h3>
		<div class="h-title">
			<strong>Sun</strong> 20 Feb :
		</div>
		<div class="nomenu-text text-danger">There is not any Meal, please add selecting following...</div>
	</h3>
</div>; */
}
