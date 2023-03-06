import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { sendataRoute } from "../Resources/ApiKeys";
const Modals = (props) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const onChangeHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const formValidation = () => {
    const { name, phone, email} = values;

     if (name === "") {
      toast.error("enter the name", toastOptions);
      return false;
    } else if (phone.length < 10||phone.length>10) {
      toast.error("enter correct phone number", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("enter the mail", toastOptions);
      return false;
    }
    return true;
  };

  const formSubmitHandler = async (event) => {
    console.log("hi")
    event.preventDefault();
    if (formValidation()) {
      const { name, email, phone } = values;
       axios.post(sendataRoute,{
        from: props.currentUser._id,
        email: email,
        name:name,
        phone:phone
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
     onCloseHandler();
    }
  }
  const onCloseHandler = ()=>{
    props.onClose(false);
  }
  return (
    <Fragment>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Add Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit = {formSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                type="username"
                placeholder="Enter Name"
                name = "name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
              onChange={onChangeHandler}
              name = "phone"
                type="string"
                placeholder="Add Contact Number"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
              onChange={onChangeHandler}
                name = "email"
                type="email"
                placeholder="Add Email Address"
                autoFocus
              />
            </Form.Group>
            <Button className = "mx-3" type = "submit"  variant="primary" >
            Add Contact
          </Button>
            <Button variant="secondary"  onClick={onCloseHandler}>
            Close
          </Button>
          
          </Form>
        </Modal.Body>
        
      </Modal>
      <ToastContainer />
    </Fragment>
  );
};

export default Modals;
