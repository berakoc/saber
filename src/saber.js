/**
 * Changes an object.
 * @param o {Object} An object for immutable modification
 * @param objectFunction {Function} A function which is pure, satisfying data immutability and returns an object
 * @param propertyChain {Array<string>} An array which contains the names of the properties to the target object sequentially
 * @return {object}
 */
const modifyObject = (o, objectFunction, propertyChain=[]) => {
    let __f
    const _c = propertyChain
    return (__f = (_o, _i) => {
        if (_i === _c.length) return objectFunction.call(_o, null)
        return {
            ..._o,
            [_c[_i]]: __f(_o[_c[_i++]], _i)
        }
    })(o, 0)
}

/**
 * Adds a property for an inner object.
 * @example
 * const o = {
 *   name: 'Object',
 *   info: {
 *     id: 1542,
 *     value: true
 * }}
 *
 * const o2 = o.updateInnerObject([info], 'value', false).o
 * @param propertyChain {Array<string>} An array which contains the names of the properties to the target object sequentially
 * @param property {string}
 * @param value {any}
 * @return {Object}
 */
function addInnerProperty(property, value, propertyChain) {
    return modifyObject(this, function () {
        return {
            ...this,
            [property]: value
        }
    }, propertyChain)
}

/**
 * Deletes the property with the given propertyChain.
 * @param property {String} Property to be deleted
 * @param propertyChain {Array<String>} An array of strings for the path
 * @return {Object}
 */
function deleteInnerProperty(property, propertyChain) {
    return modifyObject(this, function() {
        const self = {
            ...this
        }
        delete self[property]
        return self
    }, propertyChain)
}

/**
 * Copies the given object
 * @return {Object}
 */
function copyObject() {
    return {
        ...this
    }
}

/**
 * Merges two objects and returns a new one.
 * @param o {Object} An object to be merged with the base object
 * @return {any}
 */
function mergeObjects(o) {
    return Object.assign(this, o)
}

/**
 * Appends the given value to the array.
 * @param v {any} A value to be appended
 * @return {*[]}
 */
function appendValue(v) {
    return [
        ...this,
        v
    ]
}

/**
 * Prepends the given value to the array.
 * @param v {any} A value to be prepended
 * @return {*[]}
 */
function prependValue(v) {
    return [
        v,
        ...this
    ]
}

/**
 * Copies an array.
 * @return {*[]}
 */
function copyArray() {
    return [...this]
}

/**
 * Merges two array in one and returns the new array.
 * @param arr {*[]} An array to be merged
 * @return {*[]}
 */
function mergeArray(arr) {
    return [
        ...this,
        ...arr
    ]
}

/**
 * Inserts a value to the given index
 * @param v {any} A value to be inserted
 * @param i {Number} An index value for the insertion
 * @return {*[]}
 */
function insertValue(v, i) {
    return [
        ...this.slice(0, i),
        v,
        ...this.slice(i)
    ]
}

/**
 * Updates an item with the given indexer and item.
 * If the given indexer is a number then it uses it as an index in array.
 * Otherwise it compares the values and select the item with the given value.
 * @param item {any} A given item to replace the old one
 * @param indexer {number|any} An indexer to detect the target item
 * @param isIndexerBasedOnValue {Boolean} Indicates if the given indexer is valueBased
 * @return {*[]}
 */
function updateItem(item, indexer, isIndexerBasedOnValue=false) {
    return this.map((v, index) => {
        if (isIndexerBasedOnValue ? v === indexer : index === indexer) return item
        return v
    })
}

/**
 * Removes the given value from the array. If the value is repetitive, removes all repetitions.
 * @param v {any} A value to be removed
 * @return {*[]}
 */
function deleteValue(v) {
    return this.filter(item => item !== v)
}

/**
 * Embeds the given method set to the given prototype.
 * @param methodSet {Object} An object to represent methods where keys for method name and values for method itself
 * @param prototype {Object} A prototype for the target type
 */
const embedMethodsToPrototype = (methodSet, prototype) => {
    for (const method of Object.keys(methodSet)) {
        prototype[method] = methodSet[method]
    }
}

/**
 * Dismantles the previously given methods to a prototype.
 * @param methodSet {Array<String>} An array to represent methods where keys for method name and values for method itself
 * @param prototype {Object} A prototype for the target type
 */
const dismantleEmbeddedMethods = (methodSet, prototype) => {
    for (const method of methodSet) {
        if (prototype.hasOwnProperty(method)) {
            delete prototype[method]
        }
    }
}

const prototypes = [Object.prototype, Array.prototype]

const methodSets = [
    {
        add: addInnerProperty,
        remove: deleteInnerProperty,
        copy: copyObject,
        merge: mergeObjects
    },
    {
        append: appendValue,
        prepend: prependValue,
        copy: copyArray,
        merge: mergeArray,
        insert: insertValue,
        update: updateItem,
        remove: deleteValue
    }
]

/**
 * @function
 * Enhancer Array and Object adding them immutable methods.
 * Should be invoked in the beginning of the root script to be used globally in the app.
 */
export const enhance = () => {
    for (let i = 0; i < prototypes.length; ++i) {
        embedMethodsToPrototype(methodSets[i], prototypes[i])
    }
}

/**
 * @function
 * Removes all the immutable methods from the target prototypes.
 */
export const downgrade = () => {
    for (let i = 0; i < prototypes.length; ++i) {
        dismantleEmbeddedMethods(methodSets[i], prototypes[i])
    }
}
