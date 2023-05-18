
declare namespace GeoJSON
{
    export type Position = number[];

    export type BBox = [number, number, number, number] | [number, number, number, number, number, number];

    export type GeoJsonTypes = GeoJSON['type'];

    export type GeoJsonGeometryTypes = Geometry['type'];

    export type Coordinates = Position | Position[] | Position[][] | Position[][][];

    export interface GeoJsonObject 
    {
        type: GeoJsonTypes;
        
        bbox?: BBox;
    }

    export type GeoJSON = Geometry | Feature | FeatureCollection;

    /**
     * Point geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.2
     */
    export interface Point extends GeoJsonObject {
        type: "Point";
        coordinates: Position;
    }

    /**
     * MultiPoint geometry object.
     *  https://tools.ietf.org/html/rfc7946#section-3.1.3
     */
    export interface MultiPoint extends GeoJsonObject {
        type: "MultiPoint";
        coordinates: Position[];
    }

    /**
     * LineString geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.4
     */
    export interface LineString extends GeoJsonObject {
        type: "LineString";
        coordinates: Position[];
    }

    /**
     * MultiLineString geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.5
     */
    export interface MultiLineString extends GeoJsonObject {
        type: "MultiLineString";
        coordinates: Position[][];
    }

    /**
     * Polygon geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.6
     */
    export interface Polygon extends GeoJsonObject {
        type: "Polygon";
        coordinates: Position[][];
    }

    /**
     * MultiPolygon geometry object.
     * https://tools.ietf.org/html/rfc7946#section-3.1.7
     */
    export interface MultiPolygon extends GeoJsonObject {
        type: "MultiPolygon";
        coordinates: Position[][][];
    }

    /**
     * Geometry Collection
     * https://tools.ietf.org/html/rfc7946#section-3.1.8
     */
    export interface GeometryCollection extends GeoJsonObject {
        type: "GeometryCollection";
        geometries: Geometry[];
    }

    export type GeoJsonProperties = { [name: string]: any; } | null;

    /**
     * A feature object which contains a geometry and associated properties.
     * https://tools.ietf.org/html/rfc7946#section-3.2
     */
    export interface Feature < Geo extends Geometry | null = Geometry, Prop = GeoJsonProperties> extends GeoJsonObject {
        type: "Feature";
        /**
         * The feature's geometry
         */
        geometry: Geo;
        /**
         * A value that uniquely identifies this feature in a
         * https://tools.ietf.org/html/rfc7946#section-3.2.
         */
        id?: string | number;
        /**
         * Properties associated with this feature.
         */
        properties: Prop;
    }

    /**
     * A collection of feature objects.
     *  https://tools.ietf.org/html/rfc7946#section-3.3
     */
    export interface FeatureCollection<Geo extends Geometry | null = Geometry, Prop = GeoJsonProperties> extends GeoJsonObject {
        type: "FeatureCollection";
        features: Array<Feature<Geo, Prop>>;
    }

    export type SimpleGeometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
    
    export type Geometry = SimpleGeometry | GeometryCollection;

    
}