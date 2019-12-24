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
    Alert,
    Collapse,
    Card,
    Table
} from 'react-bootstrap';

import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './RoomPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { DeletionErrorModal } from '../../page-components/deletion_error_modal/DeletionErrorModal';
import { getRoomDataById, savePlace, deletePlaceById, getPlacesByPlaceType } from '../../../api/placeService';
import * as Moment from 'moment';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class RoomPage extends Component {
    NO_DATA_STRING = "Нет данных";

    constructor (props) {
        super(props);
        this.state = {
            isExtended: false,
            spaceCount: undefined,
            thingCount: undefined,
            selectedBuilding: {},
            roomName: "",
            room: undefined,
            creationTimestamp: undefined,
            updateTimestamp: undefined,
            status: "",
            updatedSuccessfully: false,
            isShownDeletionErrorModal: false,
            deletionErrorMessage: "",
            options: [],
        };

        this.roomSchema = Yup.object().shape({
            buildingName: Yup.string(),
            roomName: Yup.string()
                .required('Заполните это поле'),
            description: Yup.string(),
        });

        this.onTypeaheadValueChange = this.onTypeaheadValueChange.bind(this);
    }

    componentDidMount() {
        getRoomDataById(
            this.props.match.params.id,
            this.props.users[0].userId, 
            this.props.users[0].token
            )
            .then(roomData => {
                this.setState({
                    spaceCount: roomData.spaceCount,
                    thingCount: roomData.thingCount,
                    roomName: roomData.place.placeName,
                    buildingName: roomData.place.outerPlace.placeName,
                    room: roomData.place,
                    creationTimestamp: roomData.place.creationTimestamp,
                    updateTimestamp: roomData.place.updateTimestamp,
                    status: roomData.place.itemStatus.statusName,
                    selectedBuilding: {id: roomData.place.outerPlace.idPlace, name: roomData.place.outerPlace.placeName},
                });
                console.log(roomData);
            });

        getPlacesByPlaceType(1 ,this.props.users[0].userId, this.props.users[0].token)
            .then((buildings) => {
                this.setState({
                    options: buildings.map(building => ({id: building.idPlace, name: building.placeName}))
                });
            });
    }

    onTypeaheadValueChange(selectedOptions) {
        this.setState({
            selectedBuilding: selectedOptions[0]
        });
        console.log(selectedOptions);
    }

    onRoomUpdate(values) {
        console.log(values);
        
        let updatedPlace = Object.assign(this.state.building);
        updatedPlace.outerPlace = {idPlace: this.state.selectedBuilding.id};
        updatedPlace.placeName = values.roomName;
        updatedPlace.description = values.description;

        savePlace(
            updatedPlace,
            this.props.users[0].token
        )
        .then(savedRoom => {
            console.log(savedRoom);
            this.setState({
                updatedSuccessfully: true,
                room: savedRoom,
                roomName: savedRoom.placeName,
                creationTimestamp: savedRoom.creationTimestamp,
                updateTimestamp: savedRoom.updateTimestamp,
                status: savedRoom.itemStatus.statusName,
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({updatingError: true});
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
                    <Breadcrumb.Item as={Link} to="/thingsList">Помещения</Breadcrumb.Item>
                    <Breadcrumb.Item active>{this.state.roomName}</Breadcrumb.Item>
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
                <DeletionErrorModal
                    show={this.state.isShownDeletionErrorModal}
                    onHide={() => this.setState({isShownDeletionErrorModal: false})}
                    errorMessage={this.state.deletionErrorMessage}
                />
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
                                <div>Количество вещей: {this.state.thingCount}</div>
                                <Link to="/">Все <b>вещи</b> этого строения</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card bg="light" className="mt-3 mt-md-0"> 
                            <Card.Body>
                                <div>Количество мест хранения: {this.state.spaceCount}</div>
                                <Link to="/">Все <b>места хранения</b> этого строения</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card bg="light" className="mt-3 mt-md-0"> 
                            <Card.Body>
                                Помещение «{this.state.roomName}» находится в 
                                строении <Link to={`/building/${this.state.selectedBuilding.id}`}>{this.state.selectedBuilding.name}</Link>
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
                                <Card.Title>Редактирование помещения «{this.state.roomName}»</Card.Title>
                                <hr/>
                                {this.state.addedSuccessfully &&
                                    <Alert variant="success" onClose={() => this.setState({updatedSuccessfully: false})} dismissible>
                                        Данные обновлены успешно!
                                    </Alert>
                                }
                                <Formik
                                    enableReinitialize={true}
                                    validationSchema={this.roomSchema}
                                    onSubmit={(values, actions) => {
                                        this.onRoomUpdate(values);
                                    }}
                                    initialValues={{
                                        roomName: this.state.roomName,
                                        description: (this.state.room && this.state.room.description) || "",
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
                                    }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="4" className="text-right">
                                                    Строение
                                                </Form.Label>
                                                <Col sm="8">
                                                    {/*<Form.Control defaultValue="Строение" />*/}
                                                    <Typeahead
                                                        labelKey="name"
                                                        options={this.state.options}
                                                        placeholder="Выберите строение"
                                                        onChange={this.onTypeaheadValueChange}
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
                                                        {errors.password}
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
                                                        {errors.password}
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>

                                            <Row className="text-right">
                                                <Col xs={0} sm={4}>
                                                </Col>
                                                <Col xs={12} sm={8} className="text-left">
                                                    <Button variant="success" type="submit" className="mr-2">
                                                        Сохранить
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
            </div>
        )
    }
}

export default connect(
    mapStateToProps
  )(RoomPage);
