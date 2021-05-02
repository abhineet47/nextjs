import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux'
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import ProfileLocality from '../modal/profileLocalityModal';
import { getLocalitiesApi } from '../actions/jobsApi';
// import MoreLocationModal from '../modal/abc';
import { postUserProfileApi } from '../actions/jobsApi';
import { Modal } from 'react-responsive-modal';
import ReactAutocomplete from 'react-autocomplete';




const ProfileLocation = React.memo((props) => {



  const [homeLocationEdit, setHomeLocationEdit] = useState(false);
  const [workLocationEdit, setWorkLocationEdit] = useState(false);
  const [homeLocation, setHomeLocation] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);
  const [localityModal, setLocalityModal] = useState(false);
  const [locality, setLocality] = useState(null);
  const [localityVal, setLocalityVal] = useState('');
  const [localityArray, setLocalityArray] = useState(null);
  const [moreHomeCity, setMoreHomeCity] = useState(false);
  const [moreWorkCity, setMoreWorkCity] = useState(false);
  const [cityName, setCityName]=useState('');
  const [ele, setEle]=useState(null) ;


  useEffect(() => {
    let localHomeLocation = props?.dataOwn?.topHomeLocations?.length > 0 && props?.dataOwn?.topHomeLocations.find(x => x.selected === true)
    if (localHomeLocation) {
      setHomeLocation(localHomeLocation)
    }


  }, [props?.dataOwn?.topHomeLocations])
  useEffect(() => {
    let localWorkLocation = props?.dataOwn?.topWorkLocations?.length > 0 && props?.dataOwn?.topWorkLocations.find(x => x.selected === true)
    if (localWorkLocation) {
      setWorkLocation(localWorkLocation)
    }


  }, [props?.dataOwn?.locality])
  

  useEffect (() => {
   
   setLocality(props?.dataOwn?.locality)
  },[props?.dataOwn?.locality])

  const callLocalityApi = async () => {
    props.handleLoader(true)
    let res = await getLocalitiesApi(workLocation?.location);
 
    if (res.data.status === 200) {
     
      setLocalityArray(res?.data?.data?.locations)
      setLocalityModal(true)
    }
    props.handleLoader(false)

  }

  const setWorkLocationFunc = (val) => {
    setWorkLocation(val);
    console.log(val);
    setLocality(null)
  }

  const setHomeLocationEditFunc = async () => {

    let obj = {
      locationInfo: {
        homeLocation: homeLocation?._id,
        workLocation: workLocation?._id,
        workLocality: locality?.id,
      }
    }

    props.handleLoader(true);
    let res = await postUserProfileApi(obj);
    if (res.data.status === 200) {
      props.basicApiCall()
      setHomeLocationEdit(false)

    }
    else {
      props.globalAlert('error', res.data?.message)
    }
  }

  const setWorkLocationEditFunc = async () => {
    saveMoreWorkcity();
    if(locality?.id){

    let obj = {
      locationInfo: {
        homeLocation: homeLocation?._id,
        workLocation: workLocation?._id,
        workLocality: locality?.id,
      }
    }

    props.handleLoader(true);
    let res = await postUserProfileApi(obj);
    console.log(res);
    if (res.data.status === 200) {
      props.basicApiCall()
      setHomeLocationEdit(false)

    }
    else {
      props.globalAlert('error', res.data?.message)
    }
  }
  else{
    props.globalAlert('error', 'Please select locality')

  }
  }

  const saveMoreWorkcity = ()=>{
    let ele = props?.dataOwn?.allCityLocations.find(x=>x.location===cityName);
      if(ele){
        setWorkLocation(ele)
        setMoreWorkCity(false);
        setLocality(null)
      setCityName('')

      }
  }

  const saveMoreHomecity = ()=>{
    let ele = props?.dataOwn?.allCityLocations.find(x=>x.location===cityName);
      if(ele){
        setHomeLocation(ele)
        setMoreHomeCity(false);
      setCityName('')

      }
  }


  const saveData = async (val) => {

    if (moreHomeCity) {
      setHomeLocation(val)
    }
    else if (moreWorkCity) {
      let ele = props?.dataOwn?.allCityLocations.find(x=>x.location===cityName);
      if(ele){
        setWorkLocation(ele)

      }
     
    }
    let obj = {
      locationInfo: {
        homeLocation: homeLocation?._id,
        workLocation: workLocation?._id,
        workLocality: locality?._id,
      }
    }


    if (localityModal) {
      obj.locationInfo.workLocality=val._id;
    }
 
    props.handleLoader(true);
    let res = await postUserProfileApi(obj);
    if (res.data.status === 200) {
      setLocalityModal(false);
      setMoreHomeCity(false);
      setMoreWorkCity(false);
      setHomeLocationEdit(false);
      setWorkLocationEdit(false);
      props.basicApiCall();
      

    }
    else {
      props.globalAlert('error', res.data?.message)
    }

  }
const Capitalize = (str)=>{
return str.charAt(0).toUpperCase() + str.slice(1);
}
  const handleChange = (e)=>{
setCityName( e.target.value);

var abc = Capitalize(e.target.value);
let value = abc;
setCityName(abc);
  setLocality(abc);
  callLocalityApi();
  }
 const setCityNamee = (val)=>{
  setCityName(val);
  setLocality(val);
  callLocalityApi();
  }
  const setCityNameFunc = (val)=>{
//console.log(val);
        setLocality(val);
       
        let ele = props?.localityArray.find(x=>x._id===val);
        if(ele){
            setEle(ele)
        }

    }

  return (
    <>
  <a id="editnow2" className={`Add-profile right-top sallary-edit cursor ${!workLocationEdit ? "d-inline" : "none"
  }`} onClick={() => setWorkLocationEdit(true)}><i className="fa fa-pencil"></i> Edit</a>
  <a onClick={() => setWorkLocationEditFunc()} className={`Add-profile right-top sallary-save  text-success ${workLocationEdit ? "d-inline" : "none"
  }`}> <b className="fa fa-check" /> save
  </a> 
    <div className="form-row">
        <div className="form-group col-md-6">
        <p>City Name  : <strong>{workLocation?.location}</strong></p>
{workLocationEdit &&
<div className="form-group city">
                            <div className="input-group mb-3">
                                
                                <div className="own-autocomplete">
                                    <ReactAutocomplete
                                        items={props?.dataOwn?.allCityLocations}
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
                                        onChange={handleChange}
                                        onSelect={item => setCityNamee(item)}
                                        menuStyle={{ position: 'absolute', top: '45px', left: 0 , right:0}}

                                        
                                        wrapperStyle={
                                            {
                                                display: 'block',
                                                position:'relative'
                                            }
                                        }

                                    />
                                </div>
                            </div>

                          

                         

                        </div>


                      }
       
        </div>
    <div className="form-group col-md-6">
    <p>मोहल्ले का नाम:  <strong>{locality?.location}</strong></p>
    {workLocationEdit &&
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
        }         
       
        </div>
    </div>

         
          

      <div className="filter-card" style={{display:"none"}}>
        <div className="text-left personal-detail">

          <i className="fa fa-map-marker job-icon" /> किस शहर में  काम करते है: <strong id="profile-location">{workLocation?.location} </strong>
          {!workLocationEdit ? <a className="edit-profile edit-location" onClick={() => setWorkLocationEdit(true)}><b className="fa fa-pencil" /></a> :
            <a className="edit-profile save-location text-success" onClick={() => setWorkLocationEditFunc()}><b className="fa fa-check" /> 
            Save</a>}
          <br />
         
          {workLocationEdit &&

            <div className="citypage" id="city1">

              {props?.dataOwn?.topWorkLocations?.length > 0 && props?.dataOwn?.topWorkLocations.map(data =>
               <div className="d-inline-block" key={data._id}>
                  <input type="radio" onChange={() => setWorkLocationFunc(data)} checked={data._id === workLocation?._id} id={`${data._id}1`} name="workCity" />
                  <label htmlFor={`${data._id}1`}>{data.location}</label>
               </div>
              )}


              <div className="clearfix mt-0" />
              <div ><span className="Add-profile cursor" onClick={() => setMoreWorkCity(true)}><b className="fa fa-plus" />
                Add More City</span></div>
            </div>
          }
          <i className="fa fa-map-pin job-icon" /> Locality: <strong id="home-location">{locality?.location}</strong><a className="edit-profile edit-locality" onClick={callLocalityApi}><b className="fa fa-pencil" /></a>

          {/* <Modal open={moreWorkCity} onClose={setMoreWorkCity} center>
          <h2>Simple centered modal</h2>
        </Modal> */}

          {/* {moreWorkCity && <MoreLocationModal open={moreWorkCity} saveData={saveData} onCloseModal={() => setMoreWorkCity(false)}/>} */}

          {localityModal && <ProfileLocality open={localityModal} saveData={saveData} onCloseModal={() => setLocalityModal(false)} localityArray={localityArray} />}
          {/* {moreWorkCity && <MoreLocationModal open={moreWorkCity} onCloseModal={() => setMoreWorkCity(false)} />} */}
          {/* {moreHomeCity && <MoreLocationModal open={moreHomeCity} saveData={saveData} onCloseModal={() => setMoreHomeCity(false)} locations={props?.dataOwn?.allCityLocations} />} */}
        </div>

        {moreWorkCity &&<Modal open={moreWorkCity} showCloseIcon={false} classNames={{ modal: "modal-sm modal-own" }} closeIcon={''} center closeOnOverlayClick={false} onClose={() => setMoreWorkCity(false)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">City Name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setMoreWorkCity(false)}>
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
                                        items={props?.dataOwn?.allCityLocations}
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


                                        {props?.dataOwn?.allCityLocations?.length > 0 &&
                                            props?.dataOwn?.allCityLocations.map(data => (
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
                        <button type="button" className="btn btn-secondary" onClick={() => setMoreWorkCity(false)}>Close</button>
                        <button type="button" className="btn btn-primary" disabled={!cityName} onClick={saveMoreWorkcity}>Save changes</button>
                    </div>

                </Modal>
}
                {moreHomeCity &&<Modal open={moreHomeCity} showCloseIcon={false} classNames={{ modal: "modal-sm modal-own" }} closeIcon={''} center closeOnOverlayClick={false} onClose={() => setMoreHomeCity(false)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">City Name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setMoreHomeCity(false)}>
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
                                        items={props?.dataOwn?.allCityLocations}
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


                                        {props?.dataOwn?.allCityLocations?.length > 0 &&
                                            props?.dataOwn?.allCityLocations.map(data => (
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
                        <button type="button" className="btn btn-secondary" onClick={() => setMoreHomeCity(false)}>Close</button>
                        <button type="button" className="btn btn-primary" disabled={!cityName} onClick={saveMoreHomecity}>Save changes</button>
                    </div>

                </Modal>}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLocation); 