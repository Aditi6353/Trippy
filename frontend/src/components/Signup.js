import React, { useEffect } from "react";
import './Signuppage.css';
import { Button } from "@mui/material";
import authService from '../service/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";


const Signup = () => {
  useEffect(() => {
    document.getElementById("body_id").style.backgroundImage = 'url("./images/p9.png")';
    document.getElementById("body_id").style.backgroundSize = "cover";
  })
  var initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // confirm_password: "",
    roleId: "",
    // termsAndcondi:false
  };
  var signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter your first-name"),
    lastName: Yup.string().min(2).max(25).required("Please enter your last-name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    roleId: Yup.number().required("Please enter your gender"),
    // termsAndcondi: Yup.boolean().oneOf([true],"Please enter your gender"),
    // confirm_password: Yup.string()
    //   .required()
    //   .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const handleSubmit = (values) => {
    console.log("values", values);
    authService.create(values).then((res) => {
      // navigate("/login");
      console.log(res);
   toast.success("Successfull");

 }).catch((error)=>{ console.log(error)})
  };

  return (
    <div>
      < Formik initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        <Form >

          <div className="center1">
            <h1>Registration</h1>


            <div class="txt_field">
              <Field type="text" name="firstName" placeholder="Enter Your First-Name" className="form-control" />
              <p className="text-danger"><ErrorMessage name="firstName" /> </p>
            </div>

            <div class="txt_field">
              <Field type="text" name="lastName" placeholder="Enter Your Last-Name" className="form-control" />
              <p className="text-danger"><ErrorMessage name="lastName" /> </p>
            </div>


            <div className="txt_field">
              <Field type="text" name="email" placeholder="Enter Email Address" />
              <p className="text-danger"><ErrorMessage name="email" /> </p>
            </div>

            <div className="txt_field">
              <Field type="password" name="password" placeholder="Enter Password" />
              <p className="text-danger"><ErrorMessage name="password" /> </p>
            </div>

            {/* <div class="input-field"> */}
            {/* <Field type="text" name="confirm_password" placeholder="Enter confirm_password" className="form-control"/>
                        <p className="text-danger"><ErrorMessage name="confirm_password"/> </p> */}
            {/* </div> */}

            <div class="input-field" >
              <Field component="select" name="roleId" placeholder="Enter Your Name" >
                <option value="" disabled>Please Select</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Field>
              <p className="text-danger"><ErrorMessage name="roleId" /> </p>
            </div>

            {/* <div class="">
                        
                        <label className="form-line"> 
                        <Field type="checkbox" name="termsAndcondi "/>
                            I accept terms and conditions
                        </label>
                        <p className="text-danger"><ErrorMessage name="termsAndcondi"/> </p>
                        </div> */}


          
            {/* <input type="submit" value="Login"/> */}
            <Button type="submit" variant="contained" size="medium" className="mr-2 mt-3">Register</Button>
            <Link to="/login" >
                 Already Register ? Login
                 </Link>
                 

          </div>
          <ToastContainer />
        </Form>
      </Formik>
    </div>
  )
}
export default Signup;