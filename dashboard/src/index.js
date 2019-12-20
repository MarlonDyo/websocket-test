import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './views/App';
import View2 from '../src/views/View2/View2'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/2" name="view 2" component={View2} />
      <Route path="/" name="view 1" component={App} />
    </Switch>
  </HashRouter>
), document.getElementById('root'));

