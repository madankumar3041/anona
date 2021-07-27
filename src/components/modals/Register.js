import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onRegister } from '../../store/home/homeAction';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';

export default function Register({ open, onCloseModal }) {
	const dispatch = useDispatch();

	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [values, setValues] = useState({});

	const handleChange = (event) => {
		const { target } = event;
		const { name, value } = target;
		event.persist();
		setValues({ ...values, [name]: value });
	};

	const submitRegister = (e) => {
		e.preventDefault();

		if (values.password === values.c_password) {
			let formData = new FormData();
			formData.append('first_name', values.first_name);
			formData.append('last_name', values.last_name);
			formData.append('email', values.email);
			formData.append('mobile_no', values.mobile_no);
			formData.append('password', values.password);
			formData.append('device_name', '');
			formData.append('device_token', '');
			formData.append('device_id', '');
			dispatch(onRegister(formData));
		} else {
			toast('Please make sure your password match!', {
				type: toast.TYPE.ERROR,
				autoClose: 5000,
			});
		}
	};

	const onOpenLoginModal = () => {
		setOpenLoginModal(true);
	};
	const onCloseLoginModal = () => setOpenLoginModal(false);

	return (
		<Modal
			classNames={{
				modal: 'login-modal',
			}}
			open={open}
			onClose={onCloseModal}
			center
		>
			<div id="loginModel" class="black-bg p-5">
				<form onSubmit={submitRegister}>
					<h2 class="anim1"> {localStorage.getItem('ls_langauge_id') == 1 ? 'Sign Up' : ' انشئ حساب '}</h2>
					<p class="anim2">
						{localStorage.getItem('ls_langauge_id') == 1
							? 'Create an account on Boucheron.com to share and save your selection.'
							: ' قم بإنشاء حساب وابدأ في تخصيص خطتك في دقائق.'}
					</p>
					<div class="reg-form">
						<div class="form-group anim3">
							<div class="double">
								<input
									type="text"
									class="form-control"
									placeholder="First Name..."
									name="first_name"
									value={values.first_name}
									onChange={handleChange}
									required
								/>
							</div>
							<div class="double">
								<input
									type="text"
									class="form-control"
									placeholder="Last Name..."
									name="last_name"
									value={values.last_name}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
						<div class="form-group anim4">
							<div class="double">
								<input
									type="number"
									class="form-control"
									placeholder="Mobile Number..."
									name="mobile_no"
									value={values.mobile_no}
									onChange={handleChange}
									required
								/>
							</div>
							<div class="double">
								<input
									type="email"
									class="form-control"
									placeholder="Email Address..."
									name="email"
									value={values.email}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
						<div class="form-group anim5">
							<div class="double">
								<input
									type="password"
									class="form-control"
									placeholder="Password"
									name="password"
									value={values.password}
									onChange={handleChange}
									required
								/>
							</div>
							<div class="double">
								<input
									type="password"
									class="form-control"
									placeholder="Confirm password"
									name="c_password"
									value={values.c_password}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
						<div class="form-group anim6 signup-btn">
							<button type="submit" class="button-line" onClick="location.href='deshboard.html'">
								{localStorage.getItem('ls_langauge_id') == 1 ? 'Sign Up' : ' التسجيل'}
							</button>{' '}
							<p class="forgot-reg already-mem">
								<span>
									{localStorage.getItem('ls_langauge_id') == 1 ? 'Already member?' : ' عضو بالفعل؟'}
								</span>{' '}
								<a onClick={onOpenLoginModal}>
									{localStorage.getItem('ls_langauge_id') == 1 ? 'Login' : ' تسجيل الدخول'}
								</a>
							</p>
						</div>
					</div>
				</form>
			</div>
			<Login open={openLoginModal} onCloseModal={onCloseLoginModal}></Login>
		</Modal>
	);
}
