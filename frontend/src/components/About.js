import React,{useEffect} from "react";
import './Aboutpage.css';

// import about_img from "../images/tvl.png";
const About=()=>
{
    useEffect(()=>{
        document.getElementById("body_id").style.backgroundImage='url("./images/p16.png")';
        document.getElementById("body_id").style.backgroundSize="cover";
        // document.getElementById("body_id").style.height="100vh";
        // document.getElementById("body_id").style.width="100vw";
      })
    return (


    <div class="container"> 
 
    
              
                    <div class="about-contact">
                            <h1>About</h1>
                            {/* <p>“Travel is the main thing you purchase that makes you more extravagant”. We, at ‘Organization Name’, swear by this and put stock in satisfying travel dreams that make you perpetually rich constantly.

We have been moving excellent encounters for a considerable length of time through our cutting-edge planned occasion bundles and other fundamental travel administrations. We rouse our clients to carry on with a rich life, brimming with extraordinary travel encounters.

Through our exceptionally curated occasion bundles, we need to take you on an adventure where you personally enjoy the stunning magnificence of America and far-off terrains. We need you to observe sensational scenes that are a long way past your creative ability.

</p> */}
                            {/* <a href="" class="read-more">Read more</a> */}
                    </div>
        
    </div>
    
    )
}

export default About;