import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux'
import { globalLoaderFunc, globalAlert, setUserProfile } from '../actions/commonActions';
import ProfileLocality from '../modal/profileLocalityModal';
import { getLocalitiesApi } from '../actions/jobsApi';
// import MoreLocationModal from '../modal/abc';
import { postUserProfileApi } from '../actions/jobsApi';
import { Modal } from 'react-responsive-modal';
import ReactAutocomplete from 'react-autocomplete';
import $ from 'jquery';
import Router from 'next/router';
import Link from 'next/link';




const ProfileRightSide = React.memo((props) => {


const scrollToSection =(val)=>{
    $('html, body').animate({
        scrollTop: ($(`#${val}`).first().offset().top - 15)
    },500);
}

const scrollToSectionOtherPage=(val)=>{
sessionStorage.setItem('scrollTo', val)
Router.push('/user/dashboard');
}

const logout = () => {
  // alert("yuyuyu");
  var now = new Date();
  console.log("RIGHT_SIDE",props);
  document.cookie = `authtoken=; expires=${now.toGMTString()}; path=/;`;
  document.cookie = `userId=; expires=${now.toGMTString()}; path=/;`;
  props.setUserProfile(null);
  Router.push('/login');
};


  return (
    <>
   
     <div className="filter-card quick-links"  >
          <h3>Quick Links</h3>
          <ul>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSection('profileInfo')}>My Profile</a></li>
            <li><i className="fa fa-hand-o-right" /> <Link href="/user/dashboard"><a className="link-click cursor" onClick={()=>scrollToSection()}>Dashboard</a></Link></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSection('profileLocation')}>Locations</a></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSection('profileSkills')}>Key Skills</a></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSection('profileExp')}>Work Experience</a></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSection('profileEducation')}>Education</a></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSection('basicInfo')}>Basic Information</a></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSectionOtherPage('matchingJob')}>Matching job</a></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSectionOtherPage('relatedJob')}>Related job</a></li>
           <li><i className="fa fa-hand-o-right" /> <Link href="/user/applied-jobs"><a className="link-click cursor" >Applied Jobs</a></Link></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor" onClick={()=>scrollToSection('profileInfo')}>Upload Resume</a></li>
            <li><i className="fa fa-hand-o-right" /> <a className="link-click cursor"  onClick={()=>logout()}>Logout</a></li>
          </ul>
        </div></>

  )

})

const mapStateToProps = state => ({


})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
  setUserProfile: (data) => dispatch(setUserProfile(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRightSide); 