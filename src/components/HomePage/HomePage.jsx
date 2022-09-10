
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



import { useDispatch } from "react-redux";
import NavBar from '../NavBar/NavBar.jsx';
import Carousel from '../Carousel/Carousel.Home';
import './HomePage.css';
import NavBarUser from '../NavBarUser/NavBarUser.jsx';
import { useSelector } from 'react-redux';
import { getLsUser } from "./../../redux/action.js";
import Footer from '../Footer/Footer.jsx';



function HomePage() {
    const [offSetY, setOffSetY] = useState(0);
    const handleScroll = () => setOffSetY(window.pageYOffset)

    let userAuth= useSelector((state)=>state.userAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLsUser())
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <Fragment>
            <div className='containerHome'>
           { userAuth===false ?
            <NavBar/>:
            <NavBarUser/>
           }
            
                <div className='firstPage'>
                </div>
                
                    <div>
                        <h1 className='mainTitle'style={{transform: `translate(${offSetY * -0.8}px)`}}>
                            One Destination <br />
                            Thousand Experiences
                        </h1>
                        <h3 className='subTitle'style={{transform: `translate(${offSetY *-0.2}px)`}}>
                            Let yourself be enchanted by every corner of this country
                        </h3>
                        <Link to='/packages'>
                            <div className='explore'>
                                <button className="btn btn-outline-secondary">
                                    EXPLORE &#62;&#62;
                                </button>
                            </div>

                        </Link>
                    </div>
                
            </div>
            <div className='cities'>
                
                    <h4 className='citiesTitle'>
                        CITIES
                    </h4>
                    <div>
                    </div>
                    <div className='carousel'>
                        <Link to='/cities'>
                            <Carousel />
                        </Link>
                    </div>
                
            </div>
            <div className='contactUs'>
                
                    <div class="containContact">

                        <div class="wrapperContact">

                            <div class="formContact">
                                <h4>GET IN TOUCH</h4>
                                <h2 class="form-headlineContact">Send us a message</h2>
                                <form id="submit-form" action="">
                                    <p>
                                        <input id="name" class="form-inputContact" type="text" placeholder="Your Name*" />
                                        <small class="name-error"></small>
                                    </p>
                                    <p>
                                        <input id="email" class="form-inputContact" type="email" placeholder="Your Email*" />
                                        <small class="name-error"></small>
                                    </p>
                                    <p class="full-width">
                                        <input id="company-name" class="form-inputContact" type="text" placeholder="Your Lastname*" required />
                                        <small></small>
                                    </p>
                                    <p class="full-width">
                                        <textarea minlength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
                                        <small></small>
                                    </p>
                                    <p class="full-width">
                                        <input type="checkbox" id="checkbox" name="checkbox" checked /> Yes, I would like to receive information about discounts, promotions, packages and experiences available..
                                    </p>
                                    <p class="full-width">
                                        <input type="submit" class="submit-btnContact" value="Submit" onclick="checkValidations()" />

                                    </p>
                                </form>
                            </div>

                            <div class="contacts contact-wrapperContact">

                                <ul>
                                    <li>We have connected more than 10,000 people with unforgettable experiences! how can we help you?</li>
                                    <span class="hightlight-contact-infoContact">
                                        <li class="email-infoContact"><i class="fa fa-envelopeContact" aria-hidden="true"></i> vaviveargentina@gmail.com</li>
                                        <li><i class="fa fa-phone" aria-hidden="true"></i> <span class="highlight-textContact">+91 11 1111 2900</span></li>
                                    </span>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>

                
            </div>
        <Footer/>
        </Fragment>
    )
}

export default HomePage