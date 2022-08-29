import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCities } from "../../redux/action";

import City from '../City/City'
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';

import styles from '../Cities/Cities.module.css';


export default function Card() {
  let prevId = 1;
  const dispatch = useDispatch();
  const allCities = useSelector((state) => state.allCities);

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);


  return (
    <Fragment>
      <NavBar />
      <SearchBar />
      <div className="container-fluid">


        <br />

        <div className="allcities">
          {allCities?.map((e) => {
            return (
              allCities === [] ? (
                <div className="noCities">
                  <img src="../images/loading-opaque.gif" alt="Loading..." />
                </div>
              ) : (
                <div className="eachCity" key={prevId++}>

                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-heading">
                              <button className="accordion-button collapsed" className ={styles.city01} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                {e.name}

                              </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                              <div className="accordion-body">
                                <City
                                  subtitle={e.subTitle}
                                  score={e.score}
                                  description={e.description}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}

        </div>
      </div>
    </Fragment>
  );
}