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
    Table,
    Alert
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './RoomsListPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { savePlace, getRoomStatistics, getPlacesByPlaceType } from '../../../api/placeService';
import * as Moment from 'moment';
import BuildingTypeahead from '../../page-components/typeaheads/building_typeahead/BuildingTypeahead';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class RoomsListPage extends Component {
    
    NO_DATA_STRING = "Нет данных";

    constructor (props) {
        super(props);
        this.state = {
            isExtended : false,
            roomStatistics: [],
            addedSuccessfully: false,
            addingError: false,
            buildingOptions: [],
        };

        this.typeaheadBuilding = undefined;

        this.roomSchema = Yup.object().shape({
            building: Yup.string(),
            roomName: Yup.string()
                .required('Заполните это поле'),
            description: Yup.string(),
        });

        this.onRoomAdd = this.onRoomAdd.bind(this);
    }

    componentDidMount() {
        this.downloadRoomStatistics();

        getPlacesByPlaceType(1 ,this.props.users[0].userId, this.props.users[0].token)
            .then((buildings) => {
                this.setState({
                    buildingOptions: buildings.map(building => ({id: building.idPlace, name: building.placeName}))
                });
            });
    }

    downloadRoomStatistics() {
        getRoomStatistics(this.props.users[0].userId, this.props.users[0].token)
            .then(roomStatistics => {
                this.setState({roomStatistics});
            })
            .catch(err => console.log(err));
    }

    onRoomAdd(values) {
        console.log(values);
        if (!values.building.id) {
            const selectedBuilding = this.state.buildingOptions.find(building => building.name === values.building.name);
            values.building.id = selectedBuilding && selectedBuilding.id;
        }

        savePlace({
            placeName: values.roomName,
            description: values.description,
            idPlaceType: 2,
            outerPlace: {idPlace: values.building.id},
            idUser: this.props.users[0].userId,
        },
        this.props.users[0].token
        )
        .then(savedRoom => {
            console.log(savedRoom);
            this.setState({addedSuccessfully: true});
            this.downloadRoomStatistics();
        })
        .catch(err => {
            console.log(err);
            this.setState({addingError: true});
        });
    }

    render() {
        return (
            <div>
                <Breadcrumb className="mt-3 mb-2">
                    <Breadcrumb.Item>
                        <Link to="/"><span class="oi oi-home"></span></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/">{this.props.users[0].username}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Помещения</Breadcrumb.Item>
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
                                <span class="oi oi-plus mr-1"></span> Помещение
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
                                <Card.Title>Добавление нового помещения</Card.Title>
                                {this.state.addedSuccessfully &&
                                    <Alert variant="success" onClose={() => this.setState({addedSuccessfully: false})} dismissible>
                                        Помещение успешно добавлено
                                    </Alert>
                                }
                                {this.state.addingError &&
                                    <Alert variant="danger" onClose={() => this.setState({addingError: false})} dismissible>
                                        Ошибка при добавлении помещения
                                    </Alert>
                                }
                                <Formik
                                    validationSchema={this.roomSchema}
                                    onSubmit={(values, actions) => {
                                        this.onRoomAdd(values);
                                        this.typeaheadBuilding.getInstance().clear();
                                        actions.resetForm();
                                    }}
                                    initialValues={{
                                        roomName: "",
                                        description: "",
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        touched,
                                        isValid,
                                        errors,
                                        resetForm,
                                        setFieldValue,
                                    }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="4" className="text-right">
                                                    Строение
                                                </Form.Label>
                                                <Col sm="8">
                                                    <BuildingTypeahead 
                                                        options={this.state.buildingOptions}
                                                        setFieldValue={setFieldValue}
                                                        getReference={(typeahead) => this.typeaheadBuilding = typeahead}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="4" className="text-right">
                                                    Название помещения
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control  
                                                        placeholder = "Название помещения"
                                                        type = "text"
                                                        name = "roomName"
                                                        value={values.roomName}
                                                        onChange={handleChange}
                                                        isValid={touched.roomName && !errors.roomName}
                                                        isInvalid={!!errors.roomName}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.roomName}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm="4" className="text-right">
                                                    Примечание
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control as="textarea" rows="3"
                                                        placeholder = "Примечание"
                                                        name = "description"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        isValid={touched.description && !errors.description}
                                                        isInvalid={!!errors.description}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.description}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>

                                            <Row className="text-right">
                                                <Col xs={0} sm={4}>
                                                </Col>
                                                <Col xs={12} sm={8} className="text-left">
                                                    <Button variant="success" type="submit" className="mr-2">
                                                        Добавить
                                                    </Button>
                                                    <Button variant="light" onClick={() => {this.setState({isExtended: false}); resetForm()}}>
                                                        Отмена
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                </Collapse>
                <Table responsive hover size="sm">
                    <thead>
                        <tr>
                            <th>Помещение</th>
                            <th>Вещей</th>
                            <th>Мест хранения</th>
                            <th>Строение</th>
                            <th>Cоздано</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.roomStatistics.map(room => (
                            <tr>
                                <td>
                                    <Link to={`/room/${room.idPlace}`}>{room.placeName}</Link>
                                </td>
                                <td>
                                    <Link to="/things">{room.thingCount}</Link>
                                </td>
                                <td>
                                    <Link to="/spaces">{room.spaceCount}</Link>
                                </td>
                                <td>
                                    <Link to="/building">{room.outerPlaceName}</Link>
                                </td>
                                <td>{Moment(room.creationTimestamp).format("HH:mm DD.MM.YY")}</td>
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
  )(RoomsListPage);
