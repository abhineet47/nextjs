import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, globalAlert } from '../../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import ProfileFirstSection from '../../component/profile/firstSection';
import ProfileLocation from '../../component/profile/location';
import ProfileSkills from '../../component/profile/skills';
import ProfileIndustry from '../../component/profile/selectIndustry';
import ProfileWorkExperiance from '../../component/profile/workExperiance';
import ProfileEducation from '../../component/profile/education';
import ProfileBasicInfo from '../../component/profile/basicInfo';
import ProfileRightSide from '../../component/profile/rightSide';
import Appliedjobs from '../../component/applied-jobs/applied-jobs';

import { userProfileApiMain, getUserProfileApi, getUserAppliedJobs } from '../../component/actions/jobsApi';
import { MAIN_URL } from '../../component/types/types';
import Axios from 'axios';
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { withCookies, Cookies } from 'react-cookie';
import Link from 'next/link';

const AppliedJobs = (props) => {
    const [apiDetails, setApiDetails] = useState(null)
    const [appliedJobs, setAppliedJobs] = useState(null)
    // this.props.handleLoader(false)
    useEffect(() => {
        props.handleLoader(true)
        basicAuth()
    }, [])

    const getAppliedJobs = async () => {
        props.handleLoader(true)
            let res = await getUserAppliedJobs();
            if (res?.data?.status === 200) {
                if (res?.data?.data?.userAppliedJobs.length>0) {
                    setAppliedJobs(res?.data?.data)
                }
            }
            else {
                props.globalAlert('error', res?.data?.message)
                Router.push('/login')
            }
        props.handleLoader(false)
    }

    const basicAuth = async () => {
        // props.handleLoader(true)
        if (props?.allCookies?.authtoken && props?.allCookies?.userId) {
            let res = await getUserProfileApi();

            if (res?.data?.status === 200) {
                if (res?.data?.data?.profileComplete) {
                    // basicApiCall()
                    getAppliedJobs();

                }
                else {
                    Router.push('/applied-jobs')
                }

            }
            else {
                props.globalAlert('error', res?.data?.message)
                Router.push('/login')
            }
        }
        else {
            Router.push('/login')
        }
    }

    const basicApiCall = async () => {
        props.handleLoader(true)
        let res = await userProfileApiMain();
        if (res.data.status === 200) {
            setApiDetails(res?.data?.data)
            getAppliedJobs();
        }
        else {
            props.globalAlert('error', res.data.message)
        }
        if (sessionStorage.getItem('scrollTo')) {
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: ($(`#${sessionStorage.getItem('scrollTo')}`).first().offset()?.top - 15)
                }, 500);

                sessionStorage.removeItem('scrollTo')
            }, 1);
        }
        props.handleLoader(false)
    }

    function openquicklink() {
        var quicklink = document.getElementById('openmobquicklink');
        quicklink.style.display = 'block';
    }

    function closequikclink() {
        var quicklink = document.getElementById('openmobquicklink');
        quicklink.style.display = 'none';
    }

    return (
        <>
            <Head>
                {ReactHtmlParser(Array.isArray(props?.content?.pageContent?.metaInfo) && props?.content?.pageContent?.metaInfo.reduce((prev, curr) => prev + curr))}

                <link rel="stylesheet" href="/assets/css/employee-profile.css" />
            </Head>
            <Header data={props?.content?.header} />
            {/* <br /> */}
            <div className="container-fluid home employee">
                <div className="row">

                    <div className="col-sm-9">
                        <div className="profile employee-profile-page ">
                            {/*  <h1>&nbsp;<a  id="quicklinks" onClick={openquicklink} className="quicklinks text-right d-block d-sm-none">Quick Links <i className="fa fa-navicon"></i></a></h1> */}

                            <div id="basicInfo">
                                <Appliedjobs appliedJobsData={appliedJobs} dataOwn={apiDetails?.Appliedjobs} />
                            </div>
                            {/* <div className="matching-jobs">Matching Jobs <Link href="/user/dashboard"><a href={void(0)} className='main-color cursor'>View</a></Link> (based on our profile details) <br /><br /></div>
*/}
                        </div>
                    </div>
                    <div className="col-sm-3" id="openmobquicklink" >
                        <button type="button" className="close closequicklik" onClick={closequikclink}>
                            <span aria-hidden="true">×</span>
                        </button>
                        <ProfileRightSide />
                    </div>
                </div>
            </div>
            <Footer data={props?.content?.footer} />
        </>
    )
}


export async function getServerSideProps(context) {

    let header = {}

    let query = context?.req?.headers?.cookie;
    if (query) {
        var langOwn = query.match('(^|;)\\s*' + "langOwn" + '\\s*=\\s*([^;]+)');
        langOwn = langOwn ? langOwn.pop() : '';
        if (langOwn) {
            header.langOwn = langOwn;
        };
        var authtoken = query.match('(^|;)\\s*' + "authtoken" + '\\s*=\\s*([^;]+)');
        authtoken = authtoken ? authtoken.pop() : '';
        if (authtoken) {
            header.jwt = authtoken;
        };
        var userId = query.match('(^|;)\\s*' + "userId" + '\\s*=\\s*([^;]+)');
        userId = userId ? userId.pop() : '';
        if (userId) {
            header.userid = userId;
        };
        var latitude = query.match('(^|;)\\s*' + "latitude" + '\\s*=\\s*([^;]+)');
        latitude = latitude ? latitude.pop() : '';
        if (latitude) {
            header.latitude = latitude;
        };
        var longitude = query.match('(^|;)\\s*' + "longitude" + '\\s*=\\s*([^;]+)');
        longitude = longitude ? longitude.pop() : '';
        if (longitude) {
            header.longitude = longitude;
        };

    }
    const res = await Axios.get(`${MAIN_URL}/content/site`, { headers: header });

    return {
        props: {
            content: res.data?.data,
        }
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    globalAlert: (data, msg) => dispatch(globalAlert(data, msg)),

})


export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AppliedJobs));





