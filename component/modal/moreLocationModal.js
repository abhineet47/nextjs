import React, {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router  from 'next/router';
import {postCallApi} from '../actions/jobsApi';
import { MAIN_URL } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import ReactAutocomplete from 'react-autocomplete';



const MoreLocationModal = React.memo((props)=>{

    const [cityName, setCityName]=useState('')


    const saveData = ()=>{

        let ele = props.locations.find(x=>x.location===cityName);
        if(ele){
            props.saveData(ele)
        }


    }




    return(
        <>
         <Modal open={open} showCloseIcon={false} classNames={{ modal: "modal-sm modal-own" }} closeIcon={''} center closeOnOverlayClick={false} onClose={props.onCloseModal}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">City Name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onCloseModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group city">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" htmlFor="inputGroupSelect01"><i className="fa fa-search" /></span>
                                </div>
                                <div className="own-autocomplete">
                                    <ReactAutocomplete
                                        items={props?.locations}
                                        shouldItemRender={(item, value) => item.location.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        getItemValue={item => item.location}
                                        renderItem={(item, highlighted) =>
                                            <div
                                                key={item._id}
                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                                className={'list-wrapper'}
                                            >
                                                {item.location}
                                            </div>
                                        }
                                        value={cityName}
                                        onChange={e => setCityName( e.target.value)}
                                        onSelect={item => setCityName(item)}
                                        menuStyle={{ position: 'absolute', top: '45px', left: 0 , right:0}}

                                        // menuStyle={{
                                        //     borderRadius: '3px',
                                        //     boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                        //     background: '#f9f9f9',
                                        //     padding: '2px 0',
                                        //     fontSize: '90%',
                                        //     position: 'fixed',
                                        //     overflow: 'auto',
                                        //     maxHeight: '50%',
                                        // }}
                                        wrapperStyle={
                                            {
                                                display: 'block',
                                                position:'relative'
                                            }
                                        }

                                    />
                                </div>
                            </div>

                            <p className="list-heading">Select From The List</p>

                            <div className="city-table">
                                <table className="table">
                                    <tbody>


                                        {props?.locations?.length > 0 &&
                                            props?.locations.map(data => (
                                                <tr key={data._id}>
                                                    <td className={`${data.location === cityName ? 'selected' : ''}`} onClick={() => setCityName(data.location)}>{data.location}</td>
                                                </tr>
                                            ))
                                        }   



                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={props.onCloseModal}>Close</button>
                        <button type="button" className="btn btn-primary" disabled={!cityName} onClick={saveData}>Save changes</button>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(withCookies(MoreLocationModal))
