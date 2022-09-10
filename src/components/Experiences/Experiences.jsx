import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Experiences/Experiences.module.css";
import Swal from "sweetalert2";
import NavBarUser from "../NavBarUser/NavBarUser";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import CreateExperience from "../CreateExperience/CreateExperience";
import FilterExperiences from "../Filters/FilterExperiences";
import Paged from "../Paged/Paged";
import CategoriesExperiences from "./Categories.Experiences";
import {
  getAllExperiences,
  orderExperiences,
  getPackageById, getLsUser
} from "../../redux/action";

export default function Experiences(props) {
  const dispatch = useDispatch();
  const allExperiences = useSelector((state) => state.allExperiences);
  let userAuth = useSelector((state) => state.userAuth);
  const [Order, setOrder] = useState("");
  const { packageId } = props.match.params;

  const [page, setPage] = useState(1);
  const [experiencesPage /* setExperiencesPage */] = useState(6);
  const lastExperiencePage = page * experiencesPage;
  const firstExperiencePage = lastExperiencePage - experiencesPage;

  const showExperiencesPage = allExperiences.slice(
    //.slice sirve para cortar un array y mostrar solo una cantidad de elementos determinada por el parametro que le pasemos (9)
    firstExperiencePage,
    lastExperiencePage
  );



  const paged = function (pageNumber) {
    if (pageNumber !== page) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setPage(pageNumber);
  };

  // Precart

  const [item, setItem] = useState({
    name: "",
    price: 0,
    pax: 1,
    dates: "",
    image: "",
  });

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
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
      console.log(document.getElementById(`${item.name} dates`).value)
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
    dispatch(orderExperiences(e.target.value));
  }

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    dispatch(getLsUser())
    if (packageId) {
      dispatch(getPackageById(packageId));
    } else {
      dispatch(getAllExperiences());
    }
  }, []);

  return (
    <Fragment>
      <div>
        <div className="container-fluid">
          {userAuth === false ? <NavBar /> : <NavBarUser />}
          <SearchBar setPage={setPage} />
          <div>
            <FilterExperiences handleOrder={handleOrder} />
          </div>
          <Paged
            experiencesPage={experiencesPage}
            allExperiences={allExperiences.length}
            paged={paged}
            currentPage={page}
          />

          <br />
          {showExperiencesPage?.map((e) => {
            return showExperiencesPage === [] ? (
              <div className="noExperiences">
                <img src="../images/loading-opaque.gif" alt="Loading..." />
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h2
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "600",
                        color: "#C49D48",
                        fontSize: "24px"
                      }}
                    >
                      {e.name[0].toUpperCase() + e.name.slice(1)}
                    </h2>
                    <h4 style={{ fontSize: "18px", textTransform: "uppercase", fontWeight: "500", fontFamily: "Roboto"}}>{e.subTitle}</h4>
                    <h4 style={{ color:"#C49D48",fontWeight: "700", fontFamily: "Roboto",fontSize: "18px" }}>
                    Score:{e.score}
                      </h4>
                    <p style={{ fontFamily: "Roboto", fontSize: "20px", fontWeight: "300", textAlign:"justify", marginRight:"5vh" }}>{e.description}</p>
                    <div className={styles.priceandcart}>
                      <ul className={styles.iconsexperience}>
                        <li style={{ color: "black", textTransform: "uppercase", fontFamily: "Roboto" }}>
                          ARS
                          <i
                            class="bi bi-currency-dollar"
                            style={{ color: "#C49D48" }}
                          ></i>
                          {e.price}
                        </li>
                        <li style={{ color: "black", textTransform: "uppercase", fontFamily: "Roboto" }}>
                          <i
                            className="bi bi-clock-history"
                            style={{ color: "#C49D48" }}
                          ></i>{" "}
                          {e.duration}
                        </li>
                      </ul>
                      <div className={styles.citybuttons}>
                        {/* Boton Modal */}
                        <button
                          type="button"
                          onClick={() => handleClickPreCart(e.name, e.price, e.image)}
                          className="btn btn-outline-secondary btn-lg"
                          data-bs-toggle="modal"
                          data-bs-target={`#${e.name
                            .toLowerCase()
                            .split(" ")
                            .join("")}`}
                        >
                          <i className="bi bi-cart-check"></i> ADD TO CART!
                        </button>
                        {/* Fin Boton Modal */}
                      </div>

                      {/* Inicio Modal */}
                      <div
                        className="modal modal-lg fade"
                        id={e.name.toLowerCase().split(" ").join("")}
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
                                style={{borderRadius: "8px",boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)"}}
                                src={e.image}
                                alt=""
                              />
                              <div>
                                <i
                                  class="bi bi-heart-fill"
                                  style={{ fontSize: "4vh", paddingTop: "3vh" }}
                                ></i>
                              </div>
                              <div className="mt-5">
                                <h2
                                  className="modal-title"
                                  id={`${e.id}label`}
                                  style={{
                                    color: "#C49D48",
                                    textTransform: "uppercase",
                                    fontSize: "20px"
                                  }}
                                >
                                  {e.name}
                                </h2>
                                <h4 style={{ fontSize: "16px",textTransform: "uppercase", fontWeight: "600" }}>{e.subTitle}</h4>
                              </div>
                              <p  style={{ fontFamily: "Roboto", fontSize: "16px", fontWeight: "300", textAlign:"justify" }}className={styles.modaldescription}>
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
                                      {console.log(e.experiences)}
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
                                      onChange={(event) => handleChange(event)}
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

                                    <p  style={{
                                        color: "black",
                                        fontWeight: "200",
                                        fontFamily: "Roboto",
                                      }} className="text-end">
                                      Please, select date:
                                    </p>
                                  </div>
                                  <div className="col-md-4 text-start">
                                    <select
                                      onChange={(event) => handleChange(event)}
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
                                        fontSize:"18px"
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
                                CANCEL
                              </button>
                              <button
                                onClick={(event) => {
                                  handleClick(event);
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
                  </div>
                  <div className="col-md-6 mb-5">
                    <img style={{borderRadius: "8px",boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.15)"}}className={`img-fluid ${styles.expimgstyle}`} src={e.image} alt="" />
                    {/* <CarouselExperiences /> */}
                  </div>

                  <hr />
                  <br />
                </div>
                <br />
              </div>
            );
          })}
          <div className={styles.experiencesbuttons}>
            <Paged
              experiencesPage={experiencesPage}
              allExperiences={allExperiences.length}
              paged={paged}
              currentPage={page}
            />
          </div>

          <div className={styles.experiencesbuttons}>
            <CreateExperience />
          </div>
          <div className={styles.separator}></div>
          <div className="container">
            <CategoriesExperiences />
          </div>

          <div className={styles.separator}></div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
}
