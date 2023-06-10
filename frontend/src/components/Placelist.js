import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import UserContext from '../context/UserContext';

const Placelist = () => {
  const { allplaces, setallplaces ,addplacetemplate,} = useContext(UserContext);

  useEffect(() => {
    axios.post("http://localhost:10001/getallplace", {}).then((res) => {
      // setplace(res.data.result);
      console.log(res.data.placedata);
      var margearr = addplacetemplate;
       margearr = margearr.concat(res.data.placedata);
      setallplaces(margearr);

    })
      .catch((error) => { console.log(error) });
  }, [])
  const navigate = useNavigate();
  const clickimgcard = (key) => {
    // const key = e.target.id;
    console.log(key);
    navigate("/Editplace?key=" + key);
  }


  let list = allplaces.map((obj) => {
    return <div className="col" onClick={() => clickimgcard(obj._id)} key={obj._id} >
      <div className="card container center mb-5 ">
        <img src={obj.image} className="bd-placeholder-img card_img_margin mt-3 " width="500" height="500" />
        <div className="card-body">
          <p className="card-text text-dark text-sm">{obj.name}</p>
        </div>
      </div>
    </div>
  })
  return (
    <div>
      <div className="row row-cols-1  row-cols-md-3 mt-0">
        {/* return list */}

        {list}
      </div>
      <div>

      </div>

    </div>
  );
}
export default Placelist;