import React from "react";
import {ITraffic} from "../../types/traffic/ITraffic";
import axios, {AxiosResponse} from "axios";
import {apiTraffic} from "../../api/traffic";
import {Badge, Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {mapProperties} from "../../props/mapProperties";
import {ICarpool} from "../../types/traffic/iCarpool";
import {IParking} from "../../types/traffic/IParking";
import {apiCarpoolAreas} from "../../api/carpool";
import {apiCarPakingAreas} from "../../api/parking";
import {divIcon} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {BsFillPeopleFill} from "react-icons/bs";
import {RiParkingFill} from "react-icons/ri";
import Carpool from "./Data/Carpool";
import Parking from "./Data/Parking";

type IState = {
    loaded: boolean,
    checked: boolean
    data: (ICarpool[] | IParking[]) | []
}

type Details = {
    data: ICarpool | IParking,
    kind: string
};

const Traffic: React.FunctionComponent = () => {

    const [ traffic, setTraffic ] = React.useState<Array<ITraffic>>([]);
    const [ loaded, setLoaded ] = React.useState<boolean>(false);
    const [ carpool, setCarpool ] = React.useState<IState>({
            loaded: false,
            checked: false,
            data: []
        })
    ;
    const [ parking, setParking ] = React.useState<IState>({
            loaded: false,
            checked: false,
            data: []
        })
    ;

    const [ details, setDetails ] = React.useState<Details | null>(null);

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

    const getAdditionalData = (checked: boolean, setState: React.Dispatch<React.SetStateAction<IState>>, valueState: IState, url: string): void => {
        if (Array.isArray(valueState.data) && valueState.data.length && checked) {
            setState(prevState => ({
                ...prevState,
                loaded: true,
                checked: checked
            }))
        } else if (checked) {
            axios.get(url)
                .then((results) => {
                    setState(prevState => ({
                        ...prevState,
                        data: results.data.records
                    }));
                })
                .finally(() => {
                    setState(prevState => ({
                        ...prevState,
                        loaded: true,
                        checked: true
                    }))
                })
        } else {
            setState(prevState => ({
                ...prevState,
                checked: checked,
                selected: null
            }))
        }
    }

    const getTrafficData = (): Promise<AxiosResponse> => {
        return axios.get(apiTraffic);
    }

    const getColor = (state: string): string => {
        let color: string;
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

    const getDetails = (obj: any) => {
        if (obj.kind === "parking") {
            return <Parking parking={obj.data}/>
        } else if (obj.kind === "carpool") {
            return <Carpool carpool={obj.data}/>
        }
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
                                        attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
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
                                    {
                                        (carpool.loaded && carpool.checked && Array.isArray(carpool.data) && carpool.data.length) ?
                                            carpool.data.map((value, index) => (
                                                <Marker
                                                    key={index}
                                                    position={value.fields.geo_point_2d}
                                                    icon={divIcon({
                                                        className: "custom-icon",
                                                        html: ReactDOMServer.renderToString(<BsFillPeopleFill style={{
                                                            width: "22px",
                                                            height: "22px",
                                                            borderRadius: "50%",
                                                            padding: "0.25rem 0.3rem",
                                                            backgroundColor: "violet"
                                                        }} color={"#ffffff"}/>)
                                                    })}
                                                    eventHandlers={{
                                                        click: () => {
                                                            setDetails({
                                                                data: value,
                                                                kind: "carpool"
                                                            })
                                                        }
                                                    }}
                                                >
                                                </Marker>
                                            ))
                                            :
                                            <></>
                                    }
                                    {
                                        (parking.loaded && parking.checked && Array.isArray(parking.data) && parking.data.length) ?
                                            parking.data.map((value, index) => (
                                                <Marker
                                                    key={index}
                                                    position={value.fields.geo_point_2d}
                                                    icon={divIcon({
                                                        className: "custom-icon",
                                                        html: ReactDOMServer.renderToString(<RiParkingFill style={{
                                                            width: "22px",
                                                            height: "22px",
                                                            borderRadius: "50%",
                                                            padding: "0.25rem 0.3rem",
                                                            backgroundColor: "blue"
                                                        }} color={"#ffffff"}/>)
                                                    })}
                                                    eventHandlers={{
                                                        click: () => {
                                                            setDetails({
                                                                data: value,
                                                                kind: "parking"
                                                            })
                                                        }
                                                    }}
                                                >
                                                </Marker>
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
                                            label="Display carpool areas"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                                getAdditionalData(
                                                    event.target.checked,
                                                    setCarpool,
                                                    carpool,
                                                    apiCarpoolAreas
                                                )
                                            }}
                                        />
                                    </Form>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Display car parking areas"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                                getAdditionalData(
                                                    event.target.checked,
                                                    setParking,
                                                    parking,
                                                    apiCarPakingAreas
                                                )
                                            }}
                                        />
                                    </Form>
                                </Card.Body>
                                {
                                    ((details !== null)) ?
                                        getDetails(details)
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
