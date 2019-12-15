import React, { Component } from 'react'
import { 
    Breadcrumb, 
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
import { connect } from 'react-redux';
import './ThingsListPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { getAllItemsByUserId } from '../../../api/thingService';
import * as Moment from 'moment';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class ThingsListPage extends Component {

    NO_DATA_STRING = "Нет данных";

    constructor (props) {
        super(props);
        this.state = {
            isExtended : false,
            thingsWithPlaces: [],
          };
    }

    componentDidMount() {

        getAllItemsByUserId(this.props.users[0].userId, this.props.users[0].token)
            .then(thingsWithPlaces => {
                thingsWithPlaces.sort((t1, t2) => {
                    if (t1.item.itemName > t2.item.itemName) {
                        return 1;
                    }
                    if (t1.item.itemName < t2.item.itemName) {
                    return -1;
                    }
                    return 0;
                });
                this.setState({thingsWithPlaces});
                console.log(this.state.thingsWithPlaces);
            });
    }

    render() {
        return (
            <div>
                <Breadcrumb className="mt-3 mb-2">
                    <Breadcrumb.Item href="#"><span class="oi oi-home"></span></Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to="/">
                        {this.props.users[0].username}
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
                        {this.state.thingsWithPlaces.map(thingWithPlaces => (
                            <tr>
                                <td>
                                    <Link to={`/things/${thingWithPlaces.item.idItem}`}>{thingWithPlaces.item.itemName}</Link>
                                </td>
                                {thingWithPlaces.places.map(place => (
                                    <td>{place.placeName || this.NO_DATA_STRING}</td>
                                ))}
                                <td>{(thingWithPlaces.item.category && thingWithPlaces.item.category.categoryName) || this.NO_DATA_STRING}</td>
                                <td>{Moment(thingWithPlaces.item.creationTimestamp).format("HH:mm DD.MM.YY")}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
  )(ThingsListPage);
