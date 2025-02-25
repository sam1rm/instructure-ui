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
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { isActiveElement, findFocusable } from '@instructure/ui-dom-utils'
import {
  getElementType,
  getInteraction,
  matchComponentTypes,
  passthroughProps,
  callRenderProp
} from '@instructure/ui-react-utils'
import { logWarn as warn } from '@instructure/console'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx, ThemeablePropTypes } from '@instructure/emotion'
import generateStyle from './styles'
import generateComponentTheme from './theme'
import { LinkProps, LinkStyleProps } from './types'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Link extends Component<LinkProps> {
  static readonly componentId = 'Link'

  static propTypes = {
    /**
     * The text and/or icon displayed by the link
     */
    children: PropTypes.node.isRequired,
    /**
     * Sets the link's `href` attribute
     */
    href: PropTypes.string,
    /**
     * Designates Link's text color to accommodate light and dark backgrounds
     */
    color: PropTypes.oneOf(['link', 'link-inverse']),
    /**
     * Provides a reference to the underlying HTML element
     */
    elementRef: PropTypes.func,
    /**
     * The element type to render as (will default to `<a>` if href is provided)
     */
    as: PropTypes.elementType,
    /**
     * Determines if the link is enabled or disabled
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Add an SVG icon to the Link. Do not add icons directly as
     * children.
     */
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    /**
     * Place the icon before or after the text in the Link.
     */
    iconPlacement: PropTypes.oneOf(['start', 'end']),
    /**
     * Set the CSS display property of the Link element. 'auto' sets no display property.
     */
    display: PropTypes.oneOf([
      'auto',
      'block',
      'inline-block',
      'flex',
      'inline-flex'
    ]),
    /**
     * Set `false` to remove default underline if Link does not appear inline with text
     */
    isWithinText: PropTypes.bool,
    /**
     * Fires when the Link is clicked
     */
    onClick: PropTypes.func,
    /**
     * Fires when the Link gains focus
     */
    onFocus: PropTypes.func,
    /**
     * Fires when the Link loses focus
     */
    onBlur: PropTypes.func,

    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    href: undefined,
    elementRef: undefined,
    // Leave interaction default undefined so that `disabled` can also be supplied
    interaction: undefined,
    margin: undefined,
    renderIcon: undefined,
    display: undefined,
    color: 'link',
    as: undefined,
    iconPlacement: 'start',
    isWithinText: true,
    onClick: undefined,
    onFocus: undefined,
    onBlur: undefined
  }

  state = { hasFocus: false }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStyleProps())
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStyleProps())
  }

  makeStyleProps = (): LinkStyleProps => {
    return {
      containsTruncateText: this.containsTruncateText,
      hasVisibleChildren: this.hasVisibleChildren
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleElementRef = (el) => {
    const { elementRef } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_link' does not exist on type 'Link'.
    this._link = el
    if (typeof elementRef === 'function') elementRef(el)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleClick = (event) => {
    const { onClick } = this.props
    const { interaction } = this

    if (interaction === 'disabled') {
      event.preventDefault()
      event.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleFocus = (event) => {
    this.setState({ hasFocus: true })
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleBlur = (event) => {
    this.setState({ hasFocus: false })
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }

  get containsTruncateText() {
    let truncateText = false

    React.Children.forEach(this.props.children, (child) => {
      if (child && matchComponentTypes(child, ['TruncateText'])) {
        truncateText = true
      }
    })

    warn(
      // if display prop is used, warn about icon or TruncateText
      !truncateText || this.props.display === undefined,
      '[Link] Using the display property with TruncateText may cause layout issues.'
    )

    return truncateText
  }

  get display() {
    if (this.props.display) {
      return this.props.display // user-entered display property
    }

    const { containsTruncateText } = this

    if (this.props.renderIcon) {
      return containsTruncateText ? 'inline-flex' : 'inline-block'
    } else {
      return containsTruncateText ? 'block' : 'auto'
    }
  }

  get interaction() {
    return getInteraction({ props: this.props, interactionTypes: ['disabled'] })
  }

  get element() {
    return getElementType(Link, this.props)
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_link' does not exist on type 'Link'.
    return isActiveElement(this._link)
  }

  get focusable() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    return findFocusable(this._link)
  }

  get hasVisibleChildren() {
    return hasVisibleChildren(this.props.children)
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_link' does not exist on type 'Link'.
    this._link && this._link.focus()
  }

  renderIcon() {
    warn(
      // if display prop is used, warn about icon or TruncateText
      this.props.display === undefined,
      '[Link] Using the display property with an icon may cause layout issues.'
    )
    return (
      <span css={this.props.styles.icon}>
        {callRenderProp(this.props.renderIcon)}
      </span>
    )
  }

  render() {
    const {
      children,
      onClick,
      color,
      href,
      margin,
      renderIcon,
      iconPlacement,
      isWithinText,
      ...props
    } = this.props

    const { interaction } = this

    const isDisabled = interaction === 'disabled'
    const role = onClick && this.element !== 'button' ? 'button' : null
    const type =
      this.element === 'button' || this.element === 'input' ? 'button' : null
    const tabIndex = role === 'button' && !isDisabled ? '0' : null

    return (
      <View
        {...passthroughProps(props)}
        elementRef={this.handleElementRef}
        as={this.element}
        display={this.display}
        margin={margin}
        href={href}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        aria-disabled={isDisabled ? 'true' : null}
        role={role}
        type={type}
        //@ts-expect-error fix to be number
        tabIndex={tabIndex}
        css={this.props.styles.link}
      >
        {renderIcon && iconPlacement === 'start' && this.renderIcon()}
        {children}
        {renderIcon && iconPlacement === 'end' && this.renderIcon()}
      </View>
    )
  }
}

export default Link
export { Link }
