import React from "react";
import {Badge, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import axios, {AxiosResponse} from "axios";
import {IPublicTransportStation} from "../../types/publicTransport/IPublicTransportStation";
import {IPublicTransportPath} from "../../types/publicTransport/IPublicTransportPath";
import {apiTramwayPaths, apiTramwayStations} from "../../api/tramway";
import {mapProperties} from "../../props/mapProperties";
import {GeoJSON, MapContainer, Marker, TileLayer} from "react-leaflet";
import {divIcon} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {MdTram} from "react-icons/md";

type PublicTransportState = {
    stations: IPublicTransportStation[] | [],
    paths: IPublicTransportPath[] | [],
    loaded: boolean
}

const Tram = () => {

    const [ trams, setTrams ] = React.useState<PublicTransportState>({
        stations: [],
        paths: [],
        loaded: false
    })

    const [ tram, setTram ] = React.useState<IPublicTransportStation | null>();

    React.useEffect(() => {
        getTrams();
    }, []);

    const setColor = (gid : string) => {
        switch (gid) {
            case "59" :
                return "#831f82"
            case "60" :
                return "#da003e"
            case "61" :
                return "#d35098"
            case "62" :
                return "#9260a0"
        }
    }

    const getTrams = () => {
        Promise.all([getData(apiTramwayStations), getData(apiTramwayPaths)])
            .then((values) => {
                setTrams(prevState => ({
                    ...prevState,
                    stations : values[0].data.records,
                    paths: values[1].data.records
                }))
            })
            .finally(() => {
                setTrams(prevState => ({
                    ...prevState,
                    loaded : true
                }))
            })
    }

    const getData = (url: string): Promise<AxiosResponse> => {
        return axios.get(url);
    }

    return (
        <>
            <Row>
                <Col>
                    <h1 className={"mt-4"}>
                        Public transports
                    </h1>
                </Col>
            </Row>
            <hr className={"mt-0"}/>
            {
                (Array.isArray(trams.stations) && trams.stations.length && Array.isArray(trams.paths) && trams.paths.length && trams.loaded) ?
                    <>
                        <Row>
                            <Col className={"my-2"}>
                                <Card>
                                    <MapContainer
                                        {...mapProperties}
                                        style={{height: "500px"}}
                                    >
                                        <TileLayer
                                            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                                            attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                                        />
                                        {
                                            trams.stations.map((station, index) => (
                                                    <Marker
                                                        key={index}
                                                        position={station.fields.geo_point_2d}
                                                        icon={divIcon({
                                                            className: "custom-icon",
                                                            html: ReactDOMServer.renderToString(<MdTram style={{
                                                                width: "17px",
                                                                height: "17px",
                                                                borderRadius: "50%",
                                                                padding: "0.2rem 0.2rem",
                                                                backgroundColor: "blueviolet"
                                                            }} color={"#ffffff"}/>)
                                                        })}
                                                        eventHandlers={{
                                                            click: () => {
                                                                console.log("Attends frer")
                                                            }
                                                        }}
                                                    >
                                                    </Marker>
                                            ))
                                        }
                                        {
                                            trams.paths.map((path, index) => (
                                                <GeoJSON
                                                    key={index}
                                                    style={{fillColor: "red", fillOpacity: 0.5, color: setColor(path.fields.rs_sv_ligne_a), opacity: 0.5}}
                                                    data={path.fields.geo_shape}
                                                />
                                            ))
                                        }
                                    </MapContainer>
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
                                                <p style={{
                                                    backgroundColor : "#831f82",
                                                    padding: "0.1rem 0rem 0.1rem 1rem",
                                                    borderRadius: "0.8rem"
                                                }}>
                                                    Ligne A
                                                </p>
                                            </Col>
                                            <Col>
                                                <p style={{
                                                    backgroundColor : "#da003e",
                                                    padding: "0.1rem 0rem 0.1rem 1rem",
                                                    borderRadius: "0.8rem"
                                                }}>
                                                    Ligne B
                                                </p>
                                            </Col>
                                            <Col>
                                                <p style={{
                                                    backgroundColor : "#d35098",
                                                    padding: "0.1rem 0rem 0.1rem 1rem",
                                                    borderRadius: "0.8rem"
                                                }}>
                                                    Ligne C
                                                </p>
                                            </Col>
                                            <Col>
                                                <p style={{
                                                    backgroundColor : "#9260a0",
                                                    padding: "0.1rem 0rem 0.1rem 1rem",
                                                    borderRadius: "0.8rem"
                                                }}>
                                                    Ligne D
                                                </p>
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

export default Tram;
