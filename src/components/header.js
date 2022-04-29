import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

function Header ()  {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };
    return (
        <div>
            <nav className="navbar navbarDark">

            <ul>
         <li><Link exact to='/home'>
            Home
          </Link></li> 
          <li><Link to='/bankTranfer'>
            Tranfer
          </Link></li> 
          <li><Link to='/transactions'>
            Transactions
          </Link></li> 
          <li onClick={handleLogout}> <a href='#'>Log out</a></li>
        </ul>

        </nav>
       
        </div>
      );
    }
export default Header;