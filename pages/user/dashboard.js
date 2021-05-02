import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import DashboardLeftSide from '../../component/dashboard/leftSide';
import { userProfileApiMain, userDashboardJobsApi,getUserProfileApi,openDashboardFunc} from '../../component/actions/jobsApi';
import { MAIN_URL } from '../../component/types/types';

import DashboardRightSide from '../../component/dashboard/rightSide';
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { withCookies, Cookies } from 'react-cookie';
import GoogleAd from '../../component/googleAdd/GoogleAd';
import Axios from '../../customaxios';






const Dashboard = (props) => {

    const [apiDetails, setApiDetails] = useState(null);
    const [jobsDetails, setJobsDetails]=useState(null)

    useEffect(() => {
        props.handleLoader(true)
        basicAuth();
        props.openDashboardFunc(false)
    }, [])

    const basicAuth = async()=>{
        props.handleLoader(true)
        const { cookies } = props;
                    var now = new Date();
                    var time = now.getTime();
                    var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
                    now.setTime(expireTime);
        if(props?.allCookies?.authtoken && props?.allCookies?.userId){
            let res = await getUserProfileApi();
        cookies.set('profileComplete', res.data.data.profileComplete );
props.handleLoader(true);
           console.log('rett',res);
        
            if(res?.data?.status===200){
                if(res?.data?.data?.profileComplete){
                    props.handleLoader(true)
                    console.log('okkk');
                    basicApiCall()
                }
                else{
                    Router.push('/create-profile')
                }

            }
            else{
                props.globalAlert('error', res?.data?.message)
                Router.push('/login')
            }
        }
        else{
            Router.push('/login')
        }

        
    }


    const basicApiCall = async () => {
       
props.handleLoader(true)

        let [userInfo, jobsInfo] = await Promise.all([userProfileApiMain(), userDashboardJobsApi()]);
        
        
        let res = await userProfileApiMain();
        if (userInfo?.data?.status === 200 && jobsInfo?.data?.status===200) {
            setApiDetails(userInfo?.data?.data);
            setJobsDetails(jobsInfo?.data?.data)
        }
        else {
            props.globalAlert('error', res.data.message)
        }
        if(sessionStorage.getItem('scrollTo')){
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: ($(`#${sessionStorage.getItem('scrollTo')}`).first().offset().top - 15)
                },500);
    
                sessionStorage.removeItem('scrollTo')  
            }, 1);
           
        }
        props.handleLoader(false)
    }

 
    return (
        <>
            <Head>
            { ReactHtmlParser(Array.isArray(props?.content?.pageContent?.metaInfo) && props?.content?.pageContent?.metaInfo.reduce((prev, curr)=>prev+curr)) }

                <link rel="stylesheet" href="/assets/css/latest-jobs.css" />
                  <script
dangerouslySetInnerHTML ={{__html: `
 gtag('event', 'conversion', {'send_to': 'AW-789373352/LNOzCKj2ovoBEKjDs_gC'});
  `}}/>
            </Head>
            <Header userDashboard={true} data={props?.content?.header} />
            {/* <br /> */}
            <div className="container home employee">
        <div className="row">
          <div className="col-sm-4">
              <DashboardLeftSide dataOwn={apiDetails}/>
             </div>
          <div className="col-sm-8">
            <br />
            <GoogleAd slot="1862427264" />
            <DashboardRightSide dataOwn={jobsDetails?.pageContent} />
           </div>
        </div>
      </div>
            <Footer data={props?.content?.footer} />

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
    openDashboard:state.common.openDashboard,
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    openDashboardFunc: data => dispatch(openDashboardFunc(data)),
    
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
    currentClassDetails: (data, classId, classType) => dispatch(currentClassDetails(data, classId, classType))
})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Dashboard));





