//  Copyright (c) 2019 Gonzalo Müller Bravo.
//  Licensed under the MIT License (MIT), see LICENSE.txt

const testContext = require.context("./", true, /\.js$/)

testContext.keys().map(testContext)

const mainContext = require.context("../main", true, /\.js$/)

mainContext.keys().map(mainContext)
