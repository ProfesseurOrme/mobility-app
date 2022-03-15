import React from "react";
import {Badge, Card} from "react-bootstrap";
import {ICarpool} from "../../../types/traffic/iCarpool";
import moment from "moment";
import {BsFillPeopleFill} from "react-icons/bs";

type CarpoolProps = {
    carpool: ICarpool
}

const Carpool: React.FunctionComponent<CarpoolProps> = (props) => {

    const getOwner = (owner: string): string => {
        switch (owner) {
            case "BORDEAUX_METROPOLE" :
                return "Bordeaux Métropole";
            case "TRANSPORTS_BM" :
                return "Transports Bordeaux Métropole";
            case "COMMUNE" :
                return "Commune";
            case "PRIVE" :
                return "Privé";
            default :
                return "Autre";
        }
    }

    return (
        <>
            <hr/>
            <Card.Body>
                <h4>{props.carpool.fields.libelle} <BsFillPeopleFill style={{
                    width: "22px",
                    height: "22px",
                    padding: "0.25rem 0.3rem",
                    backgroundColor: "violet"
                }} color={"#ffffff"}/></h4>{' '}
                <hr/>
                {(props.carpool.fields.actif === "1") ?
                    <Badge bg="success">Available</Badge> :
                    <Badge bg="danger">Unavailable</Badge>
                }{' '}
                {(props.carpool.fields.accessibilite_24_24 === "1") ?
                    <Badge bg="success">24/24</Badge> : <></>
                }{' '}
                <hr/>
                <p className="card-text">
                    <strong>Adress : </strong>{props.carpool.fields.adresse}
                </p>
                <p className="card-text">
                    <strong>Owner : </strong>{getOwner(props.carpool.fields.gestionnaire)}
                </p>
                <p className="card-text">
                    <strong>Nb places available : </strong>{props.carpool.fields.nb_place}
                </p>
                <p className={"card-text"}><small>
                    Last update
                    : {moment(props.carpool.fields.mdate).locale("fr").format("LLLL")}
                </small></p>
            </Card.Body>
        </>
    )
}

export default Carpool;
