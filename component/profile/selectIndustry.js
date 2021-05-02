import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux'
import { globalLoaderFunc, globalAlert } from '../actions/commonActions';
import { postUserProfileApi } from '../actions/jobsApi'




const ProfileIndustry = React.memo((props) => {
    const [moreShow, setMoreShow] = useState(false);
    const [slectedIndustry, setSelectedIndustry] = useState([]);    /////////////////////////////////////////////////
    const [sectionEdit, setSectionEdit] = useState(false)

   
    const setSelectedIndustryFunc = (val) => {                      ///////////////////////////////////////////////////////////
        if (sectionEdit) {
            if (!slectedIndustry.includes(val)) {
                if (slectedIndustry.length < 3) {
                    setSelectedIndustry([...slectedIndustry, val]);
                }
            } else {
                setSelectedIndustry(slectedIndustry.filter(item => item !== val));
            }
        }
    };

    const setSectionEditFunc = async () => {                                    /////////////////////////////////////////
        props.handleLoader(true);
        const arrayToString = slectedIndustry.join();
        let obj = {
            industryInfo: arrayToString,
        }

        let res = await postUserProfileApi(obj);

        if (res.data.status === 200) {
            setSectionEdit(false);
            props.basicApiCall()

        }
        else {
            props.globalAlert('error', res.data?.message)
        }
    }

    const isSelectedIndustry = (dataId) => {                                                    /////////////////////////////////sss
        return slectedIndustry.includes(dataId);
    }

    return (
        <>
            <div className="filter-card" style={{display:'none'}}>
                {!sectionEdit ?
                    <a className="update-profile edit-Industry" onClick={() => setSectionEdit(true)}><i className="fa fa-pencil" /></a> :
                    <a className="update-profile save-Industry text-success" onClick={() => setSectionEditFunc(true)}><i className="fa fa-check" /></a>}
                <h3>Select Industry <span>Maximum 3 Industry will be selected.</span></h3>
                <div className="overflow-hidden" id="SaveIndustry">

                    {props?.dataOwn?.suggestedIndustries?.length && props?.dataOwn?.suggestedIndustries.map(data => (
                        data?.selected ? (<div className="d-inline-block" key={data?._id}>
                            <input type="checkbox" id={data?._id}  defaultChecked={true}  name="industry" />
                            <label htmlFor={data?._id} >{data?.name}</label>
                        </div>) : null
                    ))}

                    {/* <div className="clearfix pt-2" /> */}
                    <div className="pt-2 pb-1">
                        <a className="btn-sm btn-info cursor btn-info-own" onClick={() => setMoreShow(!moreShow)} >Add Industry <i className="fa fa-plus" /></a></div>
                    {moreShow &&
                        <div className="more-industry collapse show clearfix mt-0" id="more-industry">
                            {props?.dataOwn?.suggestedIndustries?.length && props?.dataOwn?.suggestedIndustries.map(data => (
                                <div className="d-inline-block" key={data?._id}>
                                    <input type="checkbox" id={`${data?._id}1`} onChange={() => setSelectedIndustryFunc(data?._id)} checked={isSelectedIndustry(data?._id)} name="industry" />
                                    <label htmlFor={`${data?._id}1`} >{data?.name}</label>
                                </div>
                            ))}

                        </div>
                }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndustry); 