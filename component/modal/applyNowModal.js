import React, {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router  from 'next/router';
import {postCallApi} from '../actions/jobsApi';
import { MAIN_URL } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';


const ApplyNowModal = React.memo((props)=>{


    useEffect (()=>{
        // if(props?.cookies?.cookies.langOwn){
        //     setSelectedLang(props?.cookies?.cookies.langOwn)
        // }

    },[])



    return(
        <>
        <Modal open={props.open} classNames={{ modal: "modal-sm modal-own" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>
       
        <div className="modal-content">
        <div className="modal-header">
          <h5 className="text-success text-center"><i className="fa fa-check" /> {props.applied?"Job Contact Details":"Job Applied Successfully"}
          
          </h5>
          <button type="button" className="close" onClick={props.onCloseModal}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="alert alert-warning" role="alert">
            <i className="fa fa-user" /> HR Head: <b>{props?.dataOwn?.contactPerson}</b>
          </div>
          <div className="whatsapp-callnow" role="alert">
          
          <a clasName="whatsapp" href={`https://api.whatsapp.com/send?phone=${props?.dataOwn?.contactNumber}`}>
          
            <i className="fa fa-whatsapp fa-lg" /> <b>Whatsapp{/*props?.dataOwn?.contactEmail */}</b>
            </a>
            <a clasName="callnow" href={`tel:${props?.dataOwn?.contactNumber}`}><i className="fa fa-phone fa-lg" /> <b>{props?.dataOwn?.contactNumber}</b></a>
          </div>
          
          {/* <div className="alert alert-primary" role="alert">
            <i className="fa fa-address-book" /> Role: <b>HR/ADMIN</b>
          </div> 
          <div className="text-center">
            <button type="button" className="btn btn-secondary" onClick={props.onCloseModal}><i className="fa fa-check" /> OK</button>
          </div>*/}
          <p className="text-secondary font-14"><br /> 
            <span className="text-danger">*</span>Theincircle.com is not asking or charging any money from any Employee.
          </p>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ApplyNowModal))
