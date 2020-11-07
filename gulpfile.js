const { series, src, dest } = require('gulp')
const del = require('del')
const webpack = require('webpack-stream')
const fs = require('fs-extra')
const run = (command) => require('gulp-run')(command, {})

function clean(cb) {
    del('dist/**/*.js')
    cb()
}

function tslint() {
    return run('tslint --config tslint.json src/**/*.ts').exec()
}

function runUnitTestsWithCoverage() {
    return run('npm run test:coverage').exec()
}

function compileTypeScript() {
    return run('tsc').exec()
}

function copyDeclarationFilesToDist(cb) {
    fs.copySync('release', 'dist')
    del('dist/*.js')
    cb()
}

function bundle() {
    return src('release/saber.js').pipe(webpack(require('./webpack.config.js'))).pipe(dest('./dist'))
}

function removeReleaseFolder(cb) {
    del('release')
    cb()
}

exports.default = series(clean, tslint, runUnitTestsWithCoverage, compileTypeScript, copyDeclarationFilesToDist, bundle, removeReleaseFolder)
