class BrowserBuilder {
  buildWebpackConfig(root, projectRoot, host, options) {
    return {
      root,
      projectRoot,
      host,
      options,
      keepWebpackOption: 'toKeepWebpackOption',
      someWebpackOption: 'theWebpackOption',
      noisyWebpackOption: 'toBeRemovedWebpackOption'
    }
  }
}

module.exports = {
  BrowserBuilder
}
