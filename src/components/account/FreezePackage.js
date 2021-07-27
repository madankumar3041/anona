import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { freezePackage, getDaysList } from '../../store/home/homeAction';

const FreezePackage = ({ packageDetails }) => {
	const dispatch = useDispatch();
	const daysList = useSelector((state) => state.home.daysList);

	useEffect(() => {
		onGetDayList();
	}, []);

	useEffect(() => {
		let events = [];
		if (daysList) {

			console.log(daysList);
			for (let i = 0; i < daysList.length; i++) {
				const element = {
					url: '',
					title: '',
					description: `<input type="checkbox" class="styled-checkbox checkbox-food" id="${i}" name="calender" value=""><label for="${i}"><span><img src="assets/images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>`,
					datetime: new Date(daysList[i].scheduled_time * 1000),
				};
				if (daysList[i].is_off_day) {
					element.title = '<div class="off-day"></div><h4>OFF</h4>';
					element.description = '<span><img src="assets/images/ban.svg" alt="ban"></span>';
				}
				if (daysList[i].is_suspend) {
					element.title = '<div class="paused-day"></div><h4>Freezed</h4>';
					element.description = '<span><img src="assets/images/paused.svg" alt="paused"></span>';
				}

				events.push(element);
			}

			const addScript = () => {
				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = `assets/js/jquery.e-calendar.js`;
				script.onload = (e) => {
					window.$('#calendar').eCalendar({
						weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
						months: [
							'January',
							'February',
							'March',
							'April',
							'May',
							'June',
							'July',
							'August',
							'September',
							'October',
							'November',
							'December',
						],
						textArrows: { previous: '<span>‹</span>', next: '<span>›</span>' },
						eventTitle: 'Events',
						url: '',
						events: events,
					});
				};

				document.body.appendChild(script);
				console.log(document.body);
			};

			addScript();
		}
	}, [daysList]);

	const onGetDayList = () => {
		let formData = new FormData();
		formData.append('order_id', packageDetails.order_id);
		dispatch(getDaysList(formData));
	};

	const onFreezedPackage = () => {
		
		let selectedDays = [];
		const allInput = document.querySelectorAll('input[type="checkbox"]:checked');
		for (let i = 0; i < daysList.length; i++) {
			for (let j = 0; j < allInput.length; j++) {
				if (i == allInput[j].id) {
					selectedDays.push(daysList[i].scheduled_time_read);
				}
			}
		}

		let formData = new FormData();
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('order_id', packageDetails.order_id);
		formData.append('sub_package_id', packageDetails.sub_package_id);
		formData.append('freeze_dates', JSON.stringify(selectedDays));
		
		dispatch(freezePackage(formData, packageDetails.order_id));
	};

	return (
		<div class="upgrade-freeze-edit" id="pack2">
			<h2 class="text-center">Freeze Package</h2>
			<div id="calendar"></div>
			<div class="from-to-date-main text-center">
				<div class="pt-3 freezed-selected-meal">
					<button type="submit" class="button" onClick={() => onFreezedPackage()}>
						Freezed Selected Meal
					</button>
				</div>
			</div>
		</div>
	);
};

export default FreezePackage;
