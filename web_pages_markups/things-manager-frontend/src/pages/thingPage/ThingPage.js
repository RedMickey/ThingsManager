import React, { Component } from 'react'
import { 
    Container,
    Nav,
    Navbar, 
    Breadcrumb, 
    NavDropdown, 
    Row, 
    Col, 
    Image, 
    Form, 
    Button, 
    DropdownButton, 
    Dropdown,
    InputGroup,
    FormControl,
    ButtonToolbar,
    Collapse,
    Card,
    Table
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ThingPage.css';

export class ThingPage extends Component {
    constructor () {
        super();
        this.state = {
            isExtended : false
          };
      }

    render() {
        return (
            <Container fluid={true} className="main-page">
                <Navbar fixed={"top"} bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            <Image src="/images/box.png" className="min-logo-img" />                   
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#home">
                                <span class="oi oi-home"></span> Строения
                            </Nav.Link>
                            <Nav.Link href="#link">
                                <span class="oi oi-flag"></span> Помещения
                            </Nav.Link>
                            <Nav.Link href="#link">
                                <span class="oi oi-map-marker"></span> Места хранения
                            </Nav.Link>
                            <Nav.Link href="#link">
                                <span class="oi oi-briefcase"></span> Вещи
                            </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">
                                    <span class="oi oi-tags"></span> Категории
                                </Nav.Link>
                                <NavDropdown title="Настройки" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className="main-container">
                    <Breadcrumb className="mt-3 mb-2">
                        <Breadcrumb.Item href="#"><span class="oi oi-home"></span></Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            UserName
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Вещи</Breadcrumb.Item>
                        <Breadcrumb.Item active>Вещь</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col>
                            <h1 className="px-3 theme-header">Название вещи</h1>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col xs={6} sm={5} md={4}>
                            <Image src="/images/thing.jpeg" className="img-fluid" thumbnail />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={12} md={6}>
                            <Card bg="light"> 
                                <Card.Body>
                                    <div>
                                        Статус: <b>присутствует</b>
                                    </div>
                                    <div>
                                        Дата создания: <b>24.11.2019</b>
                                    </div>
                                    <div>
                                        Дата изменеия: <b>24.11.2019</b>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={12} md={4}>
                            <Card bg="light"> 
                                <Card.Body>
                                    Вещь <b>«Вещь»</b> находится в месте ханения {/*<Link>dsffsd</Link>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card bg="light" className="mt-3 mt-md-0"> 
                                <Card.Body>
                                    Вещь <b>«Вещь»</b> находится в помещении {/*<Link>dsffsd</Link>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card bg="light" className="mt-3 mt-md-0"> 
                                <Card.Body>
                                    Вещь <b>«Вещь»</b> находится в строении {/*<Link>dsffsd</Link>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="mb-2">
                        <Col xs={8}>
                            <Button 
                                variant="success" className="mr-2 mb-2"
                                onClick={() => this.setState({isExtended: !this.state.isExtended})}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.isExtended}
                            >
                                <span class="oi oi-pencil"></span> Редактировать
                            </Button>
                            <Button variant="secondary" className="mb-2">Отсутствует</Button>
                        </Col>
                        <Col xs={4} className="text-right">
                            <Button variant="danger" className="mb-2">
                                <span class="oi oi-trash"></span> Удалить
                            </Button>
                        </Col>
                    </Row>
                        <Collapse in={this.state.isExtended}>
                            <Card bg="light" className="mb-3"> 
                                <Card.Body>
                                    <Card.Title>Редактирование вещи «Название вещи»</Card.Title>
                                    <hr/>
                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Строение
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="Строение" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Помещение
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="Помещение" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Место хранения
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="Место хранения" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Категория
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="Категория" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Название вещи
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control defaultValue="Название вещи" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Примечание
                                            </Form.Label>
                                            <Col sm="8">
                                            <   Form.Control as="textarea" rows="3" defaultValue="Примечание" />
                                            </Col>
                                        </Form.Group>

                                        <Row className="text-right">
                                            <Col xs={0} sm={4}>
                                            </Col>
                                            <Col xs={12} sm={8} className="text-left">
                                                <Button variant="success" type="submit" className="mr-2">
                                                    Сохранить
                                                </Button>
                                                <Button variant="light" type="submit">
                                                    Отмена
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                    </Collapse>
                </Container>
            </Container>
        )
    }
}

export default ThingPage
