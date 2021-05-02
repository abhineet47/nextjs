import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import Router from 'next/router';
import Link from 'next/link';

const DashboardRightSide = React.memo((props) => {
return (
<>
<div className="latest-jobs latest-jobs1 right_jobs_list">
              {/* <div className="input-group mb-3 search">
                <input type="text" className="form-control" placeholder="Skill, Designation, City" aria-label="Recipient's username" />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fa fa-search" /></span>
                </div>
              </div> */}
              <div id="matchingJob">
              {props?.dataOwn?.matchedJobsCount>0 &&
              <>

              <div className="highlighted-jobs">Matching Jobs {props?.dataOwn?.matchedJobsCount}</div>

              {props?.dataOwn?.matchedJobs?.length>0 && props?.dataOwn?.matchedJobs.map((job, index) =>(
                  <Link href="/job-detail/[index]"  as={`/${job.alias}`} key={job._id} target='_blank'>
                      <article>
              <h3>{job?.name} <span className="alert alert-primary"> {job.timePosted} </span>  {job?.paidJob == 1 && <span className="alert alert-warning"><i className="fa fa-bell-o"></i> Hot</span>}</h3>
                <div className="company-name">{job.companyName}</div>
                <div className="sub-text sub_txtt">
                <Link href="/job-detail/[index]" as={`/${job.alias}`}>
                      <a className="viewdeatails"><i className="fa fa-laptop" /> View Job</a>
                    </Link>
                <span><i className="fa fa-briefcase" /> {job.experienceRange}</span> <span><i className="fa fa-inr" /> {job.salaryRange}</span>
                      <span><i className="fa fa-map-marker" />{job.location}</span> <br />
               
                
                    </div>
              </article>
              </Link>
              ))}


             <div className="text-right view-all"><Link href="/user/matching-jobs">
                
                <a>View all <i className="fa fa-arrow-circle-o-right" /></a></Link></div>
             </>}
             </div>

              <br />
              <div id="relatedJob">
              {props?.dataOwn?.relatedJobsCount>0 &&
              <>
              <div className="highlighted-jobs">Related jobs {props?.dataOwn?.relatedJobsCount}</div>
              {props?.dataOwn?.relatedJobs?.length>0 && props?.dataOwn?.relatedJobs.map((job, index) =>(
                  <Link href="/job-detail/[index]" as={`/${job.alias}`} key={job._id}>
                      <article>
              <h3>{job?.name} <span className="alert alert-primary"> {job.timePosted} </span> </h3>
                <div className="company-name">{job.companyName}</div>
                <div className="sub-text">
                <Link href="/job-detail/[index]" as={`/${job.alias}`}>
                      <a className="viewdeatails"><i className="fa fa-laptop" /> View Job</a>
                </Link>
                <span><i className="fa fa-briefcase" /> {job.experienceRange}</span> <span><i className="fa fa-inr" /> {job.salaryRange}</span>
                      <span><i className="fa fa-map-marker" />{job.location}</span> <br />
               </div>
              </article>

                  </Link>
              ))}
              
              <div className="text-right view-all">
                <Link href="/user/related-jobs">
                
                <a>View all <i className="fa fa-arrow-circle-o-right" /></a></Link></div>
              </>}
              </div>
            </div>

          
        </>

    )

})


const mapStateToProps = state => ({


})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),


})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRightSide); 