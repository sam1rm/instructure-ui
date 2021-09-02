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

import React from 'react'
import PropTypes from 'prop-types'

import type { AsElementType, PropValidators } from '@instructure/shared-types'

type DialogOwnProps = {
  children?: React.ReactNode
  as?: AsElementType
  display?: 'auto' | 'block' | 'inline-block'
  label?: string
  open?: boolean
  onBlur?: (...args: any[]) => any
  onDismiss?: (...args: any[]) => any
  defaultFocusElement?: React.ReactElement | ((...args: any[]) => any)
  contentElement?: React.ReactElement | ((...args: any[]) => any)
  liveRegion?:
    | React.ReactElement[]
    | React.ReactElement
    | ((...args: any[]) => any)
  shouldContainFocus?: boolean | ('keyboard' | 'screenreader')
  shouldReturnFocus?: boolean
  shouldCloseOnDocumentClick?: boolean
  shouldCloseOnEscape?: boolean
  shouldFocusOnOpen?: boolean
}

type PropKeys = keyof DialogOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type DialogProps = DialogOwnProps

const propTypes: PropValidators<PropKeys> = {
  /**
   * The children to be rendered within the `<Dialog />`
   */
  children: PropTypes.node,

  /**
   * The element to render as the component root, `span` by default
   */
  as: PropTypes.elementType, // eslint-disable-line react/require-default-props

  display: PropTypes.oneOf(['auto', 'block', 'inline-block']),

  label: PropTypes.string,

  /**
   * Whether or not the `<Dialog />` is open
   */
  open: PropTypes.bool,

  /**
   * Function called when tab focus leaves the `<Dialog />` focusable content. This only
   * occurs when `shouldContainFocus` is set to false.
   */
  onBlur: PropTypes.func,

  onDismiss: PropTypes.func,

  /**
   * An element or a function returning an element to focus by default
   */
  defaultFocusElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /**
   * An element or a function returning an element that wraps the content of the `<Dialog />`
   */
  contentElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /**
   * An element, function returning an element, or array of elements that will not be hidden from
   * the screen reader when the `<Dialog />` is open
   */
  liveRegion: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.func
  ]),
  shouldContainFocus: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['keyboard', 'screenreader'])
  ]),
  shouldReturnFocus: PropTypes.bool,
  shouldCloseOnDocumentClick: PropTypes.bool,
  shouldCloseOnEscape: PropTypes.bool,
  shouldFocusOnOpen: PropTypes.bool
}

const allowedProps: AllowedPropKeys = [
  'children',
  'as',
  'display',
  'label',
  'open',
  'onBlur',
  'onDismiss',
  'defaultFocusElement',
  'contentElement',
  'liveRegion',
  'shouldContainFocus',
  'shouldReturnFocus',
  'shouldCloseOnDocumentClick',
  'shouldCloseOnEscape',
  'shouldFocusOnOpen'
]

export type { DialogProps }
export { propTypes, allowedProps }
