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
    Table,
    Alert
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import './ThingsListPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { getAllItemsByUserId, saveItem } from '../../../api/thingService';
import { getCategories } from '../../../api/categoryService';
import { DEFAULT_STRINGS } from '../../../utils/string_constants/defaultStrings';
import { 
    getPlacesByPlaceType,
    getPlacesByOuterPlaceId
} from '../../../api/placeService';
import * as Moment from 'moment';
import * as Yup from 'yup';
import TypeaheadHelper from '../../../componentHelpers/typeaheadHelpers/TypeaheadHelper';
import BuildingTypeahead from '../../page-components/typeaheads/building_typeahead/BuildingTypeahead';
import RoomTypeahead from '../../page-components/typeaheads/room_typeahead/RoomTypeahead';
import SpaceTypeahead from '../../page-components/typeaheads/space_typeahead/SpaceTypeahead';
import CategoryTypeahead from '../../page-components/typeaheads/category_typeahead/CategoryTypeahead';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class ThingsListPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isExtended : false,
            thingsWithPlaces: [],
            addedSuccessfully: false,
            addingError: false,
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

        this.onThingAdd = this.onThingAdd.bind(this);

    }

    componentDidMount() {
        this.downloadItems();

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

    downloadItems() {
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

    onThingAdd(values) {
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

        saveItem(
            {
                idUser: this.props.users[0].userId,
                itemName: values.thingName,
                category,
                place: {
                    idPlace: values.space.id,
                    outerPlace: {
                        idPlace: values.room.id,
                        outerPlace: {
                            idPlace: values.building.id,
                        },
                    },
                },
                itemStatus: {
                    idStatus: 1,
                },
                description: values.description,
            },
            this.props.users[0].token
        )
        .then(savedThing => {
            console.log(savedThing);
            this.setState({addedSuccessfully: true});
            this.downloadItems();
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
                                validationSchema={this.thingSchema}
                                onSubmit={(values, actions) => {
                                    this.onThingAdd(values);
                                    actions.resetForm();
                                    this.typeaheadBuilding.getInstance().clear();
                                    this.typeaheadRoom.getInstance().clear();
                                    this.typeaheadSpace.getInstance().clear();
                                    this.typeaheadCategory.getInstance().clear();
                                    actions.resetForm();
                                }}
                                initialValues={{
                                    thingName: "",
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
                                    <Link to={`/thing/${thingWithPlaces.item.idItem}`}>{thingWithPlaces.item.itemName}</Link>
                                </td>
                                {thingWithPlaces.places.map(place => (
                                    <td>{place.placeName || DEFAULT_STRINGS.NO_DATA_STRING}</td>
                                ))}
                                <td>{(thingWithPlaces.item.category && thingWithPlaces.item.category.categoryName) || DEFAULT_STRINGS.NO_DATA_STRING}</td>
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
