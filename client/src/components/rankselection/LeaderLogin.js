import React, { Component } from 'react';
import {connect} from 'react-redux';
import UserNameAndPasswordForm from './UserNameAndPasswordForm';
import './RankSelection.css';
import {Link} from 'react-router';
import * as actions from '../../actions/registrationAndLoginActions';

class LeaderLogin extends Component {

  constructor(props) {
    super(props);
    //remember you have the method getPage as a prop
    this.getUsernameInput = this.getUsernameInput.bind(this);
    this.getPasswordInput = this.getPasswordInput.bind(this);
    //this.registerGuildLeader = this.registerGuildLeader.bind(this);
    this.authorizeGuildLeader = this.authorizeGuildLeader.bind(this);
  }

  checkAPIKey(APIKey){
    /*action to check for an account with the apiKey and the store the api key
    in the database if you get back an account and that account is in the guild 
    Saves the account name and the API Key*/
    /*Validate the user and that he is in a guild that is registered with the app*/

  }
  getUsernameInput(event){
    this.props.dispatch(actions.getUsernameInput(event.target.value));
  }
  getPasswordInput(event){
    this.props.dispatch(actions.getPasswordInput(event.target.value));
  }
  authorizeGuildLeader(){
    this.props.dispatch(actions.loginGuildLeader(this.props.usernameInput, this.props.passwordInput));
  }

 /*       <div className="LeaderRegistrationHeader">
          <h2>Login</h2>
        </div>*/

  render() {
    return (
      <div className="LeaderLogin">
        <UserNameAndPasswordForm
            type="login"
            getUsernameInput = {this.getUsernameInput}
            getPasswordInput = {this.getPasswordInput}
            onSubmit = {this.authorizeGuildLeader}
        />
        <Link to="/registration/leader" className="leaderRegistrationButton">Register Leader</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    isValidLeader: state.registrationAndLogin.isValidLeader,
    guilds: state.registrationAndLogin.memberGuilds,
    usernameInput: state.registrationAndLogin.usernameInput,
    passwordInput: state.registrationAndLogin.passwordInput
});

export default connect(mapStateToProps)(LeaderLogin);