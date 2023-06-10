import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useLocation ,useNavigate} from 'react-router-dom';
import authService from "../service/auth.service";
import UserContext from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import './Editplacepage.css';
const Editplace = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { allplaces, setallplaces } = useContext(UserContext);
  const [place, setplace] = useState({});
  const [key, setkey] = useState(null);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [route, setroute] = useState("");
  const [price, setprice] = useState("");
  const [imgdata, setimgdata] = useState("");



  const getparam = () => {
    console.log("get paarm =");
    const queryParams = new URLSearchParams(location.search);
    const key1 = queryParams.get('key');
    console.log("get param called", key1);
    setkey(key1);
    if (key1 != "add") {
      axios.post("http://localhost:10001/getplacebyid", { _id: key1 }).then((res) => {

        console.log(res);

        try {
          setplace(res.data.placedata);
          setname(res.data.placedata.name);
          setdescription(res.data.placedata.description);
          setprice(res.data.placedata.package);
          setroute(res.data.placedata.route);
          setimgdata(res.data.placedata.image);
        }
        catch (e) {
          console.log(e);
        }

      })
        .catch((error) => { console.log(error) });
    }

  }

  useEffect(() => {
    document.getElementById("body_id").style.backgroundImage = 'url("#")';
    document.getElementById("body_id").style.backgroundSize = "cover";
    getparam();
  }, [])

  const uploadInputRef = useRef(null);
  const imageResultRef = useRef(null);
  const uploadLabelRef = useRef(null);

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        //imageResultRef.current.src = e.target.result;
        setimgdata(e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  function handleUploadChange() {
    const file = uploadInputRef.current.files[0];
    const fileSizeInBytes = file.size;
  const maxSizeInBytes = 200 * 1024; // 200KB

  if (fileSizeInBytes > maxSizeInBytes) {
    // File size exceeds the limit, show an error message or take appropriate action
    alert('File size exceeds the limit (200KB). Please choose a smaller file.');
    return;
  }
    readURL(uploadInputRef.current);

    var fileName = uploadInputRef.current.files[0].name;
    // uploadLabelRef.current.textContent = 'File name: ' + fileName;
  }
  const insertplacedata = () => {
    var data = { name: name, description: description, image: imgdata, route: route, package: price };
    axios.post("http://localhost:10001/insertdata", { data: data }).then((res) => {
      console.log(res);
      if(res.data.status==1){
        toast.success(" Save Data Successfully");
      }
      else{
        toast.error("Already Saved");
      }
    }).catch((e)=>{console.log(e)});
  }

  const updatehandler=()=>{
    var data = { name: name, description: description, image: imgdata, route: route, package: price ,  _id: key };
    axios.post("http://localhost:10001/updatedata", { data: data }).then((res) => {
      console.log(res);
      if(res.data.status==1){
        toast.success(" Update Data Successfully");
      }
      else{
        toast.error("Already Updated");
      }
    }).catch((e)=>{console.log(e)});
  }
  const deletehandler=()=>{
    var data = {_id: key };
    axios.post("http://localhost:10001/deletedata", { data: data }).then((res) => {
      console.log(res);
      if(res.data.status==1){
        alert(" Delete Data Successfully");
        navigate("/placelist");
      }
      else{
        toast.error("Already Delete");
      }
    }).catch((e)=>{console.log(e)});
  }
  return (
    <div>
      <div className="container">

        <input className="m-5 text-uppercase h1" value={name} onChange={(event) => {
          setname(event.target.value);
        }} />
        <div >
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg p-1">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-success m-2 h3">Description</strong>


              <textarea class="mb-auto h5 text-left" value={description} rows="20" onChange={(e) => { setdescription(e.target.value) }
              } />

            </div>
            <div class="col-auto d-none d-lg-block pr-0 ">

              <div className="row text-center">
                <label ref={uploadLabelRef}></label>
              </div>

              <div className="row">
                <img class="bd-placeholder-img" width="700" height="500" src={imgdata} alt={name} ref={imageResultRef} />
              </div>

              <div className="row mt-4">
                <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm ">
                  <input
                    id="upload"
                    type="file"
                    onChange={handleUploadChange}
                    ref={uploadInputRef}
                    className="form-control border-0"
                  />
                  <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">
                    Choose file
                  </label>
                  <div className="input-group-append">
                    <label htmlFor="upload" className="btn btn-light m-0 rounded-pill px-4">
                      <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                      <small className="text-uppercase font-weight-bold text-muted">Choose file</small>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>Route</h2>
        <input className="mx-5 text-uppercase my-2 h5" value={route} onChange={(event) => {
          setroute(event.target.value);
        }} />

        <h2>Package</h2>
        <div><input className="mx-5 text-uppercase my-2 h5" value={price} onChange={(event) => {
          setprice(event.target.value);
        }} />
        </div>
        {/* <div onChange={(e) => { setprice(e.target.value) }}>{price}</div> */}
        {key == "add" ? <div className="btn btn-success btn-lg" onClick={insertplacedata}>Save</div>
          : <>

            <div className="btn btn-success btn-lg" onClick={updatehandler}>Save</div>
            <div className="btn btn-danger ml-3 btn-lg" onClick={deletehandler}>Delete</div>
          </>

        }
      </div >
      <ToastContainer />
    </div >

  )
};

export default Editplace