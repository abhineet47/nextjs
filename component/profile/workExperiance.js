import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import {connect} from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { globalLoaderFunc, globalAlert,jobRolesApi } from '../actions/commonActions';
import WorkExpModal from '../modal/workExpModal';
import {postCallApi,postUserProfileApi,jobSearchApi} from '../actions/jobsApi';
import { MAIN_URL, JOB_EXP_ARRAY } from '../types/types';

let timeout;
const ProfileWorkExperiance = React.memo((props) => {
    const [workExpModal, setWorkExpModal] = useState(false);
    const [editExp, setEditExp] = useState(false);
    const [editExpp, setEditExpp] = useState(false);
    const [workExpArray, setWorkExpArray] =useState(null);
    const [sectionEdit, setSectionEdit]=useState(null);
    const [currentExpData, setCurrentExpData] = useState(null);
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

    useEffect(()=>{
        setWorkExpArray(props?.dataOwn);
    },[props?.dataOwn])

const formSubmit =async()=>{
        let valid = await formValidation();
        if(valid){
            setSectionEdit(false);
            setEditExp(false);
            let obj = {
                companyName:comapny,
                current:working===1?true:false,
                jobRole:jobRole,
                jobYears:jobYears
            }
           if(editExp){
            console.log(obj);
            addWorkExp(obj, props?.currentExpData?.index);
           }
           else{
            console.log(comapny);
            addWorkExp(obj);
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
    const deleteExp =async(id)=>{
        let localArray = [...workExpArray];
        localArray.splice(id, 1);

        props.handleLoader(true);

        
        let obj = {
            workExpInfo:localArray
        }

        let res = await postUserProfileApi(obj);
       
        if(res.data.status===200){
            setSectionEdit(false)
        props.basicApiCall()
        
        }
        else{
            props.globalAlert('error', res.data?.message)
        }
        // setWorkExpArray(localArray)
    }

    const editExpFunc =(data, index)=>{
        setEditExp(true);
        //editExpp(true);
        setCurrentExpData({...data, index:index});
        setWorkExpModal(true)
    }
    const setSectionEditt = ()=>{ 

       setSectionEdit(false);
    formSubmit();
    }
    const addWorkExp =async (val, editIndex=null)=>{
        props.handleLoader(true);
        let localArray = [...workExpArray]
        if(editIndex>-1 && editIndex!== null){
            localArray[editIndex]=val
           
        }
        else{
            if(val?.current){
                localArray.forEach(x=>x.current=false);
                localArray.unshift(val)
                // setWorkExpArray(localArray)
            }
            else{
                localArray.push(val)
                // setWorkExpArray(localArray)
            }
        }
        

        let obj = {
            workExpInfo:localArray
        }

        let res = await postUserProfileApi(obj);
      

        if(res.data.status===200){
        setWorkExpModal(false)
        setSectionEdit(false)
        props.basicApiCall()
        }
        else{
            props.globalAlert('error', res.data?.message)
        }

    }


    return (
        <>
<div id="ShowProfile3" className="ShowProfile">          
{!sectionEdit ?
<a className="edit-Experience right-top" onClick={()=>setSectionEdit(true)}><i className="fa fa-pencil" /> Edit</a>:
<a className="save-Experience text-success right-top" onClick={()=>setSectionEditt()} ><i className="fa fa-check" /> Save</a>}
{workExpArray?.length>0 && workExpArray.map((data, index)=>(
<div className="experiance1" key={index}>

 <h4 className="spcust">Company Name  : {data?.companyName}</h4>
 {sectionEdit &&
 <>
 <div className="right-top removeExperience text-warning pb-1 text-right" onClick={()=>editExpFunc(data, index)} style={{float:'left'}}> <i className="fa fa-pencil" />
  Edit</div>
 <div className="right-top removeExperience text-danger text-right" onClick={()=>deleteExp(index)} > <i className="fa fa-remove" />
 Delete</div>
</>}
<div className="form-row" style={{width:'100%'}}>
<div className="form-group col-md-6">
<p>Profile: <strong>{data?.jobRole}</strong></p>
</div>
<div className="form-group col-md-6">      
<p>Kitne saal kiya is company mein: <strong>{data?.jobYears}</strong></p>         
</div>         
</div>
<div className="form-row">
<div className="form-group col-md-6">
<p>Current  Company: <strong>{data?.current?"Yes":"No"}</strong></p>       
</div>      
</div>
 
<div className={`${editExpp ? "d-inline" : "none"}`}>
<div className="form-group">
<input type="text" value={comapny} onChange={(ev)=>setCompany(ev.target.value)} maxLength={50} className="form-control" placeholder="Company Name" />
<div className="error-wrapper text-left">
{emptyCompany && !comapny && <span >Company is empty</span>}
</div>
</div>
        <div className="form-group">
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
<div className="form-group">
    <input className="form-check-input" onChange={()=>setWorking(1)} checked={working===1} type="radio" name="company" id="Currentt" />
    <label className="form-check-label" htmlFor="Current">
    Current company </label>
    <input className="form-check-input" onChange={()=>setWorking(2)} checked={working===2} type="radio" name="company" id="Previouss" />
    <label className="form-check-label" htmlFor="Previous">
    Previous company </label>
<div className="error-wrapper text-left">
{emptyWorking && !working && <span >Working is empty</span>}
</div>
</div>
</div>

</div>
))}
<div className="text-center ad_comp">
<a href="#;" className="btn-sm btn-info text-light "  onClick={()=>setWorkExpModal(true)} data-toggle="modal" data-target="#AddExp" data-whatever="Work Experience"><i className="fa fa-plus"></i> Add Companies</a>
</div>
<div>
<div className="text-center"> 
</div>
</div>
</div>
<div>
{workExpModal && <WorkExpModal open={workExpModal} addWorkExp={addWorkExp} onCloseModal={()=>setWorkExpModal(false)} editExp={editExp} currentExpData={currentExpData}/>}
</div>

<div className="filter-card" style={{display:'none'}}>
{!sectionEdit ?
<a className="update-profile edit-Experience" onClick={()=>setSectionEdit(true)}><i className="fa fa-pencil" /></a>:
<a className="update-profile save-Experience text-success" onClick={()=>setSectionEditt(false)} ><i className="fa fa-check" /></a>}
<h3>Work Experience</h3>
{workExpArray?.length>0 && workExpArray.map((data, index)=>(
 <div className="experiance1" key={index}>
 <h4><i className="fa fa-bank" /> {data?.companyName} <span className="text-info pl-4">{data?.current?"Current":"Previous"}</span></h4>
 <div className="exp-detail">
   <span className="work-year"><i className="fa fa-calendar" /> {data?.jobYears} years</span>
   <span className="designation"><i className="fa fa-black-tie" /> {data?.jobRole}</span>
 </div>
 {sectionEdit &&
 <>
 <div className="removeExperience text-warning pb-1 text-right" onClick={()=>editExpFunc(data, index)} > <i className="fa fa-pencil" />
  Edit</div>
 <div className="removeExperience text-danger text-right" onClick={()=>deleteExp(index)} > <i className="fa fa-remove" />
   Delete</div>
 </>}
</div>
))}       
</div>
<div>
{workExpModal && <WorkExpModal open={workExpModal} addWorkExp={addWorkExp} onCloseModal={()=>setWorkExpModal(false)} editExp={editExp} currentExpData={currentExpData}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWorkExperiance); 