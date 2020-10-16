import { enhance, downgrade } from '../src/saber'

describe('Test Suite for Saber', () => {
    beforeAll(() => {
        enhance()
    })

    afterAll(() => {
        downgrade()
    })

    it('should add or update a property with the given value', () => {
        const o = {
            name: '@NativeObject',
            info: {
                id: 1523
            }
        }
        const result = {
            name: '@NativeObject',
            info: {
                id: 2951
            }
        }
        expect(o.add('id', 2951, ['info'])).toStrictEqual(result)
    })

    it('should delete a property', () => {
        const o = {
            name: '@NativeObject',
            value: 3
        }
        const result = {
            name: '@NativeObject'
        }
        expect(o.remove('value')).toStrictEqual(result)
    })

    it('should copy the object', () => {
        const o = {
            name: '@NativeObject'
        }
        const copiedO = o.copy()
        expect(copiedO === o).toBe(false)
        expect(o).toStrictEqual(copiedO)
    })

    it('should merge two objects', () => {
        const o1 = {
            color: 'blue'
        }
        const o2 = {
            value: 2
        }
        const result = {
            color: 'blue',
            value: 2
        }
        expect(o1.merge(o2)).toStrictEqual(result)
    })

    it('should append a value to an array', () => {
        const arr = ['h', 2]
        const result = ['h', 2, false]
        expect(arr.append(false)).toStrictEqual(result)
    })

    it('should prepend a value to an array', () => {
        const arr = ['h', 2]
        const result = [false, 'h', 2]
        expect(arr.prepend(false)).toStrictEqual(result)
    })

    it('should copy the array', () => {
        const arr = [1, 2, 3]
        const copiedArr = arr.copy()
        expect(copiedArr === arr).toBe(false)
        expect(arr).toStrictEqual(copiedArr)
    })

    it('should merge two arrays', () => {
        const arr1 = [1, 2]
        const arr2 = [3, 4]
        const result = [1, 2, 3, 4]
        expect(arr1.merge(arr2)).toStrictEqual(result)
    })

    it('should insert a value to the given index', () => {
        const arr = ['earth', {}]
        const result = ['earth', 1, {}]
        expect(arr.insert(1, 1)).toStrictEqual(result)
    })

    it('should update a value using index or value', () => {
        const arr = ['v', true, {}]
        const result1 = ['value', true, {}]
        const result2 = ['v', true, {
            id: 123
        }]
        expect(arr.update('value', 'v', true)).toStrictEqual(result1)
        expect(arr.update({
            id: 123
        }, 2)).toStrictEqual(result2)
    })

    it('should remove value from the array', () => {
        const arr = [1, 2, 3, 2]
        const result = [1, 3]
        expect(arr.remove(2)).toStrictEqual(result)
    })
})
