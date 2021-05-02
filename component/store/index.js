import {createStore, combineReducers,applyMiddleware} from "redux";
import commonReducer from '../reducer/commonReducer';
import ReduxThunk from "redux-thunk";

import productReducer from '../reducer/productReducer';


let reducer =combineReducers({
    product:productReducer,
    common: commonReducer,
});

//  const makeStore = createStore(reducer)



// const makeStore = (initialState, options) => {
// return createStore(reducer, initialState, applyMiddleware(ReduxThunk));
// };

// export default makeStore
export const initialStateBlank = {
    common:{
        loader:false
    }
  };

  // export const initializeStore = createStore(reducer)

  export function initializeStore(initialState) {
    return createStore(reducer, initialState, applyMiddleware(ReduxThunk));
  }