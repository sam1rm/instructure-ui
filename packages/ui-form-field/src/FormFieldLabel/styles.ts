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

import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { FormFieldLabelTheme } from '@instructure/shared-types'
import { FormFieldLabelProps } from './types'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: FormFieldLabelTheme,
  props: FormFieldLabelProps
) => {
  const { children } = props

  const hasContent = hasVisibleChildren(children)

  const labelStyles = {
    all: 'initial',
    display: 'block',
    ...(hasContent && {
      color: componentTheme.color,
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.fontWeight,
      fontSize: componentTheme.fontSize,
      lineHeight: componentTheme.lineHeight,
      margin: 0,
      textAlign: 'inherit'
    })
  }

  return {
    formFieldLabel: {
      label: 'formFieldLabel',
      ...labelStyles,

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(label)': labelStyles,
      '&:-webkit-any(label)': labelStyles
    }
  }
}

export default generateStyle
