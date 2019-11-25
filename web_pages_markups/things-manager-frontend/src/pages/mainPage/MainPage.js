import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Jumbotron, Carousel, Row, Col, Image, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MainPage.css';

export class MainPage extends Component {
    
    render() {
        return (
            <Container fluid={true} className="main-page">
                <Navbar fixed={"top"} bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            <Image src="/images/box.png" className="min-logo-img" />
                            Мои вещи                       
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#home">Цены</Nav.Link>
                            <Nav.Link href="#link">Условия</Nav.Link>
                            <Nav.Link href="#link">О системе</Nav.Link>
                            <Nav.Link href="#link">Контакты</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">Вход / регистрация</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className="main-container">
                    {/* <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://media.nu.nl/m/ldixw0xaymid_wd640.jpeg"
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://media.nu.nl/m/ldixw0xaymid_wd640.jpeg"
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://media.nu.nl/m/ldixw0xaymid_wd640.jpeg"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel> */}
                    <Jumbotron className="mx-sm-3 mt-3 mb-2 text-break">
                        <h1>Каталогизатор вещей</h1>
                        <p className="tsize-18">
                            Сервис для учета каталога вещей и предметов в квартире, доме, офисе, гараже, на даче.
                        </p>
                    </Jumbotron>
                    <Row>
                        <Col xs={12} className="mb-3">
                            <h1 className="px-3 theme-header">Бесплатная регистрация</h1>
                        </Col>
                        <Col sm={12} md={6} className="px-sm-3">
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>Регистрация</Card.Title>
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Ваше имя
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="Имя" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Email
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="email@example.com" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label column sm="4">
                                                Придумайте пароль
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="password" placeholder="Пароль" />
                                            </Col>
                                        </Form.Group>

                                        <Row className="text-right">
                                            <Col className="text-right">
                                                <Button variant="primary" type="submit">
                                                    Зарегистрироваться <span class="oi oi-person ml-1"></span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} className="px-sm-3 mt-3 mt-md-0">
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>Вход в систему</Card.Title>
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4">
                                                Email
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="email@example.com" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label column sm="4">
                                                Пароль
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="password" placeholder="Пароль" />
                                            </Col>
                                        </Form.Group>
                                        <Row className="text-right">
                                            <Col xs={12} sm={6} className="text-xs-right text-sm-left mb-1 mb-sm-0">
                                                {/*<Link to="/">Главная</Link>*/}
                                                <Button variant="link">Забыли пароль?</Button>
                                            </Col>
                                            <Col xs={12} sm={6} className="text-right">
                                                <Button variant="success" type="submit">
                                                    Войти <span class="oi oi-account-login"></span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12} className="mb-3">
                            <h1 className="px-3 theme-header">Зачем нужет котологизатор вещей</h1>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Image src="/images/time.png" className="mx-auto d-block" />
                            <h3>Трудно найти вещь</h3>
                            <p>Бывают ситуации, когда нужно найти вещь, но ее нигде нет. На поиски может уйти много времени.</p>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Image src="/images/planing.png" className="mx-auto d-block" />
                            <h3>Есть решение</h3>
                            <p>Все вещи можно внести в каталог с привязкой к их местонахождению. Это сократит время поиска до десятка секунд.</p>
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default MainPage
