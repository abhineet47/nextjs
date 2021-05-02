import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import Router from 'next/router'
import { globalLoaderFunc,globalAlert } from '../component/actions/commonActions';
import { applyAutoLogin } from '../component/actions/jobsApi';
import {getQueryString} from '../utilities/commonFunction';

const redirecturl = (props) => {
    const [shouldRedirect,setShouldRedirect] = useState(true);
    // https://www.theincircle.com/redirecturl?job=5fd261a10ec783505e6cc189&user=5f7eff7e23648b01c246d8e6&action=apply
    useEffect(async () => {
        props.handleLoader(false);
        if(getQueryString('action') === "apply" && getQueryString('job') && getQueryString('user')){
            const obj = {
                userId:getQueryString('user'),
                job:getQueryString('job'),
                action:"apply",
            }
            const res = await applyAutoLogin(obj);
            
            if(res.data.status === 200){
                console.log("REDIRECT",props);
                const { cookies } = props;
                var now = new Date();
                var time = now.getTime();
                var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
                now.setTime(expireTime);
                cookies.set('authtoken', res.data?.data?.authToken, { path: '/', expires: now });
                cookies.set('userId', res.data?.data?.userId, { path: '/', expires: now });
                props.globalAlert('success', res.data.message);
                window.location.href = res.data?.data?.redirectUrl;
            } else {
              setShouldRedirect(false);
            }

        } else{
            setShouldRedirect(false);
        }
    }, [])

    return (
        <>
            <div className="home container-fluid text-center pt-4">
                {shouldRedirect ? "Redirecting..." : "OOPS! Something went wrong."}
            </div>
        </>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(redirecturl));