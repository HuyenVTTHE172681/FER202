import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap';
function BookingComponent() {
  return (
    <div className='container p-5'>
      <h2 className='text-center mt-4 mb-4'>Book Your Table</h2>
      <Form>
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='name'>
            <Form.Control required type='text' placeholder='Your name' />
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='email'>
            <Form.Control required type='text' placeholder='Your email' />
          </Form.Group>
          {/* <Form.Group as={Col} md='4' controlId='service'>
            <Form.Control as='select' placeholder='Selected a service'>
              <option>Choose...</option>
              <option>Server 1</option>
              <option>Server 2</option>
              <option>Server 3</option>
            </Form.Control>
          </Form.Group> */}
          <Form.Group as={Col} md='4' controlId='service'>
              <Dropdown>
                <Dropdown.Toggle
                  variant='none'
                  className='w-100 text-start'
                  style={{ backgroundColor: 'white' }}
                >
                  Select a service
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Server 1</Dropdown.Item>
                  <Dropdown.Item>Server 2</Dropdown.Item>
                  <Dropdown.Item>Server 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
        </Row>
        <Row className='mb-3 mt-3'>
          <Form.Group as={Col} md='12' controlId='textArea'>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Enter any additional requests'
            ></Form.Control>
          </Form.Group>
        </Row>
        <Button variant='warning'>Send Message</Button>
      </Form>
    </div>
  );
}

export default BookingComponent;
