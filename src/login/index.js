import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import '../signup/signup.css'


function Login() {
    const axios = require('axios');
    let navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [validationMsg, setValidationMsg] = useState({
        email: "",
        password: ""
    });
    const [validation, setValidation] = useState({
        email: true,
        password: true
    })
    const [fetched, setFetched] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }
    const checkValidation = () => {
        if (values.email === "") {
            setValidationMsg({ ...validationMsg, email: "Field can not be empty" })
            setValidation(
                {
                    email: false,
                    password: true
                }
            )
            return false
        }
        else if (values.password === "") {
            setValidationMsg({ ...validationMsg, password: "Field can not be empty" })
            setValidation(
                {
                    email: true,
                    password: false
                }
            )
            return false
        }
        else if (!values.email.includes('.com')) {
            setValidationMsg({ ...validationMsg, email: "Enter valid email address" })
            setValidation(
                {
                    email: false,
                    password: true
                }
            )
        }
        else {
            setValidation({
                email: true,
                password: true
            })
            return true
        }

    }
    const LoginForm = () => {
        axios.post('http://3.140.210.76:8000/api/token/', values)
            .then(function (response) {
                console.log(response);
                setFetched(true)
                setError(false)
                setLoading(false)
                navigate("/welcome")
            })
            .catch(function (error) {
                console.log(error);
                setFetched(true)
                setError(true)
                setLoading(false)
            });
    }
    return (
        <div className="signup_page flex">
            {fetched ?
                <div className="errorMsg flex">
                    {error ? <p style={{ color: "red" }}>Invalid Login Details</p> : <p style={{ color: "green" }}>Logged in</p>}
                </div> :
                <></>}

            <div className="form_container flex" style={{ height: "50%" }}>
                <form action="" className="form flex">
                    <input type="email" name="email" value={values.email} onChange={handleInputChange} className='input' placeholder='Email' />
                    {validation.email ? <></> : <p className='validationMsg'>{validationMsg.email}</p>}
                    <input type="password" name="password" value={values.password} onChange={handleInputChange} className='input' placeholder='Password' />
                    {validation.password ? <></> : <p className='validationMsg'>{validationMsg.password}</p>}
                    {loading ?
                        <ClipLoader color="green" loading={loading} size={30} /> :
                        <button
                            onClick={(event) => {
                                event.preventDefault();
                                if (checkValidation()) {
                                    setLoading(true);
                                    LoginForm();
                                }
                            }}>Login</button>}
                </form>
                <p
                    onClick={() => {
                        navigate("/");
                    }}
                    className='loginRedirection'><u>Go to Signup page</u></p>
            </div>
        </div>
    );
}

export default Login;