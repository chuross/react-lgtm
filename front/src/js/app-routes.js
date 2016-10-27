import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'ui/containers/App'
import NotFound from 'ui/containers/NotFound'
import Index from 'ui/containers/index/Root'
import ImageDetail from 'ui/containers/images/Detail'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/images/:id" component={ImageDetail} />
    <Route path="*" component={NotFound} />
  </Route>
);
