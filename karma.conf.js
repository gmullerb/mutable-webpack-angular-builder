const path = require('path')
const obtainMock = (mock) => path.resolve(__dirname, 'src/test/mocks/', mock + '.mock.js')

module.exports = function(config) {
  config.set({
    basePath: 'src',
    files: ['test/testEntryPoint.js'],
    frameworks: ['jasmine'],
    browsers: ['jsdom'],
    preprocessors: {
      'test/testEntryPoint.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      resolve: {
        alias: {
          "@angular-devkit/build-angular": obtainMock('build-angular'),
          "path": obtainMock('path')
        }
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },{
          test: /\.m?js$/,
          exclude: /(testEntryPoint|\.(mock|test))\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          },
        }]
      },
      watch: false
    },
    reporters: ['mocha', 'junit', 'coverage-istanbul'],
    junitReporter: {
      outputDir: '../build/reports/tests',
      outputFile: undefined
    },
    coverageIstanbulReporter: {
      dir: 'build/reports/coverage',
      reports: [
        'lcov',
        'text',
        'text-summary'
      ],
      fixWebpackSourcePath: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        global: {
          statements: 95,
          branches: 95,
          functions: 95,
          lines: 95,
        },
        each: {
          statements: 99,
          branches: 99,
          functions: 99,
          lines: 99,
        }
      }
    },
    autoWatch: false,
    singleRun: true
  });
}
