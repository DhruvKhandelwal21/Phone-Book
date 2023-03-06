import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import ContactSearch from "../Utilities/ContactSearch";
import { showdataRoute } from "../Resources/ApiKeys";
import MyNavbar from "../Utilities/MyNavbar";
import Modals from "../Utilities/Modals";
const ContactList = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState(false);
  
  
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("new-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("new-user")));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log("hi");
      const data = await axios.post(showdataRoute, {
          from: currentUser._id,
        })
       console.log(data)
       setContacts(data.data)
    })();
  }, [show,currentUser]);

console.log(contacts)
 
  const onClose = (payload) => {
    console.log(payload);
    setShow(payload);
  };
  
   
  

  return (
    <Fragment>
      <MyNavbar />
      <Container className="d-flex flex-column pt-4 pb-3">
        <Container className="d-flex justify-content-center  align-item-center">
          <Button
            className="w-25"
            onClick={() => {
              setShow(true);
            }}
          >
            ADD CONTACT
          </Button>
          {show && (
            <Modals show={show} currentUser={currentUser} onClose={onClose} />
          )}
        </Container>

        {currentUser && <ContactSearch contacts = {contacts}/>}
      </Container>
    </Fragment>
  );
};
export default ContactList;
