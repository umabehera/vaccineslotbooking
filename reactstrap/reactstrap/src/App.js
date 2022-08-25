import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader,Form ,FormGroup,Label,FormFeedback,FormText,Input} from 'reactstrap';
import React,{useState} from 'react';
import { Component } from 'react';
import RegisterModal from './RegisterModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: {
        emailState: '',
        passwordstate: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;
    

    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
    const { email } = this.state;
    let myList = JSON.parse(localStorage.getItem("users", "[]")) || [];
    let uniqueEmail = true;
    myList.forEach(element => {
        if(email==element.email)
        console.log('user exist');
        

    });
  }
  login=(e)=>{
      
    e.preventDefault();
    const { email ,password,validate} = this.state;

    let myList = JSON.parse(localStorage.getItem("users", "[]")) || [];
    // let uniqueEmail = true;
    myList.forEach(element => {
        if(email==element.email && password==element.password){
        console.log('user exist and password matches');
        validate.passwordstate = 'has-success';
        }
        else
        validate.passwordstate = 'has-danger';
        
    });
  this.setState({ validate });


  }
  

  render() {
    const { email, password } = this.state;



  return (
    <div className="App">
        <h2>Welcome to my Website</h2>
        <h5>Sign in to continue</h5>
        <Form className="form">
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              value={email}
              onChange={(e) => {
                this.validateEmail(e);
                this.handleChange(e);
              }}
            />
             <FormFeedback>
              Uh oh! Looks like there is an issue with your email. Please input
              a correct email.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={password}
              valid={this.state.validate.passwordstate === "has-success"}
              invalid={this.state.validate.passwordstate === "has-danger"}
              onChange={(e) => this.handleChange(e)}
            />
            <FormFeedback>
             The password does'nt match.Try again.
            </FormFeedback>
          </FormGroup>
        <Button onClick={(e)=> {
          this.login(e)
        }}>Login</Button>
      </Form>
      <RegisterModal/>
    </div>
  );
}
}

export default App;
