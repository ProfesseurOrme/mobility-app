import {GeoJSON, LatLngExpression} from "leaflet";

export type ICycleStation = {
    datasetid: string,
    recordid: string,
    fields:
        {
            gml_id: string,
            commune: string,
            geo_point_2d: LatLngExpression,
            nbvelos: number,
            geo_shape: GeoJSON.GeoJsonObject,
            cdate: string,
            mdate: string,
            nbplaces: number,
            ident: number,
            gid: number,
            nom: string,
            type: string,
            nbelec: string,
            etat: string,
            code_commune: string,
            nbclassiq: string,
            geom_o: string
        },
    geometry : GeoJSON.GeoJsonObject,
    record_timestamp: string
}
