import moment from "moment";
import React from "react";
import {Badge, Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {mapProperties} from "../../props/mapProperties";
import axios from "axios";
import {IBikeStation} from "../../types/IBikeStation";
import {divIcon} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {FaBiking} from "react-icons/fa";

const Bike: React.FunctionComponent = () => {

    const [ bikeStations, setBikeStations ] = React.useState<Array<IBikeStation>>([]);
    const [ bikeStationInfos, setBikeStationInfos ] = React.useState<IBikeStation | null>(null);
    const [display, setDisplay] = React.useState();

    const iconMarker = (etat: string) => {
        let color: string = "";
        switch (etat) {
            case "CONNECTEE" :
                color = "#0a9396"
                break;
            case "DECONNECTEE" :
                color = "#9b2226"
                break;
        }
        return divIcon({
            className: "custom-icon",
            html: ReactDOMServer.renderToString(<FaBiking style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                padding: "0.25rem 0.3rem",
                backgroundColor: color
            }} color={"#ffffff"}/>)
        });
    }

    React.useEffect(() => {
        axios.get("https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?rows=10000&dataset=ci_vcub_p&timezone=Europe%2FBerlin&lang=fr")
            .then((res) => {
                setBikeStations(res.data.records);
            });
    }, []);

    const displayInfos = (fields: IBikeStation) => {
        setBikeStationInfos(fields);
    }
    return (
        <>
            <Row>
                <Col>
                    <h1 className={"mt-4"}>
                        Mobility by bike in the agglomeration
                    </h1>
                </Col>
            </Row>
            <hr className={"mt-0"}/>
            {(Array.isArray(bikeStations) && bikeStations.length) ?
                <Row>
                    <Col lg={8}>
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
                                    bikeStations.map((bikeStation, index) => (
                                        <Marker
                                            key={index}
                                            position={bikeStation.fields.geo_point_2d}
                                            icon={iconMarker(bikeStation.fields.etat)}
                                            eventHandlers={{
                                                click: () => {
                                                    displayInfos(bikeStation);
                                                }
                                            }}
                                        >
                                        </Marker>
                                    ))
                                }
                            </MapContainer>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className={"h-100"}>
                            <Card.Body>
                                <Form>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Display stations"
                                    />
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Display bike path"
                                    />
                                </Form>
                            </Card.Body>

                            {(bikeStationInfos !== null) ?
                                <>
                                    <hr/>
                                    <Card.Body>
                                        <h5>{bikeStationInfos.fields.nom}</h5>
                                        <Badge bg="primary">VCUB+</Badge>{' '}<Badge bg="secondary">Available</Badge>
                                        <p>Commune : <strong>{bikeStationInfos.fields.commune}</strong></p>
                                        <p>Number of places available
                                            : <strong>{bikeStationInfos.fields.nbplaces}</strong></p>
                                        <p>Number of bikes available
                                            : <strong>{bikeStationInfos.fields.nbvelos}</strong></p>
                                        <p>Number of classics bikes available
                                            : <strong>{bikeStationInfos.fields.nbclassiq}</strong></p>
                                        <p>Number of electrics bikes available
                                            : <strong>{bikeStationInfos.fields.nbelec}</strong></p>
                                        <p><small>
                                            Last update : {moment(bikeStationInfos.fields.mdate).locale("fr").format("LLLL")}
                                        </small></p>
                                    </Card.Body>
                                </>
                                :
                                <></>
                            }

                        </Card>
                    </Col>
                </Row>
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

export default Bike;
