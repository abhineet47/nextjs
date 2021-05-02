import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { withCookies, Cookies } from 'react-cookie';
import Router from 'next/router';
let localIndex = 0;
let colorOption = false;
const LanguageModal = (props) => {
  const [selectedLang, setSelectedLang] = useState(null)

  useEffect(() => {
   // console.log("LANG MODAL",props?.dataOwn);
    if (props?.cookies?.cookies.langOwn) {
      setSelectedLang(props?.cookies?.cookies.langOwn)
    }

  }, [])

  const changeLang = (ev) => {

    setSelectedLang(ev.target.value)
  }

  const saveLang = () => {
    if (selectedLang) {
      const { cookies } = props;
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
      now.setTime(expireTime);
      cookies.set('langOwn', selectedLang, { path: '/', expires: now });
      Router.push(window.location.pathname);
      props.onCloseModal()
    }
    else {
      props.onCloseModal()

    }
  }

 const onCloseModal = ()=>{
  const { cookies } = props;
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + (3600 * 1000 * 24 * 365 * 1);
  now.setTime(expireTime);
  cookies.set('langOwn', 'en', { path: '/', expires: now });
  Router.push(window.location.pathname);
  props.onCloseModal()
 }


  return (
    <>
      <Modal open={props.open} classNames={{ modal: "modal-sm modal-own language-banner" }} showCloseIcon={false} closeOnOverlayClick={false} onClose={props.onCloseModal} center>
        <div className="modal-content">
          <div className="modal-header">
            <h5>Select Language</h5>
            <button type="button" className="close" onClick={onCloseModal}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <div className="text-center">
              <div className="row">

                {props?.dataOwn?.length > 0 && props?.dataOwn.map((data, index) => {
                  if (index === 0) {
                    localIndex = 0;
                    colorOption = false;
                  }
                  if (localIndex <= index) {
                    localIndex = index + 2;
                    colorOption = !colorOption;
                  }

                  return <div className="col-6" key={index}>
                    <div className={`custom-control custom-radio alert ${colorOption ? 'alert-warning' : 'alert-info'}`}>
                      <input type="radio" className="custom-control-input" checked={data.value === selectedLang} onChange={(ev) => changeLang(ev)} value={data.value} id={data.text} name="defaultExampleRadios" />
                      <label className="custom-control-label" htmlFor={data.text}>{data.text}</label>
                    </div>
                  </div>
                })

                }
              </div>
            </div></div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCloseModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={saveLang}>Save changes</button>
          </div>
        </div>
      </Modal>
    </>
  )

}

export default withCookies(LanguageModal)
