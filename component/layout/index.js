import React from "react";
import {globalLoaderFunc} from '../actions/commonActions';
import {connect} from 'react-redux';
import Router from "next/router";
import GlobalLoader from '../_shared/loader';
import Header from '../header/header';
import Footer from '../footer/footer';
import InstallPWA from './install';

var a = 0;
var b;
class CommonLayout extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        user: undefined,
        isFullView: false
      };
  
      this.mobileNavRef = React.createRef();
  
    }
    componentDidMount = ()=>{
      // this.props.handleLoader(true)
      Router.events.on('routeChangeStart', this.handleRouteChange);
  
      Router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
      
    } 
    
    handleRouteChange = () => {
      // this.props.handleLoader(true);
      // console.log('start')
      this.props.handleLoader(true)
      b = setInterval(() => {
        a +=1;
        
      }, 1000);
    }
  
    // next hook on route change complete, loader stops
    handleRouteChangeComplete = (url) => {
      this.props.handleLoader(false)

      window.scrollTo(0,0)
  
      clearInterval(b)
      // console.log('end', a)
      a = 0;
      // this.props.handleLoader(false);
    }

    render(){
      
        return(
            <div>   
              {/* <Header data={this.props?.headerData}/>            */}
              {this.props.children}
              {/* <div>
              <div className="add-to-home d-block d-sm-none">
        <button type="button" className="close text-right pr-1 close-add-to-home" onclick="parentNode.remove()">
          <span aria-hidden="true">×</span>
        </button>
        <div className="add-logo"><a className="hidden-xs hidden-sm" href="#;" title="The incircle" data-toggle="tooltip"><img src="images/logo.gif" width="80px" />  TheIncircle.com</a></div>
        <div className="text-center"> <button type="button" className="btn btn-primary btn-sm">Add to Home <i className="fa fa-plus" /></button></div>
      </div>
              </div> */}
              <InstallPWA/>
              {/* <Footer data={this.props?.footerData}/> */}
              </div>
        )
    }

}

const mapStateToProps = state =>({
  loader:state.common.loader
})
const mapDispatchToProps = dispatch =>({
  handleLoader: data => dispatch(globalLoaderFunc(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(CommonLayout);
