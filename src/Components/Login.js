import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`


class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    name: ""
  };

  /* 
  state1: already have an account
    -> the component will only render two input fields for the user to provide their email and password
    -> state.login = true
  state2: haven't created an account
    -> the component will only render a third input field where users can provide their name
    -> state.login = false
  */

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
        <div className="flex flex-column">
          {/* when state.login = false  */}
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation 
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={date => this._confirm(date)}>
            {mutation => (
                <div className="pointer mr2 button" onClick={mutation}>
                    {login ? 'login' : 'create account'}
                </div>
            )}
            </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }

//   the mutations for the login functionality 
  _confirm = async data => {
      const { token } = this.state.login ? data.login : data.SIGNUP_MUTATION
      this._saveUserData(token)
      this.props.history.push(`/`)
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login