import * as Yup from 'yup';

// use yup
export const basicSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength 3")
      .max(10, "name max length 10"),
    email: Yup.string().email('Please Enter a Valid Email').required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password wrong"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password"), null], "password & rePassword not matched"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be egy"),
  });