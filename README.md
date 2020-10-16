<img src="header.svg">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![npm version](https://badge.fury.io/js/%40berakocc%2Fsaber.svg)](https://badge.fury.io/js/%40berakocc%2Fsaber) [![codecov](https://codecov.io/gh/MuhammedBeraKoc/saber/branch/main/graph/badge.svg?token=OI629LUA8D)](undefined) ![CI](https://github.com/MuhammedBeraKoc/saber/workflows/CI/badge.svg?branch=main&event=push)

>`A library for creating objects and arrays with immutable methods`

## `Install`
```bash
npm install @berakocc/saber
```

## `Usage`
Saber is register-based library. To enable it you have to run `enhance` function at the beginning of your script. This way you can access all of its immutable methods.
```js
// Embeds immutable methods to to Array and Object prototypes.
require('@berakoc/saber').enhance()

const arr = [1, true]
console.log(arr.prepend('daisy'))
console.log(arr)
// Expected outputs:
// ['daisy', 1, true]
// [1, true]
```
To dismantle library methods from prototypes use `downgrade` method.

## `Documentation`
A comprehensive documantion is on [Saber's Github page](https://muhammedberakoc.github.io/saber-web/).

## `Contributing`
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Also you can help me to improve the library by adding new [issues](https://github.com/MuhammedBeraKoc/saber/issues).