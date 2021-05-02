import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import {connect} from 'react-redux'
import { globalLoaderFunc, globalAlert,validEmail } from '../actions/commonActions';
import BasicInfoModal from '../modal/basicInfoModal'
import ReactAutocomplete from 'react-autocomplete';
import { MAIN_URL, AGE_ARRAY } from "../types/types";



import { Modal } from "react-responsive-modal";
import { withCookies, Cookies } from "react-cookie";
import Router from "next/router";
import {
  postCallApi,
  slectedLanguageFunc,
  postUserProfileApi,
} from "../actions/jobsApi";


import OutsideClickHandler from "react-outside-click-handler";
import OwnAutoComplete from "../../component/_shared/ownAutocomplete";



const ProfileBasicInfo = React.memo((props) => {
const [basicInfoModal, setBasicInfoModal]=useState(false);
const [basicInfoModall, setBasicInfoModall]=useState(false);


const [selectedLang, setSelectedLang]= useState([]);
const [homeLocation, setHomeLocation] = useState(null);
const [homeTown, setHomeTown] = useState(null);
const [gender, setGender] = useState(null);
const [haveBike, setHaveBike] = useState(null);
const [email, setEmail] = useState("");
const [emptyEmail, setEmptyEmail] = useState(false);
const [emptyGender, setEmptyGender] = useState(false);
const [emptyBike, setEmptyBike] = useState(false);
const [emptyLang, setEmptyLang] = useState(false);
const [emptyAge, setEmptyAge] = useState(false);
const [invalidEmail, setInvalidEmail] = useState(false);
const [languageArray, setLanguageArray] = useState(null);
const [aadharNumber, setAadharNumber] = useState(null);
const [age, setAge] = useState(null);
const [langSelected, setLangSelected] = useState(false);
const [moreHomeCity, setMoreHomeCity] = useState(false);
const [cityName, setCityName] = useState('');
const [resumeFile, setResumeFile] = useState(null);

useEffect(() => {
    let localHomeLocation =
      props?.dataOwn?.topHomeLocations?.length > 0 &&
      props?.dataOwn?.topHomeLocations.find((x) => x.selected === true);
     if (localHomeLocation) {
      setHomeLocation(localHomeLocation);
    }
  }, [props?.dataOwn?.topHomeLocations]);

useEffect(()=>{

    let localArray = [];
    if(props?.dataOwn?.languages.length>0){
     props?.dataOwn?.languages.forEach(element => {
        if(element.selected){
            localArray.push(element)
        }
        setSelectedLang(localArray)
    });
}
},[props?.dataOwn?.languages])

useEffect(() => {
   // console.log("MODAL PROPS",props?.dataOwn);
    setStateFromProps();
    props?.dataOwn?.languages.forEach((x) => {
      if (x.selected) {
        setLangSelected(true);
      }
    });

    let localHomeLocation = props?.dataOwn?.topHomeLocations?.length > 0 &&
    props?.dataOwn?.topHomeLocations.find((x) => x.selected === true);
    if (localHomeLocation) {
      setHomeTown(localHomeLocation);
    }
  }, []);

  const setStateFromProps = () => {
    setGender(props?.dataOwn?.gender);
    setHaveBike(props?.dataOwn?.haveBike ? 1 : 2);
    setEmail(props?.dataOwn?.email);
    setAadharNumber(props?.dataOwn?.aadharNumber.toString());
    setAge(props?.dataOwn?.age);
    setLanguageArray(props?.dataOwn?.languages);
  };

  const changeLang = (val) => {
    let localLangArray = [...languageArray];
    let localIndex = localLangArray.findIndex((x) => x.value === val);
    if (localIndex > -1) {
      localLangArray[localIndex].selected = !localLangArray[localIndex]
        .selected;
      setLanguageArray(localLangArray);
    }
    localLangArray.forEach((x) => {
      if (x.selected) {
        setLangSelected(true);
      }
    });
  };

  const formSubmit = async () => {
    let valid = await formValidation();
    if (valid) {
      
      let selectedLang = [];
     

      let obj = {
        basicInfo: {
          homeLocation: homeTown?._id,
          gender: gender,
          haveBike: haveBike === 1 ? true : false,
          aadharNumber: aadharNumber,
          age: age,
          email: email,
          languages: selectedLang.toString(),
        },
      };

      props.handleLoader(true);
      if (resumeFile) {
      let formData = new FormData();
      formData.append("resumeFile", resumeFile);
      let res = await postUserProfileApi(formData);
      alert(res);
      }
     
      let res = await postUserProfileApi(obj);

      if (res.data.status === 200) {
       // props.onCloseModal();
       setBasicInfoModall(false);
        props.basicApiCall();
      } else {
        props.globalAlert("error", res.data?.message);
      }
    }
  };

  const formValidation = async () => {
    let valid = true;
    setInvalidEmail(false);

    if (!email) {
      // valid = false;
      // setEmptyEmail(true)
    } else {
      let emailValid = await validEmail(email);
      if (!emailValid) {
        valid = false;
        setInvalidEmail(true);
      }
    }

    if (!gender) {
      setEmptyGender(true);
      valid = false;
    }

    if (!haveBike) {
      setEmptyBike(true);
      valid = false;
    }
    if (!age) {
      setEmptyAge(true);
      valid = false;
    }
    

    return valid;
  };

  const setNumberValue = (e) => {
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex
    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.name === "aadhar") {
        setAadharNumber(e.target.value);
      } else if (e.target.name === "age") {
        setAge(e.target.value);
      }
    }
  };

 const setBasicInfoModalll = () => {
 setStateFromProps();
 setBasicInfoModall(true);
 setMoreHomeCity(true);
 
 }

  const saveMoreHomecity = () => {

    let ele = props?.dataOwn?.locationsInfo?.allCityLocations.find(x => x.location === cityName);

    if (ele) {

      setHomeTown(ele);
      setMoreHomeCity(false);
      setCityName('')

    }
  }
  const fileUpload = (ev) => {
    let file = ev?.target?.files[0];
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword" ||
      file.type === "application/pdf"
    ) {
      setResumeFile(file);
      setProfileToApi();
    } else {
      props.globalAlert("error", "Only PDF and Word file acceptable");
    }
  };

    return (
        <>
       <div id="ShowProfile4" className="ShowProfile"> 
    
      {!basicInfoModall ?
        <a className="right-top edit-profile" onClick={setBasicInfoModalll}><i className="fa fa-pencil" /> Edit</a> :
        <a className="right-top save-profile text-success" onClick={formSubmit}><i className="fa fa-check" /> Save</a>}
                                
   
    <h3 className="spcust">Personal Details</h3>
    <div className="form-row">
    <div className="form-group col-md-6">
    <p>Home Town: <strong>{homeLocation?.location}</strong></p>
<div className={`${basicInfoModall ? "d-inline" : "none"
  }`}>
{moreHomeCity &&
    <div className="form-group city">
              <div className="input-group mb-3">
                
                <div className="own-autocomplete">
                  <ReactAutocomplete
                    items={props?.dataOwn?.locationsInfo?.allCityLocations}
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
                   
                    onChange={e => setCityName(e.target.value)}
                    onSelect={item => setCityName(item)}
                    menuStyle={{ position: 'absolute', top: '45px', left: 0, right: 0 }}
                    
                    
                    wrapperStyle={
                      {
                        display: 'block',
                        position: 'relative'
                      }
                    }

                  />
                </div></div></div>
              }
              </div>
     <div className={`${!basicInfoModall ? "d-inline" : "none"
  }`}>         
   
    </div>
    </div>
    <div className="form-group col-md-6 gender-text">
    <div className={`${basicInfoModall ? "d-inline" : "none"
  }`}>
  <strong> Gender &nbsp;</strong>
      <div className="form-check form-check-inline mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio1"
                    onChange={() => setGender(1)}
                    checked={gender === 1}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    <i className="fa fa-male fa-lg" /> Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio2"
                    onChange={() => setGender(2)}
                    checked={gender === 2}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    <i className="fa fa-female fa-lg" /> Female
                  </label>
                </div>
      </div>
      <div className={`${!basicInfoModall ? "d-inline" : "none"
  }`}>
       <p>Gender: <strong>{props?.dataOwn?.gender===1?"Male":"Female"}</strong></p>
        </div>
    </div>
    </div>
    <div className="form-row"> 
      <div className="form-group col-md-6">
       <div className={`${basicInfoModall ? "d-inline" : "none"
  }`}>
       <p>Age: </p>
       <select
                  className="custom-select my-1 mr-sm-2"
                  id="Age"
                  value={age}
                  onChange={(ev) => setAge(ev.target.value)}
                >
                  <option disabled value="">
                    Age...
                  </option>
                  {AGE_ARRAY?.length > 0 &&
                    AGE_ARRAY.map((data, index) => (
                      <option key={index} value={data.val}>
                        {data.val}
                      </option>
                    ))}
                </select>
       </div>
        <div className={`${!basicInfoModall ? "d-inline" : "none"
  }`}>         
      <p>Age: <strong>{props?.dataOwn?.age?props?.dataOwn?.age:"-"}</strong></p>
        </div></div>
      <div className="form-group col-md-6"> 
      <div className={`${basicInfoModall ? "d-inline" : "none"
  }`}><p>Adharcard Number:</p> 
       <input
                  type="number"
                  onChange={setNumberValue}
                  value={aadharNumber}
                  maxLength={12}
                  name="aadhar"
                  className="form-control"
                  id="Adhar"
                  placeholder="Adhar Number"
                /> 
                </div>
                 <div className={`${!basicInfoModall ? "d-inline" : "none"
  }`}>
       <p>Adharcard Number: <strong>{props?.dataOwn?.aadharNumber?props?.dataOwn?.aadharNumber:"-"}</strong></p>
        </div>
        </div>
        </div>  
    <div className="form-row">
      <div className="form-group col-md-6 "> 
       <div className={`${basicInfoModall ? "d-inline" : "none"
  }`}>
       <input
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  maxLength={30}
                  className="form-control"
                  id="Email"
                  placeholder="Your Email"
                />
                <div className="error-wrapper text-left">
                  {emptyEmail && !email && <span>Email is required</span>}
                  {invalidEmail && email && <span>Inavalid email</span>}
                </div> 
                </div> 
                 <div className={`${!basicInfoModall ? "d-inline" : "none"
  }`}>
       <p>Email id agar hai to: <strong>{props?.dataOwn?.email?props?.dataOwn?.email:"-"}</strong></p>
        </div></div>
        <div className="form-group col-md-6"> 
        <div className={`${basicInfoModall ? "d-inline" : "none"
  }`}>
        <input
              type="file"
              name="file"
              onChange={fileUpload}
              id="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="input-file"
            />
            <label htmlFor="file" className="btn btn-tertiary js-labelFile">
              <i className="icon fa fa-file-word-o" />
              <span className="js-fileName">
                {resumeFile?.name ? resumeFile?.name : "Upload Your Resume"}{" "}
              </span>
            </label>  
            </div> 
       <div className={`${!basicInfoModall ? "d-inline" : "none"
  }`}>      
      <p>Resume upload agar hai to: <strong>Resume Updated</strong></p>
      </div>
      </div>
      </div>
      <div className="form-row">    
        <div className="form-group col-md-6 gender-text resume">
        <div className={`${basicInfoModall ? "d-inline" : "none"
  }`}>
<div className="form-group  custom-checkbox-second">
                <strong>
                  {" "}
                  <i className="fa fa-motorcycle job-icon" /> Have Motercycle
                  &nbsp;
                </strong>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="customRadioInline1"
                    name="customRadioInline1"
                    onChange={() => setHaveBike(1)}
                    checked={haveBike === 1}
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline1"
                  >
                    Yes
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="customRadioInline2"
                    name="customRadioInline1"
                    onChange={() => setHaveBike(2)}
                    checked={haveBike === 2}
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline2"
                  >
                    No
                  </label>
                </div></div>

  </div>
                 <div className={`${!basicInfoModall ? "d-inline" : "none"
  }`}>
          Vechile: <div className="form-check form-check-inline"><label htmlFor="bike" className="form-check-label">
{props?.dataOwn?.haveBike?"Have Motor-Cycle":"Don't Have Motor-Cycle"}
         </label></div></div>
        </div>  
      </div>    
    </div> 




      {basicInfoModal &&<BasicInfoModal open={basicInfoModal} basicApiCall={()=>props.basicApiCall()} onCloseModal={()=>setBasicInfoModal(false)} dataOwn={props?.dataOwn}/>}


      
       </>

    )

})


const mapStateToProps = state => ({


})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
   

})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBasicInfo); 