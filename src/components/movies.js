import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './navbar';
import { Link, withRouter } from 'react-router-dom';

import queryString from 'query-string'
import SearchBox from './search-box';


class Movies extends Component {


  constructor(props) {
    super(props);
    this.state = { groups: [],  isLoading: true ,  userSearchField: ''};
    this.handleChange = this.handleChange.bind(this);
  }


  async componentDidMount() {
    const value = queryString.parse(this.props.location.search);
    console.log('category is ', value.category)
 
    this.setState({ isLoading: true });

    let fetchUrl = '';
    if (value.category) {
      fetchUrl = 'http://localhost:8080/inventory/testing/all?category='+ value.category;   
    }else{
      fetchUrl = 'http://localhost:8080/inventory/testing/all';
    }
    fetch(fetchUrl, { credentials: 'include' })
      .then(response => response.json())
      .then(data => this.setState({ groups: data, isLoading: false }))
      .catch(() => this.props.history.push('/'));

  }
  handleChange(e) {
    this.setState( {userSearchField: e.target.value} );
  }

  render() {
    const { groups, isLoading, userSearchField } = this.state;
    const filterUserArray = groups.filter( userItem =>
      userItem.movie.title.toLowerCase().includes(userSearchField.toLowerCase())
   );

    if (isLoading) {
      return <p>Loading...</p>;
    }
    let groupList = "Empty";
    if (filterUserArray.length === 0){
       groupList = <div align="center" color="red"> <br /><h4> No movies.. </h4></div> ;
    }else{

     groupList = filterUserArray.map(group => {
      var loginButton;
          if (group.is_active) {
            loginButton = <Button size="sm" color="primary" tag={Link} to={"/movies/" + group.id}> Buy </Button>;
          } else {
            loginButton = <Button size="sm" color="danger"> Out of Stock! </Button>;
          }

          return <tr key={group.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{group.movie.title}</td>
            <td> {group.movie.category.name} </td>
            <td> {group.movie.description} </td>
            <td> {group.store.city} </td>
            <td>{group.movie.release_year} </td>
            <td>

              <ButtonGroup>
                {loginButton}
              </ButtonGroup>
            </td>
          </tr>
        
    });
  }

    return (
      <div>
        <AppNavbar />
        <Container fluid>
        <br/><br/>
      <div className="mt-4">
        <Button size="sm" color="success" tag={Link} to={"/"}> Back to Categories </Button>
        &nbsp;
          <SearchBox placeholder='Search movies..' handleChange=  { this.handleChange} />
    
          </div>
          <h3 align="center"> Movie Rentals </h3>
    
          <br />
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Movie Title</th>
                <th width="15%">Category</th>
                <th>Description</th>
                <th width="15%">Store </th>
                <th width="10%">Release Year</th>
                <th width="10%">Buy</th>
              </tr>
            </thead>
            <tbody>
              {groupList}

            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(Movies);
