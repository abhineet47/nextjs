
import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';

const AboutUs = (props) => {


      return (
  
        <div className="container-fluid abaut">
          <h1 className="text-center text-info">About Us</h1>
          <div className="card">
            <img className="card-img-top" src="/assets/img/about-banner6.jpg" alt="Card image cap" />
            <div className="card-body">
              <h3 className="text-center text-info">Hire Now with theincircle.com</h3>
              <div className="row text-center">
                <div className="col-sm-2">
                  <div className="alert bg-primary text-white">
                    Machine Operators  
                  </div>  
                </div>  
                <div className="col-sm-2">     
                  <div className="alert bg-secondary text-white">                                                                       
                    Welders 
                  </div>    
                </div>  
                <div className="col-sm-2">    
                  <div className="alert bg-success text-white"> 
                    Helpers
                  </div>  
                </div>  
                <div className="col-sm-2"> 
                  <div className="alert bg-danger text-white">    
                    Tailors
                  </div> 
                </div> 
                <div className="col-sm-2">  
                  <div className="alert bg-warning text-white">   
                    Plumber
                  </div>
                </div>  
                <div className="col-sm-2">   
                  <div className="alert bg-info text-white">  
                    AC Mechanic
                  </div>
                </div>
              </div>
              <p>Theincircle.com is an <a href="//www.theincircle.com">Online Job Portal Website</a> involved in offering job opportunities in Industrial area, Factories, Manufacturing, Production, Automobile, Textile, Logistics and other Sectors. Different types of jobs that you can avail for include- Machine Operators, Welders, Fitter, ITI Technician Factory Workers, Supervisors, Industrial Operator, Helpers, Tailors, Field Boy, Peon, Maid, Plumber, Mechanic, Electricians, Labors and Construction Supervisors and so on. Apart from this, you can also seek grey 
                &amp; white collar jobs that include- Digital Marketing, Software Development, Telecaller, Sales , Marketing BPO Profile, Emergency Medical Services Personnel, School Administrators, Cook Chefs, Skilled trades People ,Back office, Stenographers, Teachers and TypistsTheincircle.com is an Online Job Portal Website involved in offering job opportunities in Industrial area, Factories, Manufacturing, Production, Automobile, Textile, Logistics and other Sectors. Different types of jobs that you can avail for include- Machine Operators, Welders, Fitter, ITI Technician Factory Workers, Supervisors, Industrial Operator, Helpers, Tailors, Field Boy, Peon, Maid, Plumber, Mechanic, Electricians, Labors and Construction Supervisors and so on. Apart from this, you can also seek grey &amp; white collar jobs that include- Digital Marketing, Software Development, Telecaller, Sales , Marketing BPO Profile, Emergency Medical Services Personnel, School Administrators, Cook Chefs, Skilled trades People ,Back office, Stenographers, Teachers and Typists
</p>
              <p>Theincircle.com strives to bring job seekers and employers together and help them in attaining the right job and the right employee respectively.  It acts as a one-stop platform for employers to hire the best-suited candidates for their company based on their education, work experience, and other accomplishments. The employers get to choose from a pool of potential job candidates that consists of mainly grey-collar workers.
              </p>
              <p>Theincircle suggests appropriate candidates to the employers based on the requirements mentioned by both parties. Still, it would be advisable for both parties to obtain complete information about each other before getting into a work contract. 
              </p>
              <p>Our motive is to help more and more people in getting their desired job and the recruiter in making the right selection for the vacant position.</p>
              <p>
                Employers are always on the lookout for prospective candidates, make sure you are worth hiring for.
              </p>
            </div>
            <img className="card-img-bottom" src="/assets/img/about-banner7.jpg" alt="Card image cap" />
          </div>
          <br /><br />
          <div className="alert alert-primary text-center">
            <strong>Job Search and Recruitment Process</strong>
          </div>
          <h5 className="text-info">To get your desired job, here are the steps that you need to follow:</h5>
          <p>अपनी योग्यता अनुसार नौकरी के आवेदन के लिए दिए गए निर्देशों का पालन करे-</p>
          <ul>
            <li className>
              <div className="alert alert-danger">
                दिए गए वेबसाइट लिंक पर जाये - <a target="_blank" href="https://www.theincircle.com/">https://www.theincircle.com</a>
              </div>
            </li>
            <li className>
              <div className="alert alert-warning">
                अपनी योग्यता अनुसार नौकरी ढूंढने के लिए दिए गए खाली स्थान में अपनी योग्यता के बारे में लिखे|
              </div>
            </li>
            <li className>
              <div className="alert alert-danger">
                उसके साथ में दिए गए खाली स्थान में अपनी जगह का नाम डाले| 
              </div>
            </li>
            <li className>
              <div className="alert alert-warning">
                वेबसाइट पर पार्श्वचित्र बनाकर भी आप नौकरी के लिए आवेदन कर सकते हैं|
              </div>
            </li>
            <li className>
              <div className="alert alert-danger">
                होमपेज पर दिए गए कॉर्पोरेट सेक्टर्स के द्वारा भी आप उपयुक्त नौकरी की तलाश कर सकते है|
              </div>
            </li>
          </ul>
          <br /><br />
          <h3 className="text-center text-info">Jobs available at Theincircle.com</h3>
          <div className="jobs-area-link row">
            <div className="col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/inst.png" /></span>Manufacturing
                </a>
                <ul>
                  <li><a href="#"> Manufacturing jobs are for those who are into creating new products be it directly or using components. These vacancies are available in a mill, plant, or factory and include chemicals, textiles, machines, etc.</a></li>
                </ul>
              </div>
            </div>
            <div className=" col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/production.png" /></span>Production</a>
                <ul>
                  <li> <a href="#">Production is a vast sector where you can avail of manufacturing-related jobs but it is not just about creating new products. If you are experienced enough, you can even get the role of production manager.
                    </a></li>
                </ul>
              </div>
            </div>
            <div className=" col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/tech.png" /></span>Technician</a>
                <ul>
                  <li><a href="#">If you are from the Technician field, you can look for positions as Lab technician, AC technician, Mobile technician, and so on. There are many technician jobs in different fields that require some specific skills.
                    </a></li>
                </ul>
              </div>
            </div>
            <div className=" col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/labour.png" /></span>Labor jobs</a>
                <ul>
                  <li> <a href="#">There are many jobs available for laborers in various fields such as Factory Labour, Construction Labour, Unskilled labor jobs,. You can look for jobs as per your location.
                    </a></li>
                </ul>
              </div>
            </div>
            <div className=" col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/5.png" /></span>Cook/Chef</a>
                <ul>
                  <li><a href="#">There are vacancies for chefs and cooks as well who have experience in different types of cooking such as Chinese, Indian, Italian. You can select a restaurant near your location.
                    </a></li>
                </ul>
              </div>
            </div>
            <div className=" col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/construction.png" /></span>Construction</a>
                <ul>
                  <li><a href="#">There are vacancies for a Construction site supervisor, civil foreman, civil supervisor, site store in charge, storekeeper, planning and billing supervisor, construction inspector, estimator, and so on.
                    </a></li>
                </ul>
              </div>
            </div>
            <div className=" col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/delevery-boy.png" /></span>Delivery Workers:</a>
                <ul>
                  <li><a href="#">There are so many vacancies for Delivery workers who have experience in delivering products from one location to another.
                    </a></li>
                </ul>
              </div>
            </div>
            <div className=" col-sm-3">
              <div className="skill-pannel">
                <a href="#"><span><img src="/assets/img/maintenance.png" /></span>Maintenance</a>
                <ul>
                  <li> <a href="#">There are several vacancies in the maintenance department as well and you can apply for the post of a mechanical maintenance engineer, carpenter, maintenance technician, and others.
                    </a></li>
                </ul>
              </div>
            </div>
          </div>
          <br /><br />
          <h3 className="text-info">The following features make Theincircle.com stand apart as a job portal:</h3>
          <div className="about-list">
            <ul>
              <li>
                The incircle.com doesn’t ask for registration charges and the job seekers can get registered for free of cost.
              </li>
              <li>Job seekers are provided the right opportunities that match their capabilities and skills.
                We offer a one-stop platform for both employees and employers so that they easily meet their demand and supply easily. 
                Job seekers can look for the job using the desired skill sets from your location.
              </li><li>Employers, on the other hand, can easily find the required workers from the different categories available. From welders, peons, engineers, AC mechanics, maids, content writer to android developer, office peon, and field boy, the employers can explore the various categories of employees.
              </li><li>Employees have been classified into categories to make it easy for employers to make the right selection.
                Our main motive is to find out the right talent for the respective industries and ease the hiring process for the employers. 
              </li><li>We work to simplify the recruitment process, speed up the things, and offer stress-free ways to hire the right employees.
              </li><li>For beginners, we offer step-by-step guidance and help them evaluate their skills and find the right jobs for themselves. Educated people can easily find job opportunities for them however it becomes difficult for the uneducated ones who have no knowledge about where to apply for the right job. 
              </li><li>With the help of theincircle.com job portal, thousands of candidates have got placements in the right company.
              </li><li>One of the highlighting features of Theincircle.com is to lend a helping hand to the unprivileged section of the society, people who are uneducated but have the right skill, we help them to reach out to the available and suitable job opportunities. The uneducated category of workers is given complete guidance to register themselves at the portal and start looking for vacancies on the basis of their skills.
              </li><li>We also offer multilingual web pages so that you can easily register and complete the job application on the basis of your geographical location.</li>
            </ul>
          </div>
          <br /><br />
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);