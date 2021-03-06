import React from 'react'
import { initializeStore,initialStateBlank } from './index'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }
  // console.log(" window exists ", window[__NEXT_REDUX_STORE__])
  // Create store if unavailable on the client and set it on  the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default App => {
  return class AppWithRedux extends React.Component {
 

    constructor (props) {
      super(props)
      this.reduxStore = getOrCreateStore()
    }

    render () {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
