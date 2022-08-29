// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import styles from '../Carousel/Carousel.Package.jsx';


export default function CarouselPackage() {

    return (
        <div className="container-fluid">

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a4/7f/10.jpg" className="d-block w-100" alt="Mendoza"/>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a4/7f/10.jpg" className="d-block w-100" alt="Mendoza"/>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a4/7f/10.jpg" className="d-block w-100" alt="Mendoza"/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}