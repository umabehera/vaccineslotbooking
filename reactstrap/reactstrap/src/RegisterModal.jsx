/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button ,ModalFooter, Modal, ModalBody, ModalHeader,Form ,FormGroup,Label,FormFeedback,FormText,Input} from 'reactstrap';
import React,{useState} from 'react';
import { Component } from 'react';


class RegisterModal extends React.Component {
 

 

constructor(props) {
    super(props);
    this.state = {
      email: '',
      modal: false,
      formValidation: false,
      password: '',
      confirmpassword : '',
      validate: {
        emailState: '',
        passwordState: '',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
    let myList = JSON.parse(localStorage.getItem("users", "[]")) || [];
    let uniqueEmail = true;
    myList.forEach(element => {
        if(e.target.value==element.email)
        uniqueEmail=false;
    });
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;

    if (emailRex.test(e.target.value) && uniqueEmail) {
      validate.emailState = 'has-success';
      this.setState({
        formValidation: true,
      });
    } else {
      validate.emailState = 'has-danger';
      this.setState({
        formValidation: true,
      });
    }
   

    this.setState({ validate });
  }
  validatePassword(e){
    const { validate } = this.state;
    const {  password } = this.state;
    if (e.target.value == password) {
        validate.passwordState = 'has-success';
        this.setState({
            formValidation: true,
          });
      } else {
        validate.passwordState = 'has-danger';
        this.setState({
            formValidation: false,
          });
      }
this.setState({ validate });

  }

  

  render() {
    const { email, password, confirmpassword,formValidation } = this.state;
    function register(){
        if(formValidation){
            var newUser = {email:email,
            password:password};
        let myList = JSON.parse(localStorage.getItem("users", "[]")) || [];
        myList.push(newUser);
        localStorage.setItem("users", JSON.stringify(myList));
       }
    }
   

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Register</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
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
            <FormFeedback valid>
              That's Available
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
              valid={this.state.validate.passwordState === "has-success"}
              invalid={this.state.validate.passwordState === "has-danger"}
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup>
          <FormFeedback>
              Password Does'nt Match
            </FormFeedback>
            <FormFeedback valid>
              That's Available
            </FormFeedback>
          <FormGroup>
            <Label for="examplePassword">Confirm Password</Label>
            <Input
              type="password"
              name="passwordconfirmation"
              id="examplePasswordConfirmation"
              placeholder="********"
              defaultValue={confirmpassword}
              valid={this.state.validate.passwordState === "has-success"}
              invalid={this.state.validate.passwordState === "has-danger"}
              onChange={(e) => {
                this.validatePassword(e);
                this.handleChange(e);
              }}
            />
          </FormGroup>
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={register}>Register</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Login</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;