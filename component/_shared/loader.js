import React from 'react'
import { connect } from 'react-redux'

class GlobalLoader extends React.PureComponent{
    render(){
        return (
            <>
        {this.props.globalLoader?<div className="loader-wrapper">
            <div className="loader"></div>
            </div>:null}
        </>
        )
    }

}

const mapStateToProps = state =>({
    globalLoader:state.common.loader
})

export default connect(mapStateToProps, null)(GlobalLoader)