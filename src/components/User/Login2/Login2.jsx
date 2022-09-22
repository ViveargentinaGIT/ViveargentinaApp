import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import Swal from "sweetalert2";
import styles from "../User.module.css";
import "./Login.css";
import "../SignUp/SignUp.css";
import {
  getUserLogin,
  resetPasswordRequest,
  googleLogin,
  getCartByUser,
  getAllUsers,
} from "../../../redux/action";

function validate(newUser) {
  const emailVerification =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  let errors = {};
  if (!emailVerification.test(newUser.email)) {
    errors.email = "Invalid email";
  }
  if (newUser.password.length < 8) {
    errors.password = "Invalid password";
  }
  return errors;
}

export default function Login2() {
  const clientId =
    "1027358109012-bq2hsesgqbm1av81limdn7r7bf6qmpd3.apps.googleusercontent.com";
  const emailVerification =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
  const history = useHistory();
  const dispatch = useDispatch();
  let userBasicInfo = useSelector((state) => state.userBasicInfo);
  let userAuth = useSelector((state) => state.userAuth);
  let allUsers = useSelector((state) => state.allUsers);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [forgot, setForgot] = useState("Forgot your Password?");

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    setErrors(validate(newUser));
    dispatch(getAllUsers());
  }, []);

  const onSuccess = async (res) => {
    const newUser = {
      first_name: res.profileObj.givenName,
      last_name: res.profileObj.familyName,
      email: res.profileObj.email,
      photo: res.profileObj.imageUrl,
      password: res.googleId,
    };
    const response = await dispatch(googleLogin(newUser));
    console.log(response);
    const image =
      typeof response === "string"
        ? "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png"
        : "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png";
    const message =
      typeof response === "string" ? response : "User successfully logged";

    const user = JSON.parse(window.localStorage.getItem("user"));
    await dispatch(getCartByUser(user?.user?.id));

    if (user.user.administrator) {
      history.push("/admin");
    }

    Swal.fire({
      title: message + "!",
      imageUrl: image,
      imageWidth: 350,
      imageHeight: 300,
      confirmButtonColor: "#C49D48",
      imageAlt: "Custom image",
    }).then(() => {
      history.go(0);
    });
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  const requestPasswordChange = (e) => {
    if (emailVerification.test(newUser.email)) {
      dispatch(resetPasswordRequest(newUser.email));
      setForgot("Check your email");
    } else {
      setForgot("Enter a valid email");
    }
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...newUser,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMessagesNodeList = document.querySelectorAll("#errors");
    let errorMessagesArray = Array.from(errorMessagesNodeList);
    let mailExists = allUsers.find((u) => u.email === newUser.email);
    if (Object.entries(errors).length > 0) {
      e.preventDefault();
      e.stopPropagation();
      errorMessagesArray.forEach((e) => (e.hidden = false));
    } else if (!mailExists) {
      return Swal.fire({
        title: "This email is not registered",
        imageUrl:
          "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png",
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
      });
    } else {
      const response = await dispatch(
        getUserLogin({ email: newUser.email, password: newUser.password })
      );
      const user = JSON.parse(window.localStorage.getItem("user"));
      console.log(response);
      console.log(user);
      if (response === "Incorrect password") {
        return Swal.fire({
          title: "Incorrect password",
          imageUrl:
            "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png",
          imageWidth: 350,
          imageHeight: 300,
          confirmButtonColor: "#C49D48",
          imageAlt: "Custom image",
        });
      } else if (response === "Please confirm your email to login") {
        return Swal.fire({
          title: "Please validate your account to log in",
          imageUrl:
            "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png",
          imageWidth: 350,
          imageHeight: 300,
          confirmButtonColor: "#C49D48",
          imageAlt: "Custom image",
        });
      } else if (
        response === "User not allowed, please contact the administrator"
      ) {
        return Swal.fire({
          title: "User not allowed, please contact the administrator",
          imageUrl:
            "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png",
          imageWidth: 350,
          imageHeight: 300,
          confirmButtonColor: "#C49D48",
          imageAlt: "Custom image",
        });
      }
      const image =
        typeof response === "string"
          ? "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png"
          : "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png";
      const message =
        typeof response === "string" ? response : "User successfully logged";
      await dispatch(getCartByUser(user?.user?.id));
      if (user?.user.administrator) history.push("/admin");
      Swal.fire({
        title: message + "!",
        imageUrl: image,
        imageWidth: 350,
        imageHeight: 300,
        confirmButtonColor: "#C49D48",
        imageAlt: "Custom image",
      }).then(() => {
        history.go(0);
      });
    }
  };

  return (
    <div>
      {/* Inicio boton para abrir el modal */}
      <div>
        <button
          type="button"
          className={`btn btn-outline-secondary btn-lg ${styles.registerbutton}`}
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          Log In <i class="bi bi-person-lines-fill"></i>
        </button>
      </div>
      {/* Fin boton para abrir el modal */}

      {/* Inicio modal */}
      <div
        className="modal fade"
        id="loginModal"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 8px 5px rgba(0, 0, 0, .4)",
            }}
          >
            <div style={{ background: "white" }} className="modal-header">
              <h5
                style={{ fontSize: "15px", color: "#C49D48" }}
                className="modal-title"
                id="exampleModalLabel"
              >
                Hello! To continue, enter your email and password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form class="row g-3" onSubmit={(e) => handleSubmit(e)}>
                <div class="row">
                  <div class="col">
                    <label className="infoLabel">
                      {" "}
                      <i class="bi bi-envelope"></i> E-MAIL
                    </label>
                    <input
                      class="form-control form-inputContact"
                      type="text"
                      value={newUser.email}
                      name="email"
                      placeholder="johnwick@gmail.com"
                      onChange={(e) => handleChange(e)}
                    />
                    {
                      errors.email && (
                        <p id="errors" hidden>
                          {errors.email}
                        </p>
                      )
                      // <p className="validMessage">Looks Good!</p>
                    }
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label className="infoLabel">
                      {" "}
                      <i class="bi bi-key"></i> PASSWORD
                    </label>
                    <input
                      class="form-control form-inputContact"
                      type="password"
                      value={newUser.password}
                      name="password"
                      placeholder="Please insert your password"
                      onChange={(e) => handleChange(e)}
                    />
                    {
                      errors.password && (
                        <p id="errors" hidden>
                          {errors.password}
                        </p>
                      )
                      // <p className="validMessage">Looks Good!</p>
                    }
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <a
                      className="forgotButton"
                      onClick={() => requestPasswordChange()}
                    >
                      {forgot}
                    </a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <button
                      className="btn btn-outline-secondary"
                      style={{
                        fontSize: "15px",
                        fontFamily: "Raleway",
                        background: "#C49D48",
                        borderColor: "transparent",
                      }}
                      type="submit"
                      id="closemodal"
                    >
                      LOG IN
                    </button>
                  </div>
                  <div class="col-md-6">
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="LOG IN WITH GOOGLE"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"none"}
                      isSignedIn={false}
                      prompt="select_account"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
