// import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarouselCity from '../Carousel/Carousel.City'
import styles from './City.module.css';


export default function Card(city) {

    const { name, subtitle, score, description, image } = city;

    return (
        <div className="container-fluid">

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <CarouselCity />
                    </div>
                    <div className="col-md-6">

                        <h2>{name}</h2>

                        <h4>{subtitle}</h4>

                        <ul className={styles.scorecity}>
                            Score= {score}
                            {/*                                  
                                    <li><i className="bi bi-star-fill" Style="color:#C49D48" ></i></li>
                                    <li><i className="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i className="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i className="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i className="bi bi-star"></i></li>   
                             */}


                        </ul>
                        <p> {description}</p>
                        <Link to='/packages'>
                            <div className={styles.citybuttons}>
                                <button type="button" className="btn btn-outline-secondary btn-lg">View all Packages</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );

}