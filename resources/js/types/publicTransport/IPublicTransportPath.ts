import {GeoJSON} from "leaflet";

export type IPublicTransportPath = {
    datasetid: string,
    recordid: string,
    fields: {
        geo_shape: GeoJSON.GeoJsonObject,
    },
    record_timestamp: string
}
