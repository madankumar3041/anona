import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div style={{ marginTop: "111px" }}>
      <footer>
        <div class="container-fluid clearfix">
          <div class="row d-flex justify-content-between">
            {/* <div class="col-lg-3 col-md-3 col-sm-6">
              <h4>{localStorage.getItem('ls_langauge_id') == 1 ? 'Location' : 'موقع '}</h4>
              <iframe
                class="location-map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5848.915003587416!2d48.08572287922856!3d29.347276515297256!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdd610f1aa7c844f9!2sDesign%20Master!5e0!3m2!1sen!2sin!4v1612856464202!5m2!1sen!2sin"
                width="100%"
                frameborder="0"
                style={{ border: 0 }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div> */}
            <div class="col-lg-3 col-md-3 col-sm-6">
              <h4> {localStorage.getItem('ls_langauge_id') == 1 ? 'Contact Us' : 'معلومات الشركة '}</h4>
              <ul class="foot-links">
                <li>
                  <Link to="/" class="active">
                    {localStorage.getItem('ls_langauge_id') == 1 ? 'Home' : ' الرئيسية'}
                  </Link>
                </li>
                <li>
                  <Link to="/about">{localStorage.getItem('ls_langauge_id') == 1 ? 'About us' : 'معلومات عنا '}</Link>
                </li>
                <li>
                  <Link>{localStorage.getItem('ls_langauge_id') == 1 ? 'Packages' : ' خطط الوجبات'}</Link>
                </li>
                <li>
                  <Link to="/why-us">{localStorage.getItem('ls_langauge_id') == 1 ? 'Why us' : ' فلسفتنا'}</Link>
                </li>
                <li>
                  <Link to="/faq">{localStorage.getItem('ls_langauge_id') == 1 ? 'FAQs' : ' الأسئلة الشائعة'}</Link>
                </li>
                <li>
                  <Link to="/terms-conditions">{localStorage.getItem('ls_langauge_id') == 1 ? 'Terms & Condition' : ' الشروط والأحكام'}</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">{localStorage.getItem('ls_langauge_id') == 1 ? 'Privacy Policy' : ' سياسة الخصوصية'}</Link>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6">
              {/* <h4>{localStorage.getItem('ls_langauge_id') == 1 ? 'Instagram' : 'تحقق منا على  '}</h4>
              <ul class="insta-links">
                <li>
                  <img src="assets/images/insta1.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta2.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta3.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta4.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta5.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta6.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta7.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta8.jpg" alt="instagram" />
                </li>
                <li>
                  <img src="assets/images/insta9.jpg" alt="instagram" />
                </li>
              </ul> */}
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6">
              <h4>{localStorage.getItem('ls_langauge_id') == 1 ? 'Newsletter' : ' النشرة الإخبارية'}</h4>
              <p>
                {localStorage.getItem('ls_langauge_id') == 1 ? 'Sign up with your email address to receive news and updates.' : ' قم بالتسجيل باستخدام عنوان بريدك الإلكتروني لتلقي الأخبار والتحديثات ونصائح فقدان الوزن.'}
              </p>
              <div class="newsletter">
                <div class="newsletter-sub">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Email..."
                    class="form-control"
                  />
                  <button class="button">{localStorage.getItem('ls_langauge_id') == 1 ? 'Submit' : ' يقدم'}</button>
                </div>
              </div>
              <ul class="social-media">
                <li>
                  <a href="javascript:void(0);">
                    <img src="assets/images/facebook.svg" alt="facebook" />
                  </a>
                </li>
                {/* <li>
                  <a href="javascript:void(0);">
                    <img src="assets/images/twitter.svg" alt="twitter" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <img src="assets/images/linkedin.svg" alt="linked in" />
                  </a>
                </li> */}
                <li>
                  <a href="javascript:void(0);">
                    <img src="assets/images/instagram.svg" alt="instagram" />
                  </a>
                </li>
                {/* <li>
                  <a href="javascript:void(0);">
                    <img src="assets/images/youtube.svg" alt="youtube" />
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <img src="assets/images/pinterest.svg" alt="pinterest" />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <section class="section-copyrights">
        <div class="container-fluid clearfix">
          <div class="row">
            <div class="col-12">
              <p class="copyrights">{localStorage.getItem('ls_langauge_id') == 1 ? 'All Rights Reserved, ©Lifestyle' : ' جميع الحقوق محفوظة © شركة لايف ستايل فود الكويت'}</p>
              <p class="designedby">
                Design by:{" "}
                <a href="https://www.design-master.com/" target="_blank">
                  Design Master
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
