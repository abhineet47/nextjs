import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import Head from 'next/head';
import {signupAlertApi} from '../actions/jobsApi'





const HomeJobAlert = (props) => {
  const [mobile, setMobile] = useState('');


  const setMobileNumber = (e) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (e.target.value === '' || re.test(e.target.value)) {
      setMobile(e.target.value)
    }

  }
  const formSubmit = async (ev) => {
    ev.preventDefault();
    if(mobile?.length>9){
      let obj = {
        mobile: mobile,
      }
      let res = await signupAlertApi(obj);
      if (res.data.status === 200) {
        props.globalAlert('success', res.data.message)
        setLoginValidText(res.data.message)
      }

      else {
        props.globalAlert('error', res.data.message)
      }
    }

  }

    return (
        <>
       <section className="NL-Subscription">
        <div className="container-fluid text-center">
          <div className="nl"><img src="/assets/img/nl-sbus.png" alt="News Letter" /></div>
          <h2>Get instant <span>job alerts</span> from top companies</h2>
          <p>Be the first one to apply to jobs</p>
          <form className="form-inline" onSubmit={formSubmit}>
            <div className="form-group mx-sm-3 mb-2">
            <input type="text" onChange={(ev) => setMobileNumber(ev)} maxLength="10" value={mobile} placeholder="Mobile Number" id="input-username" className="form-control" />
            </div>
            <button type="submit" disabled={mobile?.length<10} className="btn btn-primary mb-2 get-alert-btn">Get Job Alert</button>
          </form>
          <div className="jobs2">
            <ul>
              <li><a href="https://www.theincircle.com/hireemployee" target="_blank"><span><img alt="icon" src="/assets/img/job1.png" alt="Search Candidates" /></span>Hire Candidates</a></li>
              <li><a href="https://www.theincircle.com/employerzone/post-job" target="_blank" className="mnc"><span><img alt="icon" src="/assets/img/job2.png" alt="Post Job" /></span>Post Job</a></li>
              <li><a href="https://www.theincircle.com/plans" target="_blank" className="walk"><span><img alt="icon" src="/assets/img/job3.png" alt="Fastest Hiring Solutions" /></span>Fastest Hiring Solutions</a></li>
            </ul>
          </div>
        </div>
      </section>  </>
       )
}



const mapStateToProps = state => ({
    currentClassData: state.product.currentJobData,
    classId: state.product.classId,
    classType: state.product.classType,
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data,msg) => dispatch(globalAlert(data, msg)),
    currentClassDetails: (data, classId, classType) => dispatch(currentClassDetails(data, classId, classType))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeJobAlert);


