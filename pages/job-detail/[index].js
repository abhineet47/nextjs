import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import JobDetailsContent from '../../component/jobDetails/jobDetails';
import SimilarJobs from '../../component/jobDetails/similarJobs'
import SocialShare from '../../component/jobDetails/socialShare'
import Axios from 'axios';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { MAIN_URL } from '../../component/types/types';
import CallNowModal from '../../component/modal/callNowModal';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';







const JobsDetails =(props)=> {
  

  const [applied, setApplied] =useState(false);
  const [callModal, setCallModal] =useState(false)

  useEffect(()=>{
    if(!props.applyLink){
      props.handleLoader(false)

    }
  }, [])

  useEffect (()=>{
    if(!props?.data?.data?.pageContent?.jobDetails?.id){
      Router.push('/404');
    } else {
      if(props?.data?.data?.pageContent?.jobApplied){
        setApplied(true)
      }
      else{
        setApplied(false)
      }
    }
  },[props?.data?.data?.pageContent?.jobApplied])
 

    return (
     
      <>
      <Head>
	  { ReactHtmlParser(props?.data?.data?.pageContent?.metaInfo.reduce((prev, curr)=>prev+curr)) }
      
   
      {/* { ReactHtmlParser(props?.data?.data?.pageContent?.metaInfo?props?.data?.data?.pageContent?.metaInfo:'<title>Theincircle.com - Best Job Portal for Freshers and Experienced in India </title>') } */}
      {/* { ReactHtmlParser(props?.data?.data?.pageContent?.scriptInfo) } */}
      <script type="application/ld+json"  dangerouslySetInnerHTML ={{__html: `${props?.data?.data?.pageContent?.scriptInfo}
    `}}/>
  {/* </script> */}
        
      </Head>
      <Header data={props.data?.data?.header}/>

      <div className="container user-details">

       
        <JobDetailsContent setApplied={setApplied} applied={applied} dataOwn={props?.data?.data?.pageContent?.jobDetails} contactDetails={props?.data?.data?.pageContent?.contactDetails}
         jobApplied={props?.data?.data?.pageContent?.jobApplied} openCallModal={()=>setCallModal(true)}/>
        <SimilarJobs setApplied={setApplied} dataOwn={props?.data?.data?.pageContent?.similarJobListings}/>
        {/* <SocialShare dataOwn={props?.data?.data?.pageContent?.jobDetails}/> */}
        <CallNowModal dataOwn={props?.data?.data?.pageContent?.jobDetails} open={callModal} onCloseModal={()=>{
          setCallModal(false)
        }}/>
        
       
      
      </div>
      <Footer data={props.data?.data?.footer}/>

       </>
    )
  

}

export async function getServerSideProps(context) {

    let obj = {
      jobAlias:`${context.params.index}`
    }
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
        
    


    // Fetch data from external API
    const res = await Axios.post(`${MAIN_URL}/jobs/jobs-details`,obj,{headers:header})
    // const data = await res.json()
    let data=res.data;
  
    // Pass data to the page via props
    return { props: { data } }
  }

const mapStateToProps = state => ({
  applyLink:state.product.applyLink

})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
  currentClassDetails: (data, classId, classType) => dispatch(currentClassDetails(data, classId, classType))
})

export default connect(mapStateToProps, mapDispatchToProps)(JobsDetails);





