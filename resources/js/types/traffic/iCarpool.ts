import {GeoJSON, LatLngExpression} from "leaflet";

export type ICarpool = {
    datasetid: string,
    recordid: string,
    fields: {
        geo_point_2d: LatLngExpression,
        gestionnaire: string,
        mdate: string,
        id_local: string,
        insee: string,
        condition_acces: string,
        nb_place: 6,
        nb_pmr: 0,
        geo_shape: GeoJSON.Point,
        actif: string,
        nb_irve: number,
        cdate: string,
        gid: number,
        accessibilite_24_24: string,
        libelle: string,
        implantation: string,
        adresse: string,
        ident: string
    },
    geometry: GeoJSON.Point,
    "record_timestamp": string
}
