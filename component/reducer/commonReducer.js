import {
    GLOBAL_LOADER, GLOBAL_ALERT, GLOBAL_ALERT_REMOVE, USER_PROFILE,
    LANGUAGE_ARRAY, SELECTED_LANGUAGE,MOBILE_MENU, PWA_ACTIVE,OPEN_DASHBOARD
} from '../types/types';

const INITIAL_STATE = {
    loader: true,
    alertArray: [],
    alertArrayLength: 0,
    careerId: null,
    languageArray: [],
    selectedLanguage: null,
    mobileMenu:false,
    userProfile:null,
    pwaActive:false,
    openDashboard:false,

}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {

        case GLOBAL_LOADER: {

            return {
                ...state,
                loader: action.payload,
            };
        }
        case GLOBAL_ALERT: {
            let obj = {
                alertType: action.payload,
                alertMessage: action.msg,
            }


            return {
                ...state,
                alertArray: [...state.alertArray, obj],
            };
        }

        case GLOBAL_ALERT_REMOVE: {
            let arr = state.alertArray;
            if (arr.length) state.alertArray.shift()

            return {
                ...state,
                alertArray: [...arr]
            }
        }
        case LANGUAGE_ARRAY: {


            return {
                ...state,
                languageArray: [...action.payload],
            }
        }

        case SELECTED_LANGUAGE: {


            return {
                ...state,
                selectedLanguage: action.payload,
            }
        }

        case MOBILE_MENU: {


            return {
                ...state,
                mobileMenu: action.payload,
            }
        }

        case USER_PROFILE:{
            return {
                ...state,
                userProfile: {...action.payload},
            }
        }

        case PWA_ACTIVE:{
            return{
                ...state,
                pwaActive:action.payload
            }
        }

        case OPEN_DASHBOARD:{
            return{
                ...state,
                openDashboard:action.payload
            }
        }




        default:
            return state
    }


}