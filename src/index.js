import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

class App extends React.Component {
  render() {
    return (
      <div>Open Redux Devtools and start playing. Try dispatching actions from actions.js file.</div>
    )
  }
}

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
)