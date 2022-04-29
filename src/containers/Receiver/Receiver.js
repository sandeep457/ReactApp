import React, { Component } from 'react';
import classes from './Receiver.module.css';
import Header from "../../components/header";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Customer from '../Customers/Customer/Customer';

class Receiver extends Component {
    state = {  };
    render() {
       let arrayResult = Object.keys(this.props.users).map((key, index) => {
            return this.props.users[key];
        });
        const newUsers = arrayResult.filter(user => user.email!==this.props.sender.email);
        return (
            <div>
                <Header/>
            <div className="container py-5">
                <h1>Send money to....</h1>
                <div className={classes.custRow}>
                    <p>User Name</p>
                    <p>Email</p>
                    <p>Current Balance</p>
                </div>
                {newUsers.map((user, index) =>
                    <Customer user={user} 
                            key={user.uid}
                            index={index+1}
                            clik={() => this.props.addReceiver(user)}
                            link={"/transfer"} />
                )}
            </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        users: state.user.users,
        sender: state.transfer.sender
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        addReceiver: (data) => dispatch(actions.addReceiver(data))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Receiver);