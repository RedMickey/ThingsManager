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
import './BuildingsListPage.css';
import { getUsers } from '../../../selectors/userSelector';
import { ImageUploader } from '../../page-components/image-uploader/ImageUploader';
import { savePlaceAndImages, getBuildingStatistics } from '../../../api/placeService';
import * as Moment from 'moment';

const mapStateToProps = state => ({
    users: getUsers(state),
});

export class BuildingsListPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isExtended : false,
            buildingStatistics: [],
            addedSuccessfully: false,
            addingError: false,
        };
        
        this.buildingSchema = Yup.object().shape({
            buildingName: Yup.string()
                .required('Заполните это поле'),
            description: Yup.string(),
            imgPromises: Yup.array(),
        });

        this.imageUploader = undefined;

        this.onBuildingAdd = this.onBuildingAdd.bind(this);
    }
    
    componentDidMount() {
        this.downloadBuildingStatistics();
    }

    downloadBuildingStatistics() {
        getBuildingStatistics(this.props.users[0].userId, this.props.users[0].token)
            .then(buildingStatistics => {
                this.setState({buildingStatistics});
            })
            .catch(err => console.log(err));
    }

    onBuildingAdd(values) {
        console.log(values);

        Promise.resolve()
        .then(() => {
            if (values.imgPromises.length > 0) {
                return Promise.allSettled(values.imgPromises)
                .then(results => {
                    return results.filter(imgRes => imgRes.status === "fulfilled")
                        .map(imgRes => imgRes.value);
                });
            }
            return [];
        })
        .then((placeImages) => {
            return savePlaceAndImages({
            placeName: values.buildingName,
            description: values.description,
            idPlaceType: 1,
            idUser: this.props.users[0].userId,
        },
        placeImages,
        this.props.users[0].token
        );})
        .then(savedBuilding => {
            console.log(savedBuilding);
            this.setState({addedSuccessfully: true});
            this.downloadBuildingStatistics();
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
                    <Breadcrumb.Item href="#"><span class="oi oi-home"></span></Breadcrumb.Item>
                    <Breadcrumb.Item as={Link} to="/">
                        {this.props.users[0].username}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Строения</Breadcrumb.Item>
                </Breadcrumb>
                <Row className="mb-2">
                    <Col xs={12} sm={8} md={9} >
                        <Formik
                            validationSchema={this.credentialsSchema}
                            onSubmit={(values) => {
                                console.log("onLoginSubmit");
                                this.onLoginSubmit(values);
                            }}
                            initialValues={{
                                email: "",
                                password: "",
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
                            }) => (
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
                            )}
                        </Formik>
                    </Col>
                    <Col xs={12} sm={4} md={3} >
                        <ButtonToolbar className="float-right mb-2">
                            <Button 
                                variant="primary" size="sm" className="mr-2"
                                onClick={() => this.setState({isExtended: !this.state.isExtended})}
                                aria-controls="example-collapse-text"
                                aria-expanded={this.state.isExtended}
                            >
                                <span class="oi oi-plus mr-1"></span> Строение
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
                                        Строение успешно добавлено
                                    </Alert>
                                }
                                <Formik
                                    validationSchema={this.buildingSchema}
                                    onSubmit={(values, actions) => {
                                        this.onBuildingAdd(values);
                                        actions.resetForm();
                                    }}
                                    onReset={(values, formikBag) => {
                                        this.imageUploader.reset();
                                    }}
                                    initialValues={{
                                        buildingName: "",
                                        description: "",
                                        imgPromises: [],
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
                                            <Form.Group as={Row} >
                                                <Form.Label column sm="4" className="text-right">
                                                    Название строения
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control 
                                                        placeholder = "Например, «Моя квартира»"
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
                                            <Form.Group as={Row} >
                                                <Form.Label column sm="4" className="text-right">
                                                    Изображения
                                                </Form.Label>
                                                <Col sm="8">
                                                    <ImageUploader 
                                                        setFieldValue={setFieldValue}
                                                        propertyName="imgPromises"
                                                        ref={(imageUploader) => this.imageUploader = imageUploader}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} >
                                                <Form.Label column sm="4" className="text-right">
                                                    Примечание
                                                </Form.Label>
                                                <Col sm="8">
                                                    <Form.Control as="textarea" rows="3" 
                                                        placeholder = "Например, «Квартира где я живу. Город Солнечный, ул. Радужная»"
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
                            <th>Строение</th>
                            <th>Вещей</th>
                            <th>Помещений</th>
                            <th>Мест хранения</th>
                            <th>Cоздано</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.buildingStatistics.map(building => (
                            <tr>
                                <td>
                                    <Link to={`/building/${building.idPlace}`}>{building.placeName}</Link>
                                </td>
                                <td>
                                    <Link to="/things">{building.thingCount}</Link>
                                </td>
                                <td>
                                    <Link to="/rooms">{building.roomCount}</Link>
                                </td>
                                <td>
                                    <Link to="/spaces">{building.spaceCount}</Link>
                                </td>
                                <td>{Moment(building.creationTimestamp).format("HH:mm DD.MM.YY")}</td>
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
  )(BuildingsListPage);
