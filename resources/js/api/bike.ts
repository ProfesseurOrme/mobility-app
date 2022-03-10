export const apiBikeStations: string = "https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?rows=10000&dataset=ci_vcub_p&timezone=Europe%2FParis&lang=fr";

export const apiCyclePaths: string = "https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?rows=9999&refine.typamena=PISTES_CYCL&basemap=jawg.streets&start=0&fields=gid,typamena,annee,geo_shape&dataset=fv_trvel_l&timezone=Europe%2FParis&lang=fr";

export const apiCycleLanes: string = "https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?refine.typamena=BANDES_CYCL&basemap=jawg.streets&start=0&fields=gid,typamena,annee,geo_shape&dataset=fv_trvel_l&timezone=Europe%2FParis&lang=fr";

export const apiCycleDoubleDirection: string = "https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?rows=9999&refine.typamena=BANDES_CYCL_DBLE_SENS&basemap=jawg.streets&start=0&fields=gid,typamena,annee,geo_shape&dataset=fv_trvel_l&timezone=Europe%2FParis&lang=fr";

export const apiCycleDoubleDirectionCirculation: string = "https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?rows=9999&refine.typamena=DBLE_SENS_CYCL&basemap=jawg.streets&start=0&fields=gid,typamena,annee,geo_shape&dataset=fv_trvel_l&timezone=Europe%2FParis&lang=fr";
