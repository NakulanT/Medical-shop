import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function Signup({ history }) {
  const { login } = useAuth();
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State variable to track successful registration

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phno: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetcRegister({
          username: values.username,
          email: values.email,
          phno: values.phno,
          password: values.password,
        });
        login(registerResponse);

        // Set registrationSuccess to true when the registration is successful
        setRegistrationSuccess(true);

        // Clear the success message after a delay (e.g., 5 seconds)
        setTimeout(() => setRegistrationSuccess(false), 5000);

        history.push("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Signup</Heading>
          </Box>
          <Box my={5}>
            {registrationSuccess && ( // Render the success message if registrationSuccess is true
              <Alert status="success">You have successfully registered.</Alert>
            )}
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>User name</FormLabel>
                <Input
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  isInvalid={formik.touched.username && formik.errors.username}
                />
              </FormControl>

              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone number</FormLabel>
                <Input
                  name="phno"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phno}
                  isInvalid={formik.touched.phno && formik.errors.phno}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </FormControl>

              <Button mt="4" width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;