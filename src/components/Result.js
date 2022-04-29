import React from 'react';
import classes from '../css/Result.module.css';
import Header from "./header";
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const Result = (props) => {
    return (
        <div>
            <Header/>
        <div className={classes.result + " container"}>
            <h3  style={{textAlign:"center",paddingTop:"20px"}}>Transfer {props.transfer ? "Successful" : "Failed"}</h3>
            <NavLink to="/home">
                <button className="btn btn-danger" style={{width:"24%",margin:"0 auto"}}>Go back to Home</button>
            </NavLink>
        </div>
        </div>
    );
}

const mapStatetoProps = state => {
    return {
        transfer: state.transfer.transfer
    }
}
 
export default connect(mapStatetoProps)(Result);