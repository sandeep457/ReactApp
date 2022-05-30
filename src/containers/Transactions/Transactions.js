import React, { Component, useRef} from 'react';
import classes from './Transactions.module.css';
import Header from "../../components/header";
import {connect} from 'react-redux';
import Transaction from './Transaction/Transaction';
import ReactToPrint  from 'react-to-print';


class Transactions extends Component {
    // componentWillMount() {
    //     this.props.getAllTransactions();      
    // }
    render() { 
        return (
            <div>
                <Header/>
            <ReactToPrint trigger={() => {
            return <a href="#" style={{display:'inline-block',position: "absolute",top:'130px', left:'1200px'}}>Print Bank statement</a>;
          }}
          content={() => this.componentRef}/>

            <div className="container py-5" ref={el=>(this.componentRef=el)}>
                <h1>Transactions</h1>
                <div className={classes.custRow} >
                    <p>Sl No</p>
                    <p>Sender</p>
                    <p>Receiver</p>
                    <p>Amount</p>
                    <p>State</p>
                </div>
                {Object.keys(this.props.transactions).map((transaction, index) => (
                    <Transaction transaction={this.props.transactions[transaction]} 
                            key={'_' + Math.random().toString(36).substr(2, 9)}
                            index={index+1} />
                ))}
            </div>
            </div>
        );
    }
}
class Example extends React.Component  {
render(){
        return (
            <div>
                <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => this.componentRef}
      />
      <Transactions ref={el => (this.componentRef = el)} />
            </div>
        )
        }
    
}
const mapStatetoProps = state => {
    return {
        transactions: state.transaction.transactions
    }
}

export default connect(mapStatetoProps)(Transactions);