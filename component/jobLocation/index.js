import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert, setUserProfile } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import Autocomplete from "react-autocomplete";
import OutsideClickHandler from "react-outside-click-handler";
import OwnAutoComplete from "../../component/_shared/ownAutocomplete";
// import { MAIN_URL, PHP_APP_URL } from '../types/types';
import { getTopJobCity, getJobCity, getJobState, locationSearchApi, jobSearchApi } from '../actions/jobsApi';
import Router from 'next/router'
import { withCookies, Cookies } from 'react-cookie';


let timeout;
const JobLocation = (props) => {
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


    useEffect(() => {
        fetchTopCity();
        fetchJobOtherLocations();
        fetchJobStates();
    }, []);

    const fetchTopCity = async () => {
        const res = await getTopJobCity();
        setloadingTopLocationData(false);
        settopJobCities(res?.data?.data?.locations);
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
            <div className="container-fluid  home">
                <div className="latest-jobs latest-jobs1 job-detail">
                    <h1 className="text-center">Search latest Jobs by Location</h1>
                    <br />
                    <div className="text-center w-80">
                        <form onSubmit={searchFormSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    {/* <input type="text" className="form-control" id="inputCity" placeholder="Enter Designation, Skill" /> */}
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
                                        placeholder={"अपना नौकरी खोजें"}
                                        className={"form-control"}
                                        />
                                    </OutsideClickHandler>
                                </div>
                                <div className="form-group col-md-4 md5">
                                    {/* <select id="inputState" className="form-control">
                                        <option selected>Search City</option>
                                        <option>...</option>
                                    </select> */}
                                    <Autocomplete
                                        inputProps={{ id: "states-autocomplete", placeholder:'अपना शहर चुनें', className:'form-control' }}
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

                    <div className="profile recomended row">
                        <div className="col-sm-12">

                            <div className="text-left job-by-location">
                                <h3 className="text-center">
                                    <b>Latest Jobs by</b> Top Locations</h3>
                                <ul className="row pic-bg">

                                    {loadingTopLocationData ? "Loading..." : topJobCities.length > 0 && topJobCities.map((locationData, index) => {
                                        return (<li key={locationData._id} className="col-sm-2">
                                            <Link
                                                href="/[dynamic]"
                                                as={`/${locationData.alias}`}
                                                key={index}
                                            >
                                                <div>
                                                    <img src={locationData.image} />
                                                    <a href="#">
                                                        {locationData.location}<span><i className="fa fa-users"></i> {locationData.count}</span></a>
                                                </div>
                                            </Link>
                                        </li>)
                                    })}
                                </ul>
                            </div>

                           

                            <div className="filter-card text-left job-by-location">
                                <h3 className="text-center"><b>Latest Jobs by</b> Other Locations</h3>
                                <ul className="row">
                                    {loadingOtherLocationData ? "Loading..." : otherJobCities.length > 0 && otherJobCities.map((locationData) => {
                                        return (<li key={locationData._id} className="col-sm-3">
                                            <Link
                                                href="/[dynamic]"
                                                as={`/${locationData.alias}`}
                                                key={locationData._id}
                                            >
                                                <a href="#">{locationData.location} ({locationData.count})</a>
                                            </Link>
                                        </li>)
                                    })
                                    }
                                </ul>
                            </div><br />

                            <div className="filter-card text-left job-by-location">
                                <h3 className="text-center"><b>Latest Jobs by</b> State/ Union Territories</h3>
                                <ul className="row">
                                    {loadingStateLocationData ? "Loading..." : jobStates.length > 0 && jobStates.map((locationData) => {
                                        return (<li key={locationData._id} className="col-sm-3">
                                            <Link
                                                href="/[dynamic]"
                                                as={`/${locationData.alias}`}
                                                key={locationData._id}
                                            >
                                                <a href="#">{locationData.location} ({locationData.count})</a>
                                            </Link>
                                        </li>)
                                    })
                                    }
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// export async function getServerSideProps(context) {

//     let header ={}
//     let query = context?.req?.headers?.cookie;
//     if(query){    
//         var langOwn =query.match('(^|;)\\s*' + "langOwn" + '\\s*=\\s*([^;]+)');
//         langOwn =  langOwn ? langOwn.pop() : '';
//         if(langOwn){
//           header.langOwn=langOwn;
//         };
//         var authtoken =query.match('(^|;)\\s*' + "authtoken" + '\\s*=\\s*([^;]+)');
//         authtoken =  authtoken ? authtoken.pop() : '';
//         if(authtoken){
//           header.jwt=authtoken;
//         };
//         var userId =query.match('(^|;)\\s*' + "userId" + '\\s*=\\s*([^;]+)');
//         userId =  userId ? userId.pop() : '';
//         if(userId){
//           header.userid=userId;
//         };
//         var latitude =query.match('(^|;)\\s*' + "latitude" + '\\s*=\\s*([^;]+)');
//         latitude =  latitude ? latitude.pop() : '';
//         if(latitude){
//           header.latitude=latitude;
//         };
//         var longitude =query.match('(^|;)\\s*' + "longitude" + '\\s*=\\s*([^;]+)');
//         longitude =  longitude ? longitude.pop() : '';
//         if(longitude){
//           header.longitude=longitude;
//         };
//       }

//     const res = await getTopJobCity();

//     return {
//       props: {
//         content:res?.data?.data?.locations,
//       }
//     }
//   }


const mapStateToProps = state => ({
    applyLink: state.product.applyLink
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
    setMobileFunc: (data, msg) => dispatch(setMobileFunc(data, msg)),
    setUserProfile: (data) => dispatch(setUserProfile(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(JobLocation));


