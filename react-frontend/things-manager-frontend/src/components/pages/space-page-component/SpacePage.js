import React, { Component } from 'react';
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
import './SpacePage.css';
import { getUsers } from '../../../selectors/userSelector';
import { getItemById } from '../../../api/thingService';
import * as Moment from 'moment';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class SpacePage extends Component {
    NO_DATA_STRING = "Нет данных";

    constructor (props) {
        super(props);
        this.state = {
            isExtended: false,
            thingWithPlaces: undefined,
            thingName: "",
            placesNames: Array(3),
            creationTimestamp: undefined,
            updateTimestamp: undefined,
            status: "",
        };

        console.log(this.props.match.params);
    }

    render() {
        return (
            <div>
                <Breadcrumb className="mt-3 mb-2">
                    <Breadcrumb.Item href="#"><span class="oi oi-home"></span></Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to="/">
                        {this.props.users[0].username}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to="/thingsList">Места хранения</Breadcrumb.Item>
                    <Breadcrumb.Item active>{this.state.thingName}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col>
                        <h1 className="px-3 theme-header">{this.state.thingName}</h1>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs={6} sm={5} md={4}>
                        <Image src="/images/box.jpg" className="img-fluid" thumbnail />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs={12} md={6}>
                        <Card bg="light"> 
                            <Card.Body>
                                <div>
                                    Статус: <b>{this.state.status}</b>
                                </div>
                                <div>
                                    Дата создания: <b>{Moment(this.state.creationTimestamp).format("DD.MM.YYYY")}</b>
                                </div>
                                <div>
                                    Дата изменеия: <b>{Moment(this.state.updateTimestamp).format("DD.MM.YYYY")}</b>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs={12} md={4}>
                        <Card bg="light"> 
                            <Card.Body>
                                <div>Количество вещей: 0</div>
                                <Link to="/">Все вещи этого места хранения</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card bg="light" className="mt-3 mt-md-0"> 
                            <Card.Body>
                                Место хранения «jyj» находится в помещении <Link to="/">помещении</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card bg="light" className="mt-3 mt-md-0"> 
                            <Card.Body>
                                Помещение «hdhfg» находится в <Link to="/">строении</Link>
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
                                <Card.Title>Редактирование места хранения «места хранения»</Card.Title>
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
                                            Название  места хранения
                                        </Form.Label>
                                        <Col sm="8">
                                        <   Form.Control defaultValue="Место хранения" />
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
            </div>
        )
    }
}

export default connect(
    mapStateToProps
  )(SpacePage);
