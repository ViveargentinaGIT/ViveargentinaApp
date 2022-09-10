import React, { Fragment } from "react";
import styles from './User.module.css'


export default function MyTrips() {
    return (
        <Fragment>
            <div style={{margin:"10vh"}} className={`container-fluid ${styles.mytripspage}`}>
                <div className="container">
                    <div className="row mb-3">
                        <h2 className="text-center"><i className={`bi bi-airplane-fill ${styles.tripicon}`}></i> MY TRIPS LIST</h2>
                    </div>
                    {/* INICIO ITEM TRIP */}
                    <div className={`row ${styles.itemmytrips}`}>
                        <div className="col-md-6">
                            <div className="row mt-3 mb-3">
                                <div className="col-sm-2">
                                    <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/c_scale,h_720,q_50/v1661696412/VivaArg/SALTA/PAQUETES/IMPERDIBLES-SALTA/cafayate-salta-argentina-shutterstock_193704581_50e93ff9b4_zj59gz.jpg" alt="" className="img-fluid" />
                                </div>
                                <div className="col-sm-6">
                                    <h2 className="titlepackages">NOT TO BE MISSED IN SALTA</h2>
                                    <h4>WHAT YOU CAN'T MISS</h4>
                                </div>
                                <div className="col-sm-3 text-center">
                                    <p>13-oct-2022</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row mt-3 mb-6">
                                <div className="col-md-3 text-center">
                                    <p>$ 43.000</p>
                                </div>
                                <div className="col-md-3 text-center">
                                    <p>Paid</p>
                                </div>
                                <div className="col-md-6 text-center">
                                    <button type="button" className="btn btn-outline-secondary"><i className="bi bi-trash3-fill"></i> Delete</button>
                                    <button type="button" className="btn btn-secondary"><i className="bi bi-cart"></i> Buy again!</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    {/* FIN ITEM TRIP */}

                    {/* INICIO ITEM TRIP 2*/}
                    <div className={`row ${styles.itemmytrips}`}>
                        <div className="col-md-6">
                            <div className="row mt-3 mb-3">
                                <div className="col-md-2">
                                    <img src="https://res.cloudinary.com/dblc1bzmx/image/upload/c_scale,h_720,q_50/v1661696412/VivaArg/SALTA/PAQUETES/IMPERDIBLES-SALTA/cafayate-salta-argentina-shutterstock_193704581_50e93ff9b4_zj59gz.jpg" alt="" className="img-fluid" />
                                </div>
                                <div className="col-md-6">
                                    <h2 className="titlepackages">NOT TO BE MISSED IN SALTA</h2>
                                    <h4>WHAT YOU CAN'T MISS</h4>
                                </div>
                                <div className="col-md-3 text-center">
                                    <p>13-oct-2022</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row mt-3 mb-3">
                                <div className="col-md-3 text-center">
                                    <p>$ 43.000</p>
                                </div>
                                <div className="col-md-3 text-center">
                                    <p>Paid</p>
                                </div>
                                <div className="col-md-6 text-center">
                                    <button type="button" className="btn btn-outline-secondary"><i className="bi bi-trash3-fill"></i> Delete</button>
                                    <button type="button" className="btn btn-secondary"><i className="bi bi-cart"></i> Buy again!</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    {/* FIN ITEM TRIP 2*/}
                </div>
            </div>
        </Fragment>
    )
}