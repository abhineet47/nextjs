import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import JobListing from '../../component/jobListing/joblisting';
import Axios from 'axios';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { data } from 'jquery';
import ReactHtmlParser from 'react-html-parser';

import { MAIN_URL } from '../../component/types/types';




let datatt ='';
let a = '<title data-react-helmet="true">react-html-parser  -  npm</title>'

const Jobs =(props)=> {

  const [dataRender, setDataRender]=useState(false)
  const [lastAlias, setLastAlias]=useState('')
 
useEffect(()=>{
  props.handleLoader(false)
}, [])

useEffect(()=>{
  if(lastAlias!==props.aliasApi){
    setDataRender(false)
    setTimeout(() => {
    setDataRender(true)
      
    }, 100);
   
    setLastAlias(props.aliasApi)
  }
  props.handleLoader(false)
})

//   this.props.handleLoader(false)

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

        
      </Head>
      <Header data={props.data?.data?.header}/>

      <div className="home">
        {/* {props.data?.data?.pageContent?.metaInfo.length} */}
        {dataRender &&
        <JobListing dataOwn={props?.data?.data?.pageContent?.jobsListing} filterOptionsData={props?.data?.data?.pageContent?.filters}
        propsApi={props.aliasApi} heading={props?.data?.data?.pageContent?.heading}/>
}
      </div>
      <Footer data={props.data?.data?.footer}/>

       </>
    )
  

}

export async function getServerSideProps(context) {


    
    let obj = {
      fromAlias:`${context.params.jobsPosting}`
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
    const res = await Axios.post(`${MAIN_URL}/jobs/jobs-listing-new`,obj, {headers:header})
    
    // const data = await res.json()
    let data=res.data;
  
    // Pass data to the page via props
    return { props: { data:data,
    aliasApi:obj.fromAlias ,
  apiCall:!datatt} }
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





