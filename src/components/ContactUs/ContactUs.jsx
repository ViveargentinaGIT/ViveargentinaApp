import { Fragment } from "react";
import './ContactUs.css';
import Navbar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { getLsUser, contactUs } from "./../../redux/action.js"
import { useDispatch } from "react-redux";
import NavBarUser from "../NavBarUser/NavBarUser";
import { useSelector } from 'react-redux';
import Footer from "../Footer/Footer";
import { useHistory } from 'react-router-dom'


export default function ContactUs() {
  const dispatch = useDispatch()
  let userAuth = useSelector((state) => state.userAuth)
  const history = useHistory()

  const [state, setState] = useState({
    email: "",
    message: "",
    name: "",
    lastName: ""
  })

  useEffect(() => {
    dispatch(getLsUser())
  }, [])

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {
      e.stopPropagation();
      dispatch(contactUs({
        name: state.name,
        lastName: state.lastName,
        email: state.email,
        message: state.message
      }))
      history.push("/home")
    }
    e.preventDefault();
  }

  return (
    <Fragment>
      {userAuth === false ?
        <Navbar /> :
        <NavBarUser />
      }
      <div class="containContact">

        <div class="wrapperContact">

  <div class="formContact">
    <h4>GET IN TOUCH</h4>
    <h2 class="form-headlineContact">Send us a message</h2>
    <form id="submit-form" action="" >
      <p>
        <input id="name" class="form-control form-inputContact" type="text" name="name" value={state.name} onChange={(e)=>handleChange(e)} placeholder="Your Name*"/>
        <small class="name-error"></small>
      </p>
      <p>
        <input id="email" class="form-control form-inputContact" type="email" name="email" value={state.email} onChange={(e)=>handleChange(e)} placeholder="Your Email*"/>
        <small class="email-error"></small>
      </p>
      <p class="full-width">
        <input id="company-name" class="form-control form-inputContact" type="text" name="lastName" value={state.lastName} onChange={(e)=>handleChange(e)} placeholder="Your Lastname*" required/>
        <small class="name-error"></small>
      </p>
      <p class="full-width">
        <textarea  className="form-control form-inputContact "minlength="20" id="message" cols="30" rows="7" name="message" value={state.message} onChange={(e)=>handleChange(e)} placeholder="Your Message*" required></textarea>
        <small></small>
      </p>
      <p class="full-width">
        <input type="checkbox" id="checkbox" name="checkbox"/> Yes, I would like to receive information about discounts, promotions, packages and experiences available.
      </p>
      <p class="full-width">
        <input type="submit" class="form-control form-inputContact" value="SEND" onClick={(e)=>handleSubmit(e)}/>
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
    </Fragment>
  )
}