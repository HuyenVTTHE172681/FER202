import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import mainData from '../data.json';
function CarouselComponent() {
  const pizzaCarousel = mainData?.carousel;
  // console.log('Products Carousel: ', pizzaCarousel);
  return (
    <Carousel id='carouselExample'>
      {pizzaCarousel?.map((items) => {
        return (
          <Carousel.Item key={items.id}>
            <img
              className='d-block w-10'
              src={`/assets/images/pizza/${items.image}`}
              alt={items.title}
            />
            <Carousel.Caption>
              <h3>{items.title}</h3>
              <p>{items.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
      {/* <Carousel.Item>
        <img
          className='d-block w-10'
          src='/assets/images/pizza/pizza1.jpg'
          alt='First slide'
        />
        <Carousel.Caption>
          <h3>Neapolitan Pizza</h3>
          <p>
            if you are looking for a traditional Italian pizza, the Neapolitan
            is the best option
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default CarouselComponent;
