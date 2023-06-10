import React, { useEffect, useState } from "react";
import './NavbarStyle.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const Profile = () => {
    var counter=0;
    const [data, setdata] = useState([]);
    useEffect(() => {
        counter=0;
        document.getElementById("body_id").style.backgroundImage = 'url("./images/p9.png")';
        document.getElementById("body_id").style.backgroundSize = "cover";
        axios.post("http://localhost:10001/guli", { data: data }).then((res) => {
            console.log(res);
            if (res.data.status == 1) {
                setdata(res.data.data);
            }
            else {
                toast.error("Data Fetch Failed");
            }
        }).catch((e) => { console.log(e) });

    }, [])
    const gettime =(n)=>{
        const d=new Date(n);
        var s=d.getHours()+":"+d.getMinutes()+":"+ d.getSeconds()+" ("+d.getDate()+ "-"+d.getMonth()+"-"+d.getFullYear()+")";   
        return s;
    } 
    let rows = data.map((obj) => {
        return <tr key={obj._id} >

        <th>{++counter}</th>
        <td>{obj.email}</td>
        <td>{obj.name}</td>
        <td>{gettime(obj.time)}</td>
        </tr>
    })
    return (
        <div className="container mt-3 ">
            <table className="table bg-white">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col" >Last_Login_Time</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <ToastContainer />
        </div>

    )
}
export default Profile;