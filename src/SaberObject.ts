import { IStringIndex } from './Utils'
import Pure from './PureMethod'
import SaberCore from "./SaberCore";

type ObjectFunction = (this: object, _null: null) => object

/**
 * @class
 * @classdesc Represents an enhanced Object of Saber
 * This class consists of utility based methods. Methods in this class are all pure and produce immutable data.
 */
export default class SaberObject extends SaberCore {
    readonly value: IStringIndex

    constructor(value: any) {
        super('SaberObject')
        if (typeof value === 'undefined') value = {}
        else if (typeof value !== 'object') value = { value }
        else if (value instanceof SaberObject) value = value['value']
        this.value = value
    }

    /**
     * @method
     * Static factory method for SaberObject
     * Recommended over the default constructor since it has better typing guard
     * @param value {SaberObject | Object}
     */
    static create(value?: SaberObject | object | any): SaberObject {
        return new SaberObject(value)
    }

    /**
     * Changes a SaberObject.
     * @param o {Object} An object for immutable modification
     * @param objectFunction {ObjectFunction} A function which is pure, satisfying data immutability and returns an object
     * @param propertyChain {Array<string>} An array which contains the names of the properties to the target object sequentially
     * @return {SaberObject}
     */
    @Pure()
    static modify(
        o: object,
        objectFunction: ObjectFunction,
        propertyChain: string[] = []
    ): object {
        let f: (o: IStringIndex, i: number) => object
        const c = propertyChain
        return (f = (o: IStringIndex, i: number): object => {
            if (i === c.length) return objectFunction.call(o, null)
            return {
                ...o,
                [c[i]]: f(o[c[i++]], i),
            }
        })(o, 0)
    }

    /**
     * Adds a property for a SaberObject.
     * @example
     * const s1 = new SaberObject({
     *   name: 'Object',
     *   info: {
     *      id: 1542,
     *      value: true
     * }})
     *
     * const s2 = o.add('value', false, [info])
     * @template T
     * @param propertyChain {Array<String>} An array which contains the names of the properties to the target object sequentially
     * @param property {String}
     * @param value {T}
     * @return {SaberObject}
     */
    @Pure()
    add<T>(property: string, value: T, propertyChain?: string[]): SaberObject {
        return SaberObject.create(
            SaberObject.modify(
                this.value,
                function (this: object) {
                    return {
                        ...this,
                        [property]: value,
                    }
                },
                propertyChain
            )
        )
    }

    /**
     * Deletes the property with the given propertyChain.
     * @param property {String} Property to be deleted
     * @param propertyChain {Array<String>} An array of strings for the path
     * @return {SaberObject}
     */
    @Pure()
    remove(property: string, propertyChain?: string[]): SaberObject {
        return SaberObject.create(
            SaberObject.modify(
                this.value,
                function (this: object) {
                    const self: IStringIndex = {
                        ...this,
                    }
                    delete self[property]
                    return self
                },
                propertyChain
            )
        )
    }

    /**
     * Copies the SaberObject
     * @return {SaberObject}
     */
    @Pure()
    copy(): SaberObject {
        return SaberObject.create({
            ...this.value,
        })
    }

    /**
     * Merges two SaberObjects and returns a new one.
     * @param s {SaberObject} An object to be merged with the base object
     * @return {SaberObject}
     */
    @Pure()
    merge(s: SaberObject): SaberObject {
        return SaberObject.create(Object.assign(this.value, s.value))
    }
}
