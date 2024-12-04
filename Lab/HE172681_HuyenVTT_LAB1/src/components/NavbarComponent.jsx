import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';
function NavbarComponent() {
  return (
    <Navbar className='container' expand='lg'>
      <Navbar.Brand href='#'>Pizza House</Navbar.Brand>
      <Navbar.Toggle aria-controls='navbarSupportedContent' />
      <Navbar.Collapse id='navbarSupportedContent'>
        <Nav className='me-auto flex-column flex-lg-row'>
          <Nav.Link href='#' active>
            Home
          </Nav.Link>
          <Nav.Link href='#'>About us</Nav.Link>
          <Nav.Link href='#'>Contact</Nav.Link>
        </Nav>
        <Form
          className='d-flex flex-column flex-lg-row mt-3 mt-lg-0'
          role='search'
        >
          <FormControl type='search' placeholder='Search' aria-label='Search' />
          <Button variant='danger' type='submit'>
            <Search />
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
