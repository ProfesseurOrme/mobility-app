import React from "react";
import {ITraffic} from "../../types/traffic/ITraffic";
import axios, {AxiosResponse} from "axios";
import {apiTraffic} from "../../api/traffic";
import {Badge, Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {GeoJSON, MapContainer, Popup, TileLayer} from "react-leaflet";
import {mapProperties} from "../../props/mapProperties";
import { ICarpool } from "../../types/traffic/iCarpool";
import {IParking} from "../../types/traffic/IParking";

type ICarpoolState = {
    loaded : boolean,
    data : ICarpool[]
}

type IParkingState = {
    loaded : boolean,
    data : IParking[]
}

const Traffic: React.FunctionComponent = () => {

    const [ traffic, setTraffic ] = React.useState<Array<ITraffic>>([]);
    const [ loaded, setLoaded ] = React.useState<boolean>(false);
    const [carpool, setCarpool] = React.useState<ICarpoolState>({
            loaded : false,
            data : []
        })
    ;
    const [parking, setParking] = React.useState<IParkingState>({
            loaded : false,
            data : []
        })
    ;

    React.useEffect(() => {
        getTraffic();
    }, [])

    const getTraffic = (): void => {
        getTrafficData()
            .then((res) => {
                setTraffic(res.data.records);
            })
            .finally(() => {
                setLoaded(true);
            })
        ;
    }

    const getTrafficData = (): Promise<AxiosResponse> => {
        return axios.get(apiTraffic);
    }

    const getColor = (state: string): string => {
        let color: string = "";
        switch (state) {
            case "FLUIDE" :
                color = "green";
                break;
            case "DENSE" :
                color = "orange";
                break;
            case "EMBOUTEILLE" :
                color = "red";
                break;
            case "PARALYSE" :
                color = "black";
                break;
            default :
                color = "grey";
        }
        return color;
    }

    return (
        <>
            <Row>
                <Col>
                    <h1 className={"mt-4"}>
                        Real time traffic
                    </h1>
                </Col>
            </Row>
            <hr className={"mt-0"}/>
            {(Array.isArray(traffic) && traffic.length && loaded) ?
                <>
                    <Row>
                        <Col lg={8} className={"my-2"}>
                            <Card>
                                <MapContainer
                                    {...mapProperties}
                                    style={{height: "500px"}}
                                >
                                    <TileLayer
                                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                                        attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                                    />
                                    {
                                        traffic.map((value, index) => (
                                            <GeoJSON
                                                key={index}
                                                style={{
                                                    fillColor: getColor(value.fields.etat),
                                                    fillOpacity: 1,
                                                    color: getColor(value.fields.etat),
                                                    opacity: 1
                                                }}
                                                data={value.fields.geo_shape}
                                            >
                                                <Popup>
                                                    <p><strong>State : {value.fields.etat}</strong></p>
                                                    <p><strong>Path type : {value.fields.typevoie}</strong></p>
                                                </Popup>
                                            </GeoJSON>
                                        ))
                                    }
                                </MapContainer>
                            </Card>
                        </Col>
                        <Col lg={4} className={"my-2"}>
                            <Card className={"h-100"}>
                                <Card.Body>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Display carpool areas"
                                        />
                                    </Form>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Display car parking areas"
                                        />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"my-2"}>
                            <Card className={"h-100"}>
                                <Card.Body>
                                    <h4>Data details : </h4>
                                    <Row>
                                        <Col>
                                            <Badge pill bg="success">
                                                Fluid
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge pill bg="warning" text="dark">
                                                Heavy
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge pill bg="danger">
                                                Jam
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge pill bg="dark">
                                                Paralyzed
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <Badge pill bg="secondary">
                                                Unknown
                                            </Badge>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
                :
                <Row>
                    <Col className={"text-center"}>
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
                    </Col>
                </Row>
            }
        </>
    )
}

export default Traffic;
