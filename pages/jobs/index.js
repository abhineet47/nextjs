import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import JobListing from '../../component/jobListing/joblisting';
import ReactHtmlParser from 'react-html-parser';







const Jobs =(props)=> {
  
    return (
     
      <>
      <Head>
      <link rel="stylesheet" href="/assets/css/latest-jobs.css"/>
      { ReactHtmlParser(props?.data?.data?.pageContent?.metaInfo.reduce((prev, curr)=>prev+curr)) }


        
      </Head>

      <div className="home">
        <JobListing/>
        
      </div>
       </>
    )
  

}

export async function getServerSideProps(context) {

    // Fetch data from external API
    // const res = await fetch(`http://127.0.0.1/jobs/jobs-listing`)
    // const data = await res.json()
    let data=true;
  
    // Pass data to the page via props
    return { props: { data } }
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





