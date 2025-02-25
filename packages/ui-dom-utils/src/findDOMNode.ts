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

import ReactDOM from 'react-dom'
import React from 'react'
import { UIElement } from '@instructure/shared-types'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Wrapper function for React.findDOMNode
 * @module findDOMNode
 *
 * @param { Node | Window | React.ReactElement | React.Component | function } el - component, DOM node, or function returning a DOM node
 * @returns { Node | Window | null | undefined } The root node of this element
 */
function findDOMNode(el?: UIElement) {
  const node = typeof el === 'function' ? el() : el

  if (node === document) {
    return document.documentElement // HTMLElement
  } else if (
    node instanceof Element ||
    node === window ||
    (node && typeof (node as Node).nodeType !== 'undefined')
  ) {
    return node as Node | Window
  } else if (node) {
    return ReactDOM.findDOMNode(node as React.ReactInstance) // eslint-disable-line react/no-find-dom-node
  }
  return undefined
}

export default findDOMNode
export { findDOMNode }
