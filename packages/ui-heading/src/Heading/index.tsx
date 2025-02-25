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
/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { childrenOrValue } from '@instructure/ui-prop-types'
import { getElementType, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx, ThemeablePropTypes } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { HeadingProps } from './types'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Heading extends Component<HeadingProps> {
  static readonly componentId = 'Heading'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Add a top- or bottom-border to the Heading
     */
    border: PropTypes.oneOf(['none', 'top', 'bottom']),
    /**
     * The text content of the Heading
     */
    children: childrenOrValue,
    /**
     * The font color to render
     */
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'primary-inverse',
      'secondary-inverse',
      'inherit'
    ]),
    /**
     * The *visual* appearance of the Heading: h1 is largest; h5 is smallest.
     */
    level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'reset']),
    /**
     * Choose the element Heading should render as. Will default to the `level` prop
     * if not specified.
     */
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Provides a ref to the underlying HTML element
     */
    elementRef: PropTypes.func
  }

  static defaultProps = {
    children: null,
    margin: undefined,
    elementRef: undefined,
    border: 'none',
    color: 'inherit',
    level: 'h2'
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  render() {
    const {
      border,
      children,
      color,
      level,
      margin,
      elementRef,
      makeStyles,
      ...props
    } = this.props

    const ElementType = getElementType(Heading, this.props, () => {
      if (level === 'reset') {
        return 'span'
      } else {
        return level!
      }
    })

    return (
      <View
        {...passthroughProps(props)}
        css={this.props.styles.heading}
        as={ElementType}
        elementRef={elementRef}
        margin={margin}
      >
        {children}
      </View>
    )
  }
}

export default Heading
export { Heading }
