import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';
import AppProvider from './components/AppProvider/AppProvider';

import Dashboard from './containers/Dashboard';
import { NotFound, BackendError} from './pages';
import registerServiceWorker from './registerServiceWorker';

render(
  <AppProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/404" component={NotFound} />
        <Route exact path="/500" component={BackendError} />

        <Route path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </AppProvider>
, document.getElementById('root'));

registerServiceWorker();
