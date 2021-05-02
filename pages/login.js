import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import Header from '../component/header/header'
import Footer from '../component/footer/footer'
import LoginComp from '../component/Login/login'
import { MAIN_URL } from '../component/types/types';
import axios from 'axios';
import https from 'https';
const Axios = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });

const Login=(props)=>  {

// this.props.handleLoader(false)

  useEffect(()=>{
 props.handleLoader(false)

  },[])


    return (
      <>
      <Head>
        <title>Login & Register on Theincircle.com Job Portal For Jobs</title>
      <meta charset="utf-8" />
      <meta name="description" content="नौकरी आवेदन करने के लिए Login or Register at Theincircle.com Job Portal and get the jobs in Your nearby Home." />
      <meta name="keywords" content="Manufacturing Jobs, Production jobs, Factory jobs, Hire Staff, Post Free Jobs, Warehouse jobs, Search jobs, hire candidates" />
      <meta name="google-site-verification" content="mtXriKKYIpTGbrds9dTWAdHC4BimQARzxL6ud9Tj8YY" />
	  <meta http-equiv="cache-control" content="no-cache" />
      <meta http-equiv="Expires" content="3600" />
      <meta http-equiv="Content-Language" content="en" />
      <meta name="revisit-after" content="1 day" />
      <meta name="robots" content="index,follow" />
      <meta name="publisher" content="Theincircle" />
      <meta name="copyright" content="TAGGER TECHNOLOGIES LLP" />
      <meta name="author" content="Theincircle" />
      <meta name="distribution" content="global" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	  <meta name="p:domain_verify" content="851cac906e388e98d21205340a21f529"/>
	  <meta property="place:location:latitude" content="28.7041" />
      <meta property="place:location:longitude" content="77.1025" />
      <meta property="business:contact_data:locality" content="Delhi" />
      <meta property="business:contact_data:postal_code" content="110002" />
      <meta property="business:contact_data:country_name" content="India" />
      <meta property="business:contact_data:email" content="info@theincircle.com" />
      <meta property="business:contact_data:phone_number" content="+01123242162" />
      <meta property="business:contact_data:website" content="https://www.theincircle.com/"></meta>
      <meta itemprop="name" content="Login & Register on Theincircle.com Job Portal For Jobs" />
      <meta itemprop="description" content="नौकरी आवेदन करने के लिए Login or Register at Theincircle.com Job Portal and get the jobs in Your nearby Home." />
      <meta itemprop="image" content="https://www.theincircle.com/img/logo.png" />
      <meta property="profile:username" content="Theincircle" />
      <meta property="og:type" content="Website" />
      <meta property="og:url" content="https://www.theincircle.com/" />
      <meta property="og:image" content="https://www.theincircle.com/img/logo.png" />
      <meta property="og:title" content="Login & Register on Theincircle.com Job Portal For Jobs" />
      <meta property="og:description" content="नौकरी आवेदन करने के लिए Login or Register at Theincircle.com Job Portal and get the jobs in Your nearby Home." />
      <meta property="fb:app_id" content="327979858269092" />
      <meta property="og:fbid" content="189709921180387" />
      <meta property="og:site_name" content="Theincircle" />
      <meta property="og:see_also" content="https://www.theincircle.com/"></meta>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@theincircle" />
      <meta name="twitter:creator" content="https://twitter.com/theincircle" />
      <meta name="twitter:Image"content="https://www.theincircle.com/img/logo.png" />
      <meta name="twitter:url" content="https://www.theincircle.com/" />
      <meta name="twitter:title" content="Login & Register on Theincircle.com Job Portal For Jobs" />
      <meta name="twitter:description" content="नौकरी आवेदन करने के लिए Login or Register at Theincircle.com Job Portal and get the jobs in Your nearby Home." />
      <link rel="icon" type="image/x-icon" href="https://www.theincircle.com/images/favicon.png"/>
      <link rel="canonical" href="https://www.theincircle.com/" />
      <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="/assets/css/login.css"/>
      </Head>
      <Header data={props?.content?.header}/>
      <div className="home">
        <LoginComp/>
        
      </div>
      <Footer data={props?.content?.footer}/>

       </>
    )
  }


  export async function getServerSideProps(context) {
  let header ={}

    let query = context?.req?.headers?.cookie;
  if(query){    
      var langOwn =query.match('(^|;)\\s*' + "langOwn" + '\\s*=\\s*([^;]+)');
      langOwn =  langOwn ? langOwn.pop() : '';
      if(langOwn){
        header.langOwn=langOwn;
      };
      var authtoken =query.match('(^|;)\\s*' + "authtoken" + '\\s*=\\s*([^;]+)');
      authtoken =  authtoken ? authtoken.pop() : '';
      if(authtoken){
        header.jwt=authtoken;
      };
      var userId =query.match('(^|;)\\s*' + "userId" + '\\s*=\\s*([^;]+)');
      userId =  userId ? userId.pop() : '';
      if(userId){
        header.userid=userId;
      };
      var latitude =query.match('(^|;)\\s*' + "latitude" + '\\s*=\\s*([^;]+)');
      latitude =  latitude ? latitude.pop() : '';
      if(latitude){
        header.latitude=latitude;
      };
      var longitude =query.match('(^|;)\\s*' + "longitude" + '\\s*=\\s*([^;]+)');
      longitude =  longitude ? longitude.pop() : '';
      if(longitude){
        header.longitude=longitude;
      };
    }
    const res = await Axios.get(`${MAIN_URL}/content/site` , {headers:header});
    
    return {
      props: {
        content:res.data?.data,
      }
    }
  }

const mapStateToProps = state => ({
  currentClassData: state.product.currentJobData,
  classId: state.product.classId,
  classType: state.product.classType,
})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
  currentClassDetails: (data, classId, classType) => dispatch(currentClassDetails(data, classId, classType))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);