import React from "react";
import styles from "./MyTripDetail.module.css";
import { useDispatch } from "react-redux";
import { updateExperience, updatePackage } from "./../../redux/action.js";

export default function MyTripDetail({ packages, experiences, saleId, user }) {
  const dispatch = useDispatch();

  const scoreExperience = (event, experienceId) => {
    let newScore = { score: event.target.value };

    dispatch(updateExperience(newScore, experienceId));
  };

  const scorePackage = (event, packageId) => {
    let newScore = { score: event.target.value };
    dispatch(updatePackage(newScore, packageId));
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-secondary"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasRight${saleId}`}
        aria-controls="offcanvasRight"
      >
        <i class="bi bi-card-checklist"></i> DETAIL
      </button>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id={`offcanvasRight${saleId}`}
        aria-labelledby="offcanvasRightLabel"
        style={{
          background: "radial-gradient(circle at top, #C49D48 , #ffffff)",
        }}
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            <h4 style={{ fontSize: "30px", color: "white" }}> DETAIL</h4>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {packages?.map((p) => {
            return (
              <div className={`"container" ${styles.itemcart}`}>
                <div className={`"row mt-3 mb-4" ${styles.rowimgtitle}`}>
                  <div className="col-md-4 mb-1 text-start">
                    <img
                      className={`"img-fluid" ${styles.imgitemcart}`}
                      src={p.image}
                      alt=""
                    />
                  </div>
                  <div className="col-md-8 mb-1">
                    <h4 className={styles.titlecart}>{p.name} </h4>
                    <h4 className={`text-start ${styles.datescart}`}>
                      {" "}
                      {p.sale_package.dates}{" "}
                    </h4>
                  </div>
                </div>
                <div className={`row mb-3 mt-3 ${styles.enditemscart}`}>
                  <div className="col-md-6 text-start">
                    {/* <ul className={styles.buttonitemcart}>
                      <li>
                        <div className={styles.itempax}>
                          {" "}
                          {p.sale_package.passengers}{" "}
                        </div>
                      </li>
                    </ul> */}

                    {user === "true" ? (
                      <select
                        id="scoreOrder"
                        onClick={(e) => {
                          scorePackage(e, p.id);
                        }}
                        className={styles.scoreselectdetailtrips}
                      >
                        <option value="sort" disabled selected>
                          Select Score
                        </option>
                        <option value="1">★</option>
                        <option value="2">★★</option>
                        <option value="3">★★★</option>
                        <option value="4">★★★★</option>
                        <option value="5">★★★★★</option>
                      </select>
                    ) : null}
                  </div>
                  <div className="col-md-6 text-start">
                    <h4 className={styles.pricecart}>
                      ARS$ {p.sale_package.total}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
          {experiences?.map((p) => {
            return (
              <div className={`"container" ${styles.itemcart}`}>
                <div className={`"row mt-3 mb-4" ${styles.rowimgtitle}`}>
                  <div className="col-md-4 mb-1 text-start">
                    <img
                      className={`"img-fluid" ${styles.imgitemcart}`}
                      src={p.image}
                      alt=""
                    />
                  </div>
                  <div className="col-md-8 mb-1">
                    <h4 className={styles.titlecart}>{p.name} </h4>
                    <h4 className={`text-start ${styles.datescart}`}>
                      {" "}
                      {p.sale_experience.dates}{" "}
                    </h4>
                  </div>
                </div>
                <div className={`row mb-3 mt-3 ${styles.enditemscart}`}>
                  <div className="col-md-6 text-start">
                    {/* <ul className={styles.buttonitemcart}>
                      <li>
                        <div className={styles.itempax}>
                          {" "}
                          {p.sale_experience.passengers}{" "}
                        </div>
                      </li>
                    </ul> */}
                    {user === "true" ? (
                      <select
                        id="scoreOrder"
                        onClick={(e) => {
                          scoreExperience(e, p.id);
                        }}
                        className={styles.scoreselectdetailtrips}
                      >
                        <option value="sort" disabled selected>
                          Select Score
                        </option>
                        <option value="1">★</option>
                        <option value="2">★★</option>
                        <option value="3">★★★</option>
                        <option value="4">★★★★</option>
                        <option value="5">★★★★★</option>
                      </select>
                    ) : null}
                  </div>
                  <div className="col-md-6 text-start">
                    <h4 className={styles.pricecart}>
                      ARS$ {p.sale_experience.total}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
