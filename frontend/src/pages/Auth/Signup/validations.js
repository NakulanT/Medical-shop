import * as yup from "yup";

const validations = yup.object().shape({
  username: yup.string().required("Username is required"), // Add username field validation
  email: yup.string().email("Enter a valid email").required("Email is a required field"),
  password: yup
    .string()
    .min(10, "Your password must be at least 10 characters.")
    .required("Password is a required field"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Your password does not match")
    .required("Password confirmation is required"),
  phno: yup
    .string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
});

export default validations;

