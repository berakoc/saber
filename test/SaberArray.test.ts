import SaberArray from "../src/SaberArray";

describe('Saber Array Test Suite', () => {
    let saberArray: SaberArray<number>

    beforeAll(() => {
        saberArray = SaberArray.create([1, 2, 3])
    })

    it('should instantiate without failure', () => {
        const expected1 = [1, 2]
        const expected2 = ['Array']
        const expectedEmptyArray: any[] = []
        const actual1 = SaberArray.create(SaberArray.create([1, 2])).value
        const actual2 = SaberArray.create('Array').value
        const actualEmpty = SaberArray.create().value
        expect(actual1).toStrictEqual(expected1)
        expect(actual2).toStrictEqual(expected2)
        expect(actualEmpty).toStrictEqual(expectedEmptyArray)
    })

    it('should append a value to an array', () => {
        const expected = ['h', 2, false]
        const actual = SaberArray.create<number | string | boolean>(['h', 2])
        expect(actual.append(false).value).toStrictEqual(expected)
    })

    it('should prepend a value to an array', () => {
        const expected = [false, 'h', 2]
        const actual = SaberArray.create<number | string | boolean>(['h', 2]).prepend(false).value
        expect(actual).toStrictEqual(expected)
    })

    it('should copy the array', () => {
        const sArr = SaberArray.create([1, 2, 3])
        const copiedArr = sArr.copy().value
        expect(copiedArr === sArr.value).toBe(false)
        expect(sArr.value).toStrictEqual(copiedArr)
    })

    it('should merge two arrays', () => {
        const sArr1 = SaberArray.create([1, 2])
        const sArr2 = SaberArray.create([3, 4])
        const expected = [1, 2, 3, 4]
        const actual = sArr1.merge(sArr2).value
        expect(actual).toStrictEqual(expected)
    })

    it('should insert a value to the given index', () => {
        const sArr = SaberArray.create(['earth', {}])
        const expected = ['earth', 1, {}]
        const actual = sArr.insert(1, 1).value
        expect(actual).toStrictEqual(expected)
    })

    it('should update a value using index or value', () => {
        const sArr = SaberArray.create(['v', true, {}])
        const result1 = ['value', true, {}]
        const result2 = ['v', true, {
            id: 123
        }]
        const actual1 = sArr.update('value', 'v', true).value
        expect(actual1).toStrictEqual(result1)
        const actual2 = sArr.update({
            id: 123
        }, 2).value
        expect(actual2).toStrictEqual(result2)
    })

    it('should remove value from the array', () => {
        const sArr = SaberArray.create([1, 2, 3, 2])
        const result = [1, 3]
        const actual = sArr.remove(2).value
        expect(actual).toStrictEqual(result)
    })
})
