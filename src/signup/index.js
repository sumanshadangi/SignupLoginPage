import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import './signup.css'


function SignUp() {
    const axios = require('axios');
    let navigate = useNavigate();
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });
    const [validationMsg, setValidationMsg] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });
    const [validation, setValidation] = useState({
        first_name: true,
        last_name: true,
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
        if (values.first_name === "") {
            setValidationMsg({ ...validationMsg, first_name: "Field can not be empty" })
            setValidation({
                first_name: false,
                last_name: true,
                email: true,
                password: true
            })
            return false
        }
        else if (values.last_name === "") {
            setValidationMsg({ ...validationMsg, last_name: "Field can not be empty" })
            setValidation({
                first_name: true,
                last_name: false,
                email: true,
                password: true
            })
            return false
        }
        else if (values.email === "") {
            setValidationMsg({ ...validationMsg, email: "Field can not be empty" })
            setValidation(
                {
                    first_name: true,
                    last_name: true,
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
                    first_name: true,
                    last_name: true,
                    email: true,
                    password: false
                }
            )
            return false
        }
        else if (/\d/.test(values.first_name)) {
            setValidationMsg({ ...validationMsg, first_name: "First Name cannot contain number" })
            setValidation({
                first_name: false,
                last_name: true,
                email: true,
                password: true
            })
            return false
        }
        else if (/\d/.test(values.last_name)) {
            setValidationMsg({ ...validationMsg, last_name: "Last Name cannot contain number" })
            setValidation({
                first_name: true,
                last_name: false,
                email: true,
                password: true
            })
            return false
        }
        else if (!values.email.includes('.com')) {
            setValidationMsg({ ...validationMsg, email: "Enter valid email address" })
            setValidation(
                {
                    first_name: true,
                    last_name: true,
                    email: false,
                    password: true
                }
            )
            return false
        }
        else if (values.password.length < 8) {
            setValidationMsg({ ...validationMsg, password: "password should contain atleast 8 characters" })
            setValidation(
                {
                    first_name: true,
                    last_name: true,
                    email: true,
                    password: false
                }
            )
            return false
        }
        else {
            setValidation({
                first_name: true,
                last_name: true,
                email: true,
                password: true
            })
            return true
        }

    }
    const SubmitForm = () => {
        axios.post('http://3.140.210.76:8000/api/user', values)
            .then(function (response) {
                console.log(response);
                setFetched(true)
                setError(false)
                setLoading(false)
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
                    {error ? <p style={{ color: "red" }}>Submission Failed</p> : <p style={{ color: "green" }}>Submission Successful</p>}
                </div> :
                <></>}

            <div className="form_container flex">
                <form action="" className="form flex">
                    <input type="text" name="first_name" value={values.first_name} onChange={handleInputChange} className='input' placeholder='First Name' />
                    {validation.first_name ? <></> : <p className='validationMsg'>{validationMsg.first_name}</p>}
                    <input type="text" name="last_name" value={values.last_name} onChange={handleInputChange} className='input' placeholder='Second Name' />
                    {validation.last_name ? <></> : <p className='validationMsg'>{validationMsg.last_name}</p>}
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
                                    SubmitForm();
                                }
                            }}>Submit</button>}
                </form>
                <p
                    onClick={() => {
                        navigate("/login");
                    }}
                    className='loginRedirection'><u>Go to login page</u></p>
            </div>
        </div>
    );
}

export default SignUp;