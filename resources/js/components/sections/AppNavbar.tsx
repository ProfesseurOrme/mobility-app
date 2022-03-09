import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
// @ts-ignore
import logo from "../../assets/img/logo.svg";
import {useTranslation} from "react-i18next";

const AppNavbar : React.FunctionComponent = () => {

    const {t} = useTranslation();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to={"/"}>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block"
                        />{' '}
                        {t("brand")}
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={"/bikes-stations"}>
                            <Nav.Link href="#features">Bikes Stations</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/bus-stations"}>
                            <Nav.Link href="#pricing">Bus Stations</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/car-parking"}>
                            <Nav.Link href="#pricing">Car Parking</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;
