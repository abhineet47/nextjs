import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import Header from '../component/header/header'
import Footer from '../component/footer/footer'
import JobSearch from '../component/homepage/jobSearch';
import { MAIN_URL } from '../component/types/types';
import axios from 'axios';
import https from 'https';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const Axios = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
//export const config = { unstable_runtimeJS: false };

const Home=(props)=>  {
  useEffect(()=>{
    props.handleLoader(false);
  
  }, [])


    return (
      <>
      <Head>
        {/* <title>My page title</title> */}
      { ReactHtmlParser(Array.isArray(props?.content?.pageContent?.metaInfo) && props?.content?.pageContent?.metaInfo.reduce((prev, curr)=>prev+curr)) }

        {/* { ReactHtmlParser(props?.content?.pageContent?.metaInfo?props?.content?.pageContent?.metaInfo:'<title>Theincircle.com - Best Job Portal for Freshers and Experienced in India </title>') } */}
        
      </Head>
      <Header data={props?.content?.header}/>
     
      {/* { ReactHtmlParser(html) } */}
        <JobSearch data={props?.content?.pageContent?.bannerSection}/>               
     
      <Footer data={props?.content?.footer}/>

       </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
