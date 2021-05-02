import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux'
import appliedJobs from '../../pages/user/applied-jobs';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import GoogleAd from '../../component/googleAdd/GoogleAd';
import BasicInfoModal from '../modal/basicInfoModal'
import Link from 'next/link';

const Appliedjobs = React.memo((props) => {
  const [basicInfoModal, setBasicInfoModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState([]);
  const [appliedJobs, setappliedJobs] = useState([]);

  useEffect(() => {
    let localArray = [];
    if (props?.dataOwn?.languages.length > 0) {
      props?.dataOwn?.languages.forEach(element => {
        if (element.selected) {
          localArray.push(element)
        }
        setSelectedLang(localArray)
      });
    }
  }, [props?.dataOwn?.languages])

  useEffect(() => {
    // debugger
    const data = props?.appliedJobsData?.userAppliedJobs;
    if (data?.length > 0) {
      setappliedJobs(props?.appliedJobsData?.userAppliedJobs);
    }
  }, [props?.appliedJobsData?.userAppliedJobs])

  return (
    <>
      <GoogleAd slot="1862427264" classNames="page-applied" />
      <div className="posted-jobs text-left">
      
        <h3>Applied Jobs</h3>
        <ul>
          <li className="heading row">
            <div className="col-sm-2">Job Title</div>
            <div className="col-sm-4">Company Name</div>
            <div className="col-sm-2">Location</div>
            <div className="col-sm-2">Applied Date</div>
            <div className="col-sm-2">Call Now</div>
          </li>

          {
            appliedJobs.length > 0 && appliedJobs.map((item,index) => {
              return (
                <Link href="/job-detail/[index]" as={`/job-detail/${item.job.alias}`}>

                  <li className="row">
                    <div className="col-sm-2"><i className="fa fa-address-book-o" />  {item?.job?.name}</div>
                    <div className="col-sm-4"><i className="fa fa-institution" /> {item?.job?.companyName}</div>
                    <div className="col-sm-2"><i className="fa fa-map-marker" /> {item?.job?.location?.location}</div>
                    <div className="col-sm-2"><i className="fa fa-calendar-check-o" /> {item?.job?.createdAt.split('T')[0]}</div>
                    <div className="col-sm-2"><span className="badge badge-info"><i className="fa fa-mobile-phone" /> Call Now</span> </div>
                  </li>
                </Link>
              )
            })
          }
         
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Appliedjobs); 