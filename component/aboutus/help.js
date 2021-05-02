
import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';

const Help = (props) => {


      return (
  
        <div className="container-fluid abaut">
        <h1 className="text-center text-info">Help</h1>
        
    
    <div className="card">
    
      <div className="card-body">
      
    
    <div className="aboutUsBox prePolicy tnc-page">
                    
    
                    <p>This is to make clear to everyone that theincircle.com is free of viruses or harmful mechanism and there won’t be any harm when the downloading is in progress which may harm the out sources. Company can not be held responsible for any of such incurred cost which you had to pay for any kind of replacement or any other kind of services while accessing the <a href="https://www.theincircle.com/" target="_blank">Online Job Portal</a>.</p>
                    
                    <p>Theincircle do not pledge about the text, software, reliability, completeness, accuracy, graphics and time lapse of the sites. Moreover company can not be held responsible for any representation by the representative of the company or any other person who claims to be the representative whether in written or in oral form then terms and conditions apply to these kinds of representations to the extent mentioned at the site.<br />
        </p> <br />
      <div className="alert alert-warning" ><h5><strong>Provision of Damages</strong></h5></div>
          <p className="alert alert-info">
        The company can not be blamed or held responsible for any kind of damages and not even the company’s web site can be made liable to pay for any kind of loss such as consequential damages, damages arrived from data loss, lost profits or loss arising from business interruption whichever a person may face while using the web site whether included in warranty or not. Company can not be forced to pay for damages which are caused due to any data loss arising due to website or any damage arising from an ability to use the company’s web portal due to negligence or incomplete knowledge of the internet. Damage can be claimed up to the amount of registration fees which is paid by him.
       </p> <br /> 
        <div className="alert alert-warning" ><h5><strong>Indemnity</strong></h5></div>
        <p className="alert alert-info">
        When you access the website, you agree to protect the company, its service providers, affiliates, subsidiaries, officers, agents, successors, assigns, directors and employees and also the attorney fees and legal charges arising by third party and any charges arising from submission, post made available owing to the website. Any breach of your violations of any representation and warranties or your abuse of any kind of right of another.  </p> <br /> 
       <div className="alert alert-warning" ><h5><strong>Security of the product and avoidance of malpractice</strong></h5></div>
         <p className="alert alert-info">
        Theincircle is registered under its trade name and trademark owned by the company and thereby on becoming aware of any such fraudulent and unauthorized similar name web site who tries to recruit in its name on behalf of the company’s name shall stands liable to claim fees from such people.<br />
        <br />
        Theincircle is happy to say that except a contract it has not certified any individual or organization to do any recruitment on behalf of the company. This is to inform general public that there is no other company or sister concern which recruits people on behalf of or other than <a href="https://www.theincircle.com/login" target="_blank">www.theincircle.com.</a> Theincircle plea to the portal users and general public that please do not respond to any mail or trust any other website apart from www.theincircle.com incase of any confusion. Always rely on origin website for their placement and selection procedure.<br />
        <br />
        The website is specially created to meet the requirements of employers and for better placement opportunities of the employees in India and in no way guarantees any employment to the people registering at the web portal. It is just the platform of showcasing or letting the two needful people meet up with their demands and this demands is rightly met by supply of adequate labor force by the site. In the same way it also doesn’t guarantees about the job opportunity or position placed by the employer. Moreover the website can not be held responsible for wages, remuneration, working conditions and salary or any other statement made by the employers. This is advisable to employees to make necessary cross check against all the facts displayed by the employers. They are expected to do proper research before joining any organization or grabbing any employment opportunity.<br />
        <br />
        Last but by no means the least, <a href="https://www.theincircle.com/" target="_blank">Theincircle.com</a> do not cross check the backgrounds of the employees or the people applying for the job and nor of the employers back ground who post job&nbsp; and Find worker opportunity at the web portal. Both are encouraged to cross check the authentification of each others working conditions and wages conditions as against the facts provided by them so that they can establish overall fit and strong work bond between the two parties i.e. employer and employees.</p>
                    
    
                    
                </div>
    
    
    
    
    
    
    
     
             </div>
           </div><br /><br />
        </div> 
    
    
      
       )
}



const mapStateToProps = state => ({
    currentClassData: state.product.currentJobData,
    classId: state.product.classId,
    classType: state.product.classType,
})

const mapDispatchToProps = dispatch => ({
    handleLoader: data => dispatch(globalLoaderFunc(data)),
    currentClassDetails: (data, classId, classType) => dispatch(currentClassDetails(data, classId, classType))
})

export default connect(mapStateToProps, mapDispatchToProps)(Help);