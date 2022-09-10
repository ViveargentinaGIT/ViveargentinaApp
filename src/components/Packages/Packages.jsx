import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import styles from "../Packages/Packages.module.css";
import NavBar from "../NavBar/NavBar";
import NavBarUser from "../NavBarUser/NavBarUser";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import FilterPackages from "../../components/Filters/FilterPackages";
import { getAllPackages, getCityById, orderPackages } from "../../redux/action";
import { useHistory } from "react-router-dom";
import { getLsUser } from "./../../redux/action.js"

export default function Card(props) {
  let prevId = 1;
  const history = useHistory();
  let pathName = history.location.pathname;
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);

  const [Order, setOrder] = useState("");
  const { cityId } = props.match.params;

  // Precart

  const [item, setItem] = useState({
    name: "",
    price: 0,
    pax: 1,
    dates: "",
    image: "",
  });

  const handleChange = (e, name, price, image) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      name,
      price,
      image
    });
  };

  const handleClickPreCart = (name, price, image) => {
    setItem({
      ...item,
      name: name,
      image: image,
      price: price,
    })
  }

  const handleClick = () => {
    if (document.getElementById(`${item.name} passengers`).value <= 0) {
      return Swal.fire({
        title: "You must add at least one passenger",
        text: item.name,
        imageUrl: item.image,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
    if (document.getElementById(`${item.name} dates`).value === 'select') {
      return Swal.fire({
        title: "You must select a date to continue",
        text: item.name,
        imageUrl: item.image,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }

    let arrayItemsStore = JSON.parse(localStorage.getItem("items"));
    // console.log(document.getElementById('dates').value)
    if (arrayItemsStore === null) arrayItemsStore = [];
    if (arrayItemsStore.find(e => e.name === item.name && e.dates === item.dates)) {
      document.getElementById(`${item.name} dates`).value = 'select'
      return Swal.fire({
        title: "You already have this item in your cart",
        text: item.name,
        imageUrl: item.image,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      
    }
    if (!arrayItemsStore.find(e => e.name === item.name && e.dates === item.dates)) {
    arrayItemsStore.push(item);
    localStorage.setItem("items", JSON.stringify(arrayItemsStore));
    // Alert
    document.getElementById(`${item.name} dates`).value = 'select'
    setItem({
      name: "",
      price: 0,
      pax: 1,
      dates: "",
      image: "",
    });
    return Swal.fire({
      title: "Added to cart successfully!",
      text: item.name,
      imageUrl: item.image,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  }
};

  //   Fin Precart

  function handleOrder(e) {
    setOrder(e.target.value);
    console.log(Order);
    dispatch(orderPackages(e.target.value));
  }
  let userAuth = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(getLsUser())
    if (cityId) {
      dispatch(getCityById(cityId));
    } else {
      dispatch(getAllPackages());
    }
  }, [dispatch]);

  return (
    <Fragment>
      <div>
        <div className="container-fluid">
          {userAuth === false ? <NavBar /> : <NavBarUser />}
          <SearchBar />
          <FilterPackages handleOrder={handleOrder} />
          <br />
          {allPackages?.map((e) => {
            return allPackages === [] ? (
              <div className="noPackages">
                <img src="../images/loading-opaque.gif" alt="Loading..." />
              </div>
            ) : (
              <div className="container" key={prevId++}>
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <h2 style={{ textTransform: "uppercase", fontWeight: "600", fontSize: "24px" }} className={styles.titlepackages}>{e.name}</h2>
                      <h4 style={{ textTransform: "uppercase", fontWeight: "700", fontFamily: "Roboto",fontSize: "18px" }}>{e.subTitle}</h4>
                      <h4 style={{ color:"#C49D48",fontWeight: "700", fontFamily: "Roboto",fontSize: "18px" }}>Score: {e.score}</h4>

                      <p style={{ fontFamily: "Roboto", fontSize: "18px", fontWeight: "300", textAlign: "justify", marginRight: "5vh" }}>{e.description}</p>
                    </div>

                    <div className={`row ${styles.pricelist}`}>
                      <div className={`col-md-6 ${styles.citybuttons}`}>
                        <ul className={styles.iconscity}>
                          <li style={{ color: "black", textTransform: "uppercase", fontFamily: "Roboto" }}>
                            <i className="bi bi-clock-history"></i> {e.duration}
                          </li>
                          <li style={{ color: "black", textTransform: "uppercase", fontFamily: "Roboto" }}>
                            <i className="bi bi-currency-dollar"></i> {e.price}{" "}
                            ARS
                          </li>

                        </ul>
                      </div>
                      <div className="col-md-6" style={{ fontWeight: "400", fontFamily: "Roboto" }}>
                        <ul className={styles.iconsexp}>
                          <li className={styles.exptitle}>
                            <i className="bi bi-compass"></i>{" "}
                            {e.experiences ? e.experiences[0].name : null}{" "}
                            <br />
                          </li>
                          <li className={styles.exptitle}>
                            <i className="bi bi-compass"></i>{" "}
                            {e.experiences ? e.experiences[1].name : null}
                            <br />
                          </li>
                          <li className={styles.exptitle}>
                            <i className="bi bi-compass"></i>{" "}
                            {e.experiences ? e.experiences[2].name : null}
                            <br />
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className={`row mt-5 ${styles.explist}`}>
                      <div className="col-md-6">
                        <div className={styles.citybuttons}>
                          {/* Boton Modal */}
                          <button
                            type="button"
                            onClick={() => handleClickPreCart(e.name, e.price, e.image)}
                            className="btn btn-outline-secondary btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target={`#${e.name.split(" ").join("")}`}
                            style={{ fontWeight: "700" }}
                          >
                            <i className="bi bi-cart-check"></i> ADD TO CART!
                          </button>
                          {/* Fin Boton Modal */}
                        </div>

                        {/* Inicio Modal */}
                        <div
                          className="modal modal-lg fade"
                          id={e.name.split(" ").join("")}
                          tabindex="-1"
                          aria-labelledby={`${e.id}label`}
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              {/* Body Modal */}
                              <div className="modal-body">
                                <img
                                  className={`img-fluid ${styles.imgmodalpackages}`}
                                  src={e.image}
                                  alt=""
                                  style={{borderRadius: "8px",boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)"}}
                                />
                                <div>
                                  <i
                                    class="bi bi-heart-fill"
                                    style={{
                                      fontSize: "20px",
                                      paddingTop: "2vh",
                                    }}
                                  ></i>
                                </div>
                                <div className="mt-5">
                                  <h2
                                    className="modal-title"
                                    id={`${e.id}label`}
                                    style={{
                                      color: "#C49D48",
                                      textTransform: "uppercase",
                                      textTransform: "uppercase", fontWeight: "600", fontSize: "20px"
                                    }}
                                  >
                                    {e.name}
                                  </h2>
                                  <h4 style={{ fontSize: "14px",textTransform: "uppercase", fontWeight: "700" }}>{e.subTitle}</h4>
                                </div>
                                <p className={styles.modaldescription} style={{ fontFamily: "Roboto", fontSize: "14px", fontWeight: "300" }}>
                                  {e.description}
                                </p>
                                <div class="mt-5 mb-5">
                                  <div className="row ">
                                    <div className="col-md-12">
                                      <ul className={styles.iconsmodal}>
                                        <li style={{ color: "black", textTransform: "uppercase", fontFamily: "Roboto" }}>
                                          <i className="bi bi-clock-history"></i>{" "}
                                          {e.duration}
                                        </li>
                                        <li style={{ color: "black", fontFamily: "Roboto" }}>
                                          <i className="bi bi-currency-dollar"></i>{" "}
                                          ARS {e.price}
                                        </li>

                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div class="mt-5 mb-5">
                                  <div className="row ">
                                    <div className="col-md-8">
                                      <p style={{
                                        color: "black",
                                        fontWeight: "200",
                                        fontFamily: "Roboto",
                                      }} className="text-end">
                                        Please, select the number of passengers:
                                      </p>
                                    </div>
                                    <div className="col-md-4 text-start">
                                      <input
                                        className={styles.cantpackages}
                                        name="pax"
                                        min="1"
                                        id={`${item.name} passengers`}
                                        type="number"
                                        value={item.pax}
                                        defaultValue="1"
                                        onChange={(event) =>
                                          handleChange(
                                            event,
                                            e.name,
                                            e.price,
                                            e.image,
                                          )
                                        }
                                        style={{
                                          color: "black",
                                          fontWeight: "500",
                                          fontFamily: "Roboto",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col-md-8">
                                      <p style={{
                                        color: "black",
                                        fontWeight: "200",
                                        fontFamily: "Roboto",
                                      }}
                                        className="text-end">
                                        Please, select a date:
                                      </p>
                                    </div>
                                    <div className="col-md-4 text-start">
                                      <select
                                        onChange={(event) =>
                                          handleChange(
                                            event,
                                            e.name,
                                            e.price,
                                            e.image,
                                          )
                                        }
                                        name="dates"
                                        id={`${e.name} dates`}

                                        style={{
                                          color: "black",
                                          fontWeight: "500",
                                          fontFamily: "Roboto",
                                        }}
                                      >
                                        <option value="select" disabled selected>
                                          Select
                                        </option>
                                        {e.dates?.split(",").map((e) => {
                                          return <option value={e}>{e} </option>;
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div class="mt-5 mb-5 text-center">
                                      <div
                                        className="col-md-12"
                                        style={{
                                          color: "black",
                                          fontWeight: "800",
                                          fontFamily: "Roboto",
                                          fontSize:"20px"
                                        }}
                                      >
                                        TOTAL:{" "}
                                        <i className="bi bi-currency-dollar"></i>
                                        ARS {e.price * item.pax < 0 ? 0 : e.price * item.pax}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Footer Modal */}
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    handleClick();
                                  }}
                                  type="button"
                                  className="btn btn-primary"
                                  style={{
                                    backgroundColor: "#C49D48",
                                    borderColor: "#C49D48",
                                    fontSize: "1.5vh",
                                  }}
                                  data-bs-dismiss="modal"
                                >
                                  <i
                                    className="bi bi-cart-check"
                                    style={{ color: "white" }}
                                  ></i>{" "}
                                  ADD TO CART!
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Fin Modal */}
                      </div>

                      <div className="col-md-6">
                        <div className={styles.citybuttons}>
                          <Link to={"/experiences/" + e.id}>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-lg"
                              style={{ fontWeight: "600" }}
                            >
                              {" "}
                              View all included experiences!
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img style={{borderRadius: "8px",boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)"}} className={`img-fluid ${styles.packimgstyle}`} src={e.image} alt="" />
                    {/* <CarouselPackage /> */}
                  </div>
                </div>
                <br />
                <hr />
                <br />
              </div>
            );
          })}
        </div>
        <br />
      </div>
      <Footer/>
    </Fragment>
  );
}
