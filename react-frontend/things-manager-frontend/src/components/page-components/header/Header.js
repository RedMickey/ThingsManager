import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Container,
    Nav, 
    Navbar, 
    Image,
    NavDropdown,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { doRemoveUser } from '../../../actions/userAct';
import { getUsers } from '../../../selectors/userSelector';
import './Header.css';

const mapStateToProps = state => ({
    users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(doRemoveUser()),
});

export class Header extends Component {
    constructor(props){
        super(props);
        console.log(this.props.users);
        console.log(this.props.users.length);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.onLogout();
    }

    render() {
        return (
            <Navbar fixed={"top"} bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <Image src="/images/box.png" className="min-logo-img" />
                        Мои вещи                       
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    {this.props.users.length < 1 ? (
                        <>
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="about">Цены</Nav.Link>
                                <Nav.Link as={Link} to="/">Условия</Nav.Link>
                                <Nav.Link as={Link} to="/">О системе</Nav.Link>
                                <Nav.Link as={Link} to="/">Контакты</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to="/">Вход / регистрация</Nav.Link>
                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">
                                    <span className="oi oi-home"></span> Строения
                                </Nav.Link>
                                <Nav.Link as={Link} to="/">
                                    <span className="oi oi-flag"></span> Помещения
                                </Nav.Link>
                                <Nav.Link as={Link} to="/">
                                    <span className="oi oi-map-marker"></span> Места хранения
                                </Nav.Link>
                                <Nav.Link as={Link} to="about">
                                    <span className="oi oi-briefcase"></span> Вещи
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to="/">
                                    <span className="oi oi-tags"></span> Категории
                                </Nav.Link>
                                <NavDropdown title="Настройки" id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/">Action</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/">Another action</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.onLogout}>Выйти</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                    )}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
