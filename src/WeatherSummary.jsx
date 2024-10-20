import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const WeatherSummary = ({ data }) => {
    return (
        <div>
            <h2 className="text-center">Weather Summary</h2>
            <Row className="g-4">
                {data.map(item => (
                    <Col md={4} key={item.city}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.city}</Card.Title>
                                <Card.Text>
                                    <strong>Temperature:</strong> {item.temp} °C
                                </Card.Text>
                                <Card.Text>
                                    <strong>Feels Like:</strong> {item.feels_like} °C
                                </Card.Text>
                                <Card.Text>
                                    <strong>Main Condition:</strong> {item.mainWeather}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default WeatherSummary;
