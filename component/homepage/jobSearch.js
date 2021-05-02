import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { globalLoaderFunc } from "../actions/commonActions";
import Link from "next/link";
import { MAIN_URL, PHP_APP_URL } from "../types/types";
import Autocomplete from "react-autocomplete";
import Axios from "axios";
import Router from "next/router";
import OwnAutoComplete from "../../component/_shared/ownAutocomplete";
import OutsideClickHandler from "react-outside-click-handler";

let timeout;
const JobSearch = (props) => {
  
  return (
    <>
  
<main>
<div className="container-fluid bg-banner home-page">
<div className="container">

<h1 className="head_prof  d-none d-sm-block">Job by Profile</h1>
<div className="row">
<div className="col-sm-7 profile-grid   d-none d-sm-block">
<ul className="row ">
<li>
<a href="/jobs/machine-operator-jobs" target="_blank">
<img src="assets/img/images/machine-operator-home.webp" alt="Machine Operator" className="img-fluid" />
<span className="col-12">Machine Operator</span>
</a>
</li>
<li>
<a href="/jobs/engineering-jobs" target="_blank">
<img src="assets/img/images/ingeenier-home.webp" alt="Engineer" className="img-fluid" />
<span className="col-12">Engineer</span>
</a>
</li>
<li>
<a href="/jobs/welder-jobs" target="_blank">
<img src="assets/img/images/welder-home.webp" alt="Welder" className="img-fluid" />
<span className="col-12">Welder</span>
</a>
</li>
<li>
<a href="/jobs/technician-jobs" target="_blank">
<img src="assets/img/images/technician-home.webp" alt="Technician" className="img-fluid" />
<span className="col-12">Technician</span>
</a>
</li>
<li>
<a href="/jobs/assembler-jobs" target="_blank">
<img src="assets/img/images/assembler-home.webp" alt="Assembler" className="img-fluid" />
<span className="col-12">Assembler</span>
</a>
</li>
<li>
<a href="/jobs/electrician-jobs" target="_blank">
<img src="assets/img/images/Electrician-home.webp" alt="Electrician" className="img-fluid" />
<span className="col-12">Electrician</span>
</a>
</li>
<li>
<a href="/jobs/carpenter-jobs" target="_blank">
<img src="assets/img/images/carpenter-home.webp" alt="Carpenter" className="img-fluid" />
<span className="col-12">Carpenter</span>
</a>
</li>
<li>
<a href="/jobs/plumber-jobs" target="_blank">
<img src="assets/img/images/plumber-home.webp" alt="Plumber" className="img-fluid" />
<span className="col-12">Plumber</span>
</a>
</li>
<li>
<a href="/jobs/tailor-jobs" target="_blank">
<img src="assets/img/images/tailor-home.webp" alt="Tailor" className="img-fluid" />
<span className="col-12">Tailor</span>
</a>
</li>
</ul>
</div>
<div className="col-sm-5">
<div className="anchor-banner">
<h2>अपनी आवश्यकता<br />
के अनुसार नौकरी खोजें</h2>
<div className="anchor-button">
<a href="https://www.theincircle.com/login" target="_blank"><span>नौकरी के लिए आवेदन करें <i className="fa fa-long-arrow-right"></i></span></a>
</div>
<img src="assets/img/images/employee.webp" className="img-fluid" />
</div>
</div>
<div className="col-sm-12 profile-grid2">
<h1 className="head_prof  d-md-none d-sm-block">Job by Profile</h1>
<ul className="row">
<li className="d-md-none d-sm-block">
<a href="/machine-operator-jobs" target="_blank">
<img src="assets/img/images/machine-operator-home.webp" alt="Machine Operator" className="img-fluid" />
<span className="col-12">Machine Operator</span>
</a>
</li>
<li className="d-md-none d-sm-block">
<a href="/jobs/engineering-jobs" target="_blank">
<img src="assets/img/images/ingeenier-home.webp" alt="Engineer" className="img-fluid" />
<span className="col-12">Engineer</span>
</a>
</li>
<li className="d-md-none d-sm-block">
<a href="/jobs/technician-jobs" target="_blank">
<img src="assets/img/images/technician-home.webp" alt="Technician" className="img-fluid" />
<span className="col-12">Technician</span>
</a>
</li>
<li className="d-md-none d-sm-block">
<a href="/jobs/assembler-jobs" target="_blank">
<img src="assets/img/images/assembler-home.webp" alt="Assembler" className="img-fluid" />
<span className="col-12">Assembler</span>
</a>
</li>
<li className="d-md-none d-sm-block">
<a href="/jobs/electrician-jobs" target="_blank">
<img src="assets/img/images/Electrician-home.webp" alt="Electrician" className="img-fluid" />
<span className="col-12">Electrician</span>
</a>
</li>
<li className="d-md-none d-sm-block">
<a href="/jobs/carpenter-jobs" target="_blank">
<img src="assets/img/images/carpenter-home.webp" alt="Carpenter" className="img-fluid" />
<span className="col-12">Carpenter</span>
</a>
</li>
<li className="d-md-none d-sm-block">
<a href="/jobs/plumber-jobs" target="_blank">
<img src="assets/img/images/plumber-home.webp" alt="Plumber" className="img-fluid" />
<span className="col-12">Plumber</span>
</a>
</li>
<li className="d-md-none d-sm-block">
<a href="/jobs/tailor-jobs" target="_blank">
<img src="assets/img/images/tailor-home.webp" alt="Tailor" className="img-fluid" />
<span className="col-12">Tailor</span>
</a>
</li>
<li>
<a href="/jobs/helper-jobs" target="_blank">
<img src="assets/img/images/Helper-home.webp" alt="Helper मजदूर" className="img-fluid" />
<span className="col-12">Helper/मजदूर</span>
</a>
</li>
<li >
<a href="/jobs/casting-jobs" target="_blank">
<img src="assets/img/images/Casting-home.webp" alt="Casting" className="img-fluid" />
<span className="col-12">Casting</span>
</a>
</li>
<li >
<a href="/jobs/dying-operator-jobs" target="_blank">
<img src="assets/img/images/DyingOperator-home.webp" alt="Dying Operator" className="img-fluid" />
<span className="col-12">Dying Operator</span>
</a>
</li>
<li>
<a href="/jobs/maintenance-jobs" target="_blank">
<img src="assets/img/images/Maintenance-home.webp" alt="Maintenance" className="img-fluid" />
<span className="col-12">Maintenance</span>
</a>
</li>
<li>
<a href="/jobs/production-jobs" target="_blank">
<img src="assets/img/images/Production-home.webp" alt="Production" className="img-fluid" />
<span className="col-12">Production</span>
</a>
</li>

<li>
<a href="/jobs/mechanic-jobs" target="_blank">
<img src="assets/img/images/Mechanic-home.webp" alt="Mechanic" className="img-fluid" />
<span className="col-12">Mechanic</span>
</a>
</li>
<li>
<a href="/jobs/turner-jobs" target="_blank">
<img src="assets/img/images/Turner-home.webp" alt="Turner" className="img-fluid" />
<span className="col-12">Turner</span>
</a>
</li>
<li>
<a href="/jobs/forging-jobs" target="_blank">
<img src="assets/img/images/Forging-home.webp" alt="Forging" className="img-fluid" />
<span className="col-12">Forging</span>
</a>
</li>
<li>
<a href="/jobs/autocad-jobs" target="_blank">
<img src="assets/img/images/Draughtman-home.webp" alt="Draughtman autocad" className="img-fluid" />
<span className="col-12">Draughtman/autocad</span>
</a>
</li>
<li>
<a href="/jobs/supervisior-jobs" target="_blank">
<img src="assets/img/images/Supervisior-home.webp" className="img-fluid" />
<span className="col-12">Supervisior</span>
</a>
</li>
<li>
<a href="/jobs/fitter-jobs" target="_blank">
<img src="assets/img/images/Fitter-home.webp" alt="Fitter" className="img-fluid" />
<span className="col-12">Fitter</span>
</a>
</li>
<li>
<a href="/jobs/moulder-jobs" target="_blank">
<img src="assets/img/images/Moulder-home.webp" className="img-fluid" />
<span className="col-12">Moulder</span>
</a>
</li>
<li>
<a href="/jobs/painter-jobs" target="_blank">
<img src="assets/img/images/Painter-home.webp" alt="Painter" className="img-fluid" />
<span className="col-12">Painter</span>
</a>
</li>
<li>
<a href="/jobs/construction-jobs" target="_blank">
<img src="assets/img/images/Construction-home.webp" alt="Construction" className="img-fluid" />
<span className="col-12">Construction</span>
</a>
</li>
<li>
<a href="/jobs/quality-home-jobs" target="_blank">
<img src="assets/img/images/Quality-home.webp" className="img-fluid" alt="Quality Check" />
<span className="col-12">Quality Check</span>
</a>
</li>
<li className="d-block d-sm-none">
<a href="/jobs/technician-jobs" target="_blank">
<img src="assets/img/images/iti-technitian-home.webp" alt="ITI Technician" className="img-fluid" />
<span className="col-12">ITI Technician</span>
</a>
</li>
</ul>
<div className="text-right mb-3"><a href="https://www.theincircle.com/jobs-by-designation" target="_blank">View More <i className="fa fa-arrow-right"></i></a></div>
</div>
</div>
</div>
</div>

<section>
<div className="container facts">
<h2>हमारा वादा</h2>

<div className="row">
<div className="col-sm-3">
<img src="assets/img/images/free-job.webp" alt="निःशुल्क नौकरी" /><br />
निःशुल्क नौकरी
</div>

<div className="col-sm-3">
<img src="assets/img/images/no-thekedar.webp" alt="कोई ठेकेदार नहीं" /><br />
कोई ठेकेदार नहीं
</div>
<div className="col-sm-3">
<img src="assets/img/images/no-comission.webp" alt="कोई कमीशन नहीं" /><br />
कोई कमीशन नहीं
</div>
<div className="col-sm-3">
<img src="assets/img/images/naukri-ki-guarantee.webp" alt="नौकरी की गारंटी" /><br />
नौकरी की गारंटी
</div>

</div>

<div className="apply-now bgapply-now">
<div className="apply-text1">अपनी नौकरी का विवरण दर्ज करें और</div>
<div className="text-danger apply-text2">मोबाइल से ऑनलाइन आवेदन जमा करें</div>


<a href="https://www.theincircle.com/login">
Apply&nbsp;Now
</a>
</div>


</div>
</section>




<section>
<div className="container latest-jobs home-page">
<h3>Job in Big Companies</h3>
<div className="row">
<div className="col-sm-6 col-sm-9 job-bnner">
<div className="row">
<div className="col-sm-6">
<article>
<div className="location">
<img src="assets/img/images/marker.png" /><br />
Ghaziabad<br/>
Gender: Any<br/>
<a href="https://www.theincircle.com/job-detail/tig-welder-job-in-meerut-road-industrial-area-ghaziabad-40551">View More <i className="fa fa-angle-double-right"></i></a>
</div>
 <div className="text-danger thecompany"> Hero Motocorp Limited</div>
 <div className="text-secondary thepost">Required: Tig Welder</div>
 <div className="text-primary salary">Salary: 14000-20000 Per Month</div>
  <div className="exp-other-detail text-secondary mt-2">
 <p className="text-secondary">Facilities:<br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Dayshift </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Full Time </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Esi/PF </span><br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Bonus </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Lodge </span> </p></div>
</article>
</div>
<div className="col-sm-6">
<article>
<div className="location">
<img src="assets/img/images/marker.png" /><br />
Coimbatore<br/>
Gender: Male<br/>
<a href="https://www.theincircle.com/job-detail/cnc-machine-operator-job-in-peelamedu-coimbatore-42684">View More <i className="fa fa-angle-double-right"></i></a>
</div>
 <div className="text-danger thecompany">Arumuga hi tech CNC</div>
 <div className="text-secondary thepost">Required: CNC Machine Operator</div>
 <div className="text-primary salary">Salary: 8000-18000 Per Month</div>
  <div className="exp-other-detail text-secondary mt-2">
 <p className="text-secondary">Facilities:<br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Dayshift </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Full Time </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Esi/PF </span><br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Bonus </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Lodge </span> </p></div>
</article></div>
<div className="col-sm-6"><article>
<div className="location">
<img src="assets/img/images/marker.png" /><br />
Indore<br/>
Gender: Male <br/>
<a href="https://www.theincircle.com/job-detail/machine-operator-job-in-ujjain-indore-road-indore-42657">View More <i className="fa fa-angle-double-right"></i></a>
</div>
 <div className="text-danger thecompany"> Reliance Power Plant.</div>
 <div className="text-secondary thepost">Required: Machine Operator</div>
 <div className="text-primary salary">Salary: 14000-38000 Per Month</div>
  <div className="exp-other-detail text-secondary mt-2">
 <p className="text-secondary">Facilities:<br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Dayshift </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Full Time </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Esi/PF </span><br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Bonus </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Lodge </span> </p></div>
</article></div>
<div className="col-sm-6"><article>
<div className="location">
<img src="assets/img/images/marker.png" /><br />
Hyderabad<br/>
Gender: Male <br/>
<a href="https://www.theincircle.com/job-detail/welder-and-fabrication-job-in-begumpet-hyderabad-42493">View More <i className="fa fa-angle-double-right"></i></a>
</div>
 <div className="text-danger thecompany">Kinnerasaani exports and imports pvt ltd</div>
 <div className="text-secondary thepost">Required: Welder And Fabrication</div>
 <div className="text-primary salary">Salary:20000-50000 Per Month</div>
  <div className="exp-other-detail text-secondary mt-2">
 <p className="text-secondary">Facilities:<br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Dayshift </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Full Time </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Esi/PF </span><br/> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Bonus </span> <span className="badge badge-pill badge-danger"><i className="fa fa-check  text-warning"></i> Lodge </span> </p></div>
</article>
</div>
</div>
<div className="text-right mb-3  location-link"><a href="https://www.theincircle.com/latest-jobs" target="_blank">View More <i className="fa fa-arrow-right"></i></a></div>
</div>
<div className="col-6 col-sm-3 see-the-job">
<img src="assets/img/images/see-the-job.webp" />
</div>
</div>
<h3>Job by Location</h3>
<div className="search-by-location">
<a href="/jobs-in-delhi" target="_blank">Delhi</a>
<a href="/jobs-in-mumbai" target="_blank">
Mumbai</a>
<a href="/jobs-in-bangalore" target="_blank">
Bangalore</a>
<a href="/jobs-in-chennai" target="_blank">
Chennai</a>
<a href="/jobs-in-hyderabad" target="_blank">
Hyderabad</a>
<a href="/jobs-in-ahmedabad" target="_blank">  
Ahmedabad</a>
<a href="/jobs-in-kolkata" target="_blank">
Kolkata</a>
<a href="/jobs-in-pune" target="_blank">
Pune</a>
<a href="/jobs-in-lucknow" target="_blank">
Lucknow</a>
<a href="/jobs-in-gurgaon" target="_blank">
Gurgaon</a>
<a href="/jobs-in-noida" target="_blank">
Noida</a>
<a href="/jobs-in-coimbatore" target="_blank">
Coimbatore</a>
<a href="/jobs-in-jaipur" target="_blank">
Jaipur</a>
<a href="/jobs-in-ghaziabad" target="_blank">
Ghaziabad</a>
<a href="/jobs-in-faridabad" target="_blank">
Faridabad</a>
 </div>
 <div className="text-right mb-3  location-link"><a href="https://www.theincircle.com/jobs-by-location" target="_blank">View More <i className="fa fa-arrow-right"></i></a></div>
</div>

</section>


<article>
<div className="testimonial container">
<h3>Testimonials</h3>
<div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
    
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
     <div className="row"> 
    <div className="col-sm-6">
     <iframe width="560" height="315" loading="lazy" src="https://www.youtube.com/embed/vlZlZdpQyF4/" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
      <div className="col-sm-6">
    हेलो, मेरा नाम सूरज है में आईटीआई डिप्लोमा होल्डर मिग वेल्डर हूं मुझे जॉब की जरूरत थी तब ही मेरे दोस्त ने मुझे 
<b><a href="https://www.theincircle.com/"> Theincircle.com </a></b> Jobs के वारे में बताया जहाँ ITI/Diploma और  Manufacturing और  Production workers के लिये ऑनलाइन नौकरी  मिलती है
 फ़िर मैने आपने मोबाइल से चेक किया और ऑनलाइन फॉर्म भरा नि: शुल्क |
 आपनी प्रोफाइल बनाई और वनाने के बाद मुझे मेरे  सम्बंधित मेरे क्षेत्र की नौकरी आगयी
वहां से मैने ऑनलाइन आवेदन  किया और फ़िर हीरो मोटर्स से कॉल आई और इंटरव्यू के बाद मुझे नौकरी मिला गयीं
अब मै बहूत  खुश हूं और  मै चाहूंगा जितने लोग  हैं जो  Manufacturing और  Production workers
फ़ैक्टरी मै  नौकरी डूंड रहे है  ऑनलाइन आवेदन करें और अपने लिये अच्छी नौकरी पाएं
   
   
    </div></div></div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
</div>
</article>
</main>



<div className="container-fluid pro-banner">
<div className="profile-banner container">
<h3>How to Create Profile</h3>
<img src="assets/img/images/create-profile.webp" />
<a href="https://www.theincircle.com/login" className="CreateProfile">Create Profile</a>
</div>
</div>

         
    
    </>
  );
};

const mapStateToProps = (state) => ({
  currentClassData: state.product.currentJobData,
  classId: state.product.classId,
  classType: state.product.classType,
  userProfile: state.common.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  handleLoader: (data) => dispatch(globalLoaderFunc(data)),
  currentClassDetails: (data, classId, classType) =>
    dispatch(currentClassDetails(data, classId, classType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
