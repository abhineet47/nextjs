import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types'





const SimilarJobs =(props)=> {
        return (
            <>
         
         <div class="latest-jobs">
<div class="row">


              {props?.dataOwn?.length>0 && props?.dataOwn.map(job=>(
                  
                <Link href="/job-detail/[index]" as={`/${job.alias}`} key={job._id}>
<div className="col-sm-4" onClick={()=>props.setApplied(false)}>
<article>
                <h3>{job.name}<span class="alert alert-primary"> {job.timePosted}</span></h3>
                <div className="company-name">{job.companyName}</div>
                <div className="sub-text">
                  <span><i className="fa fa-briefcase" />{job.experienceRange}</span> <span><i className="fa  fa-inr" />{job.salaryRange}</span> <br />
              <span><i className="fa  fa-map-marker" />{job.location}</span> <br />
                </div>
                <Link href="/job-detail/[index]" as={`/${job.alias}`}>
                <a className="viewdeatails viewd"><i className="fa fa-laptop" /> View Job</a> 
                </Link>
              </article>

            </div>
            
</Link>

              ))}

             </div>
              
              <div className="col-sm-12 text-right text-link"><Link href="/user/related-jobs">
                <a className="viewmore">View all <i className="fa  fa-arrow-right" /></a></Link></div>
           </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SimilarJobs);


