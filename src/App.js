import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import BankTranfer from './components/BankTranfer';
import Customers from './containers/Customers/Customers';
import Customer from './components/Customer';
import Receiver from './containers/Receiver/Receiver';
import Transfer from './containers/Transfer/Transfer';
import Result from './components/Result';
import Transactions from './containers/Transactions/Transactions';
function App() {
  return (
          <><UserAuthContextProvider>
      <Routes>
        <Route
          path="/home"
          element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/bankTranfer" element={<BankTranfer />} />
        <Route path="/transfers"element={<Transfer />} />
        <Route path="/result" element={<Result />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/receiver" element={<Receiver />} />
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </UserAuthContextProvider></>
  );
}

export default App;
