import SaberObject from '../src/SaberObject'

describe('SaberObject Test Suite', () => {
    let saberObject: SaberObject;

    beforeAll(() => {
        saberObject = new SaberObject({
            name: '@SaberObject',
            info: {
                id: 5723
            }
        })
    })

    it('should instantiate without failure', () => {
        const expected = {
            value: true
        }
        const exceptedEmptyObject = {}
        const s = SaberObject.create(true)
        const actual1 = s.value
        const actual2 = SaberObject.create(s).value
        const actual3 = SaberObject.create().value
        expect(actual1).toStrictEqual(expected)
        expect(actual2).toStrictEqual(expected)
        expect(actual3).toStrictEqual(exceptedEmptyObject)
    })

    it('should add or update a property with the given value', () => {
        const s = new SaberObject({
            name: '@SaberObject',
            info: {
                id: 5723
            }
        })
        const expected = SaberObject.create({
            name: '@SaberObject',
            info: {
                id: 2951
            }
        }).value
        const actual = s.add('id', 2951, ['info']).value
        expect(actual).toStrictEqual(expected)
    })

    it('should delete a property', () => {
        const s = SaberObject.create({
            name: '@NativeObject',
            value: 3
        })
        const expected = SaberObject.create({
            name: '@NativeObject'
        }).value
        const actual = s.remove('value').value
        expect(actual).toStrictEqual(expected)
    })

    it('should copy the object', () => {
        const s1 = SaberObject.create({
            name: '@NativeObject'
        })
        const s2 = SaberObject.create({
            name: '@NativeObject'
        })
        const copiedS = s1.copy()
        const actual1 = copiedS === s1
        const actual2 = s2.value
        expect(actual1).toBe(false)
        expect(actual2).toStrictEqual(copiedS.value)
    })

    it('should merge two objects', () => {
        const s1 = SaberObject.create({
            color: 'blue'
        })
        const s2 = SaberObject.create({
            value: 2
        })
        const expected = SaberObject.create({
            color: 'blue',
            value: 2
        }).value
        const actual = s1.merge(s2).value
        expect(actual).toStrictEqual(expected)
    })
})
