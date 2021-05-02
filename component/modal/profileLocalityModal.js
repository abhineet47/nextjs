import React, {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router  from 'next/router';
import {postCallApi} from '../actions/jobsApi';
import { MAIN_URL } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';


const ProfileLocality = React.memo((props)=>{
    const [locality, setLocality]=useState('');
    const [ele, setEle]=useState(null) 


    const setCityNameFunc = (val)=>{
        setLocality(val);
        let ele = props?.localityArray.find(x=>x._id===val);
        if(ele){
            setEle(ele)
        }

    }
    const saveData = ()=>{
        if(ele){
            props.saveData(ele)
        }


    }


    return(
        <>
        <Modal open={props.open} classNames={{ modal: "modal-sm modal-own" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>
       
        <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center"> Select Locality
          
          </h5>
          <button type="button" className="close" onClick={props.onCloseModal}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <form>
                    <div className="form-group">
                      <select onChange={(ev)=>setCityNameFunc(ev.target.value)} value={locality} className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                      <option disabled value="">Select Locality</option>
                          {props?.localityArray?.length>0 && props?.localityArray.map(data=>(
                            <option key={data._id} value={data._id}>{data?.location}</option>
                          ))}
                      
                      </select>
                    </div>
                  </form>
                
          
        </div>
        <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={props.onCloseModal}>Close</button>
                  <button type="button" className="btn btn-primary" disabled={!locality} onClick={saveData}>Save</button>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ProfileLocality))
