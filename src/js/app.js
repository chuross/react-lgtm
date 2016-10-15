import React from 'react'
import ReactDom from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Root from 'ui/containers/Root'

ReactDom.render(
  <MuiThemeProvider>
    <Root />
  </MuiThemeProvider>
, document.getElementById('app'));
