import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Register() {
    let nagivate=useNavigate()
    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(3).max(15).required(),
    })
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth",data).then((respone) => {
            nagivate ("/")
        })
    }
    return (
        <div>
            <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer bg-primary'>




                    <label htmlFor="">Username</label>
                    <ErrorMessage name='username' component={"span"} />

                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="(ex. jonh...)"
                    ></Field>

                    <label htmlFor="">Password</label>
                    <ErrorMessage name='password' component={"span"} />

                    <Field
                        id="inputCreatePost"
                        name="password"
                        type="password"
                        placeholder="(ex. jonh...)"
                    ></Field>
                    <button type='submit'>Register</button>
                </Form>
            </Formik>


        </div>
    )
}

export default Register