import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Router,{ useRouter } from 'next/router';
import $ from 'jquery';
import {
  globalLoaderFunc,
  globalMobileMenu,
  setExpFilter,
  setUserProfile,
} from "../actions/commonActions";
import Head from "next/head";
import Link from "next/link";
import { MAIN_URL, PHP_APP_URL } from "../types/types";
import LanguageModal from "../modal/languageModal";
import { withCookies, Cookies } from "react-cookie";
import {
  languageArrayFunc,
  getLanguageApi,
  getExperianceApi,
  getUserProfileApi,
  openDashboardFunc,
} from "../actions/jobsApi";

let selectedMenu='';
const Header = (props) => {

  const [langModal, setLangModal] = useState(false);
  const [showLangOption, setShowLangOption] = useState(false);
  const router = useRouter()

  useEffect(() => {
    
    console.log(props.allCookies.profileComplete);
    // alert("HEADERRRRRRRR");
    getUserProfileFunc();
    
    //console.log('PROPSS HEADER',router)
    if(router?.route === '/user/profile'){
      selectedMenu = "USER_PROFILE";
    }

    if (props.languageArray?.length <= 0) {
      langApiCall();
    }
    if (props.expFilterArray?.length === 0) {
      getExpFunc();
    }
    props.globalMobileMenu(false);
    langModalFunc();
  }, []);

  useEffect(() => {
    if (
      props.allCookies.authtoken &&
      props.allCookies.userId
    ) {
      if ("geolocation" in navigator) {
        // navigator.geolocation.getCurrentPosition(function (position) {
        //   const { cookies } = props;
        //   var now = new Date();
        //   var time = now.getTime();
        //   var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
        //   now.setTime(expireTime);
        //   cookies.set('latitude', position.coords.latitude, { path: '/', expires: now });
        //   cookies.set('longitude', position.coords.longitude, { path: '/', expires: now });
        // });
      }
    }
  })
  
  const logout = () => {
    var now = new Date();
    document.cookie = `authtoken=; expires=${now.toGMTString()}; path=/;`;
    document.cookie = `userId=; expires=${now.toGMTString()}; path=/;`;
    document.cookie = `profileComplete=; expires=${now.toGMTString()}; path=/;`;
    props.setUserProfile(null);
    Router.push('/login');
  };

  const langModalFunc = async () => {
    if (window.innerWidth < 768) {
      setShowLangOption(true);
      if (!props.allCookies.langOwn) {
        setLangModal(true);
      }
    }
  };

  const getUserProfileFunc = async () => {
    
    if (
      props.allCookies.authtoken &&
      props.allCookies.userId &&
      (!props.userProfile || Object.keys(props.userProfile).length <= 0)
    ) {
      props.globalMobileMenu(true);
      let res = await getUserProfileApi();
      if (res.data.status === 200) {
        props.setUserProfile(res.data.data.userInfo);
        console.log(res.data.data.userInfo);
      }
    }
  };

  const getExpFunc = async () => {
    let res = await getExperianceApi();
    if (res.data.status === 200) {
      props.setExpFilter(res.data.data.experiencesFilters);
    }
  };

  const langApiCall = async () => {
    props.handleLoader(true);

    let res = await getLanguageApi();
    if (res.data.status === 200) {
      props.languageArrayFunc(res.data?.data?.languageOptions);
    }
    props.handleLoader(false);
  };

  const openModal = (ev) => {
    ev.preventDefault();
    setLangModal(true);
    props.globalMobileMenu(false);
  };

  const scrollToSection =(val)=>{
    $('html, body').animate({
        scrollTop: ($(`#${val}`).first().offset().top - 15)
    },500);
    props.globalMobileMenu(false);
}

const scrollToSectionOtherPage=(val)=>{
  selectedMenu = val;
  sessionStorage.setItem('scrollTo', val)
  Router.push('/user/dashboard');
  props.globalMobileMenu(false);
}

 const clickOnProfile=()=>{
  selectedMenu = "USER_PROFILE";
  Router.push('/user/profile');
  props.globalMobileMenu(false);
 }


  return (
    <>
      <Head>
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

       
        
      </Head>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light  bg-nav">
        <Link href="/">
            <a className="navbar-brand logo" title="The incircle" data-toggle="tooltip"><img src="/assets/img/logo.svg" height="70px" /></a>
            </Link>
        
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => props.globalMobileMenu(!props.mobileMenu)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse ${
              props.mobileMenu ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              {/* showLangOption && (
                <li className="nav-item">
                  <a onClick={openModal} target="_blank" className="nav-link">
                    Language
                  </a>
                </li>
              ) */}
              {props?.data?.links &&
                props.data.links.length > 0 && !props?.userProfile?.basicInfo?.gender &&
                props.data.links.map((link, index) => (
                  <li className="nav-item" key={index}>
                    {link.is_external ? (
                      <a
                         href={`/${link.alias}`}
                    
                        target="_blank"
                        className="nav-link"
                        onClick={() => props.globalMobileMenu(false)}
                      >
                        {link.name}
                      </a>
                      

                    ) : link.dynamic_route ? (
                      link?.level === 1 ? (
                        <Link
                          href="/[dynamic]"
                          as={`/${link.alias}`}
                          key={index}
                        >
                          <a key={index} className="nav-link" target="_blank">
                            {link.name}
                          </a>
                        </Link>
                      ) : link?.level === 2 ? (
                        <Link
                          href="/jobs/[jobsPosting]"
                          as={`/${link.alias}`}
                          key={index}
                        >
                          <a key={index} className="nav-link" target="_blank">
                            {link.name}
                          </a>
                        </Link>
                      ) : (
                        <Link
                          href="/jobs/[jobsPosting]/[index]"
                          as={`/${link.alias}`}
                          key={index}
                        >
                          <a key={index} className="nav-link" target="_blank">
                            {link.name}
                          </a>
                        </Link>
                      )
                    ) : (
                      <Link href={`/${link.alias}`}>
                        <a
                          className="nav-link" target="_blank"
                          onClick={() => props.globalMobileMenu(false)}
                        >
                          {link.name}
                        </a>
                      </Link>
                    )
                      
                    }
                  </li>
                ))}
            { props?.userProfile?.basicInfo?.gender && <React.Fragment>
            <li  className="nav-item nav-text" ><a className="nav-link" onClick={()=>clickOnProfile()}>My Profile</a></li>
            <li  className="nav-item nav-text" ><Link href="/user/dashboard"><a className="nav-link" onClick={()=>scrollToSection()}>Dashboard</a></Link></li>
            { selectedMenu === "USER_PROFILE" && <li  className="nav-item nav-text" ><a className="nav-link" onClick={()=>scrollToSection('profileLocation')}>Locations</a></li>}
            { selectedMenu === "USER_PROFILE" && <li  className="nav-item nav-text" ><a  className="nav-link" onClick={()=>scrollToSection('profileSkills')}>Key Skills</a></li>}
            { selectedMenu === "USER_PROFILE" && <li   className="nav-item nav-text" ><a  className="nav-link" onClick={()=>scrollToSection('profileExp')}>Work Experience</a></li>}
            { selectedMenu === "USER_PROFILE" && <li  className="nav-item nav-text" ><a  className="nav-link" onClick={()=>scrollToSection('profileEducation')}>Education</a></li>}
            { selectedMenu === "USER_PROFILE" && <li  className="nav-item nav-text" ><a  className="nav-link" onClick={()=>scrollToSection('basicInfo')}>Basic Information</a></li>}
            {/* <li  className="nav-item nav-text" ><a className="nav-link" onClick={()=>scrollToSectionOtherPage('matchingJob')}>Matching job</a></li>
            <li  className="nav-item nav-text" ><a  className="nav-link" onClick={()=>scrollToSectionOtherPage('relatedJob')}>Related job</a></li> */}
            {/* <li  className="nav-item nav-text" ><a  className="nav-link" >Applied Jobs</a></li> */}
            { selectedMenu === "USER_PROFILE" && <li  className="nav-item nav-text" ><a  className="nav-link" onClick={()=>scrollToSection('profileInfo')}>Upload Resume</a></li>}
            <li  className="nav-item nav-text" ><a  className="nav-link" onClick={()=>logout()}>Logout</a></li>
          </React.Fragment>}

            </ul>
         
            {!props?.userProfile?.basicInfo?.gender  ? (
              <>
              {props.allCookies.profileComplete != "false" && (
              <div className="login d-none d-sm-block">
                <Link href="/login">
                  <a className="nav-link">
                    <i className="fa fa-user" /> Apply Online
                  </a>
                </Link>
              </div>
              )}
              <form className="form-inline cursor">
              <a
               className="emp-rec"
               href={`${PHP_APP_URL}/employerzone`}
               onClick={() => props.globalMobileMenu(false)}
               target="_blank"
             >
               <div className="input-group cursor">
                 <div className="input-group-prepend cursor">
                   <span
                     className="input-group-text btn-sm search-btn"
                     id="basic-addon1"
                   >
                     <img
                       src="/assets/img/search-icon.png"
                       alt="search-icon"
                     />
                   </span>
                 </div>
                 <button
                   type="button"
                   className="form-control search-input cursor"
                 >
                   {" "}
                   Hire Staff
                 </button>
               </div>
               </a>
           </form></>
            ) : (
              <div className="dev-login">
                <div className="mobile-number login pr-3 d-none d-sm-block">
                  <Link href="/user/profile">
                    <a className="nav-link">
                      <i className="fa fa-user" />{" "}
                      {props?.userProfile?.basicInfo?.name}
                    </a>
                  </Link>
                </div>

{/* ********************** HEADER WORK START ********************** */}

                <div className="mobile-number login pr-3 d-none d-sm-block">
                  <Link href="/user/dashboard">
                    <a className="nav-link">
                      <i className="fa fa-dashboard" />{" "}
                       Dashboard
                    </a>
                  </Link>
                </div>
                <div className="mobile-number login pr-3 d-none d-sm-block" onClick={()=>scrollToSectionOtherPage('matchingJob')}>
                  {/* <Link href="/user/dashboard"> */}
                    <a className="nav-link">
                      <i className="fa fa-address-card" />{" "}
                      Matching job
                    </a>
                  {/* </Link> */}
                </div>
                <div className="mobile-number login pr-3 d-none d-sm-block" onClick={()=>scrollToSectionOtherPage('relatedJob')}>
                  {/* <Link href="/user/profile"> */}
                    <a className="nav-link">
                      <i className="fa fa-address-book" />{" "}
                      Related job
                    </a>
                  {/* </Link> */}
                </div>
                <div className="mobile-number login pr-3 d-none d-sm-block">
                  <Link href="/user/applied-jobs">
                    <a className="nav-link">
                      <i className="fa  fa-check-square" />{" "}
                      Applied Jobs
                    </a>
                  </Link>
                </div>
                <div className="mobile-number login pr-3 d-none d-sm-block" onClick={()=>logout()}>
                  {/* <Link href="/user/profile"> */}
                    <a className="nav-link">
                      <i className="fa fa-power-off " />{" "}
                      Logout
                    </a>
                  {/* </Link> */}
                </div>
                
{/* ********************** HEADER WORK END ********************** */}


                {/* <div className="login logout">
                      <a className="nav-link" onClick={logout}><i className="fa fa-user" /> Logout</a>
                    </div> 
                */}
          </div>
            )}</div>
            
         
        </nav>
        <div className="container-fluid">
          <div className="logo" style={{display:'none'}}>
            <Link href="/">
              <a
                className="hidden-xs hidden-sm"
                title="The incircle"
                data-toggle="tooltip"
              >
                <img src="/assets/img/logo.svg" alt="logo" />
              </a>
            </Link>
          </div>
          <div className="employee-icon d-block d-sm-none">
            {props?.userProfile?.basicInfo?.gender ? (
              <span>
                <Link href="/user/dashboard">
                  <a className="nav-link">
                    <i className="fa fa-map-marker" /> My Jobs
                  </a>
                </Link>
              </span>
            ) : (
              <></>
            )}
   
       <span className="mr-0">
          {!props?.userProfile?.basicInfo?.gender ? (
                <Link href="/login">
                
                  <a href={void 0} style={{display: (props.allCookies.profileComplete != 'false') ? 'block' : 'none' }}>
                    <i className="fa fa-user" />
                    login
                  </a>
                
                </Link>
              ) : (
                <span className="mr-0">
                  {props?.userDashboard ? (
                    <a
                      className="nav-link cursor"
                      onClick={() => props.openDashboardFunc(true)}
                    >
                      <i className="fa fa-user" />{" "}
                      {props?.userProfile?.basicInfo?.name}
                    </a>
                  ) : (
                    <Link href="/user/profile">
                      <a className="nav-link">
                        <i className="fa fa-user" />{" "}
                        {props?.userProfile?.basicInfo?.name}
                      </a>
                    </Link>
                  )}
                </span>
              )}
            </span>
          
          </div>
        </div>
      </header>

      
    </>
  );
};


const mapStateToProps = (state) => ({
  languageArray: state.common.languageArray,
  selectedLanguage: state.product.selectedLanguage,
  mobileMenu: state.common.mobileMenu,
  expFilterArray: state.product.expFilterArray,
  userProfile: state.common.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  handleLoader: (data) => dispatch(globalLoaderFunc(data)),
  languageArrayFunc: (data) => dispatch(languageArrayFunc(data)),
  languageArrayFunc: (data) => dispatch(languageArrayFunc(data)),
  globalMobileMenu: (data) => dispatch(globalMobileMenu(data)),
  setExpFilter: (data) => dispatch(setExpFilter(data)),
  setUserProfile: (data) => dispatch(setUserProfile(data)),
  openDashboardFunc: (data) => dispatch(openDashboardFunc(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(Header));
