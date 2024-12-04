import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Row } from 'react-bootstrap';
import mainData from '../data.json';
function CardComponent() {
  const products = mainData?.cards;
  console.log('Products: ', products);
  return (
    <div className='container p-5'>
      <h1 className='text-left p-3' >Our Menu</h1>
      <Row className='g-4'>
        {products?.map((items) => (
          <Col key={items.id} lg={3} md={4} sm={6} xs={12}>
            <Card
              style={{ width: '100%', position: 'relative' }}
              className='mx-auto'
            >
              <div className='position-relative'>
                {items.isNew && (
                  <span
                    className='badge position-absolute top-0 start-0 m-2'
                    style={{
                      backgroundColor: 'yellow',
                      color: 'black',
                    }}
                  >
                    New
                  </span>
                )}
                {items.isDiscounted && (
                  <span
                    className='badge position-absolute top-0 end-0 m-2'
                    style={{
                      backgroundColor: 'yellow',
                      color: 'black',
                    }}
                  >
                    Sale
                  </span>
                )}
                <Card.Img
                  variant='top'
                  src={`/assets/images/pizza/${items.image}`}
                  alt={items.title}
                />
              </div>
              <Card.Body>
                <Card.Title>{items.title}</Card.Title>
                <Card.Text>Price: {items.price}</Card.Text>
                <Card.Text>
                    {items.isDiscounted ? (<span className='text-decoration-line-through'>{items.price}</span>) : <span>{(items.price) }</span>}
                </Card.Text>
                <Button variant='secondary' className='w-100'>
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardComponent;
