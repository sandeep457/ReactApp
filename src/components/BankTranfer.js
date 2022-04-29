import Header from "./header";
import React, { Component } from 'react';
import classes from '../css/Home.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

class BankTranfer extends Component {
    state = {  }
    componentWillMount() {
        this.props.getAllTransactions();      
    }
    render() {
        return (
          <div>
          <Header/>
            <div className={classes.spbg + " container align-items-center mt-5"}>
                <div className="row justify-content-center" style={{ width: "50%",margin: "0 auto"}}>
                    <NavLink to="/customers" style={{
                        textDecoration: "none"
                    }}>
                        <p className={classes.fsbtn + " btn btn-success my-3 mx-2"}>
                            Make Transfer
                        </p>
                    </NavLink>
                </div>
            </div></div>
        );
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        getAllTransactions: () => dispatch(actions.getTransactions())
    }
}
 
export default connect(null, mapDispatchtoProps)(BankTranfer);

