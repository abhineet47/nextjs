import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { globalLoaderFunc } from '../actions/commonActions';
import Head from 'next/head';
import Link from 'next/link';
import { MAIN_URL } from '../types/types';
import {
  EmailShareButton,
  FacebookShareButton,
  
  LinkedinShareButton,
 
  TwitterShareButton,
 
  WhatsappShareButton,
} from "react-share";



const SocialShare =(props)=>{
  const [origin, setOrigin]= useState('');

  useEffect(()=>{
setOrigin(window.location.origin)
  }, [])

        return (
            <>
           <div className="social-share">
           {/* <h2>Share Jobs</h2>*/}
            <div className="social">
            <WhatsappShareButton
           url={`${origin}/${props?.dataOwn?.alias}`}
            title={props?.dataOwn?.name}
            separator=":: "
            className=""
          >
              <a href="#" id="share-wa" className="sharer button whatsapp"><i className="fa fa-2x fa-whatsapp" /></a>
              </WhatsappShareButton>

              <FacebookShareButton  url={`${origin}/${props?.dataOwn?.alias}` }
               className=""
            quote={props?.dataOwn?.name}>
              <a href="#" id="share-fb" className="sharer button facebook"><i className="fa fa-2x fa-facebook-square" /></a>

              </FacebookShareButton>

              <TwitterShareButton
            url={origin}
            title={props?.dataOwn?.name}
            className="d-none d-sm-block"
          >
              <a href="#" id="share-tw" className="sharer button twitter"><i className="fa fa-2x fa-twitter-square" /></a>
              </TwitterShareButton>
              <LinkedinShareButton url={origin}  className="d-none d-sm-block">
              <a href="#" id="share-li" className="sharer button"><i className="fa fa-2x fa-linkedin-square" /></a>
              </LinkedinShareButton>
              {/* <InstapaperShareButton
            url={origin}
            title={props?.dataOwn?.name}  className="d-block"
          >
              <a href="#" id="share-gp" className="sharer button insta"><i className="fa fa-2x fa-instagram" /></a>
              </InstapaperShareButton> 
              <EmailShareButton
            url={origin}
            subject={props?.dataOwn?.name}
            body="body"
            className="d-block"
          >
              <a href="#" id="share-em" className="sharer button"><i className="fa fa-2x fa-envelope-square" /></a>
              </EmailShareButton>*/}
            </div>
          </div>
        </>
           )
    }


export default SocialShare;


