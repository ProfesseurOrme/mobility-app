import {GeoJSON} from "leaflet";

export type ICyclePath = {
    datasetid : string,
    recordid : string,
    fields : {
        geo_shape : GeoJSON.GeoJsonObject,
        gid: number,
        annee: number,
        typeamena: string
    },
    record_timestamp : string
}
