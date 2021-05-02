import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../component/actions/commonActions';
import Head from 'next/head';
import Link from "next/link";

const notfound = (props) => {
    useEffect(() => {
        props.handleLoader(false)
    }, [])

    return (
        <>
         
<div className="home container-fluid text-center pt-4">
        <div className="logo"><a  href="//www.theincircle.com" title="The incircle" data-toggle="tooltip"><img src="/assets/img/logo.svg" /></a></div>
        <h3 className="title-hindi-login text-center notfound">404</h3>
        <div className="pagenotfound">THE PAGE CAN'T BE FOUND</div>
        <div className="signin-page">
          <br />
          <div className="text-left ">
            <a href="//www.theincircle.com" className="login-btn"><i className="fa fa-home" /> Home Page</a>
            <a href="//www.theincircle.com/latest-jobs" className="fb-login"><i className="fa fa-address-card" /> Go to Latest Job</a>
          </div>
        </div>
      </div>
      <br /><br /><br /><br />



<div className="footer-note text-center">



© 2020 TAGGER TECHNOLOGIES LLP, All Rights Reserved.
</div>
        </>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(notfound);