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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-react-utils/lib/passthroughProps'
import getElementType from '@instructure/ui-react-utils/lib/getElementType'

import PresentationContent from '../PresentationContent'
import ScreenReaderContent from '../ScreenReaderContent'
/**
---
category: components/utilities
---
*/
class AccessibleContent extends Component {
  static propTypes = {
    alt: PropTypes.string,
    children: PropTypes.node,
    /**
    * the element type to render the screen reader content as
    */
    as: PropTypes.elementType
  }

  static defaultProps = {
    alt: undefined,
    as: 'span',
    children: null
  }

  render () {
    const props = { ...omitProps(this.props, AccessibleContent.propTypes) }
    const ElementType = getElementType(AccessibleContent, this.props)

    return (
      <ElementType {...props}>
        <ScreenReaderContent>{this.props.alt}</ScreenReaderContent>
        <PresentationContent>
          {this.props.children}
        </PresentationContent>
      </ElementType>
    )
  }
}

export default AccessibleContent
