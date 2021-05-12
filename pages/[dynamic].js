import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import JobListing from '../component/jobListing/joblisting';
import axios from 'axios';
import Header from '../component/header/header';
import Footer from '../component/footer/footer';
import { data } from 'jquery';
import ReactHtmlParser from 'react-html-parser';
import JobDetailsContent from '../component/jobDetails/jobDetails';
import SimilarJobs from '../component/jobDetails/similarJobs';
import CallNowModal from '../component/modal/callNowModal';
import { MAIN_URL } from '../component/types/types';
import jobDetails from '../component/jobDetails/jobDetails';
import $ from 'jquery';
let datatt ='';
let a = '<title data-react-helmet="true">react-html-parser  -  npm</title>'
import https from 'https';


const Axios = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });

const Jobs =(props)=> {

  const [dataRender, setDataRender]=useState(false)
  const [lastAlias, setLastAlias]=useState('');
  const [callModal, setCallModal] =useState(false)

useEffect(()=>{
  if(!isNaN(parseInt(props?.aliasApi.slice(-1))) && props?.aliasApi.includes("jobs-in")){
    const jobCity =  props?.aliasApi.slice(0, -2);
    Router.push('/'+jobCity.toLowerCase());
  }
  props.handleLoader(false);
}, [])

useEffect(()=>{
  if(lastAlias!==props.aliasApi){
    if(props?.aliasApi.includes("job-detail-")){
      redirectCanonicalRoute();
    }
    setDataRender(false)
    setTimeout(() => {
    setDataRender(true)
    }, 100);
   
    setLastAlias(props.aliasApi)
  }
  props.handleLoader(false)
})


const redirectCanonicalRoute=()=>{
  var canonical = "";
  var links = document.getElementsByTagName("link");
  for (var i = 0; i < links.length; i ++) {
      if (links[i].getAttribute("rel") === "canonical") {
          canonical = links[i].getAttribute("href")
      }
  }
  let url = new URL(canonical);
  Router.push(url.pathname);
}

    return (
     
      <>
      <Head>
      <link rel="stylesheet" href="/assets/css/latest-jobs.css"/>
      { ReactHtmlParser(props?.data?.data?.pageContent?.metaInfo.reduce((prev, curr)=>prev+curr)) }
      {/* {props.data?.data?.pageContent?.metaInfo?.length>0 && props.data?.data?.pageContent?.metaInfo.map((data,index)=>(
        <>
        {data}
        </>
      ))} */}
      {/*<script type="application/ld+json"  dangerouslySetInnerHTML ={{__html: `${props?.data?.data?.pageContent?.scriptInfo}
	  `}}/>*/}

        
      </Head>
      <Header data={props.data?.data?.header}/>
      {!props.jobDetails?

      <div className="home">
        {/* {props.data?.data?.pageContent?.metaInfo.length} */}
        {dataRender &&
        <JobListing dataOwn={props?.data?.data?.pageContent?.jobsListing} filterOptionsData={props?.data?.data?.pageContent?.filters}
        propsApi={props.aliasApi} heading={props?.data?.data?.pageContent?.heading}/>
}
      </div>:

      <>
      <div className="home">
      <div className="container-fluid  home">
        <div className="latest-jobs latest-jobs1 job-detail">
        <JobDetailsContent dataOwn={props?.data?.data?.pageContent?.jobDetails} contactDetails={props?.data?.data?.pageContent?.contactDetails}
         jobApplied={props?.data?.data?.pageContent?.jobApplied} openCallModal={()=>setCallModal(true)}/>
        <SimilarJobs dataOwn={props?.data?.data?.pageContent?.similarJobListings}/>
        {/* <SocialShare dataOwn={props?.data?.data?.pageContent?.jobDetails}/> */}
        <CallNowModal dataOwn={props?.data?.data?.pageContent?.jobDetails} open={callModal} onCloseModal={()=>{
          setCallModal(false)
        }}/>
        </div>
        </div>
      </div>
      
      </>}
      <Footer data={props.data?.data?.footer}/>

       </>
    )
  

}

export async function getServerSideProps({ req, res, params }) {
    let header = {};
    let query = req?.headers?.cookie;
    let queryUrl = query?.dynamic;
  
  
    if (query) {
      var langOwn = query.match("(^|;)\\s*" + "langOwn" + "\\s*=\\s*([^;]+)");
      langOwn = langOwn ? langOwn.pop() : "";
      if (langOwn) {
        header.langOwn = langOwn;
      }
      var authtoken = query.match("(^|;)\\s*" + "authtoken" + "\\s*=\\s*([^;]+)");
      authtoken = authtoken ? authtoken.pop() : "";
      if (authtoken) {
        header.jwt = authtoken;
      }
      var userId = query.match("(^|;)\\s*" + "userId" + "\\s*=\\s*([^;]+)");
      userId = userId ? userId.pop() : "";
      if (userId) {
        header.userid = userId;
      }
      var latitude = query.match("(^|;)\\s*" + "latitude" + "\\s*=\\s*([^;]+)");
      latitude = latitude ? latitude.pop() : "";
      if (latitude) {
        header.latitude = latitude;
      }
      var longitude = query.match("(^|;)\\s*" + "longitude" + "\\s*=\\s*([^;]+)");
      longitude = longitude ? longitude.pop() : "";
      if (longitude) {
        header.longitude = longitude;
      }
    }
    // Fetch data from external API
    let result;
    let jobDetails = false;
    let obj = {
      fromAlias: `${params.dynamic}`
    };
    if (params.dynamic.startsWith("job-detail-")) {
       res.statusCode = 301;
       res.setHeader("Location", `/job-detail${req.url}`);
       res.end();
       return { props: {} };
    }else if(params.dynamic.endsWith("-jobs")){
 	 res.statusCode = 301;
       res.setHeader("Location", `/jobs${req.url}`);
       res.end();
       return { props: {} };


}else {
      result = await Axios.post(`${MAIN_URL}/jobs/jobs-listing-new`, obj, {
        headers: header
      });
    }
  
   
  
    // const data = await res.json()
    let data = result.data;
    if(data.status!=200){  
      res.statusCode = 301;
      res.setHeader('Location', `/404`);
      res.end();
      return {props: {}};
  }
  
   return { props: { data:data,
    queryurl:queryUrl,
    aliasApi:obj.fromAlias ,
  apiCall:!datatt,
  jobDetails:jobDetails} }
  
  
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

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);





