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
import './ThingPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { getItemById } from '../../../api/thingService';
import { DEFAULT_STRINGS } from '../../../utils/string_constants/defaultStrings';
import * as Moment from 'moment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BuildingTypeahead from '../../page-components/typeaheads/building_typeahead/BuildingTypeahead';
import RoomTypeahead from '../../page-components/typeaheads/room_typeahead/RoomTypeahead';
import SpaceTypeahead from '../../page-components/typeaheads/space_typeahead/SpaceTypeahead';
import CategoryTypeahead from '../../page-components/typeaheads/category_typeahead/CategoryTypeahead';
import { 
    getPlacesByPlaceType,
    getPlacesByOuterPlaceId
} from '../../../api/placeService';
import { getAllItemsByUserId, updateItem } from '../../../api/thingService';
import { getCategories } from '../../../api/categoryService';
import TypeaheadHelper from '../../../componentHelpers/typeaheadHelpers/TypeaheadHelper';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class ThingPage extends Component {

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
            updatedSuccessfully: false,
            isShownDeletionErrorModal: false,
            deletionErrorMessage: "",
            selectedBuilding: undefined,
            selectedRoom: undefined,
            selectedSpace: undefined,
            buildingOptions: [],
            roomOptions: [],
            spaceOptions: [],
            categoryOptions: [],
        };

        this.typeaheadBuilding = undefined;
        this.typeaheadRoom = undefined;
        this.typeaheadSpace = undefined;
        this.typeaheadCategory = undefined;

        this.thingSchema = Yup.object().shape({
            building: Yup.string(),
            room: Yup.string(),
            space: Yup.string(),
            category: Yup.string(),
            thingName: Yup.string()
                .required('Заполните это поле'),
            description: Yup.string(),
        });

        console.log(this.props.match.params);
    }

    componentDidMount() {
        this.downloadItem();

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
        
        getPlacesByPlaceType(3 ,this.props.users[0].userId, this.props.users[0].token)
            .then((spaces) => {
                this.setState({
                    spaceOptions: spaces.map(space => ({id: space.idPlace, name: space.placeName}))
                });
            });

        getCategories(this.props.users[0].userId, this.props.users[0].token)
            .then((categories) => {
                this.setState({
                    categoryOptions: categories.map(category => ({id: category.idCategory, name: category.categoryName}))
                });
            });
    }

    downloadItem() {
        getItemById(
            this.props.match.params.id,
            this.props.users[0].userId, 
            this.props.users[0].token
        )
        .then(thingWithPlaces => {
            this.setState({
                thingWithPlaces,
                thingName: thingWithPlaces.item.itemName,
                placesNames: thingWithPlaces.places.map(place => place.placeName),
                creationTimestamp: thingWithPlaces.item.creationTimestamp,
                updateTimestamp: thingWithPlaces.item.updateTimestamp,
                status: thingWithPlaces.item.itemStatus.statusName,
            });
            console.log(this.state.thingWithPlaces);
        });
    }

    onThingUpdate(values) {
        console.log(values);

        if (!values.building || !values.room || !values.space) {
            this.setState({addingError: true});
            return;
        }

        values.building.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(values.building, "buildingOptions", this);
        values.room.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(values.room, "roomOptions", this);
        values.space.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(values.space, "spaceOptions", this);

        let category;
        try {
            const categoryId = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(values.category, "categoryOptions", this);
            category = {
                idCategory: categoryId,
            };
        } catch(err) {
            // Do nothing
        }

        let updatedItem = Object.assign(this.state.thingWithPlaces.item);
        updatedItem.itemName = values.thingName;
        updatedItem.category = category;
        updatedItem.place = {
            idPlace: values.space.id,
            outerPlace: {
                idPlace: values.room.id,
                outerPlace: {
                    idPlace: values.building.id,
                },
            },
        };
        updatedItem.description = values.description;
        updatedItem.itemStatus = {
            idStatus: 1,
        };

        updateItem(
            updatedItem,
            this.props.users[0].token
        )
        .then(thingWithPlaces => {
            console.log(thingWithPlaces);
            this.setState({
                addedSuccessfully: true,
                thingWithPlaces,
                thingName: thingWithPlaces.item.itemName,
                placesNames: thingWithPlaces.places.map(place => place.placeName),
                creationTimestamp: thingWithPlaces.item.creationTimestamp,
                updateTimestamp: thingWithPlaces.item.updateTimestamp,
                status: thingWithPlaces.item.itemStatus.statusName,
            });

        })
        .catch(err => {
            console.log(err);
            this.setState({addingError: true});
        });
    }

    setSelectedBuilding(setFieldValueFunc, propertyName, newValue) {
        newValue.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(newValue, "buildingOptions", this);
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
        newValue.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(newValue, "roomOptions", this);
        if (!newValue.id) {
            this.setState({
                spaceOptions: []
            });
            setFieldValueFunc(propertyName, {id: undefined, name: ""});
            return;
        }

        getPlacesByOuterPlaceId(newValue.id ,this.props.users[0].userId, this.props.users[0].token)
            .then((spaces) => {
                this.setState({
                    spaceOptions: spaces.map(space => ({id: space.idPlace, name: space.placeName}))
                });
            })
            .then(() => {
                setFieldValueFunc(propertyName, newValue);
            });
    }

    setSelectedSpace(setFieldValueFunc, propertyName, newValue) {
        newValue.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(newValue, "spaceOptions", this);
        if (!newValue.id) {
            setFieldValueFunc(propertyName, {id: undefined, name: ""});
            return;
        }
        setFieldValueFunc(propertyName, newValue);
    }

    setSelectedCategory(setFieldValueFunc, propertyName, newValue) {
        newValue.id = TypeaheadHelper.tryToFindItemIdInTypeaheadOptions(newValue, "categoryOptions", this);
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
                    <Breadcrumb.Item>
                        <Link to="/things">Вещи</Link>
                    </Breadcrumb.Item>
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
                                {this.state.placesNames[2] 
                                    ? <>Вещь <b>«{this.state.thingName}»</b> находится в месте ханения <Link to="/">{this.state.placesNames[2]}</Link></>
                                    : DEFAULT_STRINGS.NO_DATA_STRING
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card bg="light" className="mt-3 mt-md-0"> 
                            <Card.Body>
                                {this.state.placesNames[1] 
                                    ? <>Вещь <b>«{this.state.thingName}»</b> находится в помещении <Link to="/">{this.state.placesNames[1]}</Link></>
                                    : DEFAULT_STRINGS.NO_DATA_STRING
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card bg="light" className="mt-3 mt-md-0"> 
                            <Card.Body>
                                {this.state.placesNames[0] 
                                    ? <>Вещь <b>«{this.state.thingName}»</b> находится в строении <Link to="/">{this.state.placesNames[0]}</Link></>
                                    : DEFAULT_STRINGS.NO_DATA_STRING
                                }
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
                            <Card.Title>Добавление новой вещи</Card.Title>
                            {this.state.addedSuccessfully &&
                                <Alert variant="success" onClose={() => this.setState({addedSuccessfully: false})} dismissible>
                                    Вещь успешно добавлено
                                </Alert>
                            }
                            {this.state.addingError &&
                                <Alert variant="danger" onClose={() => this.setState({addingError: false})} dismissible>
                                    Ошибка при добавлении вещи
                                </Alert>
                            }
                            <Formik
                                enableReinitialize={true}
                                validationSchema={this.thingSchema}
                                onSubmit={(values, actions) => {
                                    this.onThingUpdate(values);
                                    actions.resetForm();
                                    this.typeaheadBuilding.getInstance().clear();
                                    this.typeaheadRoom.getInstance().clear();
                                    this.typeaheadSpace.getInstance().clear();
                                    this.typeaheadCategory.getInstance().clear();
                                    actions.resetForm();
                                }}
                                initialValues={{
                                    thingName: this.state.thingName,
                                    description: (this.state.thingWithPlaces && this.state.thingWithPlaces.item.description) || "",
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
                                                Место хранения
                                            </Form.Label>
                                            <Col sm="8">
                                                <SpaceTypeahead 
                                                    options={this.state.spaceOptions}
                                                    setFieldValue={this.setSelectedSpace.bind(this, setFieldValue)}
                                                    getReference={(typeahead) => this.typeaheadSpace = typeahead}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Категория
                                            </Form.Label>
                                            <Col sm="8">
                                                <CategoryTypeahead 
                                                    options={this.state.categoryOptions}
                                                    setFieldValue={this.setSelectedCategory.bind(this, setFieldValue)}
                                                    getReference={(typeahead) => this.typeaheadCategory = typeahead}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="4" className="text-right">
                                                Название вещи
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control
                                                    placeholder = "Название вещи"
                                                    type = "text"
                                                    name = "thingName"
                                                    value={values.thingName}
                                                    onChange={handleChange}
                                                    isValid={touched.thingName && !errors.thingName}
                                                    isInvalid={!!errors.thingName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.thingName}
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
  )(ThingPage);
