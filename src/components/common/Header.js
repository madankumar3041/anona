import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPackages } from '../../store/home/homeAction';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Login from '../modals/Login';
import Register from '../modals/Register';
import './header.css'

export default function Header() {
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [openRegisterModal, setOpenRegisterModal] = useState(false);
const [ms,setms]=useState(false);
	const onOpenLoginModal = () => setOpenLoginModal(true);
	const onCloseLoginModal = () => setOpenLoginModal(false);

	const onOpenRegisterModal = () => setOpenRegisterModal(true);
	const onCloseRegisterModal = () => setOpenRegisterModal(false);

	const dispatch = useDispatch();
	const packages = useSelector((state) => state.home.packages);

	useEffect(() => {
		let formData = new FormData();
		formData.append('type', 'advertise');
		formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);

		dispatch(getPackages(formData));
	}, []);

	const onChangeLanguage = () => {
		if (localStorage.getItem('ls_langauge_id')) {
			if (localStorage.getItem('ls_langauge_id') === '2') {
				localStorage.setItem('ls_langauge_id', '1');
				window.location.reload();
			} else {
				localStorage.setItem('ls_langauge_id', '2');
				window.location.reload();
			}
		} else {
			localStorage.setItem('ls_langauge_id', '2');
			window.location.reload();
		}
	};
	const onHandele = () => {
		var x = document.getElementById("wsnavtoggle");
		if (x.className === "animated-arrow") {
			x.className += " wsoffcanvasopener";
		} 
		else {
			x.className = "animated-arrow";
		}
		if(!ms) setms(true)
		else
		setms(false)
	}
	return (
		<div>
			<Login open={openLoginModal} onCloseModal={onCloseLoginModal}></Login>
			<Register open={openRegisterModal} onCloseModal={onCloseRegisterModal}></Register>

			<header id="header">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<div
								class={`topbar ${localStorage.getItem('ls_langauge_id') == 2
										? 'd-flex flex-row justify-content-between'
										: null
									} `}
							>
								<Link to="/" class="lifestyle">
									<img src="assets/images/lifestyle.svg" alt="lifestyle" />
								</Link>
								<div
									class=""
									class={` ${localStorage.getItem('ls_langauge_id') == 2
											? 'left-header d-flex flex-row justify-content-between'
											: 'right-header'
										} `}
								>
									<div class="navigation">
										<div class="wsmenucontainer clearfix">
											<div class="overlapblackbg"></div>
											<div class="wsmobileheader clearfix" >
												<a href="javascript:void(0);" id="wsnavtoggle" class="animated-arrow" onClick={() => onHandele()}>
													{ms?<span><div class="wsmain" id="wsmainid">
												<nav class="wsmenu clearfix">
													<ul class="mobile-sub wsmenu-list">
														<li>
															<Link to="/" class="active">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'Home'
																	: ' الرئيسية.'}
															</Link>
														</li>
														<li>
															<Link to="/about">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'About us'
																	: ' معلومات عنا'}
															</Link>
														</li>

														<li>
															<a href="javascript:void(0);">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'Packages'
																	: ' خطط الوجبات.'}
																<i class="wsmenu-arrow fa fa-angle-down"></i>
															</a>
															<ul class="wsmenu-submenu packages-menu">
																<li class="container clearfix">
																	{packages &&
																		packages.length > 0 &&
																		packages.map((pack) => (
																			<div class="package-menu-wrapper">
																				<Link
																					to={`/package/${pack.package_master_id}`}
																				>
																					<div class="left-icon">
																						<img
																							src="assets/images/packages.svg"
																							alt="packages"
																						/>
																					</div>
																					<div class="left-contents">
																						<h3>{pack.package_name}</h3>
																						<p
																							dangerouslySetInnerHTML={{
																								__html: pack.description,
																							}}
																						/>
																					</div>
																				</Link>
																			</div>
																		))}
																</li>
															</ul>
														</li>
														<li>
															<Link to="/why-us">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'Why us'
																	: 'فلسفتنا.'}
															</Link>
														</li>
													</ul>
												</nav>
											</div></span>:<span></span>}
												</a>
											</div>
											<div class="wsmain" id="wsmainid">
												<nav class="wsmenu clearfix">
													<ul class="mobile-sub wsmenu-list">
														<li>
															<Link to="/" class="active">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'Home'
																	: ' الرئيسية.'}
															</Link>
														</li>
														<li>
															<Link to="/about">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'About us'
																	: ' معلومات عنا'}
															</Link>
														</li>

														<li>
															<a href="javascript:void(0);">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'Packages'
																	: ' خطط الوجبات.'}
																<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>
															</a>
															<ul class="wsmenu-submenu packages-menu">
																<li class="container clearfix">
																	{packages &&
																		packages.length > 0 &&
																		packages.map((pack) => (
																			<div class="package-menu-wrapper">
																				<Link
																					to={`/package/${pack.package_master_id}`}
																				>
																					<div class="left-icon">
																						<img
																							src="assets/images/packages.svg"
																							alt="packages"
																						/>
																					</div>
																					<div class="left-contents">
																						<h3>{pack.package_name}</h3>
																						<p
																							dangerouslySetInnerHTML={{
																								__html: pack.description,
																							}}
																						/>
																					</div>
																				</Link>
																			</div>
																		))}
																</li>
															</ul>
														</li>
														<li>
															<Link to="/why-us">
																{localStorage.getItem('ls_langauge_id') == 1
																	? 'Why us'
																	: 'فلسفتنا.'}
															</Link>
														</li>
													</ul>
												</nav>
											</div>
										</div>
									</div>
									{localStorage.getItem('ls_login') === 'true' ? (
										<div class="login-register">
											<Link to="/dashboard">
												{localStorage.getItem('ls_langauge_id') == 1 ? 'My Account' : 'حسابي'}
											</Link>
										</div>
									) : (
										<div class="login-register">
											<a onClick={onOpenLoginModal}>
												{localStorage.getItem('ls_langauge_id') == 1 ? 'Login' : ' انشئ حساب'}
											</a>
											<a onClick={onOpenRegisterModal}>
												{localStorage.getItem('ls_langauge_id') == 1
													? 'Register'
													: ' تسجيل الدخول إلى حسابك'}
											</a>
										</div>
									)}

									{/* <div class="language-div">
										<a class="language-link" onClick={onChangeLanguage}>
											<span>{localStorage.getItem('ls_langauge_id') == 1 ? 'AR' : 'EN'}</span>
										</a>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
