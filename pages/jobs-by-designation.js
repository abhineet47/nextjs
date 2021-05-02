import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import Header from '../component/header/header'
import Footer from '../component/footer/footer'
import JobsByDesignation from '../component/jobsbydesignation/jobsbydesignation';
import { MAIN_URL } from '../component/types/types';
import Axios from 'axios'






const jobsbydesignation=(props)=>  {

  // this.props.handleLoader(false)

  useEffect(()=>{
 props.handleLoader(false)

  },[])


    return (
      <>
      <Head>
        <title>Job By Designation | Theincircle.com</title>
        <link rel="stylesheet" href="/assets/css/job-by-skill.css"/>
      </Head>
     
      <Header data={props?.content?.header}/>
      
      <JobsByDesignation />
     
     
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

export default connect(mapStateToProps, mapDispatchToProps)(jobsbydesignation);