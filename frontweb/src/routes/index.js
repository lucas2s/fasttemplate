import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import JobsList from '~/pages/JobControl/List';
import JobsStore from '~/pages/JobControl/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/SignUp" exact component={SignUp} />
      <Route path="/job/list" component={JobsList} isPrivate />
      <Route path="/job/store" component={JobsStore} isPrivate />
      <Route path="/job/update/:id" component={JobsStore} isPrivate />
    </Switch>
  );
}
