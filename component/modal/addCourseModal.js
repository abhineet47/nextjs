import React, {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router  from 'next/router';
import {postCallApi, postUserProfileApi} from '../actions/jobsApi';
import { MAIN_URL } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import OutsideClickHandler from 'react-outside-click-handler';
import OwnAutoComplete from '../_shared/ownAutocomplete';



let timeout;

const AddCourseModal = React.memo((props)=>{
  const [courseId, setCourseId]=useState('')
 
  const saveData = async()=>{
    props.handleLoader(true)
    let obj = {
      educationInfo:{
        qualification :props?.qualification?._id,
        course:courseId
      }
    }
    let res = await postUserProfileApi(obj);
    if(res.data.status===200){
      props.basicApiCall();
      props.onCloseModal();
    }

  }


    return(
        <>
        <Modal open={props.open} classNames={{ modal: "modal-sm modal-own" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>
       
        <div className="modal-content home employee">
        <div className="modal-header">
          <h5 className="modal-title text-center"> Add Courses
          
          </h5>
          <button type="button" className="close" onClick={props.onCloseModal}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <form className="profile">
   
        <div className="form-group">
          <select value={courseId} onChange={(ev)=>setCourseId(ev.target.value)} className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
            <option value="" disabled>Select Education</option>
            {props?.courseArray?.length>0 && props?.courseArray.map(data=>(
              <option key={data?._id} value={data?._id}>{data?.name}</option>
            ))}
           
          </select>
        </div>
      </form>
                
          
        </div>
        <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={()=>props.onCloseModal()}>Close</button>
                  <button type="button" disabled={!courseId} onClick={saveData} className="btn btn-primary">Save</button>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AddCourseModal))
