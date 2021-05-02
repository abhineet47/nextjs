import React, { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import { connect } from "react-redux";
import { globalLoaderFunc, globalAlert } from "../actions/commonActions";
import { MAIN_URL, salaryArray } from "../../component/types/types";
import { postUserProfileApi,userProfileApiMain, jobSearchApi } from "../../component/actions/jobsApi";
import { getLocalitiesApi } from '../actions/jobsApi';
import ProfileLocality from '../modal/profileLocalityModal';
import ProfileLocation from '../../component/profile/location';

let timeout;
const ProfileFirstSection = React.memo((props) => {
  const [name, setName] = useState("");
  const [experiance, setExperiance] = useState("");
  const [experianceEdit, setExperianceEdit] = useState(false);
  const [salaryEdit, setSalaryEdit] = useState(false);
  const [salaryVal, setSalaryVal] = useState("");
  const [salaryVal2, setSalaryVal2] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [homeLocation, setHomeLocation] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);

  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [profilePending, setProfilePending] = useState(null);
  const [workExp, setWorkExp] = useState(null);
  const [nameEdit, setNameEdit] = useState(false);
  const [profile, setprofile]=useState([]);
  const [apiDetails, setApiDetails] = useState(null);
  const [SuggestedIndustries, setSuggestedIndustries] = useState(null);
  const [yourIndustries, setYourIndustries] = useState(null);
  const [subProfile, setSubProfile] = useState(false);
  const [moreShow, setMoreShow] = useState(false);
  const [slectedIndustry, setSelectedIndustry] = useState([]);    /////////////////////////////////////////////////
  const [sectionEdit, setSectionEdit] = useState(false)

    useEffect(() => {
      setIndus();
      const selectedData = [];
        props?.dataOwn?.topIndustries.forEach((element) => {
            if (element.selected) {
                setSelectedIndustry([...slectedIndustry, element._id]);
            }
        });
    }, [props?.dataOwn?.topIndustries]);

    useEffect(() => {                                               /////////////////////////////////////////////////////
        const selectedData = [];
        props?.dataOwn?.suggestedIndustries.forEach((ele) => {
            if (ele.selected) {
                selectedData.push(ele._id);
            }
        });
        setSelectedIndustry(selectedData);
        //console.log('abc',selectedData);
    }, [props?.dataOwn?.suggestedIndustries]);
const setIndus = async() => {
       let res = await userProfileApiMain();
        if (res.data.status === 200) {
        setYourIndustries(res?.data?.data?.userInfo?.industry);  
        } 
        console.log('ress',res);
        }

    const setSelectedIndustryFunc = (val) => { 
   
                      ///////////////////////////////////////////////////////////
       // if (sectionEdit) {
            if (!slectedIndustry.includes(val)) {
                //console.log(val); 
                if (slectedIndustry.length < 5) {
                  // console.log("ok");
                  setSelectedIndustry([...slectedIndustry, val]);
                }
            } else {
                setSelectedIndustry(slectedIndustry.filter(item => item !== val));
            }
        //}
    };

    const setSectionEditFunc = async () => {                                    /////////////////////////////////////////
        props.handleLoader(true);
        const arrayToString = slectedIndustry.join();
        let obj = {
            industryInfo: arrayToString,
        }

        let res = await postUserProfileApi(obj);
        console.log(res);
        if (res.data.status === 200) {
            setSectionEdit(false);
            props.basicApiCall()

        }
        else {
            props.globalAlert('error', res.data?.message)
        }
    }

    const isSelectedIndustry = (dataId) => { 
    //alert(dataId) ;                                                  /////////////////////////////////sss
        return slectedIndustry.includes(dataId);

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

  useEffect(() => {
    setName(props?.dataOwn?.name);
  }, [props?.dataOwn?.name]);
  useEffect(() => {
    setSalaryVal(props?.dataOwn?.currentSalary);
  }, [props?.dataOwn?.currentSalary]);
  useEffect(() => {
    setMobile(props?.dataOwn?.mobile);
  }, [props?.dataOwn?.mobile]);
  useEffect(() => {
    setSubProfile(props?.dataOwn?.subProfile);
  }, [props?.dataOwn?.subProfile]);
  useEffect(() => {
    setDesignation(props?.dataOwn?.designation);
  }, [props?.dataOwn?.designation]);
  useEffect(() => {
    setProfilePending(props?.dataOwn?.profilePercent);
  }, [props?.dataOwn?.profilePercent]);

  useEffect(() => {
    setWorkExp(props?.dataOwn?.workExperience);

    props?.dataOwn?.workExperience.length > 0 &&
      props?.dataOwn?.workExperience.forEach((x) => {
        if (x.selected) {
          setExperiance(x.text);
        }
      });
  }, [props?.dataOwn?.workExperience]);

  const setPropsToState = () => {
    setName(props?.dataOwn?.name);
    setSalaryVal(props?.dataOwn?.currentSalary);
    setMobile(props?.dataOwn?.mobile);
    setDesignation(props?.dataOwn?.designation);
    setSubProfile(props?.dataOwn?.subProfile);
    setProfilePending(props?.dataOwn?.profilePercent);
  };

  const expSelected = (val) => {
    let localArray = [...workExp];
    localArray.forEach((x) => (x.selected = false));
    localArray[val].selected = true;
    setWorkExp(localArray);
    setExperiance(localArray[val].text);
  };

  const setSalaryValFunc = (val) => {
    setSalaryVal(val.split(" ")[0]);
    setSalaryVal2(val);
  };

  const saveName = async (val) => {
    if (name) {
      setName(val);
      setProfileToApi();
    } else {
      props.globalAlert("error", "Name is empty");
    }
  };

  const setProfileToApi = async () => {
    let exp = props?.dataOwn?.workExperience.find((x) => x.text === experiance);
    let obj = {
      profileInfo: {
        name: name,
        designation:designation,
        experience: exp?.value,
        currentSalary: salaryVal,
        subProfile: subProfile,
      },
       
    };

    props.handleLoader(true);
    if (resumeFile || profilePic) {
      let formData = new FormData();
      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }
      let res = await postUserProfileApi(formData);
      
      if (res.data.status === 200) {
        props.globalAlert("success", res.data?.message);
      } else {
        props.globalAlert("error", res.data?.message);
      }
    }

    let res = await postUserProfileApi(obj);


    if (res.data.status === 200) {
      setNameEdit(false);
      setExperianceEdit(false);
      setSalaryEdit(false);
      props.basicApiCall();
    } else {
      props.globalAlert("error", res.data?.message);
    }
  };

  const setNameFunc = (val) => {
    
    const letters = /^[a-zA-Z ]{0,30}$/;
    if (val.match(letters)) {
      setName(val);
    }
  };

  useEffect(() => {
    setProfileToApi();
  }, [profilePic]);

  const changeImageFile = (ev) => {
    debugger;
    let file = ev?.target?.files[0];
    if(file){
    if (file.type === "image/png" || file.type === "image/jpeg") {
      setProfilePic(file);
      // setProfileToApi();
    } else {
      props.globalAlert("error", "Only Png and JPEG file acceptable");
    }
  }
  };
const profileApiCalll = async (ev) => {
    console.log('abc');
    let val = ev.target.value;
    setSubProfile(val);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        let res = await searchProfileApi(val);
       // console.log(res);
        if (res.data.status === 200) {
          setSubProfile(res.data.data.profiles);
            }
        }, 1);
  }
  const profileApiCall = async (ev) => {
    let val = ev.target.value;
    setDesignation(val);

    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        let res = await jobSearchApi(val);
       // console.log(res);
        if (res.data.status === 200) {
          // console.log("SKILLSSSSSS",res.data.data.skills);
          setprofile(res.data.data.skills);
            }
        }, 1);
    }

    const hideIndus = async() =>{
      setMoreShow(!moreShow);
      setSectionEditFunc(true);
       let res = await userProfileApiMain();
       if (res.data.status === 200) {
        setYourIndustries(res?.data?.data?.userInfo?.industry);  
        }
      
    }
       const basicApiCall = async () => {
        setMoreShow(!moreShow);
        props.handleLoader(true)
        let res = await userProfileApiMain();
       //console.log("apiii",res);
        if (res.data.status === 200) {
            setApiDetails(res?.data?.data);
            //setSuggestedIndustries(res?.data?.data);
            setSuggestedIndustries(res?.data?.data?.industrySet?.suggestedIndustries);
           
        }
        else {
            props.globalAlert('error', res.data.message)
        }
        if(sessionStorage.getItem('scrollTo')){
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: ($(`#${sessionStorage.getItem('scrollTo')}`).first().offset()?.top - 15)
                },500);
    
                sessionStorage.removeItem('scrollTo')  
            }, 1);
           
        }
        props.handleLoader(false)

    }
    


  return (
    <>

<div className="employee-profile-pic">
<div className="profile-pic-edit"> 
                  <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={(ev) => changeImageFile(ev)}
                  />
 <a className="profile-pic desktop">
                <img src={`${props?.dataOwn?.profilePic}`} />
                <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={(ev) => changeImageFile(ev)}
                  />
                </a>
                </div></div>
               

    
    <div className="profile-creation">
    <div id="ShowProfile1" className="ShowProfile">
     {!nameEdit && (<a className="right-top edit-profile-text cursor" 
      onClick={() => setNameEdit(true)} id="editnow1"><i className="fa fa-pencil"></i> Edit
    </a>)}
    {nameEdit && (
    <a className="right-top edit-profile-text cursor save-profile-text  d-inline-block" 
      onClick={() => saveName(name)} ><i className="fa fa-save"></i> Save</a>
      )}
    <div className="form-row">
        <div className="form-group col-md-6">
            <p>आपका नाम : <strong>
                {nameEdit ? (
                  <input maxlength="20"
                    className="name-edit-input"
                    value={name}
                    onChange={(e) => setNameFunc(e.target.value)}
                  />
                ) : (
                    name
                  )}
                {!nameEdit ? (
                  <a
                    className="edit-profile-text cursor"
                    onClick={() => setNameEdit(true)}
                  >
                   
                  </a>
                ) : (
                    <a
                      className="save-profile-text  d-inline-block"
                      onClick={() => saveName(name)}
                    >
                      
                    </a>
                  )}
                
               {" "}
              </strong></p>
          </div>
          <div className="form-group col-md-6">
              <div className="prof">Mobile Number : <strong><a href={`tel:${mobile}`}>
              <i className="fa fa-phone job-icon" /> {mobile}
              </a></strong>
              </div>
          </div>
      </div>

    <div className="form-row">
    <div className="form-group col-md-6">
      <div className="prof">Profile :  <strong>
                  <i className="fa fa-address-card-o profile-icon" />    
                  { nameEdit ? (
                  // <input maxlength="20"
                  //   className="name-edit-input"
                  //   value={designation}
                  //   // onChange={(e) => setNameFunc(e.target.value)}
                  // />
                  <Autocomplete
                  inputProps={{ id: 'states-autocomplete'}}
                  wrapperProps={{ className:'positionWrapper' }}
                  value={designation}
                  items={profile}
                  getItemValue={(item) => item.name}
                  onSelect={value => setDesignation(value)}
                  shouldItemRender={(item, value) => item?.name?.toLowerCase().indexOf(value.toLowerCase()) > -1}
                  onChange={(e) =>
                      profileApiCall(e)
                  }
                  renderItem={(item, highlighted) =>
                      <div className={'list-wrapper'}
                          key={item._id}
                          style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                          {item.name}
                      </div>
                  }
                  menuStyle={{ position: 'absolute', top: '36px', left: 0, right: 0, background:'#ffffff', border:'1px solid  #555' }}
                
              />
                ) : (
                    designation
                  )}
                  
                  {/* {designation} */}
                </strong></div>
    <h4 className="form-row"><span className="col-8 spcust">Industry </span> 
    <div className="col-4 text-right" onClick={() => basicApiCall()}><span className="badge badge-info" id="addind2">
    <i className="fa fa-plus"></i> Add Industry</span>
    </div></h4>
    <div className="exp-pro exp-pro1" >
                {!sectionEdit ?
                    <a className="update-profile edit-Industry" onClick={() => setSectionEdit(true)}></a> :
                    <a className="update-profile save-Industry text-success" onClick={() => setSectionEditFunc(true)}><i className="fa fa-check" /></a>}
                <div className="overflow-hidden" id="SaveIndustry">
                
                    {yourIndustries?.length && yourIndustries.map(data => (
                        <div className="d-inline-block" key={data?._id}>
                            <input type="checkbox" id={data?._id}  defaultChecked={true}  name="industry" />
                            <label htmlFor={data?._id} >{data.name}</label>
                        </div>
                    ))}

                </div> 
                     {moreShow &&
                        <div className="more-industry collapse show clearfix mt-0" id="more-industry">
                            {SuggestedIndustries?.length && SuggestedIndustries.map(data => (
                                <div className="d-inline-block" key={data?._id}>
                                    <input type="checkbox" id={`${data?._id}1`} onChange={() => setSelectedIndustryFunc(data?._id)} defaultChecked={isSelectedIndustry(data?._id)} name="industry" />
                                    <label htmlFor={`${data?._id}1`} >{data?.name}</label>
                        </div>
                      ))}
 <div><a href="#;" className="btn-sm btn-info text-light" id="saveind2" onClick={() => hideIndus()}>
 <i className="fa fa-plus"></i> Save Industry</a></div>
               
  </div>
  }
  </div>

   
   
      
<div><a href="#;" className="btn-sm btn-info text-light" id="saveind2"><i className="fa fa-plus"></i> Save Industry</a></div>   
</div>

<div className="form-group col-md-6">
  <h4 className="spcust">Profile(Kis type ka kaam):</h4>
{subProfile}
</div>
</div> 
</div>

<div id="editProfile1" className="editProfile"> 
<a className="right-top"  id="savenow1" > <i className="fa fa-save"></i> Save</a>
<div className="form-row">
    <div className="form-group col-md-6">
    <input type="text" name="Name" defaultValue="" placeholder="आपका नाम" id="Name" className="form-control"/>
</div>
<div className="form-group col-md-6">
<input type="text" name="phone" defaultValue="" placeholder="Mobile Number " id="skilll" className="form-control"/>
</div>
</div></div>
<div id="ShowProfile2" className="ShowProfile">         
<a   id="editnow2"  className={`Add-profile right-top sallary-edit cursor ${!salaryEdit ? "d-inline" : "none"
  }`} onClick={() => setSalaryEdit(true)}><i className="fa fa-pencil"></i> Edit</a>
<a onClick={() => setProfileToApi()} className={`Add-profile right-top sallary-save  text-success ${salaryEdit ? "d-inline" : "none"
  }`}> <b className="fa fa-check" />save
</a>        
<div className="form-row">
<div className="form-group col-md-12">  
<div className="spcust salary">महीने की सैलरी: <strong>{salaryEdit && (
                    <div className="form-group autocomplete own-autocomplete">
                      {!salaryVal && (
                        <p className="place-holder-text">
                          Enter expected Salary per Month
                        </p>
                      )}
                      <Autocomplete
                        inputProps={{ id: "states-autocomplete" }}
                        wrapperStyle={{
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                        value={salaryVal2}
                        items={salaryArray}
                        getItemValue={(item) => item.label}
                        shouldItemRender={(item, value) =>
                          item?.label
                            ?.toLowerCase()
                            .indexOf(value.toLowerCase()) > -1
                        }
                        onChange={(e) => setSalaryVal2(e.target.value)}
                        onSelect={(val) => setSalaryValFunc(val)}
                        renderItem={(item, highlighted) => (
                          <div
                            className={"list-wrapper"}
                            key={item.label}
                            style={{
                              backgroundColor: highlighted
                                ? "#eee"
                                : "transparent",
                            }}
                          >
                            {item.label}
                          </div>
                        )}
                        menuStyle={{
                          position: "absolute",
                          top: "45px",
                          left: 0,
                          right: 0,
                        }}
                      />

                      {/* <input type="text" className="form-control" id="myInput" placeholder="Enter expected Salary per Month" /> */}
                    </div>
                  )}
                  {!salaryEdit && (
                    <div className="salary-box" id="demosalary">
                      {salaryVal} Monthly
                    </div>
                  )}
                 </strong></div>
</div>        
</div>



</div>
</div>
    
    
      <article className="profile-info" style={{display:"none"}}>
        <div className="filter-card employee-profile">
          <div className="row profile-pic-box">
            <div className="col-4 col-sm-2">
              <div className="profile-pic-edit">
                <div className="edit-profile-icon">
                  
                  <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={(ev) => changeImageFile(ev)}
                  />
                </div>
                <a className="profile-pic desktop">
                  <img src={`${props?.dataOwn?.profilePic}`} />
                  <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={(ev) => changeImageFile(ev)}
                  />
                </a>
              </div>
            </div>
            <div className="col-8 col-sm-10 edit-name-box">
              <h3 className="edit-name-text">
                {nameEdit ? (
                  <input maxlength="20"
                    className="name-edit-input"
                    value={name}
                    onChange={(e) => setNameFunc(e.target.value)}
                  />
                ) : (
                    name
                  )}
                {!nameEdit ? (
                  <a
                    className="edit-profile-text cursor"
                    onClick={() => setNameEdit(true)}
                  >
                    <b className="fa fa-pencil" />
                  </a>
                ) : (
                    <a
                      className="save-profile-text  d-inline-block"
                      onClick={() => saveName(name)}
                    >
                      <b className="fa fa-check" />
                    </a>
                  )}
                <a href={`tel:${mobile}`}>
                  <i className="fa fa-phone job-icon" /> {mobile}
                  <i className="fa fa-check verified text-success">verified</i>
                </a>
                <strong>
                  <i className="fa fa-address-card-o profile-icon" />    
                  { nameEdit ? (
                  // <input maxlength="20"
                  //   className="name-edit-input"
                  //   value={designation}
                  //   // onChange={(e) => setNameFunc(e.target.value)}
                  // />
                  <Autocomplete
                  inputProps={{ id: 'states-autocomplete'}}
                  wrapperProps={{ className:'positionWrapper' }}
                  value={designation}
                  items={profile}
                  getItemValue={(item) => item.name}
                  onSelect={value => setDesignation(value)}
                  shouldItemRender={(item, value) => item?.name?.toLowerCase().indexOf(value.toLowerCase()) > -1}
                  onChange={(e) =>
                      profileApiCall(e)
                  }
                  renderItem={(item, highlighted) =>
                      <div className={'list-wrapper'}
                          key={item._id}
                          style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                          {item.name}
                      </div>
                  }
                  menuStyle={{ position: 'absolute', top: '36px', left: 0, right: 0, background:'#ffffff', border:'1px solid  #555' }}
                
              />
                ) : (
                    designation
                  )}
                  
                  {/* {designation} */}
                </strong>{" "}
              </h3>
            </div>
          </div>
          <div className="row phone-exp featured-boxes">
            {!salaryEdit && (
              <div className="col-6">
                {/* <div className="panel pannel-box1" style={{width:experianceEdit&&'300px'}}> */}
                <div className="panel pannel-box1">
                  <i className="fa fa-calendar-check-o job-icon" />
                  <h4>Work Experience </h4>
                  <div
                    className={`select-exp ${!experianceEdit ? "none" : ""}`}
                  >
                    {workExp?.length > 0 &&
                      workExp.map((data, index) => (
                        <div className="d-inline-block" key={index}>
                          <input
                            type="radio"
                            className="button"
                            id={data?.value}
                            checked={data?.selected}
                            onChange={() => expSelected(index)}
                            name="exp"
                          />
                          <label htmlFor={data?.value}>{data.text}</label>
                        </div>
                      ))}
                  </div>
                  {!experianceEdit && (
                    <div className="experience-box" id="demoexperience">
                      {experiance}
                    </div>
                  )}
                  <a
                    className={`Add-profile save-exp text-success cursor ${experianceEdit ? "d-inline" : "none"
                      }`}
                    onClick={() => setProfileToApi()}
                  >
                    <b className="fa fa-check" /> save
                  </a>
                  <a
                    className={`Add-profile edit-exp cursor ${!experianceEdit ? "d-inline" : "none"
                      }`}
                    onClick={() => setExperianceEdit(true)}
                  >
                    <b className="fa fa-pencil" /> edit
                  </a>
                </div>
              </div>
            )}
            {!experianceEdit && (
              <div className="col-6">
                <div className="panel pannel-box2">
                  <i className="fa fa-inr job-icon" />
                  <h4>Salary</h4>
                  {salaryEdit && (
                    <div className="form-group autocomplete own-autocomplete">
                      {!salaryVal && (
                        <p className="place-holder-text">
                          Enter expected Salary per Month
                        </p>
                      )}
                      <Autocomplete
                        inputProps={{ id: "states-autocomplete" }}
                        wrapperStyle={{
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                        value={salaryVal2}
                        items={salaryArray}
                        getItemValue={(item) => item.label}
                        shouldItemRender={(item, value) =>
                          item?.label
                            ?.toLowerCase()
                            .indexOf(value.toLowerCase()) > -1
                        }
                        onChange={(e) => setSalaryVal2(e.target.value)}
                        onSelect={(val) => setSalaryValFunc(val)}
                        renderItem={(item, highlighted) => (
                          <div
                            className={"list-wrapper"}
                            key={item.label}
                            style={{
                              backgroundColor: highlighted
                                ? "#eee"
                                : "transparent",
                            }}
                          >
                            {item.label}
                          </div>
                        )}
                        menuStyle={{
                          position: "absolute",
                          top: "45px",
                          left: 0,
                          right: 0,
                        }}
                      />

                      {/* <input type="text" className="form-control" id="myInput" placeholder="Enter expected Salary per Month" /> */}
                    </div>
                  )}
                  {!salaryEdit && (
                    <div className="salary-box" id="demosalary">
                      {salaryVal} Monthly
                    </div>
                  )}
                  <a
                    className={`Add-profile sallary-edit cursor ${!salaryEdit ? "d-inline" : "none"
                      }`}
                    onClick={() => setSalaryEdit(true)}
                  >
                    <b className="fa fa-pencil" /> edit
                  </a>
                  <a
                    onClick={() => setProfileToApi()}
                    className={`Add-profile sallary-save  text-success ${salaryEdit ? "d-inline" : "none"
                      }`}
                  >
                    <b className="fa fa-check" />
                    save
                  </a>
                </div>
              </div>
            )}
          </div>
          <br />
          <div className="row">
            <span className="col-12 Profile-Completeness  text-left text-light">
              Profile Completeness {profilePending?.value}%
            </span>
          </div>
          <div className="progress">
            <div
              className="progress-bar progress-bar"
              role="progressbar"
              style={{ width: `${profilePending?.value}%` }}
              aria-valuenow={80}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <br />
          <div className="form-group">
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
          <div className="note-text">
            Note: Fill all the details to get maximum Jobs Alert!
          </div>
        </div>
      </article>

    </>
  );
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleLoader: (data) => dispatch(globalLoaderFunc(data)),
  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFirstSection);
