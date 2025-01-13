import { useEffect, useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function ListMovie() {
    const [producers, setProducers] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [stars, setStars] = useState([]);
    const [movies, setMovies] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseP = await axios.get("http://localhost:9999/producers");
                const responseD = await axios.get("http://localhost:9999/directors");
                const responseS = await axios.get("http://localhost:9999/stars");
                const responseM = await axios.get("http://localhost:9999/movies");

                setProducers(responseP.data);
                setDirectors(responseD.data);
                setStars(responseS.data);
                setMovies(responseM.data);

                // Get query parameters
                const urlParams = new URLSearchParams(window.location.search);
                const genre = (urlParams.get('genres'));
                const producerId = urlParams.get('producer-id');

                // Filter movies with the specified genre
                if (genre !== null) {
                    setMovies(responseM.data.filter(m => m.genres.includes(genre)));
                } else {
                    setMovies(responseM.data);
                }

                // Filter movies with the specified producer
                if (producerId !== null) {
                    setMovies(responseM.data.filter(m => m.producer == producerId));
                } else {
                    setMovies(responseM.data);
                }


            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [location]);

    return (
        <>
            <Container fluid style={{ padding: '80px' }}>
                <Row className='mx-2'>
                    <Col className='text-center mt-2 mb-2 mx-2'><h2>React Application</h2></Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <hr style={{ color: 'green' }}></hr>
                        <a href='/movie/?genres=Comedy' className='mx-2'> COMEDY</a>
                        <a href='/movie/?genres=Action' className='mx-2'> ACTION</a>
                        <a href='/movie/?genres=Cartoon' className='mx-2'> CARTOON</a>
                        <a href='/movie/?genres=Drama' className='mx-2'> DRAMA</a>
                        <hr style={{ color: 'green' }}></hr>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <h3>
                            Producers
                        </h3>
                        <ul>
                            {producers.map(p => (
                                <li><a href={`/movie/?producer-id=${p.id}`}>{p?.name}</a></li>
                            ))}
                        </ul>
                    </Col>
                    <Col>
                        <h3>
                            List of Movies
                        </h3>
                        <Table striped bordered hover size="xs">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Release</th>
                                    <th>Description</th>
                                    <th>Producers</th>
                                    <th>Directors</th>
                                    <th>Genres</th>
                                    <th>Stars</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map(m => (
                                    <tr>
                                        <td>{m.id}</td>
                                        <td>{m.title}</td>
                                        <td>{new Date(m.release).toLocaleDateString()}</td>
                                        <td>{m.description}</td>
                                        <td>{producers.filter(p => p.id == m.producer).map(p => (<td>{p?.name}</td>))}</td>
                                        <td>{directors.filter(d => d.id == m.director).map(d => (<td>{d?.fullname}</td>))}</td>
                                        <td>

                                            {m.genres.map(g => (
                                                <div>{g}</div>
                                            ))}
                                        </td>
                                        <td>
                                            <ol>
                                                {stars.filter(s => m.stars.includes(parseInt(s.id))).map(s => (
                                                    <li>{s.fullname}</li>
                                                ))}

                                            </ol>
                                            <div className='text-end'><a href={`/movie/${m.id}/add-star`}>Add stars</a></div>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ListMovie