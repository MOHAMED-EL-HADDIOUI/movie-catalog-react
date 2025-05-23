import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './navbar';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

// import { instanceOf } from 'prop-types';
// import { Cookies, withCookies } from 'react-cookie';

const cookies = new Cookies();

class MovieDetails extends Component {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };

  emptyItem = {
    id: '',
    movie: '',
    store: ''
  };

  postItem = {
    customerId: '',
    inventoryId: '',
    rental_date: '',
    return_date: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      postItem: this.postItem
    };
  //  const {cookies} = props;
    console.log("ccol"+ cookies.get('XSRF-TOKEN'));
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
  }

  async componentDidMount() {
    
    if (this.props.match.params.id !== 'new') {
      ;
      const group = await (await fetch(`http://localhost:8080/inventory/${this.props.match.params.id}`,
        { credentials: 'include' }))
        .json();
      this.setState({ item: group });
    }
  }

 async mySubmitHandler(event) {
    event.preventDefault();
    const {item} = this.state;
    const {postItem} = this.state;
    postItem["customerId"] = 2;
    postItem["rental_date"] = "2020-09-22 23:07:24";
    postItem["inventoryId"] =  item.id;
    this.setState({postItem});
    console.log(postItem);
  
    await fetch(`http://localhost:8080/rental/testing/add`, {
      method:'POST',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postItem),
    })
    .then(response => response.json())
    .then(data =>  console.log(data));
   
    this.props.history.push('/movies');
    alert("Purchase Successfull Please Return before " +postItem.return_date);
  }

  myChangeHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    let postItem = {...this.state.postItem};
    postItem[name] = value;
    this.setState({postItem});
    console.log(postItem);
  }

  get CategoryName() {
    const { item } = this.state;
    return item.movie["category"] !== undefined ? item.movie.category.name : "None";
  }

  render() {
    const { item } = this.state;
    const { postItem } = this.state;
    console.log(item)
    const title = <h2>{item.movie.title}</h2>;
    let form;
    if (item.is_active){
      form =  <Form onSubmit={this.mySubmitHandler}>
      <FormGroup>
        <Label> Return Date</Label>
        {/* <Control type="date" name="dob" placeholder="Date of Birth" /> */}
        <Input type="date" value={postItem.return_date || ''}name="return_date" id="return_date" className="col-md-4 mb-3"  onChange={this.myChangeHandler}/>
      </FormGroup>
      <FormGroup>
        <Button color="primary" type="submit">Save</Button>{' '}
        <Button color="secondary" tag={Link} to="/movies">Cancel</Button>
      </FormGroup>
    </Form> 
    }else{
      form =  <Button size="sm" color="danger"> Out of Stock! </Button>;
    }
   

    return <div>
      <AppNavbar />
      <Container><br /><br />
        {title}
        <br />
        <p><b> Description: </b> {item.movie.description}  </p>
        <p><b> Title: </b> {item.movie.title}  </p>
        <p><b> Release Year: </b> {item.movie.release_year}  </p>
        {form}
       
      
      </Container>
    </div>
  }


}
export default withRouter(MovieDetails);
