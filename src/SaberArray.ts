import Pure from './PureMethod'
import SaberCore from "./SaberCore";

/**
 * @class
 * @classdesc Represents an enhanced Array of Saber
 * This class consists of utility based methods. Methods in this class are all pure and produce immutable data.
 */
export default class SaberArray<T> extends SaberCore{
    readonly value: T[]

    constructor(value?: T | T[] | SaberArray<T>) {
        super('SaberArray')
        if (typeof value === 'undefined') {
            this.value = []
        } else if (Array.isArray(value)) {
            this.value = value
        } else if (value instanceof SaberArray) {
            this.value = value['value']
        } else {
            this.value = [value]
        }
    }

    /**
     * @method
     * Static factory method for SaberArray
     * Recommended over the default constructor since it has better typing guard
     * @param value {SaberObject | Object}
     */
    static create<T>(value?: T | T[] | SaberArray<T>): SaberArray<T> {
        return new SaberArray<T>(value)
    }

    /**
     * Appends the given value to the array.
     * @template T
     * @param v {T} A value to be appended
     * @return {SaberArray<T>}
     */
    @Pure()
    append(this: SaberArray<T>, v: T): SaberArray<T> {
        return SaberArray.create([...this.value, v])
    }

    /**
     * Prepends the given value to the array.
     * @template T
     * @param v {T} A value to be prepended
     * @return {SaberArray<T>}
     */
    @Pure()
    prepend(this: SaberArray<T>, v: T): SaberArray<T> {
        return SaberArray.create([v, ...this.value])
    }

    /**
     * Copies an array.
     * @template T
     * @return {SaberArray<T>}
     */
    @Pure()
    copy(this: SaberArray<T>): SaberArray<T> {
        return SaberArray.create([...this.value])
    }

    /**
     * Merges two SaberArrays in one and returns the new SaberArray.
     * @template T
     * @param saberArray {SaberArray<T>} A SaberArray to be merged
     * @return {SaberArray<T>}
     */
    @Pure()
    merge(this: SaberArray<T>, saberArray: SaberArray<T>): SaberArray<T> {
        return SaberArray.create([...this.value, ...saberArray.value])
    }

    /**
     * Inserts a value to the given index
     * @template T
     * @param v {T} A value to be inserted
     * @param i {Number} An index value for the insertion
     * @return {SaberArray<T>}
     */
    @Pure()
    insert(this: SaberArray<T>, v: T, i: number): SaberArray<T> {
        return SaberArray.create([...this.value.slice(0, i), v, ...this.value.slice(i)])
    }

    /**
     * Updates an item with the given indexer and item.
     * If the given indexer is a number then it uses it as an index in array.
     * Otherwise it compares the values and select the item with the given value.
     * @template T
     * @param item {T} A given item to replace the old one
     * @param indexer {number|T} An indexer to detect the target item
     * @param isIndexerBasedOnValue {Boolean} Indicates if the given indexer is valueBased
     * @return {SaberArray<T>}
     */
    @Pure()
    update(
        this: SaberArray<T>,
        item: T,
        indexer: T | number,
        isIndexerBasedOnValue: boolean = false
    ): SaberArray<T> {
        return SaberArray.create(this.value.map((v, index) => {
            if (isIndexerBasedOnValue ? v === indexer : index === indexer)
                return item
            return v
        }))
    }

    /**
     * Removes the given value from the SaberArray. If the value is repetitive, removes all repetitions.
     * @template T
     * @param v {T} A value to be removed
     * @return {SaberArray<T>}
     */
    @Pure()
    remove<T>(this: SaberArray<T>, v: T): SaberArray<T> {
        return SaberArray.create(this.value.filter((item) => item !== v))
    }
}
