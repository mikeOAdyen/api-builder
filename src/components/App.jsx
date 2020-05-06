import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from './Header';
import { DropinForm } from '../components/adyen/dropin/DropinForm';
import { LandingPage } from './LandingPage';
import { ComponentForm } from '../components/adyen/component/ComponentForm';

const App = () => {

  return (
    <div id="app">
      <Header />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/dropin' component={DropinForm} />
      <Route exact path='/components' component={ComponentForm} />
    </div>
  )
};

export default withRouter(App)