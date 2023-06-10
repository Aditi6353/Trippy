 import React,{useEffect} from "react";
 import './Contactpage.css';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import authService from '../service/auth.service';

//  import {useNavigate} from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  useEffect(()=>{
            document.getElementById("body_id").style.backgroundImage='url("./images/p6.png")';
            document.getElementById("body_id").style.backgroundSize = "cover";
          })
          var initialValues = {
            firstName: "",
            lastName:"",
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
          // const navigate=useNavigate();
const handleSubmit=(values)=>
{
  console.log("values", values);
  authService.create(values).then((res)=>
  {
    // navigate("/login");
    console.log(res);
    toast.success("Successfull");
 
  }).catch((error)=>{ console.log(error)})
};
  return (
    <>
  
      < Formik initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
      >
      <Form > 
     <div class="wrapper">
        <div class="container main ">
            <div class="row row1">
                <div class="col-md-6 side-image">
                    <img src="./images/p5.png" alt="" className="img_src_12"/>
                    
                </div>
                <div class="col-md-6 right">


                     <div class="input-box">
                        <header><h3 >Contact Us</h3></header>
                        <div class="input-field">
                        <Field type="text" name="firstName" placeholder="Enter Your First-Name" className="form-control"/>
                        <p className="text-danger"><ErrorMessage name="firstName"/> </p>
                        </div>

                        <div class="input-field">
                        <Field type="text" name="lastName" placeholder="Enter Your Last-Name" className="form-control"/>
                        <p className="text-danger"><ErrorMessage name="lastName"/> </p>
                        </div>

                        <div class="input-field">
                        <Field type="text" name="email" placeholder="Enter Email Address" className="form-control"/>
                        <p className="text-danger"><ErrorMessage name="email"/> </p>
                        </div>

                        <div class="input-field">
                        <Field type="password" name="password" placeholder="Enter Password" className="form-control"/>
                        <p className="text-danger"><ErrorMessage name="password"/> </p>
                        </div>

                        {/* <div class="input-field"> */}
                        {/* <Field type="text" name="confirm_password" placeholder="Enter confirm_password" className="form-control"/>
                        <p className="text-danger"><ErrorMessage name="confirm_password"/> </p> */}
                        {/* </div> */}

                        <div class="input-field">
                        <Field component="select" name="roleId" placeholder="Enter Your Name" className="form-control">
                        <option value="" disabled>Please Select</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        </Field>
                        <p className="text-danger"><ErrorMessage name="roleId"/> </p>
                        </div>

                        {/* <div class="">
                        
                        <label className="form-line"> 
                        <Field type="checkbox" name="termsAndcondi "/>
                            I accept terms and conditions
                        </label>
                        <p className="text-danger"><ErrorMessage name="termsAndcondi"/> </p>
                        </div> */}

                        <div class="input-field" className="btn12">
                            <input type="submit" class="submit" value="Submit"/>
                            
                        </div>
                       
                     </div>
                </div>
            </div>
        </div>
    </div> 
      <ToastContainer />
    </Form>
    </Formik>
    </>
  );
};



export default Contact;