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

import React, { ElementType } from 'react'
import { mount } from '@instructure/ui-test-sandbox'
import { expect } from './expect'
import { within } from '../index'
import { generateComponentExamples } from './generateComponentExamples'

type ComponentExample = {
  Component: ElementType
  componentProps: any
  exampleProps: any
  key: string
}

const renderExample = ({
  Component,
  componentProps,
  key
}: ComponentExample) => <Component key={key} {...componentProps} />

/**
 *
 * @param Component
 * @param componentExample
 * @param only
 *
 * @module generateA11yTests
 * @private
 */
export function generateA11yTests(
  Component: React.ComponentType,
  componentExample: any,
  only: any[] = []
) {
  const sections = generateComponentExamples(Component, componentExample)
  describe(`${Component.displayName} should meet accessibility standards`, async () => {
    sections.forEach(({ pages, propName, propValue }, i) => {
      if (only[0] && i === only[0]) return
      const description = propName
        ? `rendered with prop '${propName}' = '${propValue}'`
        : 'rendered'
      describe(`${description}`, async () => {
        let rendered = 0
        let j = 0
        pages.forEach(({ examples }: { examples: any[] }) => {
          examples.forEach((example) => {
            const index = j + rendered
            if (only[1] && index !== only[1]) return
            const Example = renderExample.bind(null, example)
            const description = process.env.DEBUG
              ? `with prop combination: ${JSON.stringify(
                  example.componentProps,
                  null,
                  2
                )} [${i},${j}]`
              : `${j}`
            it(description, async () => {
              const subject = await mount(<Example />)
              const element = within(subject.getDOMNode())
              expect(await element.accessible()).to.be.true()
            })
            j++
          })
          rendered = rendered + examples.length
        })
      })
    })
  })
}
