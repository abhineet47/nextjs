import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux'
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';

import BasicInfoModal from '../modal/basicInfoModal';
import { MAIN_URL, salaryArray } from '../../component/types/types';
import Router from 'next/router'
import {
    openDashboardFunc,
  } from "../actions/jobsApi";




const DashboardLeftSide = React.memo((props) => {
    const goToProfile = (val)=>{
        props.handleLoader(true)
        sessionStorage.setItem('scrollTo', val)
        Router.push('/user/profile');
    }

    return (
        <>
    <div className={`filter profile modal ${props?.openDashboard?'open':'null'}`} id="filter" tabIndex={-1} role="dialog" aria-labelledby="filter" aria-hidden="true">
                <button onClick={()=>props.openDashboardFunc(false)} type="button" className="close  d-block d-sm-none" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                



<div className="filter-card dashbord-update">
<a className="profile-pic"><img src={`${props?.dataOwn?.profileInfo?.profilePic}`} /></a>
<br /><br />
<div className="text-right edit-profile"><a className="edit-prifile text-light" onClick={() => goToProfile('profileInfo')}><i className="fa fa-pencil" /></a></div>
<p>आपका नाम : <strong>{props?.dataOwn?.profileInfo?.name}</strong></p>
<p>Mobile Number : <strong>{props?.dataOwn?.profileInfo?.mobile}</strong></p>
                 
<p>Profile : <strong>{props?.dataOwn?.profileInfo?.designation}</strong></p>
    <h4>Industry </h4>
    <div className="exp-pro exp-pro1">
   
     {props?.dataOwn?.workInfo?.length > 0 && props?.dataOwn?.workInfo.map(data => (
<div  key={data?._id}>
    <input type="radio"  defaultChecked={false} value={false} name="role" />
        <label className="text-left" htmlFor="Machine-Operator">{data?.companyName}</label>
    </div>
    ))}


 </div> 
    <h4>Profile(Kis type ka kaam):</h4>
    <div className="exp-pro exp-pro1">
     <input type="radio" className="button" id="Aerospace"  name="Profile" defaultChecked />
     <label htmlFor="Aerospace">{props?.dataOwn?.userInfo?.skills[0]?.name}</label>          
   </div>
</div>

<div className="filter-card dashbord-update">
<h3>Location/Salary</h3>
<div className="text-right edit-profile"><a className="edit-prifile text-light" onClick={() => goToProfile('profileSkills')}><i className="fa fa-pencil" /></a></div>
<p>काम का एक्सपीरियंस: <strong>5 + years</strong><br/>
महीने की सैलरी: <strong>{props?.dataOwn?.profileInfo?.currentSalary}</strong><br/>
City Name : <strong>{props?.dataOwn?.userInfo?.workLocality?.city} </strong><br/>
मोहल्ले का नाम:  <strong>{props?.dataOwn?.userInfo?.workLocality?.location}</strong><br/>
</p>
<h3>Skills  :</h3>
<div className="text-left exp-pro exp-pro1">
{props?.dataOwn?.userInfo?.skills?.length > 0 && props?.dataOwn?.userInfo?.skills.map(data => (
<div className="d-inline-block " key={data?._id}>
    <input type="radio" id="Machine-Operator" defaultChecked={false} value={false} name="role" />
        <label className="text-left" htmlFor="Machine-Operator">{data?.name}</label>
    </div>
    ))}
</div>
</div>

<div className="filter-card dashbord-update">
<div className="text-right edit-profile"><a className="edit-prifile text-light" onClick={() => goToProfile('profileSkills')}><i className="fa fa-pencil" /></a></div>
<h3>Work Experience</h3>
<p>Company Name  : <strong> {props?.dataOwn?.workInfo[0]?.companyName}</strong></p>
<p>Profile :  <strong>{props?.dataOwn?.workInfo[0]?.jobRole}</strong><br />
Kitne saal kiya is company mein: <strong>{props?.dataOwn?.workInfo[0]?.jobYears}</strong><br />
</p>
</div>
                
<div className="filter-card dashbord-update">
<div className="text-right edit-profile"><a className="edit-prifile text-light" onClick={() => goToProfile('profileExp')}><i className="fa fa-pencil" /></a></div>
<h3>Education</h3>
<p>Education  : <strong>{props?.dataOwn?.userInfo?.qualification?.name}</strong><br />
Institute/University :  <strong> {props?.dataOwn?.userInfo?.university}</strong><br />
Certification:  <strong> {props?.dataOwn?.userInfo?.course?.name}</strong><br />
Institutes Name: <strong>{props?.dataOwn?.userInfo?.instituteName}</strong>
</p> 
</div>
    <div className="filter-card dashbord-update">
    <div className="text-right edit-profile"><a className="edit-prifile text-light" onClick={() => goToProfile('profileInfo')}><i className="fa fa-pencil" /></a></div>            
    <h3>Personal Details</h3>
    <div className="text-left">
    <p>Home Town: <strong>{props?.dataOwn?.userInfo?.location?.city}</strong><br/>
    Gender: <strong>Male</strong><br/>
    Age: <strong>28 years</strong><br/>
    Adharcard Number: <strong>+91-{props?.dataOwn?.profileInfo?.mobile}</strong><br/>
    Email id agar hai to: <strong>{props?.dataOwn?.userInfo?.user?.email}</strong><br/>
    Resume upload agar hai to: <strong>Resume Updated</strong><br/>
    Vechile: 
    {props?.dataOwn?.userInfo?.basicInfo?.haveBike? <i className="fa fa-motorcycle fa-lg"></i>:" Don't Have Motor-Cycle"}
    </p>


</div>
    
</div>

</div>            
           

        </>

    )

})

const mapStateToProps = state => ({

    openDashboard:state.common.openDashboard,

})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
  openDashboardFunc: data => dispatch(openDashboardFunc(data)),


})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLeftSide); 
