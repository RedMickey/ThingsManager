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
import * as Moment from 'moment';
import './SpacesListPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { 
    savePlace, 
    getSpaceStatistics, 
    getPlacesByPlaceType,
    getPlacesByOuterPlaceId
} from '../../../api/placeService';
import SpaceHelper from '../../../componentHelpers/spaceCompHelpers/spaceHelper';
import BuildingTypeahead from '../../page-components/typeaheads/building_typeahead/BuildingTypeahead';
import RoomTypeahead from '../../page-components/typeaheads/room_typeahead/RoomTypeahead';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class SpacesListPage extends Component {
    
    NO_DATA_STRING = "Нет данных";

    constructor (props) {
        super(props);
        this.state = {
            isExtended : false,
            spaceStatistics: [],
            addedSuccessfully: false,
            addingError: false,
            buildingOptions: [],
            roomOptions: [],
        };

        this.typeaheadBuilding = undefined;
        this.typeaheadRoom = undefined;

        this.spaceSchema = Yup.object().shape({
            building: Yup.string(),
            room: Yup.string(),
            spaceName: Yup.string()
                .required('Заполните это поле'),
            description: Yup.string(),
        });

        this.onSpaceAdd = this.onSpaceAdd.bind(this);
        this.setSelectedBuilding = this.setSelectedBuilding.bind(this);
    }

    componentDidMount() {
        this.downloadSpaceStatistics();

        getPlacesByPlaceType(1 ,this.props.users[0].userId, this.props.users[0].token)
            .then((buildings) => {
                this.setState({
                    buildingOptions: buildings.map(building => ({id: building.idPlace, name: building.placeName}))
                });
            });

        getPlacesByPlaceType(2 ,this.props.users[0].userId, this.props.users[0].token)
            .then((rooms) => {
                this.setState({
                    roomOptions: rooms.map(room => ({id: room.idPlace, name: room.placeName}))
                });
            });
    }

    downloadSpaceStatistics() {
        getSpaceStatistics(this.props.users[0].userId, this.props.users[0].token)
            .then(spaceStatistics => {
                this.setState({spaceStatistics});
            })
            .catch(err => console.log(err));
    }

    onSpaceAdd(values) {
        console.log(values);

        if (!values.building || !values.room) {
            this.setState({addingError: true});
            return;
        }

        values.building.id = SpaceHelper.tryToFindPlaceIdInTypeaheadOptions(values.building, "buildingOptions", this);
        values.room.id = SpaceHelper.tryToFindPlaceIdInTypeaheadOptions(values.room, "roomOptions", this);

        savePlace({
            placeName: values.spaceName,
            description: values.description,
            idPlaceType: 3,
            outerPlace: {idPlace: values.room.id},
            idUser: this.props.users[0].userId,
            },
            this.props.users[0].token
        )
        .then(savedSpace => {
            console.log(savedSpace);
            this.setState({addedSuccessfully: true});
            this.downloadSpaceStatistics();
        })
        .catch(err => {
            console.log(err);
            this.setState({addingError: true});
        });
    }

    setSelectedBuilding(setFieldValueFunc, propertyName, newValue) {
        newValue.id = SpaceHelper.tryToFindPlaceIdInTypeaheadOptions(newValue, "buildingOptions", this);
        if (!newValue.id) {
            this.setState({
                roomOptions: []
            });
            setFieldValueFunc(propertyName, {id: undefined, name: ""});
            return;
        }

        getPlacesByOuterPlaceId(newValue.id ,this.props.users[0].userId, this.props.users[0].token)
            .then((rooms) => {
                this.setState({
                    roomOptions: rooms.map(room => ({id: room.idPlace, name: room.placeName}))
                });
            })
            .then(() => {
                setFieldValueFunc(propertyName, newValue);
            });
    }

    setSelectedRoom(setFieldValueFunc, propertyName, newValue) {
        newValue.id = SpaceHelper.tryToFindPlaceIdInTypeaheadOptions(newValue, "roomOptions", this);
        if (!newValue.id) {
            setFieldValueFunc(propertyName, {id: undefined, name: ""});
            return;
        }
        setFieldValueFunc(propertyName, newValue);
    }

    render() {
        return (
            <div>
                <Breadcrumb className="mt-3 mb-2">
                    <Breadcrumb.Item href="#"><span class="oi oi-home"></span></Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to="/">
                        {this.props.users[0].username}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Места хранения</Breadcrumb.Item>
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
                                <span class="oi oi-plus mr-1"></span> Место
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
                                    validationSchema={this.spaceSchema}
                                    onSubmit={(values, actions) => {
                                        this.onSpaceAdd(values);
                                        actions.resetForm();
                                        this.typeaheadBuilding.getInstance().clear();
                                        this.typeaheadRoom.getInstance().clear();
                                        actions.resetForm();
                                    }}
                                    initialValues={{
                                        spaceName: "",
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
                                                        setFieldValue={this.setSelectedBuilding.bind(this, setFieldValue)}
                                                        getReference={(typeahead) => this.typeaheadBuilding = typeahead}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="4" className="text-right">
                                                    Помещение
                                                </Form.Label>
                                                <Col sm="8">
                                                    <RoomTypeahead 
                                                        options={this.state.roomOptions}
                                                        setFieldValue={this.setSelectedRoom.bind(this, setFieldValue)}
                                                        getReference={(typeahead) => this.typeaheadRoom = typeahead}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="4" className="text-right">
                                                    Название места хранения
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        placeholder = "Название места хранения"
                                                        type = "text"
                                                        name = "spaceName"
                                                        value={values.spaceName}
                                                        onChange={handleChange}
                                                        isValid={touched.spaceName && !errors.spaceName}
                                                        isInvalid={!!errors.spaceName}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.spaceName}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
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
                            <th>Место хранения</th>
                            <th>Вещей</th>
                            <th>Помещение</th>
                            <th>Строение</th>
                            <th>Cоздано</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.spaceStatistics.map(space => (
                            <tr>
                                <td>
                                    <Link to={`/space/${space.idPlace}`}>{space.placeName}</Link>
                                </td>
                                <td>
                                    <Link to="/things">{space.thingCount}</Link>
                                </td>
                                <td>
                                    {space.roomName 
                                        ? <Link to={`/room/${space.idRoom}`}>{space.roomName}</Link>
                                        : <div>{this.NO_DATA_STRING}</div>
                                    }
                                </td>
                                <td>
                                    {space.buildingName 
                                        ? <Link to={`/building/${space.idBuilding}`}>{space.buildingName}</Link>
                                        : <div>{this.NO_DATA_STRING}</div>
                                    }
                                </td>
                                <td>{Moment(space.creationTimestamp).format("HH:mm DD.MM.YY")}</td>
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
  )(SpacesListPage);
