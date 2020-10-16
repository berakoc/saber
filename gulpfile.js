const { series, src, dest } = require('gulp')
const babel = require('gulp-babel')
const del = require('del')
const rename = require('gulp-rename')

function clean(cb) {
    del('dist/**/*.js')
    cb()
}

function transpile() {
    return src('src/saber.js').
    pipe(babel()).
    pipe(rename('index.js')).
    pipe(dest('dist/'))
}

exports.default = series(clean, transpile)
