<img src="https://i.ibb.co/mbyD3SM/Mask-Group-1.png"><br/><br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![NPM version](https://img.shields.io/npm/v/@berakocc/saber?color=blueviolet)](https://badge.fury.io/js/%40berakocc%2Fsaber) [![codecov](https://img.shields.io/codecov/c/github/MuhammedBeraKoc/saber?color=ff69b4)](https://codecov.io/gh/MuhammedBeraKoc/saber/) ![CI](https://github.com/MuhammedBeraKoc/saber/workflows/CI/badge.svg?branch=main&event=push)

>`A library for creating objects and arrays with immutable methods`

## `Install`
```bash
npm install @berakocc/saber
```

## `Usage`
Saber is a modular library. You can import each component either from its own source file or from saber. I'll use the second way for convenient use.
```js
const { SaberArray } = require('@berakocc/saber')

// You can use diamond notation for giving exact types.
// Even if you don't use it, that's not a problem.
// But you will get a little warning.
const saberArray = SaberArray.create<String | Boolean | Number>([1, true])
saberArray.prepend('value')
console.log(saberArray)
```

## `Documentation`
A comprehensive documantion is on [Saber's Github page](https://muhammedberakoc.github.io/saber-web/).

## `Contributing`
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Also you can help me to improve the library by adding new [issues](https://github.com/MuhammedBeraKoc/saber/issues).
