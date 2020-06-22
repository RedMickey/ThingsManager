import React, { Component } from 'react';
import { 
    Breadcrumb, 
    Row, 
    Col, 
    Image, 
    Form, 
    Button, 
    Alert, 
    Dropdown,
    InputGroup,
    FormControl,
    ButtonToolbar,
    Collapse,
    Card,
    Table,
    Carousel
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './BuildingPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { DeletionErrorModal } from '../../page-components/deletion_error_modal/DeletionErrorModal';
import { getBuildingDataById, savePlace, deletePlaceById } from '../../../api/placeService';
import * as Moment from 'moment';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class BuildingPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isExtended: false,
            roomCount: undefined,
            spaceCount: undefined,
            thingCount: undefined,
            buildingName: "",
            building: undefined,
            creationTimestamp: undefined,
            updateTimestamp: undefined,
            status: "",
            updatedSuccessfully: false,
            isShownDeletionErrorModal: false,
            deletionErrorMessage: "",
            placeImages: [],
        };

        this.buildingSchema = Yup.object().shape({
            buildingName: Yup.string()
                .required('Заполните это поле'),
            description: Yup.string(),
        });

        this.onBuildingUpdate = this.onBuildingUpdate.bind(this);
        this.onDeleteBuilding = this.onDeleteBuilding.bind(this);
    }

    componentDidMount() {
        getBuildingDataById(
            this.props.match.params.id,
            this.props.users[0].userId, 
            this.props.users[0].token
            )
            .then(buildingData => {
                this.setState({
                    roomCount: buildingData.roomCount,
                    spaceCount: buildingData.spaceCount,
                    thingCount: buildingData.thingCount,
                    buildingName: buildingData.place.placeName,
                    building: buildingData.place,
                    creationTimestamp: buildingData.place.creationTimestamp,
                    updateTimestamp: buildingData.place.updateTimestamp,
                    status: buildingData.place.itemStatus.statusName,
                    placeImages: buildingData.placeImages,
                });
                console.log(buildingData);
            });
    }

    onBuildingUpdate(values) {
        console.log(values);
        
        let updatedPlace = Object.assign(this.state.building);
        updatedPlace.placeName = values.buildingName;
        updatedPlace.description = values.description;

        savePlace(
            updatedPlace,
            this.props.users[0].token
        )
        .then(savedBuilding => {
            console.log(savedBuilding);
            this.setState({
                updatedSuccessfully: true,
                building: savedBuilding,
                buildingName: savedBuilding.placeName,
                creationTimestamp: savedBuilding.creationTimestamp,
                updateTimestamp: savedBuilding.updateTimestamp,
                status: savedBuilding.itemStatus.statusName,
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({updatingError: true});
        });
    }

    onDeleteBuilding() {
        if (this.state.roomCount > 0 || this.state.spaceCount > 0 || this.state.thingCount > 0) {
            const errorMessage = `Невозможно удалить строение т.к. в нем находится ${this.state.roomCount} помещений, ` + 
                `${this.state.spaceCount} мест хранения и ${this.state.thingCount} вещей.`
            this.setState({
                isShownDeletionErrorModal: true,
                deletionErrorMessage: errorMessage,
            });
            return;
        }
        deletePlaceById(this.state.building.idPlace, this.props.users[0].token)
            .then(() => {
                this.props.history.push("/buildings");
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
                    <Breadcrumb.Item><Link to="/buildings">Строения</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{this.state.buildingName}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col>
                        <h1 className="px-3 theme-header">{this.state.buildingName}</h1>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={5}>
                        {this.state.placeImages.length > 0 &&   
                            <Carousel interval={null}>
                                {
                                    this.state.placeImages.map(image => 
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={image.imageLocation}
                                            />
                                        </Carousel.Item>
                                    )
                                }
                            </Carousel>
                        }
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
                                <div>Количество помещений: {this.state.roomCount}</div>
                                <Link to="/">Все <b>помещения</b> этого строения</Link>
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
                        <Button variant="danger" className="mb-2" onClick={this.onDeleteBuilding}>
                            <span class="oi oi-trash"></span> Удалить
                        </Button>
                    </Col>
                </Row>
                    <Collapse in={this.state.isExtended}>
                        <Card bg="light" className="mb-3"> 
                            <Card.Body>
                                <Card.Title>Редактирование cтроения «{this.state.buildingName}»</Card.Title>
                                <hr/>
                                {this.state.addedSuccessfully &&
                                    <Alert variant="success" onClose={() => this.setState({updatedSuccessfully: false})} dismissible>
                                        Данные обновлены успешно!
                                    </Alert>
                                }
                                <Formik
                                    enableReinitialize={true}
                                    validationSchema={this.buildingSchema}
                                    onSubmit={(values, actions) => {
                                        this.onBuildingUpdate(values);
                                    }}
                                    initialValues={{
                                        buildingName: this.state.buildingName,
                                        description: (this.state.building && this.state.building.description) || "",
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
                                                    Название cтроения
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control
                                                        placeholder = "Название строения"
                                                        type = "text"
                                                        name = "buildingName"
                                                        value={values.buildingName}
                                                        onChange={handleChange}
                                                        isValid={touched.buildingName && !errors.buildingName}
                                                        isInvalid={!!errors.buildingName}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.password}
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
  )(BuildingPage);
