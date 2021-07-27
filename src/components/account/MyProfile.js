import React, { useState, useEffect } from 'react';
import { onRegister } from '../../store/home/homeAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getDeliveryTimeList,
	getDeliveryMethod,
} from '../../store/home/homeAction';

export default function MyProfile({ match, history }) {
	const dispatch = useDispatch();
	const deliveryTimeList = useSelector((state) => state.home.deliveryTimeList);
	const [profile, setProfile] = useState({});
	const [updating, setUpdating] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const [calorie_count, setcalorie_count] = useState('');
	const [delivery_time, setdelivery_time] = useState('');
	useEffect(() => {
		onGetDeliveryTimeList();
	}, [history])
	const onGetDeliveryTimeList = () => {
		let formData = new FormData();
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getDeliveryTimeList(formData));
	};
	useEffect(() => {
		if (localStorage.getItem('ls_user_details')) {
			let data = localStorage.getItem('ls_user_details');
			data = JSON.parse(data);
			setProfile(data);
		} else {
			setProfile(null);
		}
	}, []);

	useEffect(() => {

		setFirstName(profile && profile.first_name);
		setLastName(profile && profile.last_name);
		setEmail(profile && profile.email);
		setMobile(profile && profile.mobile_no);
		setcalorie_count(profile && profile.calorie_count);
		setdelivery_time(profile && profile.delivery_time_id);
	}, [profile]);

	const data = useSelector((state) => state.home);

	console.log(data)
	const onUpdateProfile = (e) => {
		e.preventDefault();

		// if (password !== '') {

		let formData = new FormData();
		formData.append('first_name', firstName);
		formData.append('last_name', lastName);
		formData.append('email', email);
		formData.append('mobile_no', mobile);
		// formData.append('password', password);
		formData.append('calorie_count', calorie_count);
		formData.append('delivery_time', delivery_time);
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('device_name', '');
		formData.append('device_token', '');
		formData.append('device_id', '');

		dispatch(onRegister(formData, 'update'));
		// } else {
		// 	toast('Please enter your current password!', {
		// 		type: toast.TYPE.ERROR,
		// 		autoClose: 5000,
		// 	});
		// }
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
								{/* {localStorage.getItem('ls_langauge_id') == 1 ? 'Freeze' : ''} */}
								My Profile
							</h1>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-8 col-md-8 col-sm-7">
							<div class="package-box">
								<div class="myprofile-main">
									{updating ? (
										<div class="profileform d-block">
											<div class="form-group">
												<div class="inputbox">
													<input
														type="text"
														placeholder="First Name"
														class="form-control"
														name="firstName"
														value={firstName}
														onChange={(e) => setFirstName(e.target.value)}
													/>
												</div>
											</div>
											<div class="form-group">
												<div class="inputbox">
													<input
														type="text"
														placeholder="Last Name"
														class="form-control"
														name="lastName"
														value={lastName}
														onChange={(e) => setLastName(e.target.value)}
													/>
												</div>
											</div>
											<div class="form-group">
												<div class="inputbox">
													<input
														type="text"
														placeholder="Email Address"
														class="form-control"
														name="email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
											</div>
											<div class="form-group">
												<div class="inputbox">
													<input
														type="text"
														placeholder="Mobile"
														class="form-control"
														name="mobile"
														value={mobile}
														onChange={(e) => setMobile(e.target.value)}
													/>
												</div>
											</div>
											<div class="form-group">
												<div class="inputbox">
													<input
														type="text"
														placeholder="Calorie Count"
														class="form-control"
														name="calorie_count"
														value={calorie_count}
														onChange={(e) => setcalorie_count(e.target.value)}
													/>
												</div>
											</div>
											<div class="form-group">
												<div class="inputbox">
													<select className="form-control"
														name='delivery_time'
														onChange={(e) => setdelivery_time(e.target.value)}
														value={delivery_time}
													>
														{deliveryTimeList !== undefined &&
															deliveryTimeList !== null &&
															deliveryTimeList !== [] &&
															deliveryTimeList?.length > 0
															? deliveryTimeList?.map((ite) =>
																deliveryTimeList?.timeid === ite.timeid ? (
																	<option
																		key={ite.timeid}
																		value={ite.timeid}
																	>
																		{ite.timename}
																	</option>
																) : (
																	<option key={ite.timeid} value={ite.timeid}>
																		{ite.timename}
																	</option>
																)
															)
															: null}
													</select>
												</div>
											</div>
											{/* <div class="form-group">
												<div class="inputbox">
													<input
														type="text"
														placeholder="Password"
														class="form-control"
														name="password"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
												</div>
											</div> */}
											<div class="change-div">
												<button class="button" type="submit" onClick={onUpdateProfile}>
													{localStorage.getItem('ls_langauge_id') == 1 ? 'UPDATE' : 'تحديث'}
												</button>{' '}
												<a
													onClick={() => setUpdating(false)}
													class="button closebutton text-white"
												>
													{localStorage.getItem('ls_langauge_id') == 1 ? 'CLOSE' : ' إغلاق'}
												</a>
											</div>
										</div>
									) : (
										<div class="profiledata">
											<div class="form-group">
												<label>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'First Name'
														: 'الاسم الأول'}{' '}
												</label>
												<p>{profile && profile.first_name}</p>
											</div>
											<div class="form-group">
												<label>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Last Name'
														: 'اسم العائلة'}{' '}
												</label>
												<p>{profile && profile.last_name}</p>
											</div>
											<div class="form-group">
												<label>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Email Address'
														: 'عنوان بريد الكتروني'}
												</label>
												<p>{profile && profile.email}</p>
											</div>
											<div class="form-group">
												<label>
													{localStorage.getItem('ls_langauge_id') == 1 ? 'Mobile' : 'متحرك'}
												</label>
												<p>{profile && profile.mobile_no}</p>
											</div>
											<div class="form-group">
												<label>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Calorie Limit'
														: 'حد السعرات الحرارية'}{' '}
												</label>
												<p>{profile && profile.calorie_count}</p>
											</div>
											<div class="form-group">
												<label>
													{localStorage.getItem('ls_langauge_id') == 1
														? 'Delivery time'
														: 'توصيل زمن'}{' '}
												</label>
												<p>{profile && profile.delivery_time_name}</p>
											</div>
											<div class="change-div">
												<a
													onClick={() => setUpdating(true)}
													class="button change-btn  text-white"
												>
													{localStorage.getItem('ls_langauge_id') == 1 ? 'CHANGE' : 'يتغيرون'}
												</a>
											</div>
										</div>
									)}
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
												<Link to="/profile" class="active">
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
		</div>
	);
};

