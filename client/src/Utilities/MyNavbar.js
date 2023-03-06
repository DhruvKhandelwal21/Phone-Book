import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Link } from "react-router-dom";
const MyNavbar = ()=>{
  return(
 <Navbar bg="light" variant="light">
        <Container className='d-flex justify-content-center'>
          <Navbar.Brand >Phone Diary</Navbar.Brand>
          {/* <Nav className="justify-content-end">
            <Nav.Link>
              <Link to = {props.linkto}>
                 {props.page}
              </Link>
            </Nav.Link>
            
          </Nav> */}
        </Container>
      </Navbar>
  )
}
export default MyNavbar;