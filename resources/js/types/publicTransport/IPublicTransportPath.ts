import {GeoJSON} from "leaflet";

export type IPublicTransportPath = {
    datasetid: string,
    recordid: string,
    fields: {
        geo_shape: GeoJSON.GeoJsonObject,
        rs_sv_ligne_a : string
    },
    record_timestamp: string
}
