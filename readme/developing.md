# Extending/Developing

## Prerequisites

* [Java](http://www.oracle.com/technetwork/java/javase/downloads) [1].
* [Git](https://git-scm.com/downloads) (only if you are going to clone the project).

| [1] Node/Npm or Node/Yarn can be used.

## Getting it

Clone or download the project[1], in the desired folder execute:

```sh
git clone https://github.com/gmullerb/mutable-webpack-angular-builder
```

> [1] [Cloning a repository](https://help.github.com/articles/cloning-a-repository/)

## Set up

* **No need**, only download and run (It's Gradle! Yes!).

| Gradle will allow to have different really isolate Node/Npm environments for different projects.

## Folders structure

```
  /src
    /main
    /test
      /mocks
```

- `src/main`: Main source files.
- `src/test`: Test source files[1].
- `src/test/mocks`: Module mocks.

> [1] Tests are done with [Karma](http://karma-runner.github.io) and [Jasmine](https://jasmine.github.io).

## Building it

### Gradle

* To assess files:
  * `gradlew assessCommon`: will check common style of files.
  * `gradlew assessGradle`: will check code style of build.gradle file.
  * `gradlew assessStyleMain`: will check eslint style of main source files.
  * `gradlew assessTypingMain`: will check Flow typings of main source files.
  * `gradlew assessStyleTest`: will check eslint style of test source files.

* To test code and check coverage: `gradlew unitTest`

* To "build" it:
  * `gradlew`: this will run default tasks:
    * `assessCommon`, `assessGradle`, `npmInstall`, `check`
      * `check`: will execute assess tasks and test tasks.

* To get all the tasks for the project: `gradlew tasks --all`

| Recommendation: First time run `gradlew` to start from a "ok" code.

### Node

* "main-flow": will check Flow typings of main source files.
* "test": will run test and coverage for the project.

## Customizing Facts

* **mutable-webpack-angular-builder** extends @angular-devkit/build-angular `BrowserBuilder` class.
* `schema.json` basically define only defaults from the original @angular-devkit/build-angular
  * In the way the schema.json's validation is implemented, "does not allow" to extend json (it use only http), [issues/11307](https://github.com/angular/angular-cli/issues/11307).
* Angular Ng uses CommonJs for this, then use:
  * `Object.defineProperty(exports, '__esModule', { value: true })`
  * `exports.MutableWebpackBrowserBuilder = MutableWebpackBrowserBuilder`
  * `exports.default = MutableWebpackBrowserBuilder`
* Project uses [Flow](flow.org) to add some extra validation (less invasive than Typescript).
* Checks this Good guide for creating Angular's builders: [Angular CLI 6 under the hood — builders demystified](https://medium.com/dailyjs/angular-cli-6-under-the-hood-builders-demystified-f0690ebcf01).

## Main documentation

[Back](../README.md)
