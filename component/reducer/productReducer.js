import {LAST_JOBS_ALIAS,MOBILE_NUMBER,APPLY_JOBS_LINK, 
CURRICULUM_DATA_CURRENT,CURRENT_YEAR_RANGE, CURRENT_CASE_STUDY,
ACTIVE_FIRST_STEP, JOBS_FILTER, EXP_FILTER,} from '../types/types'
const INITIAL_STATE ={
    currentJobData:null,
    classId:null,
    classType:null,
    calanderId:null,
    curriculumDataProps:null,
    currentCurriculum:null,
    currentYearRange:null,
    currentCaseStudy:null,
    activeFirstStep:false,
    lastJobAliasData:null,
    jobsFilterOwn:{
        salaryFilter:'',
        eduFilter:'',
        expFilter:'',
        locationFilter:[],
        skillFilter:[],

    }, 
    applyLink:null, 
    mobileNumber:null,   
    expFilterArray:[],   
    }
    
    export default function (state=INITIAL_STATE, action){
       
        
        switch (action.type){ 
            
            case JOBS_FILTER:{ 
                               
                return{
                    ...state,
                    jobsFilterOwn:{...action.payload},
                };
            }

            case LAST_JOBS_ALIAS:{
                return{
                    ...state,
                    lastJobAliasData:action.payload,
                };
            }
            case CURRENT_YEAR_RANGE:{
                return{
                    ...state,
                    currentYearRange:action.payload,
                };
            }
            case CURRENT_CASE_STUDY:{
                return{
                    ...state,
                    currentCaseStudy:{...action.payload},
                };
            }

            case CURRICULUM_DATA_CURRENT:{
                return{
                    ...state,
                    currentCurriculum:{...action.payload},
                };
            }
            case APPLY_JOBS_LINK:{ 
                               
                return{
                    ...state,
                    applyLink:action.payload
                };
            }
            case ACTIVE_FIRST_STEP:{ 
                               
                return{
                    ...state,
                    activeFirstStep:action.payload
                };
            }
            case MOBILE_NUMBER:{ 
                               
                return{
                    ...state,
                    mobileNumber:action.payload
                };
            }

            case EXP_FILTER:{
                return{
                    ...state,
                    expFilterArray:[...action.payload]
                };
            }

            
            
            
            default:
            return state
        }
    
    
    }