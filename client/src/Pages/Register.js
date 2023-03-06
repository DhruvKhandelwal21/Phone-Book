import React from "react";
import { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../Resources/ApiKeys";
import MyNavbar from "../Utilities/MyNavbar";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";

const Register = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem("new-user")) {
      navigate("/");
    }
  }, []);
  const onChangeHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const formValidation = () => {
    const { email, password, confirmPassword } = values;

     if (email === "") {
      toast.error("enter the email", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("password is too weak", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("enter the right password", toastOptions);
      return false;
    }
    return true;
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (formValidation()) {
      // console.log("we are here");

      const { userName, email, password } = values;
      const response = await fetch(registerRoute, {
        method: "POST",
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      try {
        if (response.ok) {
          console.log("we are here");
          const data = await response.json();
          console.log(data);
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem("new-user", JSON.stringify(data.user));
            navigate("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Fragment>
      <MyNavbar />
      <Container className="d-flex w-75 justify-content-center mt-3">
        <Form className="w-35" onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name = "email"
            onChange={onChangeHandler} placeholder="Enter email" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name = "password"
            onChange={onChangeHandler} placeholder="Password" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            
          >
            <Form.Label>confirm password</Form.Label>
            <Form.Control type="password" name="confirmPassword"
            onChange={onChangeHandler} placeholder="Re-enter Password" />
          </Form.Group>

          <Container className=" d-flex text-center flex-column">
            <Button className = "mb-3" variant="primary" type="submit" >
              Submit
            </Button>

            <span>
              Already have an account ? <Link to="/login">Login</Link>
            </span>
          </Container>
        </Form>
      </Container>

      <ToastContainer />
    </Fragment>
  );
};
export default Register;
