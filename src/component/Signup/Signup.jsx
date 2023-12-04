import axios from "axios";
import { useFormik } from "formik";
import React, { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { basicSchema } from "./Schema";

export const Signup = () => {
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

  //6 useNavigate to routers
  let navigate = useNavigate();

  // (2) function to rigester
  async function handelRegister(values, actions) {
    setIsLoading(true);
    console.log(values);

    //(5) distruct data && add handelSubmit

    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signup",
        values
      );
      console.log(data);
      localStorage.setItem("UserToken", data?.token);

      setIsLoading(false);

      actions.resetForm();

      navigate("/login");
      if(data.message === "success") {
        console.log("success", data)
      }
    } catch (err) {
      setEmailError(err?.response?.data?.message);
      console.log(err?.response?.data?.message);
      setIsLoading(false);
    }
  }

  //formik (1)
  let formik = useFormik({
    //(1) => (2) put value in form => (3) put handle change in form && name
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      //(3) onSubmit: "",
    },
    //call yup
    validationSchema: basicSchema,
    onSubmit: handelRegister,
  });

  //don't forget to add handleSubmit
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            ref={inputF}
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.name && formik.touched.name
                ? "alert alert-danger"
                : ""
            }
          />
          {formik.errors.name && formik.touched.name && (
            <p className="alert alert-danger">{formik.errors.name}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
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
          {/* {err?.response?.data?.message ? (
            <p className="alert alert-danger">Email Is Already Been Taken</p>
          ) : (
            ""
          )} */}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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

        <Form.Group className="mb-3" controlId="formBasicRePassword">
          <Form.Label>RePassword</Form.Label>
          <Form.Control
            type="password"
            name="rePassword"
            placeholder="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.rePassword && formik.touched.rePassword
                ? "alert alert-danger"
                : ""
            }
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.phone && formik.touched.phone
                ? "alert alert-danger"
                : ""
            }
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          )}
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button
          variant="primary"
          type="submit"
          onClick={handelRegister}
          disabled={formik.isSubmitting}
        >
          {isLoading && <i className="fa fa-refresh fa-spin"></i>}
          Register
        </Button>
      </Form>{" "}
    </>
  );
};
