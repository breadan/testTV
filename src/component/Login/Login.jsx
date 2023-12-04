import axios from "axios";
import { useFormik } from "formik";
import React, { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { basicSchema } from "../Signup/Schema";

export const Login = ({saveUserData, userData}) => {
  console.log(userData)
  //focus input
  const inputF = useRef(null);
  useEffect(() => {
    inputF.current.focus();
  }, []);

  //(4) create Loading
  const [isLoading, setIsLoading] = useState(false);
  // (7) To Catch Email Error && another error
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  // const [flag, setFlag] = useState(""); //why??
  const errors  = useFormik('');
  const [apiError, setApiError] = useState("");

  //6 useNavigate to routers
  let navigate = useNavigate();

  // (2) function to rigester
  async function handleLogin(values, actions) {
    setIsLoading(true);
    console.log(values);

    //(5) distruct data && add handelSubmit

    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signin",
        values
      );
      console.log(values);
      localStorage.setItem("UserToken", data?.token);

      //import
      saveUserData()

      setIsLoading(false);

      actions.resetForm();

      navigate("/home");
    } catch (err) {
      setEmailError(err?.response?.data?.message);
      console.log(err?.response?.data?.message);
      console.log(errors)
      setIsLoading(false);
      setApiError(err.response?.data?.message);
    }
  }

  //formik (1)
  let formik = useFormik({
    //(1) => (2) put value in form => (3) put handle change in form && name
    initialValues: {
      email: "",
      password: "",
    },
    //call yup
    validationSchema: basicSchema,
    onSubmit: handleLogin,
  });

  //don't forget to add handleSubmit
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            ref={inputF}
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.email && formik.touched.email
                ? "alert alert-danger"
                : ""
            }
          />
          {formik.errors.email && formik.touched.email && (
            <p className="alert alert-danger">{formik.errors.email}</p>
          )}
          {emailError === 409 && (
            <p className="alert alert-danger">Email Is Already Been Taken</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.password && formik.touched.password
                ? "alert alert-danger"
                : ""
            }
          />
          {formik.errors.password && formik.touched.password && (
            <p className="alert alert-danger">{formik.errors.password}</p>
          )}
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button
          variant="primary"
          type="submit"
          onClick={handleLogin}
          disabled={formik.isSubmitting}
        >
          {isLoading && <i className="fa fa-refresh fa-spin"></i>}
          Register
        </Button>
      </Form>{" "}
    </>
  );
};
