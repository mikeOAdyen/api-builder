import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from './Header';
import { OptionsForm } from './form/OptionsForm';

const App = () => {

  return (
    <div id="app">
      <Header />
      <Route exact to='/' component={OptionsForm} />
    </div>
  )
};

export default withRouter(App)