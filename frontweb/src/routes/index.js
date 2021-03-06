import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import JobsList from '~/pages/JobControl/List';
import JobsStore from '~/pages/JobControl/Form';
import TransmissonList from '~/pages/JobControl/Transmission/List';
import TransmissonStore from '~/pages/JobControl/Transmission/Form';
import StoryList from '~/pages/Story/List';
import StoryStore from '~/pages/Story/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/SignUp" exact component={SignUp} />

      <Route path="/jobs/list" component={JobsList} isPrivate />
      <Route path="/jobs/store" component={JobsStore} isPrivate />
      <Route path="/jobs/update/:id" component={JobsStore} isPrivate />

      <Route
        path="/transmission/list/:id"
        component={TransmissonList}
        isPrivate
      />
      <Route
        path="/transmission/store/:job_id"
        component={TransmissonStore}
        isPrivate
      />
      <Route
        path="/transmission/update/:id"
        component={TransmissonStore}
        isPrivate
      />

      <Route path="/stories/list" component={StoryList} isPrivate />
      <Route path="/stories/store" component={StoryStore} isPrivate />
      <Route path="/stories/update/:id" component={StoryStore} isPrivate />
    </Switch>
  );
}
