import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert, validEmail } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { PHP_APP_URL, salaryArray } from '../types/types';
import { jobsListingApi, jobsFilter,setMobileFunc, lastJobAlias, getLocalitiesApi, searchProfileApi, profileUpdateApi, jobSearchApi, searchIndustryProfileApi,relatedSkillsApi, postLoginCustomApi } from '../actions/jobsApi';
import { WithContext as ReactTags } from 'react-tag-input';
import { withCookies, Cookies } from 'react-cookie';
import { Modal } from 'react-responsive-modal';
import ReactAutocomplete from 'react-autocomplete';
import $ from 'jquery';
import Router from 'next/router';
import Autocomplete from 'react-autocomplete';

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
let timeout;

class CreateProfileComp extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            emptyName: false,
            profile: [],
            emptyProfile: false,
            email: '',
            emptyEmail: false,
            invalidEmail: false,
            gender: '',
            emptyGender: false,
            city: '',
            emptyCity: false,
            locality: [],
            emptyLocality: false,
            localityId: '',
            skills: [],
            emptySkills: false,
            education: '',
            emptyEducation: false,
            experiance: '',
            emptyExperiance: false,
            salary: '',
            emptySalary: false,
            oldProfile: [],
            newProfile: [],
            Newprofiles: [],
            skillsss: [],
            profileSuggestions: [],
            open: false,
            value: '',
            cityName: '',
            courseArr: [],
            courseId: '',
            emptyCourse: false,
            newSkills: [],
            oldSkills: [],
            profileValue: '',
            profileSelected: '',
            newProfileChecked: false,
            skillsSelected: [],
            skillsValue: '',
            skillsArray: [],
            newProfileValue: '',
            ref: null,
            cityNameOnly: '',
            localitySelected: '',
        }

        this.myDiv = React.createRef();
    }


    componentDidMount = () => {
        const { cookies } = this.props;
        this.myDiv.refs.input.addEventListener('keydown', this.handleKey);

        let localProfile = this.props.dataOwn?.skillSet?.map(x => {
            return {
                id: x._id, text: x.name
            }
        })

        this.setState({
            profileSuggestions: localProfile
        })
    }


    changeVal = (ev) => {

        if (ev.target.name === "newProfileValue") {
            relatedSkillsApi(ev.target.value).then((res) => {
                if (res?.data?.status === 200) {
                    let localProfile = res?.data?.data?.skills?.map(x => {
                        return {
                            id: x._id, text: x.name
                        }
                    })

                    this.setState({
                        profileSuggestions: localProfile
                    })

                }

            }).catch((err) => {
                console.log(err)
            })
            this.setState({
                [ev.target.name]: ev.target.value,
            })
        }
        if (ev.target.name === "education") {
            let courseInner = this.props?.dataOwn?.qualifications.find(x => x._id === ev.target.value);
            let courseInnerArr = courseInner.courses;
            this.setState({
                [ev.target.name]: ev.target.value,
                courseArr: courseInnerArr,
                courseId: '',
            })

        }
        else if (ev.target.name === "salary") {
            const re = /^[0-9\b]+$/;

            // if value is not blank, then test the regex

            if (ev.target.value === '' || re.test(ev.target.value)) {
                this.setState({
                    [ev.target.name]: ev.target.value,
                })
            }
        }
        else {
            this.setState({
                [ev.target.name]: ev.target.value,
            })
        }

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleDelete = (i) => {
        $('#profile').find('input').removeClass('disable-own');
        this.setState({
            oldProfile: [],
            profile: [],
            newProfile: [],
        })
    }

    handleAddition = (tag) => {
        let findEle = this.props.dataOwn?.skillSet.find(x => x._id === tag.id);
        let localArray = [];
        localArray.push(tag)
        if (findEle) {
            this.setState({
                oldProfile: localArray,
                profile: localArray
            })
            $('#profile').find('input').addClass('disable-own');
        }
        else {
           
        }


    }

Capitalize(str){
return str.charAt(0).toUpperCase() + str.slice(1);
}

    handleChange = async (e) => {
    this.setState({ cityName: e.target.value });
    var abc = this.Capitalize(e.target.value);
    let value = abc;
    if (e.target.value) {
            let cityId = this.props.dataOwn?.locations.find(x => x.location === abc);
            value = cityId._id;
            console.log(cityId);
        }
         if (!e.target.value) {
            this.setState({
                cityName: ''
            })
        }

         if (value) {
            let cityName = this.props.dataOwn?.locations.find(x => x._id === abc);
            if (cityName) {
                this.setState({
                    cityNameOnly: cityName.location
                })
            }

        }

        if (value !== this.state.city) {
            this.setState({
                city: value,
                localityId: '',
            }, async () => {
                let obj = this.props.dataOwn?.locations.find(x => x._id === this.state.city);
                this.props.handleLoader(true)
                let res = await getLocalitiesApi(obj.location);
                if (res?.data?.status === 200) {
                    this.handleLocalityDelete()
                    this.setState({
                        locality: [...res.data.data.locations],
                    })
                    if (name) {
                        this.setState({
                            cityName: abc,
                            open: false,
                            cityNameOnly: abc,
                        })
                    }

                }

                else {
                    this.props.globalAlert('error', res.data.message)
                }
                this.props.handleLoader(false);
            })


        }
    }

   

    selectCity = async (val, name = null) => {
        let value = val;

        if (name) {
            let cityId = this.props.dataOwn?.locations.find(x => x.location === val);
            console.log(val);
            value = cityId._id;
        }
        if (!name) {
            this.setState({
                cityName: ''
            })
        }

        if (value) {
            let cityName = this.props.dataOwn?.locations.find(x => x._id === val);
            if (cityName) {
                this.setState({
                    cityNameOnly: cityName.location
                })
            }

        }

        if (value !== this.state.city) {
            this.setState({
                city: value,
                localityId: '',
            }, async () => {
                let obj = this.props.dataOwn?.locations.find(x => x._id === this.state.city);
                this.props.handleLoader(true)
                let res = await getLocalitiesApi(obj.location);
                if (res?.data?.status === 200) {
                    this.handleLocalityDelete()
                    this.setState({
                        locality: [...res.data.data.locations],
                    })
                    if (name) {
                        this.setState({
                            cityName: val,
                            open: false,
                            cityNameOnly: val,
                        })
                    }

                }

                else {
                    this.props.globalAlert('error', res.data.message)
                }
                this.props.handleLoader(false);
            })


        }


    }

    skills = (ev) => {
        let localSkills = [...this.state.skillsSelected];
        if (ev.target.checked) {
            localSkills.push(ev.target.value);
            this.setState({
                skillsSelected: localSkills,
            })
        }
        else {
            let index = localSkills.findIndex(x => x === ev.target.value);
            if (index > -1) {
                localSkills.splice(index, 1)
                this.setState({
                    skillsSelected: localSkills,

                })
            }
        }
    }

    handleSkillsDelete = (i) => {
        const { skills } = this.state;

        let findEle = this.state.profileSuggestions.findIndex(x => x.text === skills[i].text);
        if (findEle >= 0) {
            let localOldtag = [...this.state.oldSkills];
            let newFindEle = localOldtag.findIndex(x => x === skills[i].text);
            localOldtag.splice(newFindEle, 1)
            this.setState({
                oldSkills: localOldtag
            })
        }
        else {
            let findEle = this.state.newSkills.findIndex(x => x === skills[i].text);
            let localNewtag = [...this.state.newSkills];
            localNewtag.splice(findEle, 1)
            this.setState({
                newSkills: localNewtag
            })
        }

        this.setState({
            skills: skills.filter((skill, index) => index !== i),
        });

    }

    handleSkillsAddition = (tag) => {
        let findEle = this.state.profileSuggestions.find(x => x.text === tag.text);
        let localArray = [];
        localArray.push(tag.id)
        if (findEle) {
            this.setState({
                oldSkills: [...this.state.oldSkills, localArray]
            })
        }
        else {
            this.setState({
                newSkills: [...this.state.newSkills, localArray]
            })
        }
        this.setState(state => ({ skills: [...state.skills, tag] }));
    }

    formSubmit = async (ev) => {
        ev.preventDefault();
        let valid = await this.formValidation();
        if (valid) {
            this.props.handleLoader(true)
            if (this.props?.cookies?.cookies?.authtoken && this.props?.cookies?.cookies?.userId) {
                let header = {
                    userid: this.props?.cookies?.cookies?.userId,
                    jwt: this.props?.cookies?.cookies?.authtoken
                }
                let localSalaryExpect = salaryArray.find(x => x.label === this.state.salary);
                let obj = {
                    email: this.state.email,
                    name: this.state.name,
                    gender: this.state.gender,
                    location: this.state.city,
                    qualification: this.state.education,
                    experience: this.state.experiance,
                    salaryExpectation: localSalaryExpect?.value,
                    newProfile: !this.state.newProfileChecked ? this.state.profileSelected : this.state.newProfileValue,
                    newSkills: this.state.skillsSelected.toString(),
                }

               
                if (this.state.locality.length > 0) {
                    let localityLocalId = this.state.locality.find(x => x.location === this.state.localityId);
                   // obj = { ...obj, location: localityLocalId._id };
                }


                let res = await profileUpdateApi(obj, header);

                if (res.data.status === 200) {
                    const { cookies } = this.props;
                    var now = new Date();
                    var time = now.getTime();
                    var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
                    now.setTime(expireTime);
                    if (res.data?.data?.authToken) {
                        cookies.set('authtoken', res.data?.data?.authToken, { path: '/', expires: now });
                        cookies.set('userId', res.data?.data?.userId, { path: '/', expires: now });
                        cookies.set('profileComplete', res.data.data.profileComplete );
                        await postLoginCustomApi({ token: res.data?.data?.authToken });
                    }
                    else {

                        cookies.set('authtoken', res.data?.data?.refreshToken, { path: '/', expires: now });
                        await postLoginCustomApi({ token: res.data?.data?.refreshToken }); 
                        
                    }
                    
                    this.props.globalAlert('success', res.data.message);
                   


                    if (this.props.applyLink && this.props?.cookies?.cookies?.authtoken && this.props?.cookies?.cookies?.userId) {
                        Router.push('/job-detail/[index]', `/${this.props.applyLink}`)
                    }
                    else {
                         this.props.handleLoader(true)
                        // window.location.href = (`${PHP_APP_URL}/employee/profile`);
                        Router.push('/user/dashboard');
                        
                    }
                }
                else {
                    this.props.handleLoader(false)
                    this.props.globalAlert('error', res.data.message)
                }
            }
        }
        else {

            let ele = $('.error-wrapper span').first();
            let parent = $(ele).parents('.form-group')[0].clientHeight;;
            let eleHeight = ele[0].clientHeight;

            $('html, body').animate({
                scrollTop: ($('.error-wrapper span').first().offset().top - (parent + eleHeight))
            }, 500);
        }
    }

    formValidation = async () => {
        this.setState({
            invalidEmail: false,
            emptySalary: false,
        })
        let valid = true;
        if (this.state.newProfileChecked) {
            if (!this.state.newProfileValue) {
                valid = false;
                this.setState({
                    emptyProfile: true
                })
            }
        }
        else {
            if (!this.state.profileSelected) {
                valid = false;
                this.setState({
                    emptyProfile: true
                })
            }
        }


        if (!this.state.name) {
            valid = false;
            this.setState({
                emptyName: true
            })
        }
        if (!this.state.email) {
         
        }
        else {
            let emailValid = await validEmail(this.state.email)
            if (!emailValid) {
                valid = false;
                this.setState({
                    invalidEmail: true,
                })
            }
        }
        if (!this.state.gender) {
            valid = false;
            this.setState({
                emptyGender: true
            })
        }

        if (!this.state.city) {
            valid = false;
            this.setState({
                emptyCity: true
            })
        }
        else {
            if (this.state.locality.length > 0 && !this.state.localityId) {
                valid = true;
                this.setState({
                    emptyLocality: true
                })
            }
        }

        if (this.state.skillsSelected.length < 1) {
            valid = true;
            this.setState({
                emptySkills: true
            })
        }

        if (!this.state.education) {
            valid = false;
            this.setState({
                emptyEducation: true
            })
        }
        if (!this.state.experiance) {
            valid = false;
            this.setState({
                emptyExperiance: true
            })
        }
        if (this.state.experiance && this.state.experiance != 0) {
            if (!this.state.salary) {
                valid = false;
                this.setState({
                    emptySalary: true
                })
            }

        }

        if (this.state.salary) {
            let ele = salaryArray.find(x => x.label === this.state.salary);
            if (!ele) {
                valid = false;
                this.setState({
                    salary: ''
                })

                if (this.state.experiance && this.state.experiance != 0) {
                    this.setState({
                        emptySalary: true,

                    })
                }
            }
        }

        return valid

    }

     profileApiCall_l = async (ev) => {
        let val = ev.target.value;
        this.setState({
            skillsValue: val,
        })
        this.setState({
            profileValue: val,
        })

        if(val){
         let res = await searchIndustryProfileApi(val);
           if (res.data.status === 200) {
                this.setState({
                    profile: res.data.data.profiles
                })
            }
        }
        }

    profileApiCall = async (ev) => {
        let val = ev.target.value;
        this.setState({
            profileValue: val,
        })
        
        
        let ress = await relatedSkillsApi(val);
     
            if (ress.data.status === 200) {
                this.setState({
                    //skillsss: ress.data.data.skills
                })
            }
            let res = await jobSearchApi(val);
            if (res.data.status === 200) {
                this.setState({
                    profile: res.data.data.skills
                })
            }
             
       
    }
searchProfileApiCall = async (e) => {
        let val = e.currentTarget.dataset.id;
        this.setState({ showStore: true });
        this.setState({ showStoree: true });
        this.setState({
        newProfileValue: val,
        newProfileChecked:true,
         })
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            let res = await searchProfileApi(val);
            if (res.data.status === 200) {
                this.setState({
                Newprofiles : res.data.data.profiles
                })  
            }
        }, 1);
    }


    setProfileFunc = val => {
        let localSelected = this.state.oldProfile;
        if (localSelected.length < 1) {
            let localArray = []
            localArray.push(val);
            localSelected.push(val);
            relatedSkillsApi(val).then((res) => {
                if (res.data.status === 200) {
                    let localProfile = res?.data?.data?.skills?.map(x => {
                        return {
                            id: x._id, text: x.name
                        }
                    })
                    this.setState({
                        profileSuggestions: localProfile
                    })
                    this.setState({
                    skillsss: res.data.data.skills,

                })    
                }
            }).catch((err) => {
                console.log(err)
            })
            this.setState({
                oldProfile: localArray,
                profileValue: '',
                profileSelected: val,
            }, () => {
                $('.profile-autocomplete').addClass('selected')
            })
           
        }
    }


    handleSkillsDeleteNew = val => {
       // alert(val);
        let localSelected = [...this.state.skillsSelected]
        let currentIndex = localSelected.findIndex(x => x === val);
        if (currentIndex >= 0) {
            localSelected.splice(currentIndex, 1)
            this.setState({
                skillsSelected: localSelected,
                //skillsss: [],

            })

        }
    }

    handleProfileDelete = () => {
        this.setState({
            profileSelected: '',
            oldProfile: [],

        }, () => {
            $('.profile-autocomplete').removeClass('selected')

        })
        this.setState({
                skillsSelected: [],
                skillsss: [],
            }) 
    }
    handleOtherProfile = () => {
       this.setState({ showForm: true,
       showStore: false ,
       showStoree:true,
       showOtheroption: true  });
    document.documentElement.scrollTop = document.getElementById("profilecreation").offsetTop;
    }
    handleShowform = (e) => {
       this.setState({ showForm: true ,
        showStore: false ,
    showOtheroption: false});
       if(e.currentTarget.dataset.id)
       {let val = e.currentTarget.dataset.id;
       let localSelected = [val];
       this.setState({
       skillsSelected: localSelected,
       })
       }
       //this.state.skillsValue
    }

    newProfileCheckedFunc = () => {
        this.setState({
            newProfileChecked: !this.state.newProfileChecked,
            oldProfile: [],
            profileValue: '',
            profileSelected: '',
        }, () => {
            $('.profile-autocomplete').removeClass('selected')

        })
    }
handleSkillsSelections = async (data) => {
    this.setState({showcrosss:true,}, () => {
            $('.data').addClass('selected')

        }
        )
}
    skillApiCall = async (ev) => {
        let val = ev.target.value;
        this.setState({
            skillsValue: val,
           
        })
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            let res = await jobSearchApi(val);
            if (res.data.status === 200) {
                this.setState({
                    skillsArray: res.data.data.skills
                })
            }
        }, 1);
    }

    setSkillFunc = val => {
        let localSelected = [...this.state.skillsSelected]
        let currentVal = localSelected.find(x => x === val)
        if (!currentVal) {
            localSelected.push(val);
            this.setState({
                skillsSelected: localSelected,
                skillsValue: '',
            })  
        }
    }

    handleKey = e => {
        let val = e.target.value;
        if (e.keyCode === 13) {
            let alreadyExist = this.state.skillsSelected.find(x => x === val);
            if (this.state.skillsArray.length <= 0 && !alreadyExist && val) {
                e.preventDefault();
                let localSkills = [...this.state.skillsSelected];

                localSkills.push(val);
                this.setState({
                    skillsSelected: localSkills,
                    skillsValue: '',
                })

            }

        }

    }

    localitySelectFunc = (val) => {
        this.setState({
            localitySelected: val,
            localityId: val,
        }, () => {
            $('.locality-autocomplete-secondary').addClass('selected')

        })
    }

    gototop = () => {
        document.documentElement.scrollTop = document.getElementById("profileAnchor").offsetTop;     
    }
    sallarytop = () => {
        document.documentElement.scrollTop = document.getElementById("sallarysection").offsetTop;
    }

    skilltop = () => {
        document.documentElement.scrollTop = document.getElementById("skillsection").offsetTop;
    }
    localitygototop = () => {
        document.documentElement.scrollTop = document.getElementById("localitysection").offsetTop;
    }
    gonameTop() {
        document.documentElement.scrollTop = document.getElementById("GonameTop").offsetTop;
    }
    goGenderTop() {
        document.documentElement.scrollTop = document.getElementById("GoGenderTop").offsetTop;
    }
    gototopCity(){
                document.documentElement.scrollTop = document.getElementById("GototopCity").offsetTop;

    }
    gotopLearning(){
                document.documentElement.scrollTop = document.getElementById("gotopLearning").offsetTop;

    }
     gotopExp(){
                document.documentElement.scrollTop = document.getElementById("gotopExp").offsetTop;

    }
    
    handleLocalityDelete = () => {
        this.setState({
            localitySelected: '',
            localityId: '',
        }, () => {
            $('.locality-autocomplete-secondary').removeClass('selected')

        })
    }

    componentWillUnmount() {
        this.myDiv.refs.input.removeEventListener('keydown', this.handleKey);
    }


    render() {
        const { open, value } = this.state;
        const { Newprofiles } = this.state;
        const { skillsss } = this.state;
        return (
            <>

                <div className="home profile-creation">
                    <div className="container-fluid">
                        <div className="profile w-60">
                            {/* Modal */}
                            <div className="work-skill container" id="skill" style={{display: this.state.showStoree ? 'none' : 'block' }}>
                            
                            <h1>अपना जॉब प्रोफाइल चुने</h1>
                           
                            
                            <ul className="row">
                            <li className="col-sm-6 col-md-6 col-lg-4"  >
                           
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Machine Operator" ><a href="#;"><i className="img-icon"><img src="/assets/images/MachineOperator.jpg" /></i> <span>Machine Operator</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Engineer">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/Engineer.jpg" /></i> <span>Engineer</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Welder">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/welder.jpg" /></i> <span>Welder</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Fitter">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/Fitter.jpg" /></i> <span>Fitter</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Technician">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/Technician.jpg" /></i> <span>Technician</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Assembler">
                            <a href="#;"  ><i className="img-icon"><img src="/assets/images/Assembling.jpg" /></i> <span>Assembler</span>
                            <b className="right-click"><i className="fa fa-chevron-circle-right"></i></b>
                            </a></div>
                            </li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Electrician">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/Electrician.jpg" /></i> <span>Electrician</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Painter">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/Painter.jpg" /></i> <span>Painter/polisher</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Carpenter">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/Carpenter.jpg" /></i> <span>Carpenter</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Plumber"><a href="#;" ><i className="img-icon"><img src="/assets/images/Plumber.jpg" /></i> <span>Plumber</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Tailor"><a href="#;" ><i className="img-icon"><img src="/assets/images/Tailor.jpg" /></i> <span>Tailor</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Foreman"><a href="#;" ><i className="img-icon"><img src="/assets/images/Foreman.jpg" /></i> <span>Foreman</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Moulder"><a href="#;" ><i className="img-icon"><img src="/assets/images/Moulder.jpg" /></i> <span>Moulder</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Fitter"><a href="#;" ><i className="img-icon"><img src="/assets/images/construction.jpg" /></i> <span>Construction</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Quality Inspection"><a href="#;" ><i className="img-icon"><img src="/assets/images/Quality-controller.jpg" /></i> <span>Quality Inspection/QC</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Helper"><a href="#;" ><i className="img-icon"><img src="/assets/images/Helper.jpg" /></i> <span>Helper/मजदूर</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Casting"><a href="#;" ><i className="img-icon"><img src="/assets/images/Casting.jpg" /></i> <span>Casting</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Dying Operator"><a href="#;" ><i className="img-icon"><img src="/assets/images/dyeing-operator.jpg" /></i> <span>Dying Operator</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Maintenance"><a href="#;" ><i className="img-icon"><img src="/assets/images/Maintenance.jpg" /></i> <span>Maintenance</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Production"><a href="#;" ><i className="img-icon"><img src="/assets/images/Production.jpg" /></i> <span>Production</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Mechanic"><a href="#;" ><i className="img-icon"><img src="/assets/images/Mechanic.jpg" /></i> <span> Mechanic</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Turner">
                            <a href="#;" ><i className="img-icon"><img src="/assets/images/Turner.jpg" /></i> <span>Turner</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Forging">
                            <a href="#;"  ><i className="img-icon"><img src="/assets/images/Forging.jpg" /></i> <span>Forging</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Draughtman"><a href="#;" ><i className="img-icon"><img src="/assets/images/Draughtman.jpg" /></i> <span>Draughtman/autocad</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            <li className="col-sm-6 col-md-6 col-lg-4">
                            <div  onClick={this.searchProfileApiCall.bind(this)} data-id="Supervisior"><a href="#;" ><i className="img-icon"><img src="/assets/images/Supervisor.jpg" /></i> <span>Supervisior</span><b className="right-click"><i className="fa fa-chevron-circle-right"></i></b></a>
                            </div></li>
                            </ul>
                            <div className="col-sm-12">
                            <div className="text-center">
                            <button className="btn other-profile" type="button" id="other-profile-check"   onClick={() => this.handleOtherProfile()}>Create Your Job Profile</button>
                            </div>
                            </div>
                            </div>
                            <div id="subprofile" className="container-fluid" style={{display: this.state.showStore ? 'block' : 'none' }}>
                            <button className="btn next_t back_t" type="button" id="other-profile-check" ><span>Back</span> </button>
                            <h1>अपना जॉब प्रोफाइल चुने</h1>
                            <button className="btn next_t" type="button" id="other-profile-check" onClick={this.handleShowform.bind(this)} data-id=''><span>Next</span> </button>
                            <div className="text-center search-auto">

                            <div className="own-auto-complete full-border-radius profile-autocomplete own-autocomplete">
                                          {!this.state.profileValue && !this.state.profileSelected &&
                                                        <p className="place-holder-text atx">Search Your Job Profile </p>}
                                         {this.state.profileSelected &&
                                                        <p className="place-holder-text textt"><span className="profile-selected d-inline-flex">{this.state.profileSelected}<span className="cross-wrapper cursor pl-2" onClick={() => this.handleProfileDelete()}>×</span> </span></p>}

                                            
                                           
                                        <Autocomplete
                                            handleInputClick
                                            ref={el => this.myDiv = el}
                                            inputProps={{ id: 'states-autocomplete', onFocus: this.skilltop }}
                                            wrapperStyle={{ position: 'relative', display: 'block' }}
                                            value={this.state.profileValue}
                                            items={this.state.profile}
                                            getItemValue={(item) => item.name}
                                            onSelect={value => this.setProfileFunc(value)}
                                            shouldItemRender={(item, value) => item?.name?.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                            onChange={(e) =>
                                                this.profileApiCall_l(e)
                                            }
                                            renderItem={(item, highlighted) =>
                                                <div className={'list-wrapper'}
                                                    key={item._id}
                                                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                                                    {item.name}
                                                </div>
                                            }
                                            menuStyle={{ position: 'absolute', fontSize: '1rem', top: '45px', left: 0, right: 0 }}


                                        />
                                    </div>
                            
                            </div>
                            <div className="heading-text">
                            <ul className="row">
                           
                            {Newprofiles.map(Newprofile => <li className="col-sm-4"   onClick={this.handleShowform.bind(this)} data-id={Newprofile.name} ><a href="#" >{Newprofile.name}</a></li>)}
                            
                            </ul>
                            </div>
                            </div>

                            <div id="profilecreation" className="w-60 col-12" style={{display: this.state.showForm ? 'block' : 'none' }}>
                            <div className="profile-d1 container">
                            <h1 className="title-hindi-login text-center">नौकरी के लिए फॉर्म</h1>
                            <form onSubmit={this.formSubmit} className="needs-validation card" noValidate>
                            <div className="form-row" style={{display: this.state.showOtheroption ? 'flex' : 'none' }}>
                                <div className="form-group col-md-6" id="profileAnchor" >
                                    <div className="own-auto-complete full-border-radius profile-autocomplete d-flex flex-wrap locality-autocomplete own-autocomplete">
                                        {this.state.newProfileChecked ?

                                            <input className="new-profile-input w-100" placeholder="क्या काम करते हो" value={this.state.newProfileValue} name="newProfileValue" onChange={this.changeVal} /> :
                                            <>
                                                <div className="w-100">

                                                    {!this.state.profileValue && !this.state.profileSelected &&
                                                        <p className="place-holder-text">क्या काम करते हो </p>}


                                                    {this.state.profileSelected &&
                                                        <p className="place-holder-text texttt"><span className="profile-selected d-inline-flex">{this.state.profileSelected} <span className="cross-wrapper cursor pl-2" onClick={() => this.handleProfileDelete()}>×</span></span> </p>}


                                                    <Autocomplete
                                                        inputProps={{ id: 'states-autocomplete', onFocus: this.gototop }}
                                                        wrapperStyle={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}
                                                        value={this.state.profileValue}
                                                        items={this.state.profile}
                                                        getItemValue={(item) => item.name}
                                                        onSelect={value => this.setProfileFunc(value)}
                                                        shouldItemRender={(item, value) => item?.name?.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                                        onChange={(e) =>
                                                            this.profileApiCall(e)
                                                        }
                                                        renderItem={(item, highlighted) =>
                                                            <div className={'list-wrapper'}
                                                                key={item._id}
                                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                                                                {item.name}
                                                            </div>
                                                        }
                                                        menuStyle={{ position: 'absolute', top: '45px', left: 0, right: 0 }}
                                                    />
                                                </div>
                                            </>}
                                    </div>

                                    <div className="profile-check-box-wrapper" >
                                        <input type="checkbox" value={this.state.newProfileChecked} onChange={this.newProfileCheckedFunc} id="newProfile" />
                                        <label>Other Profile <span className="ulternate">(पद nahi mile toh)</span></label>
                                    </div>

                                    {/* <div className="own-tag-wrapper" id="profile"> */}
                                    {/* {this.state?.profileSuggestions?.length > -1 &&
                                            <ReactTags
                                                minQueryLength={1}
                                                tags={this.state.profile}
                                                suggestions={this.state.profileSuggestions}
                                                handleDelete={this.handleDelete}
                                                handleAddition={this.handleAddition}
                                                // handleInputChange={this.tagChange}
                                                allowDragDrop={false}
                                                autofocus={false}
                                                placeholder={"Enter Profile"}
                                            />} */}
                                    {/* </div> */}
                                    {this.state.newProfileChecked ?
                                        <div className="error-wrapper">

                                            {this.state.emptyProfile && !this.state.newProfileValue && <span >Profle is required</span>}
                                        </div> :
                                        <div className="error-wrapper">

                                            {this.state.emptyProfile && !this.state.profileSelected && <span >Profle is required</span>}
                                        </div>}

                                    {/* <input type="text" className="form-control" id="pwd" placeholder="Enter Profile" name="pswd" required /> */}
                                </div>



                                <div className="form-group col-md-6" id="skillsection">

                                   
                                    <div className="own-auto-complete full-border-radius skill-autocomplete own-autocomplete">
                                   
                                        { !this.state.skillsSelected.length > 0 &&
                                            <p className="place-holder-text">आपका Skill</p>}
                                        <Autocomplete
                                            handleInputClick
                                            ref={el => this.myDiv = el}
                                            inputProps={{ id: 'states-autocomplete', onFocus: this.skilltop }}
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
                                            menuStyle={{ position: 'absolute', fontSize: '1rem', top: '45px', left: 0, right: 0 }}


                                        />
                                    </div>
                                    

                                <div className="locality-tag-wrapperr skills-tag-wrapper text-left" >
                                <ul className="list-unstyled tag-list">
                                {skillsss.map((data, index) => (
                                             index < 8 &&

                                  <div className="d-inline-block position-relative new-custom-checkbox" key={data?._id}>
 <input type="checkbox"  className="button" id={data?._id}  value={data} defaultChecked={this.state.skillsSelected.findIndex(x => x === data.name) > -1 ? true : false} name="skills"></input>
                      <label className="list-txt" htmlFor={data?._id}>{data.name}</label>
                                 
                                  </div>        
                                ))}
                                </ul></div> 


                                    {this.state.skillsSelected.length > 0 &&
                                        <div className="locality-tag-wrapper cust skills-tag-wrapper text-left" >
                                            <ul className="list-unstyled tag-list">
                                                {this.state.skillsSelected.map((data, index) => (
                                                    <li key={index} >
                                                        <span className="list-txt"><span className={data}>{data}</span><span  className="cross-wrapper cursor" onClick={() => this.handleSkillsDeleteNew(data)}>×</span></span>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                    }


                                    <div className="invalid-feedback">Please fill out this field.</div>
                                    <div className="error-wrapper">
                          
                                      
                                    </div>
                                </div>
            
                           
                                </div>
                                <div className="form-row" id="GonameTop">
                                    <div className="form-group col-md-6">   
                                    <input type="text" onFocus={this.gonameTop} className="form-control" id="uname" placeholder="Name (अपना नाम भरें)" name="name" value={this.state.name}
                                        onChange={this.changeVal} />
                                    <div className="error-wrapper">
                                       {this.state.emptyName && !this.state.name && <span >Name is required</span>}
                                    </div>
                                </div>
                                
                                <div className="form-group col-md-6 gender-text" id="GoGenderTop">
                                    Gender <div className="form-check form-check-inline">
                                        <input className="form-check-input" onFocus={this.goGenderTop} checked={this.state.gender === "1"} type="checkbox" value="1" name="gender" onChange={this.changeVal} id="inlineRadio1" />
                                        <label className="form-check-label"  htmlFor="inlineRadio1"><i className="fa fa-male fa-lg" /> Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" onFocus={this.goGenderTop} checked={this.state.gender === "2"} type="checkbox" value="2" name="gender" onChange={this.changeVal} id="inlineRadio2" />
                                        <label className="form-check-label" htmlFor="inlineRadio2"><i className="fa fa-female fa-lg" /> Female</label>
                                    </div>
                                    <div className="error-wrapper">

                                        {this.state.emptyGender && !this.state.gender && <span >Gender is required</span>}
                                    </div>

                                </div>
                                </div>
                                <div className="form-row">
                                <div className="form-group city col-md-6" id="GototopCity">
                                   <div className="citypage">
                                        <div className="city">
                            <div className="input-group">
                              
                                <div className="own-autocomplete">
                                 {!this.state.cityName && !this.state.cityNameSelected &&
                                                        <p className="place-holder-text">शहर का नाम</p>}
                                    <ReactAutocomplete
                                        items={this.props?.dataOwn?.locations}
                                        inputProps={{ onFocus: this.gototopCity }}
                                        shouldItemRender={(item, value) => item.location.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        getItemValue={item => item.location}
                                       

                                        renderItem={(item, highlighted) =>
                                            <div
                                                key={item._id}
                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                                className={'list-wrapper'}
                                            >
                                                {item.location}
                                            </div>
                                        }
                                        value={this.state.cityName}
                                        onChange={this.handleChange}
                                        onSelect={item => this.selectCity(item, true)}
                                        menuStyle={{ position: 'unset', top: '45px', left: 0, right: 0 }}

                                        wrapperStyle={
                                            {
                                                display: 'block',
                                                position: 'relative'
                                            }
                                        }

                                    />
                                </div>
                            </div>

                        </div>

                                    </div>
                                    
                                    <div className="error-wrapper">

                                        {this.state.emptyCity && !this.state.city && <span >City is required</span>}
                                    </div>
                                </div>
                              
                                    <div className="form-group col-md-6 clearfix" id="localitysection">
                                       
                                <div className="input-group ">
                                          
                                            {this.state.locality.length > 0 ?
                                                <div className="own-auto-complete md-own-autocomplete own-autocomplete locality-autocomplete locality-autocomplete-secondary">
                                                    {!this.state.localityId && !this.state.localitySelected &&
                                                        <p className="place-holder-text">मोहल्ले का नाम</p>}
                                                    {this.state.localitySelected && !this.state.localityId &&
                                                        <p className="place-holder-text"><span className="profile-selected d-inline-flex">{this.state.localitySelected} <span className="cross-wrapper cursor pl-2" onClick={() => this.handleLocalityDelete()}>×</span></span></p>}

                                                    <ReactAutocomplete
                                                        items={this.state.locality}
                                                        inputProps={{ onFocus: this.localitygototop }}
                                                        shouldItemRender={(item, value) => item.location.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                                        getItemValue={item => item.location}
                                                        renderItem={(item, highlighted) =>
                                                            <div
                                                                className={'list-wrapper'}
                                                                key={item._id}
                                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                                            >
                                                                {item.location}

                                                            </div>
                                                        }
                                                        value={this.state.localityId}
                                                        onChange={e => this.setState({ localityId: e.target.value })}
                                                        onSelect={localityId => this.localitySelectFunc(localityId)}
                                                        menuStyle={{ position: 'absolute', top: '45px', left: 0, right: 0 }}

                                                        // menuStyle={{
                                                      
                                                        wrapperStyle={
                                                            {
                                                                display: 'block',
                                                                position: 'relative'
                                                            }
                                                        }
                                                    />
                                                </div> :
                                              
                                                <select className="form-control"  id="inputGroupSelect01" >
                                                   
                                                        <option  defaultValue>मोहल्ले का नाम</option>

                                                </select>
                                              }
                                        </div>
                                        <div className="error-wrapper">

                                              </div>
                                    </div>
                                   
                                   
                               
                                <div className="form-group exp-pro col-md-6" id="gotopLearning">
                                <p className="cust_p">कितने पढ़े-लिखे हैं</p>
                                     <hr/>
                                    {this.props?.dataOwn?.qualifications?.length > 0 &&
                                        this.props?.dataOwn?.qualifications.map((data, index) => (
                                            index < 7 &&
                                            <React.Fragment key={index}>
                                                <input type="radio" onFocus={this.gotopLearning} id={data._id} value={data._id} name="education" checked={this.state.education === data._id} onChange={this.changeVal} placeholder="कितने पढ़े-लिखे हैं"/>
                                                <label htmlFor={data._id}>{data.name}</label>
                                            </React.Fragment>
                                        ))}

                                    <div className="error-wrapper">

                                        {this.state.emptyEducation && !this.state.education && <span >Education is required</span>}
                                    </div>

                                </div>
                              
                               

                                <div className="form-group exp exp-pro col-md-6" id="gotopExp">
                                 <p className="cust_p">काम का एक्सपीरियंस हैं</p>
                                     <hr/>

                                    {this.props?.dataOwn?.experiences?.length > 0 &&
                                        this.props?.dataOwn?.experiences.map((data, index) => (
                                             index < 7 &&

                                            <React.Fragment key={index}>
                                                <input type="radio" onFocus={this.gotopExp} id={data.value} value={data.value} name="experiance" checked={this.state.experiance === data.value} onChange={this.changeVal} />
                                                <label htmlFor={data.value}>{data.text}</label>
                                            </React.Fragment>
                                        ))}

                                    <div className="invalid-feedback">Please fill out this field.</div>
                                    <div className="error-wrapper">

                                        {this.state.emptyExperiance && !this.state.experiance && <span >Experiance is required</span>}
                                    </div>
                                </div>
                                </div>
                                <div className="form-row">
                                <div className="col-md-6" id="sallarysection">
                                   

                                    <div className="autocomplete full-border-radius md-own-autocomplete own-autocomplete mb-3" >
                                        {!this.state.salary &&
                                            <p className="place-holder-text">महीने की सैलरी</p>}
                                        <Autocomplete
                                            inputProps={{ id: 'states-autocomplete', onFocus: this.sallarytop }}

                                            wrapperStyle={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}
                                            value={this.state.salary}
                                            items={salaryArray}
                                            getItemValue={(item) => item.label}

                                            shouldItemRender={(item, value) => item?.label?.toLowerCase().indexOf(value.toLowerCase()) > -1}

                                            onChange={(e) => this.setState({ salary: e.target.value })}
                                            onSelect={(val) => this.setState({ salary: val })}
                                            renderItem={(item, highlighted) =>
                                                <div className={'list-wrapper'}
                                                    key={item.label}
                                                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
                                                    {item.label}
                                                </div>
                                            }
                                            menuStyle={{ position: 'absolute', top: '45px', left: 0, right: 0 }}
                                        />

                                        {/* <input type="text" className="form-control" id="myInput" placeholder="Enter expected Salary per Month" /> */}
                                    </div>
                                    {/* <input type="text" value={this.state.salary} className="form-control" id="pwd" placeholder="महीने की सैलरी" name="salary" onChange={this.changeVal} maxLength={12} /> */}
                                    <div className="error-wrapper">

                                        {this.state.emptySalary && !this.state.salary && <span >Salary is required</span>}
                                    </div>
                                </div>
                                <div className="col-md-6" id="sallarysection">
                                <div className="text-center ">
                                    <button type="submit" className="btn-sm other-profile">Ok</button>
                                </div>
                                </div>
                                </div>
                                
                                <br />
                            </form>
                        </div>
                    </div>

                </div>
                </div>
                </div>

                <Modal open={open} showCloseIcon={false} classNames={{ modal: "modal-sm modal-own" }} closeIcon={''} center closeOnOverlayClick={false} onClose={this.onCloseModal}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">City Name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCloseModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group city">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" htmlFor="inputGroupSelect01"><i className="fa fa-search" /></span>
                                </div>
                                <div className="own-autocomplete">
                                    <ReactAutocomplete
                                        items={this.props?.dataOwn?.locations}
                                        shouldItemRender={(item, value) => item.location.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        getItemValue={item => item.location}
                                        renderItem={(item, highlighted) =>
                                            <div
                                                key={item._id}
                                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                                className={'list-wrapper'}
                                            >
                                                {item.location}
                                            </div>
                                        }
                                        value={this.state.cityName}
                                        onChange={e => this.setState({ cityName: e.target.value })}
                                        onSelect={item => this.selectCity(item, true)}
                                        menuStyle={{ position: 'absolute', top: '45px', left: 0, right: 0 }}

                                        // menuStyle={{
                                       
                                        wrapperStyle={
                                            {
                                                display: 'block',
                                                position: 'relative'
                                            }
                                        }

                                    />
                                </div>
                            </div>

                            <p className="list-heading">Select From The List</p>

                            <div className="city-table">
                                <table className="table">
                                    <tbody>


                                        {this.props?.dataOwn?.locations?.length > 0 &&
                                            this.props?.dataOwn?.locations.map(data => (
                                                <tr key={data._id}>
                                                    <td className={`${data._id === this.state.city ? 'selected' : ''}`} onClick={() => this.selectCity(data._id, false)}>{data.location}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.onCloseModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.onCloseModal}>Save changes</button>
                    </div>

                </Modal>


            </>
        )
    }
}

const mapStateToProps = state => ({
    jobsFilterOwn: state.product.jobsFilterOwn,
    lastJobAliasData: state.product.lastJobAliasData,
    applyLink: state.product.applyLink

})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),
    jobsFilter: (data) => dispatch(jobsFilter(data)),
    lastJobAlias: (data) => dispatch(lastJobAlias(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(CreateProfileComp));