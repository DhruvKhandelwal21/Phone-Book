import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { showdataRoute } from "../Resources/ApiKeys";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "./Pagination";
import ContactDisplay from "./ContactDisplay";


const ContactSearch = (props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.contacts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  props.contacts.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.contacts);
      return;
    }
    let txn = [...props.contacts];
    txn = txn.filter((payload) =>
      payload.name.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn);
  };

  useEffect(() => {
    filterData(searchText);
  }, [props.contacts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredTransaction.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <Fragment>
      
        <Container className=" d-flex flex-column align-items-center">
          <InputGroup className=" mt-3 w-25 mx-3 mb-2">
            <Form.Control
              onChange={(e) => {
                setSearchText(e.target.value);
                filterData(e.target.value);
              }}
              placeholder="Search Contact"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <ContactDisplay currentPosts = {currentPosts} />
          <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredTransaction.length}
        paginate={paginate}
      />
        </Container>
      
    </Fragment>
  );
};
export default ContactSearch;
