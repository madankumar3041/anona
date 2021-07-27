import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealTypeListForUpgradePackage } from '../../store/home/homeAction';

const UpgradePackage = ({ packageDetails }) => {
	const dispatch = useDispatch();
	const mealTypeListForUpgradePackage = useSelector((state) => state.home.mealTypeListForUpgradePackage);

	const [selectedPlanList, setSelectedPlanList] = useState([]);
	const [selectedSubPackage, setSelectedSubPackage] = useState([]);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('knet');

	useEffect(() => {
		onGetMealTypeListForUpgradePackage();
	}, []);

	useEffect(() => {
		if (mealTypeListForUpgradePackage && mealTypeListForUpgradePackage.sub_package_list) {
			setSelectedPlanList(mealTypeListForUpgradePackage && mealTypeListForUpgradePackage.sub_package_list[0]);
		}
	}, [mealTypeListForUpgradePackage]);

	const onGetMealTypeListForUpgradePackage = () => {
		let formData = new FormData();
		formData.append('order_id', packageDetails.order_id);
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
		formData.append('user_id', localStorage.getItem('ls_user_id'));
		formData.append('package_id', packageDetails.package_master_id);

		dispatch(getMealTypeListForUpgradePackage(formData));
	};

	const onSelectSubPackage = () => {};

	const onPurchasePackage = () => {};

	return (
		<div class="upgrade-freeze-edit">
			<h2 class="text-center">Upgrade Package</h2>
			<div class="package-dtl">
				{/* <!--<ul class="unstyled days-ul">
            <li>
                <input type="radio" class="styled-checkbox" checked id="day26" name="day" value="">
                <label for="day26" title="25 Days">
                    <h2>26</h2><p>Days</p>
                </label>
            </li>
            <li>
                <input type="radio" class="styled-checkbox" id="day6" name="day" value="">
                <label for="day6" title="6 Days">
                    <h2>6</h2><p>Days</p>
                </label>
            </li>
            <li>
                <input type="radio" class="styled-checkbox" id="day1" name="day" value="">
                <label for="day1" title="25 Days">
                    <h2>1</h2><p>Day</p>
                </label>
            </li>
        </ul>--> */}
				<div class="select-package">
					{/* <!--<h3 class="text-center">Select Packages</h3>--> */}
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
										onClick={onSelectSubPackage.bind(this, plan.sub_package_id)}
										checked={
											selectedSubPackage.sub_package_id === plan.sub_package_id ? true : false
										}
									/>
									<label for={plan.sub_package_id} title={plan.sub_package_id}>
										<div class="label-div">
											<div>
												{plan &&
													plan.sub_package_combo &&
													plan.sub_package_combo.length > 0 &&
													plan.sub_package_combo.map((subPack) =>
														subPack.product_category_name === 'Breakfast' ? (
															<p>
																<span class="d-block">
																	{subPack.meal_value} Breakfast
																</span>{' '}
																<img
																	src="assets/images/breakfast.svg"
																	alt="Breakfast"
																/>
															</p>
														) : subPack.product_category_name === 'Main Meals ' ? (
															<p>
																<span class="d-block">{subPack.meal_value} Meals</span>{' '}
																<img src="assets/images/meal.svg" alt="Breakfast" />
															</p>
														) : subPack.product_category_name === 'Snacks' ? (
															<p>
																<span class="d-block">{subPack.meal_value} Snacks</span>{' '}
																<img src="assets/images/snacks.svg" alt="Breakfast" />
															</p>
														) : subPack.product_category_name === 'soups' ? (
															<p>
																<span class="d-block">{subPack.meal_value} Soups</span>{' '}
																<img src="assets/images/soup.svg" alt="Breakfast" />
															</p>
														) : null
													)}
											</div>

											<h4>
												<span>
													{plan.min_limit} to {plan.max_limit} kcal
												</span>
												<span>{parseInt(plan.price).toFixed(3)} KWD</span>
											</h4>
										</div>
									</label>
								</li>
							))}
						{/* <li>
							<input type="radio" class="styled-checkbox" id="package1" name="package" value="" />
							<label for="package1" title="package 1">
								<div class="label-div">
									<div>
										<p>
											<span class="d-block">1 Breakfast</span>{' '}
											<img src="assets/images/breakfast.svg" alt="Breakfast" />
										</p>
										<p>
											<span class="d-block">1 Meal</span>{' '}
											<img src="assets/images/meal.svg" alt="meal" />
										</p>
										<p>
											<span class="d-block">1 Snacks</span>{' '}
											<img src="assets/images/snacks.svg" alt="snacks" />
										</p>
										<p>
											<span class="d-block">1 Soup</span>{' '}
											<img src="assets/images/soup.svg" alt="soup" />
										</p>
									</div>
									<h4>
										<span>1000 to 1400 kcal</span>
										<span>150.000 KWD</span>
									</h4>
								</div>
							</label>
						</li>
						<li>
							<input type="radio" class="styled-checkbox" id="package2" name="package" value="" />
							<label for="package2" title="package 2">
								<div class="label-div">
									<div>
										<p>
											<span class="d-block">2 Breakfast</span>{' '}
											<img src="assets/images/breakfast.svg" alt="Breakfast" />
										</p>
										<p>
											<span class="d-block">2 Meal</span>{' '}
											<img src="assets/images/meal.svg" alt="meal" />
										</p>
										<p>
											<span class="d-block">1 Snacks</span>{' '}
											<img src="assets/images/snacks.svg" alt="snacks" />
										</p>
										<p>
											<span class="d-block">1 Soup</span>{' '}
											<img src="assets/images/soup.svg" alt="soup" />
										</p>
									</div>
									<h4>
										<span>1500 to 1800 kcal</span>
										<span>170.000 KWD</span>
									</h4>
								</div>
							</label>
						</li>
						<li>
							<input type="radio" class="styled-checkbox" id="package3" name="package" value="" />
							<label for="package3" title="package 3">
								<div class="label-div">
									<div>
										<p>
											<span class="d-block">2 Breakfast</span>{' '}
											<img src="assets/images/breakfast.svg" alt="Breakfast" />
										</p>
										<p>
											<span class="d-block">3 Meal</span>{' '}
											<img src="assets/images/meal.svg" alt="meal" />
										</p>
										<p>
											<span class="d-block">2 Snacks</span>{' '}
											<img src="assets/images/snacks.svg" alt="snacks" />
										</p>
										<p>
											<span class="d-block">2 Soup</span>{' '}
											<img src="assets/images/soup.svg" alt="soup" />
										</p>
									</div>
									<h4>
										<span>2100 to 2700 kcal</span>
										<span>234.000 KWD</span>
									</h4>
								</div>
							</label>
						</li> */}
					</ul>
				</div>
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
										checked={selectedPaymentMethod === 'knet' ? true : false}
									/>
									<label for="knet" title="K-Net">
										<img src="assets/images/k-net.png" alt="k net" />
									</label>
									<div> {localStorage.getItem('ls_langauge_id') == 1 ? 'k net ' : ' كي نت'}</div>
								</li>
								<li>
									<input
										type="radio"
										class="styled-checkbox"
										id="visa"
										name="payment"
										value=""
										onClick={() => setSelectedPaymentMethod('visa')}
										checked={selectedPaymentMethod === 'visa' ? true : false}
									/>
									<label for="visa" title="Credit Card">
										<img src="assets/images/creditcard.png" alt="Credit Card" />
									</label>
									<div>
										{localStorage.getItem('ls_langauge_id') == 1
											? 'Credit Card '
											: ' بطاقة الائتمان'}
									</div>
								</li>
								<li>
									<input
										type="radio"
										class="styled-checkbox"
										id="cash"
										name="payment"
										value=""
										onClick={() => setSelectedPaymentMethod('cash')}
										checked={selectedPaymentMethod === 'cash' ? true : false}
									/>
									<label for="cash" title="Cash on Delivery">
										<img src="assets/images/cash.png" alt="Cash on Delivery" />
									</label>
									<div>Cash on Delivery</div>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-center total-amount">
						{localStorage.getItem('ls_langauge_id') == 1 ? 'Total ' : ' الإجمالي'}:{' '}
						<strong>{selectedSubPackage && parseInt(selectedSubPackage.price).toFixed(3)} </strong>{' '}
						{localStorage.getItem('ls_langauge_id') == 1 ? 'KWD ' : ' د.ك.'}
					</p>
					<div class="text-center">
						<button type="submit" class="button" onClick={onPurchasePackage}>
							{localStorage.getItem('ls_langauge_id') == 1 ? 'Pay Now ' : ' ادفع الآن'}
						</button>
					</div>
				</div>
			</div>{' '}
		</div>
	);
};

export default UpgradePackage;
