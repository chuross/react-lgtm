import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import createSagaMiddleware from 'redux-saga'
import routes from 'app-routes'
import saga from 'ui/sagas/app'
import reducer from 'ui/reducers/app'

const theme = Object.assign({}, baseTheme, {
  palette: {
    primary1Color: '#FFB300'
  }
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    app: reducer,
    routing: routerReducer
  }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(saga);
const history = syncHistoryWithStore(browserHistory, store);

ReactDom.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>
, document.getElementById('app'));
