import React from "react";
import { withAuth } from "@okta/okta-react";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      authenticated: false,
    };
    // console.log(props);
  }
  async componentDidMount() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== false) {
      console.log("User is authenticated??");
      this.setState({
        authenticated: true,
      });
      const user = await this.props.auth.getUser();
    }
  }

  async logout() {
    this.setState({
      authenticated: false,
    });
    this.props.auth.logout("/");
  }

  render() {
    return (
      <>
    
        <h1>Login page</h1>
        {this.state.authenticated ? (
          <button onClick={() => this.logout()}>Logout</button>
        ) : (
          <button onClick={() => this.props.auth.login()}>Sign In</button>
        )}
         {/* <MovieCatalog CatList={this.state.items}/> */}
      </>
    );
  }
}

export default withAuth(LoginPage);
