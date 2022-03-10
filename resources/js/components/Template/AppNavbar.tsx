import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
// @ts-ignore
import logo from "../../assets/img/logo.svg";
import {useTranslation} from "react-i18next";
import {FaBiking, FaBus, FaCar, FaRoad} from "react-icons/fa";

const AppNavbar : React.FunctionComponent = () => {

    const {t} = useTranslation();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to={"/"}>
                    <Navbar.Brand>
                        {t("brand")}
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={"/cycles-stations"}>
                            <Nav.Link><FaBiking /> Cycle Stations</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/public-transports"}>
                            <Nav.Link><FaBus /> Public Transports</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/traffic"}>
                            <Nav.Link><FaRoad /> Traffic</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;
