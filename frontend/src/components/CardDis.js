import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import authService from "../service/auth.service";
const CardDis = () => {

  const place1 = {
    title: 'Place',
    image: './images/a7.png',
    description: 'Place description...',
    route: 'Route information...',
    packages: 'Travel packages information...',
  };
  const location = useLocation();
  const [allplaces, setallplaces] = useState([]);
  const [place, setplace] = useState({});
  const [key, setkey] = useState(null);

  const filter_array = () => {
  }
  const getparam = () => {
    const queryParams = new URLSearchParams(location.search);
    const key1 = queryParams.get('key');
    console.log("get param called");
    setkey(key1);
    axios.post("http://localhost:10001/getplace", { name: key1.toLowerCase() }).then((res) => { setplace(res.data.result);
    console.log(res);
  })
      .catch((error) => { console.log(error) });
  }

  useEffect(() => {
    document.getElementById("body_id").style.backgroundImage = 'url("#")';
    document.getElementById("body_id").style.backgroundSize = "contain";
    getparam();
  }, [])
  return (

    <div>
      <div className="container">
        {place?<div>
        <h1 className="m-5 text-uppercase"> {place.name}</h1>

        <div >
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg p-1">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-success m-2 h3">Description</strong>

              <p class="mb-auto h5 text-left">{place.description}</p>

            </div>
            <div class="col-auto d-none d-lg-block pr-0 ">
              <img class="bd-placeholder-img" width="700" height="500" src={place.image} alt={place.title} />
            </div>
          </div>
        </div>
        <h2>Route</h2>
        <p>{place.route}</p>
        <h2>Packages</h2>
        <p>{place.package}</p>
        </div>: <div>Data is not Availabel</div>
        }
      </div>
    </div>
  )
};

export default CardDis