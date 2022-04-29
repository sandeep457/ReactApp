import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import axios from 'axios';
import { createStore, applyMiddleware, compose ,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import userReducer from './store/reducers/user';
import transferReducer from './store/reducers/transfer';
import transactionReducer from './store/reducers/transaction';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

axios.defaults.baseURL = "https://reactauth-6f119-default-rtdb.firebaseio.com/";

const rootReducer = combineReducers({
  user: userReducer,
  transfer: transferReducer,
  transaction: transactionReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}><App /></Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();