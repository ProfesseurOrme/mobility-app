import React from "react";
import {Badge, Card} from "react-bootstrap";
import {IParking} from "../../../types/traffic/IParking";
import {RiParkingFill} from "react-icons/ri";

type ParkingProps = {
    parking: IParking
}

const Parking: React.FunctionComponent<ParkingProps> = (props) => {

    const getState = (state: string): JSX.Element => {
        switch (state) {
            case "LIBRE" :
                return <Badge bg="success">Available</Badge>
            case "COMPLET" :
                return <Badge bg="danger">Full</Badge>
            case "ABONNES" :
                return <Badge bg="warning">Subscribers</Badge>
            case "OUVERT" :
                return <Badge bg="success">Open</Badge>
            default :
                return <Badge bg={"danger"}>Closed</Badge>
        }
    }

    const getOwner = (owner: string): string => {
        switch (owner) {
            case "URBIS_PARK" :
                return "Urbis park"
            case "Q_PARK" :
                return "Q-park"
            case "INTERPARKING" :
                return "Interparking"
            case "INDIGO_PARK" :
                return "Indigo park"
            case "KEOLIS" :
                return "Keolis"
            case "EFFIA_STATIONNEMENT" :
                return "Effia Stationnement"
            case "MEGARAMA" :
                return "Megarama"
            case "GERAUD" :
                return "Geraud"
            case "PARCUB_BORDEAUX_METROPOLE" :
                return "Parcub Bordeaux Metropole"
            default :
                return "Autre"
        }
    }

    return (
        <>
            <hr/>
            <Card.Body>
                <span>
                    <h4>{props.parking.fields.nom} <RiParkingFill style={{
                        width: "22px",
                        height: "22px",
                        padding: "0.3rem",
                        backgroundColor: "blue"
                    }} color={"#ffffff"}/></h4>
                </span>
                <hr/>
                {getState(props.parking.fields.etat)}{' '}
                {(props.parking.fields.ta_type === "GRATUIT") ? <Badge bg="success">Free</Badge> : <></>}
                <hr/>
                <p className="card-text">
                    <strong>Adress : </strong>{props.parking.fields.adresse}
                </p>
                <p className="card-text">
                    <strong>Owner : </strong>{getOwner(props.parking.fields.exploit)}
                </p>
                {
                    (props.parking.fields.total > 0) ?
                        <p className="card-text">
                            <strong>Nb parking spaces : </strong> {props.parking.fields.total}
                        </p>
                        :
                        <></>
                }
                {
                    (props.parking.fields.np_2rmot > 0) ?
                        <p className="card-text">
                            <strong>Nb motocyles spaces : </strong> {props.parking.fields.np_2rmot}
                        </p>
                        :
                        <></>
                }
                {
                    (props.parking.fields.libres > 0) ?
                        <p className="card-text">
                            <strong>Nb spaces available : </strong> {props.parking.fields.libres}
                        </p>
                        :
                        <></>
                }
            </Card.Body>
        </>
    )
}

export default Parking;
