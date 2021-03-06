import React from 'react';
import classes from './Customer.module.css';

import {NavLink} from 'react-router-dom';

const Customer = (props) => {
    return (
        <NavLink to={props.link} onClick={props.clik} className={classes.custRow1}>
            <p>{props.user.username}</p>
            <p>{props.user.email}</p>
            <p>{props.user.accountType}</p>
            <p>{props.user.currentBalance}</p>
        </NavLink>
    );
}
 
export default Customer;