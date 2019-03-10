//  Copyright (c) 2019 Gonzalo Müller Bravo.
//  Licensed under the MIT License (MIT), see LICENSE.txt

const builder = require('../main/index.js');

describe("MutableWebpackBrowserBuilder Tests", () => {

  it("should mutate webpack when options.mutatorFile is valid", () => {
    const mutableBuilder = new builder.MutableWebpackBrowserBuilder()

    spyOn(mutableBuilder, "loadMutator")
      .and
      .returnValue((webpack, parameters) => ({
        ...webpack,
        someWebpackOption: 'mutatedWebpackOption',
        newWebpackOption: 'newWebpackOption',
        noisyWebpackOption: null,
        ...parameters,
        root: "mutatedRoot",
        projectRoot: "mutatedProjectRoot",
        options: {
          ...parameters.options,
          someOption: 'mutatedOption',
          newOption: 'newOption',
          noisyOption: null
        }
      }))

    const webpack = mutableBuilder.buildWebpackConfig('theRoot', 'theProjectRoot', {}, {
      mutatorFile: 'webpackMutator.mock.js',
      keepOption: 'toKeepOption',
      someOption: 'theOption',
      noisyOption: 'toBeRemovedOption'
    })

    expect(webpack).toEqual({
        keepWebpackOption: 'toKeepWebpackOption',
        someWebpackOption: 'mutatedWebpackOption',
        newWebpackOption: 'newWebpackOption',
        noisyWebpackOption: null,
        root: "mutatedRoot",
        projectRoot: "mutatedProjectRoot",
        host: {},
        options: {
          mutatorFile: 'webpackMutator.mock.js',
          keepOption: 'toKeepOption',
          someOption: 'mutatedOption',
          newOption: 'newOption',
          noisyOption: null
        }
      }
    )
  })

  it("should not mutate webpack when options.mutatorFile is invalid", () => {
    const mutableBuilder = new builder.MutableWebpackBrowserBuilder()

    const webpack = mutableBuilder.buildWebpackConfig('theRoot', 'theProjectRoot', {}, {
      mutatorFile: 'webpackMutator.mock.js',
      keepOption: 'toKeepOption',
      someOption: 'theOption',
      noisyOption: 'toBeRemovedOption'
    })

    expect(webpack).toEqual({
        keepWebpackOption: 'toKeepWebpackOption',
        someWebpackOption: 'theWebpackOption',
        noisyWebpackOption: 'toBeRemovedWebpackOption',
        root: "theRoot",
        projectRoot: "theProjectRoot",
        host: {},
        options: {
          mutatorFile: 'webpackMutator.mock.js',
          keepOption: 'toKeepOption',
          someOption: 'theOption',
          noisyOption: 'toBeRemovedOption'
        }
      }
    )
  })

  it("should not mutate webpack when options.mutatorFile is not present", () => {
    const mutableBuilder = new builder.MutableWebpackBrowserBuilder()

    const webpack = mutableBuilder.buildWebpackConfig('theRoot', 'theProjectRoot', {}, {
      keepOption: 'toKeepOption',
      someOption: 'theOption',
      noisyOption: 'toBeRemovedOption'
    })

    expect(webpack).toEqual({
        keepWebpackOption: 'toKeepWebpackOption',
        someWebpackOption: 'theWebpackOption',
        noisyWebpackOption: 'toBeRemovedWebpackOption',
        root: "theRoot",
        projectRoot: "theProjectRoot",
        host: {},
        options: {
          keepOption: 'toKeepOption',
          someOption: 'theOption',
          noisyOption: 'toBeRemovedOption'
        }
      }
    )
  })
})
