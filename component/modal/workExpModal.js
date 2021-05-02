import React, {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router  from 'next/router';
import {postCallApi, postUserProfileApi, jobSearchApi} from '../actions/jobsApi';
import { MAIN_URL, JOB_EXP_ARRAY } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert,jobRolesApi } from '../actions/commonActions';
import OutsideClickHandler from 'react-outside-click-handler';
import OwnAutoComplete from '../../component/_shared/ownAutocomplete';
import Autocomplete from 'react-autocomplete';


let timeout;

const WorkExpModal = React.memo((props)=>{

    const [comapny, setCompany]=useState('');
    const [jobYears, setJobYears]=useState('');
    const [jobRole, setJobRole]=useState('');
    const [working, setWorking]=useState(null);
    const [emptyCompany, setEmptyCompany]=useState(false);
    const [emptyJobYaers, setEmptyJobYaers]=useState(false);
    const [emptyJobRole, setEmptyJobRole]=useState(false);
    const [emptyWorking, setEmptyWorking]=useState(false);
    const [profile, setprofile]=useState([]);



    useEffect (()=>{
      setJobYears(props?.currentExpData?.jobYears)
      setCompany(props?.currentExpData?.companyName)
      setJobRole(props?.currentExpData?.jobRole)
      setWorking(props?.currentExpData?.current?1:2)

    },[props])

    const formSubmit =async()=>{

        let valid = await formValidation();
        if(valid){
            let obj = {
                companyName:comapny,
                current:working===1?true:false,
                jobRole:jobRole,
                jobYears:jobYears
            }
            

           if(props?.editExp){
            props.addWorkExp(obj, props?.currentExpData?.index)


           }
           else{
            props.addWorkExp(obj)

           }


        }

    }
   
  const formValidation = () => {
    let valid = true;
    if (!comapny) {
      setEmptyCompany(true)
      valid = false

    }
    

    if (!jobYears) {
      setEmptyJobYaers(true)
      valid = false
    }
    if (!jobRole) {
        setEmptyJobRole(true)
        valid = false
      }
      if (!working) {
        setEmptyWorking(true)
        valid = false
      }


    return valid

  }

  const profileApiCall = async (ev) => {
    let val = ev.target.value;
    setJobRole(val);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        let res = await jobSearchApi(val);
        if (res.data.status === 200) {
          console.log("SKILLSSSSSS",res.data.data.skills);
          setprofile(res.data.data.skills);
            }
        }, 1);
    }

    return(
        <>
        <Modal open={props.open} classNames={{ modal: "modal-sm modal-own" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>
       
        <div className="modal-content  experience">
        <div className="modal-header">
          <h5 className="modal-title text-center"> Add Work Experience
          
          </h5>
          <button type="button" className="close" onClick={props.onCloseModal}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <form>
        <div className="form-group">
          <input type="text" value={comapny} onChange={(ev)=>setCompany(ev.target.value)} maxLength={50} className="form-control" placeholder="Company Name" />
          <div className="error-wrapper text-left">

{emptyCompany && !comapny && <span >Company is empty</span>}

</div>
        </div>
        <div className="form-group">
          {/* <input type="number" value={jobYears} onChange={(ev)=>setJobYears(ev.target.value)} maxLength={10} className="form-control" placeholder="Job Years" /> */}
          <select
            className="custom-select my-1 mr-sm-2"
            id="job_exp"
            value={jobYears}
            onChange={(ev)=>setJobYears(ev.target.value)}
            >
            <option disabled value="">
              Job Years...
            </option>
            {JOB_EXP_ARRAY?.length > 0 &&
              JOB_EXP_ARRAY.map((data, index) => (
                <option key={index} value={data.val}>
                  {data.val}
                </option>
              ))}
          </select>
          <div className="error-wrapper text-left">

{emptyJobYaers && !jobYears && <span >Job Years is empty</span>}

</div>
        </div>
        <div className="form-group">
          {/* <input type="text" value={jobRole} onChange={(ev)=>setJobRole(ev.target.value)} maxLength={20} className="form-control" placeholder="Job Role" /> */}
          
          <Autocomplete
              inputProps={{ id: 'states-autocomplete',   className:'form-control'}}
              wrapperStyle={{ position: 'relative', display: 'flex', flexWrap: 'wrap', background:'#ffffff'}}
              wrapperProps={{ className:'positionWrapper' }}
              value={jobRole}
              items={profile}
              getItemValue={(item) => item.name}
              onSelect={value => setJobRole(value)}
              shouldItemRender={(item, value) => item?.name?.toLowerCase().indexOf(value.toLowerCase()) > -1}
              onChange={(e) =>
                  profileApiCall(e)
              }
              renderItem={(item, highlighted) =>
                  <div className={'list-wrapper2'}
                      key={item._id}
                      style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                      {item.name}
                  </div>
              }
              menuStyle={{ position: 'absolute', top: '36px', left: 0, right: 0 ,  border: '1px solid #e0e0e0', background:'#ffffff'}}
          />



          <div className="error-wrapper text-left">

{emptyJobRole && !jobRole && <span >Job Role is empty</span>}

</div>
        </div>
        <div className="form-group ccpc">
          <input className="form-check-input" onChange={()=>setWorking(1)} checked={working===1} type="radio" name="company" id="Current" />
          <label className="form-check-label" htmlFor="Current">
            Current company </label> <br />
          <input className="form-check-input" onChange={()=>setWorking(2)} checked={working===2} type="radio" name="company" id="Previous" />
          <label className="form-check-label" htmlFor="Previous">
            Previous company </label>
            <div className="error-wrapper text-left">

{emptyWorking && !working && <span >Working is empty</span>}

</div>
        </div>
      </form>
                
          
        </div>
        <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={props.onCloseModal}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={formSubmit}>Save</button>
                </div>
      </div>
       </Modal>
        </>
    )

})

const mapStateToProps = state => ({
    applyLink: state.product.applyLink
  })
  
  const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
    setMobileFunc: (data, msg) => dispatch(setMobileFunc(data, msg)),
    
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(withCookies(WorkExpModal))
