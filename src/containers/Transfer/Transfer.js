import React, { Component } from 'react';
import classes from './Transfer.module.css';
import {connect} from 'react-redux';
import Header from "../../components/header";
import {
    endpointPath
} from '../../config/api';
import Dropdowns from "../../components/Dropdowns"
import {NavLink} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';

import {toast} from 'react-toastify';

class Transfer extends Component {
    state = {
        amount: "",
        currency:"£",
        from: 'GBP',
        into: 'GBP',
        isLoading: false,
        senderAmount: this.props.sender.currentBalance,
        receiverAmount: this.props.receiver.currentBalance
    };

    onAmountChange = (event) => {
        this.setState({amount: event.target.value});
    }
    handleInto = (event) => {
        event.preventDefault();
        this.setState({ from: this.state.into });
        this.setState({ into: event.currentTarget.value },function() { this.convertCurrency(this.state)});
    }
    convertCurrency = async ({ from, into }, event) => {
        var myHeaders = new Headers();
        var senderBal =  parseInt(this.state.senderAmount.slice(0, -1));
        var receiverBal =  parseInt(this.state.receiverAmount.slice(0, -1));
        myHeaders.append("apikey", "kEzvSEwwu1I639OScL3lMEZY71Oe42Y1");
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        this.setState({ isLoading: true });
        let url1 = endpointPath(from, into, senderBal);
        let url2 = endpointPath(from, into, receiverBal);
        let [res1, res2] = await Promise.all([
            fetch(url1, requestOptions).then(response => response.json()),
            fetch(url2, requestOptions).then(response => response.json()),
        ]);
        this.setState({ isLoading: false });
        if(into === 'USD'){
            this.setState({ senderAmount: res1.result + "$"});
            this.setState({ receiverAmount: res2.result+ "$"});
        }else if(into === "EUR"){
            this.setState({ senderAmount: res1.result + "€"});
            this.setState({ receiverAmount: res2.result + "€"});
        } else{
            this.setState({ senderAmount: res1.result + "£"});
            this.setState({ receiverAmount: res2.result + "£"});
        }
        }
        
    balanceUpdates = () => {
        const pattern = /^\d+$/;
        let sCurrency = this.state.senderAmount.slice(-1);
        let rCurrency = this.state.receiverAmount.slice(-1);
        let enterAmount = parseInt(this.state.amount);
        let senderCurBal= parseInt(this.state.senderAmount);
        let receiverCurBal= parseInt(this.state.receiverAmount);
        if(!pattern.test(enterAmount)){
            toast.error("Invalid amount");
            const tData = {
                sender: this.props.sender.email,
                receiver: this.props.receiver.email,
                amount: enterAmount,
                state: "failure"
            }
            this.props.addTransaction(tData);
        }else if(enterAmount > senderCurBal){
            toast.error("Transfer amount larger than sender balance");
            const tData = {
                sender: this.props.sender.email,
                receiver: this.props.receiver.email,
                amount: enterAmount,
                state: "failure"
            }
            this.props.addTransaction(tData);
        }else{
            this.props.updateTransfer();
            let sData = {
                ...this.props.sender,
                currentBalance: senderCurBal - enterAmount 
            };
            let rData = {
                ...this.props.receiver,
                currentBalance: receiverCurBal + enterAmount
            }
            sData.currentBalance = sData.currentBalance + sCurrency;
            rData.currentBalance = rData.currentBalance + rCurrency;
            this.props.updateBalances(sData, rData);
            let tData = {
                sender: sData.email,
                receiver: rData.email,
                amount: enterAmount,
                state: "success"
            }
            this.props.addTransaction(tData);
        }
    }
    render() { 
        return (
          <div>
              {this.state.isLoading ? 
              <div>
               <div class="overlay show"></div>
               <div class="spanner show">
                 <div class="loader"></div>
                 <p>Converting, please be patient.</p>
               </div>
             </div> : <div></div>}
            <Header />
            <div className="container mt-5">
            
              <div className={classes.outerForm + " shadow bg-white py-4"}>
                <h1>Transfer Form</h1>
                <form className={classes.transferForm}>
                  <div style={{ margin: "0 13%" }}>
                    <div className="fromdrop">
                      <label style={{ fontSize: "25px", paddingRight: "20px" }}>
                        Select Currency:{" "}
                      </label>

                      <Dropdowns
                        labelName="From"
                        handleChange={this.handleInto}
                        value={this.state.into}
                      ></Dropdowns>
                    </div>
                  </div>
                  <div className={classes.formRow}>
                    <input
                      type="text"
                      disabled
                      name="sender"
                      value={"Sender : " + this.props.sender.username}
                    />
                    <input
                      type="text"
                      disabled
                      value={"Balance : " + this.state.senderAmount}
                    />
                  </div>
                  <div className={classes.formRow}>
                    <input
                      type="text"
                      disabled
                      name="receiver"
                      value={"Receiver : " + this.props.receiver.username}
                    />
                    <input
                      type="text"
                      disabled
                      value={"Balance : " + this.state.receiverAmount}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Transfer Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    className={classes.amountInput}
                  />
                  <div
                    className={classes.btnGroup}
                    style={{
                      width: "30%",
                      margin: "0 auto",
                      paddingTop: "20px",
                    }}
                  >
                    <NavLink to="/result">
                      <button
                        onClick={this.balanceUpdates}
                        className="btn btn-success"
                      >
                        Transfer
                      </button>
                    </NavLink>
                    <NavLink to="/">
                      <button className="btn btn-danger">Cancel</button>
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        sender: state.transfer.sender,
        receiver: state.transfer.receiver
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        updateBalances: (sd, rd) => dispatch(actions.updateBalances(sd, rd)),
        updateTransfer: () => dispatch({type: actionTypes.TRANSFER_SUCCESS}),
        addTransaction: (data) => dispatch(actions.addTransaction(data))
    }
}
 
export default connect(mapStatetoProps, mapDispatchtoProps)(Transfer);