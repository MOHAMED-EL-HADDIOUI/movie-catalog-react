import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class ImplicitCallback extends Component {
  state = {
    authenticated: null,
    error: null
  };

  async componentDidMount() {
    try {
      const authResponse = await this.props.auth.handleAuthentication();
    } catch (e) {
      console.log('erro:', e);
    }
  }

  render() {
    return <h1>The Okta callback</h1>
  }
});