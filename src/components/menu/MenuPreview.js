import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealListBreakfast, getMealListMeal, getMealListSnacks, getMealListSoup } from '../../store/home/homeAction';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Ingredients from '../modals/Ingredients';

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

export default function MenuPreview(props) {
	const dispatch = useDispatch();
	const breakfast = useSelector((state) => state.home.breakfast);
	const meal = useSelector((state) => state.home.meal);
	const snacks = useSelector((state) => state.home.snacks);
	const soup = useSelector((state) => state.home.soup);

	const breakfastMealTypeName = useSelector((state) => state.home.breakfast && state.home.breakfast.length > 0 && state.home.breakfast[0].meal_type_object.meal_name);
	const mealMealTypeName = useSelector((state) => state.home.meal && state.home.meal.length > 0 && state.home.meal[0].meal_type_object.meal_name);
	const snacksMealTypeName = useSelector((state) => state.home.snacks && state.home.snacks.length > 0 && state.home.snacks[0].meal_type_object.meal_name);
	const soupMealTypeName = useSelector((state) => state.home.soup && state.home.soup.length > 0 && state.home.soup[0].meal_type_object.meal_name);

	const [selectedWeek, setSelectedWeek] = useState('week1');
	const [selectedDay, setSelectedDay] = useState(1);
	const [weeks, setWeeks] = useState([
		{ id: 'week1', name: 'Week 1' },
		{ id: 'week2', name: 'Week 2' },
	]);
	const [days, setDays] = useState([
		{ id: 1, name: 'Monday' },
		{ id: 2, name: 'Tuesday' },
		{ id: 3, name: 'Wednesday' },
		{ id: 4, name: 'Thursday' },
		{ id: 5, name: 'Friday' },
		{ id: 6, name: 'Saturday' },
		{ id: 7, name: 'Sunday' },
	]);

	const [openIngredientsModal, setOpenIngredientsModal] = useState(false);
	const [mealDetail, setMealDetail] = useState({});

	useEffect(() => {
		onGetMealListBreakfast();
		onGetMealListMeal();
		onGetMealListSnacks();
		onGetMealListSoup();
	}, [selectedDay, selectedWeek]);

	const onGetMealListBreakfast = () => {
		let formData = new FormData();
		formData.append('package_id', props.match.params.package_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', selectedDay);
		formData.append('mealtype_id', 1);
		dispatch(getMealListBreakfast(formData));
	};
	const onGetMealListMeal = () => {
		let formData = new FormData();
		formData.append('package_id', props.match.params.package_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', selectedDay);
		formData.append('mealtype_id', 2);
		dispatch(getMealListMeal(formData));
	};
	const onGetMealListSnacks = () => {
		let formData = new FormData();
		formData.append('package_id', props.match.params.package_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', selectedDay);
		formData.append('mealtype_id', 3);
		dispatch(getMealListSnacks(formData));
	};
	const onGetMealListSoup = () => {
		let formData = new FormData();
		formData.append('package_id', props.match.params.package_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('week_id', selectedWeek);
		formData.append('days_master_id', selectedDay);
		formData.append('mealtype_id', 13);
		dispatch(getMealListSoup(formData));
	};

	const onSelectWeek = (id) => {
		setSelectedWeek(id);
	};
	const onSelectDay = (id) => {
		setSelectedDay(id);
	};

	const onOpenIngredientsModal = (meal) => {
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
						<div class="col-12 text-center">
							<h1>Select Menu</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div>
								<ul class="tabs">
									{weeks &&
										weeks.map((week) => (
											<li>
												<a
													href="javascript:void(0);"
													rel="week1"
													class={selectedWeek === week.id ? 'active' : null}
													onClick={() => onSelectWeek(week.id)}
												>
													{week.name}
												</a>
											</li>
										))}
								</ul>
							</div>
							<div class="carousel">
								<div class="weekone">
									<div class="week1-container menu-container">
										<div>
											<Slider {...settings}>
												{days &&
													days.map((day) => (
														<div class="swiper-slide px-2">
															<a
																href="javascript:void(0);"
																class={selectedDay === day.id ? 'active' : null}
																onClick={() => onSelectDay(day.id)}
															>
																{day.name}
															</a>
														</div>
													))}
											</Slider>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 text-center day-title">
							<h2>{localStorage.getItem('ls_langauge_id') == 1 ? breakfastMealTypeName : 'إفطار'}</h2>
						</div>
					</div>
					<div class="row">
						{breakfast &&
							breakfast.map((item) => (
								<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
									<div class="package-thumb">
										<a
											href="javascript:void(0);"
											class="info-btn infoBtn"
											data-src="dish/dish-title-one.html"
											onClick={onOpenIngredientsModal.bind(this, item)}
										>
											i
										</a>
										<div
											class="package-img"
											data-fancybox
											data-src="assets/images/blog_01-1150x720.jpg"
										>
											<img
												src={item && item.meal_image && item.meal_image.url || 'assets/images/lifestyle.svg'}
												alt="bulk-package"
											/>
										</div>
										<h3>{item.meal_name}</h3>
										<p>Calories : {item.calory}</p>
									</div>
								</div>
							))}


					</div>
					<div class="row">
						<div class="col-12">
							<div class="devider"></div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 text-center day-title">
							<h2>{localStorage.getItem('ls_langauge_id') == 1 ? mealMealTypeName : 'وجبات'} </h2>
						</div>
					</div>
					<div class="row">
						{meal &&
							meal.map((item) => (
								<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
									<div class="package-thumb">
										<a
											href="javascript:void(0);"
											class="info-btn infoBtn"
											data-src="dish/dish-title-one.html"
											onClick={onOpenIngredientsModal.bind(this, item)}
										>
											i
										</a>
										<div
											class="package-img"
											data-fancybox
											data-src="assets/images/blog_01-1150x720.jpg"
										>
											<img
												src={item && item.meal_image && item.meal_image.url || 'assets/images/lifestyle.svg'}
												alt="bulk-package"
											/>
										</div>
										<h3>{item.meal_name}</h3>
										<p>Calories : {item.calory}</p>
									</div>
								</div>
							))}


					</div>
					<div class="row">
						<div class="col-12">
							<div class="devider"></div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 text-center day-title">
							<h2>{localStorage.getItem('ls_langauge_id') == 1 ? snacksMealTypeName : 'وجبات خفيفة'}</h2>
						</div>
					</div>
					<div class="row">
						{snacks &&
							snacks.map((item) => (
								<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
									<div class="package-thumb">
										<a
											href="javascript:void(0);"
											class="info-btn infoBtn"
											data-src="dish/dish-title-one.html"
											onClick={onOpenIngredientsModal.bind(this, item)}
										>
											i
										</a>
										<div
											class="package-img"
											data-fancybox
											data-src="assets/images/blog_01-1150x720.jpg"
										>
											<img
												src={item && item.meal_image && item.meal_image.url || 'assets/images/lifestyle.svg'}
												alt="bulk-package"
											/>
										</div>
										<h3>{item.meal_name}</h3>
										<p>Calories : {item.calory}</p>
									</div>
								</div>
							))}


					</div>
					<div class="row">
						<div class="col-12">
							<div class="devider"></div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 text-center day-title">
							<h2>{localStorage.getItem('ls_langauge_id') == 1 ? soupMealTypeName : 'الحساء'}</h2>
						</div>
					</div>
					<div class="row">
						{soup &&
							soup.map((item) => (
								<div class="col-lg-3 col-md-3 col-sm-6 dish-column">
									<div class="package-thumb">
										<a
											href="javascript:void(0);"
											class="info-btn infoBtn"
											data-src="dish/dish-title-one.html"
											onClick={onOpenIngredientsModal.bind(this, item)}
										>
											i
										</a>
										<div
											class="package-img"
											data-fancybox
											data-src="assets/images/blog_01-1150x720.jpg"
										>
											<img
												src={item && item.meal_image && item.meal_image.url || 'assets/images/lifestyle.svg'}
												alt="bulk-package"
											/>
										</div>
										<h3>{item.meal_name}</h3>
										<p>Calories : {item.calory}</p>
									</div>
								</div>
							))}


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
}
