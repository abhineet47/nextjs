import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert, setUserProfile } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL, PHP_APP_URL } from '../types/types';
import { sendOtpApi, verifyOtpApi ,setMobileFunc, socialLoginApi, postLoginCustomApi, sendNotificationDetailsApi, getUserProfileApi} from '../actions/jobsApi';
import Router from 'next/router'
import { withCookies, Cookies } from 'react-cookie';
import TimerComp from './timer';
import SocialButton from './socialLogin';
import VerifySocialModal from '../modal/verifySocialLogin';
import localforage from 'localforage';



const LoginComp = (props) => {

  const [mobile, setMobile] = useState('');
  const [mobileValid, setMobileValid] = useState(false);
  const [emptyMobile, setEmptyMobile] = useState(false);
  const [emptyTerm, setEmptyTerm] = useState(false);
  const [term, setTerm] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [loginValidText, setLoginValidText] = useState('')
  const [timer, setTimer] = useState(5);
  const [timerOver, setTimerOver] = useState(false);
  const [timerStartData, setTimerStartData] = useState(false);
  const [otp, setOtp] = useState('');
  const [emptyOtp, setEmptyOtp] = useState(false);
  const [veirifyOtpModal, setVeirifyOtpModal] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [socialUserInfo, setSocialUserInfo] = useState(null);
  const [tempUserToken, setTempUserToken] = useState(null);
  const [otpHeading, setOtpHeading] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState('');
  const [profileCompleteFlag, setProfileCompleteFlag]=useState(null)


useEffect (()=>{
   if ('OTPCredential' in window) {
      try{
        const ac = new AbortController();
            navigator.credentials.get({
                otp: { transport: ['sms'] },
                signal: ac.signal
            }).then(otp => {
                setOtp(otp.code+'');
                //alert(otp.code);
            }).catch(err => {
               // alert(err);
            });
      }
      catch(e){
        //alert(e);
      }
    } else {
      //  alert("WEB OTP not supported");
    }
  if(props?.allCookies?.authtoken && props?.allCookies?.userId){
   basicAuth()
  }
},[])

const basicAuth = async ()=>{
  props.handleLoader(true)
  let res = await getUserProfileApi();
 // debugger
  if(res?.data.status===200){

    if(res?.data?.data?.profileComplete){
      Router.push('/')
    }
    else{
      Router.push('/create-profile')
    }
  }
  else{
  props.handleLoader(false)

  }
}



  const setMobileNumber = (e) => {
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex
    if ((e.target.value === '' || re.test(e.target.value) )&& e.target.value.length<11) {
      setMobile(e.target.value)
    }

  }

  const setOtpFunc = (e) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if ((e.target.value === '' || re.test(e.target.value))&& e.target.value.length<5) {
      setOtp(e.target.value)
    }

  }

  const formSubmit = async (ev) => {
    ev.preventDefault();
    let valid = await formValidation();
    if (valid) {
      setIsButtonDisabled(true);
      let obj = {
        mobile: mobile,
      }
      let res = await sendOtpApi(obj);
      if (res.data.status === 200) {
        setTimerStartData(true)
        // setTimer()
        setMobileValid(true)
        setLoginValidText(res.data.message)
      }

      else {
        props.globalAlert('error',"Error While Sending OTP. Please try again later.")
      }
    }
 setIsButtonDisabled(false);
  }


  const resendOtp = async () => {
    if (mobile) {
      props.handleLoader(true)
      let obj = {
        mobile: mobile,
      }
      let res = await sendOtpApi(obj);
      if (res.data.status === 200) {
        props.globalAlert('success', res.data.message)
        setTimerOver(false)
      }
      else {
        props.globalAlert('error', res.data.message)

      }
      props.handleLoader(false)

    }
    // timerStart()

  }

  const sendApiForm = async () => {
    if (!otp) {
      setEmptyOtp(true)
    }
    else {
      let obj = {
        mobile: mobile,
        otp: otp
      }
      props.handleLoader(true)
      let res = await verifyOtpApi(obj);
      if (res.data.status === 200) {
        const { cookies } = props;
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
        now.setTime(expireTime);
       // console.log(res.data.data.profileComplete);
        //if(res.data.data.profileComplete === true){
        cookies.set('authtoken', res.data?.data?.authToken, { path: '/', expires: now });
        cookies.set('userId', res.data?.data?.userId, { path: '/', expires: now });
        cookies.set('profileComplete', res.data.data.profileComplete );
        await postLoginCustomApi({token:res.data?.data?.authToken})
        //}
        props.globalAlert('success', res.data.message)
        props.setMobileFunc(mobile)


        let detailsObj = {
          fcmToken:await localforage.getItem('fcm_token'),
          userId:res.data?.data?.userId
      }
      sendNotificationDetailsApi(detailsObj)

        if (res.data?.data?.profileComplete) {
          // props.globalAlert('success', "profile exist")
          props.handleLoader(true)
          if (props.applyLink) {
            Router.push('/job-detail/[index]', `/${props.applyLink}`)

          }
          else {
            // window.location.href=(`${PHP_APP_URL}/employee/profile`);
            Router.push('/user/dashboard');

          }

        }
        else {
          props.setUserProfile({
            basicInfo:{
              name:mobile
            }
          })
          Router.push('/create-profile')

        }
      }
      else {
        props.globalAlert('error', res.data.message)
        props.handleLoader(false)
      }

    }
  }


  const formValidation = () => {
    let valid = true;
    if (!mobile) {
      setEmptyMobile(true)
      setMinLength(true)
      valid = false;
    }
    else {
      if (mobile.length < 10) {
        setMinLength(true)
        valid = false;
      }
    }

    if (!term) {
      setEmptyTerm(true)
      valid = false
    }


    return valid

  }
  const handleSocialLogin = async(user) => {
    props.handleLoader(true);
    let obj = {
      socialUserInfo:user
    }
    let res = await socialLoginApi(obj);
    if(res.data.status===200){
      const { cookies } = props;
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
      now.setTime(expireTime);
      cookies.set('authtoken', res.data?.data?.authToken, { path: '/', expires: now });
      cookies.set('userId', res.data?.data?.userId, { path: '/', expires: now });
      setTempUserToken({
        userid:res?.data?.data?.userId,
        jwt:res?.data?.data?.authToken
      })
      props.globalAlert('success', res.data.message);
      let detailsObj = {
        fcmToken:await localforage.getItem('fcm_token'),
        userId:res.data?.data?.userId
    }
   
      sendNotificationDetailsApi(detailsObj)

      setProfileCompleteFlag(res?.data?.data?.profileComplete)
      if(res?.data?.data?.profileComplete){
        if (props.applyLink) {
          Router.push('/job-detail/[index]', `/${props.applyLink}`)

        }
        else {
          // window.location.href=(`${PHP_APP_URL}/employee/profile`);
          Router.push('/user/dashboard');
         
        }
      }
      

      else if(!res?.data?.data?.mobileVerified && res?.data?.data?.userInfo?.mobile){
        setSocialUserInfo(res?.data?.data?.userInfo);
        setOtpHeading(res?.data?.message)
        setSentOtp(true)
        setVeirifyOtpModal(true);
      }
      else if(res?.data?.data?.mobileVerified){
        Router.push('/create-profile')
      }
      else if(!res?.data?.data?.mobileVerified){
        setSocialUserInfo(res?.data?.data?.userInfo);
        setVeirifyOtpModal(true);
      }

      
    }

    else{
      props.globalAlert('error', res.data.message)
      
    }
    props.handleLoader(false);
    
  }
   
  const handleSocialLoginFailure = (err) => {
    console.error(err)
  }

  return (
    <>
      <div>
        {/* <div className="container-fluid d-block d-sm-none">
          <div className="logo text-center">
            <Link href="/">
              <a title="The incircle" data-toggle="tooltip"><img src="/assets/img/logo.gif" /></a>
            </Link>
          </div>
        </div> */}
        {!mobileValid ?
          <div className="signin-page">
            <h1 className="title-hindi-login">नौकरी के लिए आवेदन करें </h1>
            <h3>Login Now For Apply The Job</h3>
            <form onSubmit={formSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <input inputMode="numeric" pattern="[0-9]*" type="number" name="username" onChange={(ev) => setMobileNumber(ev)} maxLength="12" value={mobile} placeholder="अपना मोबाइल नंबर लिखें" id="input-username" className="form-control" />
                </div>

                <div className="error-wrapper">

                     {emptyMobile && !mobile && <div id="phone-error" class="alert alert-danger text-danger mt-2 ">अपना 10 अंकों का मोबाइल नंबर दर्ज करें</div>}
                  {minLength && (mobile.length > 0 && mobile.length < 10) ?  <div id="phone-error" class="alert alert-danger text-danger mt-2 ">अपना 10 अंकों का मोबाइल नंबर दर्ज करें</div> : null}
                  {/* {this.state.notMatchPassword ? <span >Password not matched</span> : null} */}
                </div>
              </div>
              <div className="form-group hidden">
                <div className="input-group">
                  <input type="password" name="password" placeholder="Password" id="input-password" className="form-control" />


                </div>
              </div>
              <div className="text-center ">
                <button type="submit" className="login-btn cursor" disabled={isButtonDisabled}> Login</button>
                <span className="help-block hidden"><a href="/forgotten">Forgotten Password</a></span>
              </div>
            </form>
          
    
            {/* <a href="#" className="fb-login"><i className="fa fa-facebook" /> Login with Facebook</a>
          <a href="#" className="g-login"><i className="fa fa-google" /> Login with Google</a> */}
            <div className="term-text">
              <input type="checkbox" id="agree" checked={term} name="agree" value={term} onChange={(ev) => setTerm(ev.target.checked)} /> I agree to <a href={`${PHP_APP_URL}/terms`} target="_blank">Terms &amp; Conditions</a>.
          </div>
            <div className="error-wrapper">

              {emptyTerm && !term && <span >Please accept terms and conditions</span>}
            </div>
          </div>

          :
          <div>
            {/* <div className="container-fluid d-block d-sm-none">
              <div className="logo text-center">
                <Link href="/">
                <a  title="The incircle" data-toggle="tooltip"><img src="/assets/img/logo.gif" /></a>
                </Link></div>
            </div> */}
            <div className="signin-page_n">
              <div className="login-page">
                <div className="container">
                  
                   
                      {/*<h1 className="title-hindi-login">नौकरी के लिए आवेदन करें </h1>
                      <h3>Login Now For Apply The Job</h3>*/}
                      <p><br/><br/><br/>कृपया OTP के लिए अपना Message Box देखें</p>
                      <p>{loginValidText}</p>
                      <p><input inputMode="numeric" autoFocus pattern="[0-9]*" type="number" className="form-control" maxLength="8" value={otp} name='otp' onChange={setOtpFunc} placeholder="Enter Your OTP" /></p>
                      <div className="error-wrapper">

                        {emptyOtp && !otp && <span >Please enter OTP</span>}
                      </div>
                      
                      <div className="signin-page2 text-center">
                     <div id="changeNumber">अगर आपको <span id="some_div"><TimerComp setTimerOver={setTimerOver} /></span>  सेकंड में OTP नहीं मिलता है तो  
   <a href="#" onClick={resendOtp}> &nbsp;  <i className="fa fa-hand-o-right" /> Resend OTP</a> पर क्लिक करें या अपना नंबर बदलें   <br /> <br />
                      </div>
                      </div>
                      <button type="button" className="button button1 btn" onClick={sendApiForm}><i className="fa fa-hand-o-right" /> Next</button>
                    </div>
                     
                
              </div></div>
          </div>
        }</div>
      <br /><br /><br /><br />

      <VerifySocialModal open={veirifyOtpModal} profileCompleteFlag={profileCompleteFlag} userToken={tempUserToken} onCloseModal={()=>setVeirifyOtpModal(false)} sentOtp={sentOtp} userInfo={socialUserInfo} sentOtpHeading={otpHeading}/>
    </>
  )
}



const mapStateToProps = state => ({
  applyLink: state.product.applyLink
})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
  setMobileFunc: (data, msg) => dispatch(setMobileFunc(data, msg)),
  setUserProfile: (data) => dispatch(setUserProfile(data)),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LoginComp));
