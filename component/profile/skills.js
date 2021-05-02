import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux'
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import AddSkillsModal from '../modal/addSkillsModal';
import { postUserProfileApi,jobSearchApi,userProfileApiMain } from '../actions/jobsApi';
import OutsideClickHandler from 'react-outside-click-handler';
import OwnAutoComplete from '../../component/_shared/ownAutocomplete';
let timeout;
const ProfileSkills = React.memo((props) => {

    const [skillModal, setSkillModal] = useState(false);
    const [skillSelected, setSkillSelected] = useState(null);
    const [skillEdit, setSkillEdit] = useState(null);
    const [skillsValue, setSkillValue]=useState('');
    const [skillsArray, setSkillsArray]=useState([]);
    const [skillsCurnt, setSkillsCurnt]=useState([]);
    const [suggestedSkills, setSuggestedSkills]=useState([]);
    const [skillAutocompleteList, setSkillAutocompleteList]=useState(false);
    const [skillsSelected, setskillsSelected]=useState([])

    useEffect(() => {
       abcd();
     // let res = await jobSearchApi(val);
     //      if (res.data.status === 200) {
     //          setSkillsArray(res.data.data.skills)
     //      }
        setSkillSelected(props?.dataOwn?.selectedSkills)

    }, [props?.dataOwn?.selectedSkills])

const abcd = async (ev) => {
let res = await userProfileApiMain();
//console.log('res',res);
setSkillsCurnt(res.data.data.userInfo.profile.name);
//console.log('skilcurnt',skillsCurnt);
let ress = await jobSearchApi(skillsCurnt);
//console.log('rest',ress);
if (ress.data.status === 200) {
setSuggestedSkills(ress.data.data.skills)
}

}
      const skillApiCall = async (ev) => {
        let val = ev.target.value;
        console.log(val);
        setSkillValue(val);
        setSkillAutocompleteList(true)
        // this.setState({
        //   skillsValue: val,
        //   skillAutocompleteList:true,
        // })
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          let res = await jobSearchApi(val);
          if (res.data.status === 200) {
              setSkillsArray(res.data.data.skills)
          }
        }, 1);
      }

      const setSkillFunc =(val)=>{
        let localArray = [...skillsSelected];
        let findEle = localArray.find(x=>x===val);
        if(!findEle){
        localArray.push(val);
        setskillsSelected(localArray);
        setSkillAutocompleteList(false)

        setSkillValue('')
        }
      }

      const handleSkillsDeleteNew =(val)=>{

        let localSelected = [...skillsSelected]
        let currentIndex = localSelected.findIndex(x => x === val);
        if (currentIndex >= 0) {
            localSelected.splice(currentIndex, 1);
            setskillsSelected(localSelected)

        }

      }

      const toggleSkillsSelected =  (ev, val)=>{
          let localArray=[...skillsSelected]
          if(ev.target.checked){
            localArray.push(val);
            setskillsSelected(localArray)
          }
          else{
              let index = localArray.findIndex(x=>x===val);
              if(index>-1){
              localArray.splice(index, 1)
              
              setskillsSelected(localArray)
          }
        }
      }

      const saveData = ()=>{
          addSkills(skillsSelected)
      }


    const deleteSkills = async(val) => {

        let localArray = [...skillSelected];
        let index = localArray.findIndex(x => x._id === val);
        if (index > -1) {
            localArray.splice(index, 1);
            

            setSkillSelected(localArray)
        }

    }

    const addSkills = async(data) => {
        let localArray = [...skillSelected];

        props.handleLoader(true);


        let skillsArray = localArray.map(x=>{
            return x.name
        })

        skillsArray = [...skillsArray, ...data]


        let obj = {
            skillsInfo:skillsArray.toString()
        }

        let res = await postUserProfileApi(obj);

        if (res.data.status === 200) {
            setSkillModal(false);
            setSkillEdit(false)
            props.basicApiCall()

        }
        else {
            props.globalAlert('error', res.data?.message)
        }

    }

    const setSkillEditFunc = async()=>{
        saveData();
        props.handleLoader(true);
        let skillsArray = skillSelected.map(x=>{
            return x.name
        })

        let obj = {
            skillsInfo:skillsArray.toString()
        }

        let res = await postUserProfileApi(obj);

        if (res.data.status === 200) {
           
            setSkillEdit(false)
            props.basicApiCall()

        }
        else {
            props.globalAlert('error', res.data?.message)
        } 
    }



    return (
        <>


<div className="form-row">

    <div className="form-group col-md-12 exp-pro exp-pro1 exph4">
    <a id="editnow2" className={`Add-profile right-top sallary-edit cursor ${!skillEdit ? "d-inline" : "none"
  }`} onClick={() => setSkillEdit(true)}><i className="fa fa-pencil"></i> Edit</a>
  <a onClick={() => setSkillEditFunc()} className={`Add-profile right-top sallary-save  text-success ${skillEdit ? "d-inline" : "none"
  }`}> <b className="fa fa-check" /> save
  </a>
<h4>Skills  :</h4>
<div className={`${skillEdit ? "d-inline" : "none"
  }`}>
<div className="own-auto-complete skill-autocomplete own-autocomplete">
                  {!skillsValue &&
                    <p className="place-holder-text">Search Jobs</p>}
                     <OutsideClickHandler
                    onOutsideClick={() => {
                     
                        setSkillAutocompleteList(false)
                    }}
                >
                      <OwnAutoComplete
                        onChange={(e) =>
                          skillApiCall(e)}

                        value={skillsValue}
                        items={skillsArray}
                        onSelect={setSkillFunc}
                        renderItem={skillAutocompleteList}
                        renderValue ={'name'}

                      />
                      </OutsideClickHandler>

                  
                </div>
                
                    
                
                {skillsSelected.length > 0 &&
                <div className="locality-tag-wrapper skills-tag-wrapper">
                  <ul className="list-unstyled tag-list text-left">
                    {skillsSelected.map((data, index) => (
                      <li key={index}>
                        <span className="list-txt"> {data}<span className="cross-wrapper cursor" onClick={() =>handleSkillsDeleteNew(data)}>×</span></span>
                      </li>
                    ))}

                  </ul>
                </div>

              }

                
   </div>     
  {suggestedSkills?.length>0 && suggestedSkills?.map(data=>(
                        <div className="d-inline-block position-relative new-custom-checkbox" key={data?._id}>
 <input type="checkbox" class="button" id={data?._id} checked={skillsSelected.findIndex(x => x === data.name) > -1 ? true : false} onChange={(ev)=>toggleSkillsSelected(ev, data.name)} name="skill"></input>
                      <label for={data?._id}>{data.name}</label>
</div>
                    ))}
    <div className="overflow-hidden clearfix mt-0" id="saveskill">
                    {skillSelected?.length > 0 && skillSelected.map((data) => (
                        <div className="d-inline-block position-relative" key={data?._id}>
                            <input type="checkbox" id={data?._id} defaultChecked={true} name="role" />
                            <label htmlFor={data?._id}>{data.name}</label>
                            {skillEdit && <a className="delete-skill delete-skill-own" onClick={() => deleteSkills(data?._id)}><i className="fa fa-remove" /></a>}
                        </div>
                    ))}
   </div> 
  
  {skillModal && <AddSkillsModal open={skillModal} addSkills={addSkillsFromModal} onCloseModal={() => setSkillModal(false)} suggestedSkills={props?.dataOwn?.suggestedSkills} />}                  
  </div>
  <div className="form-group col-md-6 exph4" style={{display:'none'}}>
  <h4>काम का एक्सपीरियंस हैं</h4>
  <div className="exp-pro exp-pro1" id="workExp">
  <input type="radio" className="button" id="5+years1" name="exp1" value="5+years1" defaultChecked />
  <label htmlFor="5+years1">5+ years</label>
  </div>
  </div>
  </div>



            <div className="filter-card" style={{display:'none'}}>
                {!skillEdit ?
                    <a className="update-profile edit-skill" onClick={() => setSkillEdit(true)}><i className="fa fa-pencil text-primary" /></a> :
                    <a className="update-profile save-skill text-success" onClick={() => setSkillEditFunc()}><i className="fa fa-check" /></a>}
                <h3>Skill</h3>
                <div className="overflow-hidden clearfix mt-0" id="saveskill">
                    {skillSelected?.length > 0 && skillSelected.map((data) => (
                        <div className="d-inline-block position-relative" key={data?._id}>
                            <input type="checkbox" id={data?._id} defaultChecked={true} name="role" />
                            <label htmlFor={data?._id}>{data.name}</label>
                            {skillEdit && <a className="delete-skill delete-skill-own" onClick={() => deleteSkills(data?._id)}><i className="fa fa-remove" /></a>}
                        </div>
                    ))}



                </div>
                
            </div>
            {skillModal && <AddSkillsModal open={skillModal} addSkills={addSkillsFromModal} onCloseModal={() => setSkillModal(false)} suggestedSkills={props?.dataOwn?.suggestedSkills} />}
        </>

    )

})


const mapStateToProps = state => ({


})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),


})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSkills); 