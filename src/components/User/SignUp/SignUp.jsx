import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2";
import styles from '../User.module.css'
import './SignUp.css'
import { registerUser } from "../../../redux/action.js";

function validate(newUser) {
    let emailVerification = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    // let strongPasswordVerification = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let passwordLowerCases = /[a-z]/g;
    let passwordUpperCases = /[A-Z]/g;
    let passwordNumbers = /[0-9]/g;
    let errors = {};
    if (!newUser.first_name) {
        errors.first_name = "Firstname is required"
    }
    if (!newUser.last_name) {
        errors.last_name = "Lastname is required"
    }
    if (!newUser.email) {
        errors.email = "Email is required"
    }
    if (!emailVerification.test(newUser.email)) {
        errors.email = "Invalid email"
    }
    if (!newUser.password) {
        errors.password = "Invalid password"
    }
    if (!newUser.password.match(passwordLowerCases) || !newUser.password.match(passwordUpperCases) || !newUser.password.match(passwordNumbers) || newUser.password.length < 8) {
        errors.password = "Invalid password"
    }
    if (!newUser.repeatedPassword) {
        errors.repeatedPassword = "Passwords do not much"
    }
    if (newUser.password !== newUser.repeatedPassword) {
        errors.repeatedPassword = "Passwords do not much"
    }
    return errors
}

export default function SignUp() {

    let allUsers = useSelector((state) => state.allUsers);
    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeatedPassword: ""
    })
    const [errors, setErrors] = useState({})
    const [viewPassword, setViewPassword] = useState(false)
    const [viewRepeatedPassword, setviewRepeatedPassword] = useState(false)

    useEffect(() => {
        setErrors(validate(newUser))
    }, [])

    function clearState() {
        setNewUser({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            repeatedPassword: ""
        })
        setErrors(validate({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            repeatedPassword: ""
        }));
        let errorMessagesNodeList = document.querySelectorAll("#errors");
        let errorMessagesArray = Array.from(errorMessagesNodeList);
        errorMessagesArray.forEach((e) => { return (e.hidden = true) });
    }

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...newUser,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorMessagesNodeList = document.querySelectorAll("#errors");
        let errorMessagesArray = Array.from(errorMessagesNodeList);
        let mailExists = allUsers.find(u => u.email === newUser.email);
        if (Object.entries(errors).length > 0) {
            e.preventDefault()
            e.stopPropagation()
            errorMessagesArray.forEach(e => e.hidden = false)
        } else if (!mailExists) {
            dispatch(registerUser(newUser))
            setNewUser({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                repeatedPassword: ""
            })
            setTimeout(() => {
                return Swal.fire({
                    title: "THANKS FOR SIGNING UP!",
                    text: 'Check your email to validate your account',
                    imageUrl: "https://res.cloudinary.com/dblc1bzmx/image/upload/v1663188984/VivaArg/Alerts/passagerAlert_hxpidz.png",
                    imageWidth: 350,
                    imageHeight: 300,
                    confirmButtonColor: "#C49D48",
                    imageAlt: "Custom image",
                });
            }, 500)
        } else {
            setNewUser({
                ...newUser,
                email: ""
            })
            setErrors(validate({
                ...newUser,
                email: ""
            }
            ));
            let errorMessagesNodeList = document.querySelectorAll("#errors");
            let errorMessagesArray = Array.from(errorMessagesNodeList);
            errorMessagesArray.forEach((e) => { return (e.hidden = true) });
            return Swal.fire({
                title: 'This email is already in use',
                imageUrl: 'https://res.cloudinary.com/dblc1bzmx/image/upload/v1663190222/VivaArg/Alerts/passagerAlert_1_nejegh.png',
                imageWidth: 350,
                imageHeight: 300,
                confirmButtonColor: "#C49D48",
                imageAlt: "Custom image",
            });
        }
    }

    const handleViewPassword = (e) => {
        e.preventDefault()
        if (viewPassword) {
            document.getElementById("password").type = "password"
            setViewPassword(false)

        }
        if (!viewPassword) {
            document.getElementById("password").type = "text"
            setViewPassword(true)
        }
    }

    const handleViewRepeatedPassword = (e) => {
        e.preventDefault()
        if (viewRepeatedPassword) {
            document.getElementById("repeatedPassword").type = "password"
            setviewRepeatedPassword(false)

        }
        if (!viewRepeatedPassword) {
            document.getElementById("repeatedPassword").type = "text"
            setviewRepeatedPassword(true)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {/* Inicio boton para abrir el modal */}
                    <div>
                        <button type="button" className={`btn btn-outline-secondary  ${styles.registerbutton}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Sign Up <i class="bi bi-person-lines-fill"></i>
                        </button>
                    </div>
                    {/* Fin boton para abrir el modal */}

                    {/* Inicio modal */}
                    <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" style={{
                            borderRadius: "10px",
                            boxShadow: "0px 0px 8px 5px rgba(0, 0, 0, .4)"
                        }}>
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 style={{ fontSize: "20px" }} className="modal-title" id="exampleModalLabel">PLEASE SIGN UP</h5>
                                    <svg width="150" height="121" viewBox="0 0 173 140" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M100.671 1.01033C87.1863 3.45795 72.837 11.2921 65.9389 23.4175C58.3634 36.7275 51.6681 45.3803 40.7846 52.3798C30.3934 59.0662 9.188 66.5023 2.39541 84.1691C-6.06351 106.167 10.7032 125.414 35.7761 133.456C63.7943 142.446 111.913 143.999 145.78 116.642C178.893 89.8929 176.548 52.648 165.564 33.4062C150.334 6.72569 119.122 -2.34145 100.671 1.01033Z" fill="black" fill-opacity="0.04"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M41.8345 25.4369C41.8345 21.5709 44.9685 18.4006 48.8345 18.4006H126.241C130.107 18.4006 133.241 21.5346 133.241 25.4006V74.6913V88.764V92.2822V95.8003V99.3185V102.837V106.355V109.873V113.391V116.909V120.428V123.946C133.241 127.812 130.107 130.982 126.241 130.982H48.8345C44.9685 130.982 41.8345 127.848 41.8345 123.982V74.6913V46.5459V43.0278V39.5096V35.9914V32.4733V28.9551V25.4369Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M41.8345 25.4369C41.8345 21.5709 44.9685 18.4006 48.8345 18.4006H126.241C130.107 18.4006 133.241 21.5346 133.241 25.4006V74.6913V88.764V92.2822V95.8003V99.3185V102.837V106.355V109.873V113.391V116.909V120.428V123.946C133.241 127.812 130.107 130.982 126.241 130.982H48.8345C44.9685 130.982 41.8345 127.848 41.8345 123.982V74.6913V46.5459V43.0278V39.5096V35.9914V32.4733V28.9551V25.4369Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M41.8345 116.946V123.982C41.8345 127.848 44.9685 130.982 48.8345 130.982H126.241C130.107 130.982 133.241 127.812 133.241 123.946V120.427V116.909C133.241 120.775 130.107 123.946 126.241 123.946H48.8345C44.9685 123.946 41.8345 120.812 41.8345 116.946Z" fill="#F1F1F1"></path><mask id="path-5-inside-1_185_68411" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M132.491 109.873V106.355H133.991V109.873V113.391H132.491V109.873ZM42.5845 39.5096V43.0278H41.0845V39.5096H42.5845ZM42.5845 43.0278V46.5459V74.6913V124.008C42.5845 127.443 45.3801 130.232 48.8345 130.232H126.241C129.695 130.232 132.491 127.443 132.491 124.008V123.946V120.428V116.909H133.991V120.428V123.946V124.008C133.991 128.276 130.518 131.732 126.241 131.732H48.8345C44.5569 131.732 41.0845 128.276 41.0845 124.008V74.6913V46.5459V43.0278H42.5845ZM48.8345 19.1506C45.3801 19.1506 42.5845 21.9398 42.5845 25.3746V25.4369V28.9551V32.4733V35.9914H41.0845V32.4733V28.9551V25.4369V25.3746C41.0845 21.1061 44.5569 17.6506 48.8345 17.6506H126.241C130.518 17.6506 133.991 21.1061 133.991 25.3746V74.6913V88.764V92.2822V95.8003V99.3185V102.837H132.491V99.3185V95.8003V92.2822V88.764V74.6913V25.3746C132.491 21.9398 129.695 19.1506 126.241 19.1506H48.8345Z"></path></mask><path d="M132.491 106.355V104.855H130.991V106.355H132.491ZM133.991 106.355H135.491V104.855H133.991V106.355ZM133.991 113.391V114.891H135.491V113.391H133.991ZM132.491 113.391H130.991V114.891H132.491V113.391ZM42.5845 43.0278V44.5278H44.0845V43.0278H42.5845ZM42.5845 39.5096H44.0845V38.0096H42.5845V39.5096ZM41.0845 43.0278H39.5845V44.5278H41.0845V43.0278ZM41.0845 39.5096V38.0096H39.5845V39.5096H41.0845ZM42.5845 43.0278H44.0845V41.5278H42.5845V43.0278ZM132.491 116.909V115.409H130.991V116.909H132.491ZM133.991 116.909H135.491V115.409H133.991V116.909ZM41.0845 43.0278V41.5278H39.5845V43.0278H41.0845ZM42.5845 35.9914V37.4914H44.0845V35.9914H42.5845ZM41.0845 35.9914H39.5845V37.4914H41.0845V35.9914ZM133.991 102.837V104.337H135.491V102.837H133.991ZM132.491 102.837H130.991V104.337H132.491V102.837ZM130.991 106.355V109.873H133.991V106.355H130.991ZM133.991 104.855H132.491V107.855H133.991V104.855ZM135.491 109.873V106.355H132.491V109.873H135.491ZM135.491 113.391V109.873H132.491V113.391H135.491ZM132.491 114.891H133.991V111.891H132.491V114.891ZM130.991 109.873V113.391H133.991V109.873H130.991ZM44.0845 43.0278V39.5096H41.0845V43.0278H44.0845ZM41.0845 44.5278H42.5845V41.5278H41.0845V44.5278ZM39.5845 39.5096V43.0278H42.5845V39.5096H39.5845ZM42.5845 38.0096H41.0845V41.0096H42.5845V38.0096ZM44.0845 46.5459V43.0278H41.0845V46.5459H44.0845ZM44.0845 74.6913V46.5459H41.0845V74.6913H44.0845ZM44.0845 124.008V74.6913H41.0845V124.008H44.0845ZM48.8345 128.732C46.2034 128.732 44.0845 126.609 44.0845 124.008H41.0845C41.0845 128.276 44.5567 131.732 48.8345 131.732V128.732ZM126.241 128.732H48.8345V131.732H126.241V128.732ZM130.991 124.008C130.991 126.609 128.872 128.732 126.241 128.732V131.732C130.519 131.732 133.991 128.276 133.991 124.008H130.991ZM130.991 123.946V124.008H133.991V123.946H130.991ZM130.991 120.428V123.946H133.991V120.428H130.991ZM130.991 116.909V120.428H133.991V116.909H130.991ZM133.991 115.409H132.491V118.409H133.991V115.409ZM135.491 120.428V116.909H132.491V120.428H135.491ZM135.491 123.946V120.428H132.491V123.946H135.491ZM135.491 124.008V123.946H132.491V124.008H135.491ZM126.241 133.232C131.341 133.232 135.491 129.11 135.491 124.008H132.491C132.491 127.443 129.695 130.232 126.241 130.232V133.232ZM48.8345 133.232H126.241V130.232H48.8345V133.232ZM39.5845 124.008C39.5845 129.11 43.7339 133.232 48.8345 133.232V130.232C45.3799 130.232 42.5845 127.443 42.5845 124.008H39.5845ZM39.5845 74.6913V124.008H42.5845V74.6913H39.5845ZM39.5845 46.5459V74.6913H42.5845V46.5459H39.5845ZM39.5845 43.0278V46.5459H42.5845V43.0278H39.5845ZM42.5845 41.5278H41.0845V44.5278H42.5845V41.5278ZM44.0845 25.3746C44.0845 22.7733 46.2034 20.6506 48.8345 20.6506V17.6506C44.5567 17.6506 41.0845 21.1063 41.0845 25.3746H44.0845ZM44.0845 25.4369V25.3746H41.0845V25.4369H44.0845ZM44.0845 28.9551V25.4369H41.0845V28.9551H44.0845ZM44.0845 32.4733V28.9551H41.0845V32.4733H44.0845ZM44.0845 35.9914V32.4733H41.0845V35.9914H44.0845ZM41.0845 37.4914H42.5845V34.4914H41.0845V37.4914ZM39.5845 32.4733V35.9914H42.5845V32.4733H39.5845ZM39.5845 28.9551V32.4733H42.5845V28.9551H39.5845ZM39.5845 25.4369V28.9551H42.5845V25.4369H39.5845ZM39.5845 25.3746V25.4369H42.5845V25.3746H39.5845ZM48.8345 16.1506C43.7339 16.1506 39.5845 20.2723 39.5845 25.3746H42.5845C42.5845 21.94 45.3799 19.1506 48.8345 19.1506V16.1506ZM126.241 16.1506H48.8345V19.1506H126.241V16.1506ZM135.491 25.3746C135.491 20.2723 131.341 16.1506 126.241 16.1506V19.1506C129.695 19.1506 132.491 21.94 132.491 25.3746H135.491ZM135.491 74.6913V25.3746H132.491V74.6913H135.491ZM135.491 88.764V74.6913H132.491V88.764H135.491ZM135.491 92.2822V88.764H132.491V92.2822H135.491ZM135.491 95.8003V92.2822H132.491V95.8003H135.491ZM135.491 99.3185V95.8003H132.491V99.3185H135.491ZM135.491 102.837V99.3185H132.491V102.837H135.491ZM132.491 104.337H133.991V101.337H132.491V104.337ZM130.991 99.3185V102.837H133.991V99.3185H130.991ZM130.991 95.8003V99.3185H133.991V95.8003H130.991ZM130.991 92.2822V95.8003H133.991V92.2822H130.991ZM130.991 88.764V92.2822H133.991V88.764H130.991ZM130.991 74.6913V88.764H133.991V74.6913H130.991ZM130.991 25.3746V74.6913H133.991V25.3746H130.991ZM126.241 20.6506C128.872 20.6506 130.991 22.7733 130.991 25.3746H133.991C133.991 21.1063 130.519 17.6506 126.241 17.6506V20.6506ZM48.8345 20.6506H126.241V17.6506H48.8345V20.6506Z" fill="#333333" mask="url(#path-5-inside-1_185_68411)"></path><path d="M101.134 58.2524C101.134 65.7253 95.052 71.7928 87.5377 71.7928C80.0234 71.7928 73.9414 65.7253 73.9414 58.2524C73.9414 50.7795 80.0234 44.712 87.5377 44.712C95.052 44.712 101.134 50.7795 101.134 58.2524Z" fill="#C49D48" stroke="white" stroke-width="3"></path><ellipse cx="87.5377" cy="58.2524" rx="15.0963" ry="15.0404" stroke="#333333" stroke-width="1.5"></ellipse><path d="M80.3794 65.2715V64.479C80.3794 62.3212 82.1351 60.572 84.3009 60.572H90.7534C92.9306 60.572 94.6955 62.3304 94.6955 64.4994V65.2919" stroke="#333333" stroke-width="1.5"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M87.5438 48.622C90.2061 48.622 92.3644 50.7723 92.3644 53.4248C92.3644 56.0773 90.2061 58.2276 87.5438 58.2276C84.8814 58.2276 82.7231 56.0773 82.7231 53.4248C82.7231 50.7723 84.8814 48.622 87.5438 48.622Z" stroke="#333333" stroke-width="1.5"></path><path d="M62.9695 81.6654H112.106" stroke="#333333" stroke-width="1.5" stroke-linecap="square"></path><path d="M62.9695 90.6321H112.106" stroke="#333333" stroke-width="1.5" stroke-linecap="square"></path><path d="M62.9695 99.5987H112.106" stroke="#333333" stroke-width="1.5" stroke-linecap="square"></path><path d="M86.0268 112.115H112.106" stroke="#333333" stroke-width="1.5" stroke-linecap="square"></path><path d="M106.576 12.0778H100.991C99.316 6.26101 93.9345 1.96161 87.5376 1.96161C81.1406 1.96161 75.7591 6.26101 74.0837 12.0778H68.4991C66.4176 12.0778 64.6914 13.7976 64.6914 15.8714V25.9877C64.6914 30.8435 68.7022 34.8394 73.576 34.8394H101.499C106.373 34.8394 110.384 30.8435 110.384 25.9877V15.8714C110.384 13.7976 108.658 12.0778 106.576 12.0778Z" fill="white"></path><path d="M99.55 12.493L99.8625 13.5778H100.991H106.576C107.834 13.5778 108.884 14.6313 108.884 15.8714V25.9877C108.884 30.0098 105.55 33.3394 101.499 33.3394H73.576C69.5254 33.3394 66.1914 30.0098 66.1914 25.9877V15.8714C66.1914 14.6313 67.2407 13.5778 68.4991 13.5778H74.0837H75.2127L75.5251 12.493C77.0211 7.29907 81.8293 3.46161 87.5376 3.46161C93.2459 3.46161 98.054 7.29907 99.55 12.493Z" fill="#C49D48" stroke="white" stroke-width="3"></path><ellipse cx="87.5379" cy="12.779" rx="2.82692" ry="2.81645" stroke="#333333" stroke-width="1.5"></ellipse><path d="M106.576 12.0778H100.991C99.316 6.26101 93.9345 1.96161 87.5376 1.96161C81.1406 1.96161 75.7591 6.26101 74.0837 12.0778H68.4991C66.4176 12.0778 64.6914 13.7976 64.6914 15.8714V25.9877C64.6914 30.8435 68.7022 34.8394 73.576 34.8394H101.499C106.373 34.8394 110.384 30.8435 110.384 25.9877V15.8714C110.384 13.7976 108.658 12.0778 106.576 12.0778Z" stroke="#333333" stroke-width="1.5"></path></svg>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearState}></button>
                                </div>

                                <div className="modal-body">
                                    <form class="row g-3" onSubmit={(e) => handleSubmit(e)}>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label className="infoLabel">FIRSTNAME </label>
                                                <input
                                                    class="form-control form-inputContact"
                                                    type="text"
                                                    value={newUser.first_name}
                                                    name="first_name"
                                                    placeholder="John"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.first_name ?
                                                    <p id="errors" hidden>{errors.first_name}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                            <div class="col-md-6">
                                                <label className="infoLabel">LASTNAME </label>
                                                <input
                                                    class="form-control form-inputContact"
                                                    className="form-control form-inputContact"
                                                    type="text"
                                                    value={newUser.last_name}
                                                    name="last_name"
                                                    placeholder="Wick"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.last_name ?
                                                    <p id="errors" hidden>{errors.last_name}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <label className="infoLabel">E-MAIL </label>
                                                <input
                                                    class="form-control form-inputContact"
                                                    type="text"
                                                    value={newUser.email}
                                                    name="email"
                                                    placeholder="johnwick@gmail.com"
                                                    onChange={(e) => handleChange(e)} />
                                                {errors.email ?
                                                    <p id="errors" hidden>{errors.email}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12-signup">
                                                <label className="infoLabel">PASSWORD                                                 {
                                                    viewPassword ? <button onClick={(e) => handleViewPassword(e)} class="bi bi-eye-slash-fill"></button> : <button onClick={(e) => handleViewPassword(e)} class="bi bi-eye-fill"></button>
                                                }</label>
                                                <input
                                                    id="password"
                                                    class="form-control form-inputContact"
                                                    type="password"
                                                    value={newUser.password}
                                                    name="password"
                                                    placeholder="At least a lowercase, an uppercase, a number and 8 characters"
                                                    onChange={(e) => handleChange(e)} />

                                                {errors.password ?
                                                    <p id="errors" hidden>{errors.password}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12-signup">
                                                <label className="infoLabel">REPEAT PASSWORD {
                                                    viewRepeatedPassword ? <button onClick={(e) => handleViewRepeatedPassword(e)} class="bi bi-eye-slash-fill"></button> : <button onClick={(e) => handleViewRepeatedPassword(e)} class="bi bi-eye-fill"></button>
                                                }</label>
                                                <input
                                                    id="repeatedPassword"
                                                    class="form-control form-inputContact"
                                                    type="password"
                                                    value={newUser.repeatedPassword}
                                                    name="repeatedPassword"
                                                    placeholder="Repeat your Password"
                                                    onChange={(e) => handleChange(e)} />
                                                
                                                {errors.repeatedPassword ?
                                                    <p id="errors" hidden>{errors.repeatedPassword}</p> :
                                                    <p className="validMessage">Looks Good!</p>
                                                }
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="column">
                                                <button className="btn btn-outline-secondary" style={{ fontSize: "15px", fontFamily: "Raleway", backgroundColor: "#C49D48", borderColor: "#C49D48", borderRadius: "5px", width: "100%" }} type="submit" id="closemodal" aria-label="Close">SIGN UP</button>
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
    )

}