import moment from "moment";
import React from "react";
import {Badge, Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {GeoJSON, MapContainer, Marker, TileLayer} from "react-leaflet";
import {mapProperties} from "../../props/mapProperties";
import axios, {AxiosResponse} from "axios";
import {ICycleStation} from "../../types/cycle/ICycleStation";
import {divIcon} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {FaBiking} from "react-icons/fa";
import {
    apiBikeStations,
    apiCycleDoubleDirection,
    apiCycleDoubleDirectionCirculation,
    apiCycleLanes,
    apiCyclePaths
} from "../../api/bike";
import {ICyclePath} from "../../types/cycle/ICyclePath";

const Cycle: React.FunctionComponent = () => {

    const [ loaded, setLoaded ] = React.useState<boolean>(false);
    const [ cycleStations, setCycleStations ] = React.useState<Array<ICycleStation>>([]);
    const [ cyclePaths, setCyclePaths ] = React.useState<Array<ICyclePath>>([])
    const [ cycleStation, setCycleStation ] = React.useState<ICycleStation | null>(null);
    const [ displayCyclePaths, setDisplayCyclePaths ] = React.useState(false);

    React.useEffect(() => {
        getStations();
    }, []);

    const getBikePaths = (checked: boolean) => {
        if (Array.isArray(cyclePaths) && cyclePaths.length && checked) {
            setDisplayCyclePaths(checked);
        } else if (checked) {
            Promise.all([ axios.get(apiCycleDoubleDirection), axios.get(apiCycleLanes), axios.get(apiCycleDoubleDirectionCirculation), axios.get(apiCyclePaths) ])
                .then((values) => {
                    values.forEach(value => {
                        setCyclePaths(prevState => [ ...prevState, ...value.data.records ])
                    })
                })
                .finally(() => {
                    setDisplayCyclePaths(true);
                })
        } else {
            setDisplayCyclePaths(checked);
        }
    }

    const getStations = (): void => {
        getCycleStations()
            .then((res) => {
                setCycleStations(res.data.records);
            })
            .finally(() => {
                setLoaded(true);
            })
        ;
    }

    const getCycleStations = (): Promise<AxiosResponse> => {
        return axios.get(apiBikeStations);
    }

    const iconMarker = (etat: string, bikes: number) => {
        let color: string = "";
        switch (etat) {
            case "CONNECTEE" :
                color = "#0a9396";
                break;
            case "DECONNECTEE" :
                color = "#9b2226";
                break;
        }

        switch (bikes) {
            case 0:
                color = "#9b2226";
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

    const displayInfos = (fields: ICycleStation) => {
        setCycleStation(fields);
    }

    return (
        <>
            <Row>
                <Col>
                    <h1 className={"mt-4"}>
                        Cycle
                        stations {(Array.isArray(cycleStations) && cycleStations.length && loaded) ? ` : ${cycleStations.length}` : ""}
                    </h1>
                </Col>
            </Row>
            <hr className={"mt-0"}/>
            {(Array.isArray(cycleStations) && cycleStations.length && loaded) ?
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
                                    cycleStations.map((bikeStation, index) => (
                                        <Marker
                                            key={index}
                                            position={bikeStation.fields.geo_point_2d}
                                            icon={iconMarker(bikeStation.fields.etat, bikeStation.fields.nbvelos)}
                                            eventHandlers={{
                                                click: () => {
                                                    displayInfos(bikeStation);
                                                }
                                            }}
                                        >
                                        </Marker>
                                    ))
                                }
                                {
                                    (displayCyclePaths) ?
                                        cyclePaths.map((cyclePath, index) => (
                                            <GeoJSON
                                                key={index}
                                                style={{fillColor: "red", fillOpacity: 0.5, color: "red", opacity: 0.5}}
                                                data={cyclePath.fields.geo_shape}
                                            />
                                        ))
                                        :
                                        <></>
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
                                        label="Display cycles paths"
                                        checked={displayCyclePaths}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                            getBikePaths(event.target.checked);
                                        }}
                                    />
                                </Form>
                            </Card.Body>
                            {(cycleStation !== null) ?
                                <>
                                    <hr/>
                                    <Card.Body>
                                        <h4>{cycleStation.fields.nom}</h4>{' '}
                                        {(cycleStation.fields.etat === "CONNECTEE") ?
                                            <Badge bg="success">Available</Badge> :
                                            <Badge bg="danger">Unavailable</Badge>}{' '}
                                        {(cycleStation.fields.nbvelos === 0) ? <Badge bg="danger">No bikes</Badge> : <></>}
                                        {(cycleStation.fields.type === "VLS+") ? <Badge bg="primary">VCUB+</Badge> : <></>}
                                        <p>Commune : <strong>{cycleStation.fields.commune}</strong></p>
                                        <p>Number of places available
                                            : <strong>{cycleStation.fields.nbplaces}</strong></p>
                                        <p>Number of bikes available
                                            : <strong>{cycleStation.fields.nbvelos}</strong></p>
                                        <p>Number of classics bikes available
                                            : <strong>{cycleStation.fields.nbclassiq}</strong></p>
                                        <p>Number of electrics bikes available
                                            : <strong>{cycleStation.fields.nbelec}</strong></p>
                                        <p><small>
                                            Last update
                                            : {moment(cycleStation.fields.mdate).locale("fr").format("LLLL")}
                                        </small></p>
                                    </Card.Body>
                                </>
                                :
                                <></>
                            }
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
                                            <FaBiking style={{
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "50%",
                                                padding: "0.25rem 0.3rem",
                                                backgroundColor: "#0a9396"
                                            }} color={"#ffffff"}/> Available station
                                        </Col>
                                        <Col>
                                            <FaBiking style={{
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "50%",
                                                padding: "0.25rem 0.3rem",
                                                backgroundColor: "#9b2226"
                                            }} color={"#ffffff"}/> Unavailable station or bikes
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
                :
                <Row>
                    <Col className={"text-center my-2"}>
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

export default Cycle;
