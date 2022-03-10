import {GeoJSON} from "leaflet";

export type ITraffic = {
    datasetid: string,
    recordid: string,
    fields:
        {
            geo_shape: GeoJSON.GeoJsonObject,
            mdate: string,
            cdate: string
            typevoie: string,
            etat: string,
            code_commune: string
        },
    record_timestamp: string
};
