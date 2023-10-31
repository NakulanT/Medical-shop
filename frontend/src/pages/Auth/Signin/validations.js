import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("required field"),
  password: yup
    .string()
    .min(10, "Your password must be at least 10 characters.")
    .required(),
});

export default validations;
