import React from 'react'
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CreatePost() {
    let nagivate=useNavigate()
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    }
  
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("bir baslık eklemek zorundasın bu bir ozel mesajdir "),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    })
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts",data).then((respone) => {
            nagivate ("/")
        })
    }
    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer bg-primary'>
                    <label htmlFor="">Title</label>
                    <ErrorMessage name='title' component={"span"} />
                    <Field
                        id="inputCreatePost"
                        name="title"
                        placeholder="(ex. jonh...)"
                    ></Field>

                    <label htmlFor="">Post:</label>
                    <ErrorMessage name='postText' component={"span"} />
                    <Field
                        id="inputCreatePost"
                        name="postText"
                        placeholder="(ex. jonh...)"
                    ></Field>

                    <label htmlFor="">Username</label>
                    <ErrorMessage name='username' component={"span"} />

                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="(ex. jonh...)"
                    ></Field>
                    <button type='submit'>creata post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost