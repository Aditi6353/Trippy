import axios from "axios";
import React, { useEffect, useState } from "react";
import './NavbarStyle.css';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const itemsPerPage = 3;

const Service = () => {
  const [carddetails, setcarddetails] = useState([

  ]);
  // { index: 1, key: "MountAbu", disc: "Mount-Abu", cimg: "./images/a4.png" },
  // { index: 2, key: "KedarNath", disc: "KedarNath", cimg: "./images/a1.png" },
  // { index: 3, key: "UdaiPur", disc: "UdaiPur", cimg: "./images/a7.png" },
  // { index: 4, key: "Thailand", disc: "Thailand", cimg: "./images/p4.png" },
  // { index: 5, key: "Manali", disc: "Manali", cimg: "./images/a5.png" },
  // { index: 6, key: "Dubai", disc: "Dubai", cimg: "./images/a2.png" }



  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index range for the current page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  // Get the items to display on the current page
  // const currentItems = carddetails.slice(firstIndex, lastIndex);
  const [currentItems, setcurrentItems] = useState(carddetails.slice(firstIndex, lastIndex));
  // Handle page navigation

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios.post("http://localhost:10001/getallplace", {}).then((res) => {
      console.log(res.data.placedata);
      setcarddetails(res.data.placedata);
      //   console.log(carddetails);
      //   const lastIndex = currentPage * itemsPerPage;
      // const firstIndex = lastIndex - itemsPerPage;
      //setcurrentItems(carddetails.slice(firstIndex, lastIndex));

    })
      .catch((error) => { console.log(error) });
  }, [])

  useEffect(() => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    setcurrentItems(carddetails.slice(firstIndex, lastIndex));
  }, [currentPage, carddetails])


  useEffect(() => {
    // setTimeout(()=>{
    //   document.getElementById("card_dis1").style.backgroundImage = 'url("./images/p15.png")';
    // },200)
    document.getElementById("body_id").style.backgroundImage = 'url("./images/p15.png")';
    document.getElementById("body_id").style.backgroundSize = "contain";
  })
  const [sortby, setsortby] = useState("-");


  const sortplaces = (event) => {
    setsortby(event.target.value);
    if (event.target.value == "a-z") {
      currentItems.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
      currentItems.sort((a, b) => b.name.localeCompare(a.name));
    }
    console.log(currentItems);
    //setcarddetails(carddetails);
    setcurrentItems(currentItems);
  };

  const navigate = useNavigate();
  const clickimgcard = (key) => {
    // const key = e.target.id;
    console.log(key);
    navigate("/carddis?key=" + key);
  }
  // let card_details = [{ index: 1, key: "MountAbu", disc: "Mount-Abu", cimg: "./images/a4.png" },
  // { index: 2, key: "KedarNath", disc: "KedarNath", cimg: "./images/a1.png" },
  // { index: 3, key: "UdaiPur", disc: "UdaiPur", cimg: "./images/a7.png" },
  // { index: 4, key: "Thailand", disc: "Thailand", cimg: "./images/p4.png" },
  // { index: 5, key: "Manali", disc: "Manali", cimg: "./images/a5.png" },
  // { index: 6, key: "Dubai", disc: "Dubai", cimg: "./images/a2.png" }
  // ]
  // { index: 6, key: "card6", disc: "abcdefghijkl" }
  let list = currentItems.map((obj) => {
    return <div className="col" onClick={() => clickimgcard(obj.name)} key={obj.name} id={obj.name} >
      <div className="card container center mb-5 ">
        <img src={obj.image} className="bd-placeholder-img card_img_margin mt-3 " width="500" height="500" />
        <div className="card-body">
          <p className="card-text text-dark text-sm">{obj.name}</p>
        </div>
      </div>
    </div>
  })
  {/* <div key={obj.id} id={obj.id} onClick={() => this.handleClick(obj.id)}></div>   */ }
  return (
    <div >
      <div className="py-5 text-center container service_edit">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto ">
            <h1>Service</h1>
          </div>
        </div>
      </div>

      <div className="card-dis">

        <div className="py-5 bg-body-tertiary m-5">


          <div className="container text-dark "><h1>Popular Places</h1></div>
          <div className="d-flex mr-2 ">
            <Box>
              <div className="h4 mt-4 ">
                Total Places: {carddetails.length}
              </div>
            </Box>
            <Box className="ml-auto ">
              
              <select class="form-select" aria-label="Default select example"
                onChange={sortplaces}
              >
                <option selected>Select</option>
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
              </select>
            </Box>

          </div>
          {/* card */}
          <div className="row row-cols-1 row-cols-md-3 mt-0">
            {/* return list */}

            {list}
          </div>

          {/* Pagination buttons */}
          <div>
            {/* Previous Page Button */}
            <ArrowCircleLeftOutlinedIcon
              fontSize="large"
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) {
                  goToPage(currentPage - 1);
                }
              }
              }


            />

            {/* Page numbers */}
            {Array.from({ length: Math.ceil(carddetails.length / itemsPerPage) }).map(
              (_, index) => (
                <button className="btn btn-primary rounded-circle roundedbtn mx-1 "
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </button>
              )
            )}

            {/* Next Page Button */}
            <ArrowCircleRightOutlinedIcon
              fontSize="large"
              disabled={currentPage === Math.ceil(carddetails.length / itemsPerPage)}
              onClick={() => {
                if (Math.ceil(carddetails.length / itemsPerPage) > currentPage) {
                  goToPage(currentPage + 1);
                }
              }}
            />

          </div>

          {/* static content */}
          {/* <div className="col" onClick={clickimgcard} id="card1">
                <div className="card container center mb-5 ">
                  <img src="./images/p12.png" className="bd-placeholder-img card_img_margin mt-3 " width="500" height="500" />
                  <div className="card-body">
                    <p className="card-text text-dark text-sm">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div> */}

          {/* <div className="col" onClick={clickimgcard} key="card2">
                <div className="card container center mb-5 ">
                  <img src="./images/p12.png" className="bd-placeholder-img card_img_margin mt-4 " width="500" height="500" />
                  <div className="card-body">
                    <p className="card-text text-dark text-sm">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
              <div className="col" onClick={clickimgcard} key="card3">
                <div className="card container center mb-5 ">
                  <img src="./images/p12.png" className="bd-placeholder-img card_img_margin mt-4 " width="500" height="500" />
                  <div className="card-body">
                    <p className="card-text text-dark text-sm">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
              <div className="col" onClick={clickimgcard} key="card4">
                <div className="card container center mb-5 ">
                  <img src="./images/p12.png" className="bd-placeholder-img card_img_margin mt-4 " width="500" height="500" />
                  <div className="card-body">
                    <p className="card-text text-dark text-sm">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
              <div className="col" onClick={clickimgcard} key="card5">
                <div className="card container center mb-5 ">
                  <img src="./images/p12.png" className="bd-placeholder-img card_img_margin mt-4 " width="500" height="500" />
                  <div className="card-body">
                    <p className="card-text text-dark text-sm">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div>
              <div className="col" onClick={clickimgcard} key="card6">
                <div className="card container center mb-5 ">
                  <img src="./images/p12.png" className="bd-placeholder-img card_img_margin mt-4 " width="500" height="500" />
                  <div className="card-body">
                    <p className="card-text text-dark text-sm">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                </div>
              </div> */}

        </div>

      </div>

    </div>

  )
}
export default Service;