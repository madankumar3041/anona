import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Home';

import About from './components/menu/About';
import Whyus from './components/menu/Whyus';
import Package from './components/menu/packages/Package';
import PrivacyPolicy from './components/menu/PrivacyPolicy';
import TermsConditions from './components/menu/TermsConditions';
import MenuPreview from './components/menu/MenuPreview';
import Faq from './components/menu/Faq';
import MyAddress from './components/account/MyAddress';
import MyDashboard from './components/account/MyDashboard';
import MyProfile from './components/account/MyProfile';
import ChangePassword from './components/account/ChangePassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';

import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import Loading from './components/common/Loading';
import EditMenu from './components/account/EditMenu';

function App() {
	const loading = useSelector((state) => state.home.loading);
	const [direction, setDirection] = useState(DIRECTIONS.LHS);
	const [selectedLanguage, setSelectedLanguage] = useState(DIRECTIONS.LHS);

	useEffect(() => {
		if (localStorage.getItem('ls_langauge_id')) {
			if (localStorage.getItem('ls_langauge_id') == '2') {
				setDirection(DIRECTIONS.RTL);
				setSelectedLanguage(2);
			} else {
				setDirection(DIRECTIONS.LHS);
				setSelectedLanguage(1);
			}
		} else {
			setDirection(DIRECTIONS.LHS);
			setSelectedLanguage(1);
			localStorage.setItem('ls_langauge_id', '1');
		}
	}, []);

	return (
		<div className="App" style={{ textAlign: `${localStorage.getItem('ls_langauge_id') == 2 ? 'right' : 'null'}` }}>
			<LoadingOverlay active={loading} text={<Loading></Loading>}></LoadingOverlay>

			<DirectionProvider direction={direction}>
				<Router>
					<ToastContainer></ToastContainer>
					<Header></Header>

					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/package/:package_id" component={Package} />
					<Route exact path="/why-us" component={Whyus} />
					<Route exact path="/privacy-policy" component={PrivacyPolicy} />
					<Route exact path="/terms-conditions" component={TermsConditions} />
					<Route exact path="/menu/:package_id" component={MenuPreview} />
					<Route exact path="/faq" component={Faq} />
					<Route exact path="/address" component={MyAddress} />
					<Route exact path="/dashboard" component={MyDashboard} />
					<Route exact path="/profile" component={MyProfile} />
					<Route exact path="/change-password" component={ChangePassword} />
					<Route exact path="/edit-menu/:order_id" component={EditMenu} />

					<Footer></Footer>
				</Router>
			</DirectionProvider>
		</div>
	);
}

export default App;
