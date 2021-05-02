import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { withCookies, Cookies } from "react-cookie";
import Router from "next/router";
import {
  postCallApi,
  slectedLanguageFunc,
  postUserProfileApi,
} from "../actions/jobsApi";
import { MAIN_URL, AGE_ARRAY } from "../types/types";
import { connect } from "react-redux";
import {
  globalLoaderFunc,
  globalAlert,
  validEmail,
} from "../actions/commonActions";
import OutsideClickHandler from "react-outside-click-handler";
import OwnAutoComplete from "../../component/_shared/ownAutocomplete";
import ReactAutocomplete from 'react-autocomplete';


const BasicInfoModal = React.memo((props) => {
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
  const [cityName, setCityName] = useState('')

  useEffect(() => {
    console.log("MODAL PROPS",props?.dataOwn);
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
      languageArray.forEach((x) => {
        if (x.selected) {
          selectedLang.push(x.value);
        }
      });

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

      let res = await postUserProfileApi(obj);

      if (res.data.status === 200) {
        props.onCloseModal();
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
    if (!langSelected) {
      setEmptyLang(true);
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

  const saveMoreHomecity = () => {
    let ele = props?.dataOwn?.locationsInfo?.allCityLocations.find(x => x.location === cityName);
    if (ele) {
      setHomeTown(ele);
      setMoreHomeCity(false);
      setCityName('')

    }
  }

  return (
    <>
      <Modal
        open={props.open}
        classNames={{ modal: "modal-sm modal-own" }}
        showCloseIcon={false}
        closeOnOverlayClick={false}
        onClose={props.onCloseModal}
        center
      >
        <div className="modal-content home employee">
          <div className="modal-header">
            <h5 className="modal-title text-center">
              {" "}
              Update Basic Information
            </h5>
            <button
              type="button"
              className="close"
              onClick={props.onCloseModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">


        {moreHomeCity && <Modal open={moreHomeCity} showCloseIcon={false} classNames={{ modal: "modal-sm modal-own" }} closeIcon={''} center closeOnOverlayClick={false} onClose={() => setMoreHomeCity(false)}>
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
                        position: 'relative'
                      }
                    }

                  />
                </div>
              </div>

              <p className="list-heading">Select From The List</p>

              <div className="city-table">
                <table className="table">
                  <tbody>


                    {props?.dataOwn?.locationsInfo?.allCityLocations?.length > 0 &&
                      props?.dataOwn?.locationsInfo?.allCityLocations.map(data => (
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







            <form className="profile">
              <div className="form-group mb-0 gender-profiel text-center">
              <strong> Select Home Town &nbsp;</strong>
              <div className="citypage" id="city1">
              {props?.dataOwn?.topHomeLocations?.length > 0 &&
                props?.dataOwn?.topHomeLocations.map((data) => (
                  <div className="d-inline-block" key={data._id}>
                    <input
                      type="radio"
                      onChange={() => setHomeTown(data)}
                      checked={data._id === homeTown?._id}
                      id={data._id}
                      name="city"
                    />
                    <label htmlFor={data._id}>{data.location}</label>
                  </div>
                ))}

              <div className="clearfix mt-0" />
              <div>
                <span
                  className="Add-profile cursor"
                  onClick={() => setMoreHomeCity(true)}
                >
                  <b className="fa fa-plus" />
                  Add More City
                </span>
              </div>
            </div>








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
                    <i className="fa fa-male fa-lg" />
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
                    <i className="fa fa-female fa-lg" />
                  </label>
                </div>
                <div className="error-wrapper text-left">
                  {emptyGender && !gender && <span>Choose options</span>}
                </div>
              </div>
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
                </div>
                <div className="error-wrapper text-left">
                  {emptyBike && !haveBike && <span>Choose options</span>}
                </div>
              </div>
              <div className="form-group clearfix mt-0">
                <div>
                  <strong>Select Language</strong>
                </div>
                <div className="custom-control custom-checkbox">
                  {languageArray?.length > 0 &&
                    languageArray.map((data, index) => (
                      <>
                        <input
                          type="checkbox"
                          key={index}
                          checked={data.selected}
                          onChange={() => changeLang(data.value)}
                          className="button"
                          id={data.text}
                          name="Language"
                        />
                        <label htmlFor={data.text}>{data.text}</label>
                      </>
                    ))}
                </div>
                <div className="error-wrapper text-left">
                  {emptyLang && !langSelected && <span>Select language</span>}
                </div>
              </div>
              <div className="form-group">
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
              <div className="form-group">
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
                <div className="error-wrapper text-left">
                  {emptyAge && !age && <span>Age is empty</span>}
                </div>
              </div>
              <div className="form-group">
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
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={props.onCloseModal}
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={formSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
});

const mapStateToProps = (state) => ({
  applyLink: state.product.applyLink,
});

const mapDispatchToProps = (dispatch) => ({
  handleLoader: (data) => dispatch(globalLoaderFunc(data)),
  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
  setMobileFunc: (data, msg) => dispatch(setMobileFunc(data, msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(BasicInfoModal));
