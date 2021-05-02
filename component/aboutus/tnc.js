
import React from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';

const Terms = (props) => {


      return (
  
       
		<div class="container-fluid abaut">
	<h1 class="text-center text-info">Terms Conditions</h1>
	

<div class="card">

  <div class="card-body">
  

<div class="aboutUsBox prePolicy tnc-page">
                <p>This document is in terms of Information Technology Act, 2000 as amended. The website theincircle.com herein after referred to as ‘T.I.C’, is leased to and operated by M/s Tagger Technologies LLP having its registered office at 84, 3<sup>rd</sup> floor, Shyam Lal Road, Daryaganj, New Delhi – 110 002, INDIA.</p>
                
                <p>The use of ‘T I C’ is only when compliance is done by the user in accordance with the terms &amp; conditions mentioned herein. Moreover the use of website itself is clear that the user has agreed to all the terms &amp; conditions including Privacy Policy.</p>
                
                <p>(Minor i.e. below the age of 18 years on the day of use is not allowed to be registered with the T.I.C.</p>
                
                <div class="alert alert-warning" ><h5><strong>CONDITIONS FOR Employers</strong></h5></div>
                <div class="alert alert-info" >
                <p><strong>a.</strong> It is the sole obligation of the employers/users to survey and have a record verification of applicants/jobseekers. ‘T.I.C.’ or M/s Tagger Technologies LLP might not be considered in charge of any false data given by any hopeful in their application.</p>
                
                <p><strong>b.</strong> Having enlisted with the employment entrance does not entitle the user to any rights over ‘T.I.C.’ or M/s Tagger Technologies LLP. Also M/s Tagger Technologies LLP or ‘T.I.C.’ might not be obligated to give the user any sort of administrations as an issue of power.</p>
                
                <p><strong>c</strong>. Any circumstance emerging out of enlisting with the employment entry, be it positive or negative is immaculate incidental and has nothing to do with the enrolment and entryway.</p>

                <p><strong>d.</strong> M/s Tagger Technologies LLP &nbsp;don't arrange meetings of applicants before alluding to you; hence forth it gets to be crucial for the user to go into the details of applicants from the very beginning.</p>

                <p><strong>e.</strong> M/s Tagger Technologies LLP don't canvas or suggest any contender for the employment prerequisite. M/s Tagger Technologies LLP allude them on absolutely justify premise and the individuals who nearly coordinate the employment necessity.</p>

                <p><strong>f.</strong> It is the business' circumspection to contract or not, M /s Tagger Technologies LLP will never propose or prescribe a hopeful but to allude them for benefit of user.</p>

                <p><strong>g.</strong> It is the sole obligation of the business to check the validity of instructive accreditations of their chosen applicants before permitting them to join in.</p>

                <p><strong>h</strong>. If anytime of time it is found that businesses have abused our administrations as an occupation entryway by attracting contender for illicit or unlawful exercises, strict lawful activity will be started according to law of area.</p>

                <p><strong>i.</strong> The employer is to be charged for the use of ‘T.I.C’ as per terms and conditions fixed by M/s Tagger Technologies LLP. The fee so charged&nbsp; by M/s Tagger Technologies LLP shall not be refunded by M/s Tagger Technologies LLP in any circumstances, except for the non operation of the system ‘T.I.C.’. Once the system is connected the fee is neutralised and no claim stand for the user/employer.</p>

                <p>(Resumes are to be treated as preliminary guide and the contents of the resumes and accuracy is to be verified by the users only)</p>
</div>
<div class="alert alert-warning" ><h5><strong>Job Seekers</strong></h5></div>
<div class="alert alert-primary" >
                <p><strong>a.</strong> We publicize occupations that are sent to by individuals. The obligation of possibility to check the validity is on the job seekers.</p>

                <p><strong>b. </strong>Candidates are cautioned against paying any commission or charges for administrations of M/s Tagger Technologies LLP to anyone. The administrations of M/s Tagger Technologies LLP are totally free for individuals and M/s Tagger Technologies LLP don't have any operators in India or abroad.</p>

                <p><strong>c</strong>. Mere enlistment on ‘T.I. C.’ entryway makes or does not ensure applicant a showing and ‘T.I. C.’ or M/s Tagger Technologies LLP should not be in charge of any sort of misdirecting notices from managers.</p>

                <p><strong>d.</strong> The information of the jobseeker should be clear with all the details only then the details are picked by the employers. Candidates are encouraged to transfer photographs for expanding their chances being shortlisted for occupations. In the meantime it is at the sole danger of the contender that the same is not abused by against social components.</p>

                <p><strong>e.</strong> Candidates are cautioned not to enjoy unlawful exercises relating to the employment entry as be as veritable as could be expected under the circumstances as M/s Tagger Technologies LLP keep an eye on the enlisted applicants.</p>

                <p><strong>f.</strong> In instance of any business found to suspicious and corrupt specialists acting like organizations or managers, the same may be suggested through a mail to M/s Tagger Technologies LLP</p>

                <p>Be on record that there can be a change in the terms and conditions at any time without giving any &nbsp;prior notice. The users of the portal are advised to be updated on the issue.</p>
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(Terms);