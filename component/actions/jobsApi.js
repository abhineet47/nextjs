import { PHP_APP_URL, MAIN_URL, MOBILE_NUMBER, SELECTED_LANGUAGE, LANGUAGE_ARRAY, CURRICULUM_DATA_CURRENT,
    APPLY_JOBS_LINK,LAST_JOBS_ALIAS , JOBS_FILTER, PWA_ACTIVE, OPEN_DASHBOARD} from '../types/types';
import Axios from 'axios';
import {postRequest, getRequest} from '../types/AxiosUtil';


export const jobsListingApi =async(obj)=>{
    return await postRequest(`${MAIN_URL}/jobs/jobs-listing`, obj) 

    return Axios.post(`${MAIN_URL}/jobs/jobs-listing`,obj).then(x=>{
        return x
     }).catch(err=>{
         return err
     })

}



export const socialLoginApi =async(obj)=>{
    return await postRequest(`${MAIN_URL}/auth/social-login`, obj) 

    return Axios.post(`${MAIN_URL}/jobs/jobs-listing`,obj).then(x=>{
        return x
     }).catch(err=>{
         return err
     })

}

export const sentSocialSentOtp =async (obj, header)=>{
    return Axios.post(`${MAIN_URL}/auth/mobile-send-otp`,obj, {
        headers:header
    }).then(x=>{
        return x
     }).catch(err=>{
         return err
     })
}

export const verifySocialSentOtp =async (obj, header)=>{
    return Axios.post(`${MAIN_URL}/auth/mobile-verify-otp`,obj, {
        headers:header
    }).then(x=>{
        return x
     }).catch(err=>{
         return err
     })
}

export const jobSearchApi =async(val, alias=null)=>{
    return await getRequest(`${MAIN_URL}/api/search-skills?skill=${val}&fromAlias=${alias}`) 
}

export const searchProfileApi =async(val, alias=null)=>{
    return await getRequest(`${MAIN_URL}/api/profile-list?profile=${val}&fromAlias=${alias}`) 

}
export const searchIndustryProfileApi =async(val, alias=null)=>{
    return await getRequest(`${MAIN_URL}/api/industry-profile?profile=${val}&fromAlias=${alias}`) 

}
export const userDashboardJobsApi =async(val, alias=null)=>{
    return await getRequest(`${MAIN_URL}/jobs/user-jobs-dashboard`) 

}


export const userProfileApiMain = async ()=>{
    return await getRequest(`${MAIN_URL}/user/employee-profile`)
}

export const relatedSkillsApi =async(val)=>{
   
    return await getRequest(`${MAIN_URL}/api/skill-suggestions?profile=${val}`)  

}

export const locationSearchApi =async(val, alias=null)=>{

    return await getRequest(`${MAIN_URL}/api/search-locations?location=${val}&fromAlias=${alias}`) 

}

export const getExperianceApi =async(val)=>{
    return await getRequest(`${MAIN_URL}/api/experiences-filters`) 

}

export const sendOtpApi =async(obj)=>{
    return await postRequest(`${MAIN_URL}/auth/send-otp`, obj) 

}

export const jobListingNewApi =async(obj)=>{

    return await postRequest(`${MAIN_URL}/jobs/jobs-listing-new`, obj); 

}

export const verifyOtpApi =async(obj)=>{
    return await postRequest(`${MAIN_URL}/auth/verify-otp`, obj) 

}

export const profileUpdateApi =async(obj, header)=>{
    return await postRequest(`${MAIN_URL}/user/create-profile`, obj) 

}

export const getUserProfileApi =async(header)=>{  
    return await getRequest(`${MAIN_URL}/user/my-profile`) 
  

}

export const applyJobApi =async(obj)=>{  
    return await postRequest(`${MAIN_URL}/jobs/apply-job`, obj) 

}

export const getJobApi =async(header)=>{   
    return await getRequest(`${MAIN_URL}/user/create-profile`) 
}

export const getContentApi =async(header)=>{   
    return await getRequest(`${MAIN_URL}/content/site`) 
}

export const getLocalitiesApi =async(val)=>{
    return await getRequest(`${MAIN_URL}/api/fetch-localities?city=${val}`) 

}

export const getCourseApi =async (val)=>{
    return await getRequest(`${MAIN_URL}/api/fetch-courses?qualification=${val}`) 

}

export const postUserProfileApi =async(obj)=>{  
    return await postRequest(`${MAIN_URL}/user/employee-profile`, obj) 

}
export const getLanguageApi =async()=>{
    return await getRequest(`${MAIN_URL}/api/langauge-options`) 

}

export const postCallApi =async(obj)=>{

    return await postRequest(`${MAIN_URL}/api/apply-via-call`, obj)

}

export const postLoginCustomApi =async (obj)=>{
    return Axios.post(`${PHP_APP_URL}/api/newapi/login`, obj).then(x=>{
       
            return x
         }).catch(err=>{
             return err
         })
}

export const sendNotificationDetailsApi =async(obj)=>{
    return await postRequest(`${MAIN_URL}/api/save-fcm-token`, obj) 
}


export const signupAlertApi =async(obj)=>{
    return await postRequest(`${MAIN_URL}/api/signup-alerts`, obj) 
}

export const jobsFilter = (data) => {
    return {
        type: JOBS_FILTER,
        payload: data
    }
}

export const lastJobAlias = (data) => {
    return {
        type: LAST_JOBS_ALIAS,
        payload: data
    }
}
export const applyJobLink = (data) => {
    return {
        type: APPLY_JOBS_LINK,
        payload: data
    }
}
export const setMobileFunc = (data) => {
    return {
        type: MOBILE_NUMBER,
        payload: data
    }
}

export const languageArrayFunc = (data) => {
    return {
        type: LANGUAGE_ARRAY,
        payload: data
    }
}

export const slectedLanguageFunc = (data) => {
    return {
        type: SELECTED_LANGUAGE,
        payload: data
    }
}
export const pwaActiveFunc = (data) => {
    return {
        type: PWA_ACTIVE,
        payload: data
    }
}

export const openDashboardFunc = (data) => {
    return {
        type: OPEN_DASHBOARD,
        payload: data
    }
}
export const getUserAppliedJobs = async ()=>{
    return await getRequest(`${MAIN_URL}/user/applied-jobs`)
}

export const getTopJobCity =async()=>{   
    return await getRequest(`${MAIN_URL}/api/job-top-city`) 
}

export const getJobCity =async()=>{   
    return await getRequest(`${MAIN_URL}/api/all-job-city`) 
}

export const getJobState =async()=>{   
    return await getRequest(`${MAIN_URL}/api/all-job-states`) 
}

// For Call now Register User
export const callNowJobApi =async(obj)=>{  
    return await postRequest(`${MAIN_URL}/auth/job-send-otp`, obj)

}

// For Call now OTP User
export const jobVerifyOtpApi =async(obj)=>{  
    return await postRequest(`${MAIN_URL}/auth/job-verify-otp`, obj)
}

export const citySearchApi =async(_city, _location=null)=>{
    return await getRequest(`${MAIN_URL}/api/fetch-localities?city=${_city}&location=${_location}`) 
}

export const applyAutoLogin =async(obj)=>{
    return await postRequest(`${MAIN_URL}/auth/apply-auto-login`, obj) 
}

export const jobDesignation =async()=>{
    return await getRequest(`${MAIN_URL}/sitemap/jobByDesignation.json`) 

}
export const jobByname =async(skil)=>{
    return await getRequest(`${MAIN_URL}/api/all-skills?skill=${skil}`) 

}