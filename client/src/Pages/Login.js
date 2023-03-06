import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../Resources/ApiKeys";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import MyNavbar from "../Utilities/MyNavbar";
const Login = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    userName: "",
    password: "",
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
    const { userName, password } = values;

    if (password === "") {
      toast.error("enter the password", toastOptions);
      return false;
    } else if (userName === "") {
      toast.error("enter the username", toastOptions);
      return false;
    } else if (userName.length < 6) {
      toast.error("username is too small", toastOptions);
      return false;
    }

    return true;
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    if (formValidation()) {
      console.log("we are here");

      const { userName, password } = values;
      const response = await fetch(loginRoute, {
        method: "POST",
        body: JSON.stringify({
          userName,
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
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.userNameCheck)
            );
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
      <Container className="d-flex justify-content-center mt-3">
        <Form onSubmit={loginSubmitHandler}>
          <Form.Group onChange = {onChangeHandler} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group onChange = {onChangeHandler} className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Container className="text-center d-flex flex-column">
            <Button className = "mb-3" variant="primary" type="submit">
              Let's Go
            </Button>
            <span>
            Don't have account ? <Link to="/register">Register</Link>
            </span>
          </Container>
        </Form>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};
export default Login;
