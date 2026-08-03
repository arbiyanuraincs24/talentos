import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LayoutDashboard, Brain, History, LogOut } from "lucide-react";

import AuthContext from "../context/AuthContext.jsx";
import "./Navbar.css";


function Navbar() {


  const { logout } = useContext(AuthContext);


  const navigate = useNavigate();

  const location = useLocation();



  const handleLogout = () => {

    logout();

    navigate("/");

  };



  return (

    <nav className="navbar">



      <div className="logo">


        <Link 
          to="/dashboard" 
          className="logo-link"
        >

          TalentOS

        </Link>


      </div>





      <div className="nav-links">



        <Link

          to="/dashboard"

          className={
            location.pathname === "/dashboard"
            ? "active"
            : ""
          }

        >

          <LayoutDashboard size={18}/>

          Dashboard

        </Link>






        <Link

          to="/setup-interview"

          className={
            location.pathname === "/setup-interview"
            ? "active"
            : ""
          }

        >

          <Brain size={18}/>

          Interview

        </Link>







        <Link

          to="/history"

          className={
            location.pathname === "/history"
            ? "active"
            : ""
          }

        >

          <History size={18}/>

          History

        </Link>







        <button

          className="logout-btn"

          onClick={handleLogout}

        >

          <LogOut size={18}/>

          Logout

        </button>





      </div>



    </nav>


  );


}


export default Navbar;