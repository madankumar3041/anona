import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin, getAreaList, addAddress, getAddress } from '../../store/home/homeAction';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Address = ({ open, onCloseModal, address }) => {
	const dispatch = useDispatch();
	const governorateList = useSelector((state) => state.home.areaList);

	const [values, setValues] = useState({
		area_id: '',
		address_type: '',
		block: '',
		street: '',
		avenue: '',
		flat_no: '',
		lat: '',
		lng: '',
		house_number: '',
		directions: '',
	});
	const [areaList, setAreaList] = useState({});

	const handleChange = (event) => {
		const { target } = event;
		const { name, value } = target;
		event.persist();
		setValues({ ...values, [name]: value });
		console.log(values);
	};

	useEffect(() => {
		onGetAreaList();
		if (address) {
			address.governorate_id = address && address.area && address.area.city_name;
			address.area_id = address && address.area && address.area.area_id;
			setValues(address);
		}
	}, [address, open]);

	const onGetAreaList = () => {
		let formData = new FormData();
		formData.append('language_id', localStorage.getItem('ls_langauge_id') || 1);
		dispatch(getAreaList(formData));
	};

	const onAddAddress = (e) => {
		e.preventDefault();

		let formData = new FormData();

		if (values.address_id) {
			formData.append('main_address_id', values.address_id);
		}

		formData.append('lang_id', localStorage.getItem('ls_language_id') || 1);
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('area_id', values.area_id);
		formData.append('address_type', values.address_type);
		formData.append('block', values.block);
		formData.append('street', values.street);
		formData.append('avenue', values.avenue);
		formData.append('flat_no', values.flat_no);
		formData.append('lat', values.lat);
		formData.append('lng', values.lng);
		formData.append('house_number', values.house_number);
		formData.append('directions', values.directions);

		dispatch(addAddress(formData));
		onCloseModal();
	};
	const onSelectGovernorate = (e) => {
		for (let i = 0; i < governorateList.length; i++) {
			if (e.target.value === governorateList[i].governorate_id) {
				setAreaList(governorateList[i].areas);
			}
		}
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
			<div id="newAddressModel" class="p-5">
				<h2 class="anim1">Add New Address</h2>

				<form onSubmit={onAddAddress}>
					<div class="row">
						<div class="col-12 anim2">
							<div class="form-group">
								<ul class="unstyled">
									<li class="white">
										<input
											class="styled-checkbox"
											id="a_house"
											name="address_type"
											type="radio"
											value="house"
											checked={values.address_type === 'house' ? true : false}
											onChange={handleChange}
											required
										/>
										<label for="a_house">
											<span>House</span>
										</label>
									</li>
									<li class="black">
										<input
											class="styled-checkbox"
											id="a_aparment"
											name="address_type"
											type="radio"
											value="apartment"
											checked={values.address_type === 'apartment' ? true : false}
											onChange={handleChange}
											required
										/>
										<label for="a_aparment">
											<span>Apartment</span>
										</label>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim3">
							<div class="form-group">
								<div class="inputbox">
									<select class="form-control" onChange={onSelectGovernorate}>
										<option>-- Governate --</option>
										{governorateList &&
											governorateList.length > 0 &&
											governorateList.map((gov) =>
												values.governorate_id === gov.governorate_name ? (
													<option value={gov.governorate_id} selected>
														{gov.governorate_name}
													</option>
												) : (
													<option value={gov.governorate_id}>{gov.governorate_name}</option>
												)
											)}
									</select>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim3">
							<div class="form-group">
								<div class="inputbox">
									<select
										class="form-control"
										name="area_id"
										value={values.area_id}
										onChange={handleChange}
										required
									>
										<option>-- Area --</option>
										{areaList &&
											areaList.length > 0 &&
											areaList.map((area) => (
												<option value={area.main_area_id}>{area.area_name}</option>
											))}
									</select>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim4">
							<div class="form-group">
								<div class="inputbox">
									<input
										type="text"
										placeholder="Block"
										class="form-control"
										name="block"
										value={values.block}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim4">
							<div class="form-group">
								<div class="inputbox">
									<input
										type="text"
										placeholder="Street"
										class="form-control"
										name="street"
										value={values.street}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim5">
							<div class="form-group">
								<div class="inputbox">
									<input
										type="text"
										placeholder="Avenue / Judda"
										class="form-control"
										name="avenue"
										value={values.avenue}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim5">
							<div class="form-group">
								<div class="inputbox">
									<input
										type="text"
										placeholder="Flat No"
										class="form-control"
										name="flat_no"
										value={values.flat_no}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim6">
							<div class="form-group">
								<div class="inputbox">
									<input
										type="text"
										placeholder="House No."
										class="form-control"
										name="house_number"
										value={values.house_number}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
						<div class="col-lg-6 col-md-6 col-sm-6 anim6">
							<div class="form-group">
								<div class="inputbox">
									<input
										type="text"
										placeholder="Directions"
										class="form-control"
										name="directions"
										value={values.directions}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
						</div>
						<div class="col-12 anim7">
							<button class="button" type="submit">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default Address;
