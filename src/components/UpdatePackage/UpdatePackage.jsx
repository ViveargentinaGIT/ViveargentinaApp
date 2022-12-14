// import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import styles from "../CreateExperience/CreateExperience.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios';
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { updatePackage, getAllCities } from "../../redux/action";

function validate(newExperience) {
  let errors = {};
  if (!newExperience.name) {
    errors.name = "Name is required";
  }
  if (!newExperience.subTitle) {
    errors.subTitle = "Subtitle is required";
  }
  if (!newExperience.price) {
    errors.price = "Price is required";
  }
  if (newExperience.price < 0) {
    errors.price = "Price cannot be less than 0";
  }
  if (typeof newExperience.price !== "number") {
    errors.price = "Price must be a number";
  }
  if (!newExperience.duration) {
    errors.duration = "Duration is required";
  }
  if (!newExperience.dates) {
    errors.dates = "At least 1 date is required";
  }
  if (!newExperience.description) {
    errors.description = "Description is required";
  }
  if (!newExperience.cityId) {
    errors.cityId = "City is required";
  }
  if (!newExperience.image) {
    errors.image = "Image is required";
  }
  return errors;
}

export default function UpdatePackage({
  name,
  id,
  subTitle,
  description,
  price,
  duration,
  dates,
  cityId,
  image,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const allCities = useSelector((state) => state.allCities);

  const [newPackage, setNewPackage] = useState({
    name: name,
    subTitle: subTitle,
    price: price,
    description: description,
    image: image,
    duration: duration,
    dates: dates,
    cityId: cityId,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCities());
    setErrors(validate(newPackage));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "price") {
      setNewPackage({
        ...newPackage,
        [e.target.name]: parseInt(e.target.value),
      });
      setErrors(
        validate({
          ...newPackage,
          [e.target.name]: parseInt(e.target.value),
        })
      );
    } else {
      setNewPackage({
        ...newPackage,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...newPackage,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMessagesNodeList = document.querySelectorAll("#errors");
    let errorMessagesArray = Array.from(errorMessagesNodeList);
    if (Object.entries(errors).length > 0) {
      e.preventDefault();
      e.stopPropagation();
      errorMessagesArray.forEach((e) => (e.hidden = false));
    } else {
      console.log(id);
      dispatch(updatePackage(newPackage, id));
      console.log(newPackage)
    }
  };

  let imageDB;
  const uploadImage = (selectedImage) => {
    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('upload_preset', 'fftkpmfl')
    Axios.post('https://api.cloudinary.com/v1_1/dblc1bzmx/image/upload', formData).then((res) => {
      imageDB = (res.data.url)
      setNewPackage({
        ...newPackage,
        image: imageDB
      });
      console.log(imageDB)
      console.log(res)
    })
  }

  const handleImageSelected = (e) => {
    console.log(e.target.files[0])
    let selectedImage = e.target.files[0]
    uploadImage(selectedImage)
    setErrors(validate({
      ...newPackage,
      image: e.target.files[0].name
    }))
  }

  return (
    <div>
      <div className={styles.separator}></div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.modalbuttons}>
              <button
                className="btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#cexampleModal${id}`}
              >
                <i class="bi bi-pencil-square"></i>
              </button>
            </div>

            <div
              className="modal modal-lg fade"
              id={`cexampleModal${id}`}
              tabIndex="-1"
              aria-labelledby="cexampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{ marginTop: "90px" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="cexampleModalLabel">
                      UPDATE PACKAGE
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
                        <div class="col-md-6">
                          <label className="infoLabel">NAME</label>
                          <input
                            className="form-control form-inputContact"
                            type="text"
                            value={newPackage.name}
                            name="name"
                            placeholder="Excursion to Las Cataratas del Iguazu"
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.name ? (
                            <p id="errors" hidden>
                              {errors.name}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                        <div class="col-md-6">
                          <label className="infoLabel">SUBTITLE </label>
                          <input
                            className="form-control form-inputContact"
                            type="text"
                            value={newPackage.subTitle}
                            name="subTitle"
                            placeholder="Get wet"
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.subTitle ? (
                            <p id="errors" hidden>
                              {errors.subTitle}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div
                            style={{
                              flexWrap: "nowrap",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                            class="input-group"
                          >
                            <label
                              style={{ paddingRight: "5px" }}
                              class="col-sm-2"
                              className="infoLabel"
                            >
                              PRICE
                            </label>
                            <span
                              style={{ height: "41px", fontSize: "16px" }}
                              class="input-group-text"
                            >
                              $
                            </span>
                            <input
                              style={{ width: "100%" }}
                              type="number"
                              class="col-sm-2"
                              className="form-control form-inputContact"
                              value={newPackage.price}
                              name="price"
                              placeholder="7500"
                              onChange={(e) => handleChange(e)}
                            />
                            {errors.price ? (
                              <p id="errors" hidden>
                                {errors.price}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>

                          <div
                            style={{
                              flexWrap: "nowrap",
                              alignItems: "center",
                              paddingTop: "22px",
                            }}
                            class="input-group"
                          >
                            <label
                              style={{ paddingRight: "5px" }}
                              class="col-sm-2"
                              className="infoLabel"
                            >
                              DURATION
                            </label>
                            <input
                              // style={{width:"100%"}}
                              type="text"
                              class="col-sm-2"
                              className="form-control form-inputContact"
                              value={newPackage.duration}
                              name="duration"
                              placeholder="3 hours"
                              onChange={(e) => handleChange(e)}
                            />
                            {errors.duration ? (
                              <p id="errors" hidden>
                                {errors.duration}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>

                          <div
                            style={{
                              flexWrap: "nowrap",
                              alignItems: "center",
                              paddingTop: "22px",
                            }}
                            class="input-group"
                          >
                            <label
                              style={{ paddingRight: "5px" }}
                              class="col-sm-2"
                              className="infoLabel"
                            >
                              DATES
                            </label>
                            <input
                              // style={{width:"100%"}}
                              type="text"
                              class="col-sm-2"
                              className="form-control form-inputContact"
                              value={newPackage.dates}
                              name="dates"
                              placeholder="23/05/2023, 08/03/2023"
                              onChange={(e) => handleChange(e)}
                            />
                            {errors.dates ? (
                              <p id="errors" hidden>
                                {errors.dates}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>
                        </div>
                        <div class="col">
                          <label className="infoLabel">DESCRIPTION </label>
                          <textarea
                            style={{ height: "150px", fontSize: "12px" }}
                            class="form-control form-inputContact"
                            className="infoInput"
                            type="text"
                            value={newPackage.description}
                            name="description"
                            placeholder="A journey through the Cataratas..."
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.description ? (
                            <p id="errors" hidden>
                              {errors.description}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                      </div>
                      <div class="row-md-6"></div>
                      <div class="row">
                        <div class="col-md-6">
                          <select
                            onChange={(e) => handleChange(e)}
                            name="cityId"
                            // value={newPackage.cityId}
                            class="form-select form-select-lg mb-3"
                          >
                            <option selected>SELECT A CITY</option>
                            {allCities?.map((c) => {
                              return <option value={c.id}>{c.name}</option>;
                            })}
                          </select>
                          {errors.cityId ? (
                            <p id="errors" hidden>
                              {errors.cityId}
                            </p>
                          ) : (
                            <p className="validMessage">Looks Good!</p>
                          )}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label className="infoLabel">IMAGE </label>
                          <div class="input-group mb-3">
                            <input
                              style={{ minHeight: "0px" }}
                              type="file"
                              className="form-control form-inputContact"
                              // value={newPackage.image}
                              name="image"
                              onChange={(e) => handleImageSelected(e)}
                            />
                            {errors.image ? (
                              <p id="errors" hidden>
                                {errors.image}
                              </p>
                            ) : (
                              <p className="validMessage">Looks Good!</p>
                            )}
                          </div>
                        </div>
                        <div
                          class="col-md-6"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <button
                            style={{
                              fontSize: "1.6vh",
                              fontFamily: "Raleway",
                              backgroundColor: "#C49D48",
                              borderColor: "#C49D48",
                              borderRadius: "5px",
                              width: "100%",
                              marginTop: "8px",
                              marginRight: "0px",
                            }}
                            type="submit"
                          >
                            UPDATE PACKAGE
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.separator}></div>
    </div>
  );
}
