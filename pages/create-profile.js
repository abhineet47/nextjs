import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc, getCookies } from '../component/actions/commonActions';
import Router from 'next/router'
import Head from 'next/head';
import Header from '../component/header/header'
import Footer from '../component/footer/footer'
import CreateProfileComp from '../component/createProfile/index'
import { MAIN_URL } from '../component/types/types';
import Axios from '../customaxios';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';







const CreateProfile=(props)=>  {
 

  const [renderComp, setRenderComp]=useState(false);

  useEffect(()=>{
    basicAuth()

  },[])

  const basicAuth =()=>{
    if(props.authenctic){
      if(props?.profileDataOwn?.data?.userInfo){
      Router.push('/')

      }
      else{
        setRenderComp(true)
        props.handleLoader(false)
      }      
    }
    else{
      Router.push('/')
    }
  }





  // this.props.handleLoader(false)




    return (
      renderComp &&
      <>

      <Head>
        <title>Create Profile | Theincircle.com</title>
        <link rel="stylesheet" href="/assets/css/login.css"/>
      <script
dangerouslySetInnerHTML ={{__html: `
 gtag('event', 'conversion', {'send_to': 'AW-789373352/LNOzCKj2ovoBEKjDs_gC'});
  `}}/>
      </Head>
      <Header data={props?.siteData?.data?.header}/>
      <CreateProfileComp dataOwn={props?.profileData?.data}/>
     <Footer data={props?.siteData?.data?.footer}/>

       </>
    )
  }


export async function getServerSideProps(context) {


var b = context.req?.headers?.cookie?.match('(^|;)\\s*' + "authtoken" + '\\s*=\\s*([^;]+)');
// return b ? b.pop() : '';
let jwt = b ? b.pop() : '';
var c = context.req?.headers?.cookie?.match('(^|;)\\s*' + "userId" + '\\s*=\\s*([^;]+)');
// return b ? b.pop() : '';
let userid = c ? c.pop() : ''; 

let mycookie ;

if(jwt &&userid ){
  mycookie = {
    jwt:jwt,
    userid:userid
  }
  let profileData = await Axios.get(`${MAIN_URL}/user/my-profile`, {headers:mycookie});

  const sss = await axios.all([
    Axios.get(`${MAIN_URL}/content/site`),
    Axios.get(`${MAIN_URL}/user/create-profile`,{
            headers: mycookie
          }),    
        ]);
  return {
    props: {
      siteData:sss[0].data,
      profileData:sss[1].data,
      authenctic:true,
      profileDataOwn:profileData.data,
    }
  }
}
else{
  return {
    props: {
      siteData:[],
      profileData:[],
      authenctic:false,
      profileData:false,
    }
  }
}


}

const mapStateToProps = state => ({
 
})

const mapDispatchToProps = dispatch => ({
  handleLoader: data => dispatch(globalLoaderFunc(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);



