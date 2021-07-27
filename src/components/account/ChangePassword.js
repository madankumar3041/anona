import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ChangePassword extends Component {
  render() {
    return (
      <div>
        <section class="section-main innerpages">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-8 col-md-8 col-sm-12 text-center">
                <h1>{localStorage.getItem('ls_langauge_id') == 1 ? 'Change Password' : '   تغيير كلمة المرور '}</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 col-md-8 col-sm-7">
                <div class="package-box">
                  <div class="form-group">
                    <div class="inputbox">
                      <input
                        type="text"
                        value=""
                        placeholder="Old Password"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="inputbox">
                      <input
                        type="text"
                        value=""
                        placeholder="New Password"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="inputbox">
                      <input
                        type="text"
                        value=""
                        placeholder="Confirm Password"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="change-div">
                    <button class="button" type="submit">
                      {localStorage.getItem('ls_langauge_id') == 1 ? 'Submit' : ' يقدم   '}
                    </button>{" "}
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
												<Link to="/dashboard" >
												{localStorage.getItem('ls_langauge_id') == 1 ? 'Dashboard' : 'لوحة القيادة'}
												</Link>
											</li>
											<li>
												<Link to="/profile" > {localStorage.getItem('ls_langauge_id') == 1 ? 'My Profile' : 'ملفي'}</Link>
											</li>
											<li>
												<Link to="/address" > {localStorage.getItem('ls_langauge_id') == 1 ? 'My Address' : ' عنوان التوصيل الخاص بي'}</Link>
											</li>
											<li>
												<Link to="/change-password" class="active">{localStorage.getItem('ls_langauge_id') == 1 ? 'Change Password' : '  تغيير كلمة المرور  '}</Link>
											</li>
											<li>
												<a href="javascript:void(0);">{localStorage.getItem('ls_langauge_id') == 1 ? 'Logout' : '  تسجيل الخروج '}</a>
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
  }
}
