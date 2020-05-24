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

import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Moment from 'moment';
import './SpacePage.css';
import { getUsers } from '../../../selectors/userSelector';
import { DeletionErrorModal } from '../../page-components/deletion_error_modal/DeletionErrorModal';
import { 
    getSpaceDataById,
    savePlace, 
    deletePlaceById,
    getPlacesByPlaceType,
    getPlacesByOuterPlaceId
} from '../../../api/placeService';
import BuildingTypeahead from '../../page-components/typeaheads/building_typeahead/BuildingTypeahead';
import RoomTypeahead from '../../page-components/typeaheads/room_typeahead/RoomTypeahead';
import TypeaheadHelper from '../../../componentHelpers/typeaheadHelpers/TypeaheadHelper';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class SpacePage extends Component {
    NO_DATA_STRING = "Нет данных";

    constructor (props) {
        super(props);
        this.state = {
            isExtended: false,
            thingCount: undefined,
            selectedBuilding: undefined,
            selectedRoom: undefined,
            spaceName: "",
            space: undefined,
            creationTimestamp: undefined,
            updateTimestamp: undefined,
            status: "",
            updatedSuccessfully: false,
            isShownDeletionErrorModal: false,
            deletionErrorMessage: "",
            buildingOptions: [],
            roomOptions: [],
        };

        this.spaceSchema = Yup.object().shape({
            building: Yup.string(),
            room: Yup.string(),
            spaceName: Yup.string()
                .required('Заполните это поле'),
            description: Yup.string(),
        });

        this.onDeleteBuilding = this.onDeleteBuilding.bind(this);
    }

    componentDidMount() {
        getSpaceDataById(
            this.props.match.params.id,
            this.props.users[0].userId, 
            this.props.users[0].token
            )
            .then(spaceData => {
                const outerRoom = spaceData.place.outerPlace;
                let outerdBuilding;
                if (outerRoom) {
                    outerdBuilding = outerRoom.outerPlace;
                }
                
                this.setState({
                    thingCount: spaceData.thingCount,
                    spaceName: spaceData.place.placeName,
                    space: spaceData.place,
                    creationTimestamp: spaceData.place.creationTimestamp,
                    updateTimestamp: spaceData.place.updateTimestamp,
                    status: spaceData.place.itemStatus.statusName,
                    selectedRoom: {id: outerRoom.idPlace, name: outerRoom.placeName},
                    selectedBuilding: outerdBuilding && {id: outerdBuilding.idPlace, name: outerdBuilding.placeName},
                });
                console.log(spaceData);
            });

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

    onSpaceUpdate(values) {
        console.log(values);

        if (!values.building || !values.room) {
            this.setState({addingError: true});
            return;
        }

        values.building.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(values.building, "buildingOptions");
        values.room.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(values.room, "roomOptions");

        let updatedPlace = Object.assign(this.state.space);
        updatedPlace.outerPlace = {
            idPlace: values.room.id,
            outerPlace: {
                idPlace: values.building.id 
            }
        };
        updatedPlace.placeName = values.spaceName;
        updatedPlace.description = values.description;

        savePlace(
            updatedPlace,
            this.props.users[0].token
        )
        .then(savedSpace => {
            console.log(savedSpace);
            const outerRoom = savedSpace.outerPlace;
            let outerdBuilding;
            if (outerRoom) {
                outerdBuilding = outerRoom.outerPlace;
            }

            this.setState({
                updatedSuccessfully: true,
                spaceName: savedSpace.placeName,
                space: savedSpace,
                creationTimestamp: savedSpace.creationTimestamp,
                updateTimestamp: savedSpace.updateTimestamp,
                status: savedSpace.itemStatus.statusName,
                selectedRoom: {id: outerRoom.idPlace, name: outerRoom.placeName},
                selectedBuilding: outerdBuilding && {id: outerdBuilding.idPlace, name: outerdBuilding.placeName},
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({addingError: true});
        });
    }

    setSelectedBuilding(setFieldValueFunc, propertyName, newValue) {
        newValue.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(newValue, "buildingOptions");
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
        newValue.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(newValue, "roomOptions");
        if (!newValue.id) {
            setFieldValueFunc(propertyName, {id: undefined, name: ""});
            return;
        }
        setFieldValueFunc(propertyName, newValue);
    }

    onDeleteBuilding() {
        console.log(this);
        if (this.state.thingCount > 0) {
            const errorMessage = `Невозможно удалить место хранения т.к. в нем находится ${this.state.thingCount} вещей.`
            this.setState({
                isShownDeletionErrorModal: true,
                deletionErrorMessage: errorMessage,
            });
            return;
        }
        deletePlaceById(this.state.space.idPlace, this.props.users[0].token)
            .then(() => {
                this.props.history.push("/spaces");
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
                    <Breadcrumb.Item>
                        <Link to="/spaces">Места хранения</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{this.state.spaceName}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col>
                        <h1 className="px-3 theme-header">{this.state.spaceName}</h1>
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
                                <Link to="/">Все <b>вещи</b> этого места хранения</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card bg="light" className="mt-3 mt-md-0"> 
                            <Card.Body>
                                Место хранения «{this.state.spaceName}» находится в 
                                помещении {this.state.selectedRoom && <Link to={`/room/${this.state.selectedRoom.id}`}>{this.state.selectedRoom.name}</Link>}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        {this.state.selectedBuilding &&    
                            <Card bg="light" className="mt-3 mt-md-0"> 
                                <Card.Body>
                                    Помещение «{this.state.selectedRoom.name}» находится в 
                                    строении {this.state.selectedBuilding && <Link to={`/building/${this.state.selectedBuilding.id}`}>{this.state.selectedBuilding.name}</Link>}
                                </Card.Body>
                            </Card>
                        }
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
                        <Button variant="danger" className="mb-2" onClick={this.onDeleteBuilding}>
                            <span class="oi oi-trash"></span> Удалить
                        </Button>
                    </Col>
                </Row>
                    <Collapse in={this.state.isExtended}>
                        <Card bg="light" className="mb-3"> 
                            <Card.Body>
                                <Card.Title>Редактирование места хранения «места хранения»</Card.Title>
                                <hr/>
                                {this.state.updatedSuccessfully &&
                                    <Alert variant="success" onClose={() => this.setState({updatedSuccessfully: false})} dismissible>
                                        Данные обновлены успешно!
                                    </Alert>
                                }
                                {this.state.addingError &&
                                    <Alert variant="danger" onClose={() => this.setState({addingError: false})} dismissible>
                                        Ошибка при обновлении данных
                                    </Alert>
                                }
                                <Formik
                                    enableReinitialize={true}
                                    validationSchema={this.spaceSchema}
                                    onSubmit={(values, actions) => {
                                        this.onSpaceUpdate(values);
                                        actions.resetForm();
                                        this.typeaheadBuilding.getInstance().clear();
                                        this.typeaheadRoom.getInstance().clear();
                                        actions.resetForm();
                                    }}
                                    initialValues={{
                                        spaceName: this.state.spaceName,
                                        description: (this.state.space && this.state.space.description) || "",
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
  )(SpacePage);
