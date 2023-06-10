
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
// import request from './service/request';
import Service from './components/Service';
import Login from './components/Login';
// import Signup from './components/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import Placelist from './components/Placelist';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import { useState  ,useEffect} from 'react';
import UserContext from './context/UserContext';
import CardDis from './components/CardDis';
import SearchDis from './components/SearchDis';
import Editplace from './components/Editplace';
import Profile from './components/Profile';

function App() {
// const click=()=>alert("click")

const [addplacetemplate, setaddplacetemplate] = useState([{_id:"add",image:"./images/add.png",name:""}]);
const [allplaces, setallplaces] = useState([]);
const [login,setlogin]=useState(false);

useEffect(()=>{
const user=JSON.parse(localStorage.getItem("user"));
if(user!=null){
  setlogin(user);
}
},[])
  return (
    <UserContext.Provider value={{login,setlogin,setallplaces,allplaces,addplacetemplate}}>
  
    <div className="App">
       <Navbar/>
      {/* <header className="App-header"> */}
      
    
        {/* <div className='NavbarItem' >  
        
        <h2>Trippy</h2>    
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/service">Service</NavLink>
        <NavLink to="/login">Login</NavLink>
      
        </div> */}
        <Routes >
          <Route path='/' element={login?<Home/>:<Login/>} />
          <Route path='/about' element={login?<About/>:<Login/>}/>
          <Route path='/contact' element={login?<Contact/>:<Login/>}/>
          <Route path='/service' element={login?<Service/>:<Login/>}/>
          <Route path='/login' element={login?<Login />:<Login/>}/>
          <Route path='/Signup' element={<Signup />}/>
          <Route path='/carddis' element={login?<CardDis />:<Login/>}/>
          <Route path='/searchdis' element={<SearchDis />}/>
          <Route path='/placelist' element={<Placelist />}/>
          <Route path='/editplace' element={login?<Editplace />:<Login/>}/>
          <Route path='/profile' element={login?<Profile />:<Login/>}/>
        </Routes>

  
      {/* </header> */}
   
    </div>
    </UserContext.Provider>
    
  );
}

export default App;
