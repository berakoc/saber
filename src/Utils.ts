export interface IStringIndex {
    [key: string]: any
}

export interface IHash {
    uid: number
}

export type Class<T> = new <T>() => T

export function hash() {
    return 100000000000 + Math.floor(Math.random() * 900000000000)
}
