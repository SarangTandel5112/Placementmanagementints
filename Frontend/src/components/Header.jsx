import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Loginbtncomp from "./Loginbtncomp";
import Logoutbtn from "./Logoutbtn";

function Header(props) {
  const history = useHistory();
  const [isLoggedin, setisLoggedin] = useState(true);
  let logincheck = async () => {

    const loginres = await axios.get("/isloggedin");

    if (loginres.data.loggedin) {

      setisLoggedin(true);
      
    } else {
      setisLoggedin(false);
     
    }
  }
  useEffect(() => {
    logincheck()
    // eslint-disable-next-line
  }, [])
  
 

  return (
    <div className="frontpage">
      <section id="title navcolor">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <b className="navbar-brand brandname mainname">
            <i className="fas fa-user-graduate"></i> DDU Placement
          </b>
          <button
            className="navbar-toggler searchbox"
            type="button"
            data-toggle=""
            data-target=""
            aria-controls=""
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <input
              type="text"
              name="search"
              placeholder="Search.."
              className="searchtext"
            ></input>
            <i className="fas fa-search searchbtn"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                <Link to={props.path}>
                  <button className="nav-link navname coursebtn btn btn-dark">
                    <b className="mainname">Home</b>
                  </button>
                  </Link>
                
              </li> */}

              {/* <li className="nav-item">
                <form method="GET" action="/">
                  <button className="nav-link navname coursebtn btn btn-dark">
                    <b className="mainname">Blog</b>
                  </button>
                </form>
              </li> */}

              {/* <li className="nav-item">
                <form method="GET" action="/">
                  <button className="nav-link navname coursebtn btn btn-dark">
                    <b className="mainname">Contact Us</b>
                  </button>
                </form>
              </li> */}

              <li className="nav-item">
                {isLoggedin ? <Logoutbtn /> : <Loginbtncomp />}
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
}
export default Header;
