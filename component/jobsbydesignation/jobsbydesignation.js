import React , { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert, setUserProfile } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';
import Autocomplete from "react-autocomplete";
import OutsideClickHandler from "react-outside-click-handler";
import OwnAutoComplete from "../../component/_shared/ownAutocomplete";
import { getTopJobCity, getJobCity, getJobState, locationSearchApi, jobSearchApi,jobDesignation,jobByname } from '../actions/jobsApi';
import Router from 'next/router'
import { withCookies, Cookies } from 'react-cookie';

let timeout;
const JobsByDesignation = (props) => {

const [topJobCities, settopJobCities] = useState([]);
const [otherJobCities, setOtherJobCities] = useState([]);
const [jobStates, setJobStates] = useState([]);
const [loadingTopLocationData, setloadingTopLocationData] = useState(true);
const [loadingOtherLocationData, setloadingOtherLocationData] = useState(true);
const [loadingStateLocationData, setloadingStateLocationData] = useState(true);
const [locationValue, setLocationValue] = useState("");
const [loacationArray, setLocationArray] = useState([]);
const [jobsAutocompleteList, setJobsAutocompleteList] = useState(false);
const [jobsValue, setJobsValue] = useState("");
const [jobsArray, setJobsArray] = useState([]);
const [designationArray, setDesignationArray] = useState([]);
const [jobsBynameArray, setjobsBynameArray] = useState([]);


 useEffect(() => {
        fetchTopCity();
        jobByDesignation();
        fetchJobOtherLocations();
        fetchJobStates();
    }, []);

    const fetchTopCity = async () => {
        const res = await getTopJobCity();
        setloadingTopLocationData(false);
        settopJobCities(res?.data?.data?.locations);
    }

    const jobByDesignation = async () => {
        const res = await jobDesignation();
        setDesignationArray(res.data); 
    }

     const jobsByname = async (skil) => {
        const res = await jobByname(skil);
        setjobsBynameArray(res.data.data.skills);
        console.log("jobss",res);    
    }

    

    const fetchJobOtherLocations = async () => {
        const res = await getJobCity();
        setloadingOtherLocationData(false);
        setOtherJobCities(res?.data?.data?.locations);
    }

    const fetchJobStates = async () => {
        const res = await getJobState();
        setloadingStateLocationData(false);
        setJobStates(res?.data?.data?.locations);
    }

    const locationApiCall = async (ev) => {
        let val = ev.target.value;
        setLocationValue(val);
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          let res = await locationSearchApi(val);
          if (res.data.status === 200) {
            setLocationArray(res.data.data.locations);
          }
        }, 1);
    };

    const jobsApiCall = async (ev) => {
        let val = ev.target.value;
        setJobsValue(val);
        setJobsAutocompleteList(true);
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          let res = await jobSearchApi(val);
          if (res.data.status === 200) {
            setJobsArray(res.data.data.skills);
          }
        }, 1);
    };

    const setJobsValueLowest = (val) => {
        setJobsValue(val);
        setJobsAutocompleteList(false);
    };

    const searchFormSubmit = (ev) => {
        ev.preventDefault();
        if (locationValue && jobsValue) {
          let location = locationValue.toLowerCase().split("(")[0];
          let jobName = jobsValue.replace(/\s+/g, "-").toLowerCase();
    
          const searchUrl = slugify(`${jobsValue} jobs in ${locationValue}`);
    
          Router.push(
            "/jobs/[jobsPosting]",
            `/jobs/${searchUrl}`
          );
        }
    };

    const slugify = (string) => {
        const a =
          "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
        const b =
          "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
        const p = new RegExp(a.split("").join("|"), "g");
        return string
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, "-and-") // Replace & with 'and'
          .replace(/[^\w\-]+/g, "") // Remove all non-word characters
          .replace(/\-\-+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, ""); // Trim - from end of text
    };
      return (
              <>
      <div className="home">
      <div className="container-fluid">
      <section className="jobs-area">
      <div className="page-skill">
      
      <h1 className="text-center">Jobs  by Skill</h1>
    
      <div className="text-center w-80">

                        <form onSubmit={searchFormSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    {/* <input type="text" class="form-control" id="inputCity" placeholder="Enter Designation, Skill" /> */}
                                    <OutsideClickHandler
                                        onOutsideClick={() => {
                                        setJobsAutocompleteList(false);
                                        }}
                                    > 
                                        <OwnAutoComplete
                                        onChange={(e) => jobsApiCall(e)}
                                        value={jobsValue}
                                        items={jobsArray}
                                        onSelect={setJobsValueLowest}
                                        renderItem={jobsAutocompleteList}
                                        renderValue={"name"}
                                        placeholder={"Enter Designation, Skill"}
                                        className={"form-control"}
                                        />
                                    </OutsideClickHandler>
                                </div>
                                <div className="form-group col-md-4 md5">
                                    {/* <select id="inputState" class="form-control">
                                        <option selected>Search City</option>
                                        <option>...</option>
                                    </select> */}
                                    <Autocomplete
                                        inputProps={{ id: "states-autocomplete", placeholder:'Search City', className:'form-control' }}
                                        wrapperStyle={{
                                        position: "relative",
                                        display: "block",
                                        background:"#fff"
                                        
                                        }}
                                        value={locationValue}
                                        items={loacationArray}
                                        getItemValue={(item) => item.location}
                                        onSelect={(value) => setLocationValue(value)}
                                        shouldItemRender={(item, value) =>
                                        item.location
                                            .toLowerCase()
                                            .indexOf(value.toLowerCase()) > -1
                                        }
                                        onChange={(e) => locationApiCall(e)}
                                        renderItem={(item, highlighted) => (
                                        <div
                                            className={"list-wrapper"}
                                            key={item._id}
                                            style={{
                                            backgroundColor: highlighted
                                                ? "#eee"
                                                : "transparent",
                                            }}
                                        >
                                            {item.location}
                                        </div>
                                        )}
                                        menuStyle={{
                                        position: "absolute",
                                        top: "40px",
                                        left: 0,
                                        right: 0,
                                        border: "1px solid #0077b5"
                                        }}
                                       
                                    />
                                </div>
                                <div className="form-group col-md-2 text-left">
                                    <button type="submit" className="btn btn-primary w-100 search-button"><i className="fa fa-search"></i>Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
<div className="jobs-area-link row" >
       
       {designationArray?.length > 0 && designationArray?.map(data => (
            
 
<div className="col-sm-3" key={data?._id}>

      <div className="skill-pannel">

      <a  href="#"><span><img src={`../assets/images/${data?.image}`} /></span>{data?.name}
      <span>Vacancy:620</span>
      </a>

      <ul>
      <li><i className="fa fa-hand-o-right"></i> <a href={`/${data?.childCategory[0]?.alias}`}>{data?.childCategory[0]?.name} ({data?.childCategory[0]?.count})</a></li>
      <li><i className="fa fa-hand-o-right"></i> <a href={`/${data?.childCategory[1]?.alias}`}>{data?.childCategory[1]?.name} (({data?.childCategory[1]?.count}))</a></li>
      <li><i className="fa fa-hand-o-right"></i> <a href={`/${data?.childCategory[2]?.alias}`}>{data?.childCategory[2]?.name}(({data?.childCategory[2]?.count}))</a></li>
      <li><i className="fa fa-hand-o-right"></i> <a href={`/${data?.childCategory[3]?.alias}`}>{data?.childCategory[3]?.name}(({data?.childCategory[3]?.count}))</a> </li>
      <li><i className="fa fa-hand-o-right"></i> <a href={`/${data?.childCategory[4]?.alias}`}>{data?.childCategory[4]?.name}(({data?.childCategory[4]?.count}))</a></li>
      </ul>
      <div className="text-right view-all"><a href={`/${data?.alias}`}>View All  <i className="fa fa-arrow-circle-o-right"></i></a></div>
     

      </div>
      </div>
    
     ))}

</div>

      
      
      
      
      
      
     
      <br /><br />
      <div className="filter-card skill-page">
      <h3 className="text-center">
      <b>Search Jobs by</b>  Designations / Job Titles
      </h3>
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link"><b>Top Designations</b></span>
          </li>
        
      <li className="page-item"><a className="page-link" href="#" data-alpha="a" onClick={() => jobsByname('A')}>A</a></li>
      <li className="page-item"><a className="page-link"  data-alpha="b" href="#"  onClick={() => jobsByname('B')}>B</a></li>
      <li className="page-item"><a className="page-link"  data-alpha="c" href="#"  onClick={() => jobsByname('C')}>C</a></li>
      <li className="page-item"><a className="page-link"  data-alpha="d" href="#"  onClick={() => jobsByname('D')}>D</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="e" href="#"  onClick={() => jobsByname('E')}>E</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="f" href="#"  onClick={() => jobsByname('F')}>F</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="g" href="#"  onClick={() => jobsByname('G')}>G</a></li>
                      
                    
        <li className="page-item"><a className="page-link"  data-alpha="h" href="#"  onClick={() => jobsByname('H')}>H</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="i" href="#"  onClick={() => jobsByname('I')}>I</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="j" href="#"  onClick={() => jobsByname('J')}>J</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="k" href="#"  onClick={() => jobsByname('K')}>K</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="L" href="#"  onClick={() => jobsByname('L')}>L</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="M" href="#"  onClick={() => jobsByname('M')}>M</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="n" href="#"  onClick={() => jobsByname('N')}>N</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="o" href="#"  onClick={() => jobsByname('O')}>O</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="p" href="#" onClick={() => jobsByname('P')}>P</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="q" href="#" onClick={() => jobsByname('Q')}>Q</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="r" href="#" onClick={() => jobsByname('R')}>R</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="s" href="#" onClick={() => jobsByname('S')}>S</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="t" href="#" onClick={() => jobsByname('T')}>T</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="u" href="#" onClick={() => jobsByname('U')}>U</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="v" href="#" onClick={() => jobsByname('V')}>V</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="W" href="#" onClick={() => jobsByname('W')}>W</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="X" href="#" onClick={() => jobsByname('X')}>X</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="X" href="#" onClick={() => jobsByname('Y')}>Y</a></li>
        <li className="page-item"><a className="page-link"  data-alpha="Z" href="#" onClick={() => jobsByname('Z')}>Z</a></li>
        </ul>
      </nav>
      
      <ul className="row" id="myTable">

      {jobsBynameArray?.length > 0 && jobsBynameArray?.map((data,index) => (
<li className="col-sm-3"><a href={`/${data?.alias}`}>{data?.name}</a></li> 
      ))}    
      </ul>
      </div>
      </div>
      
      
      </section>
      </div>
      </div>
      
      </>
      
       )
}


const mapStateToProps = state => ({
    currentClassData: state.product.currentJobData,
    classId: state.product.classId,
    classType: state.product.classType,
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    currentClassDetails: (data, classId, classType) => dispatch(currentClassDetails(data, classId, classType))
})

export default connect(mapStateToProps, mapDispatchToProps)(JobsByDesignation);