import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert, changeUrlParam } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';
import Autocomplete from 'react-autocomplete';
import { jobListingNewApi, jobsFilter, lastJobAlias, jobSearchApi, locationSearchApi } from '../actions/jobsApi';
import { WithContext as ReactTags } from 'react-tag-input';
import { WhatsappShareButton } from "react-share";
import OwnAutoComplete from '../../component/_shared/ownAutocomplete';
import OutsideClickHandler from 'react-outside-click-handler';
import GoogleAd from '../../component/googleAdd/GoogleAd';
import { withCookies, Cookies } from 'react-cookie';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

let timeout;
//let { idd } = useParams();

class JobListing extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      filteredData: [],
      currentPage: 1,
      pageList: [],
      pageSize: 10,
      salaryFilter: '',
      expFilter: '',
      eduFilter: '',
      locationFilter: [],
      skillFIlter: [],
      filtersList: null,
      localityArray: [],
      localities: [],
      locations: [],
      topLocations: [],
      moreLocation: false,
      allLocations: [],
      topSelectedLocations: [],
      selectedLocalities: [],
      designationArray: [],
      skillsArray: [],
      skillsSelected: [],
      designationSelected: [],
      moreDesignation: false,
      sw: false,
      totalPaginationPage: null,
      filterOpen: false,
      skillsValue: '',
      locationsValue: '',
      locationArray: [],
      selectedLocations: [],
      origin: '',
      skillAutocompleteList: false,
    }
  }

  componentDidMount = () => {
     // alert(this.props?.cookies?.cookies?.currentPagee);

   this.setLocalState()
    this.setState({
      origin: window?.location?.origin,
    })
   this.setState({
      origin: window?.location?.origin,
    })
    if(this.props?.cookies?.cookies?.currentPagee)

      {console.log('a');
        this.setState({
         currentPage: this.props?.cookies?.cookies?.currentPagee,
    })
  }
    else{
      console.log('b');
       this.setState({

         currentPage: 1,
    })
    }

    if (this.props?.dataOwn?.length > 0) {
      if (this.props.propsApi !== this.props.lastJobAliasData) {

        this.props.lastJobAlias(this.props.propsApi)
      }
      else {

      }
    }

  }

  setLocalState = () => {

    if (this.props?.query) {
      if (this.props?.query?.locations && this.props?.query?.skills && this.props?.query?.experiance) {
        this.setState({
          selectedLocations: this.props?.query?.locations.split(','),
          skillsSelected: this.props?.query?.skills.split(','),
          expFilter: this.props?.query?.experiance,

        })
      }
      else if (this.props?.query?.locations && this.props?.query?.skills) {
        this.setState({
          selectedLocations: this.props?.query?.locations.split(','),
          skillsSelected: this.props?.query?.skills.split(','),
        })
      }
    }
    this.setState({
      fullData: this.props?.dataOwn,
      currentPage: 1,
      filtersList: this.props?.filterOptionsData,
      topLocations: this.props?.filterOptionsData?.locationFilter?.data,
      designationArray: this.props?.filterOptionsData?.skillsFilter?.data,
    }, () => {
      this.setPagination();
    })
  }

  callBasicApi = async () => {

    this.props.handleLoader(true)

    let obj = {
      fromAlias: this.props.propsApi,
      salaryFilter: this.state.salaryFilter,
      experienceFilter: this.state.expFilter,
      educationFilter: this.state.eduFilter,
      locationFilter: this.state.selectedLocations.toString(),
      skillFilter: this.state.skillsSelected.toString(),
    }

    let res = await jobListingNewApi(obj);

    this.closeFilter();

    if (res.data.status === 200) {
      window.scrollTo(0, 0)
      this.setState({
        fullData: res.data?.data?.pageContent?.jobsListing,
        designationArray: res.data?.data?.pageContent?.filters?.skillsFilter?.data,
        topLocations: res.data?.data?.pageContent?.filters?.locationFilter?.data,
        currentPage: 1,
      }, () => {
        this.setPagination();
      })
    }
    else {
      this.props.globalAlert('error', res.data.message)
    }
    this.props.handleLoader(false);
  }

setPagination = () => {
    
    if (this.state?.fullData?.length > 0 && this.state.fullData.length > this.state.pageSize) {
      let totalPage = Math.ceil(this.state.fullData.length / this.state.pageSize);
      let pageListLocal = [];
      let n = 5;
      let t = Math.ceil(n / 2);

      if ((this.state.currentPage - t) > 0 && (this.state.currentPage + t) <= totalPage) {

        for (let i = this.state.currentPage - (t - 1); i <= (this.state.currentPage - t) + n; i++) {
          pageListLocal.push(i);
        }
      }
     
      else if (this.state.currentPage + t > totalPage) {


        for (let i = totalPage - (n - 1); i <= totalPage; i++) {
          if (i > 0) {
            pageListLocal.push(i);

          }
        }
      }

      else if (this.state.currentPage <= t) {
        for (let i = 1; i <= n; i++) {
          pageListLocal.push(i);
        }
      }
      else {

        for (let i = this.state.currentPage - t; i < this.state.currentPage + t; i++) {
          pageListLocal.push(i);
        }
      }

      this.setState({
        pageList: pageListLocal,
        totalPaginationPage: totalPage,

      }, () => {
        this.setFilteredData(this.state.currentPage)
      })

    }
    else if (this.state?.fullData?.length > 0) {
      this.setState({
        pageList: [1],
        totalPaginationPage: 1,

      }, () => {
        this.setFilteredData(1)
      })

    }

    else {
      this.setState({
        pageList: [],
        filteredData: [],
      })
    }

  }

  setFilteredData = (currentPage) => {
    const { cookies } = this.props;
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
    now.setTime(expireTime);
    cookies.set('currentPagee', currentPage, { path: '/', expires: now });
    if(currentPage > 0 && currentPage <= this.state.totalPaginationPage) {
      window.scrollTo(0, 0)
      let filterDataLocal = this.state.fullData.filter((x, index) => index >= this.state.pageSize * (currentPage - 1) &&
      index < this.state.pageSize * (currentPage));
      this.setState({
        filteredData: filterDataLocal,
        currentPage: currentPage,
      })
    }
  }
  filterDataApi = (ev) => {
    let targetValue = ev.target.value;
    //console.log(targetValue);
    if (this.state[ev.target.name] === ev.target.value) {
      targetValue = '';
    }
    this.setState({
      [ev.target.name]: targetValue,
    }, () => {
      this.callBasicApi()
      this.sendJobsFilterProps(true)
    })
  }

  topLocationSelection = (ev) => {
    let localLocations = [...this.state.selectedLocations];
    if (ev.target.checked) {
      localLocations.push(ev.target.value)
      this.setState({
        selectedLocations: localLocations,
      }, () => {
        changeUrlParam('locations', this.state.selectedLocations.toString())

        this.callBasicApi()
      })
    }
    else {
      let index = localLocations.findIndex(x => x === ev.target.value);
      localLocations.splice(index, 1)
      this.setState({
        selectedLocations: localLocations,
      }, () => {
        changeUrlParam('locations', this.state.selectedLocations.toString());
        this.callBasicApi();
      })

    }
  }


  sendJobsFilterProps = (data) => {
    if (!data) {
      this.props.jobsFilter({
        salaryFilter: '',
        eduFilter: '',
        expFilter: '',
        locationFilter: [],
        skillFilter: [],
      })
      this.props.lastJobAlias(this.props.propsApi)
    }
    else {
      this.props.jobsFilter({
        salaryFilter: this.state.salaryFilter,
        eduFilter: this.state.eduFilter,
        expFilter: this.state.expFilter,
        locationFilter: [],
        skillFilter: this.state.skillFilter,
      }
      )
    }

  }

  componentDidUpdate = (props, state) => {
    if (this.props.propsApi !== this.props.lastJobAliasData) {
      this.sendJobsFilterProps(false)
      this.setState({
        fullData: this.props?.dataOwn,
        currentPage: 1,
        filtersList: this.props?.filterOptionsData,
      }, () => {
        this.setPagination();

      })

    }
    else {

    }

    if (this.state.currentPage !== state.currentPage) {
      this.setPagination();

    }

  }



  designationSelection = (ev) => {
   // console.log(idd);
   
    let localDesignation = [...this.state.skillsSelected];
    if (ev.target.checked) {
      localDesignation.push(ev.target.value)
      this.setState({
        skillsSelected: localDesignation,
      }, () => {
        changeUrlParam('skills', this.state.skillsSelected.toString())
        this.callBasicApi()

      })
    }
    else {
      let index = localDesignation.findIndex(x => x === ev.target.value);
      localDesignation.splice(index, 1)
      this.setState({
        skillsSelected: localDesignation,
      }, () => {
        changeUrlParam('skills', this.state.skillsSelected.toString())
        this.callBasicApi()

      })

    }
  }

  openFilter = () => {
    this.setState({
      filterOpen: true,
    })
    document.body.classList.add("modal-open");
  }

  closeFilter = () => {
    this.setState({
      filterOpen: false,
    })
    document.body.classList.remove("modal-open");
  }

  skillApiCall = async (ev) => {
    let val = ev.target.value;
    this.setState({
      skillsValue: val,
      skillAutocompleteList: true,
    })
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      let res = await jobSearchApi(val, this.props?.lastJobAliasData);
      if (res.data.status === 200) {
        this.setState({
          skillsArray: res.data.data.skills
        })
      }
    }, 1);
  }

  setSkillFuncc = val =>{
    //console.log(val);
    // alert(val);
    
     this.setState({
        skillsSelected: val,
        skillsValue: '',
        //skillAutocompleteList: false,
      }, () => {
        this.callBasicApi()
        //changeUrlParam('skills', this.state.skillsSelected.toString())
      })
  }

  setSkillFunc = val => {
    //alert(val);
    let localSelected = [...this.state.skillsSelected]
    let currentVal = localSelected.find(x => x === val)
    // changeUrlParam('skills', 'abcd, cde') 
    if (!currentVal) {
      localSelected.push(val);
      this.setState({
        skillsSelected: localSelected,
        skillsValue: '',
        skillAutocompleteList: false,
      }, () => {
        this.callBasicApi()
        changeUrlParam('skills', this.state.skillsSelected.toString())
      })
      // setSkillSeleceted(localSelected);
      // setskillsValue('');
    }
  }

  handleSkillsDeleteNew = val => {
    let localSelected = [...this.state.skillsSelected]
    let currentIndex = localSelected.findIndex(x => x === val);
    if (currentIndex >= 0) {
      localSelected.splice(currentIndex, 1)
      this.setState({
        skillsSelected: localSelected,
      }, () => {
        changeUrlParam('skills', this.state.skillsSelected.toString())
        this.callBasicApi()
      })

    }
  }

 
  locationApiCall = async (ev) => {

    let val = ev.target.value;
    this.setState({
      locationsValue: val,
    })
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      let res = await locationSearchApi(val, this.props?.lastJobAliasData);
      if (res.data.status === 200) {
        this.setState({
          locationArray: res.data.data.locations
        })
      }
    }, 1);
    

  }

  setLocationsFunc = val => {

    let localSelected = [...this.state.selectedLocations]
    let currentVal = localSelected.find(x => x === val)
    if (!currentVal) {
      localSelected.push(val);
      this.setState({
        selectedLocations: localSelected,
        locationsValue: '',
      }, () => {
        changeUrlParam('locations', this.state.selectedLocations.toString())

        this.callBasicApi()
      })
      // setSkillSeleceted(localSelected);
      // setskillsValue('');
    }
  }

  handlelocationDelete = val => {
    let localSelected = [...this.state.selectedLocations]
    let currentIndex = localSelected.findIndex(x => x === val);
    if (currentIndex >= 0) {
      localSelected.splice(currentIndex, 1)
      this.setState({
        selectedLocations: localSelected,
      }, () => {
        changeUrlParam('locations', this.state.selectedLocations.toString())
        this.callBasicApi()
      })

    }
  }


  render() {

    const { filtersList } = this.state;


    return (

      <div className="container home">



        <div className="row">
          <div className="col-sm-4">
            <div className={`filter profile modal ${this.state.filterOpen ? 'show' : ''}`} id="filter" tabIndex={-1} role="dialog" aria-labelledby="filter" aria-hidden="true">
              <button type="button" className="close  d-block d-sm-none" onClick={this.closeFilter}>
                <span aria-hidden="true">×</span>
              </button>

              <div className="filter-card profile">
                <h3>Job Role</h3>
    <input type="checkbox" id="Machine-Operator" checked={this.state.skillsSelected.findIndex(x => x === 'Machine-Operator') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Machine-Operator"/>
    <label htmlFor="Machine-Operator">Machine Operator</label>
    <input type="checkbox" id="Engineer" checked={this.state.skillsSelected.findIndex(x => x === 'Engineer') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Engineer"/>
    <label htmlFor="Engineer">Engineer</label>
  
    <input type="checkbox" id="Electrician" checked={this.state.skillsSelected.findIndex(x => x === 'Electrician') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Electrician"/>
    <label htmlFor="Electrician">Electrician</label>
    <input type="checkbox" id="Painterpolisher" checked={this.state.skillsSelected.findIndex(x => x === 'Painter/polisher') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Painter/polisher"/>
    <label htmlFor="Painterpolisher">Painter/polisher</label>
    <input type="checkbox" id="Carpenter" checked={this.state.skillsSelected.findIndex(x => x === 'Carpenter') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Carpenter"/>
    <label htmlFor="Carpenter">Carpenter</label>
    <input type="checkbox" id="Plumber" checked={this.state.skillsSelected.findIndex(x => x === 'Plumber') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Plumber"/>
    <label htmlFor="Plumber">Plumber</label>
    <input type="checkbox" id="Tailor" checked={this.state.skillsSelected.findIndex(x => x === 'Tailor') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Tailor"/>
    <label htmlFor="Tailor">Tailor</label>
  
    <input type="checkbox" id="Quality-Control" checked={this.state.skillsSelected.findIndex(x => x === 'Quality-Control') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Quality Control"/>
    <label htmlFor="Quality-Control">  Quality Control</label>

 
    <input type="checkbox" id="Assembler" checked={this.state.skillsSelected.findIndex(x => x === 'Assembler') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Assembler"/>
    <label htmlFor="Assembler">Assembler</label>
  
    <input type="checkbox" id="Welder" checked={this.state.skillsSelected.findIndex(x => x === 'Welder') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Welder"/>
    <label htmlFor="Welder">Welder</label>
 
    <input type="checkbox" id="Factory-Superivisor" checked={this.state.skillsSelected.findIndex(x => x === 'Factory-Superivisor') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Factory Superivisor"/>
    <label htmlFor="Factory-Superivisor">Factory Superivisor</label>
  
    <input type="checkbox" id="Factory-workers" checked={this.state.skillsSelected.findIndex(x => x === 'Factory-workers') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Factory workers"/>
    <label htmlFor="Factory-workers">Factory workers</label>
    <input type="checkbox" id="Delivery" checked={this.state.skillsSelected.findIndex(x => x === 'Delivery') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Delivery"/>
    <label htmlFor="Delivery">Delivery</label>
 
    <input type="checkbox" id="Fabricator" checked={this.state.skillsSelected.findIndex(x => x === 'Fabricator') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Fabricator"/>
    <label htmlFor="Fabricator">Fabricator</label>

    <input type="checkbox" id="Technician" checked={this.state.skillsSelected.findIndex(x => x === 'Technician') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Technician"/>
    <label htmlFor="Technician">Technician</label>

    <input type="checkbox" id="Foreman" checked={this.state.skillsSelected.findIndex(x => x === 'Foreman') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Foreman"/>
    <label htmlFor="Foreman">Foreman</label>
  
  
    <input type="checkbox" id="Moulder " checked={this.state.skillsSelected.findIndex(x => x === 'Moulder') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Moulder"/>
    <label htmlFor="Moulder ">Moulder </label>
  
    <input type="checkbox" id="Helper" checked={this.state.skillsSelected.findIndex(x => x === 'Helper') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Helper/मजदूर"/>
    <label htmlFor="Helper">Helper/मजदूर</label>  
  
    <input type="checkbox" id="Dying Operator" checked={this.state.skillsSelected.findIndex(x => x === 'Dying Operator') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Dying Operator"/>
    <label htmlFor="Dying Operator">Dying Operator</label>
  
  
    <input type="checkbox" id="Maintenance" checked={this.state.skillsSelected.findIndex(x => x === 'Maintenance') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Maintenance"/>
    <label htmlFor="Maintenance">Maintenance</label>
  
    <input type="checkbox" id="Production" checked={this.state.skillsSelected.findIndex(x => x === 'Production') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Production"/>
    <label htmlFor="Production">Production</label>
  
  
    <input type="checkbox" id="Mechanic" checked={this.state.skillsSelected.findIndex(x => x === 'Mechanic') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)} name="role" value="Mechanic"/>
    <label htmlFor="Mechanic">Mechanic </label>
  
    <input type="checkbox" id="Turner" checked={this.state.skillsSelected.findIndex(x => x === 'Turner') > -1 ? true : false} 
    onChange={(ev) => this.designationSelection(ev)}   name="role" value="Turner" />
    <label htmlFor="Turner">Turner</label> 
              </div>

              {
                /* filtersList?.salaryFilter &&
                <div className="filter-card">
                  <h3>Salary </h3>

                  {filtersList?.salaryFilter?.multiple_select ? "multi" :
                    filtersList?.salaryFilter?.data?.length > 0 && filtersList?.salaryFilter?.data.map((data, index) => (
                      <React.Fragment key={index}>
                        <input type="checkbox" checked={this.props.jobsFilterOwn.salaryFilter === data.value} id={data.value} name='salaryFilter'
                          onChange={(ev) => this.filterDataApi(ev)} value={data.value} />
                        <label htmlFor={data.value}>{data.text}</label>
                      </React.Fragment>
                    ))
                  }

                </div>
                */
              }

              {filtersList?.locationFilter &&
                <div className="filter-card location-wrapper">
                  <h3>{filtersList?.locationFilter?.locationText ? filtersList?.locationFilter?.locationText : "Location"}</h3>
    

                  {/* <div className="clearfix " />
                  <div className="pt-2">
                    <a className="more-link cursor" onClick={() => this.setState({
                      moreLocation: !this.state.moreLocation
                    })}>
                      Find {!this.state.moreLocation ? "More" : "Less"} <i className="fa fa-angle-double-right" />
                    </a>
                  </div> */}
                  
                  <div>
                    {this.state.moreLocation && this.state?.topLocations.length > 0 && this.state?.topLocations.map((data, index) => (
                      <div className="d-inline-block" key={index}>
                        <input type="checkbox" checked={this.state.topSelectedLocations.findIndex(x => x === data.location) > -1 ? true : false} id={data} name='locationFilter' value={data.location}
                          onChange={(ev) => this.topLocationSelection(ev)} />
                        <label htmlFor={data.location}>{data.location}</label>
                      </div>
                    ))}
                  </div>
                  <div className="form-group clearfix text-left mb-2">
                    {/* filtersList?.locationFilter?.localityText ? filtersList?.locationFilter?.localityText : "Locality" */}
                    <div>
                      <div className="own-auto-complete locality-autocomplete own-autocomplete">
                        {!this.state.locationsValue &&
                        <p className="place-holder-text">{filtersList?.localityFilter?.locationText ? filtersList?.locationFilter?.locationText : "Choose Location.."}</p>}
                        <Autocomplete
                          inputProps={{ id: 'states-autocomplete' }}
                          wrapperStyle={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}
                          value={this.state.locationsValue}
                          items={this.state.locationArray}
                          getItemValue={(item) => item.location}
                          onSelect={value => this.setLocationsFunc(value)}
                          shouldItemRender={(item, value) => item?.location?.toLowerCase().indexOf(value.toLowerCase()) > -1}
                          onChange={(e) =>
                            this.locationApiCall(e)
                          }
                          renderItem={(item, highlighted) =>
                            <div className={'list-wrapper'}
                              key={item._id}
                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                              {item.location}
                            </div>
                          }
                          menuStyle={{ position: 'absolute', fontSize: '1rem', top: '45px', left: 0, right: 0 }}

                        />
                      </div>
                      {this.state.selectedLocations.length > 0 &&
                        <div className="locality-tag-wrapper mb-0 skills-tag-wrapper">
                          <ul className="list-unstyled tag-list">
                            {this.state.selectedLocations.map((data, index) => (
                              <li key={index}>
                                <span className="list-txt"> {data}<span className="cross-wrapper cursor" onClick={() => this.handlelocationDelete(data)}>×</span></span>
                              </li>
                            ))}

                          </ul>
                        </div>
                      }
                    </div>
                    {this.state?.topLocations?.length > 0 && this.state?.topLocations.map((data, index) => (

                    <React.Fragment key={index}>
                      <input type="checkbox" checked={this.state.selectedLocations.findIndex(x => x === data.location) > -1 ? true : false} id={data.location} name='locationFilter'
                        onChange={(ev) => this.topLocationSelection(ev)} value={data.location} />
                      <label htmlFor={data.location}>{data.location}</label>
                    </React.Fragment>
                  ))}
                  </div>

                </div>
              }
              {
                /* filtersList?.experienceFilter &&
                <div className="filter-card">
                  <h3>Experience</h3>

                  {filtersList?.experienceFilter?.multiple_select ? "multi" :


                    filtersList?.experienceFilter?.data?.length > 0 && filtersList?.experienceFilter?.data.map((data, index) => (
                      <div className="d-inline-block" key={index}>
                        <input type="checkbox" checked={this.props.jobsFilterOwn.expFilter === data.value} id={data.value} className="button" name='expFilter'
                          onChange={(ev) => this.filterDataApi(ev)} value={data.value} />
                        <label htmlFor={data.value}>{data.text}</label>
                      </div>
                    ))
                  }

                </div>

              */ }

              {/* filtersList?.educationFilter &&
                <div className="filter-card">
                  <h3>Education</h3>

                  {filtersList?.educationFilter?.multiple_select ? "multi" :


                    filtersList?.educationFilter?.data?.length > 0 && filtersList?.educationFilter?.data.map((data, index) => (
                      <div className="d-inline-block" key={index}>
                        <input type="checkbox" checked={this.props.jobsFilterOwn.eduFilter === data.value} id={data.value} className="button" name='eduFilter' defaultValue={data.value}
                          onChange={(ev) => this.filterDataApi(ev)} />
                        <label htmlFor={data.value}>{data.text}</label>
                      </div>
                    ))
                  }

                </div>
             */ }
            </div>
          </div>
          <div className="col-sm-8">
            <h1 className="text-center job-header">{this.props?.heading}</h1>
            <div className="latest-jobs latest-jobs1 latj">
              <div className="input-group">

                <div className="own-auto-complete skill-autocomplete own-autocomplete">
                  {!this.state.skillsValue &&
                    <p className="place-holder-text">Search Jobs</p>}
                  <OutsideClickHandler
                    onOutsideClick={() => {

                      this.setState({
                        skillAutocompleteList: false
                      })
                    }}
                  >
                    <OwnAutoComplete
                      onChange={(e) =>
                        this.skillApiCall(e)}

                      value={this.state.skillsValue}
                      items={this.state.skillsArray}
                      onSelect={this.setSkillFunc}
                      renderItem={this.state.skillAutocompleteList}
                      renderValue={'name'}

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
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>
                        {item.name}
                      </div>
                    }
                  /> */}
                </div>


                {/* <div className="own-tag-wrapper no-tags skills-autocomlete"> */}

                {/* {this.state?.skillsArray?.length > 0 &&
                    <ReactTags
                      minQueryLength={1}
                      tags={this.state.selectedLocalities}
                      suggestions={this.state.skillsArray}
                      handleDelete={this.handleSkillsDelete}
                      handleAddition={this.handleSkillsAddition}
                      allowDragDrop={false}
                      autofocus={false}
                      placeholder={"Search Jobs"}
                    />} */}
                {/* </div> */}


                {/* <div className="input-group-append">
                  <button className="btn btn-secondary latest-jobs-search" type="button">
                    <i className="fa fa-search" />
                  </button>
                </div> */}
              </div>
              {/* this.state.skillsSelected.length > 0 &&
                <div className="locality-tag-wrapper skills-tag-wrapper">
                  <ul className="list-unstyled tag-list">
                    {this.state.skillsSelected.map((data, index) => (
                      <li key={index}>
                        <span className="list-txt"> {data}<span className="cross-wrapper cursor" onClick={() => this.handleSkillsDeleteNew(data)}>×</span></span>
                      </li>
                    ))}

                  </ul>
                </div>
                */
              }
              {/* {this.state.skillsSelected.length > 0 &&
                <div className="locality-tag-wrapper skills-tag-wrapper">
                  <ul className="list-unstyled tag-list">
                    {this.state.skillsSelected.map((data, index) => (
                      <li key={index}>
                        <span className="list-txt"> {data.text}<span className="cross-wrapper cursor" onClick={() => this.handleSkillsDelete(data)}>×</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              } */}
              <div className="citypage profile" style={{display:'none'}}>
                {this.state?.designationArray?.length > 0 && this.state?.designationArray.map((data, index) => (
                  // index < 10 &&
                  <React.Fragment key={index}>
                    <input type="checkbox" checked={this.state.skillsSelected.findIndex(x => x === data.name) > -1 ? true : false} id={data.name} name='designationFilter'
                      onChange={(ev) => this.designationSelection(ev)} value={data.name} />
                    <label htmlFor={data.name}>{data.name}</label>
                  </React.Fragment>
                ))}
                {/* <div className="clearfix" />
                <div className="pt-2">
                  <a className="more-link" onClick={() => this.setState({
                    moreDesignation: !this.state.moreDesignation
                  })}>
                    Find {!this.state.moreDesignation ? "More" : "Less"} <i className="fa fa-angle-double-right" />
                  </a>
                </div> */}

                {this.state.moreDesignation &&
                  <div>
                    {this.state?.designationArray.length > 0 && this.state?.designationArray.map((data, index) => (
                      index > 9 && index < 20 &&
                      <React.Fragment key={index}>
                        <input type="checkbox" checked={this.state.skillsSelected.findIndex(x => x === data.name) > -1 ? true : false} id={data.name} name='designationFilter'
                          onChange={(ev) => this.designationSelection(ev)} value={data.name} />
                        <label htmlFor={data.name}>{data.name}</label>
                      </React.Fragment>
                    ))}

                  </div>
                }
              </div>


              <div className="filter-pop pt-3 d-block d-sm-none">
                <a className="filter-pop" onClick={this.openFilter}><i className="fa fa-filter" /> Filter</a></div>

              {this.state.filteredData?.length > 0 && this.state.filteredData.map((job, index) => (
                <a   target="_BLANK" href={`/${job.alias}`} key={job._id}>

                  <article>
                    <h3 >{job.name} <b className="d-none">in {job.location}</b><span className="alert alert-info" style={{display:'none'}}><i className="fa fa-asl-interpreting" /> job opening</span><span className="alert alert-primary"> {job.timePosted} </span> {job?.paidJob == 1 && <span className="alert alert-warning"><i className="fa fa-bell-o"></i> Hot</span>}</h3>
                    <div className="company-name">{job.companyName}</div>
                    <div className="sub-text">
                      <span className="post-date" style={{display:'none'}}><i className="fa fa-calendar" /> {job.timePosted}</span><span className="post-date" style={{display:'none'}}><i className="fa fa-eye" /> {job.applications} views</span>
                      <span><i className="fa fa-briefcase" /> {job.experienceRange}</span> <span><i className="fa fa-inr" />{job.salaryRange}</span>
                      <span><i className="fa fa-map-marker" />{job.location}</span> <br />
                    </div>
                    <div className="social-share">
                      <div className="social">
                        <WhatsappShareButton
                          url={`${this.state.origin}/${job.alias}`}
                          title={job.name}
                          separator=":: "
                        // className="d-block"
                        >
                          <a href="#" id="share-wa" className="sharer button">Share <i className="fa fa-whatsapp" /></a>
                        </WhatsappShareButton>
                      </div>
                    </div>
{/*
                    <Link href="/latest-jobs" >
                      <a className="viewdeatails bg-green"><i className="fa fa-check" /> Apply Now</a>
                    </Link> */}

                    
                    <a   target="_BLANK" href={`${job.alias}`}>
                      <a className="viewdeatails"><i className="fa fa-laptop" /> View Job</a>
                    </a>
                  </article>
                </a>
              ))}

              {this.state.filteredData?.length === 0 &&
                <h3 className="py-4">No Data found</h3>
              }

              {/* <article>
                <h3>Factory Labour <span className="alert alert-info"><i className="fa fa-asl-interpreting" /> job opening</span> <span className="alert alert-warning"><i className="fa fa-bell-o" /> Hot</span></h3>
                <div className="company-name">Swadeshi Cables</div>
                <div className="sub-text">
                  <span className="post-date"><i className="fa fa-calendar" /> 2 days ago</span><span className="post-date"><i className="fa fa-users" /> 102 post</span><br />
                  <span><i className="fa fa-briefcase" /> 0 - 2  Yrs</span> <span><i className="fa fa-inr" />8000-12000 PM.</span> 
                  <span><i className="fa  fa-map-marker" />Delhi (Narela Industrial Estate)</span> <br />
                </div>
                <div className="social-share">
                  <div className="social">
                    <a href="#" id="share-wa" className="sharer button">Share <i className="fa fa-whatsapp" /></a>
                  </div>
                </div>  
                <a href="#" className="viewdeatails"><i className="fa fa-laptop" /> View Job</a> 
              </article>
               */}

    
              {this.state.pageList?.length > 0 &&
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center"> 
                  {this.state.pageList.map((data, index) => (
                  <li className={`page-item ${this.state.currentPage === data ? 'active' : ''}`} key={index} onClick={() => this.setFilteredData(data)}
                  ><span className="page-link">{data}</span></li>
                  ))}
                  <li className={`page-item ${this.state.currentPage >= this.state.totalPaginationPage ? 'disabled' : ''}`} onClick={() => this.setFilteredData(this.state.currentPage + 1)}>
                  <span className="page-link" >Next</span>
                  </li>
                  </ul>
                </nav>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  jobsFilterOwn: state.product.jobsFilterOwn,
  lastJobAliasData: state.product.lastJobAliasData,
})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
  globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
  jobsFilter: (data) => dispatch(jobsFilter(data)),
  lastJobAlias: (data) => dispatch(lastJobAlias(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(JobListing));


