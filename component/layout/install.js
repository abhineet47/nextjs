import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {pwaActiveFunc} from '../actions/jobsApi'



const InstallPWA = (props) => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [view, setView] = useState(true);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
      props.pwaActiveFunc(true)
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
      <>
      {view &&
       <div>
              {/* <div className="add-to-home d-block d-sm-none">
        <button type="button"  className="close text-right pr-1 close-add-to-home" onClick={()=>setView(false)}>
          <span aria-hidden="true">×</span>
        </button>
        <div className="add-logo"><a className="hidden-xs hidden-sm" href="#;" title="The incircle" data-toggle="tooltip"><img src="/assets/img/logo.gif" width="80px" alt="logo"/>  TheIncircle.com</a></div>
        <div className="text-center"> <button type="button"  onClick={onClick}  className="btn btn-primary btn-sm">Add to Home <i className="fa fa-plus" /></button></div>
      </div> */}
       <div className="add-to-home" >
        <button type="button" className="close text-right pr-1 close-add-to-home" onClick={()=>{setView(false);props.pwaActiveFunc(false)}}>
          <span aria-hidden="true">×</span>
        </button>
        <div className="text-left"> <a onClick={onClick} className="cursor"><img src="/assets/img/images/add2home.png"/></a></div>
         </div>
              </div>
}
  
    </>
  );
};
const mapStateToProps = state => ({
   
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    pwaActiveFunc: data => dispatch(pwaActiveFunc(data)),
    
    globalAlert: (data,msg) => dispatch(globalAlert(data, msg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InstallPWA);

