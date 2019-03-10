//  Copyright (c) 2019 Gonzalo Müller Bravo.
//  Licensed under the MIT License (MIT), see LICENSE.txt

'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const BrowserBuilder = require('@angular-devkit/build-angular').BrowserBuilder
const path = require('path')
/*::
  const WebpackOptions = require('webpack').options
 */

class MutableWebpackBrowserBuilder extends BrowserBuilder {
  loadMutator(
      projectRoot /*: string*/,
      mutatorFile /*: string*/) /*: ?(webpack: WebpackOptions, parameters: {}) => WebpackOptions */ {
    try{
      return mutatorFile
        ? require(`${path.resolve(projectRoot, mutatorFile)}`)
        : null
    }
    catch (error) {
      return null
    }
  }

  buildWebpackConfig(
      root/*: string */,
      projectRoot/*: string */,
      host/*: any */,
      options /*: { mutatorFile: string }*/) /*: WebpackOptions*/ {
    const mutator = this.loadMutator(projectRoot, options.mutatorFile)
    return mutator
      ? mutator(
        super.buildWebpackConfig(root, projectRoot, host, options),
        {
          root,
          projectRoot,
          host,
          options
        }
      )
      : super.buildWebpackConfig(root, projectRoot, host, options)
  }
}

exports.MutableWebpackBrowserBuilder = MutableWebpackBrowserBuilder
exports.default = MutableWebpackBrowserBuilder
