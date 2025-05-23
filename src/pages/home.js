import React, { Component } from 'react';
import AppNavbar from '../components/navbar';
import LoginPage from './Login';
import { Link } from 'react-router-dom';
import { CardGroup, CardDeck, Card } from 'react-bootstrap'
import { Button, Container } from 'reactstrap';
import { withAuth } from "@okta/okta-react";


class Home extends Component {
    state = {
        items: [],
        isLoading: true,
        authenticated: false,
        error: null,
        user: undefined
    }


    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        };
        console.log(props);
    }

    async componentDidMount() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== false) {
            console.log("User is authenticated- navbar");
            this.setState({
              authenticated: true,
            });
            const user = await this.props.auth.getUser();
          }
       
        const response = await fetch('http://localhost:8080/movies/category', { credentials: 'include' });
        const body = await response.text();
        const cat = JSON.parse(body);
        if (body === '') {
            this.setState(({ authenticated: false }))
        } else {
            this.setState({ items: cat });
        }
        console.log(this.state.items);

    }


    render() {

        const Catalog = this.state.items ?
            < div >
           <CardDeck>
        {this.state.items.map(cat => (

        <Card  className="text-center">
    <Card.Img variant="top" src={`images/${cat.name}.jpg`} />
    <Card.Body>
      <Card.Title> <Link to={`/movies?category=${cat.name}`}>
          {cat.name}
          </Link>  </Card.Title>
 
    </Card.Body>
   </Card>
        ))}

        </CardDeck>
    
          </div > :
        <p>Loading...</p>;

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                {/* <LoginPage /> */}
                    {/* {message} */}
                    {/* {button} */}
                    <br/><br/>
                    {Catalog}
                    {/* <MovieCatalog CatList={this.state.items}/> */}
                </Container>
            </div>
        );
    }


}


export default withAuth(Home);
