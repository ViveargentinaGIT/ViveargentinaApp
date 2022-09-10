import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { registerUser } from "../../redux/action";
import { useDispatch } from "react-redux";

export default function Register() {

    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);

    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const handleChange = (e) => {
        setNewUser({
          ...newUser,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        dispatch(registerUser({first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, password: newUser.password}))
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    {/* Inicio boton para abrir el modal */}
                    <div>
                        <button type="button" className="btn btn-outline-secondary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" style = {{textTransform:"uppercase", fontFamily: "Raleway", borderColor:"#C49D48",color:" #C49D48",fontSize: "18px" }}>
                            Register <i class="bi bi-person-lines-fill"></i>
                        </button>
                    </div>
                    {/* Fin boton para abrir el modal */}

                    {/* Inicio modal */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 style={{fontSize: "20px"}}className="modal-title" id="exampleModalLabel">PLEASE REGISTER</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">

                                    {/* Inicio Form */}

                                    <Form as={Col} md="12" noValidate validated={validated} onSubmit={handleSubmit} >

                                        <Row className="mb-1">

                                            <Form.Group as={Col} md="6" controlId="validationCustom01">

                                                <Form.Label>NAME</Form.Label>
                                                <Form.Control required type="text" name="first_name" value={newUser.first_name} onChange={(e)=>handleChange(e)} placeholder="John" />

                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                            
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">

                                                <Form.Label>LASTNAME</Form.Label>
                                                <Form.Control required type="text" name="last_name" value={newUser.last_name} onChange={(e)=>handleChange(e)} placeholder="Wick" />

                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>


                                        <Row className="mb-1">

                                            <Form.Group as={Col} md="12" controlId="validationCustom02">

                                                <Form.Label><i class="bi bi-envelope-fill"></i> EMAIL</Form.Label>
                                                <Form.Control required type="email" name="email" value={newUser.email} onChange={(e)=>handleChange(e)} placeholder="name@example.com" />

                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid email.
                                                </Form.Control.Feedback>

                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row>

                                        {/* <Row className="mb-1">

                                            <Form.Group as={Col} md="12" controlId="validationCustom02">

                                                <Form.Label>Repeat Email</Form.Label>
                                                <Form.Control required type="email" placeholder="name@example.com" />

                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid email.
                                                </Form.Control.Feedback>

                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Row> */}

                                        <Row className="mb-1">

                                            <Form.Group as={Col} md="12" controlId="formGroupPassword">

                                                <Form.Label htmlFor="inputPassword5"><i class="bi bi-key-fill"></i> PASSWORD</Form.Label>

                                                <Form.Control required type="password" name="password" value={newUser.password} onChange={(e)=>handleChange(e)} id="inputPassword5" aria-describedby="passwordHelpBlock" />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Your password must be 8-20 characters long, contain letters and numbers,
                                                    and must not contain spaces, special characters, or emoji.
                                                </Form.Text>
                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>

                                        <Row className="mb-1">

                                            <Form.Group as={Col} md="12" controlId="formGroupPassword">

                                                <Form.Label htmlFor="inputPassword5"><i class="bi bi-key-fill"></i>REPEAT PASSWORD</Form.Label>

                                                <Form.Control required type="password" name="repeatPassword" value={newUser.repeatPassword} onChange={(e)=>handleChange(e)} id="inputPassword5" aria-describedby="passwordHelpBlock" />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Your password must be the same as the one above.
                                                </Form.Text>
                                                <Form.Control.Feedback>
                                                    Looks good!
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Check
                                                required
                                                label="Agree to terms and conditions"
                                                feedback="You must agree before submitting."
                                                feedbackType="invalid"
                                            />
                                        </Form.Group>

                                        <Row className="mb-3">
                                            <Button type="submit" onClick={(e)=>handleSubmit(e)} data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{fontSize: "2vh", fontFamily:"Raleway", backgroundColor: "#C49D48", borderColor: "#C49D48" }}>REGISTER</Button>
                                        </Row>

                                    </Form>
                                    {/* Fin Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fin modal */}
                </div>
            </div>
        </div>
    )
}