// import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarouselCity from '../Carousel/Carousel.City'
import styles from './City.module.css';


export default function Card(city) {

    const { name, subtitle, score, description, image, id } = city;

    return (
        <div class="container-fluid">

            <div class="container">
                <div class="row">
                    <div class ="col-md-6"
                            >
                        <CarouselCity 
                        image= {image}
                        name={name}
                        />
                    </div>
                    <div class="col-md-6">

                        <h2
                        style={{
                        textTransform: "uppercase",
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#C49D48",}}>
                        {name}</h2>

                        <h4 style={{ fontSize: "18px",textTransform: "uppercase", fontWeight: "500", fontFamily: "Roboto" }}>{subtitle}</h4>

                        <ul style={{color:"#C49D48",fontSize: "18px",fontWeight: "500", fontFamily: "Roboto" }}className={styles.scorecity}>
                            Score:{score}
                            {/*                                  
                                    <li><i class="bi bi-star-fill" Style="color:#C49D48" ></i></li>
                                    <li><i class="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i class="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i class="bi bi-star-fill"Style="color:#C49D48"></i></li>
                                    <li><i class="bi bi-star"></i></li>   
                             */}


                        </ul>
                        <p style={{ fontFamily: "Roboto", fontSize: "18px", fontWeight: "300", textAlign:"justify" }}> {description}</p>
                        <Link to={'/packages/'+id}>
                            <div className={styles.citybuttons}>
                                <button style={{ marginTop: "0rem 0rem 1rem 0rem ", fontWeight: "500" }}type="button" class="btn btn-outline-secondary btn-lg">View all {name} packages</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );

}