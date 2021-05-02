import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';





const About = (props) => {

    return (
        <>
        <section className="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-6 ">
              <h2>{props?.data?.heading}</h2>
              <p>{props?.data?.description}</p>
              <div className="more-jobs">
                
                <a href={props?.data?.view_more?.link} target="_blank">View More <i className="fa  fa-arrow-circle-right" /></a> </div>
            </div>
            <div className="col-md-6 col-sm-6 ">
              <div className="about-link">
              {props?.data?.data.map((data, index) => (
                  

                        <a key={index}>
                          <span><img src={`${MAIN_URL}${data.icon}`} alt={data.text} /></span> {data.text}
                        </a>
                       
                ))}
                
              
              </div>
            </div></div></div>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);


