import React, { Component } from 'react';
import { 
    Jumbotron, 
    Row, 
    Col, 
    Image, 
    Form, 
    Button, 
    Card,
    Alert 
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { doUpdateUser } from '../../../actions/userAct';
import { BACKEND_CONFIG } from '../../../globalConfig';
import { getUsers } from '../../../selectors/userSelector';
import { sendLoginRequest, sendRegistrationRequest, getUserData } from '../../../api/userService';
import './MainPage.css';

const mapStateToProps = state => ({
    users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
    onLogin: (token, refreshToken, userEmail, username, userId) => dispatch(doUpdateUser(
        {
            token,
            refreshToken,
            userEmail,
            username,
            userId,
        }
    )),
});

export class MainPage extends Component {
    count = 0;

    constructor(props){
        super(props);

        this.state = {
            validated: false,
            loginError: false,
            registrationError: false,
          };

        this.onLoginSubmit = this.onLoginSubmit.bind(this);

        this.credentialsSchema = Yup.object().shape({
            email: Yup.string()
                .email('Некорректный email')
                .required('Заполните это поле'),
            password: Yup.string()
                .min(3, 'Пароль слишком короткий')
                .max(40, 'Превышен лимит символов')
                .required('Заполните это поле'),
        });

        this.registrationSchema = this.credentialsSchema.concat(
            Yup.object().shape({
                username: Yup.string()
                    .required('Заполните это поле'),
            })
        );
    }

    onRegistrationSubmit(values) {

        let user = {
            userEmail: values.email,
            name: values.username,
            password: values.password,
        };

        sendRegistrationRequest(user)
        /*fetch(GLOBAL_CONFIG.serverURL + "/user/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            mode: "cors",
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                this.setState({
                    registrationError: true,
                });
                throw new Error(response.status);
            }

            return response.json();
        })*/
        .then(result => {
            console.log(result);
            return this.onLoginSubmit({
                email: result.userEmail,
                password: values.password,
            });
        })
        .catch(err => {
            this.setState({
                registrationError: true,
            });
            console.log(err);
        });
    }

    onLoginSubmit(values) {
        let loginFormData = new FormData();
        loginFormData.append("username", values.email);
        loginFormData.append("password", values.password);
        loginFormData.append("grant_type", BACKEND_CONFIG.grantType);
        loginFormData.append("client_id", BACKEND_CONFIG.webClientId);

        sendLoginRequest(loginFormData)
        /*fetch(GLOBAL_CONFIG.serverURL + "/oauth/token", {
            method: "POST",
            headers: {
              "Authorization": "Basic " + btoa(`${GLOBAL_CONFIG.webClientId}:${GLOBAL_CONFIG.webClientSecret}`),
            },
            mode: "cors",
            body: loginFormData
        })
        .then(response => {
            if (!response.ok) {
                this.setState({
                    loginError: true,
                });
                throw new Error(response.status);
            }

            return response.json();
        })*/
        .then(result => {
            console.log(result);
            
            return getUserData(values.email, result.access_token)
                .then(userData => {
                    this.props.onLogin(
                        result.access_token,
                        result.refresh_token,
                        userData.userEmail,
                        userData.name,
                        userData.idUser,
                    );
                });
        })
        .catch(err => {
            this.setState({
                loginError: true,
            });
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <Jumbotron className="mx-sm-3 mt-3 mb-2 text-break">
                        <h1>Каталогизатор вещей</h1>
                        <p className="tsize-18">
                            Сервис для учета каталога вещей и предметов в квартире, доме, офисе, гараже, на даче.
                        </p>
                </Jumbotron>
                {this.props.users.length < 1 &&
                    <Row>
                        <Col xs={12} className="mb-3">
                            <h1 className="px-3 theme-header">Бесплатная регистрация</h1>
                        </Col>
                        <Col sm={12} md={6} className="px-sm-3">
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>Регистрация</Card.Title>
                                    {this.state.registrationError &&
                                        <Alert variant="danger" onClose={() => this.setState({registrationError: false})} dismissible>
                                            Данный email уже используется
                                        </Alert>
                                    }
                                    <Formik
                                        validationSchema={this.registrationSchema}
                                        onSubmit={(values) => {
                                            console.log("onRegistrationSubmit");
                                            console.log(values);
                                            this.onRegistrationSubmit(values);
                                        }}
                                        initialValues={{
                                            username: "",
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
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <Form.Group as={Row} controlId="regUsername">
                                                    <Form.Label column sm="4">
                                                        Ваше имя
                                                    </Form.Label>
                                                    <Col sm="8">
                                                    <Form.Control
                                                        type="text" 
                                                        placeholder="Имя"
                                                        name="username"
                                                        value={values.username}
                                                        onChange={handleChange}
                                                        isValid={touched.username && !errors.username}
                                                        isInvalid={!!errors.username}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.username}
                                                    </Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="regUserEmail">
                                                    <Form.Label column sm="4">
                                                        Email
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type = "text"
                                                            placeholder="email@example.com"
                                                            name="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            isValid={touched.email && !errors.email}
                                                            isInvalid={!!errors.email}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.email}
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} controlId="regUserPassword">
                                                    <Form.Label column sm="4">
                                                        Придумайте пароль
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control 
                                                            type="password" 
                                                            placeholder="Пароль"
                                                            name="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            isValid={touched.password && !errors.password}
                                                            isInvalid={!!errors.password}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.password}
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>

                                                <Row className="text-right">
                                                    <Col className="text-right">
                                                        <Button variant="primary" type="submit">
                                                            Зарегистрироваться <span class="oi oi-person ml-1"></span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} className="px-sm-3 mt-3 mt-md-0">
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>Вход в систему</Card.Title>
                                    {this.state.loginError &&
                                        <Alert variant="danger" onClose={() => this.setState({loginError: false})} dismissible>
                                            Неверный email или пароль
                                        </Alert>
                                    }
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
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <Form.Group as={Row} controlId="userEmail">
                                                    <Form.Label column sm="4">
                                                        Email
                                                    </Form.Label>
                                                    <Col sm="8">
                                                    <Form.Control
                                                        placeholder ="email@example.com"
                                                        type = "text"
                                                        name = "email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        isValid={touched.email && !errors.email}
                                                        isInvalid={!!errors.email}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="userPassword">
                                                    <Form.Label column sm="4">
                                                        Пароль
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Пароль" 
                                                            name = "password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            isValid={touched.password && !errors.password}
                                                            isInvalid={!!errors.password}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.password}
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>
                                                <Row className="text-right">
                                                    <Col xs={12} sm={6} className="text-xs-right text-sm-left mb-1 mb-sm-0">
                                                        <Link to="/about">Забыли пароль?</Link>
                                                    </Col>
                                                    <Col xs={12} sm={6} className="text-right">
                                                        <Button variant="success" type="submit">
                                                            Войти <span class="oi oi-account-login"></span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
                <Row className="mt-2">
                    <Col xs={12} className="mb-3">
                        <h1 className="px-3 theme-header">Зачем нужет котологизатор вещей</h1>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Image src="/images/time.png" className="mx-auto d-block" />
                        <h3>Трудно найти вещь</h3>
                        <p>Бывают ситуации, когда нужно найти вещь, но ее нигде нет. На поиски может уйти много времени.</p>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Image src="/images/planing.png" className="mx-auto d-block" />
                        <h3>Есть решение</h3>
                        <p>Все вещи можно внести в каталог с привязкой к их местонахождению. Это сократит время поиска до десятка секунд.</p>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage);
