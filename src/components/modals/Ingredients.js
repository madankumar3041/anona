import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../store/home/homeAction';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Register from './Register';

const Ingredients = ({ open, onCloseModal, mealDetail }) => {
	const dispatch = useDispatch();

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

	return (
		<Modal
			classNames={{
				modal: 'login-modal',
			}}
			open={open}
			onClose={onCloseModal}
			center
		>
			<div className="card-body">
				<div className="row m-0 border-bottom py-2">
					<h4>Ingredients</h4>
				</div>
				<div className="row m-0 border-bottom py-2">
					<div className="col"> Calorie </div> <div className="col"> {mealDetail.calory}</div>
				</div>
				<div className="row m-0 border-bottom py-2">
					<div className="col"> Fat </div> <div className="col"> {mealDetail.fat}</div>
				</div>
				<div className="row m-0 border-bottom py-2">
					<div className="col"> Carb </div> <div className="col"> {mealDetail.carb}</div>
				</div>
				<div className="row m-0 border-bottom py-2">
					<div className="col"> Prot </div> <div className="col"> {mealDetail.prot}</div>
				</div>
			</div>
		</Modal>
	);
};

export default Ingredients;
