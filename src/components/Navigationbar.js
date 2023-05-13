import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigationbar = ()   => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">FOODLIST</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/All-Users">Get All User</Nav.Link>
          </Nav>
            <Button variant="outline-success">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;