import {LatLngExpression} from "leaflet";

type MapProperties = {
    center : LatLngExpression
    scrollWheelZoom : boolean,
    zoom : number,
    zoomControl : boolean
}

export const mapProperties : MapProperties = {
    center : [44.8378, -0.594],
    scrollWheelZoom : false,
    zoom : 12,
    zoomControl : true
}
