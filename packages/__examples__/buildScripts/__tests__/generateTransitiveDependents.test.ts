/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { expect } from '@instructure/ui-test-utils'
import { getTransitiveDependents } from '../getTransitiveDependents'

describe('getTransitiveDependents', () => {
  it('should generate the list of transitive dependents for a given package', () => {
    // this is all of the transitive dependents of the package `ui-badge`
    const badgeTransitiveDependents = [
      {
        name: '@instructure/ui-badge'
      },
      {
        name: '@instructure/ui-navigation'
      },
      {
        name: '@instructure/ui-text-input'
      },
      {
        name: '@instructure/ui'
      },
      {
        name: '@instructure/ui-date-input'
      },
      {
        name: '@instructure/ui-select'
      },
      {
        name: '@instructure/ui-simple-select'
      },
      {
        name: '@instructure/ui-time-select'
      },
      {
        name: '@instructure/ui-table'
      }
    ]

    const expectedResult = [
      'ui-badge',
      'ui-navigation',
      'ui-text-input',
      'ui-date-input',
      'ui-select',
      'ui-simple-select',
      'ui-time-select',
      'ui-table'
    ]

    const actualResult = getTransitiveDependents(badgeTransitiveDependents)

    expect(actualResult).to.be.eql(expectedResult)
  })
})
