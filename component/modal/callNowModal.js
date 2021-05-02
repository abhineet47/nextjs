import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router from 'next/router';
import {sendOtpApi, callNowJobApi, jobVerifyOtpApi, locationSearchApi, jobSearchApi, citySearchApi } from '../actions/jobsApi';
import { MAIN_URL } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import OutsideClickHandler from "react-outside-click-handler";
import OwnAutoComplete from "../../component/_shared/ownAutocomplete";
import Autocomplete from "react-autocomplete";

let profileDetails = {
  mobileNumber: '',
  skill: '',
  empName: '',
  empCity: '',
  empLocality: '',
  otp: "",
}
let timeout;
let ac = null;
const CallNowModal = React.memo((props) => {

  const [profile, setProfile] = useState(profileDetails);
  const [error, setError] = useState({ isError: false, message: "" });
  const [isSubmitDeatils, setIsSubmitDeatils] = useState(false);
  const [isApiCalling, setIsApiCalling] = useState(false);
  const [profileArray, setProfileArray] = useState([]);
  const [loacationArray, setLocationArray] = useState([]);
  const [localityArray, setlocalityArray] = useState([]);
  const [timer, setTimer]=useState(59);
  const [profileSearchKey, setProfileSearchKey]=useState('');
  const [citySearchKey, setCitySearchKey]=useState('');
  const [localitySearchKey, setLocalitySearchKey]=useState('');
  const [mobileNumber, setMobileNumber]=useState('');


  useEffect(() => {
    console.log("CALL NOW POPUP", props)
    if ('OTPCredential' in window) {
      try {
        ac = new AbortController();
        navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal: ac.signal
        }).then(otp => {
          setProfile({ ...profile, 'otp': otp.code });
        }).catch(err => {
          // alert(err);
        });
      }
      catch (e) {
        //alert(e);
      }
    } else {
      // alert("WEB OTP not supported");
    }
    if(props?.dataOwn){
      const { name, location } = props?.dataOwn;
      const city = location.split("(")[0].trim();
      profileDetails.skill = name;
      setProfileSearchKey(name);
      profileDetails.empCity = city;
      setCitySearchKey(city);
      setProfile(profileDetails);
    }
    // setLocationValue(city);
  }, []);

  useEffect(() => {
    return () => {
      console.log("cleaned up");
      if(ac){
        ac.abort();
      }
    };
  }, []);

  const handleOnChange = (evt) => {
    const value = evt.target.value;
    setError({ isError: false, message: "" });
    if(evt.target.name!== "mobileNumber"){
      setProfile({
        ...profile,
        [evt.target.name]: value
      });
    } else if(value.length<11){
      setProfile({
        ...profile,
        [evt.target.name]: value
      });
      setMobileNumber(value);
    }
  }

  const onHandleSetName=(evt)=>{
    const value = evt.target.value;
    setError({ isError: false, message: "" });
    const letters = /^[a-zA-Z ]{0,30}$/;
    if (value.match(letters)) {
      setProfile({
        ...profile,
        [evt.target.name]: value
      });
    }
  }
   const resendOtp = async () => {
    if (mobileNumber) {
      props.handleLoader(true)
     const OTP_Obj = {
      mobile: mobileNumber
    }
      let res = await sendOtpApi(OTP_Obj);
      if (res.data.status === 200) {
        props.globalAlert('success', res.data.message)
       
      }
      else {
        props.globalAlert('error', res.data.message)

      }
      props.handleLoader(false)

    }
    // timerStart()

  }

  const checkObjectProperties = obj => {
    const arr = ['otp', 'empLocality'];
    for (var key in obj) {
      if (!arr.includes(key)) {
        if (obj[key].length === 0)
          return false;
      }
    }
    return true;
  }

  const onSubmit = async () => {
    setError({ isError: false, message: "" });
    if (profile.mobileNumber && profile.mobileNumber.length > 9) {
      if (checkObjectProperties(profile)) {
        const empProfileData = {
          mobile: profile.mobileNumber,
          profile: profile.skill,
          name: profile.empName,
          city: profile.empCity,
          location: profile.empLocality,
        }
        setIsApiCalling(true);
        const callNowJobRes = await callNowJobApi(empProfileData);
        setIsApiCalling(false);
        if (callNowJobRes.status === 200) {
          setIsSubmitDeatils(true);
          // startTimer();
        } else {
          setError({ isError: true, message: "OOPS! Something went wrong" });
        }
      } else {
        setError({ isError: true, message: "Fields can not be empty" });
      }
    } else {
      setError({ isError: true, message: "Please Enter Valid Mobile Number" });
    }
  }

  const onVerifyOTP = async () => {
    const OTP_Obj = {
      mobile: mobileNumber,
      job: props?.dataOwn?.id,
      otp: profile.otp
    }
    // alert(JSON.stringify(OTP_Obj));
    setIsApiCalling(true);
    const JobVerifyOtpRes = await jobVerifyOtpApi(OTP_Obj);
    setIsApiCalling(false);
    if (JobVerifyOtpRes.data.status === 200) {
      window.open(`tel:${JobVerifyOtpRes.data.data.contactDetails.contactNumber}`, "_self");
      const { cookies } = props;
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
      now.setTime(expireTime);
      cookies.set('authtoken', JobVerifyOtpRes.data?.data?.authToken, { path: '/', expires: now });
      cookies.set('userId', JobVerifyOtpRes.data?.data?.userId, { path: '/', expires: now });
      setProfile(profileDetails);
      props.onCloseModal();
      props.globalAlert('success', JobVerifyOtpRes.data.message);
      window.location.reload();
    } else {
      setIsApiCalling(false);
      setError({ isError: true, message: JobVerifyOtpRes.data.message });
      props.globalAlert('error', JobVerifyOtpRes.data.message);
    }
  }

  const onClose = () => {
    props.onCloseModal();
    setError({ isError: false, message: "" });
    setTimeout(() => {
      setIsSubmitDeatils(false);
    }, 400);
  }

  const locationApiCall = async (ev) => {
    let val = ev.target.value;
    // setProfile({ ...profile, 'empCity': val })
    setCitySearchKey(val);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let res = await locationSearchApi(val);
      if (res.data.status === 200) {
        setLocationArray(res.data.data.locations);
      }
    }, 1);
  };

  const profileApiCall = async (ev) => {
    let val = ev.target.value;
    // setProfile({ ...profile, 'skill': val })
    setProfileSearchKey(val);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let res = await jobSearchApi(val);
      if (res.data.status === 200) {
        setProfileArray(res.data.data.skills);
      }
    }, 1);
  };

  const localityApiCall = async (ev) => {
    let val = ev.target.value;
    // setProfile({ ...profile, 'empLocality': val })
    setLocalitySearchKey(val);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let res = await citySearchApi(profile.empCity, val);
      if (res.data.status === 200) {
        setlocalityArray(res.data.data.locations);
      }
    }, 100);
  };

  function startTimer(){
    let startIntervat = setTimeout(() => {
      let localTimer = Number(timer)
      if(localTimer-1>=10){
        setTimer(localTimer-1)
      }
      else if (timer-1<10 && timer-1>0){
        localTimer = localTimer-1;
        localTimer = `0${localTimer}`
        setTimer(localTimer)
      }
      else{
          clearInterval(startIntervat)
        // props.setTimerOver(true);
        
      }
    }, 1000);
  }

  function onFocusField(isOnFocus,fieldName){
    console.log("ONFOCUS",isOnFocus);
    if(fieldName==="SKILL" && !isOnFocus){
      setProfileSearchKey(profile.skill);
    } else if(fieldName==="CITY" && !isOnFocus){
      setCitySearchKey(profile.empCity);
    } else if(fieldName==="LOCALITY" && !isOnFocus){
      setLocalitySearchKey(profile.empLocality);
    }    
  }

  return (
    <>
      <Modal open={props.open} classNames={{ modal: "modal-sm modal-own call-modal modal-dialog" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>
        <div className="modal-content model-heading">
          <button type="button" className="close text-right pr-1" data-dismiss="modal" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 className="modal-title text-center" id="testphone"> कंपनी को कॉल करने के लिए फॉर्म भरें </h5>
          <div className="call-body">
            {/*<div id="companyno" className="text-info">9899888877</div>*/}
            <form name="frm" id="form" autoComplete="off">
              {error.isError ? <div id="phone-error" className="alert alert-danger text-danger mt-2 mb-2  text-center">{error.message}</div> : null}
              {isSubmitDeatils ? (<>
                <div className="signin-page2 text-center">
                  <div id="changeNumber" className="text-secondary text-sm">OTP has been sent to your number
                   <br />  <br /> 
                  </div>
                </div>
                <input type="number" name="otp" value={profile.otp} placeholder="Enter Your OTP" id="input-password" onChange={handleOnChange} className="form-control" />
                <div id="changeNumber" className="text-secondary text-sm">
                  <p>Please check SMS for an OTP</p>
                  <p><a href="#" onClick={resendOtp}>Resend</a> OTP:<span id="some_div"
                    className="text-danger">60 </span></p>
                    
                    {/*<p>  <span onClick={onVerifyOTP} className="text-primary">Resend OTP</span> or <span
                      className="text-primary" onClick={() => setIsSubmitDeatils(false)}> Change Mobile Number</span></p> */}

                  </div>
              </>) : (
                  <>
                    <div className="mb-1">
                      {/* <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default"><i
                          className="fa fa-phone"></i></span>
                      </div>*/}
                      <input type="number" autoComplete="off" className="form-control" name="mobileNumber" maxLength={10} value={profile.mobileNumber} placeholder="10 अंकों का मोबाइल नंबर दर्ज
                           करें"
                        id="input-username" onChange={handleOnChange} />
                    </div>
                    <div id="namelocation">

                      <div className="mb-1 profile-selection">
                        {/* <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroup-sizing-default"><i
                            className="fa fa-gear"></i></span>
                        </div>*/}

                        {/* <input type="text" name="skill" value={profile.skill} placeholder="क्या काम करते हो" id="input-name"
                          className="form-control" onChange={(e) => profileApiCall(e)} /> */}

                        <Autocomplete
                          inputProps={{ id: "states-autocomplete", placeholder: 'क्या काम करते हो', className: 'form-control' }}
                          wrapperStyle={{
                            position: "relative",
                            display: "block",

                          }}
                          onMenuVisibilityChange={(e) => onFocusField(e,"SKILL")}
                          value={profileSearchKey}
                          items={profileArray}
                          getItemValue={(item) => item.name}
                          onSelect={(value) => {setProfile({ ...profile, 'skill': value }); setProfileSearchKey(value)}}
                          shouldItemRender={(item, value) =>
                            item.name
                              .toLowerCase()
                              .indexOf(value.toLowerCase()) > -1
                          }
                          onChange={(e) => profileApiCall(e)}
                          renderItem={(item, highlighted) => (
                            <div
                              className={"list-wrapper"}
                              key={item._id}
                              style={{
                                backgroundColor: highlighted
                                  ? "#eee"
                                  : "transparent",
                              }}
                            >
                              {item.name}
                            </div>
                          )}
                          menuStyle={{
                            position: "absolute",
                            top: "40px",
                            left: 0,
                            right: 0,
                            background: "#fff",
                          }}
                        />
                      </div>




                      <div className="mb-1">
                        {/*<div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroup-sizing-default"><i
                            className="fa fa-user"></i></span>
                        </div>*/}

                        <input type="text" name="empName" value={profile.empName} placeholder="अपना नाम " id="input-name"
                          className="form-control" onChange={onHandleSetName} />
                      </div>

                      <div className="mb-1 profile-selection">
                        {/*<div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroup-sizing-default"><i
                            className="fa fa-map-marker"></i></span>
                        </div>*/}
                        {/* //////////////////////////////////////// */}
                        {/* <input type="text" name="empCity" value={profile.empCity} placeholder="शहर का नाम" id="input-location"
                          className="form-control" onChange={handleOnChange} /> */}
                        {/* ///////////////////////////////////////////// */}
                        <Autocomplete
                          inputProps={{ id: "states-autocomplete", placeholder: 'शहर का नाम', className: 'form-control' }}
                          wrapperStyle={{
                            position: "relative",
                            display: "block",
                            background: "#fff"
                          }}
                          onMenuVisibilityChange={(e) => onFocusField(e,"CITY")}
                          value={citySearchKey}
                          items={loacationArray}
                          getItemValue={(item) => item.location}
                          onSelect={(value) => {setProfile({ ...profile, 'empCity': value }); setCitySearchKey(value)}}
                          shouldItemRender={(item, value) =>
                            item.location
                              .toLowerCase()
                              .indexOf(value.toLowerCase()) > -1
                          }
                          onChange={(e) => locationApiCall(e)}
                          renderItem={(item, highlighted) => (
                            <div
                              className={"list-wrapper"}
                              key={item._id}
                              style={{
                                backgroundColor: highlighted
                                  ? "#eee"
                                  : "transparent",
                              }}
                            >
                              {item.location}
                            </div>
                          )}
                          menuStyle={{
                            position: "absolute",
                            top: "40px",
                            left: 0,
                            right: 0,
                            background: "#fff"
                          }}
                        />
                      </div>
                      <div className="mb-3 profile-selection">
                        {/*<div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroup-sizing-default"><i
                            className="fa fa-map-pin"></i></span>
                        </div> */}
                        {/* <input type="text" name="empLocality" value={profile.empLocality} placeholder="किस इलाके में रहते हैं"
                          id="input-locality" className="form-control" onChange={handleOnChange} /> */}
                        <Autocomplete
                          inputProps={{ id: "states-autocomplete", placeholder: 'किस इलाके में रहते हैं', className: 'form-control' }}
                          wrapperStyle={{
                            position: "relative",
                            display: "block",
                            background: "#fff"
                          }}
                          onMenuVisibilityChange={(e) => onFocusField(e,"LOCALITY")}
                          value={localitySearchKey}
                          items={localityArray}
                          getItemValue={(item) => item.location}
                          onSelect={(value) => {setProfile({ ...profile, 'empLocality': value }); setLocalitySearchKey(value)}}
                          shouldItemRender={(item, value) =>
                            item.location
                              .toLowerCase()
                              .indexOf(value.toLowerCase()) > -1
                          }
                          onChange={(e) => localityApiCall(e)}
                          renderItem={(item, highlighted) => (
                            <div
                              className={"list-wrapper"}
                              key={item._id}
                              style={{
                                backgroundColor: highlighted
                                  ? "#eee"
                                  : "transparent",
                              }}
                            >
                              {item.location}
                            </div>
                          )}
                          menuStyle={{
                            position: "absolute",
                            top: "40px",
                            left: 0,
                            right: 0,
                            background: "#fff",
                          }}
                        />

                      </div>
                    </div>
                  </>
                )
              }

              <div className="text-center">
                {!isSubmitDeatils ?
                  <button className="btn btn-info col-12" type="button" id="otp-check" onClick={onSubmit}>{isApiCalling ? "Please Wait..." : "Submit"}</button> :
                  <button className="btn btn-info col-12 mt-2" type="button" id="submitotp" onClick={onVerifyOTP}>{isApiCalling ? "Please Wait..." : "Call Now"}</button>
                }
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )

})

const mapStateToProps = state => ({
  applyLink: state.product.applyLink
})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
  setMobileFunc: (data, msg) => dispatch(setMobileFunc(data, msg)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(CallNowModal))
