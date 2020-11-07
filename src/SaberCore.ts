import { hash, IHash, IStringIndex } from "./Utils";
import Pure from "./PureMethod";

export default class SaberCore implements IHash, IStringIndex {
    [key: string]: any
    uid: number
    className: string
    protected value: any

    constructor(className: string) {
        this.uid = hash()
        this.className = className
        this.value = 'Cannot assign any value to SaberCore.'
    }
}
