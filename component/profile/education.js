import React, { useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import { connect } from "react-redux";
import { globalLoaderFunc, globalAlert } from "../actions/commonActions";
import AddCourseModal from "../modal/addCourseModal";
import { getCourseApi,postUserProfileApi,postCallApi } from "../actions/jobsApi";

const ProfileEducation = React.memo((props) => {
  const [editSection, setEditSection] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [qualificationId, setQualificationId] = useState(null);
  const [qualificationArray, setQualificationArray] = useState(null);
  const [courseArray, setCourseArray] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [courseId, setCourseId]=useState('');
  const [university, setUniversity]=useState('');
  const [instituteName, setInstituteName]=useState('')

   const saveData = async()=>{
    props.handleLoader(true)
    let obj = {
      educationInfo:{
        qualification :props?.qualification?._id,
        course:courseId
      },
      university:'abcde',
      instituteName:'efgh',
    }
    let res = await postUserProfileApi(obj);
    if(res.data.status===200){    
    props.basicApiCall();
    }
  }

  const setOpenCourseModalFunc = async (val) => {
    console.log(val);
    props.handleLoader(true);
    let res = await getCourseApi(val);
   // console.log(qualificationId?._id);
    if (res?.data?.status === 200) {
      setCourseArray(res?.data?.data?.courses);
     // setOpenCourseModal(true);
    }

    props.handleLoader(false);
  };

  useEffect(() => {
    let ele = props?.dataOwn?.qualifications.find((x) => x.selected);
    if (ele) {
      setQualificationId(ele);
    }
    setEditSection(false);
    setQualificationArray(props?.dataOwn?.qualifications);
  }, [props?.dataOwn?.qualifications]);

  useEffect(() => {
    setCourseName(props?.dataOwn?.course);
  }, [props?.dataOwn?.course]);

  const changeQualification = (val) => {
   // console.log(val);
    if (editSection) {
      setOpenCourseModalFunc(val);
      let localArray = [...qualificationArray];
      localArray.forEach((x) => {
        x.selected = false;
      });
      for (let index = 0; index < localArray.length; index++) {
        if (localArray[index]?._id === val) {
          localArray[index].selected = true;
          setQualificationId(localArray[index]);
          setCourseName(null);
          break;
        }
      }
      setCourseArray(localArray); 
    }
  };

  const setEduFunc = () => {
    saveData();
    if (!courseName) {
      
    } else {
      setEditSection(false);
    }
  };

  return (
    <>

  <div id="ShowProfile5" className="ShowProfile" >
   {!editSection ?
    <a className="right-top" onClick={() => setEditSection(true)}><i className="fa fa-pencil" /> Edit</a> :
    <a className="right-top text-success" onClick={() => setEduFunc(true)}><i className="fa fa-check" /> Save</a>
  }
    <div className="form-row">
    <div className="form-group col-md-6">
    <h4 className="spcust">Education</h4>
    <div className="exp-pro exp-pro1" id="workExp">
    {editSection && (
    <div className="overflow-hidden clearfix mt-0" id="SaveEducation">
          {qualificationArray?.length > 0 &&
            qualificationArray.map((data) => (
              <div className="d-inline-block" key={data._id}>
                <input
                  value={data._id}
                  checked={data?._id === qualificationId?._id}
                  onChange={() => changeQualification(data._id)}
                  key={data._id}
                  type="checkbox"
                  className="button"
                  id={data._id}
                  name="qualification"
                />
                <label htmlFor={data._id}>{data.name}</label>
              </div>      
    ))}
    </div>
    )}
     {!editSection && (
    <div className="d-inline-block" >
     <input value={qualificationId} type="checkbox"
      className="button" defaultChecked/>
     <label htmlFor={qualificationId}>{qualificationId?.name}</label>
     </div>
     )}
    </div> 
    </div>
 
        
    <div className="form-group col-md-6"> 
    <h4 className="spcust" >Institute/University</h4>
    <h5 className="spcust"  onChange={(ev)=>setUniversity(ev.target.value)}>
    {university}</h5>
    <div className="exp-pro exp-pro1" style={{display:'none'}}>
    <b className="spcust">Patna University</b>       
    </div> 
    <div className="exp-pro exp-pro1" onChange={(ev)=>setInstituteName(ev.target.value)}>
    <b className="spcust">{instituteName}</b>       
    </div>        
        </div>    

    </div>
    <div className="form-row">
    <div className="form-group col-md-6">
    <div className={`${editSection ? "d-inline" : "none"}`}>
    <select value={courseId} onChange={(ev)=>setCourseId(ev.target.value)} className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
    <option value="" disabled>Select Education</option>
    {courseArray?.length>0 && courseArray.map(data=>(
    <option key={data?._id} value={data?._id}>{data?.name}</option>
    ))}
           
    </select>
    </div>
     {/* <p>Certification  : <strong>
     {courseName && (
          <div className="overflow-hidden clearfix mt-0" id="SaveCourses">
            
            <label htmlFor="Msc-Computer-Science">{courseName}</label>
          </div>
        )}</strong></p>    */}  
    </div>
    <div className="form-group col-md-6" onChange={(ev)=>setInstituteName(ev.target.value)}>      
     {/*<p> Institutes Name :  <strong>{instituteName}</strong></p>*/}  
    </div>
    </div>
    </div>


    
      <div className="filter-card" style={{display:'none'}}>
        {!editSection ? (
          <a
            className="update-profile edit-education"
            onClick={() => setEditSection(true)}
          >
            <i className="fa fa-pencil" />
          </a>
        ) : (
          <a
            className="update-profile save-education text-success"
            onClick={() => setEduFunc()}
          >
            <i className="fa fa-check" />
          </a>
        )}
        <h3>Education</h3>
        <div className="overflow-hidden clearfix mt-0" id="SaveEducation">
          {qualificationArray?.length > 0 &&
            qualificationArray.map((data) => (
              <div className="d-inline-block" key={data._id}>
                <input
                  value={data._id}
                  checked={data?._id === qualificationId?._id}
                  onChange={() => changeQualification(data._id)}
                  key={data._id}
                  type="checkbox"
                  className="button"
                  id={data._id}
                  name="qualification"
                />
                <label htmlFor={data._id}>{data.name}</label>
              </div>
            ))}
        </div>
        {/* <div><a className="Add-profile link-color" data-toggle="modal" data-target="#AddCertificate"><b className="fa fa-plus" /> Add
            More Certification, Diploma</a></div> */}
        <br />
        <h3>Courses</h3>
        {courseName && (
          <div className="overflow-hidden clearfix mt-0" id="SaveCourses">
            <input
              type="checkbox"
              defaultChecked={true}
              className="button"
              id="Msc-Computer-Science"
              name="gender"
            />
            <label htmlFor="Msc-Computer-Science">{courseName}</label>
          </div>
        )}
        <div>
          <a
            className="Add-profile link-color"
            onClick={() => setOpenCourseModalFunc()}
            data-toggle="modal"
            data-target="#AddCources"
          >
          <b className="fa fa-plus" /> Add More Cources, Diploma
          </a>
        </div>
      </div>
      {openCourseModal && (
        <AddCourseModal
          qualification={qualificationId}
          basicApiCall={() => props.basicApiCall()}
          open={openCourseModal}
          onCloseModal={() => setOpenCourseModal(false)}
          courseArray={courseArray}
        />
      )}
    </>
  );
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  handleLoader: (data) => dispatch(globalLoaderFunc(data)),
  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEducation);