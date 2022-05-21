import React from 'react';
import classes from '../css/Customer.module.css';
import Header from "./header";
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

const Customer = (props) => {
    return (
        <div>
            <Header/>
        <div className="container">
            <div className="content" style={{display:"grid",marginTop: "50px",fontSize:"20px"}}>
                <div style={{margin: "0 auto",padding:"15px 0px"}}><label>Name:</label> <span> {props.sender.username}</span></div>
                <div style={{margin: "0 auto",padding:"15px 0px"}}><label>Email:</label> <span> {props.sender.email}</span></div>
                <div style={{margin: "0 auto",padding:"15px 0px"}}><label>Balance:</label> <span> {props.sender.currentBalance}</span></div>
             </div>
            <div className={classes.btnGroup}  style={{width:"24%",margin:"0 auto",paddingTop:"20px"}}>
                <NavLink to="/receiver">
                    <button className="btn btn-primary">Proceed</button>
                </NavLink>
                <NavLink to="/customers">
                    <button className="btn btn-danger">Go Back</button>
                </NavLink>
            </div>
        </div>
        </div>
    );
}

const mapStatetoProps = state => {
    return {
        sender: state.transfer.sender
    }
}
 
export default connect(mapStatetoProps)(Customer);