import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import reducer from 'ui/reducers/app'
import Root from 'ui/containers/Root'

const theme = Object.assign({}, baseTheme, {
  palette: {
    primary1Color: '#FFB300'
  }
});
const store = createStore(reducer);

ReactDom.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>
, document.getElementById('app'));