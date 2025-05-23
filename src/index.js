import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Security } from '@okta/okta-react';

import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const oktaConfig = {
  issuer: 'https://dev-502730.okta.com/oauth2/default',
  redirect_uri: `${window.location.origin}/implicit/callback`,
  client_id: "0oa12z2xmfPOf04M74x7",
};

ReactDOM.render(
  <BrowserRouter>
    <Security {...oktaConfig}>
      <App />
    </Security>
  </BrowserRouter>,
  document.getElementById('root'),
);

if (module.hot) module.hot.accept();