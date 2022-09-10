import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import perfil_user from "../../assets/perfil_user.png";

import MyTrips from "../User/MyTrips";
import MyFavs from "../User/MyFavs";




// Ruta agregada en App. js --> Route path="/userprofile"
// Agrego un Link de Prueba en NavBar.jsx para entrar a Profile y probar el state de User Info
export default function Profile() {
  let userFromStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    userFromStorage = JSON.parse(localStorage.getItem("user"));
  }, []);

  return (
    <Fragment>
      <section className="vh-100" style={{
        backgroundImage: "url(" + "https://wallpaperaccess.com/full/5775649.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="container py-5 h-100" >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: "8px", boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)" }}>
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem", borderColor: "#C49D48", background: "linear-gradient(to top,  #ffffff 0%,#C49D48 100%)" }}>
                    <img src={userFromStorage.user.photo
                      ? userFromStorage.user.photo
                      : perfil_user}
                      alt="user photo" className="img-fluid my-5" style={{ borderRadius: "50px", width: "80px" }} />
                    <h5 style={{ fontSize: "20px", color: "black", textTransform: "uppercase" }}>{userFromStorage.user.first_name}</h5>
                    <h5 style={{ fontSize: "20px", color: "black", textTransform: "uppercase" }}>{userFromStorage.user.last_name}</h5>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6 style={{ fontSize: "15px", textTransform: "uppercase" }}>My Info</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6 style={{ fontSize: "10px", textTransform: "uppercase" }}>Email</h6>
                          <p className="text-muted" style={{ fontSize: "15px", fontFamily: "Roboto" }}>{userFromStorage.user.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6 style={{ fontSize: "10px", textTransform: "uppercase" }}>Phone</h6>
                          <p style={{ fontSize: "15px", fontFamily: "Roboto" }} className="text-muted">123 456 789</p>
                        </div>
                      </div>
                      <h6 style={{ fontSize: "15px", textTransform: "uppercase" }}>My History</h6>

                      <hr className="mt-0 mb-4" />

                      <div className="column">
                        <Link to="/profile/#myfavs">
                            <button style={{ margin: "0vh 4vh 0vh 4vh" }} className="btn btn-outline-secondary">MY FAVS</button>
                        </Link>
                        <Link to="/profile/#mytrips">
                          <button style={{ margin: "0vh 4vh 0vh 4vh"}} className="btn btn-outline-secondary">MY TRIPS</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="mytrips">
        <MyTrips/>
      </div>
      <div id="myfavs">
        <MyFavs/>
      </div>

    </Fragment>
  );
}
