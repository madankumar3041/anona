import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPackages } from '../../store/home/homeAction';
import { Link } from 'react-router-dom';
import UpgradePackage from './UpgradePackage';
import FreezePackage from './FreezePackage';
import EditMenu from './EditMenu';

const MyDashboard = () => {
    const dispatch = useDispatch();

    const myPackages = useSelector((state) => state.home.myPackages);
    
    // console.log(myPackages)

    const [selectedType, setSelectedType] = useState('');
    const [keyval,setkey] = useState('');

    useEffect(() => {
        onGetMyPackages();
    }, []);
    // const [keyArray, setSelectedType] = useState('');
    // useEffect(() => {
    //  onGetMyPackages();
    // }, []
    // );

    const onGetMyPackages = () => {
        //console.log('calling again')
        let formData = new FormData();
        formData.append('user_id', localStorage.getItem('ls_user_id'));
        formData.append('lang_id', localStorage.getItem('ls_langauge_id') || 1);
        dispatch(getMyPackages(formData));
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
                            <h1> {localStorage.getItem('ls_langauge_id') == 1 ? 'Dashboard' : 'لوحة القيادة'}</h1>
                        </div>
                    </div>
                    <div class="row">
                        {myPackages && myPackages.length > 0 ? (
                            myPackages?.map((pack,key2) => (
                                <div class="col-lg-9 col-md-9 col-sm-7">
                                    <div class="package-box">
                                        <div class="overflow-hidden">
                                            <div class="circle-days">
                                                <div class="c100 p90 blue">
                                                    <span className="d-flex">
                                                        <div class="days-block">
                                                            <span>{pack.remaining_days}</span>
                                                            <p>
                                                                {localStorage.getItem('ls_langauge_id') == 1
                                                                    ? 'Days'
                                                                    : 'الحساء'}
                                                                <br />
                                                                Remaining
                                                            </p>
                                                        </div>
                                                    </span>
                                                    <div class="slice">
                                                        <div class="bar"></div>
                                                        <div class="fill"></div>
                                                    </div>
                                                </div>
                                                <div class="days-remaining">
                                                    <div class="days-block d-flex align-items-end"></div>
                                                </div>
                                            </div>
                                            <div class="food-div">
                                                <div class="daily-calorie">
                                                    <p>
                                                        {localStorage.getItem('ls_langauge_id') == 1
                                                            ? 'My target calorie limit'
                                                            : 'الحد من السعرات الحرارية المستهدفة: '}
                                                        :{' '}
                                                        <span class="intake">
                                                            {JSON.parse(localStorage.getItem('ls_user_details')).calorie_count}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <table>
                                                        <tr>
                                                            {pack &&
                                                                pack.sub_packages_data &&
                                                                pack.sub_packages_data.sub_package_combo.map(
                                                                    (subPack, key) => ( 
                                                                        <td>
                                                                            <p>{subPack.product_category_name}</p>
                                                                            <div class="food-icon-count">
                                                                                <span>
                                                                                    {key === 0 && (
                                                                                        <img
                                                                                            src="assets/images/breakfast.svg"
                                                                                            alt="Breakfast"
                                                                                        />
                                                                                    )}
                                                                                    {key === 1 && (
                                                                                        <img
                                                                                            src="assets/images/meal.svg"
                                                                                            alt="Breakfast"
                                                                                        />
                                                                                    )}
                                                                                    {key === 2 && (
                                                                                        <img
                                                                                            src="assets/images/snacks.svg"
                                                                                            alt="Breakfast"
                                                                                        />
                                                                                    )}
                                                                                    {key === 3 && (
                                                                                        <img
                                                                                            src="assets/images/soup.svg"
                                                                                            alt="Breakfast"
                                                                                        />
                                                                                    )}

                                                                                    <strong>
                                                                                        {subPack.meal_value}
                                                                                    </strong>
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                )}
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="food-div package-freeze">
                                                <ul class="d-flex">
                                                    <li>
                                                        {/* <a
                                                            onClick={() => setSelectedType('upgrade')}
                                                            class={`d-flex align-items-center justify-content-center ${
                                                                selectedType === 'upgrade' && 'active'
                                                            }`}
                                                        >
                                                            <span>
                                                                <img
                                                                    src="assets/images/packages.svg"
                                                                    alt="Upgrade Package"
                                                                />
                                                            </span>
                                                            <p className="mb-2 pl-2">
                                                                {localStorage.getItem('ls_langauge_id') == 1
                                                                    ? 'Upgrade Package'
                                                                    : 'ترقية الاشتراك'}
                                                            </p>
                                                        </a> */}
                                                    </li>
                                                    <li>
                                                        {console.log(key2,keyval,selectedType,pack)}
                                                        <a  
                                                            onClick={() =>{ setSelectedType('freeze'); setkey(key2); }}
                                                            class={`d-flex align-items-center justify-content-center ${selectedType === 'freeze'&&keyval==key2 && 'active'}`}
                                                        >
                                                            <span>
                                                                <img src="assets/images/freeze.svg" alt="freeze" />
                                                            </span>
                                                            <p className="mb-2 pl-2">
                                                                {
                                                                localStorage.getItem('ls_langauge_id') == 1
                                                                    ? 'Freeze'
                                                                    : 'تجميد'
                                                                }
                                                            </p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to={`/edit-menu/${pack &&
                                                                pack.order_id}`}
                                                            class={`d-flex align-items-center justify-content-center`}
                                                        >
                                                            <span>
                                                                <img
                                                                    src="assets/images/edit-menu.svg"
                                                                    alt="Edit Menu"
                                                                />
                                                            </span>
                                                            <p className="mb-2 pl-2">
                                                                {localStorage.getItem('ls_langauge_id') == 1
                                                                    ? 'Edit Menu'
                                                                    : 'اختر وجباتك'}
                                                            </p>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
 
                                        {selectedType === 'upgrade' ? (
                                            <UpgradePackage packageDetails={pack}></UpgradePackage>
                                        ) : selectedType === 'freeze'&& keyval== key2 ? (
                                            <FreezePackage packageDetails={pack}></FreezePackage>
                                        ) : null}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div class="col-lg-9 col-md-9 col-sm-7">
                                <div class="package-box d-flex justify-content-center align-items-center">
                                    <p> No data available, Please purchase package!</p>
                                </div>
                            </div>
                        )}

                        <div class="col-lg-3 col-md-3 col-sm-5 rightside"
                            style={{
                                position: "absolute",
                                left: "73%"
                            }}>
                            <div class="package-box">
                                <div class="account-main">
                                    {/* <!--<a href="javascript:void(0);" class="account-link"><img src="assets/images/user.svg" alt="user"/></a>--> */}
                                    <div class="dashboard-div">
                                        <ul class="dashboard-ul">
                                            <li>
                                                <Link to="/dashboard" class="active">
                                                    {localStorage.getItem('ls_langauge_id') == 1
                                                        ? 'Dashboard'
                                                        : 'لوحة القيادة'}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/profile">
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
        </div >
    );
};

export default MyDashboard