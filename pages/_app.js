import App from 'next/app';
import React, {useEffect} from 'react';
import Head from 'next/head'
import {Provider} from "react-redux";
// import makeStore from '../component/store/index'
// import withRedux from "next-redux-wrapper";
// import {createStore} from "redux";
import { withCookies, Cookies } from 'react-cookie';
import withReduxStore from "../component/store/with-redux-wrapper";
import GlobalLoader from '../component/_shared/loader'
import CommonLayout from '../component/layout/index';
import AlertComponent from '../component/_shared/alert';
import axios from 'axios'
import { CookiesProvider } from 'react-cookie';
import 'react-responsive-modal/styles.css';
import { firebaseCloudMessaging } from '../component/_shared/webPush';
import firebase from 'firebase/app';
import localforage from 'localforage';
import { registerWebOtp } from '../utilities/commonFunction';
import  '../public/assets/css/main.css';
import  '../public/assets/css/profile.css';
import  '../public/assets/css/login.css';
import  '../public/assets/css/new.css';
import  '../public/assets/css/latest-jobs.css';
import  '../public/assets/css/home.css';

const MyApp =(props)=>{ 




  useEffect(()=>{
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     const { cookies } = props;
    //     var now = new Date();
    //     var time = now.getTime();
    //     var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
    //     now.setTime(expireTime);
    //     cookies.set('latitude', position.coords.latitude, { path: '/', expires: now });
    //     cookies.set('longitude', position.coords.longitude, { path: '/', expires: now });
    //   });
    // }
    //registerWebOtp();

setToken();
async function setToken() {

try {
const token = await firebaseCloudMessaging.init();
if (token) {
getMessage();
}
} catch (error) {

}
}
function getMessage() {
 
const messaging =firebase.messaging();
messaging.onMessage((message) => console.log('foreground ', message));
}

// if (window.matchMedia('(display-mode: standalone)').matches) {

// }
// else{

// }


  },[])


   const assetsDomains = ['https://cdnjs.cloudflare.com',
                'https://maxcdn.bootstrapcdn.com',
                'https://fonts.googleapis.com',
                'https://www.googletagmanager.com',
            ];



    const {Component, pageProps, reduxStore, apollo} = props;
    return (
        <>
        <Head>
          <title>Theincircle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Online Job Portal"/>
          {assetsDomains.map((val,index)=>{
                return <>
                     <link key={"pre"+index} rel="preconnect" href={val} />
                      <link key={"dns"+index} rel="dns-prefetch" href={val} />
                </>
            })}

              

          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
            defer="defer"
          ></link>
          <link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css"/>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />

          <link  href="https://fonts.googleapis.com/css?family=Ek+Mukta" rel="stylesheet"/>
          <link  href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,900&display=swap" rel="stylesheet"></link>
  


          {/* <link rel="stylesheet" href="../static/css/style.css" /> */}


         

        </Head>

        
        
        {/* <ApolloProvider client={apollo}> */}
        <Provider store={reduxStore}>
        <CookiesProvider>
          
          <CommonLayout headerData={props?.pageProps?.content?.header} footerData={props?.pageProps?.content?.footer}>
          <GlobalLoader/>
          <AlertComponent />
          
          <Component {...pageProps} />
          </CommonLayout>
          </CookiesProvider>
        </Provider>
        {/* </ApolloProvider> */}
        {/* <Component {...pageProps} /> */}
        </>
    );
  
}



export default withReduxStore(withCookies(MyApp));