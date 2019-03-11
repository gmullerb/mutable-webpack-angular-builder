# Mutable Webpack Angular Builder

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](/LICENSE.txt) ![GitHub package.json version](https://img.shields.io/github/package-json/v/gmullerb/mutable-webpack-angular-builder.svg?logo=npm) ![coverage](https://gitlab.com/gmullerb/mutable-webpack-angular-builder/badges/master/coverage.svg)

**mutable-webpack-angular-builder allows to freely modified the Webpack configuration generated before Angular ng use it for building.**

This project is licensed under the terms of the [MIT license](/LICENSE.txt).

## Quick Start

`package.json`:

```json
  ..
  "devDependencies": {
    "@angular-devkit/build-angular": "*",
    "mutable-webpack-angular-builder": "1.0.0",
    ..
```

`angular.json`:

```json
  ..
  "architect": {
    "build": {
      "builder": "mutable-webpack-angular-builder:browser",
      "options": {
        "mutatorFile": "webpack.config.mutator.js",
    ..
```

`webpack.config.mutator.js`:

```js
module.exports = (sourceWebpack) => {
  const filteredRules = sourceWebpack.module.rules.filter(
    (rule) => !rule.test instanceof RegExp || !rule.test.test('.css')
  )
  sourceWebpack.module.rules = filteredRules

  return sourceWebpack
}

```

## Goal

Many things in Angular Ng processes are **hard-coded** and it is difficult to do some advanced customization[1]. The purpose of mutable-webpack-angular-builder is to allow for **fully modification of the Webpack Configuration provided by Angular** for more "advanced" uses.

| [1] Angular Ng processes are quite closed (and documentation is sometimes scattered and with a lot of "WIP").  
| There are other builders like @angular-builders/custom-webpack, which allows only to do merging of Webpack options.

## Using/Configuration

### Prerequisites

* @angular-devkit/build-angular.

### Configuration

1 . Add **mutable-webpack-angular-builder** (and prerequisite) to `package.json`:

```json
  ..
  "devDependencies": {
    "@angular-devkit/build-angular": "*",
    "mutable-webpack-angular-builder": "1.0.0",
    ..
```

2 . Set `builder` to mutable-webpack-angular-builder in `angular.json`:

```json
  ..
  "architect": {
    "build": {
      "builder": "mutable-webpack-angular-builder:browser",
    ..
```

| Usually set as `"builder": "@angular-devkit/build-angular:browser"`.

3 . Add `"mutatorFile"` option to the builder to indicate the file that will contain the function that mutates the Webpack configuration:

```json
  ..
    "build": {
      "builder": "mutable-webpack-angular-builder:browser",
      "options": {
        "mutatorFile": "webpack.config.mutator.js",
    ..
```

| `mutatorFile` option is an additional option introduced by mutable-webpack-angular-builder.  
| If the option is not defined, then mutable-webpack-angular-builder:browser will silently "fail", i.e. no mutation will be applied.

4 . Create the function that mutates the Webpack configuration:

```js
(sourceWebpack) => {

  // do something with the Original Webpack Configuration

  return sourceWebpack // return the Modified Webpack Configuration
}
```

E.g: The following removes some module rules that do not work quite well with React, and add some new rules (not shown)

```js
(sourceWebpack) => {
  const filteredRules = sourceWebpack.module.rules.filter(
    (rule) => !rule.test instanceof RegExp || !rule.test.test('.css')
  )
  filteredRules.push(reactRule)
  filteredRules.push(cssRule)

  sourceWebpack.module.rules = filteredRules

  return sourceWebpack
}
```

| For an actual use example, see [basecode-ionic-react project](https://github.com/gmullerb/basecode-ionic-react)

5 . Export the mutator function using CommonJs (which is what is use by Angular Ng to load this):

`webpack.config.mutator.js`:

```js
module.exports = (sourceWebpack) => {
  // do something with the Original Webpack Configuration

  return sourceWebpack // return the Modified Webpack Configuration
}

```

### Advanced Configuration

A . Additional options may be define and use since no validation is imposed on the Builder's options:

`angular.json`:

```json
  ..
  "architect": {
    "build": {
      "builder": "mutable-webpack-angular-builder:browser",
      "options": {
        "mutatorFile": "webpack.config.mutator.js",
        "option1": "..",
        "optionN": "..",
    ..
```

B . Mutator function additionally receive an object with the fields been used to call the Angular Ng Webpack's creator:

```js
 (webpack: WebpackOptions, parameters: {root: string, projectRoot: string, host, options: {}}) => WebpackOptions
```

Then, the Mutator function can be:

```js
(sourceWebpack, parameters) => {

  // do something with the Original Webpack Configuration

  // use the project root path: parameters.projectRoot
  // use an Additional options: parameters.option1

  return sourceWebpack // return the Modified Webpack Configuration
}
```


## Extending/Developing

[Developing](readme/developing.md)

## Documentation

* [`CHANGELOG.md`](CHANGELOG.md): add information of notable changes for each version here, chronologically ordered [1].

> [1] [Keep a Changelog](http://keepachangelog.com)

## License

[MIT License](/LICENSE.txt)

## Remember

* Use code style verification tools => Encourage Best Practices and Usability.
* Start testing early => Encourage Reliability and Maintainability.
* Code Review everything => Encourage Functional suitability, Performance Efficiency and Team work.

## Additional words

Don't forget:

* **Love what you do**.
* **Learn everyday**.
* **Learn yourself**.
* **Share your knowledge**.
* **Learn from the past, dream on the future, live and enjoy the present to the max!**.

At life:

* Let's act, not complain.
* Be flexible.

At work:

* Let's give solutions, not questions.
