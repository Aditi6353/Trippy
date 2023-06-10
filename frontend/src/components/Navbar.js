import React from "react";
import './NavbarStyle.css';
import { NavLink, useNavigate } from 'react-router-dom';
// import { TextField } from "@mui/material";
import { useState, useContext,useEffect } from "react";
import UserContext from "../context/UserContext";



const Navbar = () => {

  const [admin,setadmin]=useState(false);
  const [searchString, setSearchString] = useState("");
  const [key, setkey] = useState(null);
  const searchbaronchange = (e) => {
    setSearchString(e.target.value);
  }
  const { login, setlogin } = useContext(UserContext);
  const logouthandler = () => { setlogin(null); }
  const navigate = useNavigate();
  const searchBtnClick = () => {
    console.log(searchString);
    navigate("/searchdis?search=" + searchString);
  }

  useEffect(()=>{
    if(login!=null && login.admin==true)
    {
      setadmin(true);
    }
    else {
      setadmin(false);
    }
},[login]);
  return (
    <div>
      <div className='NavbarItem' >

        <h2>Trippy</h2>
        <NavLink to="/" >Home</NavLink>
        {!admin ?
          <>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/service">Service</NavLink>
          </> : <></>
        }
        {admin ?
          <>
            <NavLink to="/placelist">Placelist</NavLink>
          </> : <></>
        }
         {admin ?
          <>
            <NavLink to="/profile">Profile</NavLink>
          </> : <></>
        }
        {login ? (
          <NavLink onClick={logouthandler}>Logout</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )
        }
       
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            onChange={searchbaronchange} value={searchString} />
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={searchBtnClick}>Search</button>
        </form>

      </div>

    </div>
  )
}
export default Navbar;