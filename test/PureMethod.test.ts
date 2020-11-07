import Pure from "../src/PureMethod"

describe('Test Suite For PureFunction', () => {
    it('should mark a method as PureFunction', () => {
        class C {
            @Pure<C>()
            m() {
                console.log('A class method.')
            }
        }
        const m = new C().m
        expect(typeof m).toBe('function')
    })
})
