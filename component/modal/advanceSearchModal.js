import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router from 'next/router';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert, setExpFilter } from '../actions/commonActions';
import { jobSearchApi, locationSearchApi, getExperianceApi } from '../actions/jobsApi';
import OwnAutoComplete from '../_shared/ownAutocomplete';
import OutsideClickHandler from 'react-outside-click-handler';




let timeout;
const AdvanceSearchModal = React.memo((props) => {

    const [loacationArray, setLocationArray] = useState([]);
    const [jobsArray, setJobsArray] = useState([]);
    const [locationValue, setLocationValue] = useState('');
    const [jobsValue, setJobsValue] = useState('');
    const [skillsArray, setSkillsArray] = useState([]);
    const [skillsValue, setskillsValue] = useState('');
    const [skillSeleceted, setSkillSeleceted] = useState([]);
    const [expValue, setExpValue] = useState('');
  const [jobsAutocompleteList, setJobsAutocompleteList]=useState(false)
  const [skillAutocompleteList, setSkillAutocompleteList]=useState(false)
  



    useEffect(() => {
        if (props.expFilterArray?.length === 0) {
            getExpFunc()
        }

    }, []);

    const getExpFunc = async () => {

        let res = await getExperianceApi();
        if (res.data.status === 200) {
            props.setExpFilter(res.data.data.experiencesFilters)
        }

    }



    const locationApiCall = async (ev) => {
        let val = ev.target.value;
        setLocationValue(val)
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            let res = await locationSearchApi(val, null);
            if (res.data.status === 200) {
                setLocationArray(res.data.data.locations)
            }
        }, 500);

    }

    const jobsApiCall = async (ev) => {
        let val = ev.target.value;
        setJobsValue(val)
    setJobsAutocompleteList(true)

        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            let res = await jobSearchApi(val);
            if (res.data.status === 200) {
                setJobsArray(res.data.data.skills)
            }
        }, 500);

    }
    const setJobsValueLowest =(val)=>{
   
        setJobsValue(val);
        setJobsAutocompleteList(false)
    
      }

    const skillApiCall = async (ev) => {
        let val = ev.target.value;
        setskillsValue(val)
        setSkillAutocompleteList(true)
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            let res = await jobSearchApi(val);
            if (res.data.status === 200) {
                setSkillsArray(res.data.data.skills)
            }
        }, 500);

    }

    const setSkillFunc = val => {
        let localSelected = [...skillSeleceted]
        let currentVal = localSelected.find(x => x === val)
        if (!currentVal) {
            localSelected.push(val);
            setSkillAutocompleteList(false)
            setSkillSeleceted(localSelected);
            setskillsValue('');
        }
    }

    const handleSkillsDelete = val => {
        let localSelected = [...skillSeleceted];
        let currentIndex = localSelected.findIndex(x => x === val);
        if (currentIndex >= 0) {
            localSelected.splice(currentIndex, 1)
            setSkillSeleceted(localSelected)
        }
    }

    const searchFormSubmit = (ev) => {
        ev.preventDefault();
        if (locationValue && jobsValue && expValue && skillSeleceted.length > 0) {
            let allSkills = [...skillSeleceted];
            allSkills.push(jobsValue);
            let skillsParam = allSkills.toString();

            Router.push({
                pathname: '/jobs/jobs-search',
                query: { locations: locationValue, skills: skillsParam, experiance: expValue },
            })
        }
    }

    return (
        <>
            <Modal open={props.open} classNames={{ modal: "modal-sm modal-own" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>

                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Advance Search</h5>
                        <button type="button" onClick={props.onCloseModal} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="advance-search-form" onSubmit={searchFormSubmit}>
                            <div className="form-group">
                                <div className="own-auto-complete own-autocomplete position-relative">
                                    {!jobsValue &&
                                        <p className="place-holder-text">Job</p>}
                                         <OutsideClickHandler
                    onOutsideClick={() => {
                     
                       setJobsAutocompleteList(false)
                    }}
                >
                      <OwnAutoComplete
                        onChange={(e) =>
                          jobsApiCall(e)}

                        value={jobsValue}
                        items={jobsArray}
                        onSelect={setJobsValueLowest}
                        renderItem={jobsAutocompleteList}
                        renderValue ={'name'}

                      />
                      </OutsideClickHandler>
                                    {/* <Autocomplete
                                        inputProps={{ id: 'states-autocomplete' }}
                                        wrapperStyle={{ position: 'relative', display: 'block' }}
                                        value={jobsValue}
                                        items={jobsArray}
                                        getItemValue={(item) => item.name}
                                        onSelect={value => setJobsValue(value)}
                                        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        onChange={(e) =>
                                            jobsApiCall(e)
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


                            </div>
                            <div className="form-group">
                                <div className="own-auto-complete own-autocomplete">
                                    {!locationValue &&
                                        <p className="place-holder-text">Location</p>}
                                    <Autocomplete
                                        inputProps={{ id: 'states-autocomplete' }}
                                        wrapperStyle={{ position: 'relative', display: 'block' }}
                                        value={locationValue}
                                        items={loacationArray}
                                        getItemValue={(item) => item.location}
                                        onSelect={value => setLocationValue(value)}
                                        shouldItemRender={(item, value) => item.location.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        onChange={(e) =>
                                            locationApiCall(e)
                                        }
                                        renderItem={(item, highlighted) =>
                                            <div className={'list-wrapper'}
                                                key={item._id}
                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                                                {item.location}
                                            </div>
                                        }
                                        menuStyle={{ position: 'absolute', top: '45px', left: 0 , right:0}}

                                    />

                                </div>



                            </div>
                            <div className="form-group">
                                <div className="own-auto-complete own-autocomplete">
                                    {!skillsValue &&
                                        <p className="place-holder-text">Skill</p>}

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
                                        value={skillsValue}
                                        items={skillsArray}
                                        getItemValue={(item) => item.name}
                                        onSelect={value => setSkillFunc(value)}
                                        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        onChange={(e) =>
                                            skillApiCall(e)
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
                                {skillSeleceted.length > 0 &&
                                    <div className="locality-tag-wrapper skills-tag-wrapper">
                                        <ul className="list-unstyled tag-list">
                                            {skillSeleceted.map((data, index) => (
                                                <li key={index}>
                                                    <span className="list-txt"> {data}<span className="cross-wrapper cursor" onClick={() => handleSkillsDelete(data)}>×</span></span>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <select className="form-control" value={expValue} onChange={(ev) => setExpValue(ev.target.value)}>
                                    <option value="" disabled >Experience</option>
                                    {props?.expFilterArray?.length > 0 && props?.expFilterArray.map(data => (
                                        <option key={data.value} value={data.value}>{data.text}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center"><button type="submit" className="btn btn-primary" disabled={!locationValue || !jobsValue || !expValue || skillSeleceted.length <= 0}><i className="fa fa-search" /> Search</button></div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )

})

const mapStateToProps = state => ({
    applyLink: state.product.applyLink,
    expFilterArray: state.product.expFilterArray,
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
    setMobileFunc: (data, msg) => dispatch(setMobileFunc(data, msg)),
    setExpFilter: data => dispatch(setExpFilter(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AdvanceSearchModal))
