import Header from "./header";
import React, { Component } from 'react';
import classes from '../css/Home.module.css';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';
class Home extends Component {
    state = {  };
    componentWillMount() {
      this.props.getAllUsers();
  
  }
    render() {
      let arrayResult = Object.keys(this.props.users).map((key, index) => {
        return this.props.users[key];
    });
    const newUser = arrayResult.filter(user => user.email === localStorage.getItem('email'));
  
        return (
          <div>
          <Header/>
            <div className={classes.spbg + " container align-items-center mt-5"}>
          {newUser.map((value, index) => (
           
                    <div className="testimonials">
                    <div className="card">
                      <h3>Account Details</h3>
                        <div className="content">
                                <div><label>Name:</label> <span> {value.username}</span></div>
                                <div><label>Email:</label> <span> {value.email}</span></div>
                                <div><label>Account Number:</label> <span> {value.accountNumber}</span></div>
                                <div><label>Account Type:</label> <span> {value.accountType}</span></div>
                                <div><label>Balance:</label> <span> {value.currentBalance}</span></div>
                        </div>
                    </div>
                    </div>
                ))}
            </div></div>
        );
    }
}

const mapStatetoProps = state => {
  return {
      users: state.user.users
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    getAllUsers: () => dispatch(actions.getAllUsers())
  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Home);