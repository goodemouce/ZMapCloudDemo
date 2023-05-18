
/// <reference path="Cesium.d.ts" />

declare namespace Cesium
{
    export var _shaders:any;
    export var TweenCollection:any;

    export var when:any;
    export var knockout:any;

    export class Destroyable
    {
        /// Methods 
        destroy():undefined;
        isDestroyed(): boolean;
    }

    export enum TextureWrap
    {
        CLAMP_TO_EDGE,
        REPEAT,
        MIRRORED_REPEAT
    }

    export class Sampler
    {
        wrapS: TextureWrap;
        wrapT: TextureWrap;
        minificationFilter: TextureMinificationFilter;
        magnificationFilter: TextureMagnificationFilter;
        maximumAnisotropy: number;

        constructor(options?: {
            wrapS?: TextureWrap,
            wrapT?: TextureWrap,
            minificationFilter?: TextureMinificationFilter,
            magnificationFilter?: TextureMagnificationFilter,
            maximumAnisotropy?: number
        });
    }

    type Movement = { 
        startPosition?: Cesium.Cartesian2, 
        endPosition?: Cesium.Cartesian2,
        distance ?: {
            startPosition: Cesium.Cartesian2;
            endPosition: Cesium.Cartesian2;
        },
        angleAndHeight ?: {
            startPosition: Cesium.Cartesian2;
            endPosition: Cesium.Cartesian2;
        },
        prevAngle ?: number
    }

    type TextureSource = ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|{width:number, height:number, arrayBufferView:Uint8Array};

    export class Texture extends Destroyable
    {
        constructor(options?:{
            context?:any,
            width?:number,
            height?:number,
            source?:TextureSource,
            pixelFormat?:any,
            pixelDatatype?:any,
            preMultiplyAlpha?:boolean,
            flipY?:boolean,
            sampler?:Sampler
        });

        readonly id:string;
        sampler:Sampler;
        readonly pixelFormat:any;
        readonly pixelDatatype:any;
        readonly dimensions:Cartesian2;
        readonly preMultiplyAlpha:boolean;
        readonly flipY:boolean;
        readonly width:number;
        readonly height:number;
        readonly sizeInBytes:number;
        readonly _target:number;

        /// 
        copyFrom(source:TextureSource, xOffset?:number, yOffset?:number):void;
        copyFromFramebuffer(xOffset?:number, yOffset?:number, framebufferXOffset?:number, framebufferYOffset?:number, width?:number, height?:number):void;
    }

    interface MaterialCache
    {
        _materials: {},
        addMaterial(type:string, materialTemplate:any):void,
        getMaterial(type:string):any,
    }

    export namespace Material
    {
        const _materialCache:MaterialCache
    }

    abstract class InterpolationAlgorithm
    {

    }

    class LinearApproximation extends InterpolationAlgorithm {}
    class LagrangePolynomialApproximation extends InterpolationAlgorithm {}
    class HermitePolynomialApproximation extends InterpolationAlgorithm {}

    

    

    type TypedArray = Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array;

    export namespace ComponentDatatype
    {
        function createArrayBufferView(componentDatatype:ComponentDatatype, buffer:ArrayBuffer, byteOffset:number, length:number):TypedArray;
        function createTypedArray(componentDatatype:ComponentDatatype, valuesOrLength:number | number[]): TypedArray;
        function fromName(name:string): ComponentDatatype;
        function fromTypedArray(array:TypedArray): ComponentDatatype;
        function getSizeInBytes(componentDatatype:ComponentDatatype): number;
        function validate(componentDatatype:ComponentDatatype) :boolean;
    }

    export interface Camera
    {
        _setTransform(transform:Matrix4):void;
    }

    export namespace Property 
    {
        function equals(left:Property, right:Property):boolean;
        function arrayEquals(left:Property[], right:Property[]):boolean;
        function isConstant(property:Property):boolean;
        function getValueOrUndefined(property:Property, time:JulianDate, result?:any):any;
        function getValueOrDefault(property:Property, time:JulianDate, valueDefault?:any, result?:any):any;
    }
    
    export function createPropertyDescriptor(name:string, configurable?:boolean, createPropertyCallback?:() => Property): PropertyDescriptor;

    export namespace Transforms
    {
        function rotationMatrixFromPositionVelocity(position:Cartesian3, velocity:Cartesian3, ellipsoid?:Ellipsoid, result?:Matrix3):Matrix3;
    }

    const EllipsoidalOccluder: any;
}


