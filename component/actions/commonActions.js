import {MAIN_URL, GLOBAL_LOADER, MOBILE_MENU,GLOBAL_ALERT_REMOVE,GLOBAL_ALERT,
GLOBAL_CAREER_ID, EXP_FILTER,USER_PROFILE} from '../types/types';
import Axios from 'axios';
import { initializeStore } from '../store/index'


export const jobRolesApi = async ()=>{
   return Axios.get(`${MAIN_URL}/list/domains/jobroles`).then(data=>{
        return data
    }).catch(err=>{
        return err
    })
}

export const setExpFilter =(data)=>(
    {
         type:EXP_FILTER,
         payload:data,
     }
 )

 export const setUserProfile =(data)=>(
    {
         type:USER_PROFILE,
         payload:data,
     }
 )






export const globalLoaderFunc =(data)=>(
   {
        type:GLOBAL_LOADER,
        payload:data,
    }
)

export const globalMobileMenu =(data)=>(
    {
         type:MOBILE_MENU,
         payload:data,
     }
 )



    export const globalAlert=(alertType, msg)=>{
        return{
            type:GLOBAL_ALERT,
            payload:alertType,
            msg:msg,
        }
    }
    
    export const globalAlertRemove=()=>{
        return{
            type:GLOBAL_ALERT_REMOVE,
            
        }
    }
    export const globalCareerId=(val)=>{
        return{
            type:GLOBAL_CAREER_ID,
            payload:val
            
        }
    }

    export const getCookies =async (name)=>{
        var b = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        if(b){
            return b ? b.pop() : '';

        }
        else{
            return null
        }

        // var i, x, y, ARRcookies = document.cookie.split(";");
        // for (i = 0; i < ARRcookies.length; i++) {
        //     x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        //     y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        //     x = x.replace(/^\s+|\s+$/g, "");
        //     if (x == input) {
        //         return unescape(y);
        //     }
        // }

    //  var nameEQ = name + "=";
	// var ca = document.cookie.split(';');
	// for(var i=0;i < ca.length;i++) {
	// 	var c = ca[i];
	// 	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	// 	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	// }
	// return null;
    }


    export const validEmail = async (value)=>{
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!value.match(mailformat)){
            return false
        }
        else{
            return true
        }
    }


    export const changeUrlParam=(key, value)=> {
        if (history.pushState) {
            let searchParams = new URLSearchParams(window.location.search);
            searchParams.set(key, value);
            let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams;
            window.history.pushState({path: newurl}, '', newurl);
        }
    }
    