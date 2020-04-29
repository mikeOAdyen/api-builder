import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from './Header';
import { DropinForm } from '../components/adyen/dropin/DropinForm';
import { Components } from '../components/adyen/component/Components';
import { LandingPage } from './LandingPage';

const App = () => {

  return (
    <div id="app">
      <Header />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/dropin' component={DropinForm} />
      <Route exact path='/components' component={Components} />
    </div>
  )
};

export default withRouter(App)