import React from "react";
import {Col, Container, Row } from "react-bootstrap";
import {FaLaravel, FaReact} from "react-icons/fa";

const AppFooter : React.FunctionComponent = () => {
    return (
        <Container>
            <Row >
                <Col className={"text-center vertical-align-center"}>
                    <p className={"text-white m-1"}>Made with Laravel <FaLaravel /> and React <FaReact /> - Github <a href={"#"}>repo</a> - ProfesseurOrme</p>
                </Col>
            </Row>
        </Container>
    )
}

export default AppFooter;
