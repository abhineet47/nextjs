import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router from 'next/router';
import { sentSocialSentOtp, verifySocialSentOtp, postLoginCustomApi } from '../actions/jobsApi';
import { MAIN_URL } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert, setUserProfile } from '../actions/commonActions';



let localIndex = 0;
let colorOption = false;

const VerifySocialModal = React.memo((props) => {

    const [selectedLang, setSelectedLang] = useState(null);
    const [mobile, setMobile] = useState('');
    const [sentOtp, setSentOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpHeading, setOtpHeading] = useState('');

    useEffect(() => {

        if (props.sentOtp) setSentOtp(true)
        if (props.sentOtpHeading) setOtpHeading(props.sentOtpHeading)

    }, [])

    useEffect(() => {

        if (props.sentOtp) setSentOtp(true)


    }, [props.sentOtp])

    useEffect(() => {

        if (props?.userInfo?.mobile) setMobile(props?.userInfo?.mobile)


    }, [props?.userInfo?.mobile])

    useEffect(() => {
        if (props.sentOtpHeading) setOtpHeading(props.sentOtpHeading)

    }, [props.sentOtpHeading])

    const changeLang = (ev) => {

        setSelectedLang(ev.target.value)
    }


    const setOtpNumber = (e) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setOtp(e.target.value);
        }
    }

    const setMobileNumber = (e) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
            setMobile(e.target.value)
        }

    }

    const callApiCall = async () => {
        if (mobile && mobile.length > 9 && props.userToken) {
            props.handleLoader(true)
            let obj = {
                mobile: mobile,
            }
            let res = await sentSocialSentOtp(obj, props.userToken);

            if (res.data.status === 200) {
                setOtpHeading(res.data?.message)
                setSentOtp(true)

            }
            else {
                props.globalAlert('error', res.data.message)
            }
            props.handleLoader(false)

        }
    }

    const callApiVerify = async () => {
        if (otp && otp.length > 3 && props.userToken) {
            props.handleLoader(true)
            let obj = {
                mobile: mobile,
                otp: otp,
            }
            let res = await verifySocialSentOtp(obj, props.userToken);

            if (res.data.status === 200) {
                const { cookies } = props;
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
                now.setTime(expireTime);
                cookies.set('authtoken', res.data?.data?.authToken, { path: '/', expires: now });
                cookies.set('userId', res.data?.data?.userId, { path: '/', expires: now });
                await postLoginCustomApi({token:res.data?.data?.authToken})
                if (props.profileCompleteFlag) {
                    if (props.applyLink) {
                        Router.push('/job-detail/[index]', `/${props.applyLink}`)

                    }
                    else {
                        Router.push('/')
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
            }
            props.handleLoader(false)

        }
    }



    return (
        <>
            <Modal open={props.open} classNames={{ modal: "modal-sm modal-own call-modal" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>

                <div className="modal-content bg-light-blue">
                    {/* <button onClick={props.onCloseModal} type="button" className="close text-right pr-1" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button> */}

                    {/* <h5 className="modal-title text-center py-2" id="exampleModalLabel">{props?.dataOwn?.companyName}</h5> */}
                    {/* <p className="font-weight-bold text-center text-info pt-2"><i className="fa fa-phone" /> 9848738432</p> */}
                    <div className="call-body">
                        {sentOtp ? <p className="font-weight-bold text-center text-secondary pt-2">{otpHeading}</p> :
                            <p className="font-weight-bold text-center text-secondary pt-2"> Enter Your Mobile Number to verify</p>}
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa fa-phone" /></span>
                            </div>
                            <input type="text" value={mobile} maxLength={10} disabled={sentOtp} onChange={setMobileNumber} className="form-control" placeholder="Your mobile number" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        {sentOtp &&
                            <div className="py-3">
                                <input type="text" value={otp} maxLength={6} onChange={setOtpNumber} className="form-control" placeholder="OTP" aria-label="Default" aria-describedby="inputGroup-sizing-default" />

                            </div>
                        }
                        {!sentOtp ?
                            <div className="text-center"><button disabled={!mobile || mobile.length <= 9} onClick={callApiCall} className="btn btn-dark" type="button">Submit</button></div> :

                            <div className="text-center"><button disabled={!otp || otp.length <= 3} onClick={callApiVerify} className="btn btn-dark" type="button">Verify</button></div>}
                        {sentOtp &&
                            <div className="py-3 text-center">
                                <span className="cursor" onClick={callApiCall}>Resend OTP</span>
                            </div>}
                        {/* <div className="font-weight-light small text-center pt-2 cusror" onClick={props.onCloseModal}>Close and Continue the Website</div> */}
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
  setUserProfile: (data) => dispatch(setUserProfile(data)),


})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(VerifySocialModal))
