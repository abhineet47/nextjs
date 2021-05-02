import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import ProfileLocation from '../../component/profile/location';
import ProfileFirstSection from '../../component/profile/firstSection';

import ProfileSkills from '../../component/profile/skills';
import ProfileIndustry from '../../component/profile/selectIndustry';
import ProfileWorkExperiance from '../../component/profile/workExperiance';
import ProfileEducation from '../../component/profile/education';
import ProfileBasicInfo from '../../component/profile/basicInfo';
import ProfileRightSide from '../../component/profile/rightSide';
import { userProfileApiMain,getUserProfileApi } from '../../component/actions/jobsApi';
import { MAIN_URL } from '../../component/types/types';
import Axios from 'axios';
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { withCookies, Cookies } from 'react-cookie';
import Link from 'next/link';








const Profile = (props) => {

    const [apiDetails, setApiDetails] = useState(null)
    // this.props.handleLoader(false)
    useEffect(() => {
        props.handleLoader(true)
        basicAuth()


    }, [])

    const basicAuth = async()=>{
        props.handleLoader(true)
        if(props?.allCookies?.authtoken && props?.allCookies?.userId){
            let res = await getUserProfileApi();
        
            if(res?.data?.status===200){
                if(res?.data?.data?.profileComplete){
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
        let res = await userProfileApiMain();
       
        if (res.data.status === 200) {
            setApiDetails(res?.data?.data)
        }
        else {
            props.globalAlert('error', res.data.message)
        }
        if(sessionStorage.getItem('scrollTo')){
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: ($(`#${sessionStorage.getItem('scrollTo')}`).first().offset()?.top - 15)
                },500);
    
                sessionStorage.removeItem('scrollTo')  
            }, 1);
           
        }
        props.handleLoader(false)


    }
    const getBasicDetails=()=>{

        const topHomeLocations = apiDetails?.locationsInfo?.topHomeLocations;
        const locationsInfo = apiDetails?.locationsInfo;
        if(apiDetails?.basicInfo){
            return {...apiDetails?.basicInfo,topHomeLocations,locationsInfo};
        } else {
            return null;
        }
    }

    function idExists(arr,_id) {
        return arr.some(function(el) {
          return el._id === _id;
        }); 
      }
    
    const getIndustryset=()=>{                  ////////////////////////////////////////////////
        const selectedIndustry= apiDetails?.userInfo?.industry;
        const data = apiDetails?.industrySet;
        let industrySet = null;
        if(apiDetails?.industrySet?.suggestedIndustries.length>0){
            industrySet = data?.suggestedIndustries.map((ele=>{
             if(idExists(selectedIndustry,ele._id)){
                 return {...ele,selected:true}
             } else {
                return {...ele,selected:false}
             }
           }));
           data["suggestedIndustries"] = industrySet;
           console.log("MODIFIED INDUSTRY SET",data);
        }
        return data;
    }
    
    function openquicklink() {
      var quicklink = document.getElementById('openmobquicklink');
      
    
        quicklink.style.display = 'block';
     
    }

function closequikclink(){
var quicklink = document.getElementById('openmobquicklink');
      quicklink.style.display = 'none';
}


    return (
        <>
            <Head>
            { ReactHtmlParser(Array.isArray(props?.content?.pageContent?.metaInfo) && props?.content?.pageContent?.metaInfo.reduce((prev, curr)=>prev+curr)) }

                <link rel="stylesheet" href="/assets/css/employee-profile.css" />
                <script
dangerouslySetInnerHTML ={{__html: `
 gtag('event', 'conversion', {'send_to': 'AW-789373352/LNOzCKj2ovoBEKjDs_gC'});
  `}}/>
            </Head>
            <Header data={props?.content?.header} />
            {/* <br /> */}
            <div className="container home employee">
                <div className="row">

                    <div className="col-sm-12">
                         <div id="profilecreation" className="w-60 col-12">
                        {/*  <h1>&nbsp;<a  id="quicklinks" onClick={openquicklink} className="quicklinks text-right d-block d-sm-none">Quick Links <i className="fa fa-navicon"></i></a></h1> */}
            

                            {/* profile upper section */}
                            <div className="profile-d1 container user-profile">
                            <div className="card">
                            <div className="card-body">
                            <ProfileFirstSection basicApiCall={basicApiCall} dataOwn={apiDetails?.profileInfo}/>
                            <div id="profileLocation">
                            <ProfileLocation basicApiCall={basicApiCall} dataOwn={apiDetails?.locationsInfo}/>
                            </div>
                            <div id="profileSkills">
                                <ProfileSkills basicApiCall={basicApiCall} dataOwn={apiDetails?.skillSet}/>
                            </div>
                            <div id="profileExp">
                                <ProfileWorkExperiance basicApiCall={basicApiCall} dataOwn={apiDetails?.workInfo}/>
                            </div>
                            <div id="profileEducation">
                                <ProfileEducation basicApiCall={basicApiCall} dataOwn={apiDetails?.educationInfo}/>
                            </div>
                            <div id="profileIndustry" >
                                <ProfileIndustry basicApiCall={basicApiCall} dataOwn={getIndustryset()}/>
                            </div>
                            <div id="basicInfo">
                                <ProfileBasicInfo basicApiCall={basicApiCall} dataOwn={getBasicDetails()}/>
                            </div>
                            </div>
                            </div>
                            </div>

                           


                            
                            <div className="matching-jobs"><Link href="/user/dashboard"><a href={void(0)} className='main-color cursor'><strong>View Matching Jobs</strong></a></Link> Based on Job Profile</div>

                        </div>
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
   
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
   
})


export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Profile));