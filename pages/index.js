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


export async function getStaticProps(context) {
  
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
   

  const res = await Axios.get(`${MAIN_URL}/content/home`, {headers:header});
  console.log(res.data,":");
  return {
    props: {
      content:res.data?.data,
    },
    unstable_revalidate:600
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
