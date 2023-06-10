import React, { useEffect, useState, useContext } from "react";
import './Loginpage.css';
// import './Signup.js';
// import Signup from './components/Signup.js';
import authService from '../service/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import UserContext from "../context/UserContext";
import axios from "axios";

const Login = () => {

  useEffect(() => {
    document.getElementById("body_id").style.backgroundImage = 'url("./images/p9.png")';
    document.getElementById("body_id").style.backgroundSize = "cover";
  })

  const { login, setlogin } = useContext(UserContext);
  var initialValues = {

    email: "",
    password: "",

  };
  var signUpSchema = Yup.object({

    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),

  });
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log("values", values);
    authService.login(values).then((res) => {
      console.log(res);
      var admin = false;
      if (values.email == "adi@gmail.com") {
        admin = true;
      }
      const user = { email: res.email, admin: admin, id: res.id, firstName: res.firstName, lastName: res.lastName, time: Date.now() };
      setlogin(user);
      updateuserlogin(user);
      localStorage.setItem("user",JSON.stringify(user));
      toast.success("Successfull");
      navigate("/");
    }).catch((error) => { console.log(error) });
  };
  const updateuserlogin = (user) => {
    axios.post("http://localhost:10001/uli", { user }).then((res) => {

    }).catch((error) => { console.log(error) });
  }
  return (
    <>

      < Formik initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        <Form >

          <div>

            <div className="center">

              <h1>Login</h1>

              <div className="txt_field">
                <Field type="text" name="email" placeholder="Enter Email Address" />
                <p className="text-danger"><ErrorMessage name="email" /> </p>
              </div>
              <div className="txt_field">
                <Field type="password" name="password" placeholder="Enter Password" />
                <p className="text-danger"><ErrorMessage name="password" /> </p>
              </div>
              <div className="pass">Forgot Password?</div>


              <Button type="submit" variant="contained" size="medium" className="login mr-2" >Login</Button>
              <Link to="/Signup" >
                Not a member? Sign
              </Link>

            </div>
          </div>

          <ToastContainer />
        </Form>
      </Formik>
    </>
  );
};



export default Login;