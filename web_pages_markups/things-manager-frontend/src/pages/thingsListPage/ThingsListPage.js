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
import './ThingsListPage.css';

export class ThingsListPage extends Component {

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
                    </Breadcrumb>
                    <Row className="mb-2">
                        <Col xs={12} sm={8} md={9} >
                            <Form inline={true}>
                                <DropdownButton id="dropdown-basic-button" title="Выбирите группу" variant="light" className="mr-2 mb-2" size="sm">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                                <DropdownButton id="dropdown-basic-button" title="Выбирите строения" variant="light" className="mr-2 mb-2" size="sm">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                                <InputGroup className="mb-2" size="sm">
                                    <FormControl
                                    placeholder="Поиск..."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary"><span class="oi oi-magnifying-glass"></span></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col xs={12} sm={4} md={3} >
                            <ButtonToolbar className="float-right mb-2">
                                <Button 
                                    variant="primary" size="sm" className="mr-2"
                                    onClick={() => this.setState({isExtended: !this.state.isExtended})}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={this.state.isExtended}
                                >
                                    <span class="oi oi-plus mr-1"></span> Вещь
                                </Button>
                                <Dropdown alignRight={true}>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size="sm">
                                        <span class="oi oi-cog"></span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                
                    <Collapse in={this.state.isExtended}>
                        <Card bg="light" className="mb-3"> 
                                <Card.Body>
                                    <Card.Title>Добавление новой вещи</Card.Title>
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
                                                    Добавить
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
                    <Table responsive hover size="sm">
                        <thead>
                            <tr>
                                <th>Вещь</th>
                                <th>Место хранения</th>
                                <th>Помещение</th>
                                <th>Строение</th>
                                <th>Категория</th>
                                <th>Cоздано</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Стул</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </Container>
        )
    }
}

export default ThingsListPage
