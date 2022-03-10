import {GeoJSON, LatLngExpression} from "leaflet";

export type IPublicTransportStation = {
    datasetid: string,
    recordid: string,
    fields: {
        numordre: number,
        geom_o: string,
        groupe: string,
        insee: string,
        vehicule: string,
        geo_shape: GeoJSON.GeoJsonObject,
        libelle: string,
        cdate: string,
        gid: number,
        source: string,
        type: string,
        actif: number,
        ident: string,
        gml_id: string,
        voirie: string,
        numero: 1220,
        geo_point_2d: LatLngExpression,
        mdate: string
    },
    geometry: {
        type: string,
        coordinates: LatLngExpression
    },
    record_timestamp: string
}
