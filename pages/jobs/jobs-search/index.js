import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../../../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import JobListing from '../../../component/jobListing/joblisting';
import Axios from 'axios';
import Header from '../../../component/header/header';
import Footer from '../../../component/footer/footer';
import { data } from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { MAIN_URL } from '../../../component/types/types';




let datatt ='';
let a = '<title data-react-helmet="true">react-html-parser  -  npm</title>'

const Jobs =(props)=> {

  const [dataRender, setDataRender]=useState(false)
  const [lastAlias, setLastAlias]=useState('')
 
useEffect(()=>{
  if(props.redirect){
    Router.push('/')
  }
  else{
    props.handleLoader(false)

  }
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
      { ReactHtmlParser(a) }
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
        propsApi={props.aliasApi} heading={props?.data?.data?.pageContent?.heading} query={props.query}
        />
}
      </div>
      <Footer data={props.data?.data?.footer}/>

       </>
    )
  

}

export async function getServerSideProps(context) {

    let query = context.query;
    let obj;  

    if(query.locations && query.skills){
        let locationField = query.locations;
        let skills = query.skills;
        obj ={
          locationFilter:locationField,
            skillFilter:skills
        }

        if(query.experiance){
          obj={...obj,experienceFilter:query.experiance}
        }
    }
    else{
        return {props:{redirect:true}}
    }



    
    // let obj = {
    //   fromAlias:`${context.params.jobsPosting}/${context.params.index}`
    // }
   
    const res = await Axios.post(`${MAIN_URL}/jobs/jobs-listing-new`,obj)
    
    let data=res.data;

    return { props: { data:data,
      query:query,
        redirect:false} }
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





