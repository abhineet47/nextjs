import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types'
import { withCookies, Cookies } from 'react-cookie';
import { getUserProfileApi, applyJobApi, applyJobLink } from '../actions/jobsApi'
import Router from "next/router";
import ApplyNowModal from '../modal/applyNowModal'
import GoogleAd from '../../component/googleAdd/GoogleAd';
import Socialshare from './socialShare';
import { useRouter } from 'next/router'

const JobDetailsContent = (props) => {
  const [callModal, setCallModal] = useState(false);
  const [applyModalData, setApplyModalData] = useState(null);
  const [applied, setApplied] = useState(false);
  const [appliedHeader, setAppliedHeader] = useState(0);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (props.applyLink) {
      applyJob()
    }
    const handler = e => {
      e.preventDefault();
      if (window.innerWidth < 768) {
        setPromptInstall(true)
      }
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);


  }, [])

  useEffect(() => {

    if (props?.jobApplied) {
      setApplied(true)

    }
    else {
      setApplied(false)
    }

  }, [props?.jobApplied])

  useEffect(() => {


    if (props?.jobApplied) {
      setApplyModalData(props.contactDetails)
    }

  }, [props?.contactDetails])


  useEffect(() => {


    if (props?.jobApplied) {
      setApplyModalData(props.contactDetails)
    }

  }, [props?.contactDetails])


  const applyJob = async () => {



    if (props.applied) {

      setCallModal(true)
    }
    else {
      if (props.cookies.cookies.authtoken && props.cookies.cookies.userId) {
        props.handleLoader(true)
        let header = {
          jwt: props.cookies.cookies.authtoken,
          userid: props.cookies.cookies.userId
        }
        let res = await getUserProfileApi(header);

        if (res?.data?.status === 200) {
          if (res?.data?.data?.profileComplete) {

            // if(res.data.data.)


            let jobApply = await applyJobApi({ job: props?.dataOwn?.id }, header);
            if (jobApply?.data.status === 200) {
              props.globalAlert('success', jobApply.data.message)
              props.applyJobLink(null);
              setApplyModalData(jobApply?.data?.data?.contactDetails)
              setCallModal(true)



            }
            else {
              props.globalAlert('error', jobApply.data.message)
            }
          }
          else {
            props.applyJobLink(props?.dataOwn?.alias)
            Router.push('/create-profile')
          }
          props.handleLoader(false)

        }
        else {
          props.globalAlert("error", res.data.message)
          Router.push('/login')

        }
        props.handleLoader(false)

      }
      else {
        props.applyJobLink(props?.dataOwn?.alias)
        Router.push('/login')
      }
    }


  }

  const closeApplyModal = () => {
    setCallModal(false)
    props.setApplied(true)
    
  }

  
  //console.log('props', props?.userProfile)

  return (
    <>
      <div className="col-sm-9 add-right"><GoogleAd slot="1862427264" classNames="page-top page-job-detail" /></div>
     

     <h1  className="text-center job-header mt-0 mb-2">Job Details</h1>

      <article className="home mt-75">
      <button className="btn next_t back_t" onClick={() => router.back()} type="button" id="other-profile-check" ><span>Back</span> </button>
     <h1  className="text-center job-header mt-0 mb-2">Job Details</h1>
        <div className="card">
        <div className="card-body text-center">
        {/* <div className="instute-icon"><img src={`${MAIN_URL}${props?.dataOwn?.jobImage}`} height="70px" width="60px" /></div>*/}
      
        <div className="text-danger thecompany"><i className="fa fa-mail-forward"></i> {props?.dataOwn?.companyName}</div>
        <div className="text-primary thepost">Required: {props?.dataOwn?.name}</div>
        <div className="text-success salary">Salary:  {props?.dataOwn?.salaryRange} Per Month</div>


         <div className="exp-other-detail text-secondary mt-4 mb-4">
 <p className="text-secondary mb-4">Facilities:<br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Dayshift </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Full Time </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Esi/PF </span> <span class="badge badge-pill badge-danger"><i class="fa fa-check  text-warning"></i> Bonus </span> <span class="badge badge-pill badge-danger"><i class="fa fa-check  text-warning"></i> Lodge </span> </p>
Experience: {props?.dataOwn?.experienceRange} <br />
<p className="text-warning">Qualification: {props?.dataOwn?.jobQualification}</p> 
<p className="text-secondary p-2">Required Skills:<br /> 
 {props?.dataOwn?.skillSet?.length > 0 && props?.dataOwn?.skillSet.map((data, index) => (
            <span key={index} className="badge badge-primary">{data}</span>
          ))}

</p>
<p className="text-info ">Place: {props?.dataOwn?.location}</p>


<div className="text-secondary job-des"><span><b>Job description:</b>
  {props?.dataOwn?.description?.length > 0 && 
    props?.dataOwn?.description
  } 
</span>            
</div>
{/*<p className="text-primary  font-sm mt-4 mb-4">For Job Interview Apply or Call Kare</p>*/}
</div>



        { /* <h1 className="text-left">{props?.dataOwn?.name} <b className="d-none">Jobs in {props?.dataOwn?.location}</b>
          {props?.dataOwn?.paidJob == 1 && <span className="alert alert-warning"><i className="fa fa-bell-o"></i> Hot</span>}
          <span className="alert  alert-primary"><i className="fa fa-history" /> {props?.dataOwn?.timePosted}</span></h1>
        <div className="company-name">{props?.dataOwn?.companyName}</div>
        <div className="sub-text"><span><i className="fa  fa-map-marker" />{props?.dataOwn?.location}</span>   <span><i className="fa fa-send-o" />{props?.dataOwn?.distance}</span> <span><i className="fa fa-eye" />  {props?.dataOwn?.applications}  Views </span>
        </div>
        <div className="job-property">
          <ul className="job-details-list-text">
            <li className="col-sm-4 col-md-2">
              <i className="fa fa-address-card job-icon" />
              <dt>{props?.dataOwn?.jobCategory}</dt>
              <dl>Job Industry</dl>
            </li>
            <li className="col-sm-4 col-md-2">
              <i className="fa fa-money job-icon" />
              <dt>
                {props?.dataOwn?.salaryRange}
              </dt>
              <dl>
                Salary per month</dl>
            </li>
            <li className="col-sm-4 col-md-2">
              <i className="fa fa-briefcase job-icon" />
              <dt>
                {props?.dataOwn?.experienceRange}
              </dt>
              <dl>
                Experience</dl>
            </li>
            <li className="col-sm-4 col-md-2">
              <i className="fa fa-graduation-cap job-icon" />
              <dt>{props?.dataOwn?.jobQualification}</dt> <dl>Min Qualification</dl>
            </li>
            <li className="col-sm-4 col-md-2">
              <i className="fa fa-hourglass-1 job-icon" />
              <dt>{props?.dataOwn?.fullTime ? "Full Time" : "Part Time"} </dt><dl>Employment</dl>
            </li>
            <li className="col-sm-4 col-md-2">
              <i className="fa fa-phone job-icon" />
              <dt>{props?.dataOwn?.contactPerson}</dt> <dl>Contact Person </dl>
            </li>
          </ul>
        </div>
      */}
        <div className="text-center mobile-sticky">

          <a className="applynow cursor mr-1" onClick={applyJob}>
            <i className="fa fa-handshake-o" /> {props.applied ? <span>Contacts</span> : <span>Apply Now</span>}
          </a>


          {props?.userProfile ? 
            <a onClick={applyJob} className="applynow call cursor">
              <i className="fa fa-phone" /> Call Now</a> : <a onClick={props.openCallModal} className="applynow call cursor"><i className="fa fa-phone" /> Call Now
            </a>
          }
        </div>
        <Socialshare/>
       
        {/*<h3 className="text-center">Job Description</h3>
        <ul className="jd">
          {props?.dataOwn?.descriptionPointers?.length > 0 &&
            props?.dataOwn?.descriptionPointers.map((data, index) => (
              <li key={index}><i className="fa fa-hand-o-right" /> {data}</li>
            ))}


        </ul>
        <div className="note">
          <i className="fa fa-laptop" />
          {props?.dataOwn?.description}</div>
        <h3 className="text-center">Required Skills</h3>
        <div className="required-skill text-center">
          {props?.dataOwn?.skillSet?.length > 0 && props?.dataOwn?.skillSet.map((data, index) => (
            <span key={index}>{data}</span>
          ))}

        </div>
        <div className={`text-center mobile-sticky apply-job-button-wrapper ${props?.pwaActive ? 'top' : 'not'}`}>
          <a className="applynow cursor mr-1" onClick={applyJob}><i className="fa fa-handshake-o" /> {props.applied ? <span>Contact Details</span> : <span>Apply Now</span>}</a>
          {props?.userProfile ? <a onClick={applyJob} className="applynow call cursor"><i className="fa fa-phone" /> Call Now</a> : <a onClick={props.openCallModal} className="applynow call cursor"><i className="fa fa-phone" /> Call Now</a>}
        </div>
        */}
         </div>
          </div>
      </article>
    
     
    
      <ApplyNowModal open={callModal} applied={props.applied} onCloseModal={closeApplyModal} dataOwn={applyModalData} />

      <div> <GoogleAd slot="1862427264" timeout={1000} classNames="page-bottom" /></div>

    </>
  )
}




const mapStateToProps = state => ({

  applyLink: state.product.applyLink,
  pwaActive: state.common.pwaActive,
  userProfile: state.common.userProfile,
})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
  applyJobLink: data => dispatch(applyJobLink(data)),

  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
  currentClassDetails: (data, classId, classType) => dispatch(currentClassDetails(data, classId, classType))
})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(JobDetailsContent));
