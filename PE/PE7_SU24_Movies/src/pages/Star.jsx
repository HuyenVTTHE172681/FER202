import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function Star() {
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [listStarOptions, setListStarOptions] = useState([])
    const [listStars, setListStars] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const responseM = await axios.get(`http://localhost:9999/movies/${id}`);
            setMovie(responseM.data)

            setListStarOptions(responseM.data.stars)


            const responseS = await axios.get(`http://localhost:9999/stars`);
            setListStars(responseS.data)

        };

        fetchData();
    }, []);


    const handleChangeCheckbox = (e) => {

        const { value, checked } = e.target;
        console.log(checked)
        const starId = parseInt(value)
        if (checked) {
            setListStarOptions([...listStarOptions, starId]);
        } else {
            setListStarOptions(
                listStarOptions.filter((o) => o !== starId)
            );


        }
    }

    const handelSubmit = async (e) => {
        var movieUpdate = { ...movie, stars: listStarOptions }
        axios.put(`http://localhost:9999/movies/${id}`, movieUpdate)
        alert("success")
        navigate("/movie")
    }

    return (
        <Container>
            <Row>

            </Row>
            <Row className='mt-5'>
                <Form onSubmit={handelSubmit}>
                    <Col>
                        <Row>
                            <b>Movie Title</b>
                            <Form.Control type='text'
                                name="title"
                                value={movie.title}
                                disabled

                            ></Form.Control>

                        </Row>
                        <Row>
                            <b>Star</b>
                            {listStars.map(
                                s => (
                                    <Col>
                                        <Form.Check type='checkbox' label={s.fullname} inline
                                            onChange={handleChangeCheckbox}
                                            value={s.id}
                                            checked={listStarOptions.includes(parseInt(s.id))}

                                        ></Form.Check>

                                    </Col>
                                )
                            )}

                        </Row>
                        <Row>
                            <Col>
                                <Button variant='success' type='submit'>Add</Button>
                            </Col>
                        </Row>

                    </Col>
                </Form>

            </Row>


        </Container>
    )
}

export default Star
