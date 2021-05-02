import React, {useEffect, useState} from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router  from 'next/router';
import {postCallApi,jobSearchApi} from '../actions/jobsApi';
import { MAIN_URL } from '../types/types'
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import OutsideClickHandler from 'react-outside-click-handler';
import OwnAutoComplete from '../../component/_shared/ownAutocomplete';



let timeout;

const AddSkillsModal = React.memo((props)=>{
    const [skillsValue, setSkillValue]=useState('');
    const [skillsArray, setSkillsArray]=useState([]);
    const [skillAutocompleteList, setSkillAutocompleteList]=useState(false);
    const [skillsSelected, setskillsSelected]=useState([])


    useEffect (()=>{
        // if(props?.cookies?.cookies.langOwn){
        //     setSelectedLang(props?.cookies?.cookies.langOwn)
        // }

    },[])


    const skillApiCall = async (ev) => {
        let val = ev.target.value;
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
          props.addSkills(skillsSelected)
      }
 


    return(
        <>
        <Modal open={props.open} classNames={{ modal: "modal-sm modal-own" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>
       
        <div className="modal-content home employee">
        <div className="modal-header">
          <h5 className="modal-title text-center"> Select Skills
          
          </h5>
          <button type="button" className="close" onClick={props.onCloseModal}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body profile">
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

                  {/* <Autocomplete
                    inputProps={{ id: 'states-autocomplete' }}
                    wrapperStyle={{ position: 'relative', display: 'block' }}
                    value={this.state.skillsValue}
                    items={this.state.skillsArray}
                    getItemValue={(item) => item.name}
                    onSelect={value => this.setSkillFunc(value)}
                    shouldItemRender={(item, value) => item?.name?.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    onChange={(e) =>
                      this.skillApiCall(e)
                    }
                    renderItem={(item, highlighted) =>
                      <div className={'list-wrapper'}
                        key={item._id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                        {item.name}
                      </div>
                    }
                  /> */}
                </div>
                <div>
                    {props?.suggestedSkills?.length>0 && props?.suggestedSkills?.map(data=>(
                        <div className="d-inline-block position-relative new-custom-checkbox" key={data?._id}>
 <input type="checkbox" class="button" id={data?._id} checked={skillsSelected.findIndex(x => x === data.name) > -1 ? true : false} onChange={(ev)=>toggleSkillsSelected(ev, data.name)} name="skill"></input>
                      <label for={data?._id}>{data.name}</label>
</div>
                    ))}
                    
               
                      
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
        <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={props.onCloseModal}>Close</button>
                  <button type="button" className="btn btn-primary" disabled={skillsSelected?.length<1} onClick={saveData}>Save</button>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AddSkillsModal))
