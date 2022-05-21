import React, { Component } from 'react';
import classes from './Customers.module.css';
import Header from "../../components/header";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Customer from './Customer/Customer';
import * as actionTypes from '../../store/actions/actionTypes';

class Customers extends Component {
    state = {  }
    
    componentWillMount() {
        this.props.getAllUsers();
        this.props.updateTransfer();   
    
    }
    render() { 
        return (
            <div>
            <Header/>
            <div className="container py-5">
                <h1>Send money from....</h1>
                <div className={classes.custRow}>
                    <p>User Name</p>
                    <p>Email</p>
                    <p>Account Type</p>
                    <p>Current Balance</p>
                </div>
                { Object.keys(this.props.users).map((key, index) => (
                    <Customer user={this.props.users[key]}
                            key={index}
                            index={index+1}
                            clik={() => this.props.addSender(this.props.users[key])}
                            link={"/customer/"+index} />
                ))}
            </div>
            </div>
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
        getAllUsers: () => dispatch(actions.getAllUsers()),
        addSender: (data) => dispatch(actions.addSender(data)),
        updateTransfer: () => dispatch({type: actionTypes.TRANSFER_COMPLETE})
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Customers);