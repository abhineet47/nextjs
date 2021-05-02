import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';

const PrivacyPolicy = (props) => {


      return (
  
        <div className="home">    
<div className="container about">
    <h1 className="text-center job-header">Privacy Policy</h1>
   <div className="card"><div className="card-body">
       <div className="aboutUsBox prePolicy tnc-page"><p>We, <a href="/">Theincircle.com</a> and/or our related gatherings all around, will regard your web security and individual distinguish and your requirement for extreme insurance and control of individual data that you give us to giving you benefit.</p><p>Utilization of Cookies:Treats by and large track and record you're scanning propensities, snaps, date and time of going to, IP address from where you get to, you're searching history and your OS. This empowers us to keep record of your skimming knowledge and our site visits and keep up our measurements to enhance our administrations with the goal that we can serve you better.</p><p>We may utilize the administrations of specific outsiders for goals past our degree and that advantages our customers. These outsiders by temperance of giving important administrations to you may get to your own data from <a href="/">Theincircle.com</a> which will be controlled and checked by us. We will take all safeguards to guarantee that these outsiders don't abuse your own character accumulated from our site. We do mean or will ever exchange your own data and personality to unapproved persons and take hard and fast endeavors to implement strict protection strategy. On the off chance that at your own data is to be gone to an outsider regarding administrations to be given to you, www.thecircle.com won't do as such without your advanced assent or in highly contrasting, such is the security arrangement of organization.</p><p>According to our protection approach said above, by utilizing our administrations, you consent to security strategies set down on our site and give your agree to <a href="/">Theincircle.com</a> your authorization to utilize your own data for the reason it is planned for.</p><p>We at Theincircle.com guarantee you that your own data with us is secure and won't be imparted to unapproved persons or gatherings. Access to your own data is limited to pariahs aside from representatives who need to get to this data for preparing administrations for your advantages. We limit your own data from devastation or adjustment by unapproved persons.We have made it basic for you to change and redesign your own data every once in a while as may be fundamental for you to take most extreme favorable circumstancesof our administrations. You can make utilization of our area for this reason.Our protection strategy denies us from contact youngsters underneath the age of thirteen for any reason including business advancement and showcasing and so forth.</p><p>On the off chance that at all the need emerges to do as such, it will be with parental assent.We never share or reveal your own data to any outsiders or obscure persons as an issue of strategy. Be that as it may, the same will be imparted to approved Government Agencies if a solicitation for check is gotten at our end. This is with the sole reason to diminish any unlawful exercises or to react to court orders.</p><p>We should impart your own data to our partner organizations or outsider Company who give us administration outsourced by us to them. Furthermore,the data sharing will be appropriately justified according to prerequisite of outsiders to perform the capacity for your advantages.</p><h4 className="text-primary">Our Liability:</h4><p>We claim all authority to change or alter our Privacy Policies whenever with no notification. We may change revise our protection approaches if the need emerges and is considered fit by our directorate and their choice will be last in all matters. Any question if any emerging out of Privacy Policies might be managed through assertion in the neighborhood court of law. We instruct clients and guests with respect to our site to be cautious to "phishing" extortion specialists requesting cash or your financial balance subtle elements. Our supporters are prompted keep away from such advances by corrupt calls or sends as we don't have any specialists or sub workplaces.</p></div></div></div><br /></div>
    

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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);