import { Fragment } from "react";
import './ContactUs.css';
import Navbar from "../NavBar/NavBar";


export default function ContactUs() {
  return(
  <Fragment>			
  <Navbar />	
<div className="containContact">

<div className="wrapperContact">

  <div className="formContact">
    <h4>GET IN TOUCH</h4>
    <h2 className="form-headlineContact">Send us a message</h2>
    <form id="submit-form" action="">
      <p>
        <input id="name" className="form-inputContact" type="text" placeholder="Your Name*"/>
        <small className="name-error"></small>
      </p>
      <p>
        <input id="email" className="form-inputContact" type="email" placeholder="Your Email*"/>
        <small className="name-error"></small>
      </p>
      <p className="full-width">
        <input id="company-name" className="form-inputContact" type="text" placeholder="Your Lastname*" required/>
        <small></small>
      </p>
      <p className="full-width">
        <textarea  minlength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
        <small></small>
      </p>
      <p className="full-width">
        <input type="checkbox" id="checkbox" name="checkbox" checked/> Yes, I would like to receive information about discounts, promotions, packages and experiences available..
      </p>
      <p className="full-width">
        <input type="submit" className="submit-btnContact" value="Submit" onclick="checkValidations()"/>
        
      </p>
    </form>
  </div>

  <div className="contacts contact-wrapperContact">

    <ul>
      <li>We have connected more than 10,000 people with unforgettable experiences! how can we help you?</li>
      <span className="hightlight-contact-infoContact">
        <li className="email-infoContact"><i className="fa fa-envelopeContact" aria-hidden="true"></i> vaviveargentina@gmail.com</li>
        <li><i className="fa fa-phone" aria-hidden="true"></i> <span className="highlight-textContact">+91 11 1111 2900</span></li>
      </span>
    </ul>
  </div>
</div>
</div>

  </Fragment>
    )
}