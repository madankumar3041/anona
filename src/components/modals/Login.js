import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../store/home/homeAction';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Register from './Register';

const Login = ({ open, onCloseModal }) => {
	const dispatch = useDispatch();

	const [openRegisterModal, setOpenRegisterModal] = useState(false);
	const [values, setValues] = useState({});

	const handleChange = (event) => {
		const { target } = event;
		const { name, value } = target;
		event.persist();
		setValues({ ...values, [name]: value });
	};

	const submitLogin = (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('email', values.email);
		formData.append('password', values.password);
		formData.append('device_name', 'web');
		formData.append('device_token', '');
		formData.append('device_id', '');

		dispatch(onLogin(formData));
	};

	const onOpenRegisterModal = () => {
		setOpenRegisterModal(true);
	};
	const onCloseRegisterModal = () => setOpenRegisterModal(false);

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
				<h2 class="anim1">
					{localStorage.getItem('ls_langauge_id') == 1 ? 'Login' : ' تسجيل الدخول إلى حسابك'}
				</h2>
				<p class="anim2">
					{localStorage.getItem('ls_langauge_id') == 1
						? 'If you already have a'
						: ' الرجاء إدخال بيانات اعتماد تسجيل الدخول للوصول إلى حسابك.'}
					<strong>{localStorage.getItem('ls_langauge_id') == 1 ? 'Lifestyle account' : ' '}</strong>
					{localStorage.getItem('ls_langauge_id') == 1
						? ', submit your personal information to sign in.'
						: ' '}
				</p>
				<form onSubmit={submitLogin}>
					<div class="form-group anim3 username-password">
						<input
							type="email"
							class="form-control"
							placeholder="Mobile / Email"
							name="email"
							value={values.email}
							onChange={handleChange}
							required
						/>
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
					<div class="form-group anim4">
						<button type="submit" class="button-line" onClick="location.href='deshboard.html'">
							{localStorage.getItem('ls_langauge_id') == 1 ? 'Sign In' : ' تسجيل الدخول'}
						</button>{' '}
						<a href="javascript:void(0);" class="forgot-link">
							{localStorage.getItem('ls_langauge_id') == 1 ? 'Forgot Password?' : ' هل نسيت كلمة المرور؟'}
						</a>
					</div>
					<div class="forgot-main">
						<div class="form-group">
							<div class="forgot-div">
								<input type="text" class="form-control" placeholder="email" value="" />
								<button type="submit" class="button-line">
									{localStorage.getItem('ls_langauge_id') == 1
										? 'Reset Password'
										: 'لهل نسيت كلمة المرور؟'}
								</button>
							</div>
						</div>
					</div>
					<p class="forgot-reg anim5">
						<span>
							{localStorage.getItem('ls_langauge_id') == 1
								? 'New at Lifestyle.com ?'
								: '  انقر هنا لإنشاء حساب جديد'}{' '}
						</span>{' '}
						<a onClick={onOpenRegisterModal}>
							{localStorage.getItem('ls_langauge_id') == 1 ? 'Register' : ' ليس لديك حساب؟ '}
						</a>
					</p>
				</form>
			</div>
			<Register open={openRegisterModal} onCloseModal={onCloseRegisterModal}></Register>
		</Modal>
	);
};

export default Login;
