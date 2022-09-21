import {
  Container,
  Grid,
  Box,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Checkbox,
  MediaQuery,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { DOMAIN_NAME } from "../utils/constants";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validate: {
      username: (value) => {
        if (!value) return "Username is required";
        if (value.length < 3)
          return "Username must be at least 3 characters long";
        if (value.length > 20)
          return "Username must be at most 20 characters long";
      },
      email: (value) => (validator.isEmail(value) ? null : "Invalid Email"),
      password: (value) =>
        value.length >= 8
          ? null
          : "Password must be at least 8 characters long",
      confirmPassword: (value, { password }) =>
        value === password ? null : "Passwords do not match",
      terms: (value) =>
        value ? null : "You must agree to terms and conditions",
    },
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    axios
      .post(DOMAIN_NAME + "/users/signup", {
        name: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
      .then((res) => {
        console.log(res.data.data.token);
        localStorage.setItem("BearerToken", res.data.data.token);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showNotification({
          title: "Registration Failed",
          message: err.message,
          autoClose: 5000,
          color: "red",
        });
        setLoading(false);
      });
  };

  return (
    <div style={{ height: "inherit", backgroundColor: "black" }}>
      <Grid sx={{ height: "100%", width: "100%" }} m={0}>
        <Grid.Col>
          <Container
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MediaQuery
              query="(max-width: 600px)"
              styles={{
                width: "100%",
                paddingRight: "10px",
                paddingLeft: "10px",
              }}
            >
              <Box
                sx={{
                  width: "65%",
                  backgroundColor: "#191c24",
                  borderRadius: "8px",
                  color: "white",
                }}
                p={75}
                pt={20}
                pb={35}
              >
                <Text
                  sx={{
                    fontWeight: "900",
                    fontSize: "2.5rem",
                    textAlign: "center",
                  }}
                  mb={30}
                >
                  HubDex
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Text mb={5} sx={{ fontWeight: "600", fontSize: "1.25rem" }}>
                    New here?
                  </Text>
                  <Text mb={15} sx={{ fontWeight: "500", fontSize: "1.1rem" }}>
                    Signing up is easy. It only takes a few steps
                  </Text>
                  <TextInput
                    mb={13}
                    withAsterisk
                    label="Username"
                    placeholder="urmomgae"
                    {...form.getInputProps("username")}
                  />
                  <TextInput
                    mb={13}
                    withAsterisk
                    label="Email"
                    placeholder="urmom@gae.com"
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    mb={13}
                    withAsterisk
                    label="Password"
                    placeholder="********"
                    {...form.getInputProps("password")}
                  />
                  <PasswordInput
                    mb={13}
                    withAsterisk
                    label="Confirm Password"
                    placeholder="********"
                    {...form.getInputProps("confirmPassword")}
                  />
                  <Checkbox
                    mt={10}
                    {...form.getInputProps("terms", { type: "checkbox" })}
                    label="I agree to sell my privacy"
                  />
                  <Button
                    disabled={!form.isValid("terms")}
                    fullWidth
                    type="submit"
                    mt={20}
                    loading={loading}
                  >
                    <Text my={20} sx={{ fontWeight: "600", fontSize: "1rem" }}>
                      Register
                    </Text>
                  </Button>
                </form>
                <Text mt={10} sx={{ fontWeight: "600", fontSize: "0.9rem" }}>
                  Already have an account?{" "}
                  <Link
                    mt={10}
                    style={{ textDecoration: "none" }}
                    to={"/login"}
                  >
                    <Text variant="link" sx={{ display: "inline" }}>
                      Sign In
                    </Text>
                  </Link>
                </Text>
              </Box>
            </MediaQuery>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Register;
