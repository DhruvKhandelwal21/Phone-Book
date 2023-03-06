import React, {Fragment} from 'react';
import ListGroup from "react-bootstrap/ListGroup";

const ContactDisplay = ({ currentPosts})=>{
  return(
    <Fragment>

{currentPosts.map(post => (
     <ListGroup className="my-lg-4" horizontal >
        <ListGroup.Item disabled>{post.name}</ListGroup.Item>
        <ListGroup.Item>{post.phone}</ListGroup.Item>
        <ListGroup.Item>{post.email}</ListGroup.Item>
        </ListGroup>
      ))}
      
    
    </Fragment>

    
  )
}
export default ContactDisplay;