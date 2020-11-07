/**
 * A decorator for denoting pure methods.
 * A method cannot turn into a complete pure procedure.
 * By definition it relies on its caller object.
 * This decorator does not check if a method is pure.
 * Since accomplishing this mathematically impossible.
 * It only puts the responsibility of making target method
 * pure on the shoulders of the developer.
 * @constructor
 * @see https://www.sitepoint.com/functional-programming-pure-functions/#:~:text=A%20pure%20function%20is%20a,always%20return%20the%20same%20result.
 */
export default function Pure<T>() {
    return (target: T, key: string, descriptor: PropertyDescriptor) => {}
}
